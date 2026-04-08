import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinturas — Antonio Monereo',
  description: 'Galería de pinturas de Antonio Monereo. Óleos sobre lienzo con referencias clásicas, figurativas y mitológicas.',
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
