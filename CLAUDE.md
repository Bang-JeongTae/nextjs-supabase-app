# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js와 Supabase를 기반으로 한 풀스택 웹 애플리케이션입니다. Supabase SSR을 통한 쿠키 기반 인증, shadcn/ui 컴포넌트, Tailwind CSS 스타일링을 사용합니다.

## 주요 개발 명령어

```bash
# 개발 서버 시작 (localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 앱 실행
npm start

# ESLint 검사
npm run lint

# ESLint 자동 수정
npm run lint -- --fix
```

## 프로젝트 구조 및 아키텍처

### 디렉토리 레이아웃

- **`/app`** - Next.js App Router 페이지들
  - `/auth` - 인증 관련 페이지 (login, sign-up, password-reset 등)
  - `/protected` - 인증 필수 페이지들
  - `layout.tsx` - 루트 레이아웃 (ThemeProvider, 메타데이터)
  - `globals.css` - 전역 CSS 및 Tailwind 설정

- **`/components`** - React 컴포넌트들
  - `ui/` - shadcn/ui 컴포넌트들
  - 기타 기능별 컴포넌트들 (예: LoginForm)

- **`/lib`** - 유틸리티 및 설정
  - `/supabase`
    - `client.ts` - 브라우저 Supabase 클라이언트 (클라이언트 컴포넌트에서 사용)
    - `server.ts` - 서버 Supabase 클라이언트 (서버 컴포넌트/액션에서 사용)
    - `database.types.ts` - Supabase 자동 생성 타입
  - `utils.ts` - 헬퍼 함수 (cn, hasEnvVars 체크)

- **`/docs`** - 문서
- **`/supabase`** - Supabase 로컬 개발 설정
- **`./.claude`** - Claude Code 설정 (agents, commands, hooks)

### 인증 아키텍처

1. **Supabase SSR** (`@supabase/ssr`) 사용으로 쿠키 기반 세션 관리
2. **클라이언트 측**: `lib/supabase/client.ts` → `createClient()` 사용
3. **서버 측**: `lib/supabase/server.ts` → `createClient()` 사용 (async 함수)
4. **주의**: 서버 클라이언트는 글로벌 변수로 선언하면 안 됨 (Fluid compute 호환성)

### 컴포넌트 구조

- **shadcn/ui**: `components.json` 설정으로 `@/ui` 별칭 사용
- **커스텀 컴포넌트**: RSC (React Server Component) 기반 작성
- **클라이언트 상호작용**: `use client` 디렉티브 사용

### 스타일링

- **Tailwind CSS**: `tailwind.config.ts`로 커스텀 색상/테마 정의
- **CSS 변수**: HSL 기반 동적 색상 (다크 모드 지원)
- **next-themes**: 라이트/다크 모드 전환

## 환경 설정

`.env.local` 필수 변수:

```
NEXT_PUBLIC_SUPABASE_URL=<Supabase 프로젝트 URL>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<Supabase 공개 키>
```

## TypeScript 설정

- **타겟**: ES2017
- **경로 별칭**: `@/*` → 프로젝트 루트
- **JSX**: React JSX 방식 (자동 JSX 런타임)
- **엄격 모드**: true (strict type checking)

## 의존성 주의사항

- **Next.js/React**: 최신 버전 사용
- **Supabase**: `@supabase/ssr`과 `@supabase/supabase-js` 모두 필요
- **shadcn/ui**: `components add <component-name>` 명령으로 추가

## 개발 팁

1. **Supabase 로컬 개발**: `supabase` 디렉토리의 설정 참고, Supabase CLI 사용
2. **신규 페이지 추가**: `/app` 디렉토리의 구조 따르기
3. **로그인 필수 라우트**: `/protected` 디렉토리에 배치 후 미들웨어로 보호
4. **컴포넌트 import**: `@/` 별칭으로 절대 경로 사용
5. **UI 컴포넌트**: shadcn/ui로 설치된 것만 사용, 일관성 유지

## 배포

- **Vercel** 배포 권장 (Supabase Vercel Integration 사용)
- 환경 변수는 Vercel 프로젝트 설정에서 관리
