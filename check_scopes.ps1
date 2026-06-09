$token = "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"
$response = Invoke-WebRequest -Uri "https://api.github.com/user" -Headers @{Authorization="token $token"}
$scopes = $response.Headers["X-OAuth-Scopes"]
Write-Host "Token Scopes: $scopes"
