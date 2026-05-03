import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/Header'
import worksData from '@/data/works.json'

const suisseIntl = localFont({
  src: '../public/fonts/suisse-intl.ttf',
  variable: '--font-suisse',
  display: 'swap',
  preload: true,
})

const ttWellingtons = localFont({
  src: '../public/fonts/tt-wellingtons-regular.ttf',
  variable: '--font-wellingtons',
  display: 'swap',
  preload: true,
})
import Analytics from '@/components/Analytics'
import CookieConsent from '@/components/CookieConsent'
import WebVitals from '@/components/WebVitals'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Antonio Monereo',
  description: 'Antonio Monereo',
  icons: {
    icon: [{ url: '/favicon.jpg', type: 'image/jpeg' }],
    apple: [{ url: '/favicon.jpg', type: 'image/jpeg', sizes: '180x180' }],
    shortcut: '/favicon.jpg',
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
        url: 'https://antoniomonereo.com/images/muerte-en-tarifa-antonio-monereo.jpg',
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
    images: ['https://antoniomonereo.com/images/muerte-en-tarifa-antonio-monereo.jpg'],
  },
  alternates: {
    canonical: 'https://antoniomonereo.com',
    languages: {
      'es': 'https://antoniomonereo.com',
      'en': 'https://antoniomonereo.com',
      'x-default': 'https://antoniomonereo.com',
    },
  },
}

const firstCarouselImage = [...worksData].sort((a, b) => b.id - a.id)[0]?.images[0];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`h-full ${suisseIntl.variable} ${ttWellingtons.variable}`}>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light" />
        <meta name="geo.region" content="ES" />
        <meta name="geo.placename" content="España" />
        <link rel="me" href="https://www.instagram.com/antoniomonereo" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="alternate" type="application/rss+xml" title="Antonio Monereo — Obras" href="/feed.xml" />
        <link rel="alternate" type="application/feed+json" title="Antonio Monereo — Obras" href="/feed.json" />
        <link rel="search" type="application/opensearchdescription+xml" title="Antonio Monereo" href="/opensearch.xml" />
        {firstCarouselImage && (
          <link rel="preload" as="image" href={firstCarouselImage} />
        )}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [{ where: { href_matches: '/obra/*' }, eagerness: 'moderate' }],
            }),
          }}
        />
      </head>
      <body className="h-full font-sans antialiased">
        <Analytics />
        <WebVitals />
        <SpeedInsights />
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}
