# Claude Code 학습 정리 사이트 구축 계획

> 원본 plan: `~/.claude/plans/tidy-shimmying-waffle.md`
> 작업 시작 전 반드시 이 파일을 먼저 확인하여 흐름을 파악할 것.

## Context

사용자가 Claude Code를 학습하면서 정리한 내용을 정리·복습하고, Claude Code를 모르는 사람도 읽고 학습할 수 있도록 돕는 개인 학습 정리 사이트를 만든다.

- 글은 노션 API로 기존 정리물을 **참조**하면서, 사용자가 직접 가독성 있게 다듬어 MDX로 작성한다 (자동 동기화 X)
- 글 수가 많지 않을 수 있으므로, 카테고리/태그 같은 분류 체계 없이 **평평한 글 목록**으로 시작한다
- 작업은 한 번에 몰아서가 아니라 **단계별로 차례대로** 진행한다

## 결정 사항 (확정)

| 항목 | 결정 |
| --- | --- |
| 컨텐츠 형식 | MDX (`content/` 폴더, 평평한 구조) |
| 사이트 구조 | 랜딩 + 챕터 형식 (Hero → 글 목록 → 상세 페이지) |
| 다크모드 | next-themes (기본 system) |
| 코드 하이라이팅 | rehype-pretty-code + Shiki (dual theme) |
| TOC | rehype-slug + rehype-autolink-headings로 자동 추출 |
| UI 라이브러리 | shadcn/ui — **New York 스타일** (Tailwind v4 호환) |
| 한글 폰트 | **Pretendard** |
| 패키지 매니저 | **npm** |
| 배포 | Vercel |
| 카테고리/태그 | **당장 만들지 않음** (글이 늘면 그때 도입) |

## 워크플로우 규칙

- **`plan.md`** (root, 이 파일): 프로젝트 전체 계획·로드맵. 작업 시작 전 흐름 파악용.
- **`fix.md`** (root): 작업하면서 변경된 사항·결정·수정 이력을 누적 기록. 단계 완료 시마다 한 줄 이상.
- **`CLAUDE.md`** (root): Claude Code가 작업 시 기억해야 할 프로젝트 규칙. 새 규칙 발생 시 한 줄이라도 추가.
- **CLAUDE.md 분리화**: root `CLAUDE.md`가 너무 길어지면 `app/CLAUDE.md`, `content/CLAUDE.md` 같이 폴더별로 분리.

## 단계별 구현 순서

각 단계는 독립적으로 동작 확인 가능하게 끊는다. 한 단계 완료 후 사용자 확인 → 다음 단계.

### 작업 완료 표시 규칙

각 단계 종료 시 **세 가지를 모두** 한다:

1. **`plan.md` 헤더 갱신** — `### N단계:` → `### N단계: ✅ 완료 (YYYY-MM-DD)`
2. **`fix.md`에 한 줄 기록** — `- YYYY-MM-DD · N단계 완료: 요약`
3. **사용자 보고** — 변경 파일·확인 방법 짧게 + 다음 단계 진행 여부 확인

진행 중 단계는 `🚧 진행중`으로 임시 표시 가능.

### 0단계: ✅ 완료 (2026-05-08) — 워크플로우 파일 셋업

- root `plan.md` 생성 (이 파일)
- root `fix.md` 생성 (변경 이력 누적용)
- root `CLAUDE.md`에 작업 규칙 추가:
  - 패키지 매니저는 npm 사용
  - 단계 완료 시 plan.md 체크 갱신 + fix.md 한 줄 기록

### 1단계: ✅ 완료 (2026-05-08) — shadcn/ui 초기화 + 기본 레이아웃 + 다크모드

- `npx shadcn@latest init` → 스타일 **New York** 선택 (Tailwind v4 호환)
- `npm install next-themes pretendard`
- `app/layout.tsx`에 Pretendard 적용
- `components/theme-provider.tsx` + `ThemeProvider`로 layout 감싸기 (`defaultTheme="system"`)
- `components/site-header.tsx`: 로고, "글 목록" 링크, 다크모드 토글
- `app/page.tsx`에 임시 Hero 섹션
- **검증**: `npm run dev` → 헤더 + 다크모드 토글 + Pretendard 적용 확인

### 2단계: ✅ 완료 (2026-05-08) — MDX 파이프라인 + 컨텐츠 로더

