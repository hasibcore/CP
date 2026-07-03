#include<bits/stdc++.h>
using namespace std;
void worms(vector<int> v1,vector<int> v2)
{

    vector<int> v3;
    int sum=0;
    for(int i = 0; i < v1.size(); i++){
        
   sum+=v1[i];
       v3.push_back(sum);
    }   
 
for(int i = 0; i < v2.size(); i++){

    int key=v2[i];
    int low=0;
    int high=v3.size()-1;
    while(low<=high){
        int mid=(low+high)/2;
    if(v3[mid]>=key){

    high=mid-1;
    }
    else{
        low=mid+1;
    }
 } 
cout<<low+1<<endl;

}

 }

int main(){
    int n;
    cin >> n;
    vector<int> v1;
    for(int i = 0; i < n; i++){
        int x;
        cin >> x;
        v1.push_back(x);
    }
int m;
cin >> m;
vector<int> v2;
for(int i = 0; i < m; i++){
    int y;
    cin >> y;
    v2.push_back(y);
}
worms(v1,v2);

}