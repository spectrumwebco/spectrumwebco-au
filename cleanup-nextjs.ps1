# Create a backup directory
New-Item -ItemType Directory -Path "src/app-backup" -Force

# Copy all files from src/app to the backup directory
Copy-Item -Path "src/app/*" -Destination "src/app-backup" -Recurse -Force

# Remove the src/app directory as it's no longer needed with Remix
Remove-Item -Path "src/app" -Recurse -Force

Write-Host "Next.js app directory has been backed up to src/app-backup and removed."
Write-Host "The Remix routes are now in app/routes."
