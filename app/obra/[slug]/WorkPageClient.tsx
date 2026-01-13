'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import worksData from '@/data/works.json';

export default function WorkPageClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const work = worksData.find((w) => w.slug === slug);

  if (!work) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Obra no encontrada</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
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

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + work.images.length) % work.images.length);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % work.images.length);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.work.back}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center p-4 relative group">
              <img
                src={work.images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              {work.images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-900" />
                  </button>

                  <button
                    onClick={goToNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-900" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {work.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-blue-600 w-6'
                            : 'bg-white/50 hover:bg-white/75 w-2'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {work.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {work.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-slate-100 flex items-center justify-center p-2 transition-all ${
                      index === currentImageIndex
                        ? 'ring-2 ring-blue-600'
                        : 'hover:bg-slate-200'
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

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
            </div>

            <div className="bg-gray-50 p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ficha Técnica</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.work.year}</p>
                  <p className="text-base font-semibold text-gray-900">{work.year}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.work.dimensions}</p>
                  <p className="text-base font-semibold text-gray-900">{work.dimensions}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">{t.work.technique}</p>
                <p className="text-base font-semibold text-gray-900">{technique}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">{t.work.category}</p>
                <p className="text-base font-semibold text-gray-900 capitalize">{work.category}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">{t.work.status}</p>
                <span
                  className={`inline-flex items-center px-3 py-1 text-sm font-semibold ${
                    work.status === 'available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {work.status === 'available' ? t.work.available : t.work.sold}
                </span>
              </div>

              {work.tags.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">{t.work.tags}</p>
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-sm"
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
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>{t.work.inquire}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
