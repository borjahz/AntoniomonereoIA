/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/images/Muerte_en_tarifa.jpg', destination: '/images/muerte-en-tarifa-antonio-monereo.jpg', permanent: true },
      { source: '/images/ciudad-estilitas.jpg', destination: '/images/ciudad-de-los-estilitas-antonio-monereo.jpg', permanent: true },
      { source: '/images/IMG_8988.jpg', destination: '/images/el-abrazo-antonio-monereo.jpg', permanent: true },
      { source: '/images/Pablo.jpg', destination: '/images/yo-me-siento-asi-antonio-monereo.jpg', permanent: true },
      { source: '/images/Ester.jpg', destination: '/images/el-silencio-antonio-monereo.jpg', permanent: true },
      { source: '/images/Dibujos_morados1.jpg', destination: '/images/pinturas-moradas-i-antonio-monereo.jpg', permanent: true },
      { source: '/images/Pinturas_Moradas_2.jpg', destination: '/images/la-muerte-de-dios-antonio-monereo.jpg', permanent: true },
      { source: '/images/Pinturas_moradas_3.png', destination: '/images/pinturas-moradas-iii-antonio-monereo.png', permanent: true },
      { source: '/images/Calma_y_Relax_I.jpg', destination: '/images/adictos-al-porno-i-antonio-monereo.jpg', permanent: true },
      { source: '/images/Calma_y_Relax-II.jpg', destination: '/images/adictos-al-porno-ii-antonio-monereo.jpg', permanent: true },
      { source: '/images/Calma_y_Relax_III.jpg', destination: '/images/adictos-al-porno-iii-antonio-monereo.jpg', permanent: true },
      { source: '/images/copia1.jpg', destination: '/images/paisaje-con-escena-pastoril-antonio-monereo.jpg', permanent: true },
      { source: '/images/Caballito.jpg', destination: '/images/retrato-francisco-longa-antonio-monereo.jpg', permanent: true },
      { source: '/images/Gijon.jpg', destination: '/images/retrato-josefa-jovellanos-inza-antonio-monereo-1.jpg', permanent: true },
      { source: '/images/IMG_9153.jpg', destination: '/images/retrato-josefa-jovellanos-inza-antonio-monereo-2.jpg', permanent: true },
      { source: '/images/IMG_9154.jpg', destination: '/images/retrato-josefa-jovellanos-inza-antonio-monereo-3.jpg', permanent: true },
      { source: '/images/Tiziano.png', destination: '/images/cristo-con-la-cruz-a-cuestas-tiziano-antonio-monereo.png', permanent: true },
      { source: '/images/Velazquez.jpg', destination: '/images/retrato-ferdinando-brandani-velazquez-antonio-monereo.jpg', permanent: true },
      { source: '/images/Zurbaran.jpg', destination: '/images/san-francisco-en-oracion-zurbaran-antonio-monereo.jpg', permanent: true },
      { source: '/images/estilista2.jpg', destination: '/images/el-estilita-lienzo-antonio-monereo.jpg', permanent: true },
      { source: '/images/estilista.jpg', destination: '/images/el-estilita-carton-antonio-monereo-img.jpg', permanent: true },
      { source: '/images/r.jpg', destination: '/images/autorretrato-antonio-monereo.jpg', permanent: true },
      { source: '/images/paisaje.jpg', destination: '/images/vistas-cabo-trafalgar-antonio-monereo.jpg', permanent: true },
      { source: '/images/no_quiero_pequeno.jpg', destination: '/images/no-voy-a-salir-pequeno-antonio-monereo.jpg', permanent: true },
      { source: '/images/Ropita.jpg', destination: '/images/no-voy-a-salir-grande-antonio-monereo.jpg', permanent: true },
      { source: '/images/Culito.jpg', destination: '/images/ego-sum-booty-mundi-antonio-monereo.jpg', permanent: true },
      { source: '/images/Narciso.jpg', destination: '/images/narciso-antonio-monereo.jpg', permanent: true },
      { source: '/images/Narciso_II.jpg', destination: '/images/narciso-ii-antonio-monereo.jpg', permanent: true },
      { source: '/images/Pelea_a_muerte_entre_dos_amantes.JPG', destination: '/images/pelea-a-muerte-entre-dos-amantes-antonio-monereo.jpg', permanent: true },
      { source: '/images/Narciso_III.jpg', destination: '/images/narciso-iii-antonio-monereo.jpg', permanent: true },
      { source: '/images/Coloso.jpg', destination: '/images/coloso-antonio-monereo.jpg', permanent: true },
      { source: '/images/Coloso_en_Tarifa.jpg', destination: '/images/coloso-en-tarifa-antonio-monereo.jpg', permanent: true },
      { source: '/images/Puente.jpg', destination: '/images/puente-antonio-monereo.jpg', permanent: true },
      { source: '/images/Clones.jpg', destination: '/images/clones-antonio-monereo.jpg', permanent: true },
      { source: '/images/Narciso_ahogado.jpg', destination: '/images/narciso-ahogado-antonio-monereo.jpg', permanent: true },
      { source: '/images/Arbotante.jpg', destination: '/images/arbotante-antonio-monereo.jpg', permanent: true },
      { source: '/images/coloso_2.jpg', destination: '/images/coloso-2-antonio-monereo.jpg', permanent: true },
      { source: '/images/Atlas.jpg', destination: '/images/atlas-terraplanista-antonio-monereo.jpg', permanent: true },
      { source: '/images/Incendio.jpg', destination: '/images/incendio-antonio-monereo.jpg', permanent: true },
      { source: '/images/Coloso_en_bolonia.jpg', destination: '/images/coloso-en-bolonia-antonio-monereo.jpg', permanent: true },
      { source: '/images/Puente_2.jpg', destination: '/images/puente-2-antonio-monereo.jpg', permanent: true },
      { source: '/images/Pelea_a_muerte_2.jpg', destination: '/images/pelea-a-muerte-entre-dos-amantes-ii-antonio-monereo.jpg', permanent: true },
    ]
  },
}

module.exports = nextConfig
