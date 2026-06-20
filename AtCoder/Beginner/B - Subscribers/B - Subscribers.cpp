#include<iostream>
#include<cmath>
using namespace std;
int main(){
    int a;
    int z;
    cin >> a;
    if(a<=(int)pow(10,3)){
        cout << a << endl;
    }
    else{
    for(int i=0;i<6;i++){
      if(a>=(int)pow(10,(i+3)) && a<(int)pow(10,(i+4))){
         // z=a%(int)pow(10,(i+1));
        //  a=a-z;
        a=a/(int)pow(10,(i+1));
        a=a*(int)pow(10,(i+1));

    }
  }
    cout << a << endl;
        }
}
