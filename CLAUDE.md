# CLAUDE.md — Proyecto web Fesapy

Este archivo lo lee Claude Code al inicio de cada sesión. Contiene el contexto y las reglas del proyecto. Si algo aquí cambia, se actualiza este archivo en el mismo commit.

## Qué es Fesapy
Empresa colombiana proveedora integral de seguridad industrial para empresas (B2B principalmente). Sedes: Bogotá, Madrid (Cundinamarca) y Mosquera. Despacha a nivel nacional e internacional.

- **Fabrica y personaliza dotación**: overoles, uniformes, ropa de trabajo con logos estampados y bordados.
- **Distribuye**: EPP, calzado de seguridad de varias marcas, eslingas, lubricantes y mantenimiento (WD-40, CRC), botiquines.
- **Señalización**: letreros, señales, stickers.
- **Diferencial**: es una marca multifuncional, "todo en uno": la empresa le compra toda su seguridad a un solo proveedor.

Detalles completos en `docs/BRIEF.md`.

## Objetivo de la página
1. Que el visitante conozca la empresa y confíe (clientes, testimonios, sedes).
2. Que escriba por WhatsApp con un clic.
3. Que pida cotización mediante un formulario.
4. Que el equipo de Fesapy administre catálogo, testimonios, clientes y cotizaciones desde un panel, sin tocar código.

No hay pagos en línea ni precios públicos (por ahora).

## Equipo y forma de trabajo
- Dos personas trabajan en este repo, cada una con su propio Claude Code. Ambas están aprendiendo.
- **Explica siempre lo que haces** en español sencillo: qué archivo tocaste, por qué y qué concepto hay detrás. Al final de cada tarea, resume en 3 a 6 viñetas.
- **Documenta cada tarea terminada** en `docs/BITACORA.md` (formato al inicio de ese archivo).
- **Toda decisión técnica relevante** (librería nueva, cambio de estructura, cambio de modelo de datos, cambio de seguridad) va en `docs/DECISIONES.md`.
- Trabaja en una rama `feat/...`, `fix/...`, `docs/...` o `chore/...`, nunca directo en `main`. Flujo en `docs/COLABORACION.md`.
- Antes de empezar: `git pull` y revisa `docs/PLAN.md` para saber qué sigue y qué está tomado.
- Si una instrucción es ambigua o falta contenido real (textos, fotos, datos de contacto), **no lo inventes**: usa un placeholder visible `TODO(contenido): ...` y avisa.

## Stack
- **Next.js 16** (App Router, `cacheComponents` activo) + TypeScript (modo `strict`)
  - Esta versión trae cambios importantes respecto a versiones anteriores: **antes de escribir código de Next.js, lee la guía correspondiente en `node_modules/next/dist/docs/`** (ver `AGENTS.md`). Por ejemplo, el antiguo `middleware.ts` ahora se llama `proxy.ts`.
- Tailwind CSS v4 (tokens con `@theme` en `src/app/globals.css`)
- PostgreSQL en Neon (plan gratuito) + Prisma ORM
- Auth.js con enlace mágico por correo y sesiones en base de datos; roles `ADMIN` y `EDITOR`
- Vercel Blob para imágenes (procesadas con `sharp`)
- Resend para correos (aviso de nueva cotización y login del admin)
- Zod para validar toda entrada
- Cloudflare Turnstile contra bots
- Despliegue en Vercel

Justificación y alternativas en `docs/ARQUITECTURA-Y-SEGURIDAD.md`.

## Comandos
```bash
npm run dev          # servidor local
npm run build        # build de producción (debe pasar antes de abrir PR)
npm run lint         # ESLint
npm audit --audit-level=high --omit=dev   # vulnerabilidades en dependencias
npm run db:migrar -- --name <nombre>   # nueva migración en development (solo una persona a la vez)
npm run db:estado    # qué migraciones faltan
npm run db:studio    # ver la base de datos
# Los db:* cargan .env.local (la CLI de Prisma sola solo lee .env). No usar npx prisma directo.
```

## Estructura
```
src/
  proxy.ts              # redirección optimista de /admin (no es la verificación real)
  app/
    (sitio)/            # páginas públicas
      page.tsx          # inicio
      nosotros/
      productos/        # catálogo por categoría
      productos/[slug]/
      personalizacion/  # bordado y estampado
      cotizar/
      politica-de-datos/
    admin/              # panel protegido
    api/
  components/
    ui/                 # botones, inputs, tarjetas
    sitio/              # header, footer, botón WhatsApp flotante
  lib/
    env.ts              # única lectura de process.env (validada con Zod)
    prisma.ts  auth.ts  permisos.ts  cripto.ts  limite.ts  antibots.ts  sanitizar.ts  auditoria.ts
    dal/                # Capa de Acceso a Datos: única puerta a la base de datos
    validaciones/       # esquemas Zod
prisma/schema.prisma
docs/
```

## Diseño
- Colores de marca: amarillo y negro. Tokens como variables CSS en `globals.css` (`@theme`):
  - `--amarillo: #FFC400` (fondos, botones, acentos)
  - `--negro: #111111` (texto y fondos oscuros)
  - `--gris: #F4F4F4` (fondos de sección)
