"""
Veritas - Backend API
Plataforma de Detecção de Desinformação com IA
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from contextlib import asynccontextmanager

from app.core.config import settings
from app.api.routes import analysis
from app.core.exceptions import VeritasException


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Gerencia o ciclo de vida da aplicação"""
    # Startup: Carregar modelos NLP
    from app.services.nlp_service import NLPService
    app.state.nlp_service = NLPService()
    await app.state.nlp_service.initialize()
    
    yield
    
    # Shutdown: Limpar recursos
    if hasattr(app.state, 'nlp_service'):
        await app.state.nlp_service.cleanup()


app = FastAPI(
    title="Veritas API",
    description="API para análise de confiabilidade de informações usando IA",
    version="1.0.0",
    lifespan=lifespan
)

# CORS - Permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Handler global de exceções
@app.exception_handler(VeritasException)
async def veritas_exception_handler(request, exc: VeritasException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.message, "details": exc.details}
    )


@app.get("/")
async def root():
    """Endpoint raiz - informações da API"""
    return {
        "name": "Veritas API",
        "version": "1.0.0",
        "description": "Plataforma de Detecção de Desinformação com IA",
        "status": "operational"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "veritas-api"}


# Registrar rotas
app.include_router(analysis.router, prefix="/api/v1", tags=["analysis"])


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )

