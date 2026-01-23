# ============================================
# CSP Protocol: Generate RFC Artifacts
# ============================================

$OutputDir = "docs/rfc"

# Ensure output folder exists
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

Write-Host "📁 Generating RFC artifacts..." -ForegroundColor Cyan

# Generate test vectors
$TestVectors = node -e "const CSPPrefixHasher = require('./protocol/core/hasher'); const h = new CSPPrefixHasher(); console.log(JSON.stringify(h.generateTestVectors(), null, 2));"
$TestVectors | Out-File -FilePath "$OutputDir/test-vectors.json" -Encoding UTF8
Write-Host "✅ Saved: $OutputDir/test-vectors.json"

# Generate protocol metadata
$ProtocolMetadata = node -e "const CSPPrefixHasher = require('./protocol/core/hasher'); const h = new CSPPrefixHasher(); console.log(JSON.stringify(h.getCollisionStats(), null, 2));"
$ProtocolMetadata | Out-File -FilePath "$OutputDir/protocol-metadata.json" -Encoding UTF8
Write-Host "✅ Saved: $OutputDir/protocol-metadata.json"
