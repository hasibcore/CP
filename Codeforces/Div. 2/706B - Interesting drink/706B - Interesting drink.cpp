#include<bits/stdc++.h>
using namespace std;
/*
vector<int> insertion(vector <int> v1)
{
for(int i = 1;i<v1.size();i++)
{
  int key=v1[i];
  int j=i-1;
  while(j>=0 && key<v1[j])
  {
    v1[j+1]=v1[j];
    j--;
  }
  v1[j+1]=key;
}
return v1;

}
*/

/* vector<int> selection(vector <int> v2)
{
 for(int i=0;i<v2.size()-2;i++)
 {
   int minindex=i;
   for(int j=i+1;j<v2.size();j++)
  {
    if(v2[j]<v2[minindex])
    {
       minindex=j;
    }
    swap(v2[i],v2[minindex]);
  }
 return v2;
}
 */
void countedUpperbound(vector<int> v1,vector<int> v2)
{ 

  for(int i=0;i<v2.size();i++)
{
    int high=v1.size()-1;
    int low=0;
    int key=v2[i];
    while(low<=high)
    {
       int mid=(high+low)/2;
    if(v1[mid]>key)
    {
        
        high=mid-1;
    }
   else {
    low=mid+1;
   }
   
  }
   cout<<low<<endl;
}
  
}
int main(){
    int n,x,m,y;
    cin >> n;
    vector<int> v1;
    for(int i = 0; i < n; i++){
        cin>>x;
        v1.push_back(x);
    }
    cin>>m;
    vector<int> v2;
    for(int i = 0; i < m; i++){                                     
        cin>>y;
        v2.push_back(y);
    }
    sort(v1.begin(),v1.end());
 // vector<int> sorted_v1= insertion(v1);
  // countedUpperbound(sorted_v1,v2);
  countedUpperbound(v1,v2);
}
