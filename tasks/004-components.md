# Task 004: shadcn/ui 기반 공통 컴포넌트 라이브러리 구축

## 개요

모든 화면에서 사용할 도메인 카드, 상태 표시, 폼 컴포넌트들과 더미 데이터를 준비합니다.

## 구현 단계

### Step 1: 더미 데이터 팩토리

- [ ] lib/mock/index.ts에 더미 데이터 생성

### Step 2: 도메인 카드 컴포넌트

- [ ] GroupCard, NoticeCard, EventCard, MemberRow, NotificationItem

### Step 3: 상태 표시 컴포넌트

- [ ] PinnedBadge, RsvpStatusBadge, CapacityIndicator, RoleBadge

### Step 4: 폼 공통 컴포넌트

- [ ] DateTimePicker, CategorySelect, RecurrenceSelect

### Step 5: 상태 화면 컴포넌트

- [ ] EmptyState, LoadingSkeleton, ErrorState

## 변경사항 요약

- `lib/mock/index.ts` (더미 데이터 팩토리)
- `components/cards/*` (도메인 카드 컴포넌트들)
- `components/badges/*` (상태 표시 컴포넌트들)
- `components/forms/*` (폼 컴포넌트들)
- `components/states/*` (상태 화면 컴포넌트들)
