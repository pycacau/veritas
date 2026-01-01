# 🔍 Veritas — Plataforma Web de Detecção de Desinformação com IA

> **Plataforma open source, transparente e educativa para avaliar a confiabilidade de informações online usando inteligência artificial**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)

## 🎯 Visão Geral

O **Veritas** é uma plataforma web inovadora que utiliza inteligência artificial para ajudar pessoas a avaliarem a confiabilidade de informações online. Diferente de outras soluções, o Veritas:

- ✅ **Nunca afirma que algo é "falso" ou "verdadeiro"** — apenas apresenta padrões identificados
- ✅ **É transparente** — explica claramente como chegou aos resultados
- ✅ **É educativo** — ensina a identificar padrões de desinformação
- ✅ **Não censura** — fornece ferramentas, não bloqueia conteúdo
- ✅ **É ético** — sempre apresenta incertezas e limitações

### 🌟 Por que este projeto existe?

Em um mundo onde a desinformação se espalha rapidamente, precisamos de ferramentas que:
- Empoderem as pessoas com conhecimento, não com censura
- Sejam transparentes sobre suas limitações
- Promovam pensamento crítico e educação digital
- Sejam acessíveis e open source

O Veritas foi criado para ser essa ferramenta.

---

## 🚀 Funcionalidades

### MVP (Versão Atual)

- ✅ **Análise de Texto**: Cole qualquer texto e receba uma análise de confiabilidade
- ✅ **Score de Confiabilidade**: Pontuação de 0-100 baseada em padrões linguísticos
- ✅ **Classificação Visual**: Indicadores claros (confiável / duvidoso / atenção)
- ✅ **Explicações Detalhadas**: Entenda por que o texto recebeu determinada classificação
- ✅ **Destaque de Trechos Suspeitos**: Visualização interativa de frases problemáticas
- ✅ **Avisos de Incerteza**: Sempre lembramos que a análise tem limitações
- ✅ **Interface Moderna**: UI acessível, responsiva e intuitiva

### Funcionalidades Planejadas

- 🔄 Histórico de análises (local ou opcional)
- 🌍 Suporte multilíngue
- 📊 Comparação entre duas notícias
- 🎓 Modo educacional explicando como fake news funcionam
- 📈 Dashboard estatístico (tendências de desinformação)
- 🌐 Extensão de navegador

---

## 🏗️ Arquitetura

### Stack Tecnológica

| Componente | Tecnologia | Justificativa |
|------------|-----------|---------------|
| **Frontend** | Next.js 14, React, TypeScript | Framework moderno, SSR, excelente UX |
| **UI** | Tailwind CSS, Framer Motion | Design system moderno, animações suaves |
| **Backend** | Python 3.11+, FastAPI | Framework moderno, auto-documentado, alto desempenho |
| **IA/NLP** | Transformers, PyTorch | Bibliotecas líderes em NLP |
| **Containerização** | Docker, Docker Compose | Isolamento e portabilidade |

### Estrutura do Projeto

```
veritas/
├── backend/                 # API FastAPI
│   ├── app/
│   │   ├── api/            # Rotas da API
│   │   ├── core/           # Configurações, modelos, exceções
│   │   └── services/       # Serviços (NLP, análise)
│   ├── main.py             # Ponto de entrada
│   ├── requirements.txt    # Dependências Python
│   └── Dockerfile
│
├── frontend/               # Aplicação Next.js
│   ├── src/
│   │   └── app/           # Páginas e rotas
│   ├── package.json       # Dependências Node
│   └── Dockerfile
│
├── docker-compose.yml      # Orquestração de containers
└── README.md              # Este arquivo
```

### Fluxo de Dados

```
Usuário → Frontend (Next.js) → API REST (FastAPI) → Serviço NLP → Análise → Resposta → UI
```

---

## 📦 Instalação

### Pré-requisitos

- Python 3.11 ou superior
- Node.js 20 ou superior
- Docker e Docker Compose (opcional, mas recomendado)

### Opção 1: Docker (Recomendado)

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/veritas.git
cd veritas
```

2. **Inicie os containers:**
```bash
docker-compose up -d
```

3. **Acesse a aplicação:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Documentação API: http://localhost:8000/docs

### Opção 2: Instalação Manual

#### Backend

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Executar servidor
uvicorn main:app --reload
```

#### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

Acesse http://localhost:3000

---

## 🎮 Como Usar

1. **Acesse o site** em http://localhost:3000
2. **Cole um texto** que deseja analisar (notícia, tweet, post, artigo)
3. **Clique em "Analisar"**
4. **Veja os resultados**:
   - Score de confiabilidade (0-100)
   - Classificação visual
   - Explicação do resultado
   - Trechos suspeitos destacados
   - Avisos de incerteza

---

## 🔬 Como Funciona

### Análise de Padrões Linguísticos

O Veritas analisa textos procurando por:

1. **Linguagem de Certeza Absoluta**
   - Palavras como "garantido", "100%", "absolutamente"
   - Indicam tentativa de eliminar dúvidas

2. **Linguagem de Urgência Excessiva**
   - "Urgente", "agora", "última chance"
   - Técnica comum em desinformação

