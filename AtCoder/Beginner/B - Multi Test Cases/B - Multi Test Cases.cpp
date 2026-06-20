#include<iostream>
using namespace std;
int main()
{
    int t,n;
    cin>>t;
    for(int i=0;i<t;i++)
    {
        cin>>n;
        long long arr[n],k=0;
        for(auto &m:arr)
        {
            cin>>m;
        }
        for(auto m:arr)
        {
            if(m%2!=0)
            {
                k++;
            }
        }
        cout<<k;
        cout<<" "<<endl;
    }

}
