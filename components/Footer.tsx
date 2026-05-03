'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Instagram } from 'lucide-react';
import TikTokIcon from '@/components/TikTokIcon';

const trackOutbound = (destination: string) =>
  (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'outbound_click', { destination });

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto py-4 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 lg:ml-36 xl:ml-40 2xl:ml-44 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[13px] font-normal tracking-wide text-gray-600">
          © {new Date().getFullYear()} Antonio Monereo
        </p>
        <div className="flex items-center gap-4">
          <a
            href="mailto:antoniomonelopez@gmail.com"
            onClick={() => trackOutbound('email')}
            className="text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/antoniomonereo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutbound('instagram')}
            className="text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.tiktok.com/@antoniomonereo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutbound('tiktok')}
            className="text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="TikTok"
          >
            <TikTokIcon className="w-5 h-5" />
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
