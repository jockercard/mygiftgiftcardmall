# Run this after: 1) Git is installed, 2) You created a repo at github.com/new named "gc-check"
# Replace YOUR_USERNAME with your GitHub username

$username = "YOUR_USERNAME"  # <-- CHANGE THIS to your GitHub username
$repo = "gc-check"

cd $PSScriptRoot

git init
git add .
git commit -m "GC Check site"
git branch -M main
git remote add origin "https://github.com/$username/$repo.git"
git push -u origin main

Write-Host ""
Write-Host "Done! Now go to https://vercel.com and import this repo." -ForegroundColor Green
