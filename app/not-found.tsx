import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="text-center">
        <p className="text-[13px] tracking-widest text-gray-400 uppercase mb-6">404</p>
        <h1 className="font-wellingtons text-3xl lg:text-5xl text-gray-900 mb-4">
          Página no encontrada
        </h1>
        <p className="text-gray-500 text-[13px] tracking-wide mb-10">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link
          href="/"
          className="text-[13px] font-normal tracking-wide text-blue-700 underline decoration-1 underline-offset-2 hover:text-blue-900 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
