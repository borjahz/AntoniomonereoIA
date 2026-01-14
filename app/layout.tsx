import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Antonio Monereo - Artista Visual',
  description: 'Portfolio artístico de Antonio Monereo. Pintor y dibujante contemporáneo especializado en óleo sobre lienzo, grafito y copias de maestros clásicos.',
  keywords: ['Antonio Monereo', 'artista', 'pintura', 'dibujo', 'óleo', 'arte contemporáneo', 'portfolio'],
  authors: [{ name: 'Antonio Monereo' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://antoniomonereo.com',
    title: 'Antonio Monereo - Artista Visual',
    description: 'Portfolio artístico de Antonio Monereo. Pintor y dibujante contemporáneo.',
    siteName: 'Antonio Monereo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antonio Monereo - Artista Visual',
    description: 'Portfolio artístico de Antonio Monereo. Pintor y dibujante contemporáneo.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full font-sans antialiased">
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
