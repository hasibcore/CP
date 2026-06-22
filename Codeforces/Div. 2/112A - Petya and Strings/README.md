# A. Petya and Strings
 
| Field | Value |
|---|---|
| **Contest** | [112](https://codeforces.com/contest/112) |
| **Problem** | [112A — Petya and Strings](https://codeforces.com/contest/112/problem/A) |
| **Rating** | 800 |
| **Tags** | implementation, strings |
| **Verdict** | ✅ Accepted |
| **Language** | C++23 (GCC 14-64, msys2) |
| **Runtime** | 92 ms |
| **Memory** | 0 KB |

---

| ⏱ Time Limit | 💾 Memory Limit |
|---|---|
| 2 seconds | 256 megabytes |

---

Little Petya loves presents. His mum bought him two strings of the same size for his birthday. The strings consist of uppercase and lowercase Latin letters. Now Petya wants to compare those two strings lexicographically. The letters' case does not matter, that is an uppercase letter is considered equivalent to the corresponding lowercase letter. Help Petya perform the comparison.

## Input

Each of the first two lines contains a bought string. The strings' lengths range from 1 to 100 inclusive. It is guaranteed that the strings are of the same length and also consist of uppercase and lowercase Latin letters.

## Output

If the first string is less than the second one, print "-1". If the second string is less than the first one, print "1". If the strings are equal, print "0". Note that the letters' case is not taken into consideration when the strings are compared.

## Examples

**Example 1:**

```
aaaa
aaaA

```

**Output 1:**

```
0

```

**Example 2:**

```
abs
Abz

```

**Output 2:**

```
-1

```

**Example 3:**

```
abcdefg
AbCdEfF

```

**Output 3:**

```
1

```

## Note

If you want more formal information about the lexicographical order (also known as the "dictionary order" or "alphabetical order"), you can visit the following site:

- `http://en.wikipedia.org/wiki/Lexicographical_order`

---

> 🔗 [View on Codeforces](https://codeforces.com/problemset/problem/112/A?utm_source=chatgpt.com)

---
*Synced by [CodeSync Pro](https://github.com/parthopaul69/CodeSync-Pro-Extension)*
