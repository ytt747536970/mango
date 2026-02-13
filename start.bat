@echo off
set PATH=C:\nvm4w\nodejs;%PATH%
cd /d D:\src\TenProducts\script-to-comic
echo.
echo ========================================
echo   剧本转漫画生成器 - 开发服务器
echo ========================================
echo.
echo 服务器启动后，请在浏览器中访问:
echo http://localhost:3000
echo.
echo 按 Ctrl+C 停止服务器
echo.
npm run dev
