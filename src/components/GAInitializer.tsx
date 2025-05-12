'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '@/utils/gtag'; // Assuming gtag is at src/utils/gtag or root utils/gtag.ts/js

const isProduction = process.env.NODE_ENV === 'production';

const GAInitializer = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (isProduction) {
      gtag.pageview(pathname);
    }
  }, [pathname]);

  return children;
};

export default GAInitializer;