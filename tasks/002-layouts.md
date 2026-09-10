# Task 002: 공통 레이아웃 및 네비게이션 골격 구현

## 개요

앱 셸 레이아웃과 네비게이션 구조를 구축합니다.

## 고수준 명세서

### 1. 앱 셸 레이아웃 (루트 레이아웃)

- 헤더 + 콘텐츠 영역 구조
- Toaster 컴포넌트 등록

### 2. 글로벌 헤더 컴포넌트

- 로고 및 앱 타이틀
- "내 모임" 네비게이션 링크
- 알림 벨 아이콘 (배지 슬롯)
- 사용자 드롭다운 (이름, 로그아웃, 테마 전환)

### 3. 그룹 컨텍스트 레이아웃

- 모임 정보 헤더 (이름, 카테고리, 멤버 수)
- 탭 네비게이션 (공지/일정/멤버)

### 4. 비회원 접근 라우트 레이아웃

- /join/[inviteCode], /e/[publicToken]용 미니멀 레이아웃

### 5. 공통 네비게이션 컴포넌트

- 브레드크럼 (Breadcrumb)
- 뒤로가기 버튼

## 수락 기준

- [ ] 앱 셸 레이아웃 구현 완료
- [ ] 글로벌 헤더 컴포넌트 완성
- [ ] 그룹 컨텍스트 레이아웃 완성
- [ ] 비회원 접근 라우트 레이아웃 분리 완성
- [ ] 네비게이션 컴포넌트 완성
- [ ] Toaster 설정 완료

## 구현 단계

### Step 1: 앱 셸 레이아웃 및 헤더 컴포넌트

- [ ] app/layout.tsx에서 로그인 사용자용 레이아웃 구현
- [ ] GlobalHeader 컴포넌트 생성 및 적용
- [ ] Toaster 등록

### Step 2: 그룹 컨텍스트 레이아웃

- [ ] /groups/[groupId]/layout.tsx 구현
- [ ] 탭 네비게이션 구현

### Step 3: 비회원 접근 라우트 레이아웃

- [ ] /join과 /e 라우트용 미니멀 레이아웃

### Step 4: 네비게이션 컴포넌트

- [ ] Breadcrumb 컴포넌트
- [ ] BackButton 컴포넌트

## 변경사항 요약

### 추가된 파일

- `components/global-header.tsx` (글로벌 헤더)
- `components/breadcrumb.tsx` (브레드크럼)
- `components/back-button.tsx` (뒤로가기)
- `app/groups/[groupId]/layout.tsx` (그룹 레이아웃)
- `app/join/layout.tsx` (비회원 레이아웃)
- `app/e/layout.tsx` (비회원 레이아웃)

### 수정된 파일

- `app/layout.tsx` (앱 셸 레이아웃)

## 참고사항

- 헤더 컴포넌트는 클라이언트 컴포넌트로 작성
- 레이아웃은 Server Component로 작성
- 탭 네비게이션은 next/link 기반
