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
Ramas feat/fix/docs/chore por tarea, PR con revisión del otro y squash merge. Solo una persona a la vez crea migraciones de Prisma. Detalles en docs/COLABORACION.md.

## 2026-10-26 · Prisma 6.19.3 (no Prisma 7)
Se fija Prisma 6.19.3. Prisma 7 ya no acepta `url` ni `directUrl` en `schema.prisma` (pasan a `prisma.config.ts`) y exige un adaptador de base de datos extra; la etiqueta "latest" de npm apuntaba a una versión de prueba (8.0.0-rc).
**Por qué:** cumple lo pedido (URL pooled + directa de Neon en el esquema), es lo que muestran la guía de Neon y casi todos los tutoriales, menos piezas para empezar.
**Pendiente:** evaluar la migración a Prisma 7 después del MVP, en su propia rama.

## 2026-10-26 · Content-Security-Policy básica hasta el Día 7
CSP sin nonces en `next.config.ts` (`'unsafe-inline'` en scripts y estilos; `'unsafe-eval'` solo en desarrollo).
**Por qué:** no rompe el modo desarrollo ni el prerenderizado estático. Se endurece el Día 7 con nonces cuando sepamos qué dominios externos (Vercel Blob, mapas) se necesitan.

## 2026-10-26 · Finales de línea LF en el repo (.gitattributes)
**Por qué:** si un compañero usa Windows y el otro no, Git puede marcar archivos enteros como cambiados solo por los saltos de línea (CRLF vs LF). Con `.gitattributes` todos quedan iguales.

## 2026-10-26 · Plan de seguridad ampliado
Se reescribe `ARQUITECTURA-Y-SEGURIDAD.md` con controles obligatorios por tema (roles y permisos, DAL, mass assignment, IDOR, cifrado, rate limiting, anti-bots, archivos, cabeceras, secretos, dependencias) y una tabla de qué aplicar cada día.
**Por qué:** es más barato construirlo seguro desde el Día 1 que corregirlo después.

## 2026-10-26 · Roles ADMIN y EDITOR con permisos
Autorización por permisos (`exigirPermiso('...')`), no por nombre de rol. Solo ADMIN ve datos personales de cotizaciones. Quien entra lo define la tabla `Usuario` (activo); `ADMIN_EMAILS` solo crea los primeros ADMIN.
**Por qué:** mínimo privilegio: quien solo actualiza el catálogo no necesita ver correos y teléfonos de clientes.
**Descartado:** un solo rol con lista `ADMIN_EMAILS` (todos verían todo).

## 2026-10-26 · Capa de Acceso a Datos (DAL) como única puerta a la base
Páginas y Server Actions no usan Prisma directamente; todo pasa por `src/lib/dal/` con `server-only`, permisos, `select` mínimo y DTOs.
**Por qué:** es la recomendación de la guía de seguridad de Next.js 16; las Server Actions se pueden llamar con un POST directo, así que la verificación debe estar junto a los datos.

## 2026-10-26 · Cifrado de correo, teléfono y NIT (AES-256-GCM)
Se cifran en la aplicación con `node:crypto`; `correoHash` (HMAC) permite buscar sin descifrar. Llaves `DATA_ENCRYPTION_KEY` e `IP_HASH_SECRET`, distintas por entorno y respaldadas en un gestor de contraseñas.
**Por qué:** una copia filtrada de la base o de un respaldo no expone datos de contacto.
**Descartado:** cifrar todos los campos (impide leer y gestionar cotizaciones sin ganancia real).

## 2026-10-26 · HMAC en vez de hash simple para IPs; IP desde Vercel
`IntentoEnvio(ipHash)` pasa a `IntentoLimitado(accion, clave)` con `clave = HMAC(IP_HASH_SECRET, ip)`. La IP se toma de la que entrega Vercel, no de `X-Forwarded-For`.
**Por qué:** un SHA-256 de una IPv4 se revierte por fuerza bruta en minutos; `X-Forwarded-For` lo puede falsificar el cliente. La misma tabla sirve para limitar el login.

## 2026-10-26 · Anti-bots: honeypot + trampa de tiempo + Cloudflare Turnstile
**Por qué:** capas gratuitas y casi invisibles para el usuario; Turnstile se verifica en el servidor.
**Descartado:** reCAPTCHA (cookies de Google, más fricción).

