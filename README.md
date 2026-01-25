# UMP - Landing Page | Plataforma Musical

## 1. Objetivo del Proyecto

El objetivo principal es crear una **landing page de alto impacto visual y rendimiento optimizado** para **UMP (Underground Music Platform)**. La plataforma sirve como el punto central de presentación para la marca, sus artistas, noticias y enlaces a redes sociales. Se busca una estética "premium/brutalist" que refleje la identidad urbana y moderna del sello discográfico, priorizando la **conversión de visitantes** en seguidores y oyentes, y ofreciendo una experiencia inmersiva tanto en móvil como en escritorio.

## 2. Enfoque Conceptual

El concepto de diseño se basa en una estética **"Cinemática y Editorial"** con tintes oscuros y minimalistas:

- **Estética Visual:** Uso predominante de fondos negros (`#050505`) y grises oscuros para resaltar el contenido, con acentos en verde neón (`#18943A`) que evocan energía y modernidad.
- **Minimalismo Brutalista:** Tipografías grandes, márgenes generosos y bordes definidos ("sharp edges") para transmitir fuerza y autoridad.
- **Atmósfera:** Se busca una sensación "underground" pero sofisticada, utilizando imágenes en escala de grises que cobran color al interactuar (hover), creando una experiencia dinámica.

## 3. Experiencia de Usuario (UX)

La experiencia está centrada en la **fluidez y la inmediatez**:

- **Mobile-First:** Dado el público objetivo joven y urbano, todo el diseño está optimizado para funcionar perfectamente en dispositivos móviles, con navegación intuitiva y áreas táctiles accesibles.
- **Navegación Intuitiva:** Transiciones suaves entre páginas y un flujo claro de información que guía al usuario desde la presentación de la marca (Hero) hacia el descubrimiento de contenido (Artistas, Noticias).
- **Micro-interacciones:** Efectos sutiles al pasar el cursor (hover states) sobre artistas y noticias para dar feedback visual instantáneo y mantener el "engagement".
- **Velocidad:** Tiempos de carga ultrarrápidos gracias a la optimización de Next.js, esencial para retener la atención del usuario.

## 4. Secciones Clave

La estructura de la página principal (`/`) se compone de:

1.  **Hero Section:** Impacto visual inmediato con video o imagen de alta calidad y copy persuasivo.
2.  **Featured Artists (Estrellas):** Un grid estilo "masonry" o editorial que destaca a los artistas principales. En móvil se adapta a 2 columnas para mejor visibilidad.
3.  **Latest News:** Lista editorial de las noticias más recientes, permitiendo a los fans mantenerse actualizados.
4.  **Social Connect:** Sección final con grandes llamadas a la acción para seguir a la marca en Instagram, YouTube y Spotify.

## 5. Retos Abordados

- **Equilibrio Visual/Rendimiento:** Implementar una estética rica en imágenes y efectos sin sacrificar la velocidad de carga (LCP/CLS). Se solucionó mediante el uso de `next/image` optimizado y componentes de servidor.
- **Diseño Responsivo Complejo:** Adaptar el grid de artistas estéticamente agradable tanto en pantallas gigantes como en móviles pequeños sin romper la armonía visual.
- **Internacionalización (i18n):** Soporte nativo para Español e Inglés mediante rutas dinámicas `[lang]`, asegurando que el contenido sea accesible para una audiencia global.

## 6. Implementación Técnica

El stack tecnológico elegido garantiza escalabilidad, seguridad y rendimiento:

- **Framework:** **Next.js 16 (App Router)** - Para renderizado del lado del servidor (SSR) y optimización SEO automática.
- **Lenguaje:** **TypeScript** - Para un código robusto y libre de errores durante el desarrollo.
- **Estilos:** **Tailwind CSS** - Para un desarrollo rápido de UI con un sistema de diseño consistente.
- **Animaciones:** **Tailwind CSS Animate** y transiciones CSS nativas para efectos ligeros y performantes.
- **Backend / Base de Datos:** **Supabase** - Proveedor de base de datos PostgreSQL y autenticación, elegido por su velocidad y facilidad de integración.
- **Gestión de Estado/Datos:** Fetching de datos directo en componentes de servidor (`async/await`) para reducir el JavaScript enviado al cliente.
- **Iconos:** **Lucide React** - Conjunto de iconos ligeros y modernos.
