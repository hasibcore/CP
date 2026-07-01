#include<bits/stdc++.h>
using namespace std;
void lowerBound(vector<int> v1,vector<int> v2)
{ 
  for(int i=0;i<v2.size();i++)
 { 
    int key=v2[i];
    int low=0;
    int high=v1.size()-1;
    while(low<=high)
    {
        int mid=(low+high)/2;
        if(key>=v1[mid])
        {
            low=mid+1;
            
        }
        else
        {
              high=mid-1;
        }
    }
    cout<<low<<endl;
  }
}
int main(){
int n,m;
cin >> n >> m;
vector<int>v1;
vector<int>v2;
for(int i=0;i<n;i++){

   int x;
  cin>>x;
  v1.push_back(x);
   }
  for(int i=0;i<m;i++){

   int x;
   cin>>x;
   v2.push_back(x);
   }
sort(v1.begin(),v1.end());
 lowerBound(v1,v2);

}