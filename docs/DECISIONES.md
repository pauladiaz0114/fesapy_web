# Decisiones técnicas

Formato: fecha · decisión · por qué · alternativas descartadas.

## 2026-10-26 · Stack inicial
Next.js + TypeScript + Tailwind en Vercel; PostgreSQL en Neon con Prisma; Auth.js con enlace mágico; Vercel Blob; Resend; Zod.
**Por qué:** todo gratis al inicio, el equipo ya conoce Next.js, un solo proyecto para sitio y panel.
**Descartado:** Supabase (se pausa por inactividad en plan gratis), WordPress (menos control y aprendizaje), tienda en línea (no se necesita aún).

## 2026-10-26 · Sin precios ni pagos en línea
La venta es B2B por cotización. Se reevaluará más adelante.

## 2026-10-26 · Tipografía Barlow Condensed + Barlow
Estilo industrial similar a la señalización, gratuita, buena legibilidad en celular.
**Alternativas:** Oswald + Inter; Archivo Black + Archivo.

## 2026-10-26 · Ajustes al modelo de datos inicial
Cotizacion guarda aceptaDatosEn (fecha de la autorización). Nueva tabla IntentoEnvio con el hash de la IP para el límite de 5 envíos por hora.
**Por qué:** la Ley 1581 exige poder demostrar cuándo se autorizó el tratamiento de datos. El hash evita guardar la IP real (minimización de datos) y el límite no necesita servicios externos.
**Descartado:** Upstash/Redis para el límite (una pieza más, innecesaria con poco tráfico).

## 2026-10-26 · El commit inicial va directo a main
Solo la base del proyecto (Día 1). Desde el Día 2 todo cambio va por rama y PR.

## 2026-10-26 · Proyecto creado en carpeta temporal
create-next-app no acepta carpetas con archivos; se crea en una carpeta temporal y se mueve, sin tocar CLAUDE.md ni docs/.

## 2026-10-26 · Flujo de colaboración
Ramas feat/fix/docs por tarea, PR con revisión del otro y squash merge. Solo una persona a la vez crea migraciones de Prisma. Detalles en docs/COLABORACION.md.

## 2026-10-26 · Prisma 6.19.3 (no Prisma 7)
Se fija Prisma 6.19.3. Prisma 7 ya no acepta `url` ni `directUrl` en `schema.prisma` (pasan a `prisma.config.ts`) y exige un adaptador de base de datos extra; la etiqueta "latest" de npm apuntaba a una versión de prueba (8.0.0-rc).
**Por qué:** cumple lo pedido (URL pooled + directa de Neon en el esquema), es lo que muestran la guía de Neon y casi todos los tutoriales, menos piezas para empezar.
**Pendiente:** evaluar la migración a Prisma 7 después del MVP, en su propia rama.

## 2026-10-26 · Content-Security-Policy básica hasta el Día 7
CSP sin nonces en `next.config.ts` (`'unsafe-inline'` en scripts y estilos; `'unsafe-eval'` solo en desarrollo).
**Por qué:** no rompe el modo desarrollo ni el prerenderizado estático. Se endurece el Día 7 con nonces cuando sepamos qué dominios externos (Vercel Blob, mapas) se necesitan.

## 2026-10-26 · Finales de línea LF en el repo (.gitattributes)
**Por qué:** si un compañero usa Windows y el otro no, Git puede marcar archivos enteros como cambiados solo por los saltos de línea (CRLF vs LF). Con `.gitattributes` todos quedan iguales.
