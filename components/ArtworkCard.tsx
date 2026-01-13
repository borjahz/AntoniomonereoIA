'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface Work {
  id: number;
  slug: string;
  title_es: string;
  title_en: string;
  dimensions: string;
  images: string[];
  category: string;
}

interface ArtworkCardProps {
  work: Work;
  onClick?: () => void;
}

export default function ArtworkCard({ work, onClick }: ArtworkCardProps) {
  const { language } = useLanguage();
  const title = language === 'es' ? work.title_es : work.title_en;

  return (
    <Link
      href={`/obra/${work.slug}`}
      onClick={onClick}
      className="group block bg-white transition-opacity hover:opacity-80"
    >
      <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-4">
        <img
          src={work.images[0]}
          alt={title}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-normal text-blue-600 underline decoration-1 underline-offset-2 mb-1 leading-relaxed">
          {title}
        </h3>
        <p className="text-[13px] font-normal tracking-wide text-gray-600">{work.dimensions}</p>
      </div>
    </Link>
  );
}
