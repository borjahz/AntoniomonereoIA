'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import SearchModal from './SearchModal';
import PublicationsModal from './PublicationsModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPublicationsOpen, setIsPublicationsOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === '/';

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
                <button
                  type="button"
                  onClick={() => setIsPublicationsOpen(true)}
                  className="text-[11px] text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {t.common.publications}
                </button>
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
          <button
            type="button"
            onClick={() => {
              setIsPublicationsOpen(true);
              setIsMenuOpen(false);
            }}
            className="block text-base text-gray-700 hover:text-gray-900 transition-colors"
          >
            {t.common.publications}
          </button>
          <div className="pt-4 border-t border-gray-200">
            <LanguageToggle />
          </div>
        </nav>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <PublicationsModal
        isOpen={isPublicationsOpen}
        onClose={() => setIsPublicationsOpen(false)}
      />
    </>
  );
}
