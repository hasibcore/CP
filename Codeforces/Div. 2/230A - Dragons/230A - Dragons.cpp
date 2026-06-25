#include<bits/stdc++.h>
using namespace std;
int main(){
int n, s, x, y,flag=1;
cin >> s>> n;
vector<pair<int, int>> a;
for(int i = 0; i < n; i++){
    int x, y;
    cin >> x >> y;
    a.push_back({x, y});
}  
sort(a.begin(), a.end());
for(int i = 0; i < n; i++){
    if(a[i].first < s ){
        
        s+= a[i].second;
    }
    else {
        flag=0;
        break;
    }
}
if(flag==1){
        cout << "YES" << endl;
    }
    else{
        cout << "NO" << endl;
       
    }
     return 0;
}