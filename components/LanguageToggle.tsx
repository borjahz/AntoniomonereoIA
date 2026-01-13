'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
      className="text-xs font-semibold px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded transition-colors"
    >
      {language === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
