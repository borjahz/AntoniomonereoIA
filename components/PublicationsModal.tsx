'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PublicationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const publications = [
  {
    title_es: 'Exposición espacio MADOS',
    title_en: 'MADOS space Exhibition',
    url: 'https://espaciomados.com/portfolio/antonio-monereo-martinez-bueno-xavier-velazquez/',
  },
  {
    title_es: 'Entrevista Shangay',
    title_en: 'Shangay Interview',
    url: 'https://shangay.com/2025/02/27/antonio-monereo-generacion-selfi-encontrar-mi-sitio/#google_vignette',
  },
  {
    title_es: 'Entrevista Telemadrid',
    title_en: 'Telemadrid Interview',
    url: 'https://www.telemadrid.es/programas/telenoticias-fin-de-semana/Dos-siglos-de-copistas-en-el-Museo-del-Prado-2-2625057486--20231217032916.html',
  },
];

export default function PublicationsModal({ isOpen, onClose }: PublicationsModalProps) {
  const { language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-medium text-gray-900">
            {language === 'es' ? 'Publicaciones' : 'Publications'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <a
                key={index}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all"
              >
                <h3 className="text-base font-normal text-blue-600 underline decoration-1 underline-offset-2">
                  {language === 'es' ? pub.title_es : pub.title_en}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
