import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Copias — Antonio Monereo',
  description: 'Copias de maestros clásicos realizadas por Antonio Monereo en el Museo del Prado. Velázquez, Tiziano y Zurbarán.',
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
