#include<iostream>
#include<string>
#include<algorithm>
using namespace std;
int main(){
    int y,x=0;
    string s;
    cin>>y;



     while(true){
        y++;
     s=to_string(y);
        sort(s.begin(),s.end());
        if(unique(s.begin(),s.end())==s.end()){
       cout<<y;
       x=1;
       break;

     }



     }
      return 0;
 }
