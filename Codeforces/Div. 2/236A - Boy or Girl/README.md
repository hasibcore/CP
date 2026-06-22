# A. Boy or Girl
 
| Field | Value |
|---|---|
| **Contest** | [236](https://codeforces.com/contest/236) |
| **Problem** | [236A — Boy or Girl](https://codeforces.com/contest/236/problem/A) |
| **Rating** | 800 |
| **Tags** | brute force, implementation, strings |
| **Verdict** | ✅ Accepted |
| **Language** | C++23 (GCC 14-64, msys2) |
| **Runtime** | 92 ms |
| **Memory** | 100 KB |

---

| ⏱ Time Limit | 💾 Memory Limit |
|---|---|
| 1 second | 256 megabytes |

---

Those days, many boys use beautiful girls' photos as avatars in forums. So it is pretty hard to tell the gender of a user at the first glance. Last year, our hero went to a forum and had a nice chat with a beauty (he thought so). After that they talked very often and eventually they became a couple in the network. 

But yesterday, he came to see "her" in the real world and found out "she" is actually a very strong man! Our hero is very sad and he is too tired to love again now. So he came up with a way to recognize users' genders by their user names.

This is his method: if the number of distinct characters in one's user name is odd, then he is a male, otherwise she is a female. You are given the string that denotes the user name, please help our hero to determine the gender of this user by his method.

## Input

The first line contains a non-empty string, that contains only lowercase English letters — the user name. This string contains at most 100 letters.

## Output

If it is a female by our hero's method, print "`CHAT WITH HER!`" (without the quotes), otherwise, print "`IGNORE HIM!`" (without the quotes).

## Examples

**Example 1:**

```
wjmzbmr

```

**Output 1:**

```
CHAT WITH HER!

```

**Example 2:**

```
xiaodao

```

**Output 2:**

```
IGNORE HIM!

```

**Example 3:**

```
sevenkplus

```

**Output 3:**

```
CHAT WITH HER!

```

## Note

For the first example. There are 6 distinct characters in "`wjmzbmr`". These characters are: "`w`", "`j`", "`m`", "`z`", "`b`", "`r`". So wjmzbmr is a female and you should print "`CHAT WITH HER!`".

---

> 🔗 [View on Codeforces](https://codeforces.com/problemset/problem/236/A?utm_source=chatgpt.com)

---
*Synced by [CodeSync Pro](https://github.com/parthopaul69/CodeSync-Pro-Extension)*
