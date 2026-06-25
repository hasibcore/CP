#include<bits/stdc++.h>
using namespace std;
int nextRound(int n,int k,vector<int> a )
{
    int count =0;
   // sort(a.rbegin(),a.rend());
    for(auto x:a)
    {
        if(x>0 && x>=a[k-1])
        {
            count++;
        }
    }
return count;
}
int main()
{
    
    int n,k;
   
    cin>>n>>k;
     vector<int> a(n);
    for(auto &x:a)
    {
        cin>>x;
    }
    sort(a.rbegin(),a.rend());
    int s=nextRound(n,k,a);
    cout<<s;

}