# Pendientes de Paula

Lista en orden. Marca `[x]` cuando termines. Cada paso dice **qué hacer**, **para qué sirve** y **cómo funciona**, en corto.

> Tu papel en el proyecto: eres dueña del repo y de Vercel, y te encargas de **lo que se ve** (componentes, páginas, diseño, textos, pruebas en celular). Sebastián se encarga de **lo que va por debajo** (base de datos, seguridad, login). Cada uno revisa los PR del otro.
>
> **Cómo trabajas:** escribes el código tú misma y usas **Claude (el chat)** para investigar y resolver dudas. No usas Claude Code. Sebastián sí lo usa.

---

## 1. Pasar el repo a público (resuelve el bloqueo de Vercel)
- [x] Plan del equipo **fesapy** en Vercel: **Hobby** (confirmado).
- [x] Decisión: el repo pasa a **público** (anotada en `docs/DECISIONES.md`).
- [ ] GitHub → repo `fesapy_web` → **Settings → General** → abajo del todo, **Danger Zone → Change repository visibility → Change to public**. GitHub pide escribir el nombre del repo para confirmar.
- [ ] Ya público, en **Settings → Advanced Security** (puede llamarse *Code security*) activa:
  - **Dependabot alerts** y **Dependabot security updates**
  - **Secret scanning** y **Push protection**
  - **Code scanning → CodeQL → Default setup**
- [ ] **Settings → Rules → Rulesets** (o *Branches*): crea una regla para `main` que exija **Pull Request** antes de fusionar y que pasen las revisiones **"Lint, build y audit"** y **"Gitleaks"**. En repos públicos es gratis.
- [ ] Avísale a Sebastián cuando esté listo: él vuelve a subir un cambio al PR #6 y Vercel debería crear la vista previa.

