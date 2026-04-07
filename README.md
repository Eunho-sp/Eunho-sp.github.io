# Eunho's Blog

**silver의 보안/개발 블로그**

정보보안, 알고리즘, 개발 경험을 기록하기 위해 만든 블로그입니다.
Claude Code + 바이브코딩으로 제작했습니다.

> Built with Claude Code (Anthropic) x Vibe Coding

---

## Tech Stack

| 구분 | 기술 | 버전 |
|------|------|------|
| Framework | Next.js (App Router) | 16.2.2 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | v4 |
| Markdown | gray-matter + next-mdx-remote | 4.0.3 / 6.0.0 |
| Code Highlight | rehype-highlight | ^7.0.2 |
| Typography | @tailwindcss/typography | ^0.5.19 |
| Deploy | GitHub Pages (GitHub Actions) | - |

## 로컬 환경

- **Node.js**: v22.18.0
- **npm**: 10.9.3
- **OS**: Windows 11

---

## 프로젝트 구조

```
├── .github/workflows/deploy.yml   # GitHub Pages 자동 배포
├── posts/                         # 마크다운 글 (.md 추가 시 자동 생성)
├── public/                        # 정적 파일 (favicon, images)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # 루트 레이아웃 (다크 테마, 폰트)
│   │   ├── page.tsx               # 메인 페이지 (소개 + 최신글)
│   │   ├── globals.css            # 테마, 코드 하이라이팅 스타일
│   │   ├── not-found.tsx          # 404 페이지
│   │   └── blog/
│   │       ├── page.tsx           # 전체 글 목록 + 카테고리 필터
│   │       ├── BlogContent.tsx    # 클라이언트 필터링
│   │       └── [slug]/page.tsx    # 포스트 상세 (MDX 렌더링)
│   ├── components/
│   │   ├── Sidebar.tsx            # 프로필, 네비게이션, 카테고리
│   │   ├── Header.tsx             # 모바일 햄버거 메뉴
│   │   ├── Footer.tsx             # 하단 저작권
│   │   ├── PostCard.tsx           # 포스트 미리보기 카드
│   │   ├── PostList.tsx           # 카드 목록 렌더링
│   │   └── CategoryFilter.tsx     # 카테고리 필터 버튼
│   └── lib/
│       ├── posts.ts               # 마크다운 파싱 (getAllPosts, getPostBySlug)
│       ├── types.ts               # PostMeta, Category 타입 정의
│       └── constants.ts           # 카테고리 6종, 사이트 메타
├── next.config.ts                 # output: 'export', 이미지 최적화 off
├── package.json
└── tsconfig.json
```

---

## 카테고리 (6개)

| 카테고리 | 색상 | 용도 |
|----------|------|------|
| 개발 | #3182F6 | 개발 관련 전반 |
| CTF/Wargame | #F04452 | CTF 풀이, 워게임 Writeup |
| BugBounty | #F59E0B | 버그바운티 리포트, 사례 분석 |
| 블로그/기술문서 | #10B981 | 기술 문서, 블로그 운영 |
| 논문/컨퍼런스 | #8B5CF6 | 논문 리뷰, 컨퍼런스 정리 |
| 공모전/자격증 | #EC4899 | 공모전 후기, 자격증 준비 |

---

## 글 작성법

`posts/` 폴더에 `.md` 파일을 추가하면 자동으로 블로그 포스트가 생성됩니다.

### Frontmatter 형식

```yaml
---
title: "글 제목"
date: "2026-04-07"
category: "CTF/Wargame"
description: "글에 대한 한 줄 설명"
tags: ["ctf", "pwn", "writeup"]
---
```

- **title**: 글 제목
- **date**: 작성일 (YYYY-MM-DD)
- **category**: 위 6개 카테고리 중 하나
- **description**: 목록에 표시될 요약
- **tags**: 태그 배열 (선택)

### 파일명 규칙

파일명이 곧 URL slug가 됩니다.
- `posts/my-first-post.md` → `/blog/my-first-post`

---

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev
# → http://localhost:3000

# 정적 빌드
npm run build
# → out/ 디렉토리 생성

# 빌드 결과 로컬 확인
npx serve out
```

---

## 배포 (GitHub Pages)

1. GitHub에서 `Eunho-sp.github.io` 레포지토리 생성
2. Settings > Pages > Source를 **GitHub Actions**로 설정
3. `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동 빌드 & 배포

---

## 디자인

- **테마**: 사이버보안 + 미니멀리즘 다크 모드
- **메인 컬러**: `#3182F6`
- **배경**: `#0d1117` (GitHub Dark 계열)
- **본문 폰트**: Pretendard Variable
- **코드 폰트**: JetBrains Mono
- **코드 하이라이팅**: Atom One Dark 기반 커스텀

---

## 만든 과정

```
eunho          →  요구사항 정의, 설계,코드 작성, 리뷰
Claude Code          →  코드 작성, 빌드, 디버깅
```

---

*© 2026  Eunho Park*
