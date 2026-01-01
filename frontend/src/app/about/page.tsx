'use client'

import Link from 'next/link'
import { ArrowLeft, Shield, BookOpen, Code, Heart } from 'lucide-react'

export default function AboutPage() {
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

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Sobre o Veritas</h1>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary-600" />
                  Nossa Missão
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  O <strong>Veritas</strong> é uma plataforma open source criada para ajudar pessoas a avaliarem 
                  a confiabilidade de informações online de forma transparente, educativa e ética. 
                  Acreditamos que a melhor forma de combater a desinformação não é através da censura, 
                  mas sim através da educação e do desenvolvimento do pensamento crítico.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Nossa ferramenta utiliza inteligência artificial para identificar padrões linguísticos 
                  que podem indicar desinformação, mas sempre com transparência sobre as limitações e 
                  incertezas do modelo. Nunca afirmamos que algo é "falso" ou "verdadeiro" de forma absoluta.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                  Princípios Éticos
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Transparência:</strong> Explicamos claramente como chegamos aos resultados</li>
                  <li><strong>Sem Censura:</strong> Não bloqueamos ou removemos conteúdo</li>
                  <li><strong>Educação:</strong> Focamos em ensinar, não em julgar</li>
                  <li><strong>Incerteza:</strong> Sempre apresentamos as limitações do modelo</li>
                  <li><strong>Neutralidade:</strong> Não assumimos posicionamento político</li>
                  <li><strong>Pensamento Crítico:</strong> Incentivamos a verificação através de múltiplas fontes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Code className="w-6 h-6 text-primary-600" />
                  Tecnologia
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  O Veritas é construído com tecnologias modernas e open source:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Frontend:</strong> Next.js, React, TypeScript, Tailwind CSS</li>
                  <li><strong>Backend:</strong> Python, FastAPI</li>
                  <li><strong>IA/NLP:</strong> Transformers, modelos de processamento de linguagem natural</li>
                  <li><strong>Explainable AI:</strong> Sistema de explicação transparente dos resultados</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Como Funciona</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nossa IA analisa o texto procurando por:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Padrões de linguagem de certeza absoluta</li>
                  <li>Linguagem de urgência excessiva</li>
                  <li>Padrões conspiratórios</li>
                  <li>Uso excessivo de exclamações e maiúsculas</li>
                  <li>Chamadas de ação agressivas</li>
                  <li>Características linguísticas suspeitas</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Com base nesses padrões, calculamos um score de confiabilidade e fornecemos 
                  explicações claras sobre o que foi identificado. Sempre lembramos que esta é 
                  uma ferramenta de apoio, não uma verdade absoluta.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitações</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  É importante entender que:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>O modelo pode ter falsos positivos e falsos negativos</li>
                  <li>A análise é baseada em padrões linguísticos, não em verificação de fatos</li>
                  <li>Textos muito curtos podem ter análises menos precisas</li>
                  <li>O modelo pode não capturar todos os tipos de desinformação</li>
                  <li>Contexto cultural e temporal podem afetar os resultados</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-primary-600" />
                  Contribua
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  O Veritas é um projeto open source. Contribuições são bem-vindas! 
                  Visite nosso repositório no GitHub para saber como contribuir com código, 
                  documentação, testes ou melhorias no modelo de IA.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

