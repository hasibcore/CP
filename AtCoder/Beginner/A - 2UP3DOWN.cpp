#include<iostream>
using namespace std;
int main(){
    int x,y;
    cin >> x >> y;
    int dif=y-x;
    if(1<=x && y<=100){
     
    if(dif>0){
        if(dif>2){
            cout << "No" << endl;
        }else{
            cout << "Yes" << endl;
        }
    }
    if(dif<0){
        if(-dif<=3){
            cout << "Yes" << endl;
        }else{
            cout << "No" << endl;
        }
      }
    }
}