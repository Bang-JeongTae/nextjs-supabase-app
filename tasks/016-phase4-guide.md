# Phase 4: 고급 기능 및 최적화 - 개발 가이드

## Task 016: 사용자 경험 향상 및 실시간 반영

### Supabase Realtime 구독

```typescript
// hooks/useGroupSubscription.ts
export function useGroupSubscription(groupId: string) {
  useEffect(() => {
    const channel = supabase
      .channel(`group:${groupId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notices" },
        (payload) => {
          // 공지 목록 갱신
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [groupId]);
}
```

### 낙관적 업데이트

```typescript
// components/rsvp-button.tsx
const [status, setStatus] = useOptimistic(
  currentStatus,
  (_, newStatus) => newStatus,
);

async function handleRsvp(newStatus: RsvpStatus) {
  setStatus(newStatus); // 즉시 UI 업데이트
  await createRsvp(eventId, newStatus); // 서버 요청
}
```

### 추가 기능

- QR 코드 생성: `qrcode` 라이브러리
- Web Share API: 초대 링크 공유
- 무한 스크롤: react-intersection-observer
- 폼 임시 저장: localStorage

## Task 017: 성능 최적화 및 배포

### 최적화 체크리스트

- [ ] Image Optimization (next/image)
- [ ] Dynamic imports for large components
- [ ] Server Component 경계 최적화
- [ ] Revalidate Tag 기반 캐싱
- [ ] N+1 쿼리 제거 (DB View 또는 Batch 쿼리)
- [ ] Code splitting (Route-based)

### 성능 목표

- Lighthouse Score: 90점 이상
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1

### 배포 설정

#### Vercel 환경 변수

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

#### GitHub Actions CI

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run lint
      - run: npm run build
      - run: npm run test:e2e
```

## 배포 체크리스트

- [ ] Vercel에 프로젝트 연결
- [ ] 환경 변수 설정
- [ ] Supabase 프로덕션 데이터베이스 연결
- [ ] 초기 마이그레이션 실행
- [ ] SSL/TLS 인증서 설정
- [ ] CDN 캐시 정책 설정

## 추가 고려사항

### 모니터링

- Sentry: 에러 추적
- PostHog: 사용자 분석
- Vercel Analytics: 성능 지표

### 보안

- CORS 정책 설정
- Rate limiting
- CSRF 토큰
- XSS 방지 (DOMPurify)

### 스케일링

- Database 인덱스 최적화
- 캐시 전략 (Redis)
- CDN 활용
- 이미지 최적화 (WebP, AVIF)
