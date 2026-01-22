'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
      <aside className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-30">
        <nav className="flex flex-col gap-6">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group flex flex-col items-center gap-2 transition-all"
            >
              <div className="relative w-32 h-32 flex items-center justify-center transition-all group-hover:scale-105">
                <img
                  src={isActive(category.href)
                    ? "/icons/aqua_favorites-removebg-preview copy.png"
                    : "/icons/aqua_folder-1_(arrastrado) copy.jpg"
                  }
                  alt={category.name}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <span className={`text-sm font-medium tracking-wide text-center transition-colors ${
                isActive(category.href)
                  ? 'text-gray-900'
                  : 'text-gray-600 group-hover:text-gray-900'
              }`}>
                {category.name}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
    );
  }

  return (
    <div className="bg-white py-8 lg:hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-center items-center gap-10">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group flex flex-col items-center gap-2 transition-all"
            >
              <div className="relative w-20 h-20 flex items-center justify-center transition-all group-hover:scale-105">
                <img
                  src={isActive(category.href)
                    ? "/icons/aqua_favorites-removebg-preview copy.png"
                    : "/icons/aqua_folder-1_(arrastrado) copy.jpg"
                  }
                  alt={category.name}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              <span className={`text-sm font-medium tracking-wide transition-colors ${
                isActive(category.href)
                  ? 'text-gray-900'
                  : 'text-gray-600 group-hover:text-gray-900'
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
