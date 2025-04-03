@echo off
chcp 65001 > nul
echo Setting up connection to GitHub...

set GIT=C:\Program Files\Git\cmd\git.exe

echo Please enter your GitHub username:
set /p USERNAME=

echo Please enter your GitHub personal access token (PAT):
set /p TOKEN=

echo Please enter the name for your repository:
set /p REPO=

echo Creating repository on GitHub...
curl -u "%USERNAME%:%TOKEN%" https://api.github.com/user/repos -d "{\"name\":\"%REPO%\",\"description\":\"Campus Recruitment Project\",\"private\":false}"

echo Setting up remote connection...
"%GIT%" remote add origin https://github.com/%USERNAME%/%REPO%.git

echo Adding files...
"%GIT%" add .

echo Committing changes...
"%GIT%" commit -m "Initial commit: Campus Recruitment Project"

echo Configuring credentials...
"%GIT%" config credential.helper store
echo https://%USERNAME%:%TOKEN%@github.com > "%USERPROFILE%\.git-credentials"

echo Pushing to GitHub...
"%GIT%" push -u origin main

echo Done! Your project is now on GitHub at: https://github.com/%USERNAME%/%REPO%
pause 