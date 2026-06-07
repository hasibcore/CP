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

# Step 1: If compiled language (C++), compile first
$ext = [System.IO.Path]::GetExtension($File).ToLower()
if ($ext -eq ".cpp" -or $ext -eq ".c") {
    $outName = [System.IO.Path]::GetFileNameWithoutExtension($File) + ".exe"
    $outPath = Join-Path $rootDir $outName
    Write-Host "Compiling $File ..." -ForegroundColor Yellow
    if ($ext -eq ".cpp") {
        g++ -std=c++17 -O2 -o $outPath $File
    } else {
        gcc -std=c11 -O2 -o $outPath $File
    }
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Compilation failed!" -ForegroundColor Red
        exit 1
    }
    Write-Host "Compilation OK" -ForegroundColor Green
}

# Step 2: Submit to Codeforces via cf (or Python fallback)
Write-Host "Submitting $Problem to Codeforces..." -ForegroundColor Yellow
$cfOk = $false
$env:Path += ";C:\Users\Hasan\AppData\Local\Programs\cf"
cf submit -f $File $Problem 2>&1
if ($LASTEXITCODE -eq 0) {
    $cfOk = $true
} else {
    Write-Host "cf tool failed. Trying Python fallback..." -ForegroundColor Yellow
    python "$rootDir\cf_submit.py" $Problem $File 2>&1
    if ($LASTEXITCODE -eq 0) { $cfOk = $true }
}
if (-not $cfOk) {
    Write-Host "Codeforces submission failed (both methods)." -ForegroundColor Red
    Write-Host "Manually submit at: https://codeforces.com/contest/$($Problem -replace '[A-Za-z]')/submit" -ForegroundColor Yellow
}
Write-Host "Codeforces submission sent!" -ForegroundColor Green

# Step 3: Git add, commit, push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow

git -C $rootDir add -A
$commitMsg = "Solve $Problem"
git -C $rootDir commit -m $commitMsg --allow-empty
git -C $rootDir push 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "Git push failed. Check: git remote -v" -ForegroundColor Red
}

Write-Host "Done!" -ForegroundColor Green