## 2026-10-26 · Roles de base de datos y ramas de Neon
La app usa el rol `fesapy_app` (solo SELECT/INSERT/UPDATE/DELETE); las migraciones, el rol dueño. Rama `main` de Neon para producción y `dev` para previews y local.
**Por qué:** si alguien lograra ejecutar SQL por la app, no podría alterar ni borrar tablas; las pruebas nunca tocan datos reales.

## 2026-10-26 · Row Level Security: no en el MVP
**Por qué:** el navegador nunca habla con la base, hay un solo rol de aplicación y no hay datos por usuario; la DAL cumple la función. Se activa si llegan cuentas de clientes o acceso directo a la base.

## 2026-10-26 · HSTS sin `preload` hasta tener dominio propio
**Por qué:** la lista de precarga es muy difícil de revertir; se agrega cuando el dominio sea definitivo.

## 2026-10-26 · Escaneo automático: Dependabot + CI con npm audit y gitleaks
**Por qué:** detecta dependencias vulnerables y secretos filtrados en cada PR. gitleaks cubre el secret scanning que GitHub puede no ofrecer gratis en repos privados.
**Regla:** ningún paquete nuevo sin propuesta y aprobación; versiones exactas (`save-exact`).

## 2026-10-26 · Mapas con enlace, no iframe
Cada sede tiene un enlace "Ver en Google Maps".
**Por qué:** un iframe agrega cookies de terceros, más dominios a la CSP y peso a la página.

## 2026-10-26 · No se instala el paquete `server-only`
Se usa `import "server-only"` en `env.ts` y `prisma.ts` sin instalar el paquete: Next.js 16 trae su propia copia y su documentación dice que instalarlo es opcional. Probado: un componente cliente que importa `env.ts` hace fallar el build.
**Por qué:** una dependencia menos que vigilar. Se instalaría solo si alguna regla de lint lo exige.

## 2026-10-26 · Override de `deepmerge-ts` a 8.0.2
`npm audit` marcaba 3 vulnerabilidades altas (GHSA-ggr8-5vv4-36mx) en `deepmerge-ts` < 8, que llega por `prisma` → `@prisma/config`. Como `@prisma/client` declara a `prisma` como peer dependency, npm lo cuenta como producción y `npm audit --omit=dev` fallaba. Se fuerza la 8.0.2 con `overrides` en `package.json`.
**Por qué:** Prisma solo usa `deepmerge()` simple sobre objetos de configuración; los cambios de la v8 (Maps, nombres de tipos, `deepmergeInto`) no lo afectan. Probado con `prisma validate`, `format` y `generate`.
**Descartado:** `npm audit fix --force` (sube a Prisma 7, ver decisión anterior); dejar la excepción documentada (la CI quedaría en rojo).
**Pendiente:** quitar el override cuando se migre a Prisma 7.10.1 o superior.

## 2026-10-26 · Variables de entorno: obligatorias según el día
`env.ts` exige desde ya `DATABASE_URL` (con `sslmode=require`), `AUTH_SECRET`, `DATA_ENCRYPTION_KEY` (32 bytes), `IP_HASH_SECRET` y `TURNSTILE_SECRET_KEY` (en local, llaves de prueba de Cloudflare). `RESEND_API_KEY` y `BLOB_READ_WRITE_TOKEN` son opcionales hasta el Día 4 y el Día 5.
**Por qué:** si se exigieran todas hoy, nadie podría correr `npm run dev` sin crear cuentas que aún no se usan.

## 2026-10-26 · Reglas de ESLint para seguridad
ESLint marca como error leer `process.env` fuera de `env.ts`, `env.client.ts` y `next.config.ts`, y usar `$queryRawUnsafe` o `$executeRawUnsafe`.
**Por qué:** las reglas de `CLAUDE.md` se cumplen solas en cada `npm run lint` y en la CI, sin depender de la memoria.

## 2026-10-26 · Acciones de GitHub fijadas por SHA
`ci.yml` usa `actions/checkout`, `actions/setup-node` y `gitleaks/gitleaks-action` por el SHA del commit, no por la etiqueta. Token de la CI en solo lectura.
**Por qué:** una etiqueta se puede mover a código malicioso si la acción se compromete; un SHA no. Dependabot las mantiene al día.

## 2026-10-26 · Permiso para cookies
Aviso de consentimiento con "Aceptar" y "Rechazar" igual de visibles; las cookies no esenciales (analítica, terceros) no se cargan hasta aceptar. Las necesarias (sesión del panel) no piden permiso. Tarea del Día 4 junto a la política de datos.
**Por qué:** la Ley 1581 exige autorización previa para tratar datos personales, y las cookies de analítica pueden recogerlos.
