'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import SearchModal from './SearchModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { t, showPublicOnly, setShowPublicOnly } = useLanguage();

  const navLinks = [
    { href: '/pinturas', label: t.nav.paintings },
    { href: '/dibujos', label: t.nav.drawings },
    { href: '/copias', label: t.nav.copies },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="hover:opacity-70 transition-opacity">
              <span className="text-lg font-medium text-gray-900">antonio monereo</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[15px] font-normal text-blue-600 hover:text-blue-700 transition-colors ${
                    isActive(link.href)
                      ? 'underline underline-offset-4'
                      : 'no-underline'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
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
          <div className="md:hidden bg-white border-t border-gray-100">
            <nav className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-[15px] font-normal py-2 text-blue-600 hover:text-blue-700 transition-colors ${
                    isActive(link.href)
                      ? 'underline underline-offset-4'
                      : 'no-underline'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contacto"
                onClick={() => setIsMenuOpen(false)}
                className="block text-[15px] font-normal py-2 text-blue-600 hover:text-blue-700 transition-colors"
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
