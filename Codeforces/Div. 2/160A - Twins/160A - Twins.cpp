#include<bits/stdc++.h>
using namespace std;
vector<int> selectionSort(vector<int>v)
{
    for(int i=0;i<v.size();i++)
    {
        for(int j=i+1;j<v.size();j++)
        {
            if(v[i]<v[j])
            {
                swap(v[i],v[j]);
            }
        }
    
    }
    return v;
}

int main()
{
int n;
cin>>n;
vector<int>v;
for(int i=0;i<n;i++)
{
    int x;
    cin>>x;
    v.push_back(x);
}
int count=0;
int full=accumulate(v.begin(),v.end(),0),sum=0;
vector<int> sorted_v=selectionSort(v);
for(int i=0;i<sorted_v.size();i++)
{
    sum+=sorted_v[i];
    count++;
    if(sum>full-sum)
    {
        break;
    }
    
}

cout<<count<<endl;
}