**Qué pasaba:** Vercel no publicaba los commits de Sebastián porque su cuenta (`sebashooo`) no es miembro de tu equipo, y el plan **Hobby** no permite colaborar en repos **privados** ([documentación de Vercel](https://vercel.com/docs/deployments/troubleshoot-project-collaboration)). En repos **públicos** colaborar es gratis.
**Qué cambia:** cualquiera puede ver el código y **todo el historial**, incluidos los correos con los que se hicieron los commits. **No hay secretos en el repo**: gitleaks revisa todo el historial en cada PR, y `.env.local` nunca se sube. A cambio, GitHub da gratis el escaneo de secretos, el bloqueo al subir una clave por error (push protection) y CodeQL, que busca errores de seguridad en el código.
**Para recordar:** el plan Hobby de Vercel es solo para uso **no comercial**. Cuando la página de Fesapy salga oficialmente, revisen si hay que pasar a Pro (`ARQUITECTURA-Y-SEGURIDAD.md` §1).

---

## 2. Revisar y fusionar el PR #6 (base de datos)
- [ ] Abre https://github.com/pauladiaz0114/fesapy_web/pull/6 → pestaña **Files changed** → mira los cambios.
- [ ] Revisa especialmente `docs/PLAN.md`: Sebastián restauró tareas que se borraron sin querer en un commit anterior. Si algo lo quitaste a propósito, coméntalo en el PR.
- [ ] Si todo está bien: **Squash and merge** → **Confirm** → **Delete branch**. Lo que importa es que "Lint, build y audit" y "Gitleaks" estén en ✅.
- [ ] En tu computador: `git checkout main`, `git pull` y `npm ci` (instala lo necesario y prepara Prisma).

**Para qué:** este PR crea la base de datos del sitio (6 tablas) y agrega los comandos para manejarla.
**Cómo funciona:** un PR es una propuesta de cambios; tú la revisas antes de que pase a `main`, que es la versión oficial. "Squash" junta todos los commits en uno para que el historial quede limpio.

---

## 3. Recibir las claves de Sebastián
- [ ] Sebastián te manda por mensaje **directo y privado**:
  - Su `.env.local` con los valores de **development** (base de pruebas).
  - La `DATABASE_URL` de **production** con el rol `fesapy_app` (para Vercel).
- [ ] Cuando ya las hayas cargado (pasos 4 y 5), **borra el mensaje** en los dos lados y el archivo de tu carpeta de Descargas.

**Para qué:** son las llaves para conectarse a la base de datos.
**Cuidados:** nunca las subas al repo (ahora es **público**: lo vería cualquiera), ni las pegues en issues, comentarios de PR ni en Claude. Si alguna se filtra, avisa a Sebastián de inmediato: hay que cambiarla en Neon (rotarla). Borrar el mensaje no basta.

---

## 4. Crear tu `.env.local`
- [ ] En tu carpeta: `copy .env.example .env.local` y ábrelo con VS Code (`code .env.local`). No uses el Bloc de notas: le agrega `.txt` al nombre y entonces no funciona.
- [ ] Pega los valores de **development** que te mandó Sebastián: `DATABASE_URL`, `DIRECT_URL`, `DATA_ENCRYPTION_KEY` e `IP_HASH_SECRET`.
- [ ] `AUTH_SECRET` la generas **tú** (es distinta para cada persona; no uses la de Sebastián). En la terminal:
  `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- [ ] Turnstile: usa las llaves de **prueba** de Cloudflare (siempre aprueban, solo para local):
  `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` y `NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA`
- [ ] **Borra** las líneas `RESEND_API_KEY=` y `BLOB_READ_WRITE_TOKEN=` si quedan vacías: la app rechaza esas variables vacías (se usan desde el Día 4 y 5).
- [ ] Prueba (después de fusionar el PR #6): `npm run db:estado` debe decir *"Database schema is up to date!"*. Usa siempre `npm run db:...`, no `npx prisma ...`: Prisma solo no lee `.env.local`.

**Para qué:** `.env.local` guarda las claves que tu computador necesita para conectarse a la base de datos de pruebas (`development`).
**Cómo funciona:** este archivo **nunca se sube a GitHub** (está en `.gitignore`). Tú y Sebastián usan las **mismas** `DATA_ENCRYPTION_KEY` e `IP_HASH_SECRET` de development, porque comparten la misma base de pruebas: si no, uno no podría leer los datos que cifró el otro.

---

## 5. Cargar las variables en Vercel
- [ ] Vercel → tu proyecto del sitio → **Settings → Environment Variables**. Cada variable: marca **solo** su entorno y activa **Sensitive** (así nadie puede volver a leer el valor desde Vercel).
- [ ] **Preview** (base `development`):
  - `DATABASE_URL`: la misma de tu `.env.local` (rol `fesapy_app`).
  - `DATA_ENCRYPTION_KEY` e `IP_HASH_SECRET`: las **mismas** de tu `.env.local` (misma base = misma llave).
  - `AUTH_SECRET`: una **nueva** (genérala con el comando del paso 4).
  - Turnstile: las llaves de prueba.
- [ ] **Production** (base `production`):
  - `DATABASE_URL`: la de `production` con el rol **`fesapy_app`** que te mandó Sebastián (nunca con `neondb_owner`).
  - `AUTH_SECRET`, `DATA_ENCRYPTION_KEY` e `IP_HASH_SECRET`: **nuevas**, generadas por ti con el comando del paso 4.
  - Turnstile: llaves de prueba por ahora; las reales de Cloudflare antes de publicar el formulario (Día 4).
- [ ] **Guarda una copia de la `DATA_ENCRYPTION_KEY` de Production fuera de Vercel**, por ejemplo como contraseña en el gestor de tu navegador o de tu celular, y pásale otra copia a Sebastián por mensaje privado (luego bórrenlo). Como la marcaste *Sensitive*, Vercel no deja volver a verla, y **si se pierde, los datos cifrados no se recuperan**.
- [ ] **No** se cargan en Vercel: `DIRECT_URL` (solo sirve en el computador para crear tablas; si se filtrara permitiría borrarlas), `ADMIN_EMAILS` (solo la usa un script local), `RESEND_API_KEY` y `BLOB_READ_WRITE_TOKEN` (llegan el Día 4 y 5).

**Para qué:** la página publicada también necesita las claves para conectarse a la base.
**Cómo funciona:** *Production* es la página oficial (rama `main`); *Preview* son las vistas previas de cada PR. Production usa la rama `production` de Neon y Preview la rama `development`, para que las pruebas nunca toquen datos reales. El detalle está en `docs/DECISIONES.md` (2026-11-01, llega con el PR #6).

---

## 6. Proteger las vistas previas
- [ ] Vercel → **Settings → Deployment Protection** → activar para **Preview**.

**Para qué:** que solo ustedes vean las versiones en prueba. La página principal (el dominio de producción `.vercel.app`) sí queda pública.
**Ojo:** las vistas previas protegidas solo las abren los miembros del equipo de Vercel, y en Hobby Sebastián no puede ser miembro. Para que él pruebe un PR desde su celular, revisen en **Deployment Protection** la opción de compartir el enlace de esa vista previa.

---

## 7. Verificación en dos pasos (2FA)
- [x] GitHub → Settings → **Password and authentication** → 2FA activado.
- [x] Vercel → 2FA activado.
- [ ] Más adelante: también en Resend y Cloudflare cuando se creen esas cuentas.

**Para qué:** aunque alguien consiga tu contraseña, no puede entrar sin el código de tu celular. Como eres la dueña del repo y de Vercel, esto protege todo el proyecto.

---

## 8. Configurar el repo en GitHub
- [ ] GitHub → **Settings → General → Pull Requests**: deja marcado **solo** "Allow squash merging" y activa **"Automatically delete head branches"**.

**Para qué:** que todos los PR se fusionen igual (historial limpio) y que las ramas terminadas se borren solas.

---

## 9. Definir el amarillo del logo
- [ ] Busca el logo original de Fesapy (idealmente en SVG o PNG de buena calidad) y compártelo con Sebastián.
- [ ] Decidan cuál amarillo queda: `#FFC400` (el de `CLAUDE.md`) o `#FFD100` (el que tiene hoy el sitio).
- [ ] Igual con el gris: `CLAUDE.md` dice `#F4F4F4` (fondo de sección) y el sitio tiene `#4A4A4A` (texto secundario). Pueden quedar los dos con nombres distintos (por ejemplo `--gris-fondo` y `--gris-texto`).

**Para qué:** tus componentes van a usar ese color en todo el sitio. Si se define después, toca rehacerlos.

---

## 10. Tu primera tarea de código (Día 2)
Cuando los pasos 2 y 9 estén listos.

**Antes de empezar:** hoy `PLAN.md` asigna Header, Footer y botón de WhatsApp a la persona **A (Sebastián)**. Si ahora los haces tú, acuérdenlo y cambien la letra en `PLAN.md` (paso b), para no hacer el mismo trabajo dos veces.

**a) Ponerte al día** (en la terminal de VS Code, dentro de la carpeta del proyecto):
```
git checkout main
git pull
npm ci
```

**b) Tomar la tarea** (lo único que se sube directo a `main`, según `COLABORACION.md`): en `docs/PLAN.md` cambia `[ ]` por `[~] (Paula)` en tus tareas y luego:
```
git add docs/PLAN.md
git commit -m "docs: tomo tareas de componentes (Paula)"
git push
```

