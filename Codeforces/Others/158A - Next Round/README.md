# A. Next Round
 
| Field | Value |
|---|---|
| **Contest** | [158](https://codeforces.com/contest/158) |
| **Problem** | [158A — Next Round](https://codeforces.com/contest/158/problem/A) |
| **Rating** | 800 |
| **Tags** | *special, implementation |
| **Verdict** | ✅ Accepted |
| **Language** | C++23 (GCC 14-64, msys2) |
| **Runtime** | 92 ms |
| **Memory** | 100 KB |

---

| ⏱ Time Limit | 💾 Memory Limit |
|---|---|
| 3 seconds | 256 megabytes |

---

"Contestant who earns a score equal to or greater than the *k*-th place finisher's score will advance to the next round, as long as the contestant earns a positive score..." — an excerpt from contest rules.

A total of *n* participants took part in the contest (*n* ≥ *k*), and you already know their scores. Calculate how many participants will advance to the next round.

## Input

The first line of the input contains two integers *n* and *k* (1 ≤ *k* ≤ *n* ≤ 50) separated by a single space.

The second line contains *n* space-separated integers *a*_1, *a*_2, ..., *a*_*n* (0 ≤ *a*_*i* ≤ 100), where *a*_*i* is the score earned by the participant who got the *i*-th place. The given sequence is non-increasing (that is, for all *i* from 1 to *n* - 1 the following condition is fulfilled: *a*_*i* ≥ *a*_*i* + 1).

## Output

Output the number of participants who advance to the next round.

## Examples

**Example 1:**

```
8 5
10 9 8 7 7 7 5 5

```

**Output 1:**

```
6

```

**Example 2:**

```
4 2
0 0 0 0

```

**Output 2:**

```
0

```

## Note

In the first example the participant on the 5th place earned 7 points. As the participant on the 6th place also earned 7 points, there are 6 advancers.

In the second example nobody got a positive score.

---

> 🔗 [View on Codeforces](https://codeforces.com/problemset/problem/158/A)

---
*Synced by [CodeSync Pro](https://github.com/parthopaul69/CodeSync-Pro-Extension)*
