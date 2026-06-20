#include<iostream>
using namespace std;
int main()
{
    int n;
    cin>>n;
    int arr[7];
    for(int i=0;i<n;i++)
    {
        int sum=0;
        for(auto &x:arr){
            cin>>x;

          sum+=x;
        }
         cout<<sum<<" "<<endl;
    }


}
