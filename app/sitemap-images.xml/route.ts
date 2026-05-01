import { NextResponse } from 'next/server';
import worksData from '@/data/works.json';

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = 'https://antoniomonereo.com';

  const urls = worksData
    .filter(w => w.public)
    .map(work => {
      const title = escapeXml(work.title_es);
      const caption = escapeXml(`${work.technique_es}, ${work.dimensions}, ${work.year}. Obra de Antonio Monereo.`);

      const images = work.images.map(img => `
    <image:image>
      <image:loc>${baseUrl}${img}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${caption}</image:caption>
    </image:image>`).join('');

      return `  <url>
    <loc>${baseUrl}/obra/${work.slug}</loc>${images}
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
