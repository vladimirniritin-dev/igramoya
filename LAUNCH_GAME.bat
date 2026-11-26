@echo off
setlocal
cd /d "%~dp0"
echo Starting Letnie Istorii...
echo.
where node.exe >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed or is not in PATH.
  echo Install Node.js LTS from https://nodejs.org/ and restart this file.
  pause
  exit /b 1
)
where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm was not found. Reinstall Node.js LTS with PATH enabled.
  pause
  exit /b 1
)
if not exist "node_modules\electron\package.json" (
  echo Installing game components. Internet connection is required...
  call npm.cmd install --include=dev
  if errorlevel 1 goto install_error
)
echo Launching game...
call npm.cmd start
if errorlevel 1 goto launch_error
exit /b 0
:install_error
echo.
echo ERROR: Could not install components. Check internet and try again.
pause
exit /b 1
:launch_error
echo.
echo ERROR: Game could not be launched. Send a photo of this window.
pause
exit /b 1
