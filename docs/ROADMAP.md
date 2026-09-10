# 모임 이벤트 관리 웹 MVP 개발 로드맵

정기 소모임 주최자가 카카오톡 대신 웹에서 공지·일정·참여자를 한 곳에서 관리하도록 돕는 서비스입니다.

## 개요

모임 이벤트 매니저는 **정기 소모임(러닝크루형) 주최자와 참여자**를 위한 **중앙 집중식 모임 운영 도구**로 다음 기능을 제공합니다:

- **모임 관리**: 모임 생성(F001), 초대 링크를 통한 멤버 확보(F002), 내 모임 목록 조회(F012)
- **정보 전달**: 공지 작성/열람(F003), 중요 공지 상단 고정(F004), 인앱 알림(F011)
- **일정 및 참석 관리**: 일정 생성(F005)과 주간 반복 설정(F006), 일정 상세 조회(F007), 회원 RSVP(F008), 비회원 RSVP(F009)
- **기본 인증**: 회원가입·로그인·로그아웃 및 데이터 격리(F010)

### 기술 스택

| 영역       | 스택                                                  |
| ---------- | ----------------------------------------------------- |
| 프레임워크 | Next.js 15 (App Router), React 19, TypeScript 5.6+    |
| 스타일링   | Tailwind CSS, shadcn/ui, Lucide React                 |
| 폼/검증    | React Hook Form 7.x, Zod                              |
| 날짜       | date-fns 3.x                                          |
| 백엔드     | Supabase (PostgreSQL 16+, Auth, RLS), `@supabase/ssr` |
| 알림 UI    | sonner                                                |
| 배포       | Vercel                                                |

### 개발 전략: UI 선행 → 도메인 설계

본 로드맵은 **구조 우선 접근법**을 따르되, **DB 스키마 설계를 UI/UX 완성 이후로 배치**합니다.

- Phase 1에서는 라우트 골격·레이아웃·최소 타입만 확정합니다 (DB 스키마 설계 제외)
- Phase 2에서 더미 데이터로 전 화면을 완성해 실제 데이터 요구사항을 확정합니다
- Phase 2.5에서 완성된 화면이 실제로 요구하는 필드·관계·집계를 근거로 도메인 타입과 DB 스키마를 설계합니다
- 결과적으로 화면에서 쓰이지 않는 컬럼을 만들거나, 화면에 필요한 필드가 누락되는 **스키마 재작업(rework)을 방지**합니다

### 현재 코드베이스 기준선

- Supabase 스타터 기반 인증 페이지(`/auth/login`, `/auth/sign-up`, `/auth/forgot-password`, `/auth/update-password`)와 Google OAuth가 이미 구현되어 있음
- shadcn/ui 컴포넌트 중 `button`, `card`, `input`, `label`, `checkbox`, `badge`, `dropdown-menu`만 설치됨
- `react-hook-form`, `zod`, `date-fns`, `sonner` 미설치 → Task 001에서 설치
- 도메인 테이블(groups, group_members, notices, events, event_rsvps, notifications) 미생성 → Task 008에서 설계, Task 009에서 마이그레이션 실행

---

## 개발 워크플로우

1. **작업 계획**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
- 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- `/tasks` 디렉토리에 새 작업 파일 생성
- 명명 형식: `XXX-description.md` (예: `001-setup.md`)
- 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
- **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**
- 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조. 예를 들어, 현재 작업이 `012`라면 `011`과 `010`을 예시로 참조.
- 이러한 예시들은 완료된 작업이므로 내용이 완료된 작업의 최종 상태를 반영함 (체크된 박스와 변경 사항 요약). 새 작업의 경우, 문서에는 빈 박스와 변경 사항 요약이 없어야 함. 초기 상태의 샘플로 `000-sample.md` 참조.

3. **작업 구현**

- 작업 파일의 명세서를 따름
- 기능과 기능성 구현
- **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
- 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
- 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
- 테스트 통과 확인 후 다음 단계로 진행
- 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

- 로드맵에서 완료된 작업을 ✅로 표시

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축

라우트 구조와 레이아웃 셸을 먼저 확정해, Phase 2에서 모든 화면 작업을 병렬로 진행할 수 있는 기반을 만듭니다. **이 Phase에서는 DB 스키마를 설계하지 않습니다** — 도메인 모델은 UI 완성 후 Phase 2.5에서 확정합니다.

