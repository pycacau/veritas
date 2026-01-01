"""
Exceções customizadas da aplicação
"""


class VeritasException(Exception):
    """Exceção base para erros da aplicação Veritas"""
    
    def __init__(self, message: str, status_code: int = 400, details: dict = None):
        self.message = message
        self.status_code = status_code
        self.details = details or {}
        super().__init__(self.message)


class TextTooLongException(VeritasException):
    """Texto excede o tamanho máximo permitido"""
    
    def __init__(self, max_length: int, actual_length: int):
        super().__init__(
            f"Texto muito longo. Máximo: {max_length} caracteres. Recebido: {actual_length}",
            status_code=400,
            details={"max_length": max_length, "actual_length": actual_length}
        )


class InvalidTextException(VeritasException):
    """Texto inválido ou vazio"""
    
    def __init__(self):
        super().__init__(
            "Texto inválido ou vazio. Por favor, forneça um texto válido para análise.",
            status_code=400
        )


class NLPModelException(VeritasException):
    """Erro ao processar com modelo NLP"""
    
    def __init__(self, details: dict = None):
        super().__init__(
            "Erro ao processar texto com modelo de IA. Tente novamente mais tarde.",
            status_code=500,
            details=details or {}
        )

