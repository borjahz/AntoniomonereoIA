'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ExternalLink } from 'lucide-react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPressOpen, setIsPressOpen] = useState(false);
  const pressRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const pathname = usePathname();

  // Cierra el dropdown al hacer clic fuera
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

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-center h-14 lg:h-20 relative">
            {/* Logo centrado */}
            <Link href="/" className="hover:opacity-70 transition-opacity">
              <span className="text-2xl md:text-4xl lg:text-5xl font-normal tracking-wide text-gray-900">Antonio Monereo</span>
            </Link>

            {/* Iconos discretos a la derecha */}
            <div className="absolute right-0 flex items-center gap-2">
              <div className="hidden md:flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity">
                <Link
                  href="/contacto"
                  className="text-[11px] text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {t.nav.contact}
                </Link>
                <span className="text-gray-300">|</span>
                <LanguageToggle />
                <span className="text-gray-300">|</span>

                {/* Prensa dropdown */}
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

              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Panel lateral móvil */}
      <div
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <span className="text-lg font-medium text-gray-900">Menu</span>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-6 space-y-6">
          <button
            type="button"
            onClick={() => {
              setIsSearchOpen(true);
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-3 text-base text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Search className="w-5 h-5" />
            {t.common.search}
          </button>
          <Link
            href="/contacto"
            onClick={() => setIsMenuOpen(false)}
            className="block text-base text-gray-700 hover:text-gray-900 transition-colors"
          >
            {t.nav.contact}
          </Link>
          {/* Prensa en móvil */}
          <div>
            <p className="text-[11px] tracking-widest uppercase text-gray-400 mb-3">{pressLabel}</p>
            <div className="space-y-3">
              {publications.map((pub, i) => (
                <a
                  key={i}
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                  {language === 'es' ? pub.title_es : pub.title_en}
                </a>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <LanguageToggle />
          </div>
        </nav>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
