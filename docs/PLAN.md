# Plan de trabajo

Leyenda: [ ] pendiente · [~] en curso (poner nombre) · [x] terminado
Persona A = Sebastián · Persona B = Paula (ajusten como quieran)

Regla: antes de tomar una tarea, márquenla con `[~] (nombre)` y hagan commit/push de este archivo para no pisarse.
Cada tarea debe cumplir los controles de `ARQUITECTURA-Y-SEGURIDAD.md` que le correspondan.

> **Cambio de rumbo (9 de noviembre de 2026):** se cancela la base de datos externa, el catálogo administrable, el login y el panel. El sitio es simple: páginas estáticas + WhatsApp + un formulario de cotización que **no guarda datos** (arma un mensaje y abre WhatsApp o el correo). Motivos en `DECISIONES.md`. El plan anterior (Días 2 al 7) quedó reemplazado: ver al final.

## Plan vigente

### Hecho
- [x] Base del proyecto: Next.js 16, Tailwind v4, Zod, tokens de diseño (dorado, negro, crema), fuentes Barlow
- [x] Seguridad base: cabeceras y CSP, `.npmrc` con versiones exactas, Dependabot, CI (lint, build, `npm audit`, gitleaks) y revisión del historial
- [x] Repo en GitHub (público) y Vercel conectado, con vista previa en cada PR
- [x] Home y marco común: barra de anuncio, encabezado con menú, hero, ventajas, problemas que resolvemos, 8 categorías, clientes y reseñas (con marcadores), pie y botón flotante de WhatsApp
- [x] `/cotizacion`: formulario validado con Zod que abre WhatsApp o el correo (sin guardar nada)
- [x] Páginas cortas: `/productos`, `/personalizacion`, `/nosotros` y `/politica-de-datos` (borrador)
- [x] Quitar todo lo de base de datos, DAL, cifrado, login y panel (rama `chore/quitar-base-de-datos`)
- [x] Catálogo estático con los 30 productos del portafolio (`/productos`, `/productos/<categoria>`, `/productos/<categoria>/<producto>`), cotización por producto y fotos del PDF (rama `feat/catalogo-carruseles`)
- [x] Carrusel del hero, animaciones discretas (con `prefers-reduced-motion`) y carrusel de categorías en celular
- [x] Pulir movimiento y experiencia: foco visible y `aria-current`, formulario con validación al salir del campo y envío sin doble clic, carruseles con deslizar/teclado/barra de progreso, entradas escalonadas, carga suave de imágenes y menú hamburguesa en celular (rama `feat/pulir-movimiento-y-experiencia`)

### Pendiente: contenido (`TODO(contenido)`, lo debe dar Fesapy)
- [ ] Dirección y horario de la sede de Madrid
- [ ] Enlaces de Instagram y Facebook
- [ ] Razón social, NIT y plazo de conservación para la política de datos; revisión de la política por la empresa (idealmente con un abogado)
- [ ] Logos de clientes (con su permiso por escrito) y reseñas reales (nombre, cargo, empresa y permiso)
- [ ] Fotos propias: productos por categoría y trabajos bordados y estampados (reemplazan las de referencia de `docs/CREDITOS-IMAGENES.md`)
- [ ] Confirmar con Fesapy que puede usar en la web las fotos del portafolio (varias muestran marcas de terceros) y pedir los originales en mayor resolución
- [ ] Productos de botiquines, stickers y lubricantes (hoy esas categorías dicen "Pídenos cotización" porque no están en el portafolio)
- [ ] Logo en SVG o PNG con fondo transparente
- [ ] `/nosotros`: historia y año de fundación
- [ ] `/personalizacion`: cantidad mínima, tiempos y formatos de logo aceptados
- [ ] Confirmar el alcance de la asesoría, los tiempos de despacho y el horario de atención (comentarios en `Ventajas.tsx`)

### Pendiente: calidad y lanzamiento
- [ ] SEO: `sitemap.ts`, `robots.ts`, datos estructurados `LocalBusiness` (sede de Madrid, JSON-LD escapado) y Open Graph (imagen al compartir por WhatsApp)
- [ ] Endurecer la CSP (quitar `'unsafe-inline'` con SRI o nonces) y revisar en securityheaders.com (meta: A)
- [ ] Antes de lanzar: buscar secretos en `.next/static`, `npm audit` sin altas y gitleaks limpio
- [ ] Pruebas en celular (Android y iPhone) y Lighthouse (>90)
- [ ] Revisión con la dueña de Fesapy: textos, datos de contacto y política de datos
- [ ] 2FA en GitHub y Vercel (confirmar que está activo)
- [ ] Comprar el dominio y conectarlo; luego HSTS `preload`
- [ ] Evaluar Vercel Pro al lanzamiento oficial (el plan Hobby es para uso no comercial)

### Ideas para después
- Catálogo descargable en PDF
- Google Business Profile para la sede de Madrid
- Analítica (Vercel Analytics o Google Analytics) **con** aviso de cookies
- Si hiciera falta recibir las cotizaciones en un servidor: evaluar Server Action + Resend (ver `DECISIONES.md`, 2026-11-09)

---

## Plan anterior — REEMPLAZADO por el cambio de rumbo del 9 de noviembre de 2026
Estas tareas ya **no se harán** como estaban escritas. Se dejan como historial.

- **Día 1 — Base del proyecto:** se hizo la parte de código, repo, Vercel y seguridad base. Se descartó la base de datos externa, el esquema, la migración y los roles de base de datos.
- **Día 2 — Estructura pública:** *reemplazado.* Lo visual se hizo en los PR #8 y #10 (home, encabezado, pie, botón flotante). Se descartó la capa de acceso a datos.
- **Día 3 — Catálogo:** *reemplazado.* No hay catálogo desde una base de datos; `/productos` muestra las categorías.
- **Día 4 — Cotizaciones:** *reemplazado.* El formulario no guarda datos, no cifra, no usa anti-bots ni límite de intentos, y no envía correos desde el servidor. La política de datos se hizo como borrador.
- **Día 5 — Panel de administración:** *descartado.* Sin login, roles, panel ni subida de imágenes.
- **Día 6 — Contenido real y SEO:** *pasa al plan vigente* (sin catálogo cargado en un panel).
- **Día 7 — Revisión y lanzamiento de prueba:** *pasa al plan vigente* (sin las pruebas del panel ni de la base de datos).
