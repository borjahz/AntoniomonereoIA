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

  // Versión desktop: sidebar fijo a la izquierda
  if (sticky) {
    return (
      <>
        {/* Desktop: sidebar izquierdo */}
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
                    className="w-full h-full object-contain"
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

        {/* Móvil: barra inferior fija */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
          <div className="flex justify-center items-end gap-0">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="flex flex-col items-center"
              >
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <img
                    src={isActive(category.href)
                      ? "/icons/aqua_favorites-removebg-preview copy.png"
                      : "/icons/aqua_folder-1_(arrastrado) copy.jpg"
                    }
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className={`text-[11px] font-medium -mt-3 mb-2 transition-colors ${
                  isActive(category.href)
                    ? 'text-gray-900'
                    : 'text-gray-500'
                }`}>
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </>
    );
  }

  // Versión no-sticky: no mostrar nada (la barra inferior ya está en sticky)
  return null;
}
