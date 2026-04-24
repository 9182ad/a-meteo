$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$buildRoot = "C:\a-meteo-docker-build"
$imageName = "a-meteo-local"
$containerName = "a-meteo-site"
$port = 8080

while (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
    $port++
}

if (Test-Path $buildRoot) {
    Remove-Item -LiteralPath $buildRoot -Recurse -Force
}

New-Item -ItemType Directory -Path $buildRoot | Out-Null
Copy-Item -Path (Join-Path $projectRoot "*") -Destination $buildRoot -Recurse -Force

docker build -t $imageName $buildRoot

$existingContainer = docker ps -aq -f "name=^${containerName}$"
if ($existingContainer) {
    docker rm -f $containerName | Out-Null
}

docker run -d --name $containerName -p "${port}:80" $imageName | Out-Null

Write-Host ""
Write-Host "Сайт запущен: http://localhost:$port"
