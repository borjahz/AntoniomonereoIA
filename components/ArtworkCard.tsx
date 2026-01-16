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
  status: string;
  technique_es: string;
  technique_en: string;
  year: number;
}

interface ArtworkCardProps {
  work: Work;
  onClick?: () => void;
}

export default function ArtworkCard({ work, onClick }: ArtworkCardProps) {
  const { language, t } = useLanguage();
  const title = language === 'es' ? work.title_es : work.title_en;
  const technique = language === 'es' ? work.technique_es : work.technique_en;

  // Descriptive alt text for SEO and accessibility
  const altText = `${title}, ${technique}, ${work.dimensions}, ${work.year} - Antonio Monereo`;

  return (
    <Link
      href={`/obra/${work.slug}`}
      onClick={onClick}
      className="group block bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="aspect-[4/3] bg-gray-50 overflow-hidden relative transition-all duration-300 group-hover:bg-gray-100">
        <img
          src={work.images[0]}
          alt={altText}
          className="w-full h-full object-contain"
        />
        {work.status === 'sold' && (
          <div className="absolute top-3 right-3 bg-gray-900/90 text-white px-3 py-1 text-[11px] font-normal tracking-wide uppercase">
            {t.work.sold}
          </div>
        )}
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
