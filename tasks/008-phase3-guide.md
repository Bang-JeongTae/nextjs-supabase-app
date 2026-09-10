# Phase 3: 핵심 기능 구현 - 개발 가이드

## 개요

Phase 2의 UI를 바탕으로 Supabase와 연동하여 실제 기능을 구현합니다.

## Task 009: Supabase 스키마 마이그레이션 및 RLS 정책

### DB 테이블 설계

```sql
-- groups 테이블
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  invite_code VARCHAR(32) UNIQUE NOT NULL,
  owner_id UUID REFERENCES auth.users,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- group_members 테이블
CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- notices 테이블
CREATE TABLE notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  author_id UUID REFERENCES auth.users,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- events 테이블
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  location VARCHAR(200),
  start_at TIMESTAMP NOT NULL,
  end_at TIMESTAMP NOT NULL,
  capacity INTEGER NOT NULL,
  rsvp_deadline TIMESTAMP NOT NULL,
  recurrence_rule TEXT DEFAULT 'none',
  public_token VARCHAR(32) UNIQUE NOT NULL,
  author_id UUID REFERENCES auth.users,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- event_rsvps 테이블
CREATE TABLE event_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  guest_name VARCHAR(100),
  guest_phone VARCHAR(20),
  status TEXT NOT NULL,
  source TEXT DEFAULT 'member',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- notifications 테이블
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  type TEXT NOT NULL,
  related_id UUID NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);
```

### RLS 정책

- groups: 멤버만 조회 가능
- notices: 그룹 멤버만 조회, owner만 생성/수정/삭제
- events: 그룹 멤버만 조회, owner만 생성/수정/삭제
- event_rsvps: 자신의 RSVP만 조회, 모두 생성/수정
- notifications: 자신의 알림만 조회

## Task 010-015: 기능 구현

### 필수 Server Action

```typescript
// lib/server-actions.ts
export async function createGroup(data: CreateGroupInput) {
  const supabase = await createClient();
  // 구현...
}

export async function createNotice(groupId: string, data: CreateNoticeInput) {
  const supabase = await createClient();
  // 구현...
}

export async function createEvent(groupId: string, data: CreateEventInput) {
  const supabase = await createClient();
  // 구현...
}

export async function createRsvp(eventId: string, status: RsvpStatus) {
  const supabase = await createClient();
  // 구현...
}
```

### 필수 API Routes

- `GET /api/groups` - 사용자의 모임 목록
- `GET /api/groups/[id]` - 모임 상세
- `POST /api/notices` - 공지 생성
- `GET /api/events/[id]/rsvps` - 일정의 RSVP 목록

## 구현 순서

1. Supabase 마이그레이션 실행
2. RLS 정책 적용
3. Server Action 구현
4. UI에 Server Action 연동
5. 각 기능별 Playwright 테스트

## 테스트 체크리스트

- [ ] 모임 생성 및 조회
- [ ] 공지 작성 및 고정 기능
- [ ] 일정 생성 및 RSVP
- [ ] 비회원 RSVP
- [ ] 권한 검증 (RLS)
- [ ] 알림 생성 및 조회
