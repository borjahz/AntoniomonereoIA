'use client';

import ArtworkCard from '@/components/ArtworkCard';
import Footer from '@/components/Footer';
import CategoryNavigation from '@/components/CategoryNavigation';
import worksData from '@/data/works.json';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CopiasPage() {
  const { showPublicOnly, t } = useLanguage();

  const copies = worksData
    .filter((work) => work.category === 'copias')
    .filter((work) => !showPublicOnly || work.public);

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 bg-white">
        <CategoryNavigation />

        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="lg:flex lg:flex-col lg:gap-6">
            <CategoryNavigation sticky />

            <div>
              <h1 className="text-3xl font-medium text-gray-900 mb-4 tracking-tight">{t.pages.copies}</h1>
              <p className="text-gray-700 leading-[1.8] mb-12">{t.pages.copiesDescription}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {copies.map((work) => (
                  <ArtworkCard key={work.id} work={work} />
                ))}
              </div>
              {copies.length === 0 && (
                <p className="text-gray-600 text-center py-12 leading-relaxed">No hay obras disponibles</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
