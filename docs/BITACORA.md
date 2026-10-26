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
