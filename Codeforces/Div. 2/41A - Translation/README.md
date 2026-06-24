# A. Translation
 
| Field | Value |
|---|---|
| **Contest** | [41](https://codeforces.com/contest/41) |
| **Problem** | [41A — Translation](https://codeforces.com/contest/41/problem/A) |
| **Rating** | 800 |
| **Tags** | implementation, strings |
| **Verdict** | ✅ Accepted |
| **Language** | C++23 (GCC 14-64, msys2) |
| **Runtime** | 31 ms |
| **Memory** | 0 KB |

---

| ⏱ Time Limit | 💾 Memory Limit |
|---|---|
| 1 second | 256 megabytes |

---

The translation from the Berland language into the Birland language is not an easy task. Those languages are very similar: a Berlandish word differs from a Birlandish word with the same meaning a little: it is spelled (and pronounced) reversely. For example, a Berlandish word `code` corresponds to a Birlandish word `edoc`. However, making a mistake during the "translation" is easy. Vasya translated the word *s* from Berlandish into Birlandish as *t*. Help him: find out if he translated the word correctly.

## Input

The first line contains word *s*, the second line contains word *t*. The words consist of lowercase Latin letters. The input data do not contain unnecessary spaces. The words are not empty and their lengths do not exceed 100 symbols.

## Output

If the word *t* is a word *s*, written reversely, print `YES`, otherwise print `NO`.

## Examples

**Example 1:**

```
codeedoc
```

**Output 1:**

```
YES
```

**Example 2:**

```
abbaba
```

**Output 2:**

```
NO
```

**Example 3:**

```
codecode
```

**Output 3:**

```
NO
```

---

> 🔗 [View on Codeforces](https://codeforces.com/contest/41/problem/A)

---
*Synced by [CodeSync Pro](https://github.com/parthopaul69/CodeSync-Pro-Extension)*
