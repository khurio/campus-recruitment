@echo off
chcp 65001 > nul
echo GitHub 连接脚本 - 简化版

REM 设置Git路径
set GIT="C:\Program Files\Git\cmd\git.exe"

REM 删除现有的remote origin（如果存在）
%GIT% remote remove origin

REM 添加新的remote origin
%GIT% remote add origin https://github.com/khurio/campus-recruitment.git

REM 设置用户信息（如果尚未设置）
%GIT% config --global user.name "khurio"
%GIT% config --global user.email "736035201@qq.com"

REM 添加所有文件
%GIT% add .

REM 提交变更
%GIT% commit -m "Initial commit: Campus Recruitment Project"

REM 推送到GitHub
echo 正在推送到GitHub，请在弹出的窗口中输入您的GitHub用户名和个人访问令牌(PAT)...
%GIT% push -u origin main

echo.
echo 完成！如果没有错误，您的项目现在应该已经上传到GitHub了。
echo 您可以访问 https://github.com/khurio/campus-recruitment 查看您的代码。
echo.
pause 