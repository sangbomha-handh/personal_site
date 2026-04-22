# sangbomha.xyz 디자인 컨셉 가이드

> **대상**: Claude Code (구현), 하상범 (최종 검토)
> **전제 기획서**: `01_site_plan.md`

---

## 0. 컨셉 한 줄

> **"조용한 신뢰 (Quiet Authority)"**
>
> 시니어 프로덕트 매니저의 이력서 사이트. 과시하지 않고 증명한다. 담백한 편집 디자인의 문법을 따른다.

---

## 1. 디자인 원칙 — 뭘 할지 / 뭘 안 할지

### Do
- **편집 디자인(Editorial)의 문법**: 잡지 기고자 페이지, 연간 리포트, 한국 월간 디자인 잡지의 단 구성
- **타입 중심**: 장식보다 타이포그래피가 주인공
- **여백으로 신뢰**: 빼곡하게 채우지 않는다. 여백 = 자신감
- **숫자 강조**: Proof 섹션의 정량 성과는 **디스플레이 사이즈**로 시각화
- **흑백 + 포인트 1색**: 메인은 무채색, 포인트는 단 하나

### Don't
- ❌ 대시보드 UI 느낌 (카드 그림자, 둥근 모서리 과다, 일러스트 아이콘)
- ❌ 스타트업 랜딩 템플릿 느낌 (히어로 그라디언트, 이모지, 큰 CTA 버튼)
- ❌ AI 생성 UI 느낌 (보라 그라디언트, 글래스모피즘, Inter+둥근 카드)
- ❌ 과장된 애니메이션 (Framer Motion 남발, 패럴랙스, scroll-jacking)
- ❌ 이모지 일체 사용 금지
- ❌ Lucide·Feather 같은 라이너 아이콘 남용 (최소한으로)

---

## 2. 컬러 토큰

### Primary Palette

```css
:root {
  /* Base — 무채색 */
  --color-bg:        #FAFAF7;   /* 아주 옅은 아이보리. 순백보다 덜 피로함 */
  --color-surface:   #FFFFFF;   /* 카드 배경 */
  --color-text:      #18181B;   /* 본문 (거의 검정, 미세한 따스함) */
  --color-text-sub:  #52525B;   /* 보조 텍스트 */
  --color-muted:     #A1A1AA;   /* 메타 정보 */
  --color-border:    #E4E4E7;   /* 경계선 */
  --color-divider:   #F4F4F5;   /* 섹션 구분 */

  /* Accent — 포인트 단 1색 */
  --color-accent:    #1E40AF;   /* 딥 인디고 블루 — 엔지니어링/신뢰 */

  /* 또는 대안 */
  --color-accent-alt: #7C2D12;  /* 다크 러스트 — 편집 디자인 톤 (선택) */
}

[data-theme="dark"] {
  --color-bg:       #0A0A0A;
  --color-surface:  #161616;
  --color-text:     #F4F4F5;
  --color-text-sub: #A1A1AA;
  --color-muted:    #52525B;
  --color-border:   #27272A;
  --color-divider:  #18181B;
  --color-accent:   #93C5FD;
}
```

