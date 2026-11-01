# Plan de trabajo — MVP en 1 semana

Leyenda: [ ] pendiente · [~] en curso (poner nombre) · [x] terminado
Persona A = Sebastián · Persona B = novia (ajusten como quieran)

Regla: antes de tomar una tarea, márquenla con `[~] (nombre)` y hagan commit/push de este archivo para no pisarse.
Cada tarea debe cumplir los controles de `ARQUITECTURA-Y-SEGURIDAD.md` que le correspondan (tabla §11).

## Día 1 — Base del proyecto (juntos)
- [ ] Crear repo en GitHub (privado) y agregar a ambos como colaboradores — *a mano, ver BITACORA 2026-10-26*
- [x] `create-next-app` con TypeScript, Tailwind, ESLint, App Router, carpeta `src/` (Next.js 16.4.3)
- [x] Copiar `CLAUDE.md`, `docs/` y `.env.example` al repo
- [ ] Reemplazar `CLAUDE.md` (era de otro proyecto) por el de Fesapy
- [ ] Conectar a Vercel (despliegue automático) + Deployment Protection en previews — *a mano*
- [ ] Crear base en Neon con ramas `main` (producción) y `dev` (previews y local) — *a mano*
- [x] Prisma: esquema inicial (`prisma/schema.prisma`) y cliente `src/lib/prisma.ts`
- [ ] Esquema de seguridad: campos cifrados en Cotizacion, `correoHash`, `politicaVersion`, `IntentoLimitado`
- [ ] Prisma: primera migración — *requiere Neon* (`npx prisma migrate dev --name inicial`)
- [ ] Rol `fesapy_app` en Neon con solo SELECT/INSERT/UPDATE/DELETE (SQL en el documento de seguridad §5)
- [x] Tokens de diseño (colores, fuentes Barlow) y layout base
- [x] Cabeceras de seguridad con CSP básica (endurecer el Día 7)
- [ ] Seguridad base: `src/lib/env.ts` (Zod), `server-only`, `.npmrc` (`save-exact`), HSTS sin `preload`, COOP, Permissions-Policy ampliada
- [ ] Escaneo: `.github/dependabot.yml` + CI (lint, build, `npm audit`, gitleaks) + escaneo del historial con gitleaks
- [ ] 2FA en GitHub, Vercel, Neon, Resend y Cloudflare — *a mano*

## Día 2 — Estructura pública
- [x] Página de inicio simple (una sola página, sin menú, acción única "Cotizar por WhatsApp"): encabezado, portada, lo que ofrecemos, sectores, franja y pie de página, con botón flotante y mensaje prellenado — *rama `feat/pagina-inicio`*
- [ ] (A) Header con menú responsive + Footer con redes y sedes
- [ ] (A) Botón flotante de WhatsApp (texto con `encodeURIComponent`)
- [ ] (B) Página de Inicio: hero, categorías, "todo en uno", personalización
- [ ] (B) Sección clientes y testimonios (con datos de ejemplo)
- [ ] (A) DAL pública inicial `src/lib/dal/` (`server-only`, `select` mínimo, solo `activo: true`)

## Día 3 — Catálogo
- [ ] (A) Página de productos por categoría (datos desde la DAL)
- [ ] (A) Detalle de producto por `slug` (404 si no existe u oculto) con botón "Cotizar este producto"
- [ ] (B) Página Nosotros
- [ ] (B) Página Personalización (bordado y estampado)

## Día 4 — Cotizaciones
- [ ] (A) `src/lib/cripto.ts` (AES-256-GCM + HMAC) y `src/lib/sanitizar.ts`
- [ ] (A) `src/lib/limite.ts` (rate limiting con IP de Vercel + HMAC) y `src/lib/antibots.ts` (honeypot, trampa de tiempo, Turnstile)
- [ ] (A) Formulario de cotización: Zod estricto, anti-bots, límite 5/hora, casilla Habeas Data con `politicaVersion`, datos cifrados
- [ ] (A) Guardar en BD + correo de aviso con Resend (React Email o texto plano, sin datos sensibles innecesarios)
- [ ] (B) Página Política de tratamiento de datos (con versión, conservación y canal de derechos)
- [ ] (B) Página de contacto con direcciones de las 3 sedes y enlace "Ver en Google Maps" (sin iframe)

## Día 5 — Panel de administración
- [ ] (A) Verificar compatibilidad de Auth.js con Next.js 16 (si no, proponer alternativa en DECISIONES)
- [ ] (A) Auth.js con enlace mágico, sesiones en BD, cookies seguras, Turnstile y límite en login, respuesta idéntica
- [ ] (A) Modelo `Usuario` con `rol` (ADMIN/EDITOR), `src/lib/permisos.ts`, `exigirPermiso()`, script `admin:crear`
- [ ] (A) `src/proxy.ts` (redirección optimista) + DAL protegida en cada acción
- [ ] (A) `RegistroAuditoria` + revocar UPDATE/DELETE a `fesapy_app`
- [ ] (A) CRUD de productos y categorías con subida segura (`file-type` + `sharp`, nombre aleatorio, máx. 4 MB)
- [ ] (B) CRUD de clientes y testimonios (permiso `contenido:gestionar`)
- [ ] (B) Lista de cotizaciones (solo ADMIN): DTO mínimo, descifrado en la DAL, cambio de estado auditado
- [ ] (B) Gestión de usuarios (solo ADMIN): invitar, cambiar rol, desactivar (borra sesiones)

## Día 6 — Contenido real y SEO
- [ ] Cargar catálogo, logo, clientes y testimonios reales
- [ ] Metadata por página, `sitemap.ts`, `robots.ts` (bloquear `/admin` y `/api`), `LocalBusiness` con JSON-LD escapado
- [ ] Open Graph (imagen al compartir en WhatsApp)
- [ ] Optimizar imágenes con `next/image` + CSP con el dominio de Vercel Blob

## Día 7 — Revisión y lanzamiento de prueba
- [ ] Endurecer la CSP (SRI en el sitio público y/o nonces en `/admin`, sin `'unsafe-inline'`) + securityheaders.com (meta: A)
- [ ] Buscar secretos en `.next/static` (`re_`, `postgres://`, `vercel_blob_rw_`): cero resultados
- [ ] `npm audit` sin altas + gitleaks del historial limpio
- [ ] Pruebas manuales de seguridad: IDOR (cambiar ids), mass assignment (campos extra), EDITOR intentando ver cotizaciones, envío de 6 cotizaciones seguidas, POST directo a una Server Action sin sesión
- [ ] Revisión completa con la checklist de `ARQUITECTURA-Y-SEGURIDAD.md`
- [ ] Pruebas en celular (Android y iPhone) y Lighthouse (>90)
- [ ] Revisión con la dueña de Fesapy: tiempo de conservación de datos, texto de la política, responsable de incidentes
- [ ] Documentar en BITACORA

## Después del MVP
- Comprar dominio y conectarlo; luego HSTS `preload` y SPF/DKIM/DMARC en Resend
- Google Business Profile para las 3 sedes
- Analítica (Vercel Analytics o Google Analytics, con aviso de cookies)
- Descargar catálogo en PDF
- Más productos y fotos propias
- Evaluar migración a Prisma 7
- Row Level Security si se agregan cuentas de clientes o acceso directo a la base
- Tarea programada para borrar cotizaciones vencidas según la política de conservación
