#include<iostream>
using namespace std;
int main()
{
  int n,m;
  cin>>n>>m;
  int arr[n];
  for(auto &x:arr)
  {
      cin>>x;
  }
  //solved
  int arr1[m];
  for(auto &l:arr1)
  {
     cin>>l;
  }
  int sum=0;
  for(int i=0;i<m;i++)
  {
   sum=sum+arr[arr1[i]-1];
  }
   cout<<sum;
}
