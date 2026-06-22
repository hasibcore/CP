#include<iostream>
#include<string>
#include<algorithm>
using namespace std;
int main(){
    int n;
    cin >> n;
    char x;
    string s;
    for(int i = 0; i < n; i++)
    {
        cin>>x;
        s.push_back(x);
    }
    int count = 0;
    for (int i = 0; i < n - 1; i++)
    {
        if (s[i] == s[i + 1])
        {
            count++;
        }
    }
    cout << count << endl;
    
}