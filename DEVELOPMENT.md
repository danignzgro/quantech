# Guía de desarrollo

## Dónde editar cada cosa

| Necesidad | Archivo |
| --- | --- |
| Textos, imagenes, colores, SEO y enlaces | `src/config/site.config.js` |
| Orden, activación y registro de secciones | `src/App.jsx` |
| Navegación | `src/components/Navbar.jsx` |
| Hero | `src/components/Hero.jsx` |
| Servicios | `src/components/Services.jsx` |
| Nosotros | `src/components/About.jsx` |
| Galería | `src/components/Gallery.jsx` |
| Carrusel | `src/components/Carousel.jsx` |
| Imagen destacada | `src/components/ImageSection.jsx` |
| Columnas | `src/components/Columns.jsx` |
| Testimonios | `src/components/Testimonials.jsx` |
| Contacto | `src/components/Contact.jsx` |
| Pie de página | `src/components/Footer.jsx` |
| Estilos de todas las secciones | `src/App.css` |

`src/App.css` está dividido mediante encabezados `NAVBAR`, `HERO`, `SERVICES`,
`ABOUT`, `GALLERY`, `TESTIMONIALS`, `CONTACT`, `FOOTER`, `CAROUSEL`,
`IMAGE SECTION` y `COLUMNS`. Usa la búsqueda del editor con esos nombres para
saltar directamente al bloque correspondiente.

## Añadir una sección

1. Crea un componente en `src/components/`.
2. Añade sus estilos bajo un encabezado propio en `src/App.css`.
3. Define los datos de la sección en `src/config/site.config.js`.
4. Impórtala y renderízala condicionalmente en `src/App.jsx`.

## Imágenes

Guarda imágenes manuales en `public/images/`. Las rutas se escriben como
`/images/nombre-de-archivo.extension`. Mantén la extensión en la configuración.

- Hero y carrusel: 16:9, mínimo 1920 x 1080 px.
- Galería e imagen destacada: 4:3, recomendado 1200 x 900 px.
- Imagen lateral de Nosotros: 4:5, recomendado 1000 x 1250 px.

La interfaz adapta las imágenes con `object-fit: cover`; deja el sujeto de la
foto en la zona central para evitar recortes importantes en pantallas pequeñas.
