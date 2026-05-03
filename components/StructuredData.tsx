'use client';

import Script from 'next/script';

interface ArtistSchemaProps {
  name: string;
  url: string;
  description: string;
  image?: string;
  sameAs?: string[];
}

interface ArtworkSchemaProps {
  name: string;
  description: string;
  image: string;
  url: string;
  creator: string;
  dateCreated: number;
  artMedium: string;
  artform: string;
  width: string;
  height: string;
  inLanguage: string;
  isAvailable: boolean;
}

export function ArtistSchema({
  name,
  url,
  description,
  image,
  sameAs = [],
}: ArtistSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': url,
    name,
    url,
    description,
    image,
    jobTitle: 'Artista Visual',
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Pintor',
      occupationLocation: {
        '@type': 'Country',
        name: 'España',
      },
    },
    knowsAbout: [
      'Pintura al óleo',
      'Dibujo',
      'Arte figurativo',
      'Copias de maestros clásicos',
    ],
    sameAs,
  };

  return (
    <Script
      id="artist-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArtworkSchema({
  name,
  description,
  image,
  url,
  creator,
  dateCreated,
  artMedium,
  artform,
  width,
  height,
  inLanguage,
  isAvailable,
}: ArtworkSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name,
    description,
    image: {
      '@type': 'ImageObject',
      url: image,
      width,
      height,
    },
    url,
    creator: {
      '@type': 'Person',
      name: creator,
    },
    dateCreated,
    artMedium,
    artform,
    inLanguage,
    offers: {
      '@type': 'Offer',
      availability: isAvailable
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      url,
      seller: {
        '@type': 'Person',
        name: 'Antonio Monereo',
        url: 'https://antoniomonereo.com',
      },
      priceSpecification: isAvailable ? {
        '@type': 'PriceSpecification',
        priceCurrency: 'EUR',
        description: 'Precio a consultar',
      } : undefined,
    },
  };

  return (
    <Script
      id="artwork-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Antonio Monereo',
    url: 'https://antoniomonereo.com',
    description: 'Portfolio artístico de Antonio Monereo. Pintor y dibujante contemporáneo.',
    author: {
      '@type': 'Person',
      name: 'Antonio Monereo',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://antoniomonereo.com/pinturas?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Antonio Monereo',
    url: 'https://antoniomonereo.com',
    logo: 'https://antoniomonereo.com/images/muerte-en-tarifa-antonio-monereo.jpg',
    description:
      'Portfolio artístico de Antonio Monereo. Pintor y dibujante contemporáneo.',
    foundingDate: '2023',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'antoniomonelopez@gmail.com',
      contactType: 'Customer Service',
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [
      'https://www.instagram.com/antoniomonereo',
      'https://www.tiktok.com/@antoniomonereo',
    ],
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface CollectionPageSchemaProps {
  name: string;
  description: string;
  url: string;
  works: { title: string; image: string; slug: string }[];
}

export function CollectionPageSchema({ name, description, url, works }: CollectionPageSchemaProps) {
  const baseUrl = 'https://antoniomonereo.com';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    author: {
      '@type': 'Person',
      name: 'Antonio Monereo',
    },
    hasPart: works.slice(0, 10).map(w => ({
      '@type': 'VisualArtwork',
      name: w.title,
      image: `${baseUrl}${w.image}`,
      url: `${baseUrl}/obra/${w.slug}`,
      creator: { '@type': 'Person', name: 'Antonio Monereo' },
    })),
  };

  return (
    <Script
      id="collection-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
