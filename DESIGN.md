# DESIGN.md — Claude Workbook 디자인 시스템

Anthropic 공식 스타일 시스템 참조:
https://styles.refero.design/style/47cb86b6-cb2d-41c8-94ba-8607cd7c41cd

디자인 변경 시 이 파일을 먼저 읽고 토큰을 따를 것.

---

## 색상 팔레트

### Light 모드

| 이름 | Hex 참조 | CSS 변수 | 역할 |
|------|----------|----------|------|
| Vellum White | `#faf9f5` | `--background` | 페이지 배경 |
| Off-White | `#f5f4ef` | `--card` | 카드 배경 |
| Ink Black | `#141413` | `--foreground` | 기본 텍스트 |
| Terra Cotta | `#d97757` | `--primary` | 강조색, 버튼, 배지, 액센트 바 |
| Vellum White | `#faf9f5` | `--primary-foreground` | 버튼 위 텍스트 |
| Parchment | `#dedcd1` | `--border` | 테두리, 구분선 |
| Warm Gray | `#eae9e3` | `--muted` | 뮤트 배경 |
| Dusty Gray | `#6b6a62` | `--muted-foreground` | 보조 텍스트, 날짜, 설명 |

### Dark 모드

| 이름 | Hex 참조 | CSS 변수 |
|------|----------|----------|
| Onyx | `#1a1915` | `--background` |
| Off-White | `#f5f4ef` | `--foreground` |
| Dark Card | `#26241e` | `--card` |
| Terra Cotta | `#d97757` (유지) | `--primary` |

> Terra Cotta는 라이트/다크 모드 모두 동일하게 사용한다.

---

## 간격 기준

| 용도 | Tailwind | px 환산 |
|------|----------|---------|
| 페이지 y-패딩 | `py-12` | 48px |
| 섹션 간격 | `gap-8` ~ `gap-10` | 32~40px |
| 카드 패딩 | `p-6` | 24px |
| 카드 내부 좌측 여백 | `pl-5` | 20px |

---

## 모서리 반경

`--radius: 0.6rem` (9.6px) 전역 기준.

| 토큰 | 계산 | 용도 |
|------|------|------|
| `rounded-sm` | 0.36rem | 인풋, 소형 요소 |
| `rounded` | 0.48rem | 기본 |
| `rounded-lg` | 0.6rem | 카드, 버튼 |
| `rounded-xl` | 0.84rem | 큰 카드, 모달 |
| `rounded-full` | 9999px | 배지 |

---

## 타이포그래피

- **폰트**: Pretendard Variable (한글 최적화)
- **제목**: `font-bold tracking-tight`
- **본문**: `leading-7` (줄간격 1.75)
- **배지·캡션**: `text-xs font-medium`
- **코드**: `font-mono text-sm`

---

## 컴포넌트 규칙

### 카드 액센트 바 (PostCard, SkillCard)

```
위치: absolute left-0 inset-y-0
너비: w-[3px]
색상: bg-primary (Terra Cotta)
기본 투명도: opacity-60
호버 투명도: opacity-100
```

### 카테고리·유형 배지

```
shape: rounded-full
bg: bg-primary/15
text: text-primary
ring: ring-1 ring-primary/30
size: text-xs px-2 py-0.5
```

### SiteHeader

```
position: sticky top-0 z-50
bg: bg-background/80 backdrop-blur-sm
border: border-b border-border
height: h-14
```

### 호버 효과 (카드)

```
transform: -translate-y-0.5
shadow: hover:shadow-md
ring: hover:ring-foreground/20
duration: 200ms
```

---

## 새 컴포넌트 추가 시 체크리스트

- [ ] 하드코딩된 색상값 (`orange-*`, `#hex`) 대신 CSS 변수 (`--primary`, `--border` 등) 사용
- [ ] 라이트/다크 모드 모두 테스트
- [ ] 모서리 반경은 `--radius` 기반 유틸리티 사용
- [ ] 호버 transition은 `duration-200` 통일
