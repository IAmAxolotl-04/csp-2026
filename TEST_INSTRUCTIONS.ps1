Write-Host "🔐 Password Smoke Detector - Quick Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`n✅ Extension files created at: C:\CSP-2026\extension" -ForegroundColor Green
Write-Host "✅ Landing page created at: C:\CSP-2026\website\index.html" -ForegroundColor Green

Write-Host "`n🚀 To launch landing page locally:" -ForegroundColor Yellow
Write-Host "1. Open PowerShell as Administrator" -ForegroundColor White
Write-Host "2. Run: cd C:\CSP-2026\website" -ForegroundColor White
Write-Host "3. Run: python -m http.server 8080" -ForegroundColor White
Write-Host "4. Open: http://localhost:8080" -ForegroundColor White

Write-Host "`n📦 To create a ZIP for sharing:" -ForegroundColor Yellow
Write-Host "Compress-Archive -Path C:\CSP-2026\extension -DestinationPath C:\CSP-2026\password-smoke-detector.zip" -ForegroundColor White

Write-Host "`n🎯 Next steps:" -ForegroundColor Cyan
Write-Host "1. Test extension on 3 different websites" -ForegroundColor Gray
Write-Host "2. Share with 2 friends for feedback" -ForegroundColor Gray
Write-Host "3. Push to GitHub (create repository first)" -ForegroundColor Gray
Write-Host "4. Tweet about Day 1 progress" -ForegroundColor Gray
