"""
Configurações da aplicação
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Configurações da aplicação Veritas"""
    
    # API Settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
    ]
    
    # NLP Settings
    NLP_MODEL_NAME: str = "pierreguillou/bert-base-cased-pt-lenerbr"
    MAX_TEXT_LENGTH: int = 2000
    CONFIDENCE_THRESHOLD: float = 0.6
    
    # Explainable AI Settings
    MIN_EXPLANATION_LENGTH: int = 50
    MAX_EXPLANATION_LENGTH: int = 500
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

