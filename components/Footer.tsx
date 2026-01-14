'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Instagram } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto py-10 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-[13px] font-normal tracking-wide text-gray-600">
          © {new Date().getFullYear()} Antonio monereo
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:antoniomonelopez@gmail.com"
            className="text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/antoniomonereo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.tiktok.com/@antoniomonereo?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="TikTok"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
          <Link
            href="/contacto"
            className="text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
          >
            {t.nav.contact}
          </Link>
        </div>
      </div>
    </footer>
  );
}
