'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Shield, BookOpen, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [text, setText] = useState('')

  const handleAnalyze = () => {
    if (text.trim().length >= 10) {
      // Salvar texto no sessionStorage para usar na página de análise
      sessionStorage.setItem('analysisText', text)
      router.push('/analyze')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">Veritas</h1>
          </div>
          <Link 
            href="/about" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sobre
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Avalie a Confiabilidade de Informações Online
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Use inteligência artificial para identificar padrões de desinformação de forma transparente e educativa
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
              Cole o texto que deseja analisar
            </label>
            <textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Cole aqui uma notícia, tweet, post ou artigo que você gostaria de analisar..."
              className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">
                {text.length} caracteres {text.length < 10 && '(mínimo 10)'}
              </span>
              <button
                onClick={handleAnalyze}
                disabled={text.trim().length < 10}
                className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Analisar
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Shield className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Transparente
              </h3>
              <p className="text-gray-600">
                Explicações claras sobre como chegamos aos resultados, sem afirmações absolutas
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <BookOpen className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Educativo
              </h3>
              <p className="text-gray-600">
                Aprenda a identificar padrões de desinformação e desenvolva pensamento crítico
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <AlertTriangle className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Sem Censura
              </h3>
              <p className="text-gray-600">
                Não bloqueamos conteúdo. Apenas fornecemos ferramentas para avaliação crítica
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Como Funciona
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Cole o texto</h4>
                  <p className="text-gray-600">Insira o conteúdo que deseja analisar</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Análise com IA</h4>
                  <p className="text-gray-600">Nossa IA analisa padrões linguísticos e características do texto</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Receba o resultado</h4>
                  <p className="text-gray-600">Obtenha score de confiabilidade, explicações e destaques de trechos suspeitos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>Veritas - Plataforma de Detecção de Desinformação com IA</p>
          <p className="text-sm mt-2">Open Source • Ético • Educativo</p>
        </div>
      </footer>
    </div>
  )
}

