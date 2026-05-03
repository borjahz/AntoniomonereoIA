import { NextResponse } from 'next/server';

const SITEMAP_URL = 'https://antoniomonereo.com/sitemap.xml';

export async function GET() {
  const [google, bing] = await Promise.allSettled([
    fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`),
    fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`),
  ]);

  return NextResponse.json({
    google: google.status === 'fulfilled' ? google.value.status : 'error',
    bing: bing.status === 'fulfilled' ? bing.value.status : 'error',
    timestamp: new Date().toISOString(),
  });
}