- `npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx gray-matter`
- `next.config.ts`에 MDX plugin 추가 (`pageExtensions` 확장)
- `mdx-components.tsx` 생성 (h1~h3, code, pre, a 등 shadcn 스타일 매핑)
- `content/` 폴더 + 샘플 MDX 2개 (frontmatter: `title`, `description`, `date`, `order`)
- `lib/posts.ts`: `getAllPosts()`, `getPostBySlug()` (gray-matter)
- **검증**: 파일 메타데이터 출력 확인

### 3단계: ✅ 완료 (2026-05-08) — 글 목록 + 상세 페이지

- `npx shadcn@latest add card button`
- `app/posts/page.tsx`: PostCard 리스트 (`order` 우선, 동률은 date 내림차순)
- `app/posts/[slug]/page.tsx`: MDX 렌더링 + `generateStaticParams` + `generateMetadata`
- `components/post-card.tsx`
- **검증**: `/posts` 목록 → 상세 진입 → MDX 본문 렌더링

### 4단계: ✅ 완료 (2026-05-08) — 코드 하이라이팅

- `npm install rehype-pretty-code shiki`
- MDX rehypePlugins에 추가, dual theme(`github-light` + `github-dark`)
- `mdx-components.tsx`의 `pre`, `code` 스타일 다듬기
- **검증**: 라이트/다크 모두 코드블록 정상 표시

### 5단계: ✅ 완료 (2026-05-08) — TOC (목차) 자동 생성

- `npm install rehype-slug rehype-autolink-headings`
- 헤딩에 id 부여
- `components/toc.tsx`: h2/h3 추출 → 우측 사이드바
- IntersectionObserver로 현재 섹션 하이라이트
- 상세 페이지 레이아웃 `[본문 + TOC]` 2단 분할
- **검증**: 헤딩 여러 개 글에서 TOC 표시 + 스크롤 동기화

### 6단계: ✅ 완료 (2026-05-08) — 랜딩 페이지 마무리

- Hero 카피 다듬기
- "최근 글" 섹션 (3~5개)
- shadcn Button "글 목록 보기" CTA
- **검증**: 첫 방문자가 사이트 목적 한눈에 이해

### 7단계 (선택): 노션 API 참조 스크립트

- `scripts/notion-fetch.ts` (사이트 빌드와 분리)
- Notion integration token으로 페이지 fetch → 콘솔/임시 .md 출력
- **사용자 작업 도구일 뿐, 사이트 런타임과 무관**

## 주의사항

- **AGENTS.md 지침 준수**: Next.js 16은 LLM 학습 데이터와 다르다. 각 단계 시작 전 `node_modules/next/dist/docs/` 관련 가이드를 먼저 읽고 코드 작성.
- **shadcn/ui + Tailwind v4 호환성**: shadcn init이 Tailwind v4 모드인지 확인. CSS 변수 방식이 v3와 다르므로 `globals.css` 구조 주의.
- **Cache Components**: 1~6단계는 일단 기본 SSG, 안정화 후 `use cache` 도입 검토.

## 핵심 파일 (수정/신규)

| 파일 | 용도 |
| --- | --- |
| `app/layout.tsx` | ThemeProvider, 폰트, 사이트 헤더 |
| `app/page.tsx` | 랜딩 |
| `app/posts/page.tsx` | 글 목록 |
| `app/posts/[slug]/page.tsx` | MDX 렌더링 + TOC |
| `next.config.ts` | MDX plugin, rehype 플러그인 체인 |
| `mdx-components.tsx` | MDX → React 매핑 |
| `lib/posts.ts` | 컨텐츠 로딩 유틸 |
| `components/site-header.tsx` | 네비 |
| `components/toc.tsx` | 목차 |
| `content/*.mdx` | 실제 학습 글 |

## 전체 검증 (모든 단계 완료 후)

1. `npm run build` 무사 통과 (타입 에러 0, ESLint 에러 0)
2. `npm run dev`로 띄워서 동작 확인:
   - 다크/라이트 토글이 새로고침 후에도 유지
   - `/posts` 목록 → 상세 진입 가능
   - 코드블록이 두 테마에서 모두 정상
   - TOC 스크롤 동기화 동작
3. Lighthouse 90+ (성능/접근성)
4. Vercel preview 배포 정상 빌드
