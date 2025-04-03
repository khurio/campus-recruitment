@echo off
chcp 65001 > nul
echo Starting GitHub upload...

set GIT_CMD="C:\Program Files\Git\cmd\git.exe"

echo Adding all files...
%GIT_CMD% add .

echo Committing changes...
%GIT_CMD% commit -m "Initial commit: Campus Recruitment Project"

echo Removing existing remote repository link if any...
%GIT_CMD% remote remove origin 2>nul

echo Adding GitHub repository link...
set /p REPO_URL=Please enter GitHub repository URL (e.g. https://github.com/username/repo.git): 
%GIT_CMD% remote add origin %REPO_URL%

echo Pushing to GitHub...
%GIT_CMD% push -u origin main

echo Done!
pause 