# A. String Task
 
| Field | Value |
|---|---|
| **Contest** | [118](https://codeforces.com/contest/118) |
| **Problem** | [118A — String Task](https://codeforces.com/contest/118/problem/A) |
| **Rating** | 1000 |
| **Tags** | implementation, strings |
| **Verdict** | ✅ Accepted |
| **Language** | C++23 (GCC 14-64, msys2) |
| **Runtime** | 92 ms |
| **Memory** | 100 KB |

---

| ⏱ Time Limit | 💾 Memory Limit |
|---|---|
| 2 seconds | 256 megabytes |

---

Petya started to attend programming lessons. On the first lesson his task was to write a simple program. The program was supposed to do the following: in the given string, consisting if uppercase and lowercase Latin letters, it: 

 - deletes all the vowels,
- inserts a character "`.`" before each consonant,
- replaces all uppercase consonants with corresponding lowercase ones.

Vowels are letters "A", "O", "Y", "E", "U", "I", and the rest are consonants. The program's input is exactly one string, it should return the output as a single string, resulting after the program's processing the initial string.

Help Petya cope with this easy task.

## Input

The first line represents input string of Petya's program. This string only consists of uppercase and lowercase Latin letters and its length is from 1 to 100, inclusive.

## Output

Print the resulting string. It is guaranteed that this string is not empty.

## Examples

**Example 1:**

```
tour
```

**Output 1:**

```
.t.r
```

**Example 2:**

```
Codeforces
```

**Output 2:**

```
.c.d.f.r.c.s
```

**Example 3:**

```
aBAcAba
```

**Output 3:**

```
.b.c.b
```

---

> 🔗 [View on Codeforces](https://codeforces.com/contest/118/problem/A)

---
*Synced by [CodeSync Pro](https://github.com/parthopaul69/CodeSync-Pro-Extension)*
