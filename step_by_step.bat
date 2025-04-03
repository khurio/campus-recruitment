@echo off
echo ===================================================
echo         GitHub Upload Helper for Windows
echo ===================================================
echo.
echo This batch file will help you upload your project to GitHub.
echo.
echo Step 1: Install Git if you haven't already.
echo   Download from: https://git-scm.com/downloads
echo.
echo Step 2: Create a GitHub account if you don't have one.
echo   Go to: https://github.com/join
echo.
echo Step 3: Create a new repository on GitHub.
echo   Go to: https://github.com/new
echo   - Enter a repository name (e.g., campus-recruitment)
echo   - Add a description (optional)
echo   - Choose Public or Private
echo   - Do NOT initialize with README or other files
echo   - Click 'Create repository'
echo.
echo Step 4: Run the PowerShell script to upload your project.
echo.
echo Press any key to run the PowerShell script...
pause > nul

powershell -ExecutionPolicy Bypass -File .\github_upload.ps1

echo.
echo If you encountered any issues, please refer to the
echo 'github_upload_instructions.md' file for manual steps.
echo.
pause

cd C:\Users\Owner\Desktop\工作文件夹\fun
git init
git add .
git config --global user.name "您的GitHub用户名"
git config --global user.email "您的GitHub邮箱"
git commit -m "初始化提交：校招直通车项目"
git branch -M main
git remote add origin https://github.com/您的用户名/campus-recruitment.git
git push -u origin main 