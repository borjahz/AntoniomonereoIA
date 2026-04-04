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
      title: 'About @antoniomonereo',
      intro: 'Antonio Monereo (Madrid, 2001) es un artista español que trabaja principalmente en pintura.',
      bio: 'Su práctica comenzó a partir del estudio y la copia de obras de los grandes maestros en el Museo del Prado, donde desarrolló una base técnica sólida. Su obra se centra en la figura humana y combina referencias clásicas con elementos surrealistas, mágicos y mitológicos. A través del color como herramienta principal, sus pinturas exploran el espacio entre la realidad y la imaginación.',
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
      sending: 'Enviando...',
      sent: 'Correo enviado. Muchas gracias, te responderé pronto.',
      sendAnother: 'Enviar otro mensaje',
      error: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.',
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
      title: 'About @antoniomonereo',
      intro: 'Antonio Monereo (Madrid, 2001) is a Spanish artist working mainly in painting.',
      bio: 'His practice began through the study and copying of Old Master paintings at the Museo del Prado, where he developed a strong technical foundation. His work focuses on the human figure and combines classical references with surreal, magical, and mythological elements. Using colour as a key visual tool, his paintings explore the space between reality and imagination.',
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
      sending: 'Sending...',
      sent: 'Message sent. Thank you, I will get back to you soon.',
      sendAnother: 'Send another message',
      error: 'Something went wrong. Please try again.',
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
