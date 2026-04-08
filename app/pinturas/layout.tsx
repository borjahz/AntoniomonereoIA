import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinturas — Antonio Monereo',
  description: 'Antonio Monereo',
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
