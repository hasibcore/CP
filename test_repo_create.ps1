$token = "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"
$username = "hasibcore"
$headers = @{
    Authorization = "token $token"
    Accept = "application/vnd.github.v3+json"
}

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
    Write-Host "Repo creation failed:"
    Write-Host $_.Exception.Message
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    $reader.ReadToEnd() | Write-Host
}
