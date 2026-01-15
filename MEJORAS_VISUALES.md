# Mejoras Visuales Recomendadas para antoniomonereo.com

## 1. Mejoras Implementadas ✅

### SEO y Analytics
- ✅ Google Analytics integrado (necesitas reemplazar `G-XXXXXXXXXX` con tu ID real)
- ✅ Meta tags mejorados con keywords específicos
- ✅ OpenGraph y Twitter Cards optimizados
- ✅ Robots.txt y sitemap.xml ya configurados

### Funcionalidad de Zoom
- ✅ Zoom completo en imágenes de obras (ya implementado en WorkPageClient)
- ✅ Lightbox/fullscreen funcional
- ✅ Componente ImageZoom creado para uso futuro

## 2. Mejoras Visuales Pendientes (Recomendaciones)

### A. Animaciones y Transiciones Sutiles

#### Hero Section en Home
```tsx
// Añadir una sección hero impactante en la página principal
<section className="relative h-[70vh] overflow-hidden">
  <img
    src="/images/featured-work.jpg"
    className="w-full h-full object-cover opacity-90"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
  <div className="absolute bottom-12 left-12">
    <h1 className="text-5xl font-light tracking-tight text-gray-900">
      Antonio Monereo
    </h1>
    <p className="text-xl text-gray-700 mt-2">Pintor y dibujante contemporáneo</p>
  </div>
</section>
```

#### Fade-in en scroll
```tsx
// Usar Intersection Observer para fade-in suave
const fadeInOnScroll = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}
```

#### Hover effects mejorados en cards
```css
/* Añadir a globals.css */
.artwork-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.artwork-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.artwork-card img {
  transition: transform 0.3s ease;
}

.artwork-card:hover img {
  transform: scale(1.05);
}
```

### B. Tipografía Distintiva

#### Opción 1: Serif para el logo (más clásico/artístico)
```tsx
// En tailwind.config.js
fontFamily: {
  serif: ['Playfair Display', 'serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
}

// Logo con serif
<span className="font-serif text-xl tracking-tight">
  Antonio Monereo
</span>
```

#### Opción 2: Sans moderna pero elegante
```tsx
// Usar Lora, Crimson Text o Cormorant para títulos
import { Cormorant } from 'next/font/google'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '600']
})
```

### C. Mejoras en la Página Principal

#### Grid de obras más dinámico
```tsx
// Alternar tamaños para obras destacadas
<div className="grid grid-cols-12 gap-4">
  {/* Obra destacada grande */}
  <div className="col-span-12 md:col-span-8 row-span-2">
    <ArtworkCard work={featured} large />
  </div>

  {/* Obras normales */}
  <div className="col-span-6 md:col-span-4">
    <ArtworkCard work={work1} />
  </div>
  <div className="col-span-6 md:col-span-4">
    <ArtworkCard work={work2} />
  </div>
</div>
```

#### Parallax sutil en hero
```tsx
const [scrollY, setScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

<div
  style={{ transform: `translateY(${scrollY * 0.5}px)` }}
  className="transition-transform"
>
  {/* Contenido hero */}
</div>
```

### D. Microinteracciones

#### Botón "Consultar" más atractivo
```tsx
<button className="group relative overflow-hidden px-8 py-4 bg-blue-600 text-white transition-all hover:bg-blue-700">
  <span className="relative z-10 flex items-center gap-2">
    <Mail className="w-5 h-5 transition-transform group-hover:rotate-12" />
    Consultar disponibilidad
  </span>
  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
</button>
```

#### Loading state elegante
```tsx
<div className="flex items-center justify-center h-screen">
  <div className="relative">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
    <p className="mt-4 text-sm text-gray-600 animate-pulse">Cargando obra...</p>
  </div>
</div>
```

### E. Mejoras en Mobile/Responsive

#### Menu móvil mejorado
```tsx
// Animación slide-in suave
<div className={`
  fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-50
  transform transition-transform duration-300 ease-in-out
  ${isOpen ? 'translate-x-0' : 'translate-x-full'}
`}>
  {/* Contenido del menú */}
</div>
```

#### Galería touch-friendly
```tsx
// Swipe gestures en móvil
import { useSwipeable } from 'react-swipeable';

const handlers = useSwipeable({
  onSwipedLeft: () => goToNextImage(),
  onSwipedRight: () => goToPrevImage(),
  preventDefaultTouchmoveEvent: true,
  trackMouse: true
});
```

### F. Detalles Visuales Adicionales

#### Badge "Nueva obra" para recientes
```tsx
{isRecent(work.year) && (
  <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
    Nueva
  </span>
)}
```

#### Contador de vistas (si implementas analytics)
```tsx
<div className="flex items-center gap-2 text-sm text-gray-500">
  <Eye className="w-4 h-4" />
  <span>{viewCount} vistas</span>
</div>
```

#### Breadcrumbs para navegación
```tsx
<nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
  <Link href="/" className="hover:text-blue-600">Inicio</Link>
  <ChevronRight className="w-4 h-4" />
  <Link href="/pinturas" className="hover:text-blue-600">Pinturas</Link>
  <ChevronRight className="w-4 h-4" />
  <span className="text-gray-900">{work.title}</span>
</nav>
```

### G. Colores y Paleta

#### Actualizar palette para más sofisticación
```js
// tailwind.config.js
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    // ... hasta 900
  },
  accent: {
    gold: '#D4AF37',
    charcoal: '#36454F',
  }
}
```

## 3. Prioridad de Implementación

### Alta Prioridad 🔴
1. ✅ Analytics (YA HECHO)
2. ✅ Zoom en imágenes (YA HECHO)
3. Hero section impactante en home
4. Animaciones fade-in suaves
5. Hover effects mejorados

### Media Prioridad 🟡
6. Tipografía distintiva
7. Grid dinámico en home
8. Mejoras responsive/mobile
9. Breadcrumbs

### Baja Prioridad 🟢
10. Parallax effects
11. Microinteracciones avanzadas
12. Loading states personalizados
13. Badge "nueva obra"

## 4. Próximos Pasos

Para implementar estas mejoras:

1. **Instalar dependencias necesarias**:
```bash
npm install framer-motion react-swipeable
npm install @next/font
```

2. **Configurar Google Analytics**:
- Ir a analytics.google.com
- Crear propiedad para antoniomonereo.com
- Copiar el ID (G-XXXXXXXXXX)
- Reemplazarlo en components/Analytics.tsx

3. **Implementar mejoras visuales una por una**
- Empezar con hero section
- Añadir animaciones
- Mejorar tipografía
- Pulir responsive

¿Quieres que implemente alguna de estas mejoras específicas ahora?
