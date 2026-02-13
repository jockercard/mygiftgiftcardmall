@echo off
echo ========================================
echo  Deploy GC Check to GitHub
echo ========================================
echo.
set /p USERNAME="Enter your GitHub username: "
cd /d "%~dp0"

git init
git add .
git commit -m "GC Check site"
git branch -M main
git remote add origin https://github.com/%USERNAME%/gc-check.git
git push -u origin main

echo.
echo Done! Now go to https://vercel.com and import your repo.
pause
