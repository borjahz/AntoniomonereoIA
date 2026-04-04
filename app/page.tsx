'use client';

import { useState } from 'react';
import { Instagram, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Carousel from '@/components/Carousel';
import Footer from '@/components/Footer';
import CategoryNavigation from '@/components/CategoryNavigation';
import FadeInView from '@/components/FadeInView';
import { ArtistSchema, OrganizationSchema } from '@/components/StructuredData';
import worksData from '@/data/works.json';

const publications = [
  {
    title_es: 'Exposición espacio MADOS',
    title_en: 'MADOS space Exhibition',
    url: 'https://espaciomados.com/portfolio/antonio-monereo-martinez-bueno-xavier-velazquez/',
  },
  {
    title_es: 'Entrevista Shangay',
    title_en: 'Shangay Interview',
    url: 'https://shangay.com/2025/02/27/antonio-monereo-generacion-selfi-encontrar-mi-sitio/#google_vignette',
  },
  {
    title_es: 'Entrevista Telemadrid',
    title_en: 'Telemadrid Interview',
    url: 'https://www.telemadrid.es/programas/telenoticias-fin-de-semana/Dos-siglos-de-copistas-en-el-Museo-del-Prado-2-2625057486--20231217032916.html',
  },
];

export default function Home() {
  const { t, language } = useLanguage();
  const [pressOpen, setPressOpen] = useState(false);

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

          <div className="lg:ml-48 max-w-6xl mx-auto px-8 pt-32 pb-8 lg:pt-12 lg:pb-12">
            <CategoryNavigation sticky />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* Carrusel — primero en móvil */}
              <div className="order-1 md:order-2 bg-gray-50 p-4 md:p-6 lg:p-8 flex flex-col">
                <div className="w-full h-[340px] md:h-[420px] relative">
                  <Carousel works={worksData} />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-[13px] font-normal tracking-wide text-gray-700">
                    {t.home.featured}
                  </p>
                </div>
              </div>

              {/* About — segundo en móvil */}
              <div className="order-2 md:order-1 bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-14 flex flex-col justify-between transition-all duration-500 hover:shadow-lg">
                <div className="space-y-6">
                  <FadeInView>
                    <h1 className="text-xl lg:text-2xl font-medium text-gray-900 leading-[1.2] tracking-tight">
                      {t.home.title}
                    </h1>
                  </FadeInView>
                  <FadeInView delay={200}>
                    <p className="text-base text-gray-800 leading-[1.8]">
                      {t.home.intro}
                    </p>
                  </FadeInView>
                  <FadeInView delay={400}>
                    <p className="text-base text-gray-700 leading-[1.8]">
                      {t.home.bio}
                    </p>
                  </FadeInView>
                </div>
                <div className="flex flex-wrap items-center gap-5 mt-8">
                  <a
                    href="mailto:antoniomonelopez@gmail.com"
                    className="flex items-center gap-2 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{t.home.email}</span>
                  </a>
                  <a
                    href="https://www.instagram.com/antoniomonereo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>{t.home.instagram}</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@antoniomonereo"
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
            </div>

            {/* Publicaciones — acordeón integrado */}
            <FadeInView delay={200}>
              <div className="mt-10 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setPressOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <span className="text-[11px] tracking-widest uppercase text-gray-400 group-hover:text-gray-700 transition-colors">
                    {language === 'es' ? 'Prensa' : 'Press'}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-all duration-300 ${pressOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    pressOpen ? 'max-h-60 opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    {publications.map((pub, i) => (
                      <a
                        key={i}
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-blue-600 transition-colors group/link w-fit"
                      >
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-gray-400 group-hover/link:text-blue-600 transition-colors" />
                        <span className="underline decoration-gray-300 underline-offset-2 group-hover/link:decoration-blue-600 transition-colors">
                          {language === 'es' ? pub.title_es : pub.title_en}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInView>

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
