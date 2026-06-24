#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
int main()
{
    int n,m,d;
    cin>>n>>m;
    vector<int>a;
    vector<int>b;
    for(int i=0;i<m;i++)
{
int x;
cin>>x;
a.push_back(x);
}
sort(a.begin(),a.end());
for(int i=0;i<m-n+1;i++)
  {
   d = a[i+n-1] - a[i];
   b.push_back(d);
  }
sort(b.begin(),b.end());
cout<<b[0];


    return 0;
}