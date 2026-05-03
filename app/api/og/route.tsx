import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import worksData from '@/data/works.json';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');
  const work = worksData.find(w => w.slug === slug);

  if (!work) {
    return new Response('Not found', { status: 404 });
  }

  const imageUrl = `https://antoniomonereo.com${work.images[0]}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
      >
        <img
          src={imageUrl}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
            padding: '48px 48px 40px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ color: '#ffffff', fontSize: 44, fontWeight: 700, lineHeight: 1.2 }}>
            {work.title_es}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 26, marginTop: 12 }}>
            Antonio Monereo · {work.year}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
