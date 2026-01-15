import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dibujos - Antonio Monereo | Grafito y Composiciones Minimalistas',
  description: 'Descubre la colección de dibujos de Antonio Monereo. Obras en grafito sobre papel con composiciones minimalistas que exploran formas geométricas y figuras humanas.',
  keywords: [
    'dibujos Antonio Monereo',
    'grafito sobre papel',
    'dibujo minimalista',
    'arte geométrico',
    'Calma y Relax',
    'dibujo contemporáneo',
    'comprar dibujos originales',
  ],
  openGraph: {
    title: 'Dibujos - Antonio Monereo | Grafito sobre Papel',
    description: 'Colección de dibujos minimalistas en grafito de Antonio Monereo.',
    url: 'https://antoniomonereo.com/dibujos',
    images: [
      {
        url: 'https://antoniomonereo.com/images/Calma_y_Relax_I.jpg',
        width: 1200,
        height: 1200,
        alt: 'Dibujos de Antonio Monereo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dibujos - Antonio Monereo',
    description: 'Colección de dibujos minimalistas en grafito sobre papel.',
    images: ['https://antoniomonereo.com/images/Calma_y_Relax_I.jpg'],
  },
  alternates: {
    canonical: 'https://antoniomonereo.com/dibujos',
  },
};

export default function DibujosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
