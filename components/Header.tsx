'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
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

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPressOpen, setIsPressOpen] = useState(false);
  const [isMobilePressOpen, setIsMobilePressOpen] = useState(false);
  const pressRef = useRef<HTMLDivElement>(null);
  const mobilePressRef = useRef<HTMLDivElement>(null);
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pressRef.current && !pressRef.current.contains(e.target as Node)) {
        setIsPressOpen(false);
      }
      if (mobilePressRef.current && !mobilePressRef.current.contains(e.target as Node)) {
        setIsMobilePressOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pressLabel = language === 'es' ? 'prensa' : 'press';

  const navItems = [
    { href: '/pinturas', label: t.nav.paintings },
    { href: '/dibujos', label: t.nav.drawings },
    { href: '/copias', label: t.nav.copies },
    { href: '/contacto', label: t.nav.contact },
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-center h-14 lg:h-20 relative">
            <Link href="/" className="hover:opacity-70 transition-opacity">
              <span className="text-2xl md:text-4xl lg:text-5xl font-normal tracking-wide text-gray-900">Antonio Monereo</span>
            </Link>

            {/* Derecha desktop */}
            <div className="absolute right-0 hidden md:flex items-center gap-2">
              <div className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity">
                <Link href="/contacto" className="text-[11px] text-gray-500 hover:text-gray-700 transition-colors">
                  {t.nav.contact}
                </Link>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                  className="text-[11px] text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {language === 'es' ? 'EN' : 'ES'}
                </button>
                <span className="text-gray-300">|</span>
                <div ref={pressRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsPressOpen((v) => !v)}
                    className="text-[11px] text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {pressLabel}
                  </button>
                  {isPressOpen && (
                    <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-gray-200 shadow-lg z-50">
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
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Barra inferior móvil */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
        <div className="flex items-stretch">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors ${
                  active ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                <span className={`text-[10px] tracking-wide transition-all ${active ? 'font-medium' : 'font-normal'}`}>
                  {item.label}
                </span>
                {active && <span className="w-4 h-[2px] bg-gray-900 rounded-full" />}
              </Link>
            );
          })}

          {/* Buscar */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Buscar"
            className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-gray-400"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Idioma */}
          <button
            type="button"
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-gray-400"
          >
            <span className="text-[10px] tracking-wide text-blue-500 font-medium">
              {language === 'es' ? 'EN' : 'ES'}
            </span>
          </button>

          {/* Prensa */}
          <div ref={mobilePressRef} className="flex-1 relative">
            <button
              type="button"
              onClick={() => setIsMobilePressOpen((v) => !v)}
              className={`w-full h-full flex flex-col items-center justify-center py-3 gap-0.5 transition-colors ${
                isMobilePressOpen ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              <span className="text-[10px] tracking-wide">{pressLabel}</span>
              {isMobilePressOpen && <span className="w-4 h-[2px] bg-gray-900 rounded-full" />}
            </button>

            {isMobilePressOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-56 bg-white border border-gray-200 shadow-lg z-50">
                {publications.map((pub, i) => (
                  <a
                    key={i}
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobilePressOpen(false)}
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
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
