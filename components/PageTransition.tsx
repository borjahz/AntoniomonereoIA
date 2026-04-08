'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setVisible(false);
      const t = setTimeout(() => {
        prevPathname.current = pathname;
        setVisible(true);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <div className={visible ? 'page-visible' : 'page-hidden'}>
      {children}
    </div>
  );
}
