# Task 001: 프로젝트 의존성 설치 및 라우트 구조 스캐폴딩

## 개요

프로젝트의 필수 의존성을 설치하고 App Router 라우트 골격을 구축하는 단계입니다.

## 고수준 명세서

### 1. 의존성 설치

- `react-hook-form` 7.x, `zod`, `@hookform/resolvers`
- `date-fns` 3.x, `sonner`
- shadcn/ui 추가 컴포넌트: `select`, `dialog`, `table`, `tabs`, `form`, `calendar`, `popover`, `avatar`, `textarea`, `separator`, `skeleton`

### 2. 라우트 구조 생성

- 11개 라우트 경로에 빈 페이지 파일 생성
- 각 라우트마다 `loading.tsx`, `error.tsx`, `not-found.tsx` 배치

### 3. 코드 정리

- Supabase 스타터 튜토리얼 코드 제거
- 루트 리다이렉트 구현

## 수락 기준

- [ ] 모든 NPM 의존성이 package.json에 추가됨
- [ ] 11개 라우트가 접근 가능하고 플레이스홀더 텍스트 표시
- [ ] 각 라우트에 기본 에러/로딩 파일 배치됨
- [ ] 스타터 코드 정리 완료
- [ ] 루트 `/` → 인증 상태에 따라 리다이렉트

## 구현 단계

### Step 1: 의존성 설치

- [ ] 패키지 설치 완료

### Step 2: shadcn/ui 컴포넌트 설치

- [ ] 모든 필수 컴포넌트 설치 완료

### Step 3: 라우트 생성

- [ ] 모든 라우트 경로 생성 완료

### Step 4: 에러/로딩 파일 배치

- [ ] 기본 파일 배치 완료

### Step 5: 스타터 코드 정리

- [ ] 튜토리얼 코드 및 컴포넌트 제거

### Step 6: 루트 리다이렉트

- [ ] 루트 리다이렉트 로직 구현

## 변경사항 요약

### 추가된 파일

- `/app` 디렉토리 내 11개 라우트 경로
- 각 라우트별 `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- `/app/page.tsx` (루트 리다이렉트)

### 수정된 파일

- `package.json` (의존성 추가)

### 제거된 파일

- `components/tutorial/` 디렉토리
- `components/hero.tsx`
- `components/next-logo.tsx`
- `components/deploy-button.tsx`

## 참고사항

- 모든 라우트는 플레이스홀더 텍스트만 포함
- 레이아웃·네비게이션은 Task 002에서 구현
- 페이지 컴포넌트는 Server Component로 작성
