"""
Serviço de Processamento de Linguagem Natural
Utiliza modelos de Transformers para análise de texto
"""

import re
import asyncio
from typing import List, Dict, Tuple
import numpy as np
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
import torch

from app.core.config import settings
from app.core.models import SuspiciousPhrase, ReliabilityLevel
from app.core.exceptions import NLPModelException


class NLPService:
    """Serviço para análise NLP de textos"""
    
    def __init__(self):
        self.tokenizer = None
        self.model = None
        self.sentiment_analyzer = None
        self.initialized = False
    
    async def initialize(self):
        """Inicializa os modelos NLP"""
        try:
            # Carregar modelos de forma assíncrona
            loop = asyncio.get_event_loop()
            await loop.run_in_executor(None, self._load_models)
            self.initialized = True
        except Exception as e:
            raise NLPModelException({"error": str(e), "stage": "initialization"})
    
    def _load_models(self):
        """Carrega os modelos NLP (executado em thread separada)"""
        try:
            # Modelo de sentimento (português)
            self.sentiment_analyzer = pipeline(
                "sentiment-analysis",
                model="cardiffnlp/twitter-xlm-roberta-base-sentiment",
                tokenizer="cardiffnlp/twitter-xlm-roberta-base-sentiment",
                device=0 if torch.cuda.is_available() else -1
            )
        except Exception as e:
            # Fallback para modelo mais leve se houver erro
            print(f"Erro ao carregar modelo principal: {e}")
            try:
                self.sentiment_analyzer = pipeline(
                    "sentiment-analysis",
                    device=-1  # CPU
                )
            except Exception as e2:
                print(f"Erro ao carregar modelo fallback: {e2}")
                self.sentiment_analyzer = None
    
    async def analyze_text(self, text: str) -> Dict:
        """
        Analisa um texto e retorna métricas de confiabilidade
        
        Args:
            text: Texto a ser analisado
            
        Returns:
            Dicionário com métricas de análise
        """
        if not self.initialized:
            await self.initialize()
        
        loop = asyncio.get_event_loop()
        
        # Análises paralelas
        results = await asyncio.gather(
            self._analyze_sentiment(text, loop),
            self._detect_suspicious_patterns(text, loop),
            self._analyze_linguistic_features(text, loop),
            return_exceptions=True
        )
        
        sentiment_result, suspicious_phrases, linguistic_features = results
        
        # Calcular score de confiabilidade
        reliability_score = self._calculate_reliability_score(
            sentiment_result,
            suspicious_phrases,
            linguistic_features
        )
        
        # Determinar nível de confiabilidade
        reliability_level = self._determine_reliability_level(reliability_score)
        
        # Gerar explicação
        explanation = self._generate_explanation(
            reliability_score,
            reliability_level,
            suspicious_phrases,
            linguistic_features
        )
        
        # Calcular confiança geral
        confidence = self._calculate_confidence(
            sentiment_result,
            suspicious_phrases,
            linguistic_features
        )
        
        return {
            "reliability_score": reliability_score,
            "reliability_level": reliability_level,
            "explanation": explanation,
            "suspicious_phrases": suspicious_phrases,
            "confidence": confidence,
            "metadata": {
                "text_length": len(text),
                "linguistic_features": linguistic_features
            }
        }
    
    async def _analyze_sentiment(self, text: str, loop: asyncio.AbstractEventLoop) -> Dict:
        """Analisa o sentimento do texto"""
        if not self.sentiment_analyzer:
            return {"label": "NEUTRAL", "score": 0.5}
        
        try:
            # Limitar tamanho do texto para o modelo
            text_chunk = text[:512]
            result = await loop.run_in_executor(
                None,
                self.sentiment_analyzer,
                text_chunk
            )
            
            if isinstance(result, list) and len(result) > 0:
                return result[0]
            return {"label": "NEUTRAL", "score": 0.5}
        except Exception as e:
            print(f"Erro na análise de sentimento: {e}")
            return {"label": "NEUTRAL", "score": 0.5}
    
    async def _detect_suspicious_patterns(self, text: str, loop: asyncio.AbstractEventLoop) -> List[SuspiciousPhrase]:
        """Detecta padrões suspeitos no texto"""
        suspicious_phrases = []
        
        # Padrões de linguagem suspeita
        patterns = [
            {
                "pattern": r'\b(garantido|100%|absolutamente|certamente|sem dúvida|definitivamente)\b',
                "reason": "Linguagem de certeza absoluta",
                "confidence": 0.7
            },
            {
                "pattern": r'\b(urgente|agora|imediatamente|não perca|última chance)\b',
                "reason": "Linguagem de urgência excessiva",
                "confidence": 0.65
            },
            {
                "pattern": r'\b(eles não querem que você saiba|escondem de você|conspiração)\b',
                "reason": "Linguagem conspiratória",
                "confidence": 0.8
            },
            {
                "pattern": r'!{2,}',
                "reason": "Uso excessivo de exclamações",
                "confidence": 0.5
            },
            {
                "pattern": r'\b(CLIQUE AQUI|COMPARTILHE|ENVIE PARA TODOS)\b',
                "reason": "Chamadas de ação agressivas",
                "confidence": 0.75
            }
        ]
        
        for pattern_info in patterns:
            matches = re.finditer(pattern_info["pattern"], text, re.IGNORECASE)
            for match in matches:
                suspicious_phrases.append(
                    SuspiciousPhrase(
                        text=match.group(),
                        start_index=match.start(),
                        end_index=match.end(),
                        reason=pattern_info["reason"],
                        confidence=pattern_info["confidence"]
                    )
                )
        
        return suspicious_phrases
    
    async def _analyze_linguistic_features(self, text: str, loop: asyncio.AbstractEventLoop) -> Dict:
        """Analisa características linguísticas do texto"""
        # Contar palavras
        words = text.split()
        word_count = len(words)
        
        # Contar sentenças (aproximado)
        sentences = re.split(r'[.!?]+', text)
        sentence_count = len([s for s in sentences if s.strip()])
        
        # Calcular média de palavras por sentença
        avg_words_per_sentence = word_count / sentence_count if sentence_count > 0 else 0
        
        # Contar palavras em maiúsculas
        uppercase_words = sum(1 for word in words if word.isupper() and len(word) > 1)
        uppercase_ratio = uppercase_words / word_count if word_count > 0 else 0
        
        # Contar exclamações e interrogações
        exclamation_count = text.count('!')
        question_count = text.count('?')
        
        return {
            "word_count": word_count,
            "sentence_count": sentence_count,
            "avg_words_per_sentence": avg_words_per_sentence,
            "uppercase_ratio": uppercase_ratio,
            "exclamation_count": exclamation_count,
            "question_count": question_count
        }
    
    def _calculate_reliability_score(
        self,
        sentiment_result: Dict,
        suspicious_phrases: List[SuspiciousPhrase],
        linguistic_features: Dict
    ) -> int:
        """Calcula o score de confiabilidade (0-100)"""
        score = 70  # Score base (neutro)
        
        # Ajustar baseado em frases suspeitas
        if suspicious_phrases:
            penalty = min(len(suspicious_phrases) * 10, 40)
            score -= penalty
        
        # Ajustar baseado em características linguísticas
        if linguistic_features["uppercase_ratio"] > 0.1:
            score -= 15
        
        if linguistic_features["exclamation_count"] > 3:
            score -= 10
        
        # Ajustar baseado em sentimento extremo
        if sentiment_result.get("label") in ["NEGATIVE", "POSITIVE"]:
            sentiment_score = sentiment_result.get("score", 0.5)
            if sentiment_score > 0.8:  # Sentimento muito forte
                score -= 5
        
        # Garantir que está no range 0-100
        score = max(0, min(100, score))
        
        return int(score)
    
    def _determine_reliability_level(self, score: int) -> ReliabilityLevel:
        """Determina o nível de confiabilidade baseado no score"""
        if score >= 70:
            return ReliabilityLevel.RELIABLE
        elif score >= 50:
            return ReliabilityLevel.ATTENTION
        else:
            return ReliabilityLevel.QUESTIONABLE
    
    def _generate_explanation(
        self,
        score: int,
        level: ReliabilityLevel,
        suspicious_phrases: List[SuspiciousPhrase],
        linguistic_features: Dict
    ) -> str:
        """Gera uma explicação clara do resultado"""
        explanations = []
        
        # Explicação base
        if level == ReliabilityLevel.RELIABLE:
            explanations.append("O texto apresenta características de informação confiável.")
        elif level == ReliabilityLevel.ATTENTION:
            explanations.append("O texto apresenta algumas características que merecem atenção.")
        else:
            explanations.append("O texto apresenta várias características que podem indicar desinformação.")
        
        # Adicionar detalhes sobre frases suspeitas
        if suspicious_phrases:
            unique_reasons = list(set([p.reason for p in suspicious_phrases]))
            if unique_reasons:
                explanations.append(f"Foram identificados padrões como: {', '.join(unique_reasons[:3])}.")
        
        # Adicionar detalhes linguísticos
        if linguistic_features["uppercase_ratio"] > 0.1:
            explanations.append("O uso excessivo de maiúsculas pode indicar tentativa de chamar atenção.")
        
        if linguistic_features["exclamation_count"] > 3:
            explanations.append("O uso excessivo de exclamações pode indicar linguagem sensacionalista.")
        
        # Aviso de incerteza
        explanations.append("Esta análise é baseada em padrões linguísticos e não representa uma afirmação absoluta sobre a veracidade do conteúdo.")
        
        return " ".join(explanations)
    
    def _calculate_confidence(
        self,
        sentiment_result: Dict,
        suspicious_phrases: List[SuspiciousPhrase],
        linguistic_features: Dict
    ) -> float:
        """Calcula a confiança geral da análise (0-1)"""
        # Base de confiança
        confidence = 0.7
        
        # Aumentar confiança se há muitas frases suspeitas
        if len(suspicious_phrases) >= 3:
            confidence = min(0.9, confidence + 0.1)
        
        # Aumentar confiança se características linguísticas são claras
        if linguistic_features["uppercase_ratio"] > 0.15 or linguistic_features["exclamation_count"] > 5:
            confidence = min(0.9, confidence + 0.1)
        
        # Reduzir confiança se texto é muito curto
        if linguistic_features["word_count"] < 50:
            confidence = max(0.5, confidence - 0.2)
        
        return round(confidence, 2)
    
    async def cleanup(self):
        """Limpa recursos dos modelos"""
        self.sentiment_analyzer = None
        self.model = None
        self.tokenizer = None
        self.initialized = False

