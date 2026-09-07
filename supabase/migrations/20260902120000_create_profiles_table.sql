-- 1) profiles 테이블: auth.users와 1:1
create table if not exists public.profiles (
  id uuid not null primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'Public profile data for each authenticated user, 1:1 with auth.users.';

-- 2) RLS 활성화
alter table public.profiles enable row level security;

-- 3) 본인 행만 조회/수정 가능
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using ( (select auth.uid()) = id );

create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using ( (select auth.uid()) = id )
  with check ( (select auth.uid()) = id );

-- insert/delete 정책 없음:
--   insert는 아래 SECURITY DEFINER 트리거가 RLS를 우회해 처리
--   delete는 auth.users 삭제 시 on delete cascade로 처리

-- 4) updated_at 자동 갱신
create extension if not exists moddatetime schema extensions;

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row
  execute procedure extensions.moddatetime (updated_at);

-- 5) 신규 가입 시 profiles row 자동 생성
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- 6) 기존 가입자 백필 (이미 있으면 무시)
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;
