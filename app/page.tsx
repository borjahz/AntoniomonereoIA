'use client';

import { Instagram, Mail } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Carousel from '@/components/Carousel';
import worksData from '@/data/works.json';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-8 lg:p-12 flex flex-col justify-between min-h-[500px]">
            <div className="space-y-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t.home.title}
              </h1>
              <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                {t.home.intro}
              </p>
              <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                {t.home.bio}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>{t.home.instagram}</span>
              </a>
              <a
                href="mailto:contact@artist.com"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>{t.home.email}</span>
              </a>
              <Link
                href="/contacto"
                className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                {t.home.contact}
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 p-4 lg:p-6 flex flex-col min-h-[500px]">
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full aspect-[4/3] relative">
                <Carousel works={worksData} />
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold text-gray-600">
                {t.home.featured}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
