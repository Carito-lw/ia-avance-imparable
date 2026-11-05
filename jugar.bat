@echo off
chcp 65001 >nul
title IA: Avance Imparable
cls
echo ============================================================
echo           IA: AVANCE IMPARABLE — EDICIÓN WEB NATIVA
echo ============================================================
echo.
echo Iniciando el juego en tu navegador web...
echo Puedes cerrar esta ventana cuando termines de jugar.
echo.

where python >nul 2>&1
if %errorlevel% equ 0 (
    echo Iniciando servidor local en http://localhost:8000 ...
    start "" http://localhost:8000
    python -m http.server 8000
) else (
    start "" index.html
)
