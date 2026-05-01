import { MetadataRoute } from 'next';
import worksData from '@/data/works.json';

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://antoniomonereo.com';

  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/pinturas`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dibujos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/copias`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Páginas dinámicas de obras
  const workPages = worksData
    .filter((work) => work.public)
    .map((work) => ({
      url: `${baseUrl}/obra/${work.slug}`,
      lastModified: new Date(work.year, 11, 31),
      changeFrequency: 'monthly' as const,
      priority: work.year >= 2026 ? 0.9 : 0.7,
    }));

  return [...staticPages, ...workPages];
}
