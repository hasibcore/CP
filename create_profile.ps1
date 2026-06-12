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
# 🌌 HASIBUL HASAN (hasibcore)

<div align="center">
  <h3>⚡ HOLOGRAPHIC TERMINAL ACTIVE ⚡</h3>
  <p>Competitive Programmer | Software Developer | Dhaka, Bangladesh</p>
  
  <!-- Live Codeforces Stats Badges (Real-Time API Sync) -->
  <a href="https://codeforces.com/profile/hasibcore" target="_blank">
    <img src="https://img.shields.io/badge/dynamic/json?style=for-the-badge&label=Codeforces%20Rating&query=%24.result%5B0%5D.rating&url=https%3A%2F%2Fcodeforces.com%2Fapi%2Fuser.info%3Fhandles%3Dhasibcore&color=00d4ff&labelColor=02020f&logo=codeforces&logoColor=00d4ff" alt="CF Rating" />
  </a>
  <a href="https://codeforces.com/profile/hasibcore" target="_blank">
    <img src="https://img.shields.io/badge/dynamic/json?style=for-the-badge&label=CF%20Rank&query=%24.result%5B0%5D.rank&url=https%3A%2F%2Fcodeforces.com%2Fapi%2Fuser.info%3Fhandles%3Dhasibcore&color=ff007f&labelColor=02020f&logo=codeforces&logoColor=ff007f" alt="CF Rank" />
  </a>
  
  <br /><br />
  
  <a href="https://hasibcore.github.io/CP/hologram-dashboard/" target="_blank">
    <img src="https://img.shields.io/badge/ENTER%20INTERACTIVE%20DASHBOARD-ONLINE-00d4ff?style=for-the-badge&logo=matrix&logoColor=black&labelColor=02020f&color=00d4ff" alt="Enter Dashboard" />
  </a>
</div>

<br />

<div align="center">
  <img src="https://raw.githubusercontent.com/hasibcore/CP/main/hologram-dashboard/assets/projector.svg" onerror="this.style.display='none'" width="100%" />
</div>

<br />

### 📊 3D Contribution Hologram

<div align="center">
  <img src="https://github-profile-3d-contrib.vercel.app/api?username=hasibcore&theme=radical" width="100%" alt="3D Contribution Graph" />
</div>

<br />

### 📈 Contribution Activity Stream

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=hasibcore&bg_color=02020f&color=58a6ff&line=00d4ff&point=00d4ff&area=true&hide_border=true" width="100%" alt="Contribution Graph" />
</div>

<br />

### 🛠️ Core Systems & Modules

<div align="center">
  <img src="https://img.shields.io/badge/C++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white&labelColor=02020f&color=00d4ff" alt="C++" />
  <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54&labelColor=02020f&color=00d4ff" alt="Python" />
  <img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black&labelColor=02020f&color=00d4ff" alt="JS" />
  <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white&labelColor=02020f&color=00d4ff" alt="Git" />
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white&labelColor=02020f&color=00d4ff" alt="VS Code" />
</div>

<br />

### 📡 Core Diagnostic Telemetry

<div align="center">
  <!-- GitHub Stats (Radical Neon Theme) -->
  <a href="https://github.com/hasibcore">
    <img src="https://github-readme-stats.vercel.app/api?username=hasibcore&show_icons=true&theme=radical&bg_color=02020f&title_color=00d4ff&text_color=c9d1d9&icon_color=00d4ff&border_color=00d4ff&border_radius=8" height="170" alt="GitHub Stats" />
  </a>
  <!-- Top Languages (Radical Neon Theme) -->
  <a href="https://github.com/hasibcore">
    <img src="https://github-readme-stats.vercel.app/api/top-langs?username=hasibcore&show_icons=true&theme=radical&bg_color=02020f&title_color=00d4ff&text_color=c9d1d9&border_color=00d4ff&layout=compact&border_radius=8" height="170" alt="Top Languages" />
  </a>
</div>

<br />

<div align="center">
  <!-- Streak Stats (Radical Neon Theme) -->
  <a href="https://github.com/hasibcore">
    <img src="https://github-readme-streak-stats.herokuapp.com/?user=hasibcore&theme=radical&background=02020f&ring=00d4ff&fire=00d4ff&currStreakLabel=00d4ff&border=00d4ff&border_radius=8" alt="Streak Stats" />
  </a>
</div>

<br />

---
<div align="center">
  <sub>Hologram terminal active. Connecting nodes... Ready.</sub>
</div>
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
