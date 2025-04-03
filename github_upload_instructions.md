# GitHub 上传指南

以下是将项目上传到 GitHub 的详细步骤：

## 1. 安装 Git

1. 访问 https://git-scm.com/downloads
2. 下载 Windows 版本的 Git 安装程序
3. 运行安装程序，使用默认选项完成安装
4. 安装完成后重启您的终端/命令提示符

## 2. 在 GitHub 上创建仓库

1. 访问 https://github.com 并登录
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 输入仓库名称，比如 "campus-recruitment"
4. 添加描述："校招直通车 - 连接企业与求职者的桥梁"
5. 选择 "Public"（公开）或 "Private"（私有）
6. 不要初始化仓库（不要选择 "Add a README file"）
7. 点击 "Create repository"

## 3. 上传项目到 GitHub

在命令提示符或 PowerShell 中，切换到项目目录（已经在此目录下），然后执行以下命令：

```bash
# 初始化 Git 仓库
git init

# 配置您的 Git 用户信息
git config --global user.name "您的GitHub用户名"
git config --global user.email "您的GitHub邮箱"

# 添加所有文件到暂存区
git add .

# 提交更改
git commit -m "初始化提交：校招直通车项目"

# 设置分支名称
git branch -M main

# 添加远程仓库地址（替换为您的仓库URL）
git remote add origin https://github.com/您的用户名/您的仓库名.git

# 推送到远程仓库
git push -u origin main
```

## 4. 身份验证

在执行 `git push` 命令时，GitHub 会要求您进行身份验证：

- 如果使用 HTTPS URL，需要提供 GitHub 用户名和密码（或个人访问令牌）
- 如果使用 SSH URL，需要先设置 SSH 密钥

### 使用个人访问令牌 (推荐)

1. 访问 GitHub 设置页面：https://github.com/settings/tokens
2. 点击 "Generate new token"
3. 选择需要的权限（至少需要 repo 权限）
4. 生成令牌后请保存好，它只会显示一次
5. 使用这个令牌代替密码进行认证

## 5. 后续更新

后续如果需要更新代码，可以使用以下命令：

```bash
# 添加修改的文件
git add .

# 提交更改
git commit -m "更新描述"

# 推送到远程仓库
git push
```

## 注意事项

- 确保 .gitignore 文件配置正确，避免上传不必要的文件
- 敏感信息（如API密钥、密码等）不应该提交到代码仓库中
- 定期推送更新，避免本地与远程版本差异过大 