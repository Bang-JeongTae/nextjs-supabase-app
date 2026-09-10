# 프로젝트 개발 규칙 (shrimp-rules.md)

## 1. 프로젝트 개요

**프로젝트명**: 모임 이벤트 관리 웹 MVP
**목적**: 정기 소모임 주최자가 카카오톡 대신 웹에서 공지·일정·참석자를 한 곳에서 관리

### 기술 스택

| 영역           | 기술                                                |
| -------------- | --------------------------------------------------- |
| **프레임워크** | Next.js 15 (App Router), React 19, TypeScript 5.6+  |
| **스타일링**   | Tailwind CSS v3, shadcn/ui, Lucide React            |
| **폼·검증**    | React Hook Form 7.x, Zod                            |
| **날짜·시간**  | date-fns 3.x                                        |
| **백엔드**     | Supabase (PostgreSQL 16+, Auth, RLS), @supabase/ssr |
| **알림 UI**    | sonner                                              |
| **배포**       | Vercel                                              |

---

## 2. 프로젝트 아키텍처

### 디렉토리 구조

```
my-app/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # 인증 라우트 그룹
│   │   ├── login/
│   │   ├── sign-up/
│   │   ├── forgot-password/
│   │   └── update-password/
│   ├── protected/               # 인증 필수 라우트
│   │   ├── groups/
│   │   ├── notifications/
│   │   └── ...
│   ├── groups/[groupId]/        # 그룹 컨텍스트
│   │   ├── members/
│   │   ├── notices/
│   │   │   ├── [noticeId]/
│   │   │   └── new/
│   │   ├── events/
│   │   │   ├── [eventId]/
│   │   │   └── new/
│   │   └── layout.tsx
│   ├── join/[inviteCode]/       # 초대 링크 랜딩
│   ├── e/[publicToken]/         # 비회원 RSVP
│   ├── layout.tsx               # 루트 레이아웃
│   └── globals.css
├── components/
│   ├── ui/                      # shadcn/ui 컴포넌트 (자동 생성)
│   ├── auth/                    # 인증 관련
│   ├── groups/                  # 그룹 관련
│   ├── notices/                 # 공지 관련
│   ├── events/                  # 일정 관련
│   └── shared/                  # 공유 컴포넌트
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # 브라우저 클라이언트
│   │   ├── server.ts            # 서버 클라이언트 (async 함수 내에서만)
│   │   └── database.types.ts    # Supabase 자동 생성 타입
│   ├── validations/             # Zod 스키마
│   ├── mock/                    # 더미 데이터 팩토리
│   ├── utils.ts                 # 헬퍼 함수
│   └── types.ts                 # 도메인 타입 정의
├── middleware.ts                # 라우트 보호 (인증 확인)
├── components.json              # shadcn/ui 설정
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── .env.local                   # 환경 변수
├── ROADMAP.md                   # 개발 로드맵
└── shrimp-rules.md              # 이 파일
```

### 계층 분리

- **UI Layer** (`/components`): React 컴포넌트, shadcn/ui 기반
- **Logic Layer** (`/lib`): 비즈니스 로직, 데이터 접근, 유틸리티
- **Data Layer**: Supabase (PostgreSQL + RLS)
- **Route Layer** (`/app`): Next.js App Router, 페이지 구성

---

## 3. 타입 및 검증 규칙

### TypeScript 설정

- ✅ **strict 모드**: 반드시 활성화 유지
- ✅ **경로 별칭**: `@/*` → 프로젝트 루트 사용
- ✅ **target**: ES2017
- ❌ **any 타입**: 절대 사용 금지

### 타입 정의 위치

| 타입                                | 위치                                            |
| ----------------------------------- | ----------------------------------------------- |
| 도메인 타입 (User, Group, Event 등) | `lib/types.ts`                                  |
| Supabase 자동 생성 타입             | `lib/supabase/database.types.ts` (CLI로 재생성) |
| API 응답 타입                       | `lib/types.ts`의 `api` 섹션                     |
| Zod 스키마 (폼 검증)                | `lib/validations/*.ts`                          |
| 컴포넌트 Props                      | 컴포넌트 파일 내 inline 정의 가능               |

