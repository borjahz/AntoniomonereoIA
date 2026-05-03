'use client';

import ArtworkCard from '@/components/ArtworkCard';
import Footer from '@/components/Footer';
import CategoryNavigation from '@/components/CategoryNavigation';
import FadeInView from '@/components/FadeInView';
import { CollectionPageSchema } from '@/components/StructuredData';
import worksData from '@/data/works.json';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CopiasPage() {
  const { showPublicOnly } = useLanguage();

  const copies = worksData
    .filter((work) => work.category === 'copias')
    .filter((work) => !showPublicOnly || work.public);

  return (
    <>
      <CollectionPageSchema
        name="Copias de maestros — Antonio Monereo"
        description="Copias de maestros clásicos realizadas por Antonio Monereo en el Museo del Prado. Velázquez, Tiziano y Zurbarán."
        url="https://antoniomonereo.com/copias"
        works={copies.map(w => ({ title: w.title_es, image: w.images[0], slug: w.slug }))}
      />
    <div className="flex flex-col min-h-full">
      <div className="flex-1 bg-white">
        <CategoryNavigation />

        <div className="lg:ml-48 max-w-6xl mx-auto px-8 pt-6 pb-24 lg:pt-8 lg:pb-8">
          <CategoryNavigation sticky />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {copies.map((work, index) => (
              <FadeInView key={work.id} delay={index * 50}>
                <ArtworkCard work={work} priority={index < 3} />
              </FadeInView>
            ))}
          </div>
          {copies.length === 0 && (
            <p className="text-gray-600 text-center py-12 leading-relaxed">No hay obras disponibles</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}
