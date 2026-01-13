'use client';

import ArtworkCard from '@/components/ArtworkCard';
import Footer from '@/components/Footer';
import worksData from '@/data/works.json';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PinturasPage() {
  const { showPublicOnly } = useLanguage();

  const paintings = worksData
    .filter((work) => work.category === 'pinturas')
    .filter((work) => !showPublicOnly || work.public);

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <h1 className="text-3xl font-normal text-gray-900 mb-10">Pinturas</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paintings.map((work) => (
              <ArtworkCard key={work.id} work={work} />
            ))}
          </div>
          {paintings.length === 0 && (
            <p className="text-base font-normal text-gray-600 text-center py-12">No hay obras disponibles</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
