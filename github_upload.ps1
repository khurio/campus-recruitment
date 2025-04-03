# Upload project to GitHub PowerShell script

# Check if Git is installed
$gitCheck = Get-Command git.exe -ErrorAction SilentlyContinue
if ($null -eq $gitCheck) {
    Write-Host "Git is not installed or not in PATH. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/downloads" -ForegroundColor Yellow
    exit
}

# Prompt for GitHub username
$githubUsername = Read-Host -Prompt "Enter your GitHub username"

# Prompt for GitHub email
$githubEmail = Read-Host -Prompt "Enter your GitHub email"

# Prompt for repository name
$repoName = Read-Host -Prompt "Enter repository name (default: campus-recruitment)"
if ([string]::IsNullOrEmpty($repoName)) {
    $repoName = "campus-recruitment"
}

# Configure Git
Write-Host "Configuring Git..." -ForegroundColor Green
git config --global user.name "$githubUsername"
git config --global user.email "$githubEmail"

# Initialize Git repository
Write-Host "Initializing Git repository..." -ForegroundColor Green
git init

# Add files to staging area
Write-Host "Adding files..." -ForegroundColor Green
git add .

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "Initial commit: Campus Recruitment Project"

# Set branch name
Write-Host "Setting branch name..." -ForegroundColor Green
git branch -M main

# Add remote repository
Write-Host "Adding remote repository..." -ForegroundColor Green
$repoUrl = "https://github.com/$githubUsername/$repoName.git"
git remote add origin $repoUrl

# Prompt user to create GitHub repository
Write-Host "`nPlease make sure you have created a repository named '$repoName' on GitHub!" -ForegroundColor Yellow
Write-Host "Create at: https://github.com/new" -ForegroundColor Yellow
$confirmation = Read-Host -Prompt "Repository created? (Y/N)"

if ($confirmation -ne 'Y' -and $confirmation -ne 'y') {
    Write-Host "`nPlease create the repository first, then run this script again." -ForegroundColor Red
    exit
}

# Push to remote repository
Write-Host "`nPushing to remote repository..." -ForegroundColor Green
Write-Host "Note: If using a personal access token, enter it when prompted for password." -ForegroundColor Yellow
git push -u origin main

# Complete
Write-Host "`nOperation completed!" -ForegroundColor Green
Write-Host "Your project has been uploaded to: https://github.com/$githubUsername/$repoName" -ForegroundColor Cyan
Write-Host "For further assistance, please refer to the 'github_upload_instructions.md' file." -ForegroundColor White 