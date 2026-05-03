'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ViewTransitions() {
  const router = useRouter();

  useEffect(() => {
    if (!('startViewTransition' in document)) return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;
      if (anchor.target === '_blank') return;

      e.preventDefault();
      (document as Document & { startViewTransition: (cb: () => void) => void })
        .startViewTransition(() => {
          router.push(href);
        });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [router]);

  return null;
}
