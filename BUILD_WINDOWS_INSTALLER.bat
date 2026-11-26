@echo off
setlocal
cd /d "%~dp0"
echo Building Letnie Istorii Windows installer...
echo.
where node.exe >nul 2>nul
if errorlevel 1 (echo ERROR: Install Node.js LTS from https://nodejs.org/ & pause & exit /b 1)
where npm.cmd >nul 2>nul
if errorlevel 1 (echo ERROR: npm was not found. Reinstall Node.js LTS with PATH enabled. & pause & exit /b 1)
if not exist "node_modules\electron-builder\package.json" (
  echo Installing build components. Internet connection is required...
  call npm.cmd install --include=dev
  if errorlevel 1 goto install_error
)
echo Building installer...
call npm.cmd run build:win
if errorlevel 1 goto build_error
echo.
echo SUCCESS. Installer is in the dist folder.
explorer "%~dp0dist"
pause
exit /b 0
:install_error
echo ERROR: Dependency installation failed.
pause
exit /b 1
:build_error
echo ERROR: Build failed. Send a photo of this window.
pause
exit /b 1
