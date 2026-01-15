import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinturas - Antonio Monereo | Óleo sobre Lienzo Contemporáneo',
  description: 'Explora la colección de pinturas originales de Antonio Monereo. Obras en óleo sobre lienzo con estilo figurativo contemporáneo, desde retratos hasta composiciones arquitectónicas.',
  keywords: [
    'pinturas Antonio Monereo',
    'óleo sobre lienzo',
    'pintura contemporánea',
    'arte figurativo',
    'comprar pinturas originales',
    'pintor español',
    'Muerte en Tarifa',
    'Ciudad de los Estilitas',
  ],
  openGraph: {
    title: 'Pinturas - Antonio Monereo | Óleo sobre Lienzo',
    description: 'Colección de pinturas originales en óleo sobre lienzo de Antonio Monereo.',
    url: 'https://antoniomonereo.com/pinturas',
    images: [
      {
        url: 'https://antoniomonereo.com/images/Muerte_en_tarifa.jpg',
        width: 1200,
        height: 1200,
        alt: 'Pinturas de Antonio Monereo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pinturas - Antonio Monereo',
    description: 'Colección de pinturas originales en óleo sobre lienzo.',
    images: ['https://antoniomonereo.com/images/Muerte_en_tarifa.jpg'],
  },
  alternates: {
    canonical: 'https://antoniomonereo.com/pinturas',
  },
};

export default function PinturasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
