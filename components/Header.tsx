'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import SearchModal from './SearchModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t, showPublicOnly, setShowPublicOnly } = useLanguage();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="hover:opacity-70 transition-opacity">
              <span className="text-lg font-medium tracking-tight text-gray-900">antonio monereo</span>
            </Link>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6">
                <Link
                  href="/contacto"
                  className="text-sm font-normal text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {t.nav.contact}
                </Link>
                <LanguageToggle />
                <button
                  onClick={() => setShowPublicOnly(!showPublicOnly)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded transition-colors ${
                    showPublicOnly
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t.common.public}
                </button>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <nav className="px-6 py-6 space-y-4">
              <Link
                href="/contacto"
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm font-normal py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                {t.nav.contact}
              </Link>
              <div className="pt-3 flex items-center gap-3">
                <LanguageToggle />
                <button
                  onClick={() => {
                    setShowPublicOnly(!showPublicOnly);
                  }}
                  className={`text-xs font-semibold px-3 py-1.5 rounded transition-colors ${
                    showPublicOnly
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {t.common.public}
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
    </>
  );
}
