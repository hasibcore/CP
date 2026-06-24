# A. Puzzles
 
| Field | Value |
|---|---|
| **Contest** | [337](https://codeforces.com/contest/337) |
| **Problem** | [337A — Puzzles](https://codeforces.com/contest/337/problem/A) |
| **Rating** | 900 |
| **Tags** | greedy |
| **Verdict** | ✅ Accepted |
| **Language** | C++23 (GCC 14-64, msys2) |
| **Runtime** | 62 ms |
| **Memory** | 0 KB |

---

| ⏱ Time Limit | 💾 Memory Limit |
|---|---|
| 1 second | 256 megabytes |

---

The end of the school year is near and Ms. Manana, the teacher, will soon have to say goodbye to a yet another class. She decided to prepare a goodbye present for her *n* students and give each of them a jigsaw puzzle (which, as wikipedia states, is a tiling puzzle that requires the assembly of numerous small, often oddly shaped, interlocking and tessellating pieces).

The shop assistant told the teacher that there are *m* puzzles in the shop, but they might differ in difficulty and size. Specifically, the first jigsaw puzzle consists of *f*_1 pieces, the second one consists of *f*_2 pieces and so on.

Ms. Manana doesn't want to upset the children, so she decided that the difference between the numbers of pieces in her presents must be as small as possible. Let *A* be the number of pieces in the largest puzzle that the teacher buys and *B* be the number of pieces in the smallest such puzzle. She wants to choose such *n* puzzles that *A* - *B* is minimum possible. Help the teacher and find the least possible value of *A* - *B*.

## Input

The first line contains space-separated integers *n* and *m* (2 ≤ *n* ≤ *m* ≤ 50). The second line contains *m* space-separated integers *f*_1, *f*_2, ..., *f*_*m* (4 ≤ *f*_*i* ≤ 1000) — the quantities of pieces in the puzzles sold in the shop.

## Output

Print a single integer — the least possible difference the teacher can obtain.

## Examples

**Example:**

```
4 6
10 12 10 7 5 22

```

**Output:**

```
5

```

## Note

Sample 1. The class has 4 students. The shop sells 6 puzzles. If Ms. Manana buys the first four puzzles consisting of 10, 12, 10 and 7 pieces correspondingly, then the difference between the sizes of the largest and the smallest puzzle will be equal to 5. It is impossible to obtain a smaller difference. Note that the teacher can also buy puzzles 1, 3, 4 and 5 to obtain the difference 5.

---

> 🔗 [View on Codeforces](https://codeforces.com/problemset/problem/337/A?utm_source=chatgpt.com)

---
*Synced by [CodeSync Pro](https://github.com/parthopaul69/CodeSync-Pro-Extension)*