- **Task 001: 프로젝트 의존성 설치 및 라우트 구조 스캐폴딩** - 우선순위
  - `react-hook-form`, `zod`, `@hookform/resolvers`, `date-fns`, `sonner` 설치
  - shadcn/ui 추가 컴포넌트 설치: `select`, `dialog`, `table`, `tabs`, `form`, `calendar`, `popover`, `avatar`, `textarea`, `separator`, `skeleton`, `sonner`
  - App Router 라우트 골격 생성 (빈 페이지 파일):
    `/groups`, `/groups/new`, `/groups/[groupId]`, `/groups/[groupId]/members`,
    `/groups/[groupId]/notices/new`, `/groups/[groupId]/notices/[noticeId]`,
    `/groups/[groupId]/events/new`, `/groups/[groupId]/events/[eventId]`,
    `/join/[inviteCode]`, `/e/[publicToken]`, `/notifications`
  - 각 라우트에 `loading.tsx`, `error.tsx`, `not-found.tsx` 기본 파일 배치
  - Supabase 스타터 잔여 튜토리얼 코드 정리 (`components/tutorial/`, `hero.tsx`, `next-logo.tsx`, `deploy-button.tsx`)
  - 루트 `/` → 로그인 상태에 따라 `/groups` 또는 `/auth/login`으로 리다이렉트
  - 각 페이지는 라우트 도달 확인용 플레이스홀더 텍스트만 포함 (레이아웃·네비게이션 구현은 Task 002 담당)

- **Task 002: 공통 레이아웃 및 네비게이션 골격 구현**
  - 로그인 사용자용 앱 셸 레이아웃 구현 (헤더 + 콘텐츠 영역)
  - 글로벌 헤더: 로고, "내 모임", 알림 벨 아이콘(배지 슬롯), 사용자 드롭다운(로그아웃), 테마 전환
  - 그룹 컨텍스트 레이아웃 (`/groups/[groupId]/layout.tsx`): 모임 정보 헤더 + 공지/일정/멤버 탭 네비게이션
  - 비회원 접근 라우트(`/join/[inviteCode]`, `/e/[publicToken]`)용 미니멀 레이아웃 분리
  - 브레드크럼 및 뒤로가기 컴포넌트 구현
  - `sonner` Toaster를 루트 레이아웃에 등록

- **Task 003: 기본 타입 정의 및 폼 검증 스키마 골격**
  - UI 개발에 필요한 **최소 도메인 타입**만 정의 (`types/`): `Group`, `Notice`, `Event`, `Member`, `Notification` — 화면 표시에 필요한 필드 위주
  - UI 분기 판단용 Enum 정의: `GroupCategory`(수영/헬스/기타), `MemberRole`(owner/member), `RsvpStatus`(attending/not_attending/waitlist), `RecurrenceRule`(none/weekly)
  - Zod 폼 스키마 초안 (`lib/validations/`): 그룹 생성, 공지 작성, 일정 생성, RSVP 폼 — 클라이언트 유효성 검사 용도
  - 공통 유틸 타입 정의: `ActionResult<T>`, `FormState`, 페이지 파라미터 타입
  - **범위 제외**: DB 테이블 설계, RLS 정책, 마이그레이션 SQL, `database.types.ts` 연동 → Task 008에서 수행
  - 타입은 UI 구현 중 자유롭게 변경 가능한 **임시 계약**임을 문서에 명시

---

### Phase 2: UI/UX 완성 (더미 데이터 활용)

모든 화면을 하드코딩된 더미 데이터로 완성해 전체 사용자 플로우를 조기에 검증합니다. 이 Phase에서는 DB 연동을 일절 수행하지 않으며, 여기서 확정된 화면이 Phase 2.5 스키마 설계의 입력값이 됩니다.

