#include<iostream>
#include<string>
using namespace std;
int main(){
string s;
cin>>s;
for(auto &c:s){
c = tolower(c);
}
for(auto c:s){
if(c!='a' && c!='o' && c!='y' && c!='e' && c!='u' && c!='i'){
cout<<"."<<c;
}
}



}