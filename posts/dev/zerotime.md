---
title: "제로타임 — 학교 공지 통합 서비스 개발기"
date: "2026-04-08"
category: "개발"
description: "125개 게시판을 하나로 모은 학교 공지 알리미 zerotime.kr의 설계와 구현 과정"
tags: ["개발", "Next.js", "FastAPI", "크롤링", "풀스택"]
---

### 제로타임 — 우리학교 공지 통합 서비스 개발기

*125개 게시판, 하나의 피드. 우리학교 공지 알리미 [zerotime.kr](https://zerotime.kr) — 프론트엔드 & 크롤링 개발 중*

---

## 1) 왜 만들게 되었는가

우리학교에는 대학 본부, 단과대학, 학과, 연구기관 등 **125개 이상의 게시판**이 산재해 있다. 장학금, 취업, 학사 공지 같은 중요한 정보를 놓치지 않으려면 수십 개의 게시판을 매일 확인해야 하는 비효율이 존재했다.

학기 초에 장학금 공지를 하루 늦게 발견해서 놓친 적이 있다. 그때 "이걸 한 곳에서 볼 수 있으면 좋겠다"는 생각이 시작이었고, 거기에 키워드 알림까지 붙이면 더 이상 공지를 놓칠 일이 없겠다고 판단했다.

그렇게 **제로타임(zerotime.kr)** — 모든 공지를 한 곳에 모아 보여주고, 키워드 알림을 통해 관심 있는 공지를 자동으로 받아볼 수 있는 서비스가 탄생했다.

제로타임은 팀 프로젝트로, 나는 이전부터 경험이 있었던 **프론트엔드 개발**과 **새롭게 도전해볼 크롤링 엔진 구현**을 맡았다. 이 글에서는 내가 직접 설계하고 구현한 부분을 중심으로 정리한다.

---

## 2) 서비스 구성

제로타임은 프론트엔드와 백엔드 두 개의 저장소로 구성되어 있다.

| 구성 요소 | 저장소 | 역할 |
|-----------|--------|------|
| **프론트엔드** | jbnu-alarm-app-v1 | Next.js 기반 웹/모바일 앱 (Capacitor) |
| **백엔드 API** | jbnu-alarm-api-v1 | FastAPI 기반 REST API, 크롤링, 알림 |

프로덕션은 [zerotime.kr](https://zerotime.kr), 개발 서버는 [dev.zerotime.kr](https://dev.zerotime.kr)로 운영 중이다.

---

## 3) 주요 기능

### 공지 통합 피드

핵심 기능이다. 125개 이상의 게시판을 주기적으로 크롤링하여 하나의 피드로 제공한다. 커서 기반 무한 스크롤로 구현했고, 읽음/안읽음/즐겨찾기 상태를 관리한다. 게스트는 기본 7개 게시판을, 로그인 유저는 원하는 게시판을 직접 선택해서 구독할 수 있다.

### 키워드 알림

사용자가 관심 키워드를 등록하면, 새 공지가 올라올 때 자동으로 매칭해서 알림을 보내준다. 단순한 문자열 검색이 아니라 **Aho-Corasick 알고리즘**(`pyahocorasick`)을 사용해 수백 개의 키워드를 O(n) 시간에 동시 매칭한다. 게시판 범위 필터도 지원한다.

### 시간표 관리

수기 입력은 물론, **Gemini AI** 이미지 인식으로 시간표 사진을 올리면 자동으로 파싱해준다. 시간표 기반으로 빈 시간을 자동 계산한다.

### 커리어 프로필 & 소셜 로그인

학력, 경력, 자격증, 활동 이력을 관리하는 이력서 빌더와, Google/Apple/Naver/Kakao 4개 OAuth 소셜 로그인을 지원한다.

---

## 4) 기술 스택

### Frontend

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) + React 19 |
| 빌드 모드 | Static Export — Capacitor 호환 |
| 네이티브 브릿지 | Capacitor 8 (iOS / Android) |
| 상태 관리 | Zustand + React Query + localStorage |
| HTTP 클라이언트 | Axios (JWT 인터셉터, 자동 리프레시 큐잉) |
| 스타일링 | Tailwind CSS v4 (커스텀 832px 태블릿 브레이크포인트) |
| PWA | @ducanh2912/next-pwa + Workbox 서비스 워커 |
| 테스트 | Playwright E2E + Vitest 단위 테스트 |

### Backend

| 항목 | 기술 |
|------|------|
| 프레임워크 | FastAPI (Python 3.10+) |
| ORM / 검증 | SQLAlchemy 2.0 + Pydantic 2.10 |
| 데이터베이스 | PostgreSQL 16 + Redis 7 |
| 마이그레이션 | Alembic 1.14 |
| 크롤링 | BeautifulSoup4 + lxml + 커스텀 SSL 어댑터 |
| 스케줄링 | APScheduler (KST, ThreadPoolExecutor 20 워커) |
| 인증 | Authlib (OAuth 2.0) + PyJWT (HS256) |
| AI | Google Gemini API (시간표 이미지 분석) |
| 키워드 매칭 | pyahocorasick + RapidFuzz |

### 인프라 & 모니터링

Docker + Docker Compose로 **9개 서비스**를 컨테이너화했다. Nginx로 리버스 프록시와 SSL을 처리하고, Prometheus + Grafana로 메트릭을 수집하며, Loki + Promtail로 로그를 관리한다. CI/CD는 GitHub Actions로 develop 브랜치 푸시 시 GHCR 이미지 빌드 후 자동 배포된다.

---

## 5) 내가 구현한 아키텍처

### 크롤링 엔진: Execute-Parse-Store 패턴

크롤링은 서비스의 심장이고, 내가 직접 설계하고 구현한 부분이다. APScheduler를 KST 기준으로 운영하며, 게시판 성격에 따라 주기를 다르게 설정했다.

- **10분 주기**: 교내 주요 공지 (`home_*` 게시판) — 08:00~19:00
- **60분 주기**: 학과/기관 공지 (`dept_*`, `agency_*`) — 오프셋 분산
- **240분 주기**: 단과대학 공지 (`college_*`) — 1일 3회

흐름은 `Executor → HTTP 요청 → Parser(10종) → DB 저장 + Aho-Corasick 키워드 매칭 → 알림 생성`으로 이어진다. 초기화 시에는 30페이지를 크롤링해 데이터를 축적하고, 이후에는 1페이지만 크롤링해서 신규 공지를 감지한다. 20~60초의 Jitter를 넣어 Thundering herd 문제도 방지했다.

### 프론트엔드 상태 관리 전략

프론트엔드도 내가 담당했다. 상태의 성격에 따라 도구를 나눴다.

| 상태 유형 | 도구 | 예시 |
|-----------|------|------|
| 글로벌 유저 상태 | Zustand | 로그인 여부, 프로필 |
| 서버 상태 | React Query | 공지 목록, 키워드, 팀 |
| 클라이언트 설정 | localStorage | 게시판 구독 (버전 기반 마이그레이션) |
| UI 상태 | Context API | 토스트 알림, 키워드 뱃지 |

---

## 6) 내가 마주친 기술적 챌린지

### 구형 대학 서버 SSL 호환 (크롤링)

전북대 일부 서버는 최신 TLS를 지원하지 않았다. `LegacySSLAdapter`를 구현해서 `SECLEVEL=1`로 낮춘 커스텀 SSL 컨텍스트를 사용했다. LibreSSL(macOS)과 OpenSSL 양쪽 모두에서 동작하도록 처리했다.

### 125개 게시판 크롤링 스케줄 관리 (크롤링)

APScheduler에 Jitter와 오프셋 분산을 적용해 서버 부하를 분산했다. 운영 시간(08:00~19:00)에만 크롤링하도록 제한해서 리소스도 절약했다.

### Capacitor + Next.js Static Export 호환 (프론트엔드)

Next.js의 SSR을 포기하고 Static Export 모드를 사용해 Capacitor와 호환시켰다. PWA와 네이티브 앱을 동시에 지원하되, Capacitor 빌드 시에는 `CAPACITOR_BUILD=true` 플래그로 PWA를 비활성화한다.

### 게스트 → 로그인 유저 구독 마이그레이션 (프론트엔드)

게스트의 localStorage 기반 구독 설정에 버전 관리 시스템을 도입했다. 기본 게시판 목록이 변경될 때 모든 게스트 유저에게 자동으로 마이그레이션이 적용된다.

---

## 7) 데이터베이스 설계

30개 이상의 테이블을 도메인별로 설계했다.

- **공지 시스템**: `notices`, `user_subscriptions`, `user_notices_read`, `user_notices_favorite`
- **키워드 알림**: `user_notices_keyword`, `keyword_subscriptions`, `notice_keyword_matches`
- **사용자/인증**: `users` (4개 소셜 ID 필드 + role 기반 권한)
- **친바**: `chinba_events`, `chinba_participants`, `chinba_unavailabilities`
- **팀/그룹**: `chinba_teams`, `chinba_team_members`, `chinba_groups`
- **커리어**: `career_profiles`, `career_educations`, `career_works`, `career_certifications`
- **시간표**: `user_timetables`, `timetable_classes`, `course_catalog`

---

## 마무리

제로타임은 팀 프로젝트지만, 내가 맡은 프론트엔드와 크롤링 영역만으로도 충분히 도전적이었다.

125개 게시판을 안정적으로 크롤링하면서 서버 부하를 관리하는 것, 구형 대학 서버의 SSL 호환 문제를 해결하는 것, 그리고 Capacitor와 Next.js Static Export를 조합해 웹과 네이티브 앱을 동시에 지원하는 구조를 설계하는 것이 가장 도전적이면서도 재미있었다. 아직 앱 동시 지원은 구현 중이지만 계속 최적화 중이다.

현재 프로덕션에서 운영 중이며, 계속해서 기능을 확장하고 있다.
