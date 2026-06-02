---
name: add-reference
description: URL을 분석해 content/references/[slug].mdx 파일을 자동 생성하는 스킬
---

# 레퍼런스 추가 스킬

사용자가 URL을 제공하면 사이트를 분석해 `content/references/[slug].mdx` 파일을 자동 생성한다.

## 프로세스

1. **사이트 분석**: WebFetch로 대상 URL 접근 → 서비스명·용도·기능 파악
2. **slug 결정**: 서비스명을 kebab-case로 변환 (예: `stitch`, `v0-by-vercel`, `google-ai-studio`)
3. **중복 확인**: `content/references/` 폴더에 동일 slug가 이미 있으면 사용자에게 알림
4. **파일 생성**: 아래 형식으로 작성

## 파일 형식

```mdx
---
name: 서비스 공식 명칭
url: https://...
description: 핵심 용도를 한 문장으로 (30자 내외, 주어 없이 동사로 시작)
features:
  - 주요 기능 1
  - 주요 기능 2
  - 주요 기능 3
tags:
  - 태그1
  - 태그2
comment: 실사용 관점의 짧은 평가. 장점 한 문장 + 아쉬운 점 한 문장.
date: YYYY-MM-DD
---
```

## 태그 가이드

아래 중 적합한 것을 2-4개 선택:

| 카테고리 | 태그 예시 |
|---------|---------|
| 분야 | `AI` `design` `dev` `productivity` `data` |
| 기능 | `prototyping` `code-gen` `analytics` `automation` |
| 무료 여부 | `free` `paid` `freemium` |
| 제작사 | `Google` `Vercel` `Anthropic` `open-source` |

## 품질 기준

- `features`는 3-6개, 동사로 시작하는 명사구
- `description`은 "~하는 도구" 형식으로 마무리
- `comment`는 추상적 칭찬 금지 — 구체적인 활용 맥락과 한계를 명시
- 모든 필드가 채워진 경우에만 파일 생성

## 완료 후

파일 생성 완료를 알리고, 사용자가 내용을 검토할 수 있도록 생성된 frontmatter를 출력한다.
