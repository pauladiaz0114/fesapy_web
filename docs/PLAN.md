# Plan de trabajo — MVP en 1 semana

Leyenda: [ ] pendiente · [~] en curso (poner nombre) · [x] terminado
Persona A = Sebastián · Persona B = novia (ajusten como quieran)

Regla: antes de tomar una tarea, márquenla con `[~] (nombre)` y hagan commit/push de este archivo para no pisarse.

## Día 1 — Base del proyecto (juntos)
- [ ] Crear repo en GitHub (privado) y agregar a ambos como colaboradores — *a mano, ver BITACORA 2026-10-26*
- [x] `create-next-app` con TypeScript, Tailwind, ESLint, App Router, carpeta `src/` (Next.js 16.4.3)
- [x] Copiar `CLAUDE.md`, `docs/` y `.env.example` al repo
- [ ] Conectar a Vercel (despliegue automático) — *pendiente, a mano*
- [ ] Crear base en Neon y conectar `DATABASE_URL` y `DIRECT_URL` — *pendiente, a mano*
- [x] Prisma: esquema inicial (`prisma/schema.prisma`) y cliente `src/lib/prisma.ts`
- [ ] Prisma: primera migración — *pendiente: requiere Neon* (`npx prisma migrate dev --name inicial`)
- [x] Tokens de diseño (colores, fuentes Barlow) y layout base
- [x] Cabeceras de seguridad con CSP básica (endurecer el Día 7)

## Día 2 — Estructura pública
- [ ] (A) Header con menú responsive + Footer con redes y sedes
- [ ] (A) Botón flotante de WhatsApp
- [ ] (B) Página de Inicio: hero, categorías, "todo en uno", personalización
- [ ] (B) Sección clientes y testimonios (con datos de ejemplo)

## Día 3 — Catálogo
- [ ] (A) Página de productos por categoría (datos desde la BD)
- [ ] (A) Detalle de producto con botón "Cotizar este producto"
- [ ] (B) Página Nosotros
- [ ] (B) Página Personalización (bordado y estampado)

## Día 4 — Cotizaciones
- [ ] (A) Formulario de cotización: Zod, honeypot, límite por IP, casilla Habeas Data
- [ ] (A) Guardar en BD + correo de aviso con Resend
- [ ] (B) Página Política de tratamiento de datos
- [ ] (B) Página de contacto con mapa/direcciones de las 3 sedes

## Día 5 — Panel de administración
- [ ] (A) Auth.js con enlace mágico + `ADMIN_EMAILS` + middleware
- [ ] (A) CRUD de productos y categorías con subida de imágenes (Vercel Blob)
- [ ] (B) CRUD de clientes y testimonios
- [ ] (B) Lista de cotizaciones recibidas con cambio de estado

## Día 6 — Contenido real y SEO
- [ ] Cargar catálogo, logo, clientes y testimonios reales
- [ ] Metadata por página, `sitemap.ts`, `robots.ts`, `LocalBusiness`
- [ ] Open Graph (imagen al compartir en WhatsApp)
- [ ] Optimizar imágenes con `next/image`

## Día 7 — Revisión y lanzamiento de prueba
- [ ] Endurecer la CSP (nonces, sin `'unsafe-inline'`) + verificación en securityheaders.com
- [ ] Revisión con checklist de `ARQUITECTURA-Y-SEGURIDAD.md`
- [ ] Pruebas en celular (Android y iPhone) y Lighthouse (>90)
- [ ] Revisión con la dueña de Fesapy y lista de cambios
- [ ] Documentar en BITACORA

## Después del MVP
- Comprar dominio y conectarlo
- Google Business Profile para las 3 sedes
- Analítica (Vercel Analytics o Google Analytics, con aviso de cookies)
- Descargar catálogo en PDF
- Más productos y fotos propias