**포인트 컬러 선택 가이드**:
- **Deep Indigo (#1E40AF)** 권장. B2B 엔지니어링 맥락에 자연스럽고, 한국 시장에서 프로페셔널 톤으로 읽힘.
- 대안 **Dark Rust (#7C2D12)**: 더 편집적이고 감각적. 너무 튀면 경솔하게 읽힐 수 있음.
- **선택은 사용자가 최종.** Claude Code는 기본값 Deep Indigo로 구현.

---

## 3. 타이포그래피

### 폰트 선택

**디스플레이 (Hero 이름, 숫자 강조)**:
- 한글: **Pretendard** (900 Black, 800 ExtraBold)
  - 단, Pretendard는 이미 흔해짐. **대안**: Sandoll 「안그라픽스」 계열 또는 **IBM Plex Sans KR** (덜 쓰임 + 신뢰 톤)
- 영문: **Fraunces** (opsz variable, 숫자 디스플레이에 특히 좋음)

**본문 (Paragraph, List)**:
- 한글: **Pretendard Variable** (400, 500, 700)
- 영문: **Fraunces** 또는 **Source Serif 4** (serif body — 편집 디자인 톤)

**모노스페이스 (태그, 연도, 수치)**:
- **JetBrains Mono** 또는 **IBM Plex Mono** (400, 500)

### 폰트 CDN

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,900;1,9..144,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
```

### 타입 스케일

모바일 기준. Desktop은 일부 항목 확대.

```css
:root {
  --font-display-2xl: 4.5rem;   /* 72px — Hero 이름 (Desktop) */
  --font-display-xl:  3rem;     /* 48px — Hero 이름 (Mobile) */
  --font-display-lg:  3.5rem;   /* 56px — Proof 숫자 강조 */

  --font-h1: 2rem;              /* 32px — 섹션 타이틀 */
  --font-h2: 1.5rem;            /* 24px — Proof 카드 헤드라인 */
  --font-h3: 1.125rem;          /* 18px — 서브 헤드 */

  --font-body-lg: 1.125rem;     /* 18px — Hero 한 줄 설명 */
  --font-body:    1rem;         /* 16px — 본문 */
  --font-body-sm: 0.875rem;     /* 14px — 보조 */
  --font-meta:    0.75rem;      /* 12px — 메타, 연도 */

  --line-tight:  1.15;
  --line-snug:   1.35;
  --line-normal: 1.55;
  --line-loose:  1.75;

  --tracking-tight:  -0.02em;
  --tracking-normal: 0;
  --tracking-wide:   0.04em;
}
```

### 타이포 적용 원칙

- **Hero 이름 "Ha Sangbum"**: Fraunces 900, opsz max, tracking-tight, 아주 크게
- **한글 이름 "하상범"**: Pretendard 800, 영문 이름보다 약간 작게, 동일 라인
- **섹션 헤드 (Proof / Career / Background / Now / Contact)**: Pretendard 700 대문자화된 영문 레이블 + Fraunces 번호(01. 02. 03...)
- **Proof 숫자 (80%, 96.1%)**: Fraunces 900 opsz max, **라인 위 1/3 걸리게** 오버사이즈
- **본문 한글**: Pretendard 400, line-height 1.75 (편안한 읽기)
- **본문 영문**: Fraunces 400 (serif) — 편집지 톤
- **태그**: IBM Plex Mono 500, uppercase, tracking-wide
- **연도·기간**: IBM Plex Mono 400

---

## 4. 레이아웃

### 그리드

**Desktop (1024px+)**: 12-column grid, gutter 24px, max-width 1120px
**Tablet (640-1024px)**: 6-column, gutter 20px
**Mobile (<640px)**: 4-column 또는 단일 컬럼, 16px 좌우 패딩

### 섹션 간 간격

```css
section { padding-block: clamp(4rem, 10vw, 8rem); }
section + section { border-top: 1px solid var(--color-divider); }
```

### Hero 레이아웃

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  (상단 여백 — 넉넉히)                           │
│                                                 │
│  01. Introduction          [프로필 사진]        │
│                                                 │
│  Ha Sangbum                                     │
│  하상범                                         │
│                                                 │
│  B2B SaaS Product Manager                       │
│  LG전자 10년 · 제품 창업 6년 · B2B SaaS 3년     │
│                                                 │
│  고객 문제를 재정의하고 제품으로                │
│  전환해 성과를 만드는 일을 합니다.              │
│                                                 │
│  [이력서 PDF →]  [LinkedIn →]                   │
│                                                 │
│  ─────────────────────────────────              │
│  [GIST]  [LG]  [Red Dot]  [Pal]   (회색톤)     │
│                                                 │
└─────────────────────────────────────────────────┘
```

- 좌측 8컬럼 텍스트, 우측 4컬럼 이미지 (Desktop)
- 모바일에선 이미지를 이름 위로
- 이미지는 **그레이스케일 + 살짝 따뜻한 톤 매핑** CSS 필터
  ```css
  filter: grayscale(0.85) sepia(0.08) contrast(1.02);
  ```

### Proof 레이아웃 — 카드가 아닌 "기사 단"

**일반적인 "카드 UI"를 쓰지 않는다.** 대신 **연속된 에세이 블록**처럼 구성.

```
┌─────────────────────────────────────────────────┐
│  02. Proof                                      │
│                                                 │
│  ───────────────────────────────────            │
│                                                 │
│  포스페이스랩 · 2022-2025                       │
│                                                 │
│  고객 해지를 업세일로                           │
│                                                 │
│  80%          3개사       첫 업세일             │
│  해지방어     신규 고객   창사 이래              │
│                                                 │
│  데이터팀 리더로 합류 당시, 주요 고객사들의     │
│  해지 의사가 누적되던 상황이었다. 제품팀은      │
│  "기능 부족" 가설, 영업팀은 "가격" 가설이었다.  │
│                                                 │
│  ▸ 자발적 고객 미팅 참여로 문제를 재정의        │
│  ▸ 신규 자동화 제품 기획·개발·영업 직접 리드    │
│  ▸ 영업 프로세스 자체 재설계                    │
│                                                 │
│  [고객 문제 재정의] [신규 제품 0→1] [B2B SaaS]  │
│                                                 │
│  ───────────────────────────────────            │
│                                                 │
│  (다음 케이스 — 마인드허브)                     │
│  ...                                            │
└─────────────────────────────────────────────────┘
```

- 카드 박스 X, 섹션 내 수평 디바이더로 구분
- 각 케이스 사이 여백 넉넉히
- 숫자 3개는 **Desktop에서 한 줄 가로 배열**, 모바일에선 세로
- 토글 인터랙션: "자세히 보기" 클릭 시 Action 불릿 확장. **기본은 Situation + 숫자 + 태그까지만 노출**

### Career 레이아웃

좌측 연도 축, 우측 콘텐츠. 회사 단위 묶음은 배경 컬러로 옅게 구분.

```
┌─────────────────────────────────────────────────┐
│  03. Career                                     │
│                                                 │
│  2025 ─┐                                        │
│        │  마인드허브                            │
│   현재 │  콘텐츠팀 팀리더                       │
│        │                                        │
│  2025 ─┤                                        │
│        │  포스페이스랩 · 3년                    │
│        │  데이터팀 팀리더                       │
│  2022 ─┤                                        │
│        │                                        │
│        │  로캣디자인 · 6년                      │
│        │  대표 — 제품 기획·디자인·양산·영업     │
│  2016 ─┤                                        │
│        │                                        │
│        │  LG전자 · 9년                          │
│        │  LSR/UX연구소 선임연구원 (2013-2015)   │
│        │  생산기술원 선임연구원 (2009-2013)     │
│  2007 ─┘  TV연구소 주임연구원 (2007-2009)       │
└─────────────────────────────────────────────────┘
```

- 좌측 연도 컬럼은 세로선 + 노드
- 회사 블록 안에서 내부 이동은 **들여쓰기**로 구분
- 근속 연수("9년", "6년", "3년")는 포인트 컬러

### Now 레이아웃 — "편지 톤"

```
┌─────────────────────────────────────────────────┐
│  05. Now                                        │
│                                                 │
│  (좁은 단, 최대 620px)                          │
│                                                 │
│  handh는 2026년 상반기 중                       │
│  정리 단계에 있습니다.                          │
│                                                 │
│  Paper(getpaper.xyz)는 월 1회 발행의            │
│  개인 프로젝트로 유지합니다.                    │
│                                                 │
│  진행 중인 게임 프로젝트는                      │
│  앱스토어 출시를 끝으로 마무리합니다.           │
│                                                 │
│  조직에 합류해 B2B 제품의                       │
│  의사결정과 성과에 집중하고자 합니다.           │
│                                                 │
└─────────────────────────────────────────────────┘
```

- 섹션 중앙 좁은 단(620px max)
- 본문은 **Fraunces serif 400** — 다른 섹션보다 의도적으로 **편지처럼**
- 행간 넉넉히 (1.9)
- 주변 여백 크게 (위아래 clamp 6rem 이상)

### Contact 레이아웃

```
┌─────────────────────────────────────────────────┐
│  06. Contact                                    │
│                                                 │
│                                                 │
│  Resume.pdf                            2026.Q2  │
│  ─────────────────────────────────────          │
│  Download  →                                    │
│                                                 │
│  LinkedIn                                       │
│  linkedin.com/in/sangbum-ha            →        │
│                                                 │
│  Email                                          │
│  sangbum@...                           →        │
│                                                 │
└─────────────────────────────────────────────────┘
```

- 리스트 형식, 각 항목 사이 얇은 디바이더
- 호버 시 우측 화살표 살짝 이동

---

## 5. 컴포넌트 스펙

### 5-1. 섹션 넘버링

```html
<div class="section-marker">
  <span class="section-num">02.</span>
  <span class="section-title">Proof</span>
</div>
```

```css
.section-marker {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 3rem;
}
.section-num {
  font-family: 'Fraunces', serif;
  font-weight: 900;
  font-size: 1.5rem;
  color: var(--color-accent);
}
.section-title {
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text);
}
```

### 5-2. 숫자 강조 (Proof Metric)

```html
<div class="metric">
  <span class="metric-value">80%</span>
  <span class="metric-label">해지방어</span>
</div>
```

```css
.metric-value {
  font-family: 'Fraunces', serif;
  font-weight: 900;
  font-variation-settings: "opsz" 144;
  font-size: clamp(2.5rem, 6vw, 4rem);
  letter-spacing: -0.03em;
  line-height: 1;
  display: block;
}
.metric-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-sub);
  margin-top: 0.5rem;
  display: block;
}
```

### 5-3. 태그

```html
<ul class="tags">
  <li class="tag">고객 문제 재정의</li>
  <li class="tag">신규 제품 0→1</li>
</ul>
```

```css
.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 2px;           /* 거의 직각. 둥근 모서리 최소 */
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-sub);
  background: transparent;
}
```

### 5-4. 회사 로고 벨트

```css
.logo-belt {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  padding: 2rem 0;
  border-top: 1px solid var(--color-divider);
}
.logo-belt img {
  height: 24px;           /* 작게 */
  width: auto;
  opacity: 0.5;           /* 자기 주장 최소화 */
  filter: grayscale(1);
  transition: opacity 0.3s ease;
}
.logo-belt img:hover {
  opacity: 0.9;
}
```

### 5-5. 토글 (Proof 상세)

- 기본 접힘. 클릭 시 부드럽게 확장.
- 아이콘 X. **텍스트 "자세히 보기 →" / "접기 ↑"** 만.
- 확장 애니메이션은 `height: auto` + CSS transition (또는 JS로 measure)
- 360~600ms, ease-out

### 5-6. 링크 스타일

```css
a {
  color: var(--color-text);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
  transition: border-color 0.2s ease;
}
a:hover {
  border-bottom-color: var(--color-accent);
}
/* 외부 링크 화살표 */
a.external::after {
  content: " →";
  color: var(--color-muted);
}
```

---

## 6. 모션

**원칙: 모션은 발견의 순간에 한 번만.**

### 페이지 로드
- Hero 텍스트: 순차 fade-up (staggered, 100ms 간격, 400ms duration)
- 프로필 이미지: 딜레이 200ms 후 fade-in
- 로고 벨트: 딜레이 600ms 후 fade-in

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero > * {
  animation: fade-up 0.5s ease-out both;
}
.hero > *:nth-child(1) { animation-delay: 0ms; }
.hero > *:nth-child(2) { animation-delay: 100ms; }
.hero > *:nth-child(3) { animation-delay: 200ms; }
.hero > *:nth-child(4) { animation-delay: 300ms; }
```

### 스크롤 진입
- IntersectionObserver로 섹션 진입 시 섹션 마커 + 첫 블록만 fade-up
- **섹션 내부의 모든 요소에 스크롤 애니메이션 걸지 말 것.** 과함.

### 호버
- 링크 밑줄 컬러 전환 (0.2s)
- 로고 투명도 (0.3s)
- 그 외 호버 이펙트 최소화

### 금지
- ❌ 패럴랙스
- ❌ 마우스 커서 추적 효과
- ❌ 텍스트가 글자별로 날아오는 효과
- ❌ 3D 틸트
- ❌ 배경 파티클

---

## 7. 파일 구조 (리팩토링 후)

```
personal_site/
├── CNAME
├── robots.txt
├── sitemap.xml
├── index.html              # 단일 HTML, 모든 섹션 인라인
├── style.css               # 단일 CSS
├── script.js               # 최소한의 JS (토글 + 스크롤 옵저버)
├── images/
│   ├── profile/
│   │   └── sangbum.jpg     # 신규 프로필 사진
│   ├── logo/
│   │   ├── gist.png
│   │   ├── lg.png
│   │   ├── reddot.png
│   │   └── pal.jpg
│   └── etc/
│       └── og_image.png    # 교체
├── pdf/
│   └── resume_ko.pdf       # 최신 이력서
└── .github/workflows/      # 기존 유지
```

**제거**:
- `pages/` 폴더 전체
- `header.html`, `footer.html`
- `images/logo/paper.png`

---

## 8. og_image.png 제작 가이드

**크기**: 1200 × 630 px (OG 표준)

**레이아웃**:
```
┌─────────────────────────────────────────────────┐
│                                                 │
│                                                 │
│  Ha Sangbum                                     │
│  하상범                                         │
│                                                 │
│  B2B SaaS Product Manager                       │
│                                                 │
│  LG 10y · Product Founder 6y · SaaS 3y          │
│                                                 │
│                                                 │
│                                          .xyz   │
└─────────────────────────────────────────────────┘
```

- 배경: `--color-bg` (#FAFAF7)
- 텍스트 좌측 정렬, 좌측 패딩 넉넉히
- 이름: Fraunces 900, 96px
- 직무: Pretendard 700, 42px
- 근속 스탯: IBM Plex Mono 500, 24px, 포인트 컬러
- 우하단: "sangbomha.xyz" 미니멀하게

제작 방식:
- Figma로 제작 후 export
- 또는 Claude Code에게 HTML/Canvas로 생성 요청
- 또는 사용자가 직접 제작

---

## 9. 접근성 체크리스트

- [ ] `<html lang="ko">` 유지
- [ ] 모든 이미지 alt 텍스트
- [ ] 링크 포커스 링 (`:focus-visible` 활용)
- [ ] 본문 대비비 4.5:1 이상
- [ ] 헤드라인 대비비 3:1 이상
- [ ] 의미 있는 시멘틱 태그 (section, article, nav, main, footer)
- [ ] 스킵 링크 (키보드 사용자용) — 선택 사항
- [ ] 애니메이션 `prefers-reduced-motion` 대응

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. 레퍼런스 / 벤치마크

**톤 벤치마크 (Claude Code는 이 맥락을 염두에 둘 것)**:
- **pitchfork.com** — 편집 디자인, serif+sans 혼용, 여백
- **medium engineering blog** — 시니어 엔지니어 톤의 깔끔함
- **rauno.me** — 미니멀 개인 사이트의 모범
- **brianlovin.com** — 시니어 PM/디자이너 개인 사이트
- **paul.copplest.one** — 편집지 톤 개인 사이트

**안 따라가야 할 것**:
- 스타트업 SaaS 랜딩 (Notion, Linear, Vercel 랜딩 X)
- 대시보드 템플릿
- Awwwards 상위 사이트들의 과시적 모션

---

## 11. 구현 우선순위 (Claude Code 기준)

1. CSS 변수 세팅 (컬러, 폰트, 스케일)
2. 폰트 로드
3. Hero 섹션
4. Proof 섹션 (카드 1 먼저, 레이아웃 확정 후 2·3 복제)
5. Career 섹션 (타임라인 레이아웃)
6. Background
7. Now
8. Contact
9. 반응형 조정
10. 모션 추가
11. 접근성 점검
12. Lighthouse 실행·수정

---

**이 문서를 기반으로 Claude Code가 index.html / style.css / script.js를 작성한다.**
**사용자(하상범)는 포인트 컬러(Deep Indigo vs Dark Rust) 선택, 프로필 사진 제공, 최종 voice 검수를 담당한다.**
