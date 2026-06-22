#include<iostream>
using namespace std;
int main()
{
    int n,m,temp;
    cin>>n>>m;
    int arr[n];
    for(auto &x:arr)
    {
     cin>>x;
    }
    for(int i=0;i<(n-m);i++)
    {
        for(int j=0;j<(n-1);j++){
        temp=arr[j];
        arr[j]=arr[j+1];
        arr[j+1]=temp;
        }


    }
    for(auto x:arr){
        cout<<x<<" ";
    }
}