### Zod 스키마 관리

- 모든 폼 입력은 Zod 스키마로 검증
- 파일명 규칙: `lib/validations/[domain].ts` (예: `lib/validations/groups.ts`)
- Server Action에서도 서버 측 검증 필수

**예시**:

```typescript
// lib/validations/groups.ts
import { z } from "zod";

export const createGroupSchema = z.object({
  name: z.string().min(1, "모임 이름은 필수입니다").max(100),
  category: z.enum(["swimming", "fitness", "other"]),
  description: z.string().max(500).optional(),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;
```

---

## 4. 컴포넌트 구현 규칙

### React Server Component (RSC) vs 클라이언트 컴포넌트

| 상황                                 | 사용 규칙                       |
| ------------------------------------ | ------------------------------- |
| 데이터베이스 직접 조회               | RSC (Server Component)          |
| 이벤트 리스너 (onClick, onChange 등) | `use client` 필수               |
| 폼 제출                              | `use client` + Server Action    |
| 상태 관리 (useState, useContext)     | `use client` 필수               |
| API 호출                             | Server Action (RSC 내에서 호출) |

### shadcn/ui 컴포넌트 사용

- ✅ `@/components/ui` 별칭으로 import
- ✅ 설치된 컴포넌트 목록 확인: `components.json`
- ❌ 미설치 컴포넌트 사용 금지 (Task 001에서 설치 예정)

### 컴포넌트 폴더 구조

```typescript
// components/groups/GroupCard.tsx
"use client";

import { Group } from "@/lib/types";

interface GroupCardProps {
  group: Group;
  onSelect?: () => void;
}

export function GroupCard({ group, onSelect }: GroupCardProps) {
  // 클라이언트 로직
}
```

---

## 5. 라우팅 및 네비게이션

### App Router 라우트 설계

- 동적 라우트: `[param]` (예: `/groups/[groupId]`)
- 캐치올 라우트: `[...slug]` 금지 (이 프로젝트에서 미사용)
- 라우트 그룹: `(group-name)` (예: `(auth)`)
- 중첩 레이아웃: 모든 라우트에 기본 구조 제공

### 보호된 라우트

**미들웨어** (`middleware.ts`):

```typescript
// /groups, /notifications 등은 인증 필수
// 미인증 사용자 → /auth/login으로 리다이렉트
```

**그룹 멤버 확인**:

- 각 그룹 페이지에서 `group_members` RLS로 접근 제어
- 미멤버는 접근 불가 (에러 페이지 표시)

### 네비게이션 구조

- **비로그인**: 로그인 페이지만 접근 가능
- **로그인**: 내 모임 → 그룹 홈 → 공지/일정/멤버 관리
- **초대 링크**: `/join/[inviteCode]` (로그인/비로그인 모두 가능)
- **비회원 RSVP**: `/e/[publicToken]` (로그인 불필요)

---

## 6. 데이터 관리 규칙

### Supabase 클라이언트 사용

**브라우저 클라이언트** (`lib/supabase/client.ts`):

```typescript
"use client";
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);
```

**서버 클라이언트** (`lib/supabase/server.ts`):

```typescript
import { createServerClient } from '@supabase/ssr';

// async 함수 내에서만 사용 (글로벌 변수 금지!)
export async function getServerSupabase() {
  const cookieStore = await cookies();
  return createServerClient(...);
}
```

### Server Action으로 데이터 변경

모든 CUD (Create, Update, Delete) 작업:

```typescript
// app/groups/actions.ts
"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { createGroupSchema } from "@/lib/validations/groups";

export async function createGroup(input: unknown) {
  const parsed = createGroupSchema.parse(input); // Zod 검증
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("groups")
    .insert([{ ...parsed, owner_id: user.id }])
    .select();

  if (error) throw error;
  revalidatePath("/groups");
  return data;
}
```