3. **Padrões Conspiratórios**
   - "Eles não querem que você saiba"
   - "Escondem de você"

4. **Características Linguísticas**
   - Uso excessivo de maiúsculas
   - Muitas exclamações
   - Chamadas de ação agressivas

### Cálculo do Score

O score de confiabilidade (0-100) é calculado considerando:
- Número e tipo de padrões suspeitos identificados
- Características linguísticas do texto
- Análise de sentimento
- Tamanho e estrutura do texto

### Explainable AI (XAI)

Cada resultado inclui:
- **Explicação clara** do que foi identificado
- **Razões específicas** para cada trecho suspeito
- **Nível de confiança** da análise
- **Avisos de incerteza** sobre limitações

---

## 🛡️ Princípios Éticos

### O que o Veritas FAZ:

- ✅ Identifica padrões linguísticos suspeitos
- ✅ Fornece explicações educativas
- ✅ Apresenta incertezas e limitações
- ✅ Promove pensamento crítico
- ✅ É transparente sobre o processo

### O que o Veritas NÃO FAZ:

- ❌ Não afirma que algo é "falso" ou "verdadeiro"
- ❌ Não censura ou bloqueia conteúdo
- ❌ Não assume posicionamento político
- ❌ Não substitui verificação de fatos
- ❌ Não é uma verdade absoluta

---

## 📊 API

### Endpoint Principal

**POST** `/api/v1/analyze`

Analisa um texto e retorna métricas de confiabilidade.

**Request:**
```json
{
  "text": "Texto a ser analisado (mínimo 10 caracteres)"
}
```

**Response:**
```json
{
  "reliability_score": 75,
  "reliability_level": "confiável",
  "explanation": "O texto apresenta características...",
  "suspicious_phrases": [
    {
      "text": "garantido 100%",
      "start_index": 45,
      "end_index": 62,
      "reason": "Linguagem de certeza absoluta",
      "confidence": 0.85
    }
  ],
  "confidence": 0.78,
  "uncertainty_warning": "Esta análise é uma estimativa...",
  "metadata": {
    "text_length": 250
  }
}
```

### Documentação Completa

Acesse http://localhost:8000/docs para documentação interativa (Swagger UI).

---

## 🧪 Desenvolvimento

### Estrutura de Pastas Detalhada

```
backend/
├── app/
│   ├── api/
│   │   └── routes/
│   │       └── analysis.py      # Rotas de análise
│   ├── core/
│   │   ├── config.py            # Configurações
│   │   ├── models.py            # Modelos Pydantic
│   │   └── exceptions.py        # Exceções customizadas
│   └── services/
│       └── nlp_service.py       # Serviço de NLP
└── main.py                      # Ponto de entrada

frontend/
└── src/
    └── app/
        ├── page.tsx             # Página inicial
        ├── analyze/
        │   └── page.tsx        # Página de resultados
        └── about/
            └── page.tsx        # Página sobre
```

### Executando em Modo Desenvolvimento

**Backend:**
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🧩 Tecnologias e Bibliotecas

### Backend
- **FastAPI**: Framework web moderno e rápido
- **Transformers**: Biblioteca para modelos NLP
- **PyTorch**: Framework de deep learning
- **Pydantic**: Validação de dados
- **Uvicorn**: Servidor ASGI

### Frontend
- **Next.js 14**: Framework React com SSR
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Framework CSS utility-first
- **Framer Motion**: Animações
- **Axios**: Cliente HTTP
- **Lucide React**: Ícones

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Áreas que Precisam de Contribuição

- 🌍 Suporte multilíngue
- 🧠 Melhorias no modelo NLP
- 🎨 Melhorias na UI/UX
- 📊 Dashboard estatístico
- 🧪 Testes automatizados
- 📚 Documentação
- 🌐 Extensão de navegador

---

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🙏 Agradecimentos

- Comunidade open source
- Pesquisadores em NLP e Explainable AI
- Educadores em alfabetização midiática
- Todos os contribuidores do projeto

---

## 📧 Contato e Suporte

- **GitHub Issues**: Para reportar bugs ou sugerir features
- **Discussions**: Para discussões e perguntas
- **Email**: [seu-email@exemplo.com]

---

## 🗺️ Roadmap

### Versão 1.0 (Atual)
- ✅ Análise básica de texto
- ✅ Score de confiabilidade
- ✅ Destaque de trechos suspeitos
- ✅ Interface web moderna

### Versão 1.1 (Próxima)
- 🔄 Histórico de análises
- 🔄 Melhorias no modelo NLP
- 🔄 Suporte a mais idiomas
- 🔄 Modo educacional

### Versão 2.0 (Futuro)
- 📊 Dashboard estatístico
- 🔄 Comparação de textos
- 🌐 Extensão de navegador
- 🤖 Modelos customizáveis

---

<div align="center">

**Desenvolvido com ❤️ para educação digital e combate à desinformação**

*"A verdade não precisa de proteção, apenas de ferramentas para ser encontrada."*

[⭐ Dê uma estrela no GitHub](https://github.com/seu-usuario/veritas) • [🐛 Reportar Bug](https://github.com/seu-usuario/veritas/issues) • [💡 Sugerir Feature](https://github.com/seu-usuario/veritas/issues)

</div>