- **Task 004: shadcn/ui 기반 공통 컴포넌트 라이브러리 구축**
  - 도메인 카드 컴포넌트: `GroupCard`, `NoticeCard`, `EventCard`, `NotificationItem`, `MemberRow`
  - 상태 표시 컴포넌트: `PinnedBadge`, `RsvpStatusBadge`, `CapacityIndicator`, `RoleBadge`
  - 폼 공통 컴포넌트: `FormField` 래퍼, `DateTimePicker`(date-fns + calendar + popover), `CategorySelect`, `RecurrenceSelect`
  - 상태 화면 컴포넌트: `EmptyState`, `LoadingSkeleton`, `ErrorState`
  - 더미 데이터 팩토리 작성 (`lib/mock/`): 모임 3건, 공지 5건(고정 1건 포함), 일정 4건, RSVP 응답, 알림 6건
  - 디자인 토큰 정리: 카테고리별 컬러, 타이포그래피 스케일, 간격 규칙을 `globals.css` 및 Tailwind 설정에 반영

- **Task 005: 모임 관리 페이지 UI 구현 (F001, F002, F012)**
  - 내 모임 목록 페이지 UI — 모임 카드 그리드(이름, 카테고리, 멤버 수, 다음 일정), 빈 상태 안내, "새 모임 만들기" CTA
  - 그룹 생성 폼 UI — 이름(필수), 카테고리 선택, 설명(선택), 클라이언트 유효성 검사 메시지
  - 그룹 홈 페이지 UI — 모임 정보 헤더, 고정 공지 우선 정렬된 공지 섹션, 다가오는 일정 프리뷰 1~3개
  - 그룹 멤버 목록 페이지 UI — 멤버 테이블(이름/역할/가입일), 초대 링크 섹션(URL 표시, 복사 버튼, 새 링크 생성 버튼), 멤버 제거 버튼
  - 그룹 초대 랜딩 페이지 UI — 모임 정보 표시 + 3가지 상태 분기(비로그인 / 로그인·미가입 / 이미 가입)
  - 주최자 전용 액션("공지 작성", "일정 생성", "멤버 관리") 조건부 노출 로직을 더미 role 값으로 구현

- **Task 006: 공지 및 일정 페이지 UI 구현 (F003~F008)**
  - 공지 작성 페이지 UI — 제목, 내용(마크다운 입력), "상단 고정" 체크박스, 발행/취소 버튼
  - 공지 상세 페이지 UI — 마크다운 렌더링, 작성자 정보, 작성 일시, 고정 표시, 작성자 전용 수정/삭제 버튼
  - 일정 생성 페이지 UI — 제목, 설명, 장소, 시작/종료 일시, 정원, RSVP 마감, 반복 설정(반복 안함/매주 + 요일 선택)
  - 일정 생성 폼 유효성 검사 UI — 필수 입력, 시작<종료 시간 순서, 정원 숫자 범위, RSVP 마감 < 시작 시간
  - 일정 상세 페이지 UI — 일정 전체 정보, 정원 대비 참석/대기 인원, RSVP 버튼 3종(참석/불참/대기) 및 선택 상태 표시
  - 참석자 목록 UI (주최자 전용) — 참석자/미응답자/불참자/대기열 탭 구분

- **Task 007: 알림함·비회원 RSVP 페이지 UI 및 반응형 마감 (F009, F011)**
  - 알림함 페이지 UI — 시간 역순 알림 목록, 타입 아이콘(공지/일정), 읽지 않음 강조, "모두 읽음 처리" 버튼, 빈 상태
  - 헤더 알림 벨 배지 UI — 미읽음 개수 표시
  - 비회원 RSVP 페이지 UI — 모임/일정 정보, 이름(필수), 연락처(선택), 참석/불참 라디오, 제출 후 감사 화면
  - 전 페이지 모바일 반응형 검수 (375px / 768px / 1280px 브레이크포인트)
  - 접근성 점검 — 폼 라벨 연결, 포커스 링, 키보드 네비게이션, 색상 대비
  - 전체 사용자 플로우 네비게이션 검증 (더미 데이터 기준 클릭 경로 전수 확인)

---

### Phase 2.5: 도메인 설계 및 데이터베이스 스키마

완성된 UI를 근거로 도메인 모델을 확정하는 단계입니다. 화면이 실제로 소비하는 필드와 집계를 역으로 추출해 스키마를 설계하므로, 불필요한 컬럼이나 누락된 필드 없이 Phase 3 구현에 진입할 수 있습니다.

