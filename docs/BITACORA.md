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
