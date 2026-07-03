#include<bits/stdc++.h>
using namespace std;
int main()
{
    int n,flag1,flag2;
    cin>>n;
    vector<int>v;
    for(int i=0;i<n;i++)
    {
        int x;
        cin>>x;
        v.push_back(x);
    }
   int max_val= *max_element(v.begin(), v.end());
   int min_val=*min_element(v.begin(),v.end());
   for(int i=0;i<v.size();i++)
   {
 if(v[i]==max_val)
    {
        flag1=i;
        break;
    }
   }
   for(int i=0;i<v.size();i++)
   {
   
    if(v[i]==min_val)
    {
        flag2=i;
    }
   }
   if(flag2<flag1)
{
    flag2++;
  cout<<v.size()-1-flag2+flag1<<endl;
   return 0;
}
   else
   {

     cout<<v.size()-flag2-1+flag1<<endl;
   return 0;
   }

}   