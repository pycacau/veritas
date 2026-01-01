"""
Modelos de dados (Pydantic) para a API
"""

from pydantic import BaseModel, Field, field_validator
from typing import List, Optional, Dict
from enum import Enum


class ReliabilityLevel(str, Enum):
    """Níveis de confiabilidade"""
    RELIABLE = "confiável"
    QUESTIONABLE = "duvidoso"
    ATTENTION = "atenção"


class SuspiciousPhrase(BaseModel):
    """Frase suspeita identificada no texto"""
    text: str = Field(..., description="Texto da frase suspeita")
    start_index: int = Field(..., description="Índice inicial no texto original")
    end_index: int = Field(..., description="Índice final no texto original")
    reason: str = Field(..., description="Razão pela qual é suspeita")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confiança da detecção (0-1)")


class AnalysisRequest(BaseModel):
    """Requisição de análise de texto"""
    text: str = Field(..., min_length=10, description="Texto a ser analisado")
    
    @field_validator('text')
    @classmethod
    def validate_text(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("Texto não pode ser vazio")
        if len(v.strip()) < 10:
            raise ValueError("Texto deve ter pelo menos 10 caracteres")
        return v.strip()


class AnalysisResponse(BaseModel):
    """Resposta da análise de texto"""
    reliability_score: int = Field(..., ge=0, le=100, description="Score de confiabilidade (0-100)")
    reliability_level: ReliabilityLevel = Field(..., description="Nível de confiabilidade")
    explanation: str = Field(..., description="Explicação clara do resultado")
    suspicious_phrases: List[SuspiciousPhrase] = Field(default_factory=list, description="Frases suspeitas identificadas")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confiança geral da análise")
    uncertainty_warning: str = Field(..., description="Aviso sobre limitações e incertezas")
    metadata: Dict[str, any] = Field(default_factory=dict, description="Metadados adicionais da análise")
    
    class Config:
        json_schema_extra = {
            "example": {
                "reliability_score": 75,
                "reliability_level": "confiável",
                "explanation": "O texto apresenta características de informação confiável...",
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
                "uncertainty_warning": "Esta análise é uma estimativa baseada em padrões linguísticos. Não é uma afirmação absoluta sobre a veracidade do conteúdo.",
                "metadata": {
                    "text_length": 250,
                    "processing_time": 1.2
                }
            }
        }

