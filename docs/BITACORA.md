# Bitácora

Claude Code agrega una entrada al terminar cada tarea, la más reciente arriba.

Formato:
```
## AAAA-MM-DD — Título de la tarea (quién)
**Qué se hizo:** …
**Archivos:** …
**Conceptos aprendidos:** … (explicación sencilla)
**Pendientes / notas:** …
```

---

## 2026-11-01 — Lista de pendientes para Paula (Sebastián con Claude Code)
**Qué se hizo:** (rama `docs/pendientes-paula`) se agregó `docs/PENDIENTES-PAULA.md` (Vercel, PR #6, Bitwarden, `.env.local`, variables de Vercel, Deployment Protection, 2FA, colores y primera tarea) y un enlace en `COLABORACION.md`. Se corrigió según la documentación de Vercel (en Hobby no se puede invitar en repos privados), las llaves por rama de Neon, qué variables no van en Vercel, la variable vacía que `env.ts` rechaza y el reparto de tareas del Día 2.
**Archivos:** `docs/PENDIENTES-PAULA.md`, `docs/COLABORACION.md`.
**Conceptos aprendidos:** *conflicto evitable:* el enlace va en `COLABORACION.md` y no en `PLAN.md` porque el PR #6 cambia muchas líneas de `PLAN.md`.
**Actualización (mismo día):** el equipo de Vercel es Hobby → se decide **repo público** (pasos para hacerlo y activar secret scanning, push protection, CodeQL y protección de `main`). Paula ya activó 2FA en GitHub y Vercel. Sin Bitwarden por ahora: las claves se envían por mensaje directo y se borran después. Paula no usa Claude Code: el paso 10 pasó a ser una guía manual (git, `npm run dev`, lint, build, PR) con consejos para investigar con Claude en el chat. Se actualizaron `CLAUDE.md`, `COLABORACION.md` y `ARQUITECTURA-Y-SEGURIDAD.md` (§6.16, §6.17, §6.20).
**Pendientes / notas:** Paula pasa el repo a público. Después de fusionar el PR #6: cambiar "privado" en la tarea del Día 1 de `PLAN.md` y la línea de Bitwarden de `DECISIONES.md` (se dejaron para evitar conflictos).

## 2026-11-01 — Página de inicio simple (Sebastián con Claude Code)
**Qué se hizo:** (rama `feat/pagina-inicio`)
- Colores: `--dorado: #E8B53E` (del logo) reemplaza a `--amarillo`, y se agregó `--crema: #F5F4F0`. Se actualizaron `CLAUDE.md` (colores, nombre "Fesapy Distribuciones", una sola sede) y `BRIEF.md`.
- `src/lib/contenido.ts` (nombre, lema, ciudad; WhatsApp y correo como `TODO(contenido)`) y `src/lib/whatsapp.ts` (enlace `wa.me` con mensaje prellenado y `encodeURIComponent`).
- Página de inicio sin menú: encabezado negro con logo y botón dorado, portada crema con collage 2x2, "Lo que ofrecemos" (4 puntos), "Sectores que atendemos" (3 tarjetas), franja dorada, pie de página y botón flotante de WhatsApp con `aria-label`.
- 4 fotos de referencia de Pexels optimizadas en `public/referencia/` y `docs/CREDITOS-IMAGENES.md`.
- Metadata de la página (título y descripción); `lang="es-CO"` ya estaba.
- Verificado: lint y build sin errores, página estática, un solo `h1`, enlaces con `noopener noreferrer`, CSP sin cambios, capturas en celular y escritorio.

**Archivos:** `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/lib/contenido.ts`, `src/lib/whatsapp.ts`, `src/components/ui/` (BotonWhatsApp, iconos), `src/components/sitio/` (Encabezado, Logo, PiePagina, WhatsAppFlotante), `src/components/inicio/` (Portada, CollageFotos, LoQueOfrecemos, Sectores, FranjaCotizar), `public/marca/`, `public/referencia/`, `CLAUDE.md`, `docs/BRIEF.md`, `docs/CREDITOS-IMAGENES.md`, `docs/PLAN.md`, `docs/DECISIONES.md`.

**Conceptos aprendidos:**
- *`encodeURIComponent`:* convierte espacios, tildes y saltos de línea en códigos que una URL acepta (`%20`, `%0A`). Sin eso el mensaje de WhatsApp llega cortado.
- *`rel="noopener noreferrer"`:* la pestaña que se abre no puede controlar nuestra página ni saber de dónde venía.
- *Importación estática de imágenes:* `import foto from ".../foto.webp"` le dice a Next.js el tamaño exacto; reserva el espacio y la página no "salta" al cargar.
- *`sizes` en `next/image`:* le dice al navegador qué tan grande se verá la foto para que descargue la versión justa, no la gigante.
- *Contraste AA:* el texto debe tener al menos 4,5:1 con su fondo para leerse bien. Por eso el dorado nunca va como texto sobre blanco.
- *Mobile first:* las clases sin prefijo son para celular; `sm:` y `lg:` cambian el diseño en pantallas más grandes.

**Pendientes / notas:**
- Datos de contacto agregados el mismo día en `src/lib/contenido.ts`: WhatsApp `573123329422` (en el pie de página: +57 312 332 9422) y correo `asistente.fesapy@gmail.com`.
- Reemplazar las fotos de referencia por fotos propias (sobre todo un overol con logo bordado) y conseguir el logo en SVG o PNG transparente.
- `PLAN.md` todavía menciona 3 sedes en la tarea de contacto del Día 4; ajustar cuando se replanifique.

---

## 2026-11-01 — Día 1: base de datos en Neon y primera migración (Sebastián con Claude Code)
**Qué se hizo:** (rama `chore/primera-migracion`)
- `env.local.txt` (creado con el Bloc de notas) se renombró a `.env.local`: con el nombre anterior Git no lo ignoraba y Prisma/Next.js no lo leían.
- Scripts `npm run db:migrar`, `db:estado` y `db:studio`, que cargan `.env.local` (la CLI de Prisma solo lee `.env`).
- Primera migración `20261101153708_inicial` aplicada en la rama `production` de Neon: 2 enums, 6 tablas, 7 índices y la relación Producto → Categoria.
- Rol `fesapy_app` creado **con SQL** (no por la consola, que lo haría miembro de `neon_superuser`), con solo SELECT/INSERT/UPDATE/DELETE, permisos por defecto para tablas futuras y sin acceso a `_prisma_migrations`.
- Rama `development` creada desde `production`, con contraseñas propias para `fesapy_app` y `neondb_owner`.
- `.env.local` apunta a `development`: `DATABASE_URL` con `fesapy_app` (pooled) y `DIRECT_URL` con `neondb_owner` (directa), ambas con `sslmode=require`; secretos generados con Node; llaves de prueba de Turnstile.
- Verificado: `env.ts` acepta `.env.local`; `development` tiene la migración; `fesapy_app` lee las 6 tablas pero no puede crear, borrar, alterar ni vaciar tablas, leer `_prisma_migrations` ni crear roles (prueba con ROLLBACK, sin tocar datos); Prisma Studio muestra las tablas.
- Se restauraron en `PLAN.md` las marcas `[x]` y la tarea de cookies que un commit anterior había revertido.

**Archivos:** `package.json`, `prisma/migrations/`, `CLAUDE.md`, `.env.example`, `docs/ARQUITECTURA-Y-SEGURIDAD.md`, `docs/COLABORACION.md`, `docs/DECISIONES.md`, `docs/PLAN.md`.

**Conceptos aprendidos:**
- *Migración:* archivo SQL versionado que lleva la base de "como está" a "como dice el esquema". Se sube a Git; `_prisma_migrations` registra cuáles ya se aplicaron.
- *Rama de Neon:* copia instantánea de la base para probar sin tocar producción.
- *Mínimo privilegio en la base:* la app usa un rol que solo maneja datos; la estructura solo la cambia el dueño.
- *Transacción y ROLLBACK:* agrupa cambios y permite deshacerlos todos; así se probó el bloqueo de `DROP TABLE` sin riesgo.
- *Llave por base de datos:* quien comparte una base debe compartir la llave de cifrado, o no podrá leer lo que cifraron los demás.

**Pendientes / notas:**
- Paula: conectar Vercel y cargar variables (Production → `production`, Preview → `development`) según DECISIONES 2026-11-01; activar Deployment Protection.
- Compartir con Paula, por Bitwarden, las contraseñas de `fesapy_app` y las llaves de `development`.
- Guardar la `DIRECT_URL` de `production` en el gestor de contraseñas (para `migrate deploy` futuros).
- Turnstile real en Production antes de publicar el formulario (Día 4).

---

## 2026-10-26 — Día 1: seguridad base (Sebastián con Claude Code)
**Qué se hizo:** (rama `chore/seguridad-base`)
- Commit de los documentos nuevos: `CLAUDE.md` de Fesapy y plan de seguridad ampliado.
- Esquema Prisma (sin migrar): `Cotizacion` con `nitCifrado`, `correoCifrado`, `correoHash`, `telefonoCifrado` y `politicaVersion`; `IntentoEnvio` reemplazado por `IntentoLimitado` (enum `AccionLimitada`: COTIZACION | LOGIN, `clave` HMAC).
- `src/lib/env.ts`: única lectura de `process.env` en el servidor, validada con Zod, con `import "server-only"`. Los errores muestran solo nombres de variables, nunca valores. `src/lib/env.client.ts` solo con `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. `prisma.ts` usa `env.DATABASE_URL` y tiene `server-only`.
- ESLint prohíbe `process.env` fuera de los archivos de entorno y `$queryRawUnsafe` / `$executeRawUnsafe`.
- `next.config.ts`: HSTS sin `preload`, `Cross-Origin-Opener-Policy: same-origin`, Permissions-Policy con `payment=()` y `usb=()`.
- `.npmrc` con `save-exact=true` y todas las versiones de `package.json` exactas.
- `.env.example` con `DATA_ENCRYPTION_KEY`, `IP_HASH_SECRET`, `TURNSTILE_SECRET_KEY` y `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, y cómo generar cada una.
- `.github/dependabot.yml` (npm y Actions, semanal, agrupado) y `.github/workflows/ci.yml` (`npm ci` → lint → build → `npm audit --audit-level=high --omit=dev` + gitleaks), con las acciones fijadas por SHA.
- `npm audit` encontró 3 vulnerabilidades altas en `deepmerge-ts` (vía Prisma 6) → override a 8.0.2 (ver DECISIONES).
- Verificado: build, lint y `npm audit` (completo y de producción) sin errores; gitleaks 8.30.1 sobre todo el historial sin hallazgos; un componente cliente que importa `env.ts` rompe el build; ESLint detecta `process.env` y `$queryRawUnsafe`; `env.ts` rechaza variables faltantes o mal formadas sin mostrar valores.

**Archivos:** `prisma/schema.prisma`, `src/lib/env.ts`, `src/lib/env.client.ts`, `src/lib/prisma.ts`, `eslint.config.mjs`, `next.config.ts`, `.npmrc`, `package.json`, `package-lock.json`, `.env.example`, `.github/dependabot.yml`, `.github/workflows/ci.yml`, `docs/PLAN.md`, `docs/DECISIONES.md`.

**Conceptos aprendidos:**
- *Cifrado vs. hash:* lo cifrado se puede descifrar con la llave (correo, teléfono); un hash/HMAC no se revierte, pero sirve para comparar y buscar (`correoHash`).
- *HMAC:* un hash que además usa un secreto. Sin el secreto nadie puede calcularlo, así que no se puede "adivinar" una IP probando todas.
- *`server-only`:* marca un archivo como exclusivo del servidor; si llega al navegador, el build falla.
- *Versiones exactas y lockfile:* todos instalan exactamente lo mismo; las actualizaciones son PRs deliberados (Dependabot).
- *CI:* revisión automática en cada PR; si falla, no se fusiona.
- *Override de npm:* fuerza la versión de una sub-dependencia sin cambiar el paquete que la trae.
- *Fijar acciones por SHA:* la etiqueta `v7` se puede mover; el SHA identifica un código exacto.

**Pendientes / notas:**
- La CI corre por primera vez al subir el repo a GitHub: revisar que quede en verde.
- Instalar gitleaks en cada computador: `winget install Gitleaks.Gitleaks` (opcional: como pre-commit local).
- Generar los secretos locales (`AUTH_SECRET`, `DATA_ENCRYPTION_KEY`, `IP_HASH_SECRET`) y guardar `DATA_ENCRYPTION_KEY` de Production en un gestor de contraseñas.
- ⚠️ Colores: `CLAUDE.md` define `--amarillo: #FFC400` y `--gris: #F4F4F4`, pero `globals.css` tiene `#ffd100` y `#4a4a4a` (gris para texto). Decidir cuál queda y alinear en otra tarea.
- Quitar el override de `deepmerge-ts` al migrar a Prisma 7.

---

## 2026-10-26 — Día 1: base del proyecto (Sebastián con Claude Code)
**Qué se hizo:**
- Proyecto Next.js **16.4.3** (React 19.3, Tailwind v4, ESLint, App Router, `src/`), creado en una carpeta temporal y movido aquí sin tocar `CLAUDE.md` ni `docs/`.
- `tsconfig.json` con `"strict": true` (ya venía activado).
- Prisma 6.19.3 + Zod 4. Esquema `prisma/schema.prisma` con Categoria, Producto, Cliente, Testimonio, Cotizacion (con `aceptaDatosEn`) e IntentoEnvio (`ipHash`). Sin tablas de Auth.js. **No se corrieron migraciones** (aún no hay base de datos).
- `src/lib/prisma.ts`: cliente único (singleton) para no agotar conexiones en desarrollo.
- Script `postinstall: prisma generate` para que Vercel siempre genere el cliente.
- `.env.example` con nombres y comentarios, sin valores. `.gitignore` ignora `.env*` excepto `.env.example`.
- Tokens `--amarillo`, `--negro`, `--gris` (+ `--blanco`) en `globals.css` con `@theme`; fuentes Barlow y Barlow Condensed con `next/font/google`; página provisional "Fesapy — sitio en construcción" en negro y amarillo.
- Cabeceras de seguridad en `next.config.ts` (HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP básica) y se quitó `X-Powered-By`.
- `.gitattributes` (finales de línea LF) y README en español.
- Verificado: `npm run build` y `npm run lint` sin errores; cabeceras presentes con `next start`; fuentes servidas desde el propio sitio.

**Archivos:** `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `.gitignore`, `.gitattributes`, `.env.example`, `README.md`, `AGENTS.md`, `prisma/schema.prisma`, `src/lib/prisma.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `docs/PLAN.md`, `docs/DECISIONES.md`.

**Conceptos aprendidos:**
- *ORM (Prisma):* traduce entre TypeScript y la base de datos; evita escribir SQL a mano y con eso la inyección SQL.
- *URL pooled vs. directa (Neon):* la pooled reparte pocas conexiones entre muchas visitas (ideal para Vercel); la directa la usa Prisma para crear tablas (migraciones).
- *Singleton:* una sola instancia compartida de algo, aquí el cliente de la base de datos.
- *Design tokens:* nombres para los colores y fuentes de marca; se cambian en un solo lugar.
- *Cabeceras de seguridad / CSP:* instrucciones al navegador sobre qué puede cargar y ejecutar la página.

**Pendientes / notas:**
- A mano: repo privado en GitHub + colaboradora, 2FA, secret scanning, push protection, Dependabot; base en Neon; conectar Vercel y cargar variables (Production y Preview).
- Primera migración cuando exista Neon: `npx prisma migrate dev --name inicial` (una sola persona).
- Día 7: endurecer la CSP.
- ⚠️ `CLAUDE.md` contiene las instrucciones de **otro proyecto** ("Content Studio"), no de Fesapy. Hay que reemplazarlo por el correcto (en una rama `docs/claude-md`).
- `AGENTS.md` lo genera Next.js 16 para los asistentes de IA: avisa que esta versión de Next.js cambió y que hay que leer la documentación incluida en `node_modules/next/dist/docs/`.
