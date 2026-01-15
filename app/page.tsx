'use client';

import { Instagram, Mail } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Carousel from '@/components/Carousel';
import Footer from '@/components/Footer';
import CategoryNavigation from '@/components/CategoryNavigation';
import { ArtistSchema, OrganizationSchema } from '@/components/StructuredData';
import worksData from '@/data/works.json';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <ArtistSchema
        name="Antonio Monereo"
        url="https://antoniomonereo.com"
        description="Pintor y dibujante contemporáneo especializado en óleo sobre lienzo, grafito y copias de maestros clásicos."
        image="https://antoniomonereo.com/images/Muerte_en_tarifa.jpg"
        sameAs={[
          'https://www.instagram.com/antoniomonereo',
          'https://www.tiktok.com/@antoniomonereo',
        ]}
      />
      <OrganizationSchema />

      <div className="flex flex-col min-h-full">
        <div className="flex-1 bg-white">
        <CategoryNavigation />

        <div className="max-w-7xl mx-auto px-8 py-8 lg:py-12">
          <div className="lg:flex lg:flex-col lg:gap-6">
            <CategoryNavigation sticky />

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
                    href="mailto:antoniomonelopez@gmail.com"
                    className="flex items-center gap-2 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{t.home.email}</span>
                  </a>
                  <a
                    href="https://www.instagram.com/antoniomonereo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>{t.home.instagram}</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@antoniomonereo?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    <span>TikTok</span>
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
      </div>

      <Footer />
      </div>
    </>
  );
}
