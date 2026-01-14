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
      <aside className="hidden lg:block">
        <div className="sticky top-16">
          <nav className="flex flex-row gap-12">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group flex flex-col items-center gap-3 transition-all"
              >
                <div className="relative w-24 h-24 flex items-center justify-center transition-all group-hover:scale-[1.03] group-hover:opacity-75">
                  <img
                    src={isActive(category.href)
                      ? "/icons/aqua_favorites-removebg-preview copy.png"
                      : "/icons/aqua_folder-1_(arrastrado) copy.jpg"
                    }
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className={`text-[14px] font-normal tracking-wide text-center underline decoration-1 underline-offset-2 transition-colors ${
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
                  src={isActive(category.href)
                    ? "/icons/aqua_favorites-removebg-preview copy.png"
                    : "/icons/aqua_folder-1_(arrastrado) copy.jpg"
                  }
                  alt={category.name}
                  className="w-full h-full object-contain"
                />
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
