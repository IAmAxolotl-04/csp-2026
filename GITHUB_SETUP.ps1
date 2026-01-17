# GitHub Setup Helper
Write-Host "🚀 GitHub Setup Script" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan

Write-Host "`n📝 Follow these steps:" -ForegroundColor Yellow

Write-Host "1. Create GitHub account (if you don't have one):" -ForegroundColor White
Write-Host "   https://github.com/signup" -ForegroundColor Gray

Write-Host "`n2. Create new repository:" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Gray
Write-Host "   • Name: password-smoke-detector" -ForegroundColor Gray
Write-Host "   • Description: 'Browser extension for local password safety checking'" -ForegroundColor Gray
Write-Host "   • Public repository" -ForegroundColor Gray
Write-Host "   • DO NOT initialize with README (we already have one)" -ForegroundColor Gray

Write-Host "`n3. Run these commands in PowerShell:" -ForegroundColor White
Write-Host "   cd C:\CSP-2026" -ForegroundColor Gray
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Day 1: Password Smoke Detector - January 17, 2026'" -ForegroundColor Gray
Write-Host "   git branch -M main" -ForegroundColor Gray
Write-Host "   git remote add origin https://github.com/YOUR-USERNAME/password-smoke-detector.git" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray

Write-Host "`n4. Verify it's live:" -ForegroundColor White
Write-Host "   https://github.com/YOUR-USERNAME/password-smoke-detector" -ForegroundColor Gray

Write-Host "`n🎉 Your code is now public! Copy the repository URL above." -ForegroundColor Green
