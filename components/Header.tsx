'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
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
  const pressRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pressRef.current && !pressRef.current.contains(e.target as Node)) {
        setIsPressOpen(false);
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
      {/* Header desktop */}
      <header className="sticky top-0 z-40 w-full bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-center h-14 lg:h-20 relative">
            <Link href="/" className="hover:opacity-70 transition-opacity">
              <span className="text-2xl md:text-4xl lg:text-5xl font-normal tracking-wide text-gray-900">Antonio Monereo</span>
            </Link>

            <div className="absolute right-0 flex items-center gap-2">
              <div className="hidden md:flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity">
                <Link href="/contacto" className="text-[11px] text-gray-500 hover:text-gray-700 transition-colors">
                  {t.nav.contact}
                </Link>
                <span className="text-gray-300">|</span>
                <LanguageToggle />
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
                className="hidden md:block p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Barra de navegación inferior — solo móvil */}
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
                <span className={`text-[11px] tracking-wide transition-all ${active ? 'font-medium' : 'font-normal'}`}>
                  {item.label}
                </span>
                {active && <span className="w-4 h-[2px] bg-gray-900 rounded-full mt-0.5" />}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-gray-400"
            aria-label="Buscar"
          >
            <Search className="w-4 h-4" />
            <span className="text-[11px] tracking-wide">{t.common.search}</span>
          </button>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
