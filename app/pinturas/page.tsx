'use client';

import ArtworkCard from '@/components/ArtworkCard';
import Footer from '@/components/Footer';
import CategoryNavigation from '@/components/CategoryNavigation';
import FadeInView from '@/components/FadeInView';
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
        <CategoryNavigation />

        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="lg:flex lg:flex-col lg:gap-6">
            <CategoryNavigation sticky />

            <div>
              <FadeInView>
                <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-16 tracking-tight">Pinturas</h1>
              </FadeInView>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paintings.map((work, index) => (
                  <FadeInView key={work.id} delay={index * 50}>
                    <ArtworkCard work={work} />
                  </FadeInView>
                ))}
              </div>
              {paintings.length === 0 && (
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