### RLS (Row Level Security) 정책

- ✅ 모든 테이블에 RLS 활성화 필수
- ❌ RLS 없이 데이터 조회 금지
- 정책 설계: `group_members` 테이블을 권한 기준으로 사용
  - owner: 모든 권한
  - member: 조회 권한만
  - 비멤버: 접근 불가

### 더미 데이터 관리

- 위치: `lib/mock/`
- 생성 함수명: `generate[Entity]()` (예: `generateGroups()`)
- Phase 2에서만 사용, Phase 3부터는 제거
- 예시 위치: `/tasks` 디렉토리의 완료된 Task 파일 참조

---

## 7. 파일 멀티-수정 기준

### 새로운 shadcn/ui 컴포넌트 추가

**수정 파일**:

1. `components.json` → `aliases.@/ui` 경로 확인
2. `shadcn-ui` CLI로 설치
3. `components/ui/[component].tsx` (자동 생성됨)

### 새로운 라우트 추가

**수정 파일**:

1. `app/` 디렉토리에 라우트 폴더 생성
2. `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` 배치
3. 보호 필요시: `middleware.ts` 업데이트
4. `ROADMAP.md` → Task 기록

### Supabase 스키마 변경

**수정 파일**:

1. `supabase/migrations/[timestamp]_[description].sql` 생성
2. `supabase` CLI로 로컬 테스트
3. `lib/supabase/database.types.ts` 재생성 (CLI)
4. 필요한 `lib/types.ts` 도메인 타입 업데이트
5. RLS 정책 추가

### 도메인 타입 변경

**수정 파일**:

1. `lib/types.ts` → 타입 정의 변경
2. `lib/validations/` → 관련 Zod 스키마 업데이트
3. 영향받는 컴포넌트와 Server Action 타입 점검
4. TypeScript 컴파일 에러 확인

---

## 8. 개발 흐름 및 ROADMAP

### Phase별 진행

| Phase         | 기간     | 목표              | 특징                                         |
| ------------- | -------- | ----------------- | -------------------------------------------- |
| **Phase 1**   | 0~3개월  | 애플리케이션 골격 | 라우팅 + 레이아웃 + 기본 타입                |
| **Phase 2**   | 3~6개월  | UI/UX 완성        | 더미 데이터로 전 화면 완성                   |
| **Phase 2.5** | 6개월    | 도메인 설계       | UI 완료 후 DB 스키마 최적화                  |
| **Phase 3**   | 6~12개월 | 기능 구현         | Supabase + Server Action + Playwright 테스트 |
| **Phase 4**   | 12개월+  | 최적화·배포       | 성능 최적화, CI/CD, 모니터링                 |

### 현재 진행 상태

**Phase 1 진행 중**:

- ✅ Task 001: 의존성 설치 및 라우트 스캐폴딩
- ⏳ Task 002: 레이아웃 및 네비게이션 골격
- ⏳ Task 003: 기본 타입 정의 및 폼 검증 스키마

### Task 완료 기준

- 명세서의 모든 구현 사항 체크리스트 완료
- TypeScript 컴파일 에러 없음
- 해당 기능에 대한 E2E 테스트 통과 (Phase 3부터)
- ROADMAP.md에서 Task 상태 업데이트 (✅ 마크)

---

## 9. AI 의사결정 기준

### 라우트 설계 의사결정

**레이아웃이 필요한 경우**:

- 공통 헤더, 네비게이션, 사이드바가 필요 → `layout.tsx` 생성
- 예: `/groups/[groupId]/` 아래의 모든 페이지는 공통 탭 네비게이션 공유

**라우트 그룹 사용**:

- 같은 레이아웃을 공유하는 그룹 → `(group-name)` 사용
- 예: `/auth/login`, `/auth/sign-up` → `/(auth)` 그룹

### 컴포넌트 분할 기준

