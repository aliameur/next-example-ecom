'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import * as gtag from '@/utils/gtag'; // Use alias for src/utils

interface GTagInitializerProps {
  isProduction: boolean;
  gaTrackingId: string | undefined;
}

export default function GTagInitializer({ isProduction, gaTrackingId }: GTagInitializerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isProduction && gaTrackingId) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      gtag.pageview(url);
    }
  }, [pathname, searchParams, isProduction, gaTrackingId]);

  return null;
}