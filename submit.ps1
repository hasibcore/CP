param(
    [Parameter(Mandatory)] [string]$File,
    [Parameter(Mandatory)] [string]$Problem
)

$ErrorActionPreference = "Stop"
$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path

if (-not (Test-Path $File)) {
    Write-Host "Error: File '$File' not found!" -ForegroundColor Red
    exit 1
}

# Step 1: Compile if C++
$ext = [System.IO.Path]::GetExtension($File).ToLower()
if ($ext -eq ".cpp" -or $ext -eq ".c") {
    Write-Host "Compiling..." -ForegroundColor Yellow
    if ($ext -eq ".cpp") { g++ -std=c++17 -O2 -o "$rootDir\a.exe" $File }
    else { gcc -std=c11 -O2 -o "$rootDir\a.exe" $File }
    if ($LASTEXITCODE -ne 0) { Write-Host "Compilation failed!" -ForegroundColor Red; exit 1 }
    Write-Host "Compiled OK" -ForegroundColor Green
}

# Step 2: Submit to Codeforces
Write-Host "Submitting $Problem to Codeforces..." -ForegroundColor Yellow
$ok = $false

# Method 1: Puppeteer (Chrome/Edge browser)
Write-Host "  Trying browser automation..." -ForegroundColor Cyan
node "$rootDir\submit_cf.js" $Problem $File 2>&1
if ($LASTEXITCODE -eq 0) { $ok = $true }

# Method 2: cf tool
if (-not $ok) {
    Write-Host "  Trying cf tool..." -ForegroundColor Cyan
    $env:Path += ";C:\Users\Hasan\AppData\Local\Programs\cf"
    cf submit -f $File $Problem 2>&1
    if ($LASTEXITCODE -eq 0) { $ok = $true }
}

if (-not $ok) {
    Write-Host "  Could not submit automatically." -ForegroundColor Yellow
    $contestId = $Problem -replace '[A-Za-z]'
    Write-Host "  Submit here: https://codeforces.com/contest/$contestId/submit" -ForegroundColor Cyan
}

# Step 3: Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git -C $rootDir add -A
git -C $rootDir commit -m "Solve $Problem" --allow-empty
git -C $rootDir push 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "GitHub: Pushed!" -ForegroundColor Green
} else {
    Write-Host "GitHub push failed. Check: git remote -v" -ForegroundColor Red
}

Write-Host "Done!" -ForegroundColor Green
