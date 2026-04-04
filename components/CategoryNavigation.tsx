'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, ExternalLink } from 'lucide-react';
import SearchModal from './SearchModal';

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

interface CategoryNavigationProps {
  sticky?: boolean;
}

export default function CategoryNavigation({ sticky = false }: CategoryNavigationProps) {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPressOpen, setIsPressOpen] = useState(false);
  const pressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pressRef.current && !pressRef.current.contains(e.target as Node)) {
        setIsPressOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { name: t.nav.paintings, href: '/pinturas' },
    { name: t.nav.drawings, href: '/dibujos' },
    { name: t.nav.copies, href: '/copias' },
  ];

  const isActive = (href: string) => pathname === href;

  if (sticky) {
    return (
      <>
        {/* Desktop: sidebar izquierdo */}
        <aside className="hidden lg:flex fixed left-2 xl:left-4 2xl:left-6 top-20 bottom-12 z-30 flex-col justify-between">
          {/* Categorías */}
          <nav className="flex flex-col justify-evenly flex-1">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group flex flex-col items-center gap-1 transition-all"
              >
                <div className="relative w-28 h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 flex items-center justify-center transition-all group-hover:scale-105">
                  <img
                    src={isActive(category.href)
                      ? "/icons/aqua_favorites-removebg-preview copy.png"
                      : "/icons/aqua_folder-1_(arrastrado) copy.jpg"
                    }
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className={`text-sm font-medium tracking-wide text-center transition-colors ${
                  isActive(category.href) ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                }`}>
                  {category.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Controles utilitarios */}
          <div className="flex flex-col items-center gap-3 pb-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="text-[11px] text-blue-500 hover:text-blue-700 transition-colors font-medium"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>

            <Link
              href="/contacto"
              className={`text-[11px] tracking-wide transition-colors ${
                isActive('/contacto') ? 'text-gray-900 font-medium' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {t.nav.contact}
            </Link>

            <div ref={pressRef} className="relative">
              <button
                type="button"
                onClick={() => setIsPressOpen((v) => !v)}
                className="text-[11px] tracking-wide text-gray-400 hover:text-gray-700 transition-colors"
              >
                {language === 'es' ? 'prensa' : 'press'}
              </button>
              {isPressOpen && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-white border border-gray-200 shadow-lg z-50">
                  {publications.map((pub, i) => (
                    <a
                      key={i}
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsPressOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-[12px] text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <ExternalLink className="w-3 h-3 flex-shrink-0 text-gray-400" />
                      {language === 'es' ? pub.title_es : pub.title_en}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Móvil: no hay barra superior, la navegación está en la barra inferior */}

        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </>
    );
  }

  return null;
}
