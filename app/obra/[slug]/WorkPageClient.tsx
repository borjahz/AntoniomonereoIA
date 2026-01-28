'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArtworkSchema, BreadcrumbSchema } from '@/components/StructuredData';
import worksData from '@/data/works.json';

export default function WorkPageClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const work = worksData.find((w) => w.slug === slug);

  if (!work) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-gray-900 mb-4 tracking-tight">Obra no encontrada</h1>
            <Link href="/" className="text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800">
              Volver
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const title = language === 'es' ? work.title_es : work.title_en;
  const description = language === 'es' ? work.desc_es : work.desc_en;
  const technique = language === 'es' ? work.technique_es : work.technique_en;

  // Parse dimensions for schema
  const [width, height] = work.dimensions.split('x').map(d => d.trim());

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + work.images.length) % work.images.length);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % work.images.length);
  };

  return (
    <>
      <ArtworkSchema
        name={title}
        description={description}
        image={`https://antoniomonereo.com${work.images[0]}`}
        url={`https://antoniomonereo.com/obra/${work.slug}`}
        creator="Antonio Monereo"
        dateCreated={work.year}
        artMedium={technique}
        artform={work.category === 'pinturas' ? 'Painting' : work.category === 'dibujos' ? 'Drawing' : 'Painting'}
        width={width}
        height={height}
        inLanguage={language === 'es' ? 'es' : 'en'}
        isAvailable={work.status === 'available'}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: 'https://antoniomonereo.com' },
          { name: work.category.charAt(0).toUpperCase() + work.category.slice(1), url: `https://antoniomonereo.com/${work.category}` },
          { name: title, url: `https://antoniomonereo.com/obra/${work.slug}` },
        ]}
      />

      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-4 pb-16 lg:pt-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors mb-6 sm:mb-8 lg:mb-10"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.work.back}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div className="relative">
            <div className="aspect-[4/3] sm:aspect-[4/3] bg-gray-50 flex items-center justify-center p-2 sm:p-4 relative group cursor-pointer" onClick={() => setIsFullscreen(true)}>
              <img
                src={work.images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              {work.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevImage();
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white shadow-md hover:shadow-lg transition-all opacity-70 sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextImage();
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white shadow-md hover:shadow-lg transition-all opacity-70 sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
                  </button>

                  <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                    {work.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`h-1.5 sm:h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-blue-600 w-4 sm:w-6'
                            : 'bg-white/50 hover:bg-white/75 w-1.5 sm:w-2'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {work.images.length > 1 && (
              <div className="mt-3 sm:mt-4 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-1.5 sm:gap-2">
                {work.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-gray-50 flex items-center justify-center p-1 sm:p-2 transition-all ${
                      index === currentImageIndex
                        ? 'ring-2 ring-blue-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${title} thumbnail ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 mb-3 sm:mb-4 tracking-tight leading-[1.3]">{title}</h1>
              <p className="text-sm sm:text-base text-gray-800 leading-[1.8]">{description}</p>
            </div>

            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
              <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">Ficha Técnica</h2>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-[12px] sm:text-[13px] font-normal tracking-wide text-gray-600 mb-1">{t.work.year}</p>
                  <p className="text-sm sm:text-base text-gray-900">{work.year}</p>
                </div>

                <div>
                  <p className="text-[12px] sm:text-[13px] font-normal tracking-wide text-gray-600 mb-1">{t.work.dimensions}</p>
                  <p className="text-sm sm:text-base text-gray-900">{work.dimensions}</p>
                </div>
              </div>

              <div>
                <p className="text-[12px] sm:text-[13px] font-normal tracking-wide text-gray-600 mb-1">{t.work.technique}</p>
                <p className="text-sm sm:text-base text-gray-900">{technique}</p>
              </div>

              <div>
                <p className="text-[12px] sm:text-[13px] font-normal tracking-wide text-gray-600 mb-1">{t.work.category}</p>
                <p className="text-sm sm:text-base text-gray-900 capitalize">{work.category}</p>
              </div>

              <div>
                <p className="text-[12px] sm:text-[13px] font-normal tracking-wide text-gray-600 mb-1">{t.work.status}</p>
                <span
                  className={`inline-flex items-center px-2 sm:px-3 py-1 text-[12px] sm:text-[13px] font-normal ${
                    work.status === 'available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {work.status === 'available' ? t.work.available : t.work.sold}
                </span>
              </div>

              {work.tags.length > 0 && (
                <div>
                  <p className="text-[12px] sm:text-[13px] font-normal tracking-wide text-gray-600 mb-2">{t.work.tags}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {work.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 text-[11px] sm:text-[13px] font-normal"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>{t.work.inquire}</span>
            </Link>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center cursor-pointer"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={work.images[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="max-w-[95vw] max-h-[95vh] object-contain"
          />
          {work.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {work.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white w-8'
                        : 'bg-white/40 hover:bg-white/60 w-2'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      </div>
    </>
  );
}
