#!/bin/bash

echo "========================================"
echo "  Veritas - Iniciando Aplicacao"
echo "========================================"
echo ""

# Iniciar backend
echo "Iniciando backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload &
BACKEND_PID=$!
cd ..

# Aguardar backend iniciar
sleep 5

# Iniciar frontend
echo "Iniciando frontend..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo "  Aplicacao iniciada!"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
echo "========================================"
echo ""
echo "Pressione Ctrl+C para parar"

# Aguardar
wait

