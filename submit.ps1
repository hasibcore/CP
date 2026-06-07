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

# Step 2: Submit to Codeforces via cf
Write-Host "Submitting $Problem to Codeforces..." -ForegroundColor Yellow
cf submit $Problem $File
if ($LASTEXITCODE -ne 0) {
    Write-Host "Codeforces submission failed! Check 'cf config' setup." -ForegroundColor Red
    exit 1
}
Write-Host "Codeforces submission sent!" -ForegroundColor Green

# Step 3: Git add, commit, push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
$problemFolder = $Problem -replace '[A-Z]$'
$destDir = Join-Path $rootDir $problemFolder
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

$destFile = Join-Path $destDir "$Problem$ext"
Copy-Item $File $destFile -Force

git -C $rootDir add -A
$commitMsg = "Solve $Problem"
git -C $rootDir commit -m $commitMsg --allow-empty
git -C $rootDir push 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "Git push failed. Check GitHub remote setup." -ForegroundColor Red
}

Write-Host "Done!" -ForegroundColor Green
