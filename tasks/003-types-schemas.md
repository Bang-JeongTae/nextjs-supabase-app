# Task 003: 기본 타입 정의 및 폼 검증 스키마 골격

## 개요

UI 개발에 필요한 최소 도메인 타입과 Zod 폼 검증 스키마를 정의합니다.

## 고수준 명세서

### 1. 도메인 타입 정의 (types/index.ts)

- Group - 모임 정보
- Notice - 공지사항
- Event - 일정
- Member - 멤버
- Notification - 알림

### 2. Enum 정의

- GroupCategory - 수영/헬스/기타
- MemberRole - owner/member
- RsvpStatus - attending/not_attending/waitlist
- RecurrenceRule - none/weekly
- NotificationType - notice/event

### 3. Zod 폼 검증 스키마 (lib/validations/)

- 그룹 생성 폼 스키마
- 공지 작성 폼 스키마
- 일정 생성 폼 스키마
- RSVP 폼 스키마

### 4. 공통 유틸 타입

- ActionResult<T> - 서버 액션 응답 타입
- FormState - 폼 상태 타입
- 페이지 파라미터 타입

## 수락 기준

- [ ] 기본 도메인 타입 파일 완성
- [ ] Enum 타입 모두 정의됨
- [ ] Zod 검증 스키마 모두 작성됨
- [ ] 공통 유틸 타입 정의됨
- [ ] TypeScript 컴파일 성공

## 구현 단계

### Step 1: 도메인 타입 및 Enum 정의

- [ ] types/index.ts에 모든 타입 정의

### Step 2: Zod 스키마 작성

- [ ] lib/validations 디렉토리 생성
- [ ] 각 폼별 검증 스키마 파일 생성

### Step 3: 공통 유틸 타입

- [ ] types/common.ts에 유틸 타입 정의

## 변경사항 요약

### 추가된 파일

- `types/index.ts` (도메인 타입 및 Enum)
- `types/common.ts` (공통 유틸 타입)
- `lib/validations/group.ts` (그룹 생성 스키마)
- `lib/validations/notice.ts` (공지 작성 스키마)
- `lib/validations/event.ts` (일정 생성 스키마)
- `lib/validations/rsvp.ts` (RSVP 스키마)

## 참고사항

- 모든 타입은 UI 구현 중 자유롭게 변경 가능한 임시 계약
- DB 테이블 설계는 Phase 2.5에서 수행
- 타입이 화면 표시에 필요한 필드 위주로 정의됨