- **Task 008: 도메인 타입 고도화 및 데이터베이스 스키마 설계**
  - **Phase 2 UI/UX 완성 후 실제 화면 요구사항을 반영하여 스키마 최적화** — 전 페이지에서 사용된 더미 데이터(`lib/mock/`) 구조를 전수 조사해 필수 필드·선택 필드·파생 값(집계)을 분류
  - Task 003의 임시 타입을 정식 도메인 타입으로 승격 (`types/`): `User`, `Group`, `GroupMember`, `Notice`, `Event`, `EventRsvp`, `Notification` — 화면 요구 필드 전부 반영
  - Enum 확정: `GroupCategory`, `MemberRole`, `RsvpStatus`, `RsvpSource`(member/guest), `NotificationType`(notice/event), `RecurrenceRule`
  - 테이블 스키마 설계 — 컬럼·제약·기본값·관계(FK) 정의, 정규화 수준 결정, 화면 집계값(멤버 수, 참석 인원, 다음 일정)의 계산 위치(쿼리/View/RPC) 결정
  - Supabase 마이그레이션 SQL 작성 (`supabase/migrations/`, 실행은 Task 009에서 수행)
  - RLS 정책 설계 문서 작성 — `group_members` 기반 권한 매트릭스 (owner/member/비회원)
  - Zod 스키마를 서버 검증 기준으로 확장 및 API 응답·에러 타입 정의 (`types/api.ts`)

---

### Phase 3: 핵심 기능 구현

더미 데이터를 실제 Supabase 데이터로 교체하고 비즈니스 로직을 완성합니다. **모든 Task는 Playwright MCP 테스트 통과를 완료 조건으로 합니다.**

- **Task 009: Supabase 스키마 마이그레이션 및 RLS 정책 구축** - 우선순위
  - 마이그레이션 실행: `groups`, `group_members`, `notices`, `events`, `event_rsvps`, `notifications` 테이블 생성
  - `auth.users` 연동 `profiles` 테이블 및 회원가입 시 프로필 자동 생성 트리거 구현
  - 인덱스 설계: `group_members(user_id, group_id)`, `notices(group_id, is_pinned, created_at)`, `events(group_id, start_at)`, `event_rsvps(event_id)`, `notifications(user_id, is_read)`
  - 고유 제약: `groups.invite_code`, `events.public_token`, `event_rsvps(event_id, user_id)` 부분 유니크
  - RLS 정책 적용 — 멤버만 그룹 데이터 조회, owner만 공지/일정 생성·수정·삭제, 비회원은 `public_token` 경유 RSVP만 허용
  - `database.types.ts` 재생성 및 Task 008 도메인 타입과 정합성 검증
  - Supabase Advisor로 보안/성능 경고 확인 및 해소

- **Task 010: 인증 시스템 고도화 및 라우트 보호 구현 (F010)**
  - 미들웨어로 `/groups`, `/notifications` 등 인증 필수 라우트 보호 및 로그인 리다이렉트
  - 로그인 성공 후 `/groups`로 이동, 원래 목적지 복원(`redirectTo` 파라미터) 처리
  - 회원가입 폼에 이름(`full_name`) 필드 추가 및 프로필 저장 연동
  - 로그아웃 처리 및 세션 만료 시 안내 UX 정비
  - 기존 스타터 인증 폼을 React Hook Form + Zod 스키마로 마이그레이션
  - **Playwright MCP 테스트**: 회원가입 → 로그인 → 보호 라우트 접근 → 로그아웃 → 보호 라우트 차단 플로우 검증

- **Task 011: 모임 생성·목록·초대 링크 기능 연동 (F001, F002, F012)**
  - 모임 생성 Server Action 구현 — 생성 시 owner를 `group_members`에 자동 등록, `invite_code` 생성
  - 내 모임 목록 조회 구현 — 가입한 모임 + 멤버 수 + 다음 일정 집계 쿼리
  - 초대 링크 발급/재발급 Server Action — 재발급 시 기존 코드 무효화
  - 초대 랜딩 페이지 로직 — 유효하지 않은 코드, 비로그인, 미가입, 기존 멤버 4가지 분기 처리
  - 로그인 후 초대 링크 자동 가입 플로우 구현
  - 멤버 제거 Server Action (owner 전용, 자기 자신 제거 방지)
  - **Playwright MCP 테스트**: 모임 생성 → 초대 링크 복사 → 다른 계정으로 링크 접속 → 가입 → 양쪽 모임 목록 반영 확인

