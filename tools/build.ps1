$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)
$required = @('buildaspell-1.0.3-mc26.1.2.jar','thaumaturge-26.1.2-NeoForge-1.1.0.jar')
foreach ($name in $required) {
    if (-not (Test-Path (Join-Path 'libs' $name))) { throw "Copy the original $name into the libs folder first." }
}
if (-not (Get-Command java -ErrorAction SilentlyContinue)) { throw 'Install JDK 25 and put its bin directory on PATH.' }
if (-not (Get-Command javac -ErrorAction SilentlyContinue)) { throw 'A JDK is required, not just a Minecraft Java runtime.' }
# Native stderr output is expected from java -version; capture without treating it as a script failure.
$oldPreference = $ErrorActionPreference
$ErrorActionPreference = 'Continue'
$versionText = (& java -version 2>&1 | Out-String)
$ErrorActionPreference = $oldPreference
if ($versionText -notmatch 'version "25[.\"]') { throw "Use JDK 25 for this project's full NeoForge build. Detected: $versionText" }
$version = '9.2.1'
$tools = Join-Path (Get-Location) '.tools'
$gradle = Join-Path $tools "gradle-$version\bin\gradle.bat"
if (-not (Test-Path $gradle)) {
    New-Item -ItemType Directory -Force $tools | Out-Null
    $zip = Join-Path $tools "gradle-$version-bin.zip"
    $base = "https://services.gradle.org/distributions/gradle-$version-bin.zip"
    $expected = (Invoke-RestMethod "$base.sha256").ToString().Trim().Split(' ')[0].ToLowerInvariant()
    if ($expected -notmatch '^[0-9a-f]{64}$') { throw 'Could not read the official Gradle SHA-256.' }
    Invoke-WebRequest -Uri $base -OutFile $zip
    $actual = (Get-FileHash -Path $zip -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($actual -ne $expected) { throw 'Gradle download failed SHA-256 verification. The archive was not executed.' }
    Expand-Archive -Path $zip -DestinationPath $tools -Force
}
& $gradle --no-daemon clean build
if ($LASTEXITCODE -ne 0) { throw 'Gradle build failed; inspect its output.' }
Write-Host 'Built source project. The JAR is in build\libs. No modpack instance was changed.'
