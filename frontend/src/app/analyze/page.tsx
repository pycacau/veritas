'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'

interface SuspiciousPhrase {
  text: string
  start_index: number
  end_index: number
  reason: string
  confidence: number
}

interface AnalysisResult {
  reliability_score: number
  reliability_level: 'confiável' | 'duvidoso' | 'atenção'
  explanation: string
  suspicious_phrases: SuspiciousPhrase[]
  confidence: number
  uncertainty_warning: string
  metadata: {
    text_length: number
  }
}

export default function AnalyzePage() {
  const router = useRouter()
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Recuperar texto do sessionStorage
    const savedText = sessionStorage.getItem('analysisText')
    if (savedText) {
      setText(savedText)
      analyzeText(savedText)
    } else {
      // Se não houver texto, redirecionar para home
      router.push('/')
    }
  }, [router])

  const analyzeText = async (textToAnalyze: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post<AnalysisResult>(
        'http://localhost:8000/api/v1/analyze',
        { text: textToAnalyze }
      )
      setResult(response.data)
    } catch (err: any) {
      setError(
        err.response?.data?.error || 
        'Erro ao analisar texto. Tente novamente mais tarde.'
      )
    } finally {
      setLoading(false)
    }
  }

  const getReliabilityColor = (level: string) => {
    switch (level) {
      case 'confiável':
        return 'text-success-600 bg-success-50 border-success-200'
      case 'atenção':
        return 'text-warning-600 bg-warning-50 border-warning-200'
      case 'duvidoso':
        return 'text-danger-600 bg-danger-50 border-danger-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getReliabilityIcon = (level: string) => {
    switch (level) {
      case 'confiável':
        return <CheckCircle className="w-6 h-6" />
      case 'atenção':
        return <AlertTriangle className="w-6 h-6" />
      case 'duvidoso':
        return <AlertCircle className="w-6 h-6" />
      default:
        return null
    }
  }

  const highlightSuspiciousPhrases = (text: string, phrases: SuspiciousPhrase[]) => {
    if (phrases.length === 0) return text

    // Ordenar frases por índice para processar em ordem
    const sortedPhrases = [...phrases].sort((a, b) => a.start_index - b.start_index)
    
    let result: (string | JSX.Element)[] = []
    let lastIndex = 0

    sortedPhrases.forEach((phrase, idx) => {
      // Adicionar texto antes da frase suspeita
      if (phrase.start_index > lastIndex) {
        result.push(text.substring(lastIndex, phrase.start_index))
      }

      // Adicionar frase suspeita destacada
      result.push(
        <mark
          key={idx}
          className="bg-warning-200 text-warning-900 px-1 rounded cursor-help"
          title={phrase.reason}
        >
          {phrase.text}
        </mark>
      )

      lastIndex = phrase.end_index
    })

    // Adicionar texto restante
    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex))
    }

    return result
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Analisando texto...</p>
          <p className="text-gray-500 text-sm mt-2">Isso pode levar alguns segundos</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <AlertCircle className="w-16 h-16 text-danger-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro na Análise</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    )
  }

  if (!result) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Score Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Resultado da Análise</h2>
              <div className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${getReliabilityColor(result.reliability_level)}`}>
                {getReliabilityIcon(result.reliability_level)}
                <span className="font-semibold capitalize">{result.reliability_level}</span>
              </div>
            </div>

            {/* Score Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Score de Confiabilidade</span>
                <span className="text-2xl font-bold text-gray-900">{result.reliability_score}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    result.reliability_score >= 70
                      ? 'bg-success-500'
                      : result.reliability_score >= 50
                      ? 'bg-warning-500'
                      : 'bg-danger-500'
                  }`}
                  style={{ width: `${result.reliability_score}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Baixa</span>
                <span>Alta</span>
              </div>
            </div>

            {/* Confidence */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Confiança da Análise</span>
                <span className="text-lg font-semibold text-gray-900">
                  {Math.round(result.confidence * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Explicação</h3>
              <p className="text-gray-700 leading-relaxed">{result.explanation}</p>
            </div>

            {/* Uncertainty Warning */}
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-warning-800">{result.uncertainty_warning}</p>
              </div>
            </div>
          </div>

          {/* Text with Highlights */}
          {result.suspicious_phrases.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Texto Analisado com Destaques
              </h3>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {highlightSuspiciousPhrases(text, result.suspicious_phrases)}
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                <span className="inline-block w-4 h-4 bg-warning-200 rounded mr-2 align-middle"></span>
                Trechos destacados em amarelo são suspeitos. Passe o mouse para ver o motivo.
              </p>
            </div>
          )}

          {/* Suspicious Phrases Details */}
          {result.suspicious_phrases.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Detalhes das Frases Suspeitas
              </h3>
              <div className="space-y-4">
                {result.suspicious_phrases.map((phrase, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-gray-900">"{phrase.text}"</p>
                      <span className="text-sm text-gray-500">
                        {Math.round(phrase.confidence * 100)}% confiança
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{phrase.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Analysis Button */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Analisar Outro Texto
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

