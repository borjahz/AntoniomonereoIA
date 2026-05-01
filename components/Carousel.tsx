'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface Work {
  id: number;
  slug: string;
  title_es: string;
  title_en: string;
  images: string[];
}

interface CarouselProps {
  works: Work[];
}

export default function Carousel({ works }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);
  const { language } = useLanguage();

  const featuredWorks = [...works].sort((a, b) => b.id - a.id).slice(0, 6);

  useEffect(() => {
    if (featuredWorks.length === 0 || paused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredWorks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredWorks.length, paused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredWorks.length) % featuredWorks.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredWorks.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    if (Math.abs(touchEndX.current - touchStartX.current) > 10) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) goToNext();
    else if (diff < -50) goToPrevious();
  };

  if (featuredWorks.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100">
        <p className="text-gray-500">No featured works available</p>
      </div>
    );
  }

  const currentWork = featuredWorks[currentIndex];
  const title = language === 'es' ? currentWork.title_es : currentWork.title_en;

  return (
    <div className="relative w-full h-full group">
      <div
        className="relative w-full h-full bg-gray-50 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => { setPaused(true); handleTouchEnd(); }}
      >
        <Link
          href={`/obra/${currentWork.slug}`}
          className="block w-full h-full relative"
          onClick={(e) => { if (isSwiping.current) e.preventDefault(); }}
        >
          <Image
            src={currentWork.images[0]}
            alt={title}
            fill
            className="object-contain cursor-pointer"
            sizes="100vw"
            priority
          />
        </Link>
      </div>

      <button
        type="button"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100 md:opacity-100"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 text-gray-900" />
      </button>

      <button
        type="button"
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100 md:opacity-100"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 text-gray-900" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredWorks.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-blue-600 w-6'
                : 'bg-white/50 hover:bg-white/75 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