- **Task 012: 공지 작성·열람·고정 기능 연동 (F003, F004)**
  - 공지 작성 Server Action — owner 권한 검증, `is_pinned` 저장
  - 공지 목록 조회 — 고정 공지 우선, 이후 `created_at` 내림차순 정렬
  - 공지 상세 조회 및 마크다운 렌더링 (XSS 방지 sanitize 적용)
  - 공지 수정/삭제 Server Action — 작성자 본인 검증
  - 고정 토글 기능 및 그룹 홈 피드 즉시 반영 (`revalidatePath`)
  - **Playwright MCP 테스트**: 공지 작성 → 고정 체크 → 그룹 홈 상단 노출 확인 → 상세 조회 → 수정 → 삭제, 일반 멤버의 작성 버튼 미노출 검증

- **Task 013: 일정 생성·반복 설정·상세 조회 기능 연동 (F005, F006, F007)**
  - 일정 생성 Server Action — 서버 측 Zod 검증(시간 순서, 정원, RSVP 마감), `public_token` 생성
  - 주간 반복 로직 구현 — `recurrence_rule` 저장 및 date-fns 기반 반복 인스턴스 생성 정책 수립
  - 다가오는 일정 조회 쿼리 — 그룹 홈 프리뷰 및 모임 목록의 "다음 일정" 연동
  - 일정 상세 조회 — 참석/대기/미응답 인원 집계 및 정원 대비 표시
  - 일정 수정/삭제 Server Action (owner 전용) — 반복 일정 처리 정책 반영
  - **Playwright MCP 테스트**: 일정 생성(단일/주간 반복) → 그룹 홈 반영 → 상세 조회 → 유효성 오류 케이스(종료<시작, 정원 0) 검증

- **Task 014: RSVP 응답 시스템 구현 (F008, F009)**
  - 회원 RSVP Server Action — 참석/불참/대기 응답 upsert, 중복 응답 시 갱신
  - 정원 초과 시 자동 대기열 전환 및 취소 발생 시 대기열 승격 로직
  - RSVP 마감 시간 경과 시 응답 차단 및 UI 비활성화
  - 비회원 RSVP 처리 — `public_token` 검증, 이름/연락처 기반 중복 응답 방지(기존 응답 업데이트)
  - 참석자 목록 조회 (owner 전용) — 회원/비회원(`source`) 구분 표시
  - 비회원 라우트 남용 방지 — rate limit 및 토큰 유효성/만료 검증
  - **Playwright MCP 테스트**: 회원 RSVP 응답/변경 → 정원 초과 대기열 전환 → 비회원 링크 응답 → 동일 이름 재응답 시 갱신 → 마감 후 차단 검증

- **Task 015: 인앱 알림 시스템 구현 (F011)**
  - 공지/일정 생성 시 그룹 멤버 전원에게 알림 생성 (DB 트리거 또는 Server Action 내 일괄 insert)
  - 알림 목록 조회 API — 시간 역순 페이지네이션
  - 미읽음 개수 조회 및 헤더 벨 배지 연동
  - 알림 클릭 시 읽음 처리 후 관련 공지/일정 상세로 이동
  - "모두 읽음 처리" Server Action 구현
  - 작성자 본인 제외 등 알림 생성 규칙 적용
  - **Playwright MCP 테스트**: A 계정 공지 작성 → B 계정 벨 배지 증가 확인 → 알림함 진입 → 알림 클릭 → 상세 이동 및 읽음 처리 → 모두 읽음 처리 검증

- **Task 015-1: 핵심 사용자 플로우 통합 테스트**
  - **Playwright MCP 전체 플로우 E2E**: 회원가입 → 모임 생성 → 공지 작성(고정) → 일정 생성(주간 반복) → 초대 링크로 멤버 가입 → 멤버 RSVP → 비회원 RSVP → 주최자 참석자 목록 확인 → 알림 수신 확인
  - 권한 경계 테스트 — 비멤버의 그룹 접근 차단, 일반 멤버의 주최자 기능 차단, RLS 우회 시도 차단
  - 에러 핸들링 테스트 — 잘못된 초대 코드, 만료된 `public_token`, 삭제된 일정 접근, 네트워크 실패 시 토스트 노출
  - 엣지 케이스 테스트 — 정원 1명 일정 동시 응답, 마감 직전 응답, 멤버 0명 모임, 알림 100건 이상
  - 더미 데이터(`lib/mock/`) 잔여 참조 전면 제거 확인
  - 테스트 결과 및 미해결 이슈 정리

