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
          <div className="flex items-center justify-center h-24 relative">
            {/* Logo centrado */}
            <Link href="/" className="hover:opacity-70 transition-opacity">
              <span className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-wide text-gray-900">Antonio Monereo</span>
            </Link>

            {/* Iconos discretos a la derecha */}
            <div className="absolute right-0 flex items-center gap-3">
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
                  onClick={() => setIsPublicationsOpen(true)}
                  className="text-[11px] text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {t.common.publications}
                </button>
              </div>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <nav className="px-6 py-4 space-y-3">
              <Link
                href="/contacto"
                onClick={() => setIsMenuOpen(false)}
                className="block text-[12px] text-gray-500 hover:text-gray-700 transition-colors"
              >
                {t.nav.contact}
              </Link>
              <div className="flex items-center gap-4">
                <LanguageToggle />
                <button
                  onClick={() => {
                    setIsPublicationsOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-[12px] text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {t.common.publications}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

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
