-- 보안: handle_new_user 함수의 직접 호출 권한 제거
-- 트리거는 자동으로 작동하므로 이 설정은 직접 호출만 방지
revoke execute on function public.handle_new_user() from anon, authenticated;
