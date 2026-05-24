---
name: notion-blog-writer
description: |
  노션 "블로그 템플릿" 데이터베이스에 완성된 블로그 글을 작성하는 스킬.
  사용자가 "블로그 글 써줘", "노션에 블로그 작성해줘", "포스트 작성", "글 써줘" 등을 말할 때 반드시 이 스킬을 사용한다.
  두 가지 경로를 지원한다:
  - 초안이 있을 때: 노션에 이미 간략히 작성된 초안 페이지를 확장해 완성된 블로그 글로 업데이트
  - 초안이 없을 때: 사용자가 제공한 주제·참조 자료를 바탕으로 새 페이지를 생성
  노션 블로그 관련 작업이라면 무조건 이 스킬을 먼저 확인한다.
---

# 노션 블로그 글 작성 스킬

## 고정 설정

- **DB**: `블로그 템플릿` (collection ID: `bb0a8e75-3e3a-8264-8008-87e22d2e7411`)
- **Notion MCP 도구**: `mcp__notion__*` 계열 사용
- **기본 Status**: `Draft` (사용자가 명시적으로 Published를 요청할 때만 변경)

---

## Step 1: 경로 판단

사용자 메시지에서 아래 두 경로 중 하나를 파악한다.

### 경로 A — 노션 초안 기반

> 사용자가 "노션에 ~라는 글이 있는데", "이미 초안이 있어" 등을 언급하는 경우

1. `mcp__notion__notion-search`로 페이지 제목 검색 → `page_id` 확보
2. `mcp__notion__notion-fetch`로 초안 내용 전체 읽기
3. 초안 내용을 분석해 블로그 글의 뼈대(핵심 주제·섹션 구조) 파악
4. **[Step 2 → Step 3]** 순서대로 진행

### 경로 B — 주제/참조자료 기반

> 초안이 없고 사용자가 주제와 참조 자료(URL, 텍스트 등)를 제공하는 경우

1. 사용자가 제공한 내용에서 핵심 주제·독자·톤앤매너를 파악
2. URL이 있으면 내용을 확인해 글의 근거 자료로 활용
3. **[Step 2 → Step 3B]** 순서대로 진행

---

## Step 2: 블로그 글 작성

아래 구조를 기본 골격으로 사용한다. 주제에 맞게 섹션 수와 이름을 조정하되, 핵심 흐름은 유지한다.

```
[도입부]
- 독자가 왜 이 글을 읽어야 하는지 한두 문단으로 설명
- 이 글에서 다룰 내용 한 줄 요약 (--- 구분선으로 마무리)

[H2 본문 섹션 × N개]
- 각 섹션은 명확한 주제 하나
- 필요 시 표(| 기준 | 값 | 형식), 코드 블록, 목록 활용
- 개선법·실전 팁이 있는 섹션은 **개선법:** 굵게 표기

[빠른 참조 코드 블록] (선택)
- 핵심 개념을 한눈에 보여주는 코드/텍스트 블록

[실전 체크리스트]
- [ ] 항목 형식으로 독자가 즉시 실행할 수 있는 액션 아이템
- 섹션별 1~2개씩

[마무리]
- 핵심 메시지 한 문단으로 마무리
```

**톤앤매너 원칙:**
- 독자를 프런트엔드 개발자 또는 취업 준비생으로 가정
- 전문 용어는 처음 등장 시 괄호로 한글 설명
- 딱딱한 나열보다 "왜 이게 중요한가"를 먼저 설명

---

## Step 3A: 기존 페이지 업데이트 (경로 A)

**메타데이터 업데이트** (`update_properties` 커맨드):

```json
{
  "Title": "완성된 블로그 제목 (SEO 친화적, 30자 내외)",
  "Slug": "영문-kebab-case",
  "Description": "검색 결과에 표시될 요약 (100자 내외)",
  "Tags": "[\"적절한태그\"]",
  "Status": "Draft",
  "date:Date:start": "YYYY-MM-DD"
}
```

**Tags 선택 기준** (복수 선택 가능):
- 기술 주제: `Web`, `JavaScript`, `TypeScript`, `React`, `Next.js`, `CSS`, `HTML`
- 도구/환경: `Git`, `Github`, `vscode`, `terminal`, `Codex`, `Notion`
- 렌더링: `SSR`, `SSG`, `ISR`, `CSR`, `AppRouter`, `PageRouter`
- 기타: `async`, `Promise`, `refactor`

**본문 업데이트** (`replace_content` 커맨드):
- Step 2에서 작성한 마크다운을 그대로 `new_str`에 삽입

---

## Step 3B: 새 페이지 생성 (경로 B)

`mcp__notion__notion-create-pages`를 사용해 `블로그 템플릿` DB에 새 페이지 생성:

```json
{
  "parent": { "database_id": "bb0a8e75-3e3a-8264-8008-87e22d2e7411" },
  "properties": {
    "Title": { "title": [{ "text": { "content": "제목" } }] },
    "Slug": { "rich_text": [{ "text": { "content": "slug" } }] },
    "Description": { "rich_text": [{ "text": { "content": "설명" } }] },
    "Status": { "select": { "name": "Draft" } },
    "Tags": { "multi_select": [{ "name": "태그명" }] },
    "Date": { "date": { "start": "YYYY-MM-DD" } }
  },
  "content": "Step 2에서 작성한 마크다운 전문"
}
```

---

## Step 4: 완료 보고

작업이 끝나면 사용자에게 다음을 전달한다:

1. **노션 페이지 URL**
2. **설정된 메타데이터** (제목, Slug, Tags, Date)
3. **다음 액션 제안**: "Status를 Published로 변경할까요?" 또는 "블로그에 바로 연동 가능합니다."

---

## 주의사항

- `notion-update-page`의 `Tags` 속성은 JSON 문자열 배열 형태로 전달: `"[\"Web\"]"`
- 날짜는 항상 `date:Date:start` 키 사용 (expanded format)
- 페이지 본문 교체 시 `replace_content` 커맨드 사용 (`update_content`는 기존 내용이 있어야 함)
- DB collection ID는 고정값이므로 검색 없이 바로 사용 가능
