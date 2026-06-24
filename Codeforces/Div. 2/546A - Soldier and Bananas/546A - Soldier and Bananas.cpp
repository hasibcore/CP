#include<iostream>
using namespace std;

int total(int k,int n,int w){
    int sum = 0;

    for(int i=1;i<=w;i++){
        sum += k*i;
    }

    return sum - n;
}

int main(){
    int k,n,w;
    cin >> k >> n >> w;

    int ans = total(k,n,w);

    if(ans > 0)
        cout << ans;
    else
        cout << 0;
}