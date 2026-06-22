# A. Stones on the Table
 
| Field | Value |
|---|---|
| **Contest** | [266](https://codeforces.com/contest/266) |
| **Problem** | [266A — Stones on the Table](https://codeforces.com/contest/266/problem/A) |
| **Rating** | 800 |
| **Tags** | implementation |
| **Verdict** | ✅ Accepted |
| **Language** | C++23 (GCC 14-64, msys2) |
| **Runtime** | 92 ms |
| **Memory** | 0 KB |

---

| ⏱ Time Limit | 💾 Memory Limit |
|---|---|
| 2 seconds | 256 megabytes |

---

There are *n* stones on the table in a row, each of them can be red, green or blue. Count the minimum number of stones to take from the table so that any two neighboring stones had different colors. Stones in a row are considered neighboring if there are no other stones between them.

## Input

The first line contains integer *n* (1 ≤ *n* ≤ 50) — the number of stones on the table. 

The next line contains string *s*, which represents the colors of the stones. We'll consider the stones in the row numbered from 1 to *n* from left to right. Then the *i*-th character *s* equals "`R`", if the *i*-th stone is red, "`G`", if it's green and "`B`", if it's blue.

## Output

Print a single integer — the answer to the problem.

## Examples

**Example 1:**

```
3
RRG

```

**Output 1:**

```
1

```

**Example 2:**

```
5
RRRRR

```

**Output 2:**

```
4

```

**Example 3:**

```
4
BRBG

```

**Output 3:**

```
0

```

---

> 🔗 [View on Codeforces](https://codeforces.com/problemset/problem/266/A?adcd1e=caf4fiim2c8iem&csrf_token=ff7e1158f5a37182d5a926d0647f17d9)

---
*Synced by [CodeSync Pro](https://github.com/parthopaul69/CodeSync-Pro-Extension)*
