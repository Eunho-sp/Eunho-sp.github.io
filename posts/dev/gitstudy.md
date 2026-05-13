---
title: "Git 배우기"
date: "2026-05-13"
category: "개발"
description: "로컬과 원격 상황에서 git 배우기"
tags: ["개발", "git"]
---

## 들어가며

Git을 책으로만 읽으면 명령어가 머릿속에 잘 남지 않았다. `commit`, `branch`, `merge`까지는 어떻게든 따라가도 `rebase`, `cherry-pick`, `HEAD~3` 같은 표현이 나오면 손이 멈췄다.

이 사이트는 크게 **로컬 4개 시퀀스**(Intro / Ramping Up / Moving Work Around / A Mixed Bag)와 **원격 2개 시퀀스**(Push & Pull / To Origin and Beyond)로 구성돼 있다.

## 로컬 편

### 1. Intro Sequence

**1-1. 커밋하기** — 현재 브랜치에 새 커밋을 추가한다.

```bash
git commit
```

**1-2. 브랜치 생성** — 새 브랜치를 만든다. `-b`로 만들면서 이동까지.

```bash
git branch <name>
git checkout -b <name>     # git switch -c <name>
```

**1-3. 머지** — 두 브랜치를 합치고 머지 커밋을 만든다.

```bash
git checkout main
git merge bugFix
```

**1-4. 리베이스** — 브랜치를 다른 브랜치 끝으로 옮겨 이력을 선형화한다.

```bash
git checkout bugFix
git rebase main
```

### 2. Ramping Up

**2-1. HEAD 분리** — 커밋 해시로 직접 이동하면 detached HEAD 상태가 된다.

```bash
git checkout C1
```

**2-2. 상대 참조 `^`** — 부모 커밋으로 한 단계 이동.

```bash
git checkout main^
git checkout HEAD^
```

**2-3. 상대 참조 `~n`** — 여러 단계를 한 번에 이동.

```bash
git checkout HEAD~3
```

**2-4. 브랜치 강제 이동** — 브랜치 포인터를 임의의 커밋으로.

```bash
git branch -f main HEAD~3
```

**2-5. 작업 되돌리기**

```bash
git reset HEAD~1     # 로컬에서 커밋 제거 (이력 변경)
git revert HEAD      # 상쇄 커밋 추가 (안전)
```

### 3. Moving Work Around

**3-1. Cherry-pick** — 다른 브랜치의 특정 커밋만 현재 위치에 복사.

```bash
git cherry-pick C2 C4 C7
```

**3-2. 인터랙티브 리베이스** — 커밋 순서 변경/삭제/병합/메시지 수정.

```bash
git rebase -i HEAD~4
```

### 4. A Mixed Bag

**4-1. 태그** — 특정 커밋에 영구 라벨.

```bash
git tag v1 C1
```

**4-2. Describe** — 가장 가까운 태그 기준으로 현재 위치 표현.

```bash
git describe <ref>
```

**4-3. 직전 커밋 수정**

```bash
git commit --amend
```

**4-4. 다중 부모 참조** — 머지 커밋의 두 번째 부모는 `^2`. 체이닝 가능.

```bash
git checkout HEAD~^2~2
```

## 원격 편

### 5. Push & Pull

**5-1. Clone 소개** — 원격 저장소 복제. 로컬에 `o/main`(remote-tracking) 생성됨.

```bash
git clone
```

**5-2. 원격 브랜치** — `o/main`을 체크아웃하면 detached HEAD 상태가 되어, 거기서 커밋해도 로컬 main 은 움직이지 않는다.

```bash
git commit
git checkout o/main
git commit
```

**5-3. Git Fetch** — 원격 변경분을 `o/main`까지만 가져온다. 로컬 브랜치는 그대로.

```bash
git fetch
```

**5-4. Git Pull** — `fetch` + `merge`.

```bash
git pull
```

**5-5. 가짜 팀워크 (Fake Teamwork)** — 사이트 전용 명령. 다른 사람이 원격에 push한 것처럼 시뮬레이션해준다.

```bash
git fakeTeamwork main 2
git commit
git pull
```

**5-6. Git Push** — 로컬 커밋을 원격에 반영.

```bash
git commit
git commit
git push
```

**5-7. 엇갈린 히스토리 (Diverged History)** — 원격과 로컬 양쪽에 새 커밋이 있을 때. `pull --rebase`로 합친 뒤 push.

```bash
git fakeTeamwork
git commit
git pull --rebase
git push
```

**5-8. 잠겨버린 main (Locked Main)** — main에 직접 push 금지된 워크플로우. feature 브랜치를 만들어 푸시.

```bash
git reset --hard o/main
git checkout -b feature C2
git push
```

### 6. To Origin and Beyond

**6-1. Push main!** — feature 브랜치들을 main 위로 차례로 rebase한 뒤 push. 이력을 선형으로 유지.

```bash
git fetch
git rebase o/main side1
git rebase side1 side2
git rebase side2 side3
git rebase side3 main
git push
```

**6-2. 원격 작업과 merge하기 (Merging with remotes)** — rebase 대신 merge로 합쳐 push. 분기 이력 보존.

```bash
git checkout main
git pull
git merge side1
git merge side2
git merge side3
git push
```

**6-3. 원격 저장소 추적하기 (Remote Tracking)** — 로컬 브랜치가 어떤 원격 브랜치를 추적할지 명시. 만들 때부터 추적 설정.

```bash
git checkout -b side o/main
git commit
git pull --rebase
git push
```

**6-4. Git push 파라미터** — 어디에서 어디로 보낼지 명시.

```bash
git push origin main
git push origin foo
```

**6-5. Git push 파라미터 확장판** — `<source>:<destination>` 문법. source 에는 상대 참조도 가능.

```bash
git push origin foo:main
git push origin main^:foo
```

**6-6. Fetch 파라미터** — 원격의 어디를 가져와 로컬의 어디에 둘지.

```bash
git fetch origin c3:foo
git fetch origin c6:main
git checkout foo
git merge main
```

**6-7. Source가 없다 (Source of nothing)** — `<source>`를 비우면 의미가 달라진다.

```bash
git push origin :foo            # origin 의 foo 브랜치 삭제
git fetch origin :bar           # 로컬에 빈 bar 브랜치 생성
```

**6-8. Pull 파라미터** — fetch + merge 의 인자 규칙도 동일.

```bash
git pull origin C3:foo
git pull origin C2:side
git pull origin C0:main
```

![clone](/images/dev/gitstudy/clone.png)

![main](/images/dev/gitstudy/main.png)