---

### Phase 4: 고급 기능 및 최적화

- **Task 016: 사용자 경험 향상 및 실시간 반영**
  - Supabase Realtime 구독으로 알림 배지 및 RSVP 현황 실시간 갱신
  - 낙관적 업데이트(useOptimistic) 적용 — RSVP 응답, 공지 고정 토글, 알림 읽음 처리
  - 초대 링크 QR 코드 생성 및 Web Share API 연동
  - 일정 목록 필터(다가오는/지난 일정) 및 무한 스크롤/페이지네이션
  - 폼 임시 저장 및 이탈 방지 경고 (공지 작성, 일정 생성)
  - 참석자 목록 CSV 내보내기 (주최자 전용)

- **Task 017: 성능 최적화 및 배포 파이프라인 구축**
  - Server Component 경계 최적화 및 `revalidateTag` 기반 캐싱 전략 수립
  - N+1 쿼리 제거 — 멤버 수/RSVP 집계를 DB View 또는 RPC로 통합
  - 번들 분석 및 코드 스플리팅, 이미지·폰트 최적화
  - Lighthouse 성능/접근성/SEO 점수 90점 이상 달성
  - GitHub Actions CI 구성 — `lint`, `typecheck`, `build`, Playwright E2E 자동 실행
  - Vercel 프로덕션 배포, 환경 변수 설정, Supabase 프로덕션 마이그레이션 적용
  - 에러 모니터링 및 로깅 시스템 연동

---

## 기능 ID ↔ Task 매핑

| 기능 ID | 기능명             | 담당 Task                                                            |
| ------- | ------------------ | -------------------------------------------------------------------- |
| F001    | 모임 생성          | Task 005 (UI), Task 008 (스키마), Task 011 (연동)                    |
| F002    | 초대 링크          | Task 005 (UI), Task 008 (스키마), Task 011 (연동), Task 016 (QR)     |
| F003    | 공지 작성/열람     | Task 006 (UI), Task 008 (스키마), Task 012 (연동)                    |
| F004    | 공지 상단 고정     | Task 006 (UI), Task 008 (스키마), Task 012 (연동)                    |
| F005    | 일정 생성          | Task 006 (UI), Task 008 (스키마), Task 013 (연동)                    |
| F006    | 일정 반복 설정     | Task 006 (UI), Task 008 (스키마), Task 013 (연동)                    |
| F007    | 일정 상세 조회     | Task 006 (UI), Task 013 (연동)                                       |
| F008    | RSVP 응답 (회원)   | Task 006 (UI), Task 008 (스키마), Task 014 (연동)                    |
| F009    | RSVP 응답 (비회원) | Task 007 (UI), Task 008 (스키마), Task 014 (연동)                    |
| F010    | 기본 인증          | Task 009 (profiles 스키마), Task 010 (고도화, 기존 스타터 기반)      |
| F011    | 인앱 알림          | Task 007 (UI), Task 008 (스키마), Task 015 (연동), Task 016 (실시간) |
| F012    | 모임 목록 조회     | Task 005 (UI), Task 011 (연동)                                       |

> 공통 기반 Task: Task 001~003(골격·레이아웃·기본 타입), Task 004(공통 컴포넌트), Task 009(마이그레이션·RLS), Task 015-1(통합 테스트), Task 017(최적화·배포)는 특정 기능 ID에 종속되지 않고 전 기능에 적용됩니다.

---

## MVP 범위 제외 항목

다음 기능은 MVP 범위 밖이며 본 로드맵에 포함되지 않습니다: 이메일 알림, 댓글·질문, 참석률 통계·노쇼 트래킹, 카풀 매칭, 정산 기능, 프로필 상세 관리, 설정 기능, 고급 검색·필터링, 소셜 기능.
