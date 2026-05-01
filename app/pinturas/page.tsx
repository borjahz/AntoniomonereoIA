'use client';

import ArtworkCard from '@/components/ArtworkCard';
import Footer from '@/components/Footer';
import CategoryNavigation from '@/components/CategoryNavigation';
import FadeInView from '@/components/FadeInView';
import { CollectionPageSchema } from '@/components/StructuredData';
import worksData from '@/data/works.json';
import { useLanguage } from '@/contexts/LanguageContext';

// IDs con orden manual para las obras "clásicas". Las nuevas (id >= 28) van primero por ID desc.
const MANUAL_ORDER = [3, 1, 2, 7, 16, 8, 13, 9, 20, 23, 26, 24, 25, 17, 18];

export default function PinturasPage() {
  const { showPublicOnly } = useLanguage();

  const paintings = worksData
    .filter((work) => work.category === 'pinturas')
    .filter((work) => !showPublicOnly || work.public)
    .sort((a, b) => {
      const isNewA = a.id >= 28;
      const isNewB = b.id >= 28;
      if (isNewA && isNewB) return b.id - a.id;
      if (isNewA) return -1;
      if (isNewB) return 1;
      const posA = MANUAL_ORDER.indexOf(a.id);
      const posB = MANUAL_ORDER.indexOf(b.id);
      return (posA === -1 ? 999 : posA) - (posB === -1 ? 999 : posB);
    });

  return (
    <>
      <CollectionPageSchema
        name="Pinturas — Antonio Monereo"
        description="Galería de pinturas de Antonio Monereo. Óleos sobre lienzo con referencias clásicas, figurativas y mitológicas."
        url="https://antoniomonereo.com/pinturas"
        works={paintings.map(w => ({ title: w.title_es, image: w.images[0], slug: w.slug }))}
      />
    <div className="flex flex-col min-h-full">
      <div className="flex-1 bg-white">
        <CategoryNavigation />

        <div className="lg:ml-48 max-w-6xl mx-auto px-8 pt-6 pb-24 lg:pt-8 lg:pb-8">
          <CategoryNavigation sticky />

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
      <Footer />
    </div>
    </>
  );
}
