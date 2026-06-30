# B. Interesting drink
 
| Field | Value |
|---|---|
| **Contest** | [706](https://codeforces.com/contest/706) |
| **Problem** | [706B — Interesting drink](https://codeforces.com/contest/706/problem/B) |
| **Rating** | 1100 |
| **Tags** | binary search, dp, implementation |
| **Verdict** | ✅ Accepted |
| **Language** | C++23 (GCC 14-64, msys2) |
| **Runtime** | 328 ms |
| **Memory** | 100 KB |

---

| ⏱ Time Limit | 💾 Memory Limit |
|---|---|
| 2 seconds | 256 megabytes |

---

Vasiliy likes to rest after a hard work, so you may often meet him in some bar nearby. As all programmers do, he loves the famous drink "`Beecola`", which can be bought in *n* different shops in the city. It's known that the price of one bottle in the shop *i* is equal to *x*_*i* coins.

Vasiliy plans to buy his favorite drink for *q* consecutive days. He knows, that on the *i*-th day he will be able to spent *m*_*i* coins. Now, for each of the days he want to know in how many different shops he can buy a bottle of "`Beecola`".

## Input

The first line of the input contains a single integer *n* (1 ≤ *n* ≤ 100 000) — the number of shops in the city that sell Vasiliy's favourite drink.

The second line contains *n* integers *x*_*i* (1 ≤ *x*_*i* ≤ 100 000) — prices of the bottles of the drink in the *i*-th shop.

The third line contains a single integer *q* (1 ≤ *q* ≤ 100 000) — the number of days Vasiliy plans to buy the drink.

Then follow *q* lines each containing one integer *m*_*i* (1 ≤ *m*_*i* ≤ 10^9) — the number of coins Vasiliy can spent on the *i*-th day.

## Output

Print *q* integers. The *i*-th of them should be equal to the number of shops where Vasiliy will be able to buy a bottle of the drink on the *i*-th day.

## Examples

**Example:**

```
5
3 10 8 6 11
4
1
10
3
11

```

**Output:**

```
0
4
1
5

```

## Note

On the first day, Vasiliy won't be able to buy a drink in any of the shops.

On the second day, Vasiliy can buy a drink in the shops 1, 2, 3 and 4.

On the third day, Vasiliy can buy a drink only in the shop number 1.

Finally, on the last day Vasiliy can buy a drink in any shop.

---

> 🔗 [View on Codeforces](https://codeforces.com/problemset/problem/706/B/?utm_source=chatgpt.com)

---
*Synced by [CodeSync Pro](https://github.com/parthopaul69/CodeSync-Pro-Extension)*
