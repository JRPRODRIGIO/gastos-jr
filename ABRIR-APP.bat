@echo off
title Gastos JR - Iniciando...
cd /d "%~dp0"

echo.
echo  ==========================================
echo   Gastos JR - Control Financiero Personal
echo  ==========================================
echo.

if not exist "node_modules" (
  echo  [1/2] Instalando dependencias por primera vez...
  echo        (esto solo ocurre una vez, puede tardar 1-2 min)
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo  ERROR: No se pudo instalar. Verifica tu conexion a internet.
    pause
    exit /b 1
  )
  echo.
  echo  Dependencias instaladas correctamente!
  echo.
)

echo  [2/2] Abriendo la aplicacion en tu navegador...
echo        (presiona Ctrl+C en esta ventana para cerrarla)
echo.

call npm run dev
pause