- **Nunca** texto amarillo sobre fondo blanco (contraste insuficiente). Amarillo siempre como fondo con texto negro, o sobre fondo negro.
- Tipografía: **Barlow Condensed** (títulos, en mayúsculas, peso 700) + **Barlow** (texto). Cargar con `next/font/google`.
- Estilo industrial, limpio, mucho contraste. Mobile first: la mayoría de clientes entrará desde el celular.
- Botón flotante de WhatsApp visible en todas las páginas públicas.

## Reglas de seguridad (obligatorias)
Detalle completo y razones en `docs/ARQUITECTURA-Y-SEGURIDAD.md`. Si una tarea choca con estas reglas, **detente y pregunta**.

**Acceso y permisos**
- Toda lectura o escritura de datos pasa por `src/lib/dal/`. Páginas, Server Actions y Route Handlers **no** importan Prisma directamente.
- Cada función protegida de la DAL empieza con `exigirPermiso('<permiso>')` (matriz en `src/lib/permisos.ts`). Se verifica en la DAL **aunque** `proxy.ts` o el layout ya lo hayan hecho: las Server Actions se pueden llamar con un POST directo.
- Se pregunta por permisos, nunca `if (rol === 'ADMIN')`. Ocultar un botón no es seguridad.
- Nunca cachear (`'use cache'`) funciones que lean la sesión o datos personales.
- Contenido público: siempre `activo: true`, búsqueda por `slug`, y 404 (no 403) para lo oculto.

**Datos que entran**
- Zod **en el servidor** para toda entrada, con `z.strictObject` y solo los campos permitidos. Nunca `data: { ...formData }` hacia Prisma: campo por campo.
- El servidor fija `id`, `estado`, fechas, `aceptaDatosEn`, `politicaVersion`, `rol` y autores. Nunca se aceptan del cliente.
- Normalizar texto con `src/lib/sanitizar.ts`. Prohibido `dangerouslySetInnerHTML` con contenido de usuarios o del panel. JSON-LD escapando `<`.
- Solo la API de Prisma o `$queryRaw` con plantilla. **Prohibidos** `$queryRawUnsafe` y `$executeRawUnsafe`.

**Datos que salen**
- `select` explícito en cada consulta. A los componentes cliente solo llegan DTOs con los campos necesarios.
- Archivos de `lib/dal/`, `env.ts`, `prisma.ts`, `auth.ts` y `cripto.ts` empiezan con `import 'server-only'`.
- Errores genéricos al usuario. En logs, solo ids, **nunca** correos, teléfonos ni NIT.

**Secretos**
- Nunca subir secretos al repo. Todo va en `.env.local` (ignorado) y en Vercel. `.env.example` actualizado sin valores.
- Solo `src/lib/env.ts` lee `process.env`. La única variable `NEXT_PUBLIC_` permitida es `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
- Nunca imprimas en la terminal ni copies al chat el contenido de `.env.local`.

**Formularios y abuso**
- Cotización: honeypot + trampa de tiempo firmada + Turnstile verificado en el servidor + límite 5/hora por IP (HMAC) + casilla Habeas Data obligatoria, no marcada, con enlace a la política.
- Login: Turnstile + límite por IP y por correo + respuesta idéntica exista o no el correo.
- IP del visitante solo desde la que entrega Vercel, nunca del primer valor de `X-Forwarded-For`. Nunca se guarda la IP real.

**Datos sensibles**
- Correo, teléfono y NIT de cotizaciones se cifran con `src/lib/cripto.ts` (AES-256-GCM) antes de guardar. Solo se descifran en la DAL con `cotizaciones:ver`. No inventar criptografía: solo `node:crypto`.

**Archivos**
- Imágenes: solo con permiso `imagenes:subir`. Tipo verificado por los bytes del archivo (JPEG/PNG/WebP, nunca SVG), máx. 4 MB, reprocesadas con `sharp` (WebP, sin metadatos), nombre generado por el servidor.

**Dependencias**
- **No instales paquetes sin proponerlo primero** con su nombre exacto, para qué sirve, descargas semanales y última versión. Espera aprobación y regístralo en `DECISIONES.md`.
- Versiones exactas (`.npmrc` con `save-exact=true`). `npm audit` sin vulnerabilidades altas antes de abrir PR.

**Infraestructura**
- Cabeceras de seguridad en `next.config.ts`. Si agregas un servicio externo (scripts, imágenes, iframes), actualiza la CSP y anótalo en `DECISIONES.md`.
- Las migraciones las corre una sola persona y con `DIRECT_URL`. La app usa el rol `fesapy_app`, sin permisos de estructura.

**Contenido**
- Imágenes de productos de marcas: solo las que Fesapy tenga autorización de usar (material de prensa del fabricante o distribuidor, o fotos propias). No descargar imágenes al azar de Google.

## Contenido
- Textos en español de Colombia, tono profesional y cercano, orientado a empresas (jefes de compras, HSE/SST).
- SEO: cada página con `metadata` (título y descripción), `sitemap.ts`, `robots.ts`, datos estructurados `LocalBusiness` para las tres sedes.
