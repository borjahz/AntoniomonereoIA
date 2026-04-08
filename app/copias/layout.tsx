import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Copias — Antonio Monereo',
  description: 'Antonio Monereo',
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
