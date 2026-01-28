'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { getConsentState, type ConsentState } from './CookieConsent';

export default function Analytics() {
  const GA_MEASUREMENT_ID = 'G-WW7LC8SFJ5';
  const [consent, setConsent] = useState<ConsentState>('pending');

  useEffect(() => {
    // Check initial consent state
    setConsent(getConsentState());

    // Listen for consent changes
    const handleConsentChange = (event: CustomEvent<ConsentState>) => {
      setConsent(event.detail);
    };

    window.addEventListener('cookie-consent-change', handleConsentChange as EventListener);

    return () => {
      window.removeEventListener('cookie-consent-change', handleConsentChange as EventListener);
    };
  }, []);

  // Only render Analytics scripts if user has accepted cookies
  if (consent !== 'accepted') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}
