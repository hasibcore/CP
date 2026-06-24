#include<iostream>
using namespace std;
int total(int k,int n,int w){
    int sum=0;
    
for(int i=1;i<=w;i++){
sum=k*i+sum;
}
return (sum-n);
}
int main(){
int k,n,w;
cin>>k>>n>>w;
cout<<total(k,n,w);
}