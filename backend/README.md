# Veritas Backend

API FastAPI para análise de desinformação usando NLP.

## Instalação

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Executar

```bash
uvicorn main:app --reload
```

API disponível em http://localhost:8000

## Documentação

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Estrutura

```
backend/
├── app/
│   ├── api/routes/     # Rotas da API
│   ├── core/           # Config, models, exceptions
│   └── services/       # Serviços (NLP)
└── main.py             # Entry point
```

## Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
HOST=0.0.0.0
PORT=8000
DEBUG=true
CORS_ORIGINS=http://localhost:3000
```