| 상황                  | 결정                         |
| --------------------- | ---------------------------- |
| 상태 관리 필요        | `use client` 컴포넌트로 분리 |
| 재사용되는 UI         | 별도 컴포넌트 파일로 추출    |
| 100줄 이상            | 논리적 단위로 분리 검토      |
| 서버 데이터 직접 조회 | RSC로 유지 (성능)            |

### 상태 관리 선택

| 상황        | 선택                    |
| ----------- | ----------------------- |
| 폼 상태     | React Hook Form + Zod   |
| 페이지 상태 | URL 파라미터 + useState |
| 전역 상태   | useContext (필요시)     |
| 서버 상태   | Supabase Realtime 구독  |

---

## 10. 금지 사항 (DO's and DON'Ts)

### ❌ 금지 (Prohibited)

- **Supabase 서버 클라이언트를 글로벌 변수로 선언**

  ```typescript
  // ❌ 금지!
  const supabase = createServerClient(...); // 글로벌 스코프

  // ✅ 올바름
  export async function getServerSupabase() { // async 함수 내
    return createServerClient(...);
  }
  ```

- **TypeScript strict 모드 비활성화**

  ```typescript
  // ❌ 금지!
  // tsconfig.json에서 "strict": false 설정

  // ✅ 필수
  "strict": true
  ```

- **RLS 정책 없이 테이블에 접근**

  ```typescript
  // ❌ 금지!
  const { data } = await supabase.from("groups").select(); // RLS 미설정 테이블

  // ✅ 필수
  // 1. Supabase에서 테이블 RLS 활성화
  // 2. group_members 기반 정책 작성
  // 3. 그 후 쿼리 실행
  ```

- **마크다운 문서에 한국어 코드 주석 포함**

  ```markdown
  ❌ 금지: README.md에 한국어 주석 코드블록
  ✅ 필수: 코드는 영어 주석만, 설명은 한국어 텍스트
  ```

- **더미 데이터를 components에서 직접 import**

  ```typescript
  // ❌ 금지!
  import { mockGroups } from "@/components/groups/mock"; // 위치 잘못됨

  // ✅ 올바름
  import { mockGroups } from "@/lib/mock/groups";
  ```

- **Server Action 없이 직접 DB 수정**
  ```typescript
  // ❌ 금지!
  'use client';
  const supabase = createBrowserClient(...);
  supabase.from('groups').insert(...); // 클라이언트에서 직접 수정

  // ✅ 올바름
  // Server Action 호출
  await createGroup(formData);
  ```

### ✅ 필수 (Required)

- **모든 CUD 작업은 Server Action으로**

  ```typescript
  "use server";
  export async function updateGroup(id: string, data: UpdateGroupInput) {
    // 서버에서만 실행
  }
  ```

- **폼 검증은 Zod 스키마로**

  ```typescript
  const schema = z.object({
    name: z.string().min(1),
  });
  ```

- **Supabase 타입 자동 갱신**

  ```bash
  npm run supabase:types # database.types.ts 재생성
  ```

- **마이그레이션 파일 생성 후 스키마 변경**

  ```bash
  supabase migration new create_groups_table
  # supabase/migrations/[timestamp]_create_groups_table.sql 작성
  supabase migration up
  ```

- **타입스크립트 컴파일 에러 없음**
  ```bash
  npm run typecheck # 배포 전 필수
  ```

---

## 11. 코드 스타일 가이드

### 들여쓰기 및 포맷팅

