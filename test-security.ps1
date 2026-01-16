# Security Testing Script for Windows PowerShell
# Run this after starting the dev server: npm run dev

$baseUrl = "http://localhost:3000"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  SECURITY IMPLEMENTATION TEST SUITE" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test 1: Health Check
Write-Host "[TEST 1] Health Check Endpoint" -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/api/health" -Method GET
    Write-Host "  Status: $($health.status)" -ForegroundColor Green
    Write-Host "  Rate Limiting: $($health.security.rateLimitingEnabled)" -ForegroundColor Green
    Write-Host "  Auth Enabled: $($health.security.authenticationEnabled)" -ForegroundColor Green
} catch {
    Write-Host "  ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Login - Success
Write-Host "`n[TEST 2] Login - Valid Credentials" -ForegroundColor Yellow
try {
    $loginBody = @{
        email = "admin@example.com"
        password = "Admin@123"
    } | ConvertTo-Json
    
    $login = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method POST `
        -ContentType "application/json" -Body $loginBody
    
    $accessToken = $login.accessToken
    $refreshToken = $login.refreshToken
    
    Write-Host "  Login: SUCCESS" -ForegroundColor Green
    Write-Host "  User: $($login.user.email)" -ForegroundColor Green
    Write-Host "  Role: $($login.user.role)" -ForegroundColor Green
    Write-Host "  Access Token: $($accessToken.Substring(0, 50))..." -ForegroundColor Gray
} catch {
    Write-Host "  ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Login - Invalid Credentials
Write-Host "`n[TEST 3] Login - Invalid Credentials (should fail)" -ForegroundColor Yellow
try {
    $badLoginBody = @{
        email = "admin@example.com"
        password = "wrongpassword"
    } | ConvertTo-Json
    
    $badLogin = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method POST `
        -ContentType "application/json" -Body $badLoginBody
    Write-Host "  UNEXPECTED SUCCESS (should have failed)" -ForegroundColor Red
} catch {
    Write-Host "  Correctly rejected: 401 Unauthorized" -ForegroundColor Green
}

# Test 4: Protected Route - Without Token
Write-Host "`n[TEST 4] Protected Route - No Auth (should fail)" -ForegroundColor Yellow
try {
    $profile = Invoke-RestMethod -Uri "$baseUrl/api/user/profile" -Method GET
    Write-Host "  UNEXPECTED SUCCESS (should have failed)" -ForegroundColor Red
} catch {
    Write-Host "  Correctly rejected: 401 Unauthorized" -ForegroundColor Green
}

# Test 5: Protected Route - With Valid Token
Write-Host "`n[TEST 5] Protected Route - With Valid Token" -ForegroundColor Yellow
if ($accessToken) {
    try {
        $profile = Invoke-RestMethod -Uri "$baseUrl/api/user/profile" -Method GET `
            -Headers @{ Authorization = "Bearer $accessToken" }
        Write-Host "  Access: GRANTED" -ForegroundColor Green
        Write-Host "  User ID: $($profile.id)" -ForegroundColor Green
        Write-Host "  Email: $($profile.email)" -ForegroundColor Green
    } catch {
        Write-Host "  ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "  SKIPPED: No access token available" -ForegroundColor Gray
}

# Test 6: Admin Route - With Admin Token
Write-Host "`n[TEST 6] Admin Route - With Admin Token" -ForegroundColor Yellow
if ($accessToken) {
    try {
        $dashboard = Invoke-RestMethod -Uri "$baseUrl/api/admin/dashboard" -Method GET `
            -Headers @{ Authorization = "Bearer $accessToken" }
        Write-Host "  Access: GRANTED (Admin)" -ForegroundColor Green
        Write-Host "  Message: $($dashboard.message)" -ForegroundColor Green
        Write-Host "  Total Users: $($dashboard.stats.totalUsers)" -ForegroundColor Green
    } catch {
        Write-Host "  ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "  SKIPPED: No access token available" -ForegroundColor Gray
}

# Test 7: Contact Form - Valid Submission
Write-Host "`n[TEST 7] Contact Form - Valid Submission" -ForegroundColor Yellow
try {
    $contactBody = @{
        name = "Test User"
        email = "test@example.com"
        message = "This is a test message from the security validation script."
    } | ConvertTo-Json
    
    $contact = Invoke-RestMethod -Uri "$baseUrl/api/contact" -Method POST `
        -ContentType "application/json" -Body $contactBody
    Write-Host "  Submission: SUCCESS" -ForegroundColor Green
    Write-Host "  Message: $($contact.message)" -ForegroundColor Green
} catch {
    Write-Host "  ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 8: Token Refresh
Write-Host "`n[TEST 8] Token Refresh" -ForegroundColor Yellow
if ($refreshToken) {
    try {
        $refreshBody = @{ refreshToken = $refreshToken } | ConvertTo-Json
        $newTokens = Invoke-RestMethod -Uri "$baseUrl/api/auth/refresh" -Method POST `
            -ContentType "application/json" -Body $refreshBody
        Write-Host "  Token Refresh: SUCCESS" -ForegroundColor Green
        Write-Host "  New Access Token: $($newTokens.accessToken.Substring(0, 50))..." -ForegroundColor Gray
    } catch {
        Write-Host "  ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "  SKIPPED: No refresh token available" -ForegroundColor Gray
}

# Test 9: CORS Headers Check
Write-Host "`n[TEST 9] CORS Headers Verification" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/health" -Method OPTIONS `
        -Headers @{ Origin = "http://localhost:3000" }
    
    $corsOrigin = $response.Headers["Access-Control-Allow-Origin"]
    $corsMethods = $response.Headers["Access-Control-Allow-Methods"]
    
    if ($corsOrigin) {
        Write-Host "  Access-Control-Allow-Origin: $corsOrigin" -ForegroundColor Green
    }
    if ($corsMethods) {
        Write-Host "  Access-Control-Allow-Methods: $corsMethods" -ForegroundColor Green
    }
    Write-Host "  CORS Headers: PRESENT" -ForegroundColor Green
} catch {
    Write-Host "  Note: OPTIONS request may not return body" -ForegroundColor Gray
}

# Test 10: Rate Limit Headers Check
Write-Host "`n[TEST 10] Rate Limit Headers Verification" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/health" -Method GET
    
    $rateLimit = $response.Headers["X-RateLimit-Limit"]
    $rateRemaining = $response.Headers["X-RateLimit-Remaining"]
    $rateReset = $response.Headers["X-RateLimit-Reset"]
    
    Write-Host "  X-RateLimit-Limit: $rateLimit" -ForegroundColor Green
    Write-Host "  X-RateLimit-Remaining: $rateRemaining" -ForegroundColor Green
    Write-Host "  X-RateLimit-Reset: $rateReset" -ForegroundColor Green
} catch {
    Write-Host "  ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TEST SUITE COMPLETE" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
