# 변경 이력 (fix.md)

작업하면서 발생한 결정, 변경, 수정 사항을 누적 기록한다.
새 작업을 시작하기 전 이 파일을 읽어 그동안의 흐름을 파악할 것.

기록 형식: `- YYYY-MM-DD · [단계/주제] 한 줄 요약`

## 변경 이력

- 2026-05-08 · 0단계 완료: root에 plan.md/fix.md 생성, CLAUDE.md에 워크플로우 규칙 추가 (npm 고정, 단계 완료 시 plan.md ✅ + fix.md 한 줄 기록)
- 2026-05-08 · 1단계 완료: shadcn init(base-nova, Tailwind v4 기본값), Pretendard 변수 폰트, ThemeProvider(system), SiteHeader(로고+다크모드 토글) — shadcn v2에서 `asChild` 제거됨, `buttonVariants()`로 Link 스타일링
- 2026-05-08 · 2단계 완료: @next/mdx + gray-matter 설치, next.config.ts에 pageExtensions 추가, mdx-components.tsx(shadcn 디자인 토큰 스타일), lib/posts.ts(getAllPosts/getPostBySlug), content/ 샘플 MDX 2개
- 2026-05-08 · 3단계 완료: shadcn card 추가, PostCard 컴포넌트, app/posts/page.tsx(글 목록), app/posts/[slug]/page.tsx(MDX 동적 import + generateStaticParams + generateMetadata) — gray-matter Date 객체 → 문자열 변환 버그 수정
