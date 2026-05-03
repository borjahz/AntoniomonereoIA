'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowLeft, Mail } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import ArtworkCard from '@/components/ArtworkCard';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArtworkSchema, BreadcrumbSchema } from '@/components/StructuredData';
import worksData from '@/data/works.json';

export default function WorkPageClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [swipeDelta, setSwipeDelta] = useState(0);
  const swipeTouchX = useRef<number | null>(null);

  const work = worksData.find((w) => w.slug === slug);

  if (!work) notFound();

  const categoryWorks = worksData
    .filter(w => w.category === work.category && w.public)
    .sort((a, b) => b.id - a.id);
  const currentIndex = categoryWorks.findIndex(w => w.slug === work.slug);
  const prevWork = currentIndex > 0 ? categoryWorks[currentIndex - 1] : null;
  const nextWork = currentIndex < categoryWorks.length - 1 ? categoryWorks[currentIndex + 1] : null;

  const relatedWorks = worksData
    .filter(w => w.slug !== work.slug && w.category === work.category && w.public)
    .sort((a, b) => {
      if (a.year === work.year && b.year !== work.year) return -1;
      if (b.year === work.year && a.year !== work.year) return 1;
      return b.id - a.id;
    })
    .slice(0, 4);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'ArrowLeft') goToPrevImage();
        if (e.key === 'ArrowRight') goToNextImage();
        if (e.key === 'Escape') setIsFullscreen(false);
      } else {
        if (e.key === 'ArrowLeft' && prevWork) router.push(`/obra/${prevWork.slug}`);
        if (e.key === 'ArrowRight' && nextWork) router.push(`/obra/${nextWork.slug}`);
        if (e.key === 'Escape') setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [work.images.length, isFullscreen, prevWork, nextWork, router]);

  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const seconds = Math.round((Date.now() - startTime) / 1000);
      if (seconds >= 5) {
        (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'time_on_artwork', {
          obra: title,
          segundos: seconds,
        });
      }
    };
  }, [title]);

  useEffect(() => {
    const reached = new Set<number>();
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((window.scrollY / docHeight) * 100);
      for (const milestone of [25, 50, 75, 100]) {
        if (pct >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'scroll_depth', {
            obra: title,
            profundidad: milestone,
          });
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [title]);

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

      <div
        className="bg-white min-h-screen"
        style={{ transform: `translateX(${swipeDelta}px)`, transition: swipeDelta === 0 ? 'transform 0.3s ease' : 'none' }}
        onTouchStart={e => { swipeTouchX.current = e.touches[0].clientX; }}
        onTouchMove={e => {
          if (swipeTouchX.current === null) return;
          const delta = e.touches[0].clientX - swipeTouchX.current;
          if (Math.abs(delta) > 10) setSwipeDelta(delta * 0.3);
        }}
        onTouchEnd={() => {
          if (swipeDelta < -60 && nextWork) router.push(`/obra/${nextWork.slug}`);
          else if (swipeDelta > 60 && prevWork) router.push(`/obra/${prevWork.slug}`);
          setSwipeDelta(0);
          swipeTouchX.current = null;
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-4 pb-16 lg:pt-2">
        <nav className="flex items-center gap-2 text-[13px] text-gray-400 mb-6 sm:mb-8 lg:mb-10">
          <Link href="/" className="hover:text-gray-700 transition-colors">Inicio</Link>
          <span>&gt;</span>
          <Link href={`/${work.category}`} className="hover:text-gray-700 transition-colors capitalize">{work.category}</Link>
          <span>&gt;</span>
          <span className="text-gray-700">{title}</span>
        </nav>

        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors mb-6 sm:mb-8 lg:mb-10"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.work.back}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div className="relative">
            <div className="aspect-[4/3] sm:aspect-[4/3] bg-gray-50 flex items-center justify-center p-2 sm:p-4 relative group cursor-pointer" onClick={() => setIsFullscreen(true)}>
              <Image
                src={work.images[currentImageIndex]}
                alt={title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={currentImageIndex === 0}
              />

              {work.images.length > 1 && (
                <>
                  <button
                    type="button"
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
                    type="button"
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
                        type="button"
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
                    type="button"
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Ver imagen ${index + 1}`}
                    className={`aspect-square bg-gray-50 flex items-center justify-center p-1 sm:p-2 transition-all ${
                      index === currentImageIndex
                        ? 'ring-2 ring-blue-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt={`${title} thumbnail ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="10vw"
                    />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 mb-3 sm:mb-4 tracking-tight leading-[1.3]">{title}</h1>
{description && <p className="text-sm sm:text-base text-gray-800 leading-[1.8]">{description}</p>}
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

            <div className="flex items-center gap-6">
              {work.status === 'available' ? (
                <Link
                  href={`/contacto?obra=${encodeURIComponent(title)}`}
                  onClick={() => (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'contact_click', { obra: title, tipo: 'consulta' })}
                  className="inline-flex items-center gap-2 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>{t.work.inquire}</span>
                </Link>
              ) : (
                <Link
                  href={`/contacto?obra=${encodeURIComponent(title)}&tipo=encargo`}
                  onClick={() => (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'contact_click', { obra: title, tipo: 'encargo' })}
                  className="inline-flex items-center gap-2 text-[13px] font-normal tracking-wide text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>{language === 'es' ? 'Obra vendida · ¿Encargo similar?' : 'Sold · Commission a similar work?'}</span>
                </Link>
              )}

              <ShareButton title={title} />
            </div>
          </div>
        </div>
      </div>

      {relatedWorks.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-16 border-t border-gray-100 pt-12">
          <h2 className="text-lg font-medium text-gray-900 mb-8 tracking-tight">
            {language === 'es' ? 'Más obras' : 'More works'}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedWorks.map(relatedWork => (
              <ArtworkCard key={relatedWork.slug} work={relatedWork} />
            ))}
          </div>
        </div>
      )}

      {(prevWork || nextWork) && (
        <div className="border-t border-gray-100 bg-white pb-20 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-stretch divide-x divide-gray-100">
              {prevWork ? (
                <Link
                  href={`/obra/${prevWork.slug}`}
                  className="group flex items-center gap-4 py-5 pr-8 flex-1 hover:bg-gray-50 transition-colors px-4 -mx-4"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-gray-900 flex-shrink-0 transition-colors" />
                  <div className="relative w-14 h-14 bg-gray-100 flex-shrink-0 overflow-hidden">
                    <Image src={prevWork.images[0]} alt={prevWork.title_es} fill className="object-contain" sizes="56px" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-gray-400 tracking-wide uppercase mb-0.5">{language === 'es' ? 'Anterior' : 'Previous'}</p>
                    <p className="text-[13px] text-gray-900 truncate group-hover:text-blue-600 transition-colors">{language === 'es' ? prevWork.title_es : prevWork.title_en}</p>
                  </div>
                </Link>
              ) : <div className="flex-1" />}

              {nextWork ? (
                <Link
                  href={`/obra/${nextWork.slug}`}
                  className="group flex items-center gap-4 py-5 pl-8 flex-1 justify-end hover:bg-gray-50 transition-colors px-4 -mx-4"
                >
                  <div className="min-w-0 text-right">
                    <p className="text-[11px] text-gray-400 tracking-wide uppercase mb-0.5">{language === 'es' ? 'Siguiente' : 'Next'}</p>
                    <p className="text-[13px] text-gray-900 truncate group-hover:text-blue-600 transition-colors">{language === 'es' ? nextWork.title_es : nextWork.title_en}</p>
                  </div>
                  <div className="relative w-14 h-14 bg-gray-100 flex-shrink-0 overflow-hidden">
                    <Image src={nextWork.images[0]} alt={nextWork.title_es} fill className="object-contain" sizes="56px" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 flex-shrink-0 transition-colors" />
                </Link>
              ) : <div className="flex-1" />}
            </div>
          </div>
        </div>
      )}

      {isFullscreen && (
        <div
          className="fixed inset-0 bg-white z-50 flex items-center justify-center cursor-pointer"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={work.images[currentImageIndex]}
            alt={title}
            className="max-w-[95vw] max-h-[95vh] object-contain"
          />
          {work.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {work.images.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-gray-800 w-8'
                        : 'bg-gray-300 hover:bg-gray-400 w-2'
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
