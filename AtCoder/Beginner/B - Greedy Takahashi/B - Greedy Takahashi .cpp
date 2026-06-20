#include<iostream>
using namespace std;
int main(){
    long long a;
    long long b, k;
    cin >> a >> b >> k;
   if(a>k)
   {
    a=a-k;
   }
   else{
    k=k-a;
    a=0;
    if(b>k)
    {
        b=b-k;
    }
    else{
        b=0;
    }
   }
    cout << a << " " << b << endl;
}