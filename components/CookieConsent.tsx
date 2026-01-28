'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const CONSENT_KEY = 'cookie-consent';

export type ConsentState = 'pending' | 'accepted' | 'rejected';

export function getConsentState(): ConsentState {
  if (typeof window === 'undefined') return 'pending';
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'accepted') return 'accepted';
  if (stored === 'rejected') return 'rejected';
  return 'pending';
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const consent = getConsentState();
    if (consent === 'pending') {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setShowBanner(false);
    // Dispatch event so Analytics component can react
    window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: 'accepted' }));
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setShowBanner(false);
    window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: 'rejected' }));
  };

  if (!showBanner) return null;

  const texts = {
    es: {
      title: 'Cookies y privacidad',
      description: 'Utilizamos cookies de análisis (Google Analytics) para mejorar tu experiencia y entender cómo usas nuestro sitio. Estas cookies recopilan información de forma anónima.',
      accept: 'Aceptar',
      reject: 'Rechazar',
      moreInfo: 'Más información'
    },
    en: {
      title: 'Cookies and privacy',
      description: 'We use analytics cookies (Google Analytics) to improve your experience and understand how you use our site. These cookies collect information anonymously.',
      accept: 'Accept',
      reject: 'Reject',
      moreInfo: 'More information'
    }
  };

  const t = texts[language] || texts.es;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{t.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.description}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              {t.reject}
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
