#include<iostream>
#include<string>
#include<algorithm>
using namespace std;
int main() {
    string s;
     getline(cin,s);
     if(!s.empty()){
     s[0]=toupper(s[0]);
  /*
  for(int i=1;i<s.size()-1;i++){
        if(s[i]==' '){
            s[i+1]=toupper(s[i+1]);
        }
    }
  */  
    cout << s << endl;
}
    return 0;

}