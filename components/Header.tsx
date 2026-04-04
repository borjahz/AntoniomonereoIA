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
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { href: '/pinturas', label: t.nav.paintings },
    { href: '/dibujos', label: t.nav.drawings },
    { href: '/copias', label: t.nav.copies },
  ];

  return (
    <>
      {/* Header — solo logo en desktop, logo en móvil */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-center h-14 lg:h-20">
            <Link href="/" className="hover:opacity-70 transition-opacity">
              <span className="text-2xl md:text-4xl lg:text-5xl font-normal tracking-wide text-gray-900">
                Antonio Monereo
              </span>
            </Link>
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
                className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors ${
                  active ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                <span className={`text-[10px] tracking-wide ${active ? 'font-medium' : 'font-normal'}`}>
                  {item.label}
                </span>
                {active && <span className="w-4 h-[2px] bg-gray-900 rounded-full mt-0.5" />}
              </Link>
            );
          })}

          {/* ··· */}
          <div ref={moreRef} className="flex-1 relative">
            <button
              type="button"
              onClick={() => setIsMoreOpen((v) => !v)}
              aria-label="Más opciones"
              className={`w-full h-full flex flex-col items-center justify-center py-3 transition-colors ${
                isMoreOpen ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              <span className="text-base leading-none tracking-widest">···</span>
              {isMoreOpen && <span className="w-4 h-[2px] bg-gray-900 rounded-full mt-1" />}
            </button>

            {isMoreOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-44 bg-white border border-gray-200 shadow-lg z-50">
                <button
                  type="button"
                  onClick={() => { setIsSearchOpen(true); setIsMoreOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                  {t.common.search}
                </button>
                <Link
                  href="/contacto"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  {t.nav.contact}
                </Link>
                <button
                  type="button"
                  onClick={() => { setLanguage(language === 'es' ? 'en' : 'es'); setIsMoreOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[12px] text-blue-600 hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  {language === 'es' ? 'English' : 'Español'}
                </button>
                {publications.map((pub, i) => (
                  <a
                    key={i}
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
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
