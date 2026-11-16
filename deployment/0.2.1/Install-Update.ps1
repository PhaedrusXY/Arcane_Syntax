# Optional, narrow installer. Run from an extracted package OUTSIDE the instance.
# No world files or unrelated configuration are touched. Windows runtime untested.
[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'Medium')]
param([Parameter(Mandatory = $true)][string]$InstancePath)
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$root = (Resolve-Path -LiteralPath $InstancePath).Path.TrimEnd('\', '/')
$package = (Resolve-Path -LiteralPath $PSScriptRoot).Path.TrimEnd('\', '/')
if ($package.Equals($root, [StringComparison]::OrdinalIgnoreCase) -or
    $package.StartsWith($root + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
    throw 'Extract the update outside the Minecraft instance before running this installer.'
}
foreach ($directory in @('mods', 'kubejs')) {
    if (-not (Test-Path -LiteralPath (Join-Path $root $directory) -PathType Container)) {
        throw "Not an existing Eldritch Aeons instance: missing $directory."
    }
}
function Safe-Path([string]$base, [string]$relative) {
    if ($relative -notmatch '^(mods|kubejs)/' -or $relative.Contains(':') -or
        ($relative -split '[/\\]') -contains '..' -or [IO.Path]::IsPathRooted($relative)) {
        throw "Unsafe package path: $relative"
    }
    $full = [IO.Path]::GetFullPath((Join-Path $base $relative))
    if (-not $full.StartsWith($base.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar,
                             [StringComparison]::OrdinalIgnoreCase)) { throw 'Path escaped its root.' }
    $probe = $full
    while ($probe.Length -ge $base.Length) {
        if (Test-Path -LiteralPath $probe) {
            $item = Get-Item -LiteralPath $probe -Force
            if (($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) {
                throw "Refusing a link/junction in a touched path: $probe. Use manual installation."
            }
        }
        if ($probe.Equals($base, [StringComparison]::OrdinalIgnoreCase)) { break }
        $probe = Split-Path -Parent $probe
    }
    return $full
}
$manifest = Get-Content -LiteralPath (Join-Path $package 'INSTALL_MANIFEST.json') -Raw | ConvertFrom-Json
$payload = @($manifest.packageFiles.PSObject.Properties)
# Verify every payload before changing anything.
foreach ($entry in $payload) {
    $source = Safe-Path $package $entry.Name
    $null = Safe-Path $root $entry.Name
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing payload: $($entry.Name)" }
    if ((Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash -ne $entry.Value) {
        throw "Checksum mismatch: $($entry.Name)"
    }
}
$cleanup = @()
$skipped = @()
foreach ($relative in $manifest.cleanupPaths) {
    $path = Safe-Path $root $relative
    if (-not (Test-Path -LiteralPath $path)) { continue }
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Not a file: $relative" }
    $property = $manifest.cleanupHashes.PSObject.Properties[$relative]
    $hash = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($null -ne $property -and @($property.Value) -contains $hash) {
        $cleanup += $relative
    } else {
        $skipped += $relative
        Write-Warning "Kept unrecognized or modified cleanup file: $relative"
    }
}
$oldMods = @(Get-ChildItem -LiteralPath (Join-Path $root 'mods') -Filter 'arcane_syntax_unified*.jar' -File |
    ForEach-Object { 'mods/' + $_.Name })
$touched = @(@($cleanup) + @($oldMods) + @($payload | ForEach-Object { $_.Name }) | Sort-Object -Unique)
foreach ($relative in $touched) { $null = Safe-Path $root $relative }
Write-Host "Update: $($manifest.version); target Thaumaturge: $($manifest.targetThaumaturge)"
Write-Host "Install $($payload.Count) payload files; replace $($oldMods.Count) addon JAR(s); remove $($cleanup.Count) recognized redundant files."
if ($skipped.Count -gt 0) { Write-Warning 'Review kept overrides, especially any path containing outer_lands. They can still override native data.' }
if (-not $PSCmdlet.ShouldProcess($root, 'Back up touched files and install Arcane Syntax 0.2.1')) { return }
$closed = Read-Host 'Close Minecraft completely (and the server, if used). Type CLOSED to continue'
if ($closed -cne 'CLOSED') { throw 'Cancelled. No files changed.' }
$backup = Join-Path $root ('arcane_syntax_backups/0.2.1-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '-' + [Guid]::NewGuid().ToString('N').Substring(0,6))
$backupFiles = Join-Path $backup 'files'
New-Item -ItemType Directory -Path $backupFiles -Force | Out-Null
$existing = @()
# Finish the entire backup BEFORE any replacement/removal.
foreach ($relative in $touched) {
    $current = Safe-Path $root $relative
    if (Test-Path -LiteralPath $current -PathType Leaf) {
        $saved = Join-Path $backupFiles $relative
        New-Item -ItemType Directory -Path (Split-Path -Parent $saved) -Force | Out-Null
        Copy-Item -LiteralPath $current -Destination $saved
        if ((Get-FileHash -LiteralPath $saved).Hash -ne (Get-FileHash -LiteralPath $current).Hash) {
            throw 'Backup verification failed. No existing instance files have been changed.'
        }
        $existing += $relative
    }
}
@{ version = $manifest.version; existing = $existing; touched = $touched; keptCleanupFiles = $skipped } |
    ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $backup 'record.json') -Encoding UTF8
try {
    foreach ($relative in @(@($cleanup) + @($oldMods) | Sort-Object -Unique)) {
        Remove-Item -LiteralPath (Safe-Path $root $relative)
    }
    foreach ($entry in $payload) {
        $destination = Safe-Path $root $entry.Name
        New-Item -ItemType Directory -Path (Split-Path -Parent $destination) -Force | Out-Null
        Copy-Item -LiteralPath (Safe-Path $package $entry.Name) -Destination $destination -Force
        if ((Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash -ne $entry.Value) {
            throw "Installed checksum mismatch: $($entry.Name)"
        }
    }
} catch {
    $failure = $_
    Write-Warning 'Installation failed; restoring the touched files from the verified backup.'
    foreach ($relative in $touched) {
        $destination = Safe-Path $root $relative
        if ($existing -contains $relative) {
            New-Item -ItemType Directory -Path (Split-Path -Parent $destination) -Force | Out-Null
            Copy-Item -LiteralPath (Join-Path $backupFiles $relative) -Destination $destination -Force
        } elseif (Test-Path -LiteralPath $destination -PathType Leaf) {
            Remove-Item -LiteralPath $destination
        }
    }
    throw "Installation failed: $failure. Backup: $backup"
}
Write-Host "Installed. Backup: $backup"
Write-Host 'This is an experimental compatibility build. Fully restart Minecraft and run the tests in README_FIRST.txt.'
