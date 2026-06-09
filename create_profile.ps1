$token = "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"
$username = "hasibcore"
$headers = @{
    Authorization = "token $token"
    Accept = "application/vnd.github.v3+json"
}

# 1. Create Repository
Write-Host "Creating repository..."
$repoBody = @{
    name = $username
    description = "My GitHub Profile"
    private = $false
    auto_init = $true
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $repoBody -ContentType "application/json"
} catch {
    Write-Host "Repo might already exist, continuing..."
}

# Wait a few seconds for repo initialization
Start-Sleep -Seconds 3

# 2. Get file SHA if it exists
Write-Host "Checking for existing README..."
$sha = $null
try {
    $fileInfo = Invoke-RestMethod -Uri "https://api.github.com/repos/$username/$username/contents/README.md" -Headers $headers
    $sha = $fileInfo.sha
} catch {
    Write-Host "No existing README found."
}

# 3. Upload new README
Write-Host "Uploading new README..."
$readmeContent = @"
# 👨‍💻 Hasibul Hasan (hasibcore)

<div align="center">
  <p>Competitive Programmer | Software Developer</p>
  
  <a href="https://codeforces.com/profile/hasibcore">
    <img src="https://img.shields.io/badge/Codeforces-hasibcore-1F8ACB?style=for-the-badge&logo=codeforces&logoColor=white" alt="Codeforces" />
  </a>
</div>

<br />

Welcome to my GitHub profile! I spend most of my time solving algorithmic problems and building cool tools to optimize my workflow.

### 🛠️ Languages & Tools

<p align="center">
  <img src="https://skillicons.dev/icons?i=cpp,python,js,html,css,git,github,vscode" />
</p>

### 📈 GitHub Stats

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=hasibcore&show_icons=true&hide_border=true&theme=radical&bg_color=0D1117&title_color=58A6FF&text_color=C9D1D9&icon_color=58A6FF" height="165" alt="stats graph"  />
  <img src="https://github-readme-stats.vercel.app/api/top-langs?username=hasibcore&show_icons=true&hide_border=true&layout=compact&theme=radical&bg_color=0D1117&title_color=58A6FF&text_color=C9D1D9" height="165" alt="languages graph"  />
</div>

<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=hasibcore&theme=radical&hide_border=true&background=0D1117&ring=58A6FF&fire=58A6FF&currStreakLabel=58A6FF" alt="streak stats" />
</div>

---
*Feel free to explore my repositories. Let's connect and code!*
"@

$bytes = [System.Text.Encoding]::UTF8.GetBytes($readmeContent)
$base64 = [Convert]::ToBase64String($bytes)

$fileBody = @{
    message = "feat: Add premium GitHub Profile README"
    content = $base64
}
if ($sha) {
    $fileBody.sha = $sha
}
$fileBodyJson = $fileBody | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "https://api.github.com/repos/$username/$username/contents/README.md" -Method Put -Headers $headers -Body $fileBodyJson -ContentType "application/json"
    Write-Host "README uploaded successfully!"
} catch {
    Write-Host "Failed to upload README: $_"
}
