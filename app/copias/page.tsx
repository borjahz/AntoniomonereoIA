'use client';

import ArtworkCard from '@/components/ArtworkCard';
import Footer from '@/components/Footer';
import worksData from '@/data/works.json';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CopiasPage() {
  const { showPublicOnly } = useLanguage();

  const copies = worksData
    .filter((work) => work.category === 'copias')
    .filter((work) => !showPublicOnly || work.public);

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Copias</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {copies.map((work) => (
              <ArtworkCard key={work.id} work={work} />
            ))}
          </div>
          {copies.length === 0 && (
            <p className="text-gray-500 text-center py-12">No hay obras disponibles</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
