'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Footer from '@/components/Footer';

export default function Home() {
  const { t } = useLanguage();

  const categories = [
    {
      name: t.nav.paintings,
      href: '/pinturas',
      label: 'pinturas'
    },
    {
      name: t.nav.drawings,
      href: '/dibujos',
      label: 'dibujos'
    },
    {
      name: t.nav.copies,
      href: '/copias',
      label: 'copias'
    },
  ];

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group flex flex-col items-center gap-4 transition-transform hover:scale-105"
              >
                <div className="relative w-40 h-40 flex items-center justify-center transition-all group-hover:drop-shadow-lg">
                  <img
                    src="/icons/aqua_folder-1_(arrastrado) copy.jpg"
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-base font-medium text-gray-800 tracking-wide">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
