import Link from 'next/link';
import Image from 'next/image';
import worksData from '@/data/works.json';

export default function NotFound() {
  const recentWorks = [...worksData]
    .filter(w => w.public)
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-24 w-full">
        <p className="text-[13px] tracking-widest text-gray-400 uppercase mb-4">404</p>
        <h1 className="text-3xl font-medium text-gray-900 mb-3 tracking-tight">
          Esta página no existe
        </h1>
        <p className="text-gray-500 mb-10 text-sm">
          Puede que la obra haya sido movida o el enlace esté roto.
        </p>

        <div className="flex gap-6 mb-16">
          <Link href="/" className="text-[13px] tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors">
            Ir al inicio
          </Link>
          <Link href="/pinturas" className="text-[13px] tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors">
            Ver pinturas
          </Link>
          <Link href="/contacto" className="text-[13px] tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors">
            Contacto
          </Link>
        </div>

        <p className="text-[13px] tracking-widest text-gray-400 uppercase mb-6">Obras recientes</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentWorks.map(work => (
            <Link key={work.slug} href={`/obra/${work.slug}`} className="group block">
              <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden mb-2">
                <Image
                  src={work.images[0]}
                  alt={work.title_es}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="25vw"
                />
              </div>
              <p className="text-[13px] text-blue-600 underline decoration-1 underline-offset-2">
                {work.title_es}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
