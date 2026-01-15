import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Copias de Maestros - Antonio Monereo | Zurbarán, Velázquez, Tiziano',
  description: 'Reproducciones fieles de obras maestras clásicas realizadas por Antonio Monereo. Copias de Zurbarán, Velázquez, Tiziano y otros grandes maestros de la pintura española y europea.',
  keywords: [
    'copias maestros clásicos',
    'Antonio Monereo copista',
    'copia Zurbarán',
    'copia Velázquez',
    'copia Tiziano',
    'reproducciones museo del Prado',
    'copias óleo sobre lienzo',
    'San Francisco Zurbarán',
  ],
  openGraph: {
    title: 'Copias de Maestros - Antonio Monereo',
    description: 'Reproducciones de obras maestras de Zurbarán, Velázquez, Tiziano y otros grandes maestros.',
    url: 'https://antoniomonereo.com/copias',
    images: [
      {
        url: 'https://antoniomonereo.com/images/Zurbaran.jpg',
        width: 1200,
        height: 1200,
        alt: 'Copias de maestros clásicos por Antonio Monereo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Copias de Maestros - Antonio Monereo',
    description: 'Reproducciones fieles de obras maestras clásicas.',
    images: ['https://antoniomonereo.com/images/Zurbaran.jpg'],
  },
  alternates: {
    canonical: 'https://antoniomonereo.com/copias',
  },
};

export default function CopiasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
