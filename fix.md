# 변경 이력 (fix.md)

작업하면서 발생한 결정, 변경, 수정 사항을 누적 기록한다.
새 작업을 시작하기 전 이 파일을 읽어 그동안의 흐름을 파악할 것.

기록 형식: `- YYYY-MM-DD · [단계/주제] 한 줄 요약`

## 변경 이력

- 2026-05-08 · 0단계 완료: root에 plan.md/fix.md 생성, CLAUDE.md에 워크플로우 규칙 추가 (npm 고정, 단계 완료 시 plan.md ✅ + fix.md 한 줄 기록)
- 2026-05-08 · 1단계 완료: shadcn init(base-nova, Tailwind v4 기본값), Pretendard 변수 폰트, ThemeProvider(system), SiteHeader(로고+다크모드 토글) — shadcn v2에서 `asChild` 제거됨, `buttonVariants()`로 Link 스타일링
- 2026-05-08 · 2단계 완료: @next/mdx + gray-matter 설치, next.config.ts에 pageExtensions 추가, mdx-components.tsx(shadcn 디자인 토큰 스타일), lib/posts.ts(getAllPosts/getPostBySlug), content/ 샘플 MDX 2개
- 2026-05-08 · 3단계 완료: shadcn card 추가, PostCard 컴포넌트, app/posts/page.tsx(글 목록), app/posts/[slug]/page.tsx(MDX 동적 import + generateStaticParams + generateMetadata) — gray-matter Date 객체 → 문자열 변환 버그 수정
- 2026-05-08 · 4단계 완료: rehype-pretty-code + shiki 설치, dual theme(github-light/dark), globals.css에 shiki CSS 변수 추가, mdx-components.tsx code/pre 스타일 정리 — Turbopack 호환 위해 플러그인을 함수가 아닌 문자열 방식으로 지정
- 2026-05-08 · 5단계 완료: rehype-slug + rehype-autolink-headings + github-slugger 설치, lib/toc.ts(extractTocItems), components/toc.tsx(IntersectionObserver 스크롤 동기화), 상세 페이지 본문+TOC 2단 레이아웃(xl 이상)
- 2026-05-08 · 6단계 완료: 랜딩 Hero 카피 2줄로 보강, 최근 글 섹션(최대 5개 PostCard 그리드) + 전체 글 보기 outline 버튼 추가

## 버그 수정 이력

- 2026-05-08 · 버그 수정: MDX frontmatter가 본문에 렌더링되는 문제
  - **원인**: `@next/mdx`는 YAML frontmatter를 기본 인식하지 않음. `---` 블록이 CommonMark setext heading(h2)으로 파싱되어 "title: ... description: ... date: ... order: ..." 텍스트가 본문에 출력됨
  - **수정**: `remark-frontmatter` 설치 → `next.config.ts`에 `remarkPlugins: ["remark-frontmatter"]` 추가

- 2026-05-08 · 버그 수정: 목차·헤딩 앵커 클릭 시 URL만 변경되고 위치 이동이 안 되는 문제
  - **원인**: `mdx-components.tsx`의 h1~h4 컴포넌트가 `children`만 받고 `{...props}`를 전달하지 않아, `rehype-slug`가 부여하는 `id` 속성이 실제 DOM에 반영되지 않았음
  - **수정**: h1~h4에 `{...props}` spread 추가, `<a href="#id">` 앵커 링크를 Next.js `<Link>` 대신 native `<a>`로 처리, `globals.css`에 `scroll-behavior: smooth` 추가
