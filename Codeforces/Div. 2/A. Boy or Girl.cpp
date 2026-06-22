#include<iostream>
#include<string>
//#include<vector>
#include<algorithm>
using namespace std;
int main() {
    string s;
    cin >> s;
    sort(s.begin(),s.end());
    s.erase(unique(s.begin(),s.end()),s.end());
if(s.size()%2==0){
    cout<<"CHAT WITH HER!";
}
else{
    cout<<"IGNORE HIM!";
}
    return 0;
}

/*  #include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;

    vector<char> v;

    // string -> vector
    for (char c : s) {
        v.push_back(c);
    }

    sort(v.begin(), v.end());

    v.erase(unique(v.begin(), v.end()), v.end());

    if (v.size() % 2 == 0) {
        cout << "CHAT WITH HER!";
    }
    else {
        cout << "IGNORE HIM!";
    }

    return 0;
}*/