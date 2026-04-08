import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dibujos — Antonio Monereo',
  description: 'Galería de dibujos de Antonio Monereo. Obras en grafito que exploran la figura humana y el estudio del natural.',
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
