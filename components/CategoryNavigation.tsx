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
        {/* Desktop: sidebar izquierdo - ocupa todo el lateral */}
        <aside className="hidden lg:block fixed left-2 xl:left-4 2xl:left-6 top-20 bottom-12 z-30">
          <nav className="flex flex-col justify-evenly h-full">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group flex flex-col items-center gap-1 transition-all"
              >
                <div className="relative w-28 h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 flex items-center justify-center transition-all group-hover:scale-105">
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

        {/* Móvil: no hay barra superior, la navegación está en la barra inferior */}
      </>
    );
  }

  // Versión no-sticky: no mostrar nada (la barra inferior ya está en sticky)
  return null;
}
