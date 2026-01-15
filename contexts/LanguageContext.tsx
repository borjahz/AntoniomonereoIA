'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

const translations = {
  es: {
    nav: {
      paintings: 'pinturas',
      drawings: 'dibujos',
      copies: 'copias',
      contact: 'contacto',
    },
    home: {
      title: 'Bienvenido',
      intro: 'Artista contemporáneo especializado en pintura y dibujo.',
      bio: 'Mi trabajo explora la intersección entre la forma y el color, buscando crear piezas que inviten a la reflexión.',
      instagram: 'Instagram',
      email: 'Email',
      contact: 'Contacto',
      featured: 'Obras destacadas',
    },
    common: {
      public: 'Público',
      publications: 'Publicaciones',
      search: 'Buscar',
      showAll: 'Ver todo',
    },
    contact: {
      title: 'Contacto',
      description: 'Ponte en contacto para consultas sobre obra disponible o encargos.',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      send: 'Enviar',
    },
    work: {
      back: 'Volver',
      year: 'Año',
      dimensions: 'Dimensiones',
      technique: 'Técnica',
      category: 'Categoría',
      status: 'Estado',
      available: 'Disponible',
      sold: 'Vendida',
      tags: 'Etiquetas',
      inquire: 'Consultar disponibilidad',
    },
    pages: {
      copies: 'Copias',
      copiesDescription: 'Estudios y reinterpretaciones de obras maestras',
    },
  },
  en: {
    nav: {
      paintings: 'paintings',
      drawings: 'drawings',
      copies: 'copies',
      contact: 'contact',
    },
    home: {
      title: 'Welcome',
      intro: 'Contemporary artist specializing in painting and drawing.',
      bio: 'My work explores the intersection between form and color, seeking to create pieces that invite reflection.',
      instagram: 'Instagram',
      email: 'Email',
      contact: 'Contact',
      featured: 'Featured works',
    },
    common: {
      public: 'Public',
      publications: 'Publications',
      search: 'Search',
      showAll: 'Show all',
    },
    contact: {
      title: 'Contact',
      description: 'Get in touch for inquiries about available work or commissions.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
    },
    work: {
      back: 'Back',
      year: 'Year',
      dimensions: 'Dimensions',
      technique: 'Technique',
      category: 'Category',
      status: 'Status',
      available: 'Available',
      sold: 'Sold',
      tags: 'Tags',
      inquire: 'Inquire about availability',
    },
    pages: {
      copies: 'Copies',
      copiesDescription: 'Studies and reinterpretations of masterpieces',
    },
  },
};

type Language = 'es' | 'en';
type Translations = typeof translations.es;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  showPublicOnly: boolean;
  setShowPublicOnly: (show: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [showPublicOnly, setShowPublicOnly] = useState(false);

  const value = {
    language,
    setLanguage,
    t: translations[language],
    showPublicOnly,
    setShowPublicOnly,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
