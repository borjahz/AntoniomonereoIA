import { NextResponse } from 'next/server';
import worksData from '@/data/works.json';

export const revalidate = 86400;

export async function GET() {
  const baseUrl = 'https://antoniomonereo.com';

  const items = [...worksData]
    .filter(w => w.public)
    .sort((a, b) => b.id - a.id)
    .slice(0, 20)
    .map(work => ({
      id: `${baseUrl}/obra/${work.slug}`,
      url: `${baseUrl}/obra/${work.slug}`,
      title: work.title_es,
      summary: work.desc_es || `${work.technique_es}, ${work.dimensions}, ${work.year}`,
      image: `${baseUrl}${work.images[0]}`,
      date_published: `${work.year}-01-01T00:00:00Z`,
      tags: work.tags,
    }));

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Antonio Monereo — Obras',
    home_page_url: baseUrl,
    feed_url: `${baseUrl}/feed.json`,
    description: 'Últimas obras de Antonio Monereo, pintor español contemporáneo.',
    icon: `${baseUrl}/favicon.jpg`,
    authors: [{ name: 'Antonio Monereo', url: baseUrl }],
    language: 'es',
    items,
  };

  return NextResponse.json(feed, {
    headers: { 'Content-Type': 'application/feed+json' },
  });
}
