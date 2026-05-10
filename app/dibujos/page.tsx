'use client';

import ArtworkCard from '@/components/ArtworkCard';
import CategoryNavigation from '@/components/CategoryNavigation';
import FadeInView from '@/components/FadeInView';
import { CollectionPageSchema } from '@/components/StructuredData';
import worksData from '@/data/works.json';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DibujosPage() {
  const { showPublicOnly } = useLanguage();

  const drawings = worksData
    .filter((work) => work.category === 'dibujos')
    .filter((work) => !showPublicOnly || work.public);

  return (
    <>
      <CollectionPageSchema
        name="Dibujos — Antonio Monereo"
        description="Galería de dibujos de Antonio Monereo. Obras en grafito que exploran la figura humana y el estudio del natural."
        url="https://antoniomonereo.com/dibujos"
        works={drawings.map(w => ({ title: w.title_es, image: w.images[0], slug: w.slug }))}
      />
    <div className="bg-white">
      <CategoryNavigation />

      <div className="lg:ml-48 max-w-6xl mx-auto px-8 pt-6 pb-24 lg:pt-8 lg:pb-8">
        <CategoryNavigation sticky />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drawings.map((work, index) => (
            <FadeInView key={work.id} delay={index * 50}>
              <ArtworkCard work={work} priority={index < 3} />
            </FadeInView>
          ))}
        </div>
        {drawings.length === 0 && (
          <p className="text-gray-600 text-center py-12 leading-relaxed">No hay obras disponibles</p>
        )}
      </div>
    </div>
    </>
  );
}
