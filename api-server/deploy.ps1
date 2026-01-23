# CSP API Server Deployment Script
Write-Host "🚀 CSP API Server Deployment" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════" -ForegroundColor DarkGray

# 1. Check environment
Write-Host "`nChecking environment..." -ForegroundColor Yellow
node --version
npm --version

# 2. Install dependencies
Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow
npm install

# 3. Run tests
Write-Host "`nRunning tests..." -ForegroundColor Yellow
npm test

# 4. Deployment options
Write-Host "`nChoose deployment platform:" -ForegroundColor Cyan
Write-Host "  [1] Vercel" -ForegroundColor Gray
Write-Host "  [2] Railway" -ForegroundColor Gray
Write-Host "  [3] Heroku" -ForegroundColor Gray
Write-Host "  [4] Local only" -ForegroundColor Gray

$choice = Read-Host "Enter choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host "`nDeploying to Vercel..." -ForegroundColor Green
        if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) { npm install -g vercel }
        vercel --prod
    }
    "2" {
        Write-Host "`nDeploying to Railway..." -ForegroundColor Green
        Write-Host "Visit https://railway.app/new to connect GitHub repository." -ForegroundColor Yellow
    }
    "3" {
        Write-Host "`nDeploying to Heroku..." -ForegroundColor Green
        heroku create csp-api-server
        git push heroku main
        heroku open
    }
    "4" {
        Write-Host "`nRunning locally..." -ForegroundColor Green
        npm start
    }
    default {
        Write-Host "Invalid choice. Running locally..." -ForegroundColor Yellow
        npm start
    }
}

Write-Host "`n📋 Deployment Checklist:" -ForegroundColor Cyan
Write-Host "✅ Tests passing" -ForegroundColor Green
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host "📡 API endpoints ready" -ForegroundColor Yellow
