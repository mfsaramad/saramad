# ============================================================
# Saramad Project Setup Script
# ============================================================

$ErrorActionPreference = "Stop"

Write-Host "Starting Saramad project setup..." -ForegroundColor Cyan

# Project path
$projectPath = "E:\site\saramad"
Set-Location $projectPath

# ============================================================
# 1. Create folders
# ============================================================
Write-Host "`nCreating folders..." -ForegroundColor Yellow

$folders = @(
    "src\components\layout",
    "src\components\home",
    "src\components\shared",
    "src\lib",
    "src\types",
    "public\images\courses",
    "public\images\instructors",
    "public\images\branches",
    "public\images\avatars",
    "public\images\blog"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "  Created: $folder" -ForegroundColor Green
    }
}

# ============================================================
# 2. Install packages
# ============================================================
Write-Host "`nInstalling packages..." -ForegroundColor Yellow

npm install lucide-react class-variance-authority clsx tailwind-merge zustand framer-motion

Write-Host "`nDone! Packages installed." -ForegroundColor Green
Write-Host "`nNext step: Copy the code files into their folders." -ForegroundColor Cyan
Write-Host "Then run: npm run dev" -ForegroundColor White