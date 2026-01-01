"""
Rotas de análise de texto
"""

from fastapi import APIRouter, HTTPException, Request
from typing import Dict

from app.core.models import AnalysisRequest, AnalysisResponse
from app.core.exceptions import TextTooLongException, InvalidTextException, NLPModelException
from app.core.config import settings

router = APIRouter()


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_text(
    request: AnalysisRequest,
    app_request: Request
) -> AnalysisResponse:
    """
    Analisa um texto e retorna métricas de confiabilidade
    
    - **text**: Texto a ser analisado (mínimo 10 caracteres)
    
    Retorna:
    - Score de confiabilidade (0-100)
    - Nível de confiabilidade (confiável/duvidoso/atenção)
    - Explicação do resultado
    - Frases suspeitas identificadas
    - Aviso de incerteza
    """
    # Validar tamanho do texto
    if len(request.text) > settings.MAX_TEXT_LENGTH:
        raise TextTooLongException(
            max_length=settings.MAX_TEXT_LENGTH,
            actual_length=len(request.text)
        )
    
    if not request.text or not request.text.strip():
        raise InvalidTextException()
    
    # Obter serviço NLP do estado da aplicação
    nlp_service = app_request.app.state.nlp_service
    
    if not nlp_service:
        raise HTTPException(
            status_code=503,
            detail="Serviço de análise não está disponível. Tente novamente em alguns instantes."
        )
    
    try:
        # Realizar análise
        analysis_result = await nlp_service.analyze_text(request.text)
        
        # Gerar aviso de incerteza
        uncertainty_warning = (
            "⚠️ Esta análise é uma estimativa baseada em padrões linguísticos e técnicas de "
            "processamento de linguagem natural. Não é uma afirmação absoluta sobre a veracidade "
            "do conteúdo. Sempre verifique informações importantes através de fontes confiáveis "
            "e múltiplas referências. O modelo pode ter limitações e não substitui o pensamento crítico."
        )
        
        # Construir resposta
        response = AnalysisResponse(
            reliability_score=analysis_result["reliability_score"],
            reliability_level=analysis_result["reliability_level"],
            explanation=analysis_result["explanation"],
            suspicious_phrases=analysis_result["suspicious_phrases"],
            confidence=analysis_result["confidence"],
            uncertainty_warning=uncertainty_warning,
            metadata=analysis_result.get("metadata", {})
        )
        
        return response
        
    except Exception as e:
        if isinstance(e, (TextTooLongException, InvalidTextException)):
            raise
        
        raise NLPModelException({"error": str(e)})

