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

  return {
    title: `${work.title_es} - Antonio Monereo`,
    description,
    openGraph: {
      title: `${work.title_es} - Antonio Monereo`,
      description,
      images: [
        {
          url: work.images[0],
          width: 1200,
          height: 900,
          alt: work.title_es,
        },
      ],
    },
  };
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  return <WorkPageClient slug={params.slug} />;
}
