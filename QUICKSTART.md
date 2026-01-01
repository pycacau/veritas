# 🚀 Guia Rápido - Veritas

## Início Rápido com Docker (Recomendado)

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/veritas.git
cd veritas

# 2. Inicie os containers
docker-compose up -d

# 3. Acesse
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## Início Rápido Manual

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse http://localhost:3000

## Testando a API

```bash
curl -X POST "http://localhost:8000/api/v1/analyze" \
  -H "Content-Type: application/json" \
  -d '{"text": "Esta é uma notícia URGENTE! Você precisa saber disso AGORA! Garantido 100%!"}'
```

## Estrutura do Projeto

```
veritas/
├── backend/          # API FastAPI
├── frontend/         # App Next.js
└── docker-compose.yml
```

## Próximos Passos

1. Leia o [README.md](README.md) completo
2. Explore a documentação da API em http://localhost:8000/docs
3. Veja [CONTRIBUTING.md](CONTRIBUTING.md) para contribuir

