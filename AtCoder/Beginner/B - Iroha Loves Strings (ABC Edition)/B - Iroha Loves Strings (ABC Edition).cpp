1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
#include<bits/stdc++.h>
using namespace std;
vector<string> insertionSort(vector<string> s)
{
    for (int i = 1; i < s.size(); i++)
    {
        string key = s[i];
        int j = i - 1;
        while (j >= 0 && s[j] > key)
        {
            s[j + 1] = s[j];
            j--;
        }
        s[j + 1] = key;
    }
    return s;
}
 void merge(vector<string> s)
 {
 