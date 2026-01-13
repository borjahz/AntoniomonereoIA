import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Antonio Monereo - Portfolio',
  description: 'Portfolio artístico de Antonio Monereo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}
