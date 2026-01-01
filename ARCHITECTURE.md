# Arquitetura do Veritas

## Visão Geral

O Veritas é uma aplicação full-stack separada em frontend e backend, comunicando-se via API REST.

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Home Page  │  │ Analyze Page │  │  About Page  │   │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘   │
│         │                 │                              │
│         └─────────┬───────┘                              │
│                   │                                      │
│            ┌──────▼──────┐                              │
│            │  API Client │                              │
│            │   (Axios)   │                              │
│            └──────┬──────┘                              │
└───────────────────┼────────────────────────────────────┘
                    │ HTTP/REST
                    │
┌───────────────────▼────────────────────────────────────┐
│              Backend (FastAPI)                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              API Routes                          │  │
│  │  POST /api/v1/analyze                            │  │
│  │  GET  /health                                    │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                       │
│  ┌──────────────▼──────────────┐                      │
│  │      NLP Service            │                      │
│  │  ┌────────────────────────┐ │                      │
│  │  │  Sentiment Analysis    │ │                      │
│  │  │  Pattern Detection     │ │                      │
│  │  │  Linguistic Features   │ │                      │
│  │  └────────────────────────┘ │                      │
│  │  ┌────────────────────────┐ │                      │
│  │  │  Score Calculation    │ │                      │
│  │  │  Explanation Generator │ │                      │
│  │  └────────────────────────┘ │                      │
│  └──────────────────────────────┘                      │
│                                                         │
│  ┌──────────────────────────────┐                      │
│  │    Transformers Models       │                      │
│  │  (Hugging Face)              │                      │
│  └──────────────────────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

## Componentes Principais

### Frontend

#### Tecnologias
- **Next.js 14**: Framework React com SSR
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **Framer Motion**: Animações
- **Axios**: Cliente HTTP

#### Estrutura
```
frontend/src/app/
├── layout.tsx          # Layout raiz
├── page.tsx            # Página inicial
├── analyze/
│   └── page.tsx       # Página de resultados
└── about/
    └── page.tsx        # Página sobre
```

#### Fluxo de Dados
1. Usuário insere texto na página inicial
2. Texto é salvo no sessionStorage
3. Redirecionamento para `/analyze`
4. Página `/analyze` recupera texto e faz requisição à API
5. Resultado é exibido com visualizações

### Backend

#### Tecnologias
- **FastAPI**: Framework web assíncrono
- **Transformers**: Biblioteca NLP
- **PyTorch**: Framework de deep learning
- **Pydantic**: Validação de dados

#### Estrutura
```
backend/
├── main.py                    # Entry point
├── app/
│   ├── api/
│   │   └── routes/
│   │       └── analysis.py   # Rotas da API
│   ├── core/
│   │   ├── config.py          # Configurações
│   │   ├── models.py          # Modelos Pydantic
│   │   └── exceptions.py      # Exceções customizadas
│   └── services/
│       └── nlp_service.py    # Serviço de NLP
```

#### Fluxo de Processamento

1. **Recebimento da Requisição**
   - Validação do texto (tamanho, formato)
   - Verificação de limites

2. **Análise NLP**
   - Análise de sentimento
   - Detecção de padrões suspeitos
   - Análise de características linguísticas

3. **Cálculo de Métricas**
   - Score de confiabilidade (0-100)
   - Nível de confiabilidade (confiável/atenção/duvidoso)
   - Confiança da análise

4. **Geração de Explicação**
   - Explicação textual do resultado
   - Lista de frases suspeitas
   - Avisos de incerteza

5. **Resposta**
   - Formatação da resposta
   - Retorno ao cliente

## Modelos NLP

### Modelo Atual
- **Sentiment Analysis**: `cardiffnlp/twitter-xlm-roberta-base-sentiment`
- **Fallback**: Pipeline padrão do transformers

### Padrões Detectados
1. Linguagem de certeza absoluta
2. Linguagem de urgência excessiva
3. Padrões conspiratórios
4. Uso excessivo de maiúsculas/exclamações
5. Chamadas de ação agressivas

## Explainable AI (XAI)

O Veritas implementa XAI através de:

1. **Explicações Textuais**: Descrição clara do resultado
2. **Destaque de Trechos**: Visualização de frases suspeitas
3. **Razões Específicas**: Motivo para cada detecção
4. **Níveis de Confiança**: Indicação de certeza
5. **Avisos de Incerteza**: Lembretes sobre limitações

## Segurança e Ética

### Princípios
- Não armazena dados pessoais
- Não faz afirmações absolutas
- Transparente sobre limitações
- Foco em educação, não censura

### Validações
- Tamanho mínimo/máximo de texto
- Sanitização de entrada
- Tratamento de erros robusto
- CORS configurado

## Escalabilidade

### Atual (MVP)
- Backend: Single instance
- Frontend: Static/SSR
- Modelos: Carregados em memória

### Futuro
- Backend: Múltiplas instâncias (load balancer)
- Cache: Redis para resultados frequentes
- Modelos: Serviço dedicado ou GPU
- Database: Histórico de análises (opcional)

## Deploy

### Docker
- Containers separados para frontend e backend
- Docker Compose para orquestração
- Health checks configurados

### Produção
- Frontend: Vercel, Netlify, ou servidor próprio
- Backend: AWS, GCP, Azure, ou servidor próprio
- CDN: Para assets estáticos
- Monitoring: Logs e métricas

## Monitoramento

### Métricas Importantes
- Tempo de resposta da API
- Taxa de erro
- Uso de recursos (CPU, memória)
- Número de análises por dia
- Distribuição de scores

## Melhorias Futuras

1. **Modelos Melhores**
   - Fine-tuning em dataset específico
   - Modelos multilíngues
   - Ensemble de modelos

2. **Features**
   - Histórico de análises
   - Comparação de textos
   - Dashboard estatístico
   - Extensão de navegador

3. **Performance**
   - Cache de resultados
   - Processamento assíncrono
   - Otimização de modelos

