'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryNavigationProps {
  sticky?: boolean;
}

export default function CategoryNavigation({ sticky = false }: CategoryNavigationProps) {
  const { t } = useLanguage();
  const pathname = usePathname();

  const categories = [
    {
      name: t.nav.paintings,
      href: '/pinturas',
      label: 'pinturas'
    },
    {
      name: t.nav.drawings,
      href: '/dibujos',
      label: 'dibujos'
    },
    {
      name: t.nav.copies,
      href: '/copias',
      label: 'copias'
    },
  ];

  const isActive = (href: string) => pathname === href;

  if (sticky) {
    return (
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <nav className="flex flex-col gap-8">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group flex flex-col items-center gap-3 transition-all"
              >
                <div className="relative w-16 h-16 flex items-center justify-center transition-all group-hover:scale-[1.03] group-hover:opacity-75">
                  <img
                    src="/icons/aqua_folder-1_(arrastrado) copy.jpg"
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                  {isActive(category.href) && (
                    <div className="absolute -top-1 -right-1">
                      <Heart className="w-4 h-4 fill-blue-600 text-blue-600" />
                    </div>
                  )}
                </div>
                <span className={`text-[13px] font-normal tracking-wide text-center underline decoration-1 underline-offset-2 transition-colors ${
                  isActive(category.href)
                    ? 'text-blue-800'
                    : 'text-blue-600 group-hover:text-blue-800'
                }`}>
                  {category.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    );
  }

  return (
    <div className="bg-white py-10 lg:hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-center items-center gap-12">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group flex flex-col items-center gap-3 transition-all"
            >
              <div className="relative w-14 h-14 flex items-center justify-center transition-all group-hover:scale-[1.03] group-hover:opacity-80">
                <img
                  src="/icons/aqua_folder-1_(arrastrado) copy.jpg"
                  alt={category.name}
                  className="w-full h-full object-contain"
                />
                {isActive(category.href) && (
                  <div className="absolute -top-1 -right-1">
                    <Heart className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                  </div>
                )}
              </div>
              <span className={`text-[13px] font-normal tracking-wide underline decoration-1 underline-offset-2 transition-colors ${
                isActive(category.href)
                  ? 'text-blue-800'
                  : 'text-blue-600 group-hover:text-blue-800'
              }`}>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
