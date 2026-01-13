import WorkPageClient from './WorkPageClient';
import worksData from '@/data/works.json';

export function generateStaticParams() {
  return worksData.map((work) => ({
    slug: work.slug,
  }));
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  return <WorkPageClient slug={params.slug} />;
}
