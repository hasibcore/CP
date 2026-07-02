#include<bits/stdc++.h>
using namespace std;
vector<int> insertionSort(vector<int>v)
{
    for(int i=1;i<v.size();i++)
{
   int key=v[i];
   int j=i-1;
   while(j>=0 && v[j]<key)
   {
      v[j+1]=v[j];
      j--;
   }
   v[j+1]=key;
}
return v;
}
int main()
{
    int n;
    cin>>n;
    vector<int>v;
    for(int i=0;i<12;i++)
    {
        int x;
        cin>>x;
        v.push_back(x);
    }
    vector<int>v1=insertionSort(v);
    int sum=0;
    int count=0;
    if(n==0)
    {
        cout<<0<<endl;
        return 0;
    }
    else{
    for(int i=0;i<v1.size();i++)
     {
        sum+=v1[i];
        
        if(sum<n)
        {
            count++;
        }
        else
        {
            count++;
            break;
        }
    }
    if(sum<n)
    {
        cout<<-1<<endl;
    }
    else
    {
        cout<<count<<endl;
    }
    
    
   }
}