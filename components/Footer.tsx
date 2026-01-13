'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto py-10 bg-white">
      <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-normal text-gray-600">
          © {new Date().getFullYear()} antonio monereo
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/contacto"
            className="text-sm font-normal text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
          >
            {t.nav.contact}
          </Link>
        </div>
      </div>
    </footer>
  );
}
