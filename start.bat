@echo off
echo ========================================
echo   Veritas - Iniciando Aplicacao
echo ========================================
echo.

echo Iniciando backend...
cd backend
start "Veritas Backend" cmd /k "python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && uvicorn main:app --reload"
timeout /t 3 /nobreak >nul

echo Iniciando frontend...
cd ..\frontend
start "Veritas Frontend" cmd /k "npm install && npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   Aplicacao iniciada!
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8000
echo   API Docs: http://localhost:8000/docs
echo ========================================
pause

