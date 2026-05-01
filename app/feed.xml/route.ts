import { NextResponse } from 'next/server';
import worksData from '@/data/works.json';

export const revalidate = 86400;

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function GET() {
  const baseUrl = 'https://antoniomonereo.com';

  const works = [...worksData]
    .filter(w => w.public)
    .sort((a, b) => b.id - a.id);

  const items = works.map(work => {
    const title = escapeXml(work.title_es);
    const desc = escapeXml(`${work.technique_es}, ${work.dimensions}, ${work.year}.`);
    const url = `${baseUrl}/obra/${work.slug}`;
    const image = `${baseUrl}${work.images[0]}`;
    const pubDate = new Date(work.year, 11, 31).toUTCString();
    const ext = work.images[0].endsWith('.png') ? 'image/png' : 'image/jpeg';

    return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <description>${desc}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${url}</guid>
      <enclosure url="${image}" type="${ext}" length="0"/>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Antonio Monereo — Obras</title>
    <link>${baseUrl}</link>
    <description>Pintor contemporáneo. Óleo, grafito y copias de maestros clásicos.</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
