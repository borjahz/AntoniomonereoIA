'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
      className="text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
    >
      {language === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
