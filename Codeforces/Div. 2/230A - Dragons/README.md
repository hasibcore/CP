# A. Dragons
 
| Field | Value |
|---|---|
| **Contest** | [230](https://codeforces.com/contest/230) |
| **Problem** | [230A — Dragons](https://codeforces.com/contest/230/problem/A) |
| **Rating** | 1000 |
| **Tags** | greedy, sortings |
| **Verdict** | ✅ Accepted |
| **Language** | C++23 (GCC 14-64, msys2) |
| **Runtime** | 62 ms |
| **Memory** | 0 KB |

---

| ⏱ Time Limit | 💾 Memory Limit |
|---|---|
| 2 seconds | 256 megabytes |

---

Kirito is stuck on a level of the MMORPG he is playing now. To move on in the game, he's got to defeat all *n* dragons that live on this level. Kirito and the dragons have strength, which is represented by an integer. In the duel between two opponents the duel's outcome is determined by their strength. Initially, Kirito's strength equals *s*.

If Kirito starts duelling with the *i*-th (1 ≤ *i* ≤ *n*) dragon and Kirito's strength is not greater than the dragon's strength *x*_*i*, then Kirito loses the duel and dies. But if Kirito's strength is greater than the dragon's strength, then he defeats the dragon and gets a bonus strength increase by *y*_*i*.

Kirito can fight the dragons in any order. Determine whether he can move on to the next level of the game, that is, defeat all dragons without a single loss.

## Input

The first line contains two space-separated integers *s* and *n* (1 ≤ *s* ≤ 10^4, 1 ≤ *n* ≤ 10^3). Then *n* lines follow: the *i*-th line contains space-separated integers *x*_*i* and *y*_*i* (1 ≤ *x*_*i* ≤ 10^4, 0 ≤ *y*_*i* ≤ 10^4) — the *i*-th dragon's strength and the bonus for defeating it.

## Output

On a single line print "`YES`" (without the quotes), if Kirito can move on to the next level and print "`NO`" (without the quotes), if he can't.

## Examples

**Example 1:**

```
2 2
1 99
100 0

```

**Output 1:**

```
YES

```

**Example 2:**

```
10 1
100 100

```

**Output 2:**

```
NO

```

## Note

In the first sample Kirito's strength initially equals 2. As the first dragon's strength is less than 2, Kirito can fight it and defeat it. After that he gets the bonus and his strength increases to 2 + 99 = 101. Now he can defeat the second dragon and move on to the next level.

In the second sample Kirito's strength is too small to defeat the only dragon and win.

---

> 🔗 [View on Codeforces](https://codeforces.com/problemset/problem/230/A?utm_source=chatgpt.com)

---
*Synced by [CodeSync Pro](https://github.com/parthopaul69/CodeSync-Pro-Extension)*
