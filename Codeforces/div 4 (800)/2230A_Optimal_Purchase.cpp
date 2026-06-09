#include<iostream>
using namespace std;

int main()

{
    int n;
    cin >> n;

    while(n != 0)
    {
        long long t, a, b;
        cin >> t >> a >> b;

        long long r = t / 3;
        long long z = t % 3;

        if(3 * a < b)
        {
            cout << a * t << endl;
        }
        else
        {
            cout << (r * b) + min(z * a, b) << endl;
        }

        n--;
    }
} 
//alternative solution
// worked but not accepted
/*
 #include<iostream>
using namespace std;
int main(){
    int n;
    cin>>n;
    while(n!=0)
    {
        long long t,b,a,z,r;
        cin>>t>>a>>b;
        r=t/3;
        z=t-r*3; //z = t % 3;
        if(3*a>b) 
        {
           if(a>b){
            cout<<b*r+b<<endl;
           }            
            else{

            if(z*a>b){
                cout<<b*r+b<<endl;
            }
            else{
                cout<<b*r+z*a<<endl;
            }
                }
            } 
          else{
            cout<<a*t<<endl;
          }  
        n--;
    }
}
*/
 