**c) Crear tu rama y abrir el sitio:**
```
git checkout -b feat/componentes-base
npm run dev
```
Abre http://localhost:3000. Cada vez que guardes un archivo, la página se actualiza sola.

**d) Qué construir:**
1. En `src/components/ui/`: `Boton` (variantes amarillo y negro), `Tarjeta`, `Input` y `TituloSeccion`.
2. En `src/components/sitio/`: `Header` con menú responsive (hamburguesa en celular) y `Footer` con sedes y redes. Donde falten datos reales, escribe `TODO(contenido): ...` visible.
3. Botón flotante de WhatsApp (número como `TODO(contenido)`, texto con `encodeURIComponent`).
4. Úsalos en `src/app/layout.tsx` y en la página de inicio provisional.

Reglas de diseño (en `CLAUDE.md`, sección *Diseño*): nunca texto amarillo sobre fondo blanco, Barlow Condensed en títulos (mayúsculas, peso 700), colores con las clases de los tokens (`bg-amarillo`, `text-negro`…), mobile first (diseña primero para celular).

**e) Antes de subir** (las dos deben terminar sin errores; la CI las vuelve a correr en el PR):
```
npm run lint
npm run build
```

**f) Documentar:** agrega tu entrada arriba en `docs/BITACORA.md` (el formato está al inicio de ese archivo) y marca tus tareas `[x]` en `docs/PLAN.md`.

**g) Subir y abrir el PR:**
```
git add .
git commit -m "feat: componentes base, header, footer y botón de WhatsApp"
git push -u origin feat/componentes-base
```
En GitHub aparece el botón **Compare & pull request**. Describe qué hiciste, agrega capturas de celular y pídele revisión a Sebastián.

**Cómo usar Claude (el chat) para investigar:**
- Dile siempre la versión del proyecto: *"Uso Next.js 16 con App Router, React 19, TypeScript estricto y Tailwind CSS v4 (los colores van con `@theme` en `globals.css`)"*. Claude a veces responde con versiones viejas: si algo no funciona, revisa la guía oficial que viene en el proyecto, en `node_modules/next/dist/docs/`.
- Para un error, pega el mensaje completo y el pedazo de código donde ocurre.
- Puedes pegarle las reglas de `CLAUDE.md` para que sus sugerencias las respeten.
- **Nunca** le pegues el contenido de `.env.local` ni ninguna clave.

**Para qué:** son las piezas visuales que usarán todas las páginas.
**Cómo funciona:** trabajas en una **rama** (una copia aparte), así no afectas `main` ni el trabajo de Sebastián. Al final abres un PR; él lo revisa con el link de vista previa desde el celular.

---

## Reglas para no olvidar
- Nunca trabajes directo en `main`: siempre en una rama (la única excepción es tomar una tarea en `PLAN.md`).
- Antes de empezar cada día: `git checkout main` y `git pull`.
- El repo es **público**: nunca subas contraseñas, claves ni `.env.local`. Antes de cada commit, mira qué vas a subir con `git status`.
- Nunca pegues contraseñas ni el contenido de `.env.local` en chats (ni en WhatsApp ni en Claude).
- Si algo falla, copia el mensaje de error (sin claves) y pregúntale a Claude qué significa.
