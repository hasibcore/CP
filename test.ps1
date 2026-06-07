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

$ext = [System.IO.Path]::GetExtension($File).ToLower()

# Compile
if ($ext -eq ".cpp" -or $ext -eq ".c") {
    $outName = [System.IO.Path]::GetFileNameWithoutExtension($File) + ".exe"
    $outPath = Join-Path $rootDir $outName
    Write-Host "Compiling ..." -ForegroundColor Yellow
    if ($ext -eq ".cpp") {
        g++ -std=c++17 -O2 -o $outPath $File
    } else {
        gcc -std=c11 -O2 -o $outPath $File
    }
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Compilation failed!" -ForegroundColor Red
        exit 1
    }
}

# Fetch test cases from Codeforces
Write-Host "Fetching test cases from Codeforces $Problem ..." -ForegroundColor Cyan
cf parse $Problem 2>&1 | Out-Null

# Find parsed test cases
$parsedDir = Join-Path $rootDir $Problem
if (-not (Test-Path $parsedDir)) {
    Write-Host "No parsed test cases found. Try: cf parse $Problem" -ForegroundColor Red
    exit 1
}

# Run test cases
Write-Host "Running tests..." -ForegroundColor Cyan
cf test $File 2>&1
