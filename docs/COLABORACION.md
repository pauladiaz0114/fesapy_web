# Cómo trabajamos juntos (Git y GitHub)

Somos dos personas, cada una con su propio Claude Code, trabajando en el mismo repo. Estas reglas sirven para no pisarnos el trabajo.

> **Paula:** tu lista de configuración y primeros pasos (Vercel, Bitwarden, `.env.local`, 2FA, primera tarea) está en [`PENDIENTES-PAULA.md`](PENDIENTES-PAULA.md).

## 1. Ramas

- `main` es la versión que funciona y la que Vercel publica. **Nadie trabaja directo en `main`.**
  - Única excepción: el commit inicial del Día 1 (ver `DECISIONES.md`).
- Cada tarea va en su propia rama:
  - `feat/nombre-corto` para algo nuevo, por ejemplo `feat/header`, `feat/formulario-cotizacion`
  - `fix/nombre-corto` para corregir un error, por ejemplo `fix/menu-celular`
  - `docs/nombre-corto` para cambios solo de documentación
  - `chore/nombre-corto` para configuración, dependencias o seguridad de base
- Una rama es una tarea. Las ramas deben ser cortas: lo ideal es menos de un día de trabajo.

> **Concepto:** una rama es una copia paralela del proyecto. Puedes cambiar lo que quieras ahí sin afectar `main`. Cuando terminas, "fusionas" (merge) tus cambios a `main` mediante un Pull Request.

## 2. Flujo de cada tarea (paso a paso)

```bash
# 1. Ponerse al día con main
git checkout main
git pull

# 2. Tomar la tarea en PLAN.md: cambiar [ ] por [~] (tu nombre)
#    y avisar al otro subiendo ese cambio a main
git add docs/PLAN.md
git commit -m "docs: tomo tarea Header (Sebastián)"
git push

# 3. Crear la rama de la tarea
git checkout -b feat/header

# 4. Trabajar con Claude Code. Guardar avances con commits pequeños
git add .
git commit -m "feat: header con menú responsive"

# 5. Antes de subir: verificar que todo compila
npm run lint
npm run build

# 6. Subir la rama a GitHub
git push -u origin feat/header

# 7. Abrir el Pull Request en GitHub (botón "Compare & pull request")
```

> El paso 2 es lo único que se permite subir directo a `main`, porque solo cambia una línea de `PLAN.md` para avisar qué tarea tomaste.

Después del merge:

```bash
git checkout main
git pull
git branch -d feat/header   # borra la rama local que ya no se usa
```

## 3. Pull Requests (PR)

- Título claro, por ejemplo: `Header con menú responsive y footer`.
- En la descripción: qué se hizo, cómo probarlo y capturas de pantalla si es algo visual.
- **El otro revisa antes de fusionar.** No hace falta ser experto: abre la vista previa de Vercel (Vercel crea un enlace por cada PR), pruébala en el celular y deja comentarios.
- Se fusiona con **"Squash and merge"**: todos los commits de la rama quedan como uno solo en `main` y el historial queda limpio.
- Borrar la rama en GitHub después de fusionar (GitHub ofrece el botón).

### Checklist antes de pedir revisión
- [ ] `npm run lint` y `npm run build` pasan
- [ ] No hay secretos en el código (claves, contraseñas, URLs de la base de datos)
- [ ] Se probó en tamaño celular
- [ ] Entrada nueva en `docs/BITACORA.md`
- [ ] Si hubo una decisión técnica, está en `docs/DECISIONES.md`
- [ ] Tarea marcada `[x]` en `docs/PLAN.md`

## 4. Mensajes de commit

Formato: `tipo: qué cambió`, en español y en presente.

| Tipo | Cuándo |
|---|---|
| `feat:` | algo nuevo (página, componente, función) |
| `fix:` | corrección de un error |
| `docs:` | solo documentación |
| `style:` | solo estilos o formato, sin cambiar la lógica |
| `refactor:` | reorganizar código sin cambiar lo que hace |
| `chore:` | configuración, dependencias |

Ejemplos: `feat: botón flotante de WhatsApp` · `fix: el menú no cerraba en iPhone` · `chore: instalar zod`

## 5. Cómo evitar conflictos

Un **conflicto** ocurre cuando los dos cambian las mismas líneas del mismo archivo. Git no sabe cuál versión dejar y te pide que decidas.

Archivos "delicados" que tocan los dos. **Avisen antes de cambiarlos:**
- `prisma/schema.prisma` y `prisma/migrations/`: **solo una persona a la vez crea migraciones.**
- `src/app/layout.tsx`, `src/app/globals.css`, `next.config.ts`
- `package.json` y `package-lock.json` (al instalar librerías)
- `docs/PLAN.md` y `docs/BITACORA.md`

Buenas prácticas:
- Hagan `git pull` en `main` todos los días antes de empezar.
- Si tu rama lleva varios días, tráele lo nuevo de `main`:
  ```bash
  git checkout main && git pull
  git checkout feat/mi-rama
  git merge main
  ```
- En `BITACORA.md` cada uno agrega su entrada arriba. Si hay conflicto ahí, se dejan **ambas** entradas.

### Si aparece un conflicto
1. No entres en pánico: nada se ha perdido.
2. Pídele a Claude Code: *"Tengo un conflicto de merge, explícame qué cambió cada lado y ayúdame a resolverlo."*
3. En el archivo verás marcas `<<<<<<<`, `=======` y `>>>>>>>`. Se deja la versión correcta (o una mezcla de las dos) y se borran las marcas.
4. `git add <archivo>` y `git commit`.

### Conflictos en migraciones de Prisma
Nunca edites una migración que ya está en `main`. Si los dos crearon migraciones a la vez, quien fusione de segundo borra **su** migración nueva (no la del otro), trae `main` y vuelve a correr `npx prisma migrate dev --name ...`.

## 6. Trabajar con Claude Code

- Al iniciar cada sesión, díganle en qué rama están y qué tarea van a hacer, por ejemplo: *"Estoy en feat/header. Vamos a hacer la tarea Header + Footer del Día 2 de PLAN.md."*
- Claude Code sigue `CLAUDE.md`. Si cambian una regla del proyecto, actualicen `CLAUDE.md` en el mismo PR.
- Revisen lo que hizo antes de hacer commit (`git diff` o la vista de cambios del editor). El código se lo hace Claude, pero **ustedes son los responsables** de lo que se sube.

## 7. Secretos y variables de entorno

- Cada uno tiene su propio `.env.local`, que nunca se sube (está en `.gitignore`).
- Si necesitan compartir una clave, háganlo por un canal privado (mensaje directo) y bórrenla del chat después. **Nunca** en el repo, en issues ni en comentarios de PR.
- Si alguien sube un secreto por error: avisar de inmediato y **rotar la clave** (generar una nueva en el servicio). Borrar el commit no basta.
- Si se agrega una variable nueva, se agrega su nombre (sin valor) a `.env.example` en el mismo PR.

## 8. Configuración de GitHub (una sola vez)

- [ ] Repo **privado** y los dos como colaboradores
- [ ] 2FA activado en ambas cuentas
- [ ] Settings → Code security: **Secret scanning**, **Push protection** y **Dependabot**
- [ ] Settings → General → Pull Requests: dejar activo solo **"Allow squash merging"** y activar **"Automatically delete head branches"**
- [ ] Protección de `main` (Settings → Branches/Rules): exigir PR antes de fusionar. *Puede que no esté disponible en repos privados del plan gratuito de GitHub. Si no aparece, la regla se cumple por acuerdo entre los dos.*
