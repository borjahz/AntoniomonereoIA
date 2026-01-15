import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Analytics from '@/components/Analytics'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Antonio Monereo - Artista Visual | Pintura y Dibujo Contemporáneo',
  description: 'Portfolio artístico de Antonio Monereo. Pintor y dibujante contemporáneo especializado en óleo sobre lienzo, grafito y copias de maestros clásicos. Explora obras originales, dibujos minimalistas y reproducciones de Zurbarán, Velázquez y Tiziano.',
  keywords: [
    'Antonio Monereo',
    'artista visual',
    'pintura contemporánea',
    'óleo sobre lienzo',
    'dibujo grafito',
    'arte figurativo',
    'copias maestros clásicos',
    'Zurbarán',
    'Velázquez',
    'Tiziano',
    'portfolio artístico',
    'pintor español',
    'arte contemporáneo',
    'obras disponibles',
    'comprar arte original'
  ],
  authors: [{ name: 'Antonio Monereo' }],
  creator: 'Antonio Monereo',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://antoniomonereo.com',
    title: 'Antonio Monereo - Artista Visual | Pintura y Dibujo Contemporáneo',
    description: 'Portfolio artístico de Antonio Monereo. Pintor y dibujante contemporáneo especializado en óleo sobre lienzo, grafito y copias de maestros clásicos.',
    siteName: 'Antonio Monereo',
    images: [
      {
        url: 'https://antoniomonereo.com/images/Muerte_en_tarifa.jpg',
        width: 1200,
        height: 1200,
        alt: 'Obra de Antonio Monereo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antonio Monereo - Artista Visual | Pintura y Dibujo Contemporáneo',
    description: 'Portfolio artístico de Antonio Monereo. Pintor y dibujante contemporáneo especializado en óleo sobre lienzo, grafito y copias de maestros clásicos.',
    images: ['https://antoniomonereo.com/images/Muerte_en_tarifa.jpg'],
  },
  alternates: {
    canonical: 'https://antoniomonereo.com',
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
        <Analytics />
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
