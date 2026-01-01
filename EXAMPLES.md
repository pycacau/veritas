# Exemplos de Uso - Veritas

## Exemplo 1: Análise de Texto Simples

### Request
```bash
curl -X POST "http://localhost:8000/api/v1/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Esta é uma notícia importante sobre saúde pública que todos devem ler."
  }'
```

### Response Esperado
```json
{
  "reliability_score": 75,
  "reliability_level": "confiável",
  "explanation": "O texto apresenta características de informação confiável...",
  "suspicious_phrases": [],
  "confidence": 0.7,
  "uncertainty_warning": "⚠️ Esta análise é uma estimativa...",
  "metadata": {
    "text_length": 75
  }
}
```

## Exemplo 2: Texto com Padrões Suspeitos

### Request
```bash
curl -X POST "http://localhost:8000/api/v1/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "URGENTE! Você precisa saber disso AGORA! Eles não querem que você saiba, mas esta informação é GARANTIDA 100%! COMPARTILHE com todos!"
  }'
```

### Response Esperado
```json
{
  "reliability_score": 35,
  "reliability_level": "duvidoso",
  "explanation": "O texto apresenta várias características que podem indicar desinformação...",
  "suspicious_phrases": [
    {
      "text": "URGENTE",
      "start_index": 0,
      "end_index": 7,
      "reason": "Linguagem de urgência excessiva",
      "confidence": 0.65
    },
    {
      "text": "GARANTIDA 100%",
      "start_index": 65,
      "end_index": 80,
      "reason": "Linguagem de certeza absoluta",
      "confidence": 0.7
    }
  ],
  "confidence": 0.85,
  "uncertainty_warning": "⚠️ Esta análise é uma estimativa...",
  "metadata": {
    "text_length": 120
  }
}
```

## Exemplo 3: Usando Python

```python
import requests

url = "http://localhost:8000/api/v1/analyze"
data = {
    "text": "Esta é uma análise de exemplo para testar o Veritas."
}

response = requests.post(url, json=data)
result = response.json()

print(f"Score: {result['reliability_score']}/100")
print(f"Nível: {result['reliability_level']}")
print(f"Explicação: {result['explanation']}")
```

## Exemplo 4: Usando JavaScript/TypeScript

```typescript
const analyzeText = async (text: string) => {
  const response = await fetch('http://localhost:8000/api/v1/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  const result = await response.json();
  return result;
};

// Uso
analyzeText('Texto para analisar')
  .then(result => {
    console.log('Score:', result.reliability_score);
    console.log('Nível:', result.reliability_level);
  });
```

## Casos de Teste

### Texto Confiável
```
"Segundo dados do IBGE, a população brasileira ultrapassou 215 milhões de habitantes em 2023. 
O crescimento populacional segue uma tendência de desaceleração observada nas últimas décadas."
```

### Texto Duvidoso
```
"CIENTISTAS REVELAM: Este alimento simples DESTRÓI o vírus em 24 horas! 
Médicos não querem que você saiba! COMPARTILHE AGORA antes que removam!"
```

### Texto que Requer Atenção
```
"Notícia importante: Mudanças climáticas podem afetar a produção agrícola. 
É urgente que tomemos medidas para proteger nosso futuro!"
```

## Limites e Validações

- **Mínimo**: 10 caracteres
- **Máximo**: 2000 caracteres (configurável)
- **Formato**: Texto plano (UTF-8)

## Tratamento de Erros

### Texto Muito Curto
```json
{
  "error": "Texto deve ter pelo menos 10 caracteres"
}
```

### Texto Muito Longo
```json
{
  "error": "Texto muito longo. Máximo: 2000 caracteres. Recebido: 2500",
  "details": {
    "max_length": 2000,
    "actual_length": 2500
  }
}
```

### Serviço Indisponível
```json
{
  "error": "Serviço de análise não está disponível. Tente novamente em alguns instantes."
}
```

