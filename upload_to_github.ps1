# 上传项目到 GitHub 的 PowerShell 脚本

# 检查 Git 是否已安装
$gitCheck = Get-Command git.exe -ErrorAction SilentlyContinue
if ($null -eq $gitCheck) {
    Write-Host "Git 未安装或未添加到系统路径。请先安装 Git。" -ForegroundColor Red
    Write-Host "下载地址: https://git-scm.com/downloads" -ForegroundColor Yellow
    exit
}

# 提示用户输入 GitHub 用户名
$githubUsername = Read-Host -Prompt "请输入您的 GitHub 用户名"

# 提示用户输入 GitHub 邮箱
$githubEmail = Read-Host -Prompt "请输入您的 GitHub 邮箱"

# 提示用户输入仓库名称
$repoName = Read-Host -Prompt "请输入要创建的仓库名称 (默认: campus-recruitment)"
if ([string]::IsNullOrEmpty($repoName)) {
    $repoName = "campus-recruitment"
}

# 配置 Git
Write-Host "正在配置 Git..." -ForegroundColor Green
git config --global user.name "$githubUsername"
git config --global user.email "$githubEmail"

# 初始化 Git 仓库
Write-Host "正在初始化 Git 仓库..." -ForegroundColor Green
git init

# 添加文件到暂存区
Write-Host "正在添加文件..." -ForegroundColor Green
git add .

# 提交更改
Write-Host "正在提交更改..." -ForegroundColor Green
git commit -m "初始化提交：校招直通车项目"

# 设置分支名称
Write-Host "正在设置分支名称..." -ForegroundColor Green
git branch -M main

# 添加远程仓库
Write-Host "正在添加远程仓库..." -ForegroundColor Green
$repoUrl = "https://github.com/$githubUsername/$repoName.git"
git remote add origin $repoUrl

# 提示用户需要创建 GitHub 仓库
Write-Host "`n请确保您已在 GitHub 上创建了名为 '$repoName' 的仓库！" -ForegroundColor Yellow
Write-Host "创建地址: https://github.com/new" -ForegroundColor Yellow
$confirmation = Read-Host -Prompt "已创建仓库? (Y/N)"

if ($confirmation -ne 'Y' -and $confirmation -ne 'y') {
    Write-Host "`n请先创建仓库，然后再运行此脚本。" -ForegroundColor Red
    exit
}

# 推送到远程仓库
Write-Host "`n正在推送到远程仓库..." -ForegroundColor Green
Write-Host "注意：如果使用个人访问令牌，请在密码提示处输入令牌而不是密码。" -ForegroundColor Yellow
git push -u origin main

# 完成
Write-Host "`n操作完成！" -ForegroundColor Green
Write-Host "您的项目已上传到: https://github.com/$githubUsername/$repoName" -ForegroundColor Cyan
Write-Host "如需进一步帮助，请参考 'github_upload_instructions.md' 文件。" -ForegroundColor White 