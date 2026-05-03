'use client';

import { useEffect } from 'react';

type Metric = { name: string; value: number; rating: string };

export default function WebVitals() {
  useEffect(() => {
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      const send = (metric: Metric) => {
        (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_rating: metric.rating,
          non_interaction: true,
        });
      };
      onCLS(send);
      onFCP(send);
      onLCP(send);
      onTTFB(send);
      onINP(send);
    });
  }, []);

  return null;
}
