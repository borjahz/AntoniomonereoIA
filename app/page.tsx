'use client';

import { Instagram, Mail } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Carousel from '@/components/Carousel';
import Footer from '@/components/Footer';
import worksData from '@/data/works.json';

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
        <div className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-center items-center gap-12 lg:gap-20">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group flex flex-col items-center gap-3 transition-all"
                >
                  <div className="relative w-12 h-12 flex items-center justify-center transition-all group-hover:scale-[1.03] group-hover:opacity-80">
                    <img
                      src="/icons/aqua_folder-1_(arrastrado) copy.jpg"
                      alt={category.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 group-hover:text-blue-800 transition-colors">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-50 p-10 lg:p-14 flex flex-col justify-between min-h-[500px]">
              <div className="space-y-8">
                <h1 className="text-3xl lg:text-5xl font-medium text-gray-900 leading-[1.3] tracking-tight">
                  {t.home.title}
                </h1>
                <p className="text-gray-800 leading-[1.8]">
                  {t.home.intro}
                </p>
                <p className="text-gray-800 leading-[1.8]">
                  {t.home.bio}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-5 mt-10">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>{t.home.instagram}</span>
                </a>
                <a
                  href="mailto:contact@artist.com"
                  className="flex items-center gap-2 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>{t.home.email}</span>
                </a>
                <Link
                  href="/contacto"
                  className="text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                >
                  {t.home.contact}
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 p-6 lg:p-8 flex flex-col min-h-[500px]">
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full aspect-[4/3] relative">
                  <Carousel works={worksData} />
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-[13px] font-normal tracking-wide text-gray-700">
                  {t.home.featured}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
