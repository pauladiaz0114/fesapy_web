# Pendientes de Paula

Lista en orden. Marca `[x]` cuando termines. Cada paso dice **qué hacer**, **para qué sirve** y **cómo funciona**, en corto.

> Tu papel en el proyecto: eres dueña del repo y de Vercel, y te encargas de **lo que se ve** (componentes, páginas, diseño, textos, pruebas en celular). Sebastián se encarga de **lo que va por debajo** (base de datos, seguridad, login). Cada uno revisa los PR del otro.

---

## 1. Resolver el bloqueo de Vercel (urgente)
- [ ] Vercel → equipo **fesapy** → **Settings → Billing**: mira qué plan tiene (Hobby, Pro o "Pro Trial").
- [ ] Con esa información, decidan juntos una opción (abajo) y anótenla en `docs/DECISIONES.md`.

**Qué pasa:** Vercel no quiere publicar los commits de Sebastián porque su cuenta (`sebashooo`) no es miembro de tu equipo de Vercel. Por eso el PR #6 muestra ❌ en Vercel, aunque el código está bien.

**Lo que dice Vercel** ([documentación](https://vercel.com/docs/deployments/troubleshoot-project-collaboration)): en el plan **Hobby** no se puede colaborar en repos **privados**; solo se publican los commits de la dueña del equipo. En **Pro** cada miembro paga su asiento. En repos **públicos** colaborar es gratis.

**Opciones:**
| Opción | Ventaja | Cuidado |
|---|---|---|
| Invitar a Sebastián al equipo (Settings → Members) | Todo funciona normal | **En Hobby no se puede**: hay que pasar a Pro y cada miembro paga su asiento. Si es un "Pro Trial", al terminar la prueba empieza a cobrar |
| Dejar el repo **público** en GitHub | Gratis en Vercel; GitHub da gratis secret scanning, push protection y CodeQL | Cualquiera ve el código y **todo el historial**, incluidos los correos de los autores de los commits. No hay secretos en el repo (gitleaks lo revisa). Hay que avisar a la dueña de Fesapy y actualizar "repo privado" en `ARQUITECTURA-Y-SEGURIDAD.md` §6.20 y `COLABORACION.md` §8 |
| No hacer nada | — | Las vistas previas de los PR de Sebastián fallan, y como "Squash and merge" deja el commit a nombre de quien abrió el PR, también puede fallar la publicación de `main` |

**Cómo funciona:** Vercel publica la página cada vez que llega un commit a GitHub, pero primero revisa que el autor del commit tenga permiso en el equipo de Vercel.

---

## 2. Revisar y fusionar el PR #6 (base de datos)
- [ ] Abre https://github.com/pauladiaz0114/fesapy_web/pull/6 → pestaña **Files changed** → mira los cambios.
- [ ] Revisa especialmente `docs/PLAN.md`: Claude Code restauró tareas que se borraron sin querer en un commit anterior. Si algo lo quitaste a propósito, coméntalo en el PR.
- [ ] Si todo está bien: **Squash and merge** → **Confirm** → **Delete branch**. El ❌ de Vercel no impide fusionar (es el bloqueo del paso 1); lo que importa es que "Lint, build y audit" y "Gitleaks" estén en ✅.
- [ ] En tu computador: `git checkout main`, `git pull` y `npm ci` (instala lo necesario y prepara Prisma).

**Para qué:** este PR crea la base de datos del sitio (6 tablas) y agrega los comandos para manejarla.
**Cómo funciona:** un PR es una propuesta de cambios; tú la revisas antes de que pase a `main`, que es la versión oficial. "Squash" junta todos los commits en uno para que el historial quede limpio.

---

## 3. Crear tu cuenta en Bitwarden (gestor de contraseñas)
- [ ] Crea una cuenta gratis en bitwarden.com e instala la extensión del navegador o la app. Usa una contraseña maestra larga que no uses en ningún otro lado: si la olvidas, Bitwarden no puede recuperarla.
- [ ] Activa la verificación en dos pasos de Bitwarden (Settings → Security → Two-step login).
- [ ] Pásale a Sebastián el correo de tu cuenta: él crea una **organización gratuita** (permite 2 personas) con una colección "Fesapy" y te invita. Ahí quedan las claves compartidas.

**Para qué:** las contraseñas de la base de datos y las llaves secretas **nunca** se mandan por WhatsApp ni se pegan en chats. Bitwarden las guarda cifradas y permite compartirlas de forma segura.

---

## 4. Crear tu `.env.local` (cuando Sebastián te comparta las claves)
- [ ] En tu carpeta: `copy .env.example .env.local` y ábrelo con VS Code (`code .env.local`). No uses el Bloc de notas: le agrega `.txt` al nombre y entonces no funciona.
- [ ] Pega los valores de **development** que te compartió Sebastián por Bitwarden: `DATABASE_URL`, `DIRECT_URL`, `DATA_ENCRYPTION_KEY` e `IP_HASH_SECRET`.
- [ ] `AUTH_SECRET` la generas **tú** (es distinta para cada persona). En la terminal:
  `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- [ ] Turnstile: usa las llaves de **prueba** de Cloudflare (siempre aprueban, solo para local):
  `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` y `NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA`
- [ ] **Borra** las líneas `RESEND_API_KEY=` y `BLOB_READ_WRITE_TOKEN=` si quedan vacías: la app rechaza esas variables vacías (se usan desde el Día 4 y 5).
- [ ] Prueba (después de fusionar el PR #6): `npm run db:estado` debe decir *"Database schema is up to date!"*. Usa siempre `npm run db:...`, no `npx prisma ...`: Prisma solo no lee `.env.local`.

**Para qué:** `.env.local` guarda las claves que tu computador necesita para conectarse a la base de datos de pruebas (`development`).
**Cómo funciona:** este archivo **nunca se sube a GitHub** (está en `.gitignore`). Tú y Sebastián usan las **mismas** `DATA_ENCRYPTION_KEY` e `IP_HASH_SECRET` de development, porque comparten la misma base de pruebas: si no, uno no podría leer los datos que cifró el otro.

---

## 5. Cargar las variables en Vercel (con Sebastián)
- [ ] Vercel → tu proyecto del sitio → **Settings → Environment Variables**. Cada variable: marca **solo** su entorno y activa **Sensitive** (así nadie puede volver a leer el valor).
- [ ] **Preview** (base `development`):
  - `DATABASE_URL`: la misma de tu `.env.local` (rol `fesapy_app`).
  - `DATA_ENCRYPTION_KEY` e `IP_HASH_SECRET`: las **mismas** de tu `.env.local` (misma base = misma llave).
  - `AUTH_SECRET`: una **nueva** (genérala con el comando del paso 4).
  - Turnstile: las llaves de prueba.
- [ ] **Production** (base `production`):
  - `DATABASE_URL`: la de `production` con el rol **`fesapy_app`** que te comparte Sebastián (nunca con `neondb_owner`).
  - `AUTH_SECRET`, `DATA_ENCRYPTION_KEY` e `IP_HASH_SECRET`: **nuevas**, generadas por ti. Guarda la `DATA_ENCRYPTION_KEY` en Bitwarden: **si se pierde, los datos cifrados no se recuperan**.
  - Turnstile: llaves de prueba por ahora; las reales de Cloudflare antes de publicar el formulario (Día 4).
- [ ] **No** se cargan en Vercel: `DIRECT_URL` (solo sirve en el computador para crear tablas; si se filtrara permitiría borrarlas), `ADMIN_EMAILS` (solo la usa un script local), `RESEND_API_KEY` y `BLOB_READ_WRITE_TOKEN` (llegan el Día 4 y 5).

**Para qué:** la página publicada también necesita las claves para conectarse a la base.
**Cómo funciona:** *Production* es la página oficial (rama `main`); *Preview* son las vistas previas de cada PR. Production usa la rama `production` de Neon y Preview la rama `development`, para que las pruebas nunca toquen datos reales. El detalle está en `docs/DECISIONES.md` (2026-11-01, llega con el PR #6).

---

## 6. Proteger las vistas previas
- [ ] Vercel → **Settings → Deployment Protection** → activar para **Preview**.

**Para qué:** que solo ustedes vean las versiones en prueba. La página principal (el dominio de producción `.vercel.app`) sí queda pública.
**Ojo:** las vistas previas protegidas solo las abren los miembros del equipo de Vercel. Si Sebastián no es miembro (paso 1), él no podrá verlas.

---

## 7. Verificación en dos pasos (2FA)
- [ ] GitHub → Settings → **Password and authentication** → activar 2FA.
- [ ] Vercel → Settings → activar 2FA.
- [ ] Bitwarden: ya quedó en el paso 3. Más adelante, también en Resend y Cloudflare cuando se creen esas cuentas.

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
Cuando los pasos 2 y 9 estén listos:
```
cd ~\Documents\fesapy-web
git checkout main
git pull
npm ci
claude
```
Y pégale a Claude Code:
```
Estoy en main recién actualizado. Lee CLAUDE.md, docs/PLAN.md y docs/COLABORACION.md.
Soy Paula. Vamos a hacer mis tareas del Día 2 que no dependen de la base de datos:
0. Primero, según COLABORACION.md: marca en PLAN.md mis tareas con [~] (Paula), haz
   commit y push de ese cambio a main.
1. Crea la rama feat/componentes-base.
2. Componentes en src/components/ui/: Boton (variantes amarillo y negro), Tarjeta,
   Input y TituloSeccion, siguiendo el diseño de CLAUDE.md (nunca texto amarillo
   sobre blanco, Barlow Condensed en títulos, mobile first).
3. Header con menú responsive (hamburguesa en celular) y Footer con sedes y redes en
   src/components/sitio/. Donde falten datos reales usa TODO(contenido).
4. Botón flotante de WhatsApp (número como TODO(contenido), texto con encodeURIComponent).
5. Úsalos en el layout y en la página de inicio provisional.
Explícame cada paso en español sencillo. Antes de terminar ejecuta npm run dev y dime
cómo verlo en el navegador. Al final: npm run lint y npm run build sin errores, entrada
en BITACORA.md, tareas marcadas en PLAN.md, commit y push de la rama, y dime cómo abrir
el Pull Request.
```

**Antes de empezar:** hoy `PLAN.md` asigna Header, Footer y botón de WhatsApp a la persona **A (Sebastián)**. Si ahora los haces tú, acuérdenlo y cambien la letra en `PLAN.md` en el paso 0, para no hacer el mismo trabajo dos veces.

**Para qué:** son las piezas visuales que usarán todas las páginas.
**Cómo funciona:** Claude Code trabaja en una **rama** (una copia aparte), así no afectas `main` ni el trabajo de Sebastián. Al final abres un PR; él lo revisa con el link de vista previa desde el celular.

---

## Reglas para no olvidar
- Nunca trabajes directo en `main`: siempre en una rama.
- Antes de empezar cada día: `git checkout main` y `git pull`.
- Nunca pegues contraseñas ni el contenido de `.env.local` en chats (ni en WhatsApp ni en Claude).
- Si algo falla, copia el mensaje de error (sin claves) y pregúntale a Claude Code qué significa.
