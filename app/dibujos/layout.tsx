import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dibujos — Antonio Monereo',
  description: 'Antonio Monereo',
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
