#include<iostream>
#include<unordered_map>
using namespace std;
int main(){
    int n;
    cin >> n;
    int a[4*n-1];
    for(auto &x : a) 
    {
        cin >> x;
    }
    unordered_map<int,int>dhn;
    for(auto &x:a)
    {
        dhn[x]++;
    }
    for(auto x : dhn)
    {
        if(x.second<4)
    {
        cout << x.first << endl;
    }
    }
   /* 
   for(int i=0; i<4*n-1; i++)
    {
        int count=1;
        for(int j=i+1; j<4*n-1; j++)
        {
           if(a[i]==a[j])
           {
               count++;
           }

        }
        if(count<4){
            cout << a[i] << endl;
        }
   */ 
    }
