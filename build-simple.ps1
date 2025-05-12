# PowerShell script to build the GitOps-GO MCP Server

# Navigate to the GitOps-GO directory
Set-Location -Path $PSScriptRoot

Write-Host "Building GitOps-GO Simple MCP Server..."

# Build the server
go build -o gitops-go-server.exe simple-mcp-server.go

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful! The server executable is at: $PSScriptRoot\gitops-go-server.exe"
} else {
    Write-Host "Build failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
}