- **들여쓰기**: 2칸 (타브 금지)
- **세미콜론**: 필수
- **트레일링 쉼표**: 다중 줄에서 필수
- **따옴표**: 더블 쿼트 (") 기본

### 주석 규칙

- ✅ **한 줄 주석**: `// 설명`
- ✅ **코드 위 설명**: 필요한 경우만
- ❌ **다중 줄 주석**: `/* ... */` 금지
- ❌ **과도한 주석**: 코드가 명확하면 주석 불필요

**예시**:

```typescript
// 그룹 멤버 확인
const isMember = await checkGroupMember(groupId, userId);

// ✅ 좋은 예: 목적이 명확한 함수명
function getGroupsWithUpcomingEvents() { ... }

// ❌ 나쁜 예: 함수 목적을 설명하는 긴 주석 필요
function getGroups() { ... }
```

### 파일 및 폴더 명명

| 유형       | 규칙               | 예시                         |
| ---------- | ------------------ | ---------------------------- |
| 페이지     | `page.tsx` (고정)  | `app/groups/page.tsx`        |
| 컴포넌트   | PascalCase         | `GroupCard.tsx`              |
| 폴더       | kebab-case         | `components/group-members/`  |
| 라우트     | kebab-case         | `/groups/[group-id]/`        |
| 유틸리티   | camelCase          | `lib/utils.ts`               |
| Zod 스키마 | camelCase + Schema | `groupSchema`, `eventSchema` |

---

## 12. 환경 변수 및 설정

### .env.local 필수 변수

```env
NEXT_PUBLIC_SUPABASE_URL=<프로젝트 URL>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<공개 키>
```

### 개발 명령어

```bash
npm run dev              # 개발 서버 시작
npm run build            # 프로덕션 빌드
npm start                # 빌드된 앱 실행
npm run lint             # ESLint 검사
npm run lint -- --fix    # ESLint 자동 수정
npm run typecheck        # TypeScript 타입 검사
npm run supabase:types   # Supabase 타입 재생성
```

---

## 13. 현재 프로젝트 상태

### 설치된 의존성

- ✅ Next.js 15, React 19, TypeScript
- ✅ Tailwind CSS v3
- ✅ shadcn/ui (기본 7개 컴포넌트)
- ✅ @supabase/ssr, Google OAuth
- ❌ react-hook-form, zod, date-fns, sonner (Task 001 설치 예정)

### 설치해야 할 shadcn/ui 컴포넌트

- select, dialog, table, tabs, form, calendar, popover
- avatar, textarea, separator, skeleton, sonner

### 생성해야 할 파일 구조

```
app/
├── groups/page.tsx          # 내 모임 목록
├── groups/new/page.tsx      # 그룹 생성 폼
├── groups/[groupId]/
│   ├── page.tsx             # 그룹 홈
│   ├── members/page.tsx     # 멤버 목록
│   ├── notices/new/page.tsx
│   ├── notices/[noticeId]/page.tsx
│   ├── events/new/page.tsx
│   ├── events/[eventId]/page.tsx
│   └── layout.tsx           # 공통 레이아웃
├── join/[inviteCode]/page.tsx
├── e/[publicToken]/page.tsx
└── notifications/page.tsx

lib/
├── types.ts                 # 도메인 타입
├── validations/
│   ├── groups.ts
│   ├── notices.ts
│   ├── events.ts
│   └── rsvps.ts
└── mock/
    ├── groups.ts
    ├── notices.ts
    └── events.ts
```

---

## 14. 문제 해결 (Troubleshooting)

### "Cannot find module @/ui/button"

**원인**: shadcn/ui 컴포넌트 미설치
**해결**: `npx shadcn-ui@latest add button`

### "Type 'any' is not allowed" (TypeScript 에러)

**원인**: strict 모드에서 any 사용
**해결**: 정확한 타입 정의 필수 (lib/types.ts 참조)

### Supabase RLS 접근 거부 에러

**원인**: 테이블에 RLS 정책 미설정 또는 사용자 미인증
**해결**:

1. Supabase 대시보드에서 RLS 활성화 확인
2. 권한 정책 작성 확인
3. 사용자 인증 상태 확인

### "Hydration mismatch" 에러

**원인**: 서버와 클라이언트의 렌더링 결과 다름
**해결**:

- `use client` 컴포넌트 확인
- 더미 데이터 사용 위치 점검
- `suppressHydrationWarning` 사용은 최후의 수단

---

**문서 업데이트 일시**: 2025-09-10
**현재 Phase**: Phase 1 (라우팅/레이아웃/타입 정의)
**다음 점검**: Task 001 완료 후 규칙 검토 및 보완
