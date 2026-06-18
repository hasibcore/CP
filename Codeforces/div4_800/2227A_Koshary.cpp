#include<iostream>
using namespace std;
int main()
{
    int t;
    cin>>t;
    while(t!=0)
    {
      int a,b;
      cin>>a>>b;
      if(a%2!=0 && b%2!=0){
       cout<<"NO"<<endl;
    }
      else{
        cout<<"YES"<<endl;
      }
        t--;
    }

}