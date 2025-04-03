@echo off
echo 开始上传项目到GitHub...

set GIT_CMD="C:\Program Files\Git\cmd\git.exe"

echo 添加所有文件...
%GIT_CMD% add .

echo 提交更改...
%GIT_CMD% commit -m "初始化提交：校招直通车项目"

echo 移除可能存在的远程仓库链接...
%GIT_CMD% remote remove origin 2>nul

echo 添加GitHub仓库链接...
set /p REPO_URL=请输入GitHub仓库URL(例如 https://github.com/用户名/仓库名.git): 
%GIT_CMD% remote add origin %REPO_URL%

echo 推送到GitHub...
%GIT_CMD% push -u origin master

echo 完成！
pause 