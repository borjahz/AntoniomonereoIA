'use client';

import ArtworkCard from '@/components/ArtworkCard';
import Footer from '@/components/Footer';
import worksData from '@/data/works.json';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DibujosPage() {
  const { showPublicOnly } = useLanguage();

  const drawings = worksData
    .filter((work) => work.category === 'dibujos')
    .filter((work) => !showPublicOnly || work.public);

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dibujos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drawings.map((work) => (
              <ArtworkCard key={work.id} work={work} />
            ))}
          </div>
          {drawings.length === 0 && (
            <p className="text-gray-500 text-center py-12">No hay obras disponibles</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
