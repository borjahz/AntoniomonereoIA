import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Analytics from '@/components/Analytics'
import CookieConsent from '@/components/CookieConsent'
import PageTransition from '@/components/PageTransition'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Antonio Monereo',
  description: 'Antonio Monereo',
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
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
    title: 'Antonio Monereo',
    description: 'Antonio Monereo',
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
    title: 'Antonio Monereo',
    description: 'Antonio Monereo',
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
            <main className="flex-1"><PageTransition>{children}</PageTransition></main>
          </div>
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}
