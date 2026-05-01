import WorkPageClient from './WorkPageClient';
import worksData from '@/data/works.json';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return worksData.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const work = worksData.find((w) => w.slug === params.slug);

  if (!work) {
    return {
      title: 'Obra no encontrada - Antonio Monereo',
    };
  }

  const autoDesc = `${work.technique_es}, ${work.dimensions}, ${work.year}. Obra de Antonio Monereo.`;
  const description = work.desc_es || autoDesc;

  const baseUrl = 'https://antoniomonereo.com';
  const canonicalUrl = `${baseUrl}/obra/${work.slug}`;

  return {
    title: `${work.title_es} - Antonio Monereo`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: work.status !== 'sold',
      follow: true,
    },
    openGraph: {
      title: `${work.title_es} - Antonio Monereo`,
      description,
      url: `${baseUrl}/obra/${work.slug}`,
      siteName: 'Antonio Monereo',
      images: [
        {
          url: `${baseUrl}${work.images[0]}`,
          width: 1200,
          height: 900,
          alt: work.title_es,
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${work.title_es} - Antonio Monereo`,
      description,
      images: [`${baseUrl}${work.images[0]}`],
    },
  };
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  return <WorkPageClient slug={params.slug} />;
}
