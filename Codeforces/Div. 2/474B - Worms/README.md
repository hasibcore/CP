# B. Worms
 
| Field | Value |
|---|---|
| **Contest** | [474](https://codeforces.com/contest/474) |
| **Problem** | [474B — Worms](https://codeforces.com/contest/474/problem/B) |
| **Rating** | 1200 |
| **Tags** | binary search, implementation |
| **Verdict** | ✅ Accepted |
| **Language** | C++23 (GCC 14-64, msys2) |
| **Runtime** | 250 ms |
| **Memory** | 0 KB |

---

| ⏱ Time Limit | 💾 Memory Limit |
|---|---|
| 1 second | 256 megabytes |

---

It is lunch time for Mole. His friend, Marmot, prepared him a nice game for lunch.

Marmot brought Mole *n* ordered piles of worms such that *i*-th pile contains *a*_(*i*) worms. He labeled all these worms with consecutive integers: worms in first pile are labeled with numbers 1 to *a*_(1), worms in second pile are labeled with numbers *a*_(1) + 1 to *a*_(1) + *a*_(2) and so on. See the example for a better understanding.

Mole can't eat all the worms (Marmot brought a lot) and, as we all know, Mole is blind, so Marmot tells him the labels of the best juicy worms. Marmot will only give Mole a worm if Mole says correctly in which pile this worm is contained.

Poor Mole asks for your help. For all juicy worms said by Marmot, tell Mole the correct answers.

## Input

The first line contains a single integer *n* (1 ≤ *n* ≤ 10^(5)), the number of piles.

The second line contains *n* integers *a*_(1), *a*_(2), ..., *a*_(*n*) (1 ≤ *a*_(*i*) ≤ 10^(3), *a*_(1) + *a*_(2) + ... + *a*_(*n*) ≤ 10^(6)), where *a*_(*i*) is the number of worms in the *i*-th pile.

The third line contains single integer *m* (1 ≤ *m* ≤ 10^(5)), the number of juicy worms said by Marmot.

The fourth line contains *m* integers *q*_(1), *q*_(2), ..., *q*_(*m*) (1 ≤ *q*_(*i*) ≤ *a*_(1) + *a*_(2) + ... + *a*_(*n*)), the labels of the juicy worms.

## Output

Print *m* lines to the standard output. The *i*-th line should contain an integer, representing the number of the pile where the worm labeled with the number *q*_(*i*) is.

## Examples

**Example:**

```
52 7 3 4 931 25 11
```

**Output:**

```
153
```

## Note

For the sample input:

 - The worms with labels from [1, 2] are in the first pile.
- The worms with labels from [3, 9] are in the second pile.
- The worms with labels from [10, 12] are in the third pile.
- The worms with labels from [13, 16] are in the fourth pile.
- The worms with labels from [17, 25] are in the fifth pile.

---

> 🔗 [View on Codeforces](https://codeforces.com/contest/474/problem/B)

---
*Synced by [CodeSync Pro](https://github.com/parthopaul69/CodeSync-Pro-Extension)*
