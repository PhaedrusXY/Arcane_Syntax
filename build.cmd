@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\build.ps1"
if errorlevel 1 (
  echo Build failed. Read the error above. No Minecraft instance was modified.
  pause
  exit /b 1
)
echo Build completed. See build\libs.
pause
