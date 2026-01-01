import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Veritas - Detecção de Desinformação com IA',
  description: 'Plataforma transparente e educativa para avaliar a confiabilidade de informações online usando inteligência artificial',
  keywords: ['desinformação', 'fake news', 'IA', 'verificação', 'confiabilidade', 'educação digital'],
  authors: [{ name: 'Veritas Team' }],
  openGraph: {
    title: 'Veritas - Detecção de Desinformação com IA',
    description: 'Avalie a confiabilidade de informações online de forma transparente e educativa',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

