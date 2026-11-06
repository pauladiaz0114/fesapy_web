# Arquitectura y seguridad

Este documento es la fuente de verdad de **cómo** está construido el sitio y **qué controles de seguridad** son obligatorios. Claude Code debe seguirlo en cada tarea. Si un control cambia, se actualiza aquí y se registra en `DECISIONES.md`.

> Versión instalada: **Next.js 16** (usa `proxy.ts` en lugar de `middleware.ts` y tiene `cacheComponents` activo). Antes de escribir código de Next.js, leer la guía correspondiente en `node_modules/next/dist/docs/` (ver `AGENTS.md`). Guías clave: `02-guides/data-security.md`, `02-guides/authentication.md`, `02-guides/authentication-with-cache-components.md` y `02-guides/content-security-policy.md`.

---

## 1. Qué vamos a usar y por qué

| Pieza | Herramienta | Por qué | Costo |
|---|---|---|---|
| Framework | Next.js (App Router) + TypeScript strict | Ya lo conocen, SEO excelente, frontend y backend en un solo proyecto | Gratis |
| Estilos | Tailwind CSS v4 | Rápido, consistente con los colores de marca | Gratis |
| Base de datos | **PostgreSQL en Neon** | Postgres real, plan gratuito, ramas para pruebas | Gratis (0,5 GB) |
| ORM | Prisma | Tipado, migraciones, consultas parametrizadas | Gratis |
| Login del admin | **Auth.js** con enlace mágico, sesiones en base de datos | Sin contraseñas que filtrar; sesiones revocables | Gratis |
| Imágenes | Vercel Blob + `sharp` | Subir y limpiar fotos desde el panel | Gratis (cuota limitada) |
| Correos | Resend | Aviso de cotización y enlaces de login | Gratis (3.000/mes) |
| Validación | Zod | Valida en el servidor todo lo que entra | Gratis |
| Anti-bots | Cloudflare Turnstile + honeypot + trampa de tiempo | CAPTCHA invisible, sin rompecabezas | Gratis |
| Escaneo | Dependabot, `npm audit`, gitleaks, GitHub Actions | Dependencias vulnerables y secretos filtrados | Gratis |
| Hosting | Vercel | Despliegue automático, HTTPS incluido | Gratis (Hobby) |

> El plan Hobby de Vercel es para uso no comercial. Para la fase de pruebas está bien; cuando la página salga oficialmente con dominio, evaluar Pro (~USD 20/mes) o mover el hosting. Verificar condiciones vigentes en vercel.com/pricing.

**Alternativa descartada:** Supabase (base de datos + login + almacenamiento). Los proyectos gratis se pausan tras una semana sin uso, y su modelo expone la base de datos al navegador con una llave pública, lo que obliga a depender por completo de Row Level Security. Ver §5.

---

## 2. Arquitectura de seguridad (cómo encaja todo)

```
Navegador ──HTTPS──▶ Vercel ──▶ proxy.ts (redirección rápida si no hay cookie en /admin)
                                   │
                                   ▼
                     Páginas / Server Actions / Route Handlers
                                   │  (nunca tocan Prisma ni process.env directamente)
                                   ▼
                     Capa de Acceso a Datos  src/lib/dal/*   ← 'server-only'
                       1. ¿hay sesión?  2. ¿el rol tiene permiso?
                       3. valida con Zod  4. consulta con select mínimo
                       5. registra auditoría  6. devuelve un DTO
                                   │
                                   ▼
                 Prisma ──TLS──▶ Neon (rol fesapy_app, sin permisos de estructura)
```

**Principios:**
1. **Denegar por defecto.** Todo lo que está bajo `/admin` y `/api/admin` exige sesión y permiso. Lo público se lista explícitamente.
2. **Defensa en profundidad.** El `proxy.ts` solo hace una revisión optimista. La revisión real se repite dentro de cada función de la DAL, porque las Server Actions **se pueden llamar con un POST directo**, sin pasar por la página (lo advierte la guía de Next.js).
3. **Mínimo privilegio.** Cada rol de usuario, cada rol de base de datos y cada token tiene solo lo que necesita.
4. **Mínimos datos.** Se piden, guardan, devuelven y registran solo los datos necesarios.

### Estructura de archivos de seguridad

```
src/
  proxy.ts                  # redirección optimista de /admin sin cookie
  lib/
    env.ts                  # valida variables de entorno con Zod (único lugar que lee process.env del servidor)
    env.client.ts           # variables públicas (solo NEXT_PUBLIC_TURNSTILE_SITE_KEY)
    prisma.ts               # cliente singleton ('server-only')
    auth.ts                 # configuración de Auth.js
    permisos.ts             # matriz de roles y permisos
    cripto.ts               # cifrado AES-256-GCM y HMAC ('server-only')
    limite.ts               # rate limiting en base de datos
    antibots.ts             # Turnstile + trampa de tiempo
    sanitizar.ts            # normalización de texto, CSV seguro, JSON-LD seguro
    auditoria.ts            # registrar acciones del panel
    dal/                    # Capa de Acceso a Datos ('server-only')
      catalogo.ts  clientes.ts  testimonios.ts  cotizaciones.ts  usuarios.ts
    validaciones/           # esquemas Zod
```

---

## 3. Modelo de datos

```
Categoria         id, nombre, slug, descripcion, imagen, orden
Producto          id, nombre, slug, descripcion, marca, tallas[], personalizable, imagenes[], destacado, activo, categoriaId
Cliente           id, nombre, logo, orden, activo
Testimonio        id, nombre, cargo, empresa, texto, activo
Cotizacion        id, nombre, empresa, nitCifrado?, correoCifrado, correoHash, telefonoCifrado, ciudad, mensaje,
                  productos?, aceptaDatos, aceptaDatosEn, politicaVersion, estado, creadaEn
IntentoLimitado   id, accion (COTIZACION | LOGIN), clave (HMAC), creadoEn
Usuario           id, email, nombre, rol (ADMIN | EDITOR), activo, creadoEn      ← Día 5, junto con tablas de Auth.js
Sesion / Account / VerificationToken                                             ← Día 5 (adaptador de Prisma para Auth.js)
RegistroAuditoria id, usuarioId, accion, entidad, entidadId, creadoEn           ← Día 5
```

Notas:
- Los campos `...Cifrado` guardan texto cifrado (ver §9). Su largo real lo limita Zod antes de cifrar.
- `correoHash` es un HMAC del correo normalizado. Permite encontrar las cotizaciones de una persona (para atender una solicitud de Habeas Data) sin descifrar toda la tabla.
- `politicaVersion` guarda qué versión de la política de datos aceptó la persona (ej. `2026-10-v1`).
- `IntentoLimitado` reemplaza a `IntentoEnvio`: sirve tanto para el formulario como para el login.
- `RegistroAuditoria` **no guarda datos personales**, solo qué se hizo, sobre qué tipo de registro y su id.

---

## 4. Roles y permisos (RBAC)

**Autenticación** es "¿quién eres?". **Autorización** es "¿qué puedes hacer?". Son dos revisiones distintas y las dos son obligatorias.

### Roles
| Rol | Para quién | Idea |
|---|---|---|
| `ADMIN` | Dueña de Fesapy y el equipo técnico | Todo, incluidos datos personales y usuarios |
| `EDITOR` | Personal que actualiza el catálogo | Contenido público; **no** ve datos personales de cotizaciones |
| Público | Visitantes | Solo contenido con `activo = true` y enviar cotizaciones |

### Matriz de permisos (`src/lib/permisos.ts`)
| Permiso | ADMIN | EDITOR | Público |
|---|:-:|:-:|:-:|
| `catalogo:leer_publico` (activos) | ✅ | ✅ | ✅ |
| `catalogo:gestionar` (crear, editar, ocultar, borrar) | ✅ | ✅ | ❌ |
| `contenido:gestionar` (clientes, testimonios) | ✅ | ✅ | ❌ |
| `imagenes:subir` | ✅ | ✅ | ❌ |
| `cotizacion:crear` | ✅ | ✅ | ✅ |
| `cotizaciones:ver` (incluye descifrar correo y teléfono) | ✅ | ❌ | ❌ |
| `cotizaciones:cambiar_estado` | ✅ | ❌ | ❌ |
| `cotizaciones:exportar` / `cotizaciones:suprimir` | ✅ | ❌ | ❌ |
| `usuarios:gestionar` | ✅ | ❌ | ❌ |
| `auditoria:ver` | ✅ | ❌ | ❌ |

```ts
// src/lib/permisos.ts (patrón)
export const PERMISOS = {
  ADMIN:  ['catalogo:gestionar', 'contenido:gestionar', 'imagenes:subir',
           'cotizaciones:ver', 'cotizaciones:cambiar_estado', 'cotizaciones:exportar',
           'cotizaciones:suprimir', 'usuarios:gestionar', 'auditoria:ver'],
  EDITOR: ['catalogo:gestionar', 'contenido:gestionar', 'imagenes:subir'],
} as const;

// En la DAL, al inicio de cada función protegida:
const usuario = await exigirPermiso('cotizaciones:ver'); // lanza error si no hay sesión o permiso
```

Reglas:
- Se piensa en **permisos**, no en roles: el código pregunta `exigirPermiso('catalogo:gestionar')`, nunca `if (rol === 'ADMIN')`. Así, agregar un rol después no obliga a revisar todo el código.
- **Quién puede entrar:** solo correos que existan en `Usuario` con `activo = true`. `ADMIN_EMAILS` solo sirve para crear los primeros administradores con un script (`npm run admin:crear`), y en adelante los usuarios se gestionan desde el panel.
- **Desactivar un usuario borra sus sesiones** al instante.
- Nadie puede cambiar su propio rol ni desactivarse a sí mismo, y siempre debe quedar al menos un `ADMIN` activo.
- La interfaz oculta lo que el rol no puede hacer, pero **ocultar un botón no es seguridad**: la DAL lo bloquea igual.

---

## 5. Base de datos: llaves, roles y Row Level Security

### ¿"Llave pública para la base de datos"?
En este proyecto **no existe ninguna llave de base de datos en el navegador**. El navegador nunca habla con Neon: solo el servidor de Vercel lo hace, con credenciales secretas. Esto es más seguro que el modelo de Supabase/Firebase, donde la llave pública (anon key) va en el navegador y toda la seguridad depende de las políticas de la base.

- `DATABASE_URL` y `DIRECT_URL` **jamás** llevan el prefijo `NEXT_PUBLIC_` y solo se leen desde `src/lib/env.ts`.
- Si algún día se migra a Supabase, solo la anon key puede ser pública, **RLS pasa a ser obligatorio en todas las tablas** y la service key nunca sale del servidor.

### Roles de base de datos (mínimo privilegio)
| Rol en Neon | Lo usa | Puede |
|---|---|---|
| `neondb_owner` (dueño) | `DIRECT_URL`, solo migraciones, desde el computador | Crear y alterar tablas |
| `fesapy_app` | `DATABASE_URL`, la aplicación en Vercel | Solo `SELECT, INSERT, UPDATE, DELETE`. **No** puede borrar tablas ni cambiar la estructura |

Así, aunque alguien lograra ejecutar SQL a través de la app, no podría hacer `DROP TABLE`. SQL a correr una vez en Neon (SQL Editor) **después de la primera migración**:

```sql
-- Contraseña: node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
CREATE ROLE fesapy_app WITH LOGIN PASSWORD '<larga y aleatoria>';
GRANT USAGE ON SCHEMA public TO fesapy_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO fesapy_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO fesapy_app;
-- Para que las tablas de futuras migraciones también queden con permisos:
ALTER DEFAULT PRIVILEGES FOR ROLE neondb_owner IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO fesapy_app;
ALTER DEFAULT PRIVILEGES FOR ROLE neondb_owner IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO fesapy_app;
-- Opcional, muy recomendado: la app no puede alterar ni borrar la auditoría.
REVOKE UPDATE, DELETE ON "RegistroAuditoria" FROM fesapy_app;   -- después del Día 5
-- La app no necesita el historial de migraciones de Prisma:
REVOKE ALL ON "_prisma_migrations" FROM fesapy_app;
```

**El rol se crea con SQL, NO desde la consola (Roles → New role).** Neon da a los roles creados por la consola, la CLI o la API membresía en `neon_superuser` (CREATEDB, CREATEROLE, BYPASSRLS y todos los permisos sobre las tablas de `public`), lo que anularía el mínimo privilegio. Los roles creados con SQL solo tienen lo que se les concede. El dueño se llama `neondb_owner`.

Verificado el 2026-11-01: `fesapy_app` lee las tablas, pero no puede crear, borrar, alterar ni vaciar (TRUNCATE) tablas, ni leer `_prisma_migrations`, ni crear roles.

### Ramas de Neon por entorno
- Rama `production` de Neon → variables de **Production** en Vercel.
- Rama `development` de Neon (creada desde `production`) → variables de **Preview** y del `.env.local` de cada uno.
- Al crear una rama, Neon copia los roles **con sus contraseñas**: en `development` se cambiaron las de `fesapy_app` (`ALTER ROLE`) y `neondb_owner` (Roles → Reset password), para que un `.env.local` filtrado no exponga producción.
- Migraciones: primero en `development` (`npm run db:migrar`). A producción se aplican con `migrate deploy` usando la `DIRECT_URL` de `production`, que vive solo en el gestor de contraseñas, nunca en Vercel.
- Así, los PR y las pruebas **nunca tocan datos reales**. Las ramas de Neon son gratis.

### Row Level Security (RLS): evaluado, no se activa en el MVP
RLS hace que Postgres filtre filas según quién consulta. Es imprescindible cuando el navegador habla directo con la base (Supabase) o cuando hay varios clientes en la misma tabla (multi-tenant). **Aquí no aplica**, porque:
- la base solo la consulta el servidor, con un único rol de aplicación;
- no hay "filas de un usuario" (no hay cuentas de clientes);
- con Prisma y un *pooler*, pasar la identidad del usuario a Postgres en cada consulta es complejo y propenso a errores.

**Control equivalente:** la DAL (§2) es la única puerta a los datos y aplica permisos y filtros en cada consulta, más el rol `fesapy_app` sin permisos de estructura.
**Cuándo activarlo:** si se agregan cuentas de clientes (ej. "mis cotizaciones"), acceso directo desde el navegador o multi-tenant. Queda en "Después del MVP".

---

## 6. Controles obligatorios por tema

### 6.1 Autenticación forzada (nadie entra al panel sin login)
- [ ] `src/proxy.ts`: si la ruta empieza por `/admin` (excepto `/admin/login`) y no hay cookie de sesión → redirige a `/admin/login`. **Solo es una revisión optimista**: no consulta la base de datos ni decide permisos.
- [ ] Cada página del panel, cada Server Action y cada Route Handler de `/api/admin` llama a la DAL, que verifica sesión **y** permiso desde la base de datos.
- [ ] Revisar sesión en el `layout` **no basta**: los layouts no se ejecutan cuando se llama una Server Action.
- [ ] Con `cacheComponents`, la lectura de sesión ocurre en tiempo de petición: envolver la UI autenticada en `<Suspense>` y **nunca** cachear (`'use cache'`) una función que lea la sesión o datos personales. Ver `authentication-with-cache-components.md`.
- [ ] Auth.js con **sesiones en base de datos** (no JWT), para poder revocarlas.
- [ ] Antes del Día 5: verificar que la versión de Auth.js soporte Next.js 16. Si no, evaluar una alternativa y registrarla en `DECISIONES.md`.

### 6.2 Contraseñas
- **No hay contraseñas**: se entra con un enlace mágico de un solo uso que vence en 10 minutos. Auth.js guarda el token del enlace **hasheado**, no en texto plano.
- Si algún día se agregan contraseñas: **argon2id** (`@node-rs/argon2`) o, en su defecto, bcrypt con costo ≥ 12. Nunca MD5, SHA-1 ni SHA-256 solos, y nunca "cifrar" contraseñas.

### 6.3 Cookies de sesión
Auth.js ya trae configuraciones seguras. Verificar que queden así:
| Atributo | Valor | Protege contra |
|---|---|---|
| `HttpOnly` | sí | Que un script (XSS) lea la cookie |
| `Secure` + prefijo `__Secure-` | sí (en producción) | Enviar la cookie por HTTP |
| `SameSite` | `Lax` | CSRF desde otros sitios |
| `Path` | `/` | — |
| Duración (`maxAge`) | 7 días | Sesiones eternas |
| Renovación (`updateAge`) | 24 horas | — |

- [ ] Cerrar sesión borra la sesión de la base de datos, no solo la cookie.
- [ ] `AUTH_SECRET` largo y aleatorio (`npx auth secret`), distinto en Production y Preview.
- [ ] Nunca guardar datos sensibles en cookies propias ni en `localStorage`.

### 6.4 Restringir acceso a registros (IDOR)
IDOR es cuando alguien cambia un id en la URL o en la petición (`/admin/cotizaciones/abc` → `.../abd`) y ve algo que no debería.
- [ ] Toda lectura y escritura del panel pasa por la DAL con `exigirPermiso(...)`.
- [ ] Consultas públicas siempre con `where: { activo: true }`. Un producto oculto responde **404**, no 403 (no se confirma que existe).
- [ ] Las URLs públicas usan `slug`, no `id`.
- [ ] Los ids que llegan del cliente se validan con Zod (`z.cuid()`) antes de consultar.
- [ ] Las cotizaciones nunca aparecen en rutas públicas.

### 6.5 Bloquear manipulación de campos (mass assignment)
El atacante agrega campos extra a la petición, como `estado: "CERRADA"`, `activo: true`, `rol: "ADMIN"` o `aceptaDatosEn: "2020-01-01"`.
- [ ] Cada acción tiene su esquema Zod con **solo** los campos que el usuario puede enviar, usando `z.strictObject(...)` para rechazar los campos desconocidos.
- [ ] **Prohibido** pasar el objeto recibido directo a Prisma (`data: datos` o `data: { ...formData }`). Siempre campo por campo, después de validar.
- [ ] El servidor, y no el cliente, fija `id`, `estado`, `creadaEn`, `aceptaDatosEn`, `politicaVersion`, `rol` y los autores.
- [ ] Cambiar `rol` o `activo` de un usuario es una acción aparte con su propio permiso (`usuarios:gestionar`).

### 6.6 Devolver solo los datos necesarios
- [ ] La DAL siempre usa `select` explícito en Prisma. **Nunca** devuelve el objeto completo de la base de datos.
- [ ] A los Client Components solo llegan **DTOs** (objetos con los campos que la vista necesita). Una cotización en la lista del panel no necesita el mensaje completo ni el NIT.
- [ ] Todo archivo en `lib/dal/`, `lib/cripto.ts`, `lib/env.ts`, `lib/prisma.ts` y `lib/auth.ts` empieza con `import 'server-only'`. Si alguien lo importa en el navegador, el build falla.
- [ ] Opcional: activar `experimental.taint` y marcar los objetos de cotización con `experimental_taintObjectReference` como segunda capa.
- [ ] Las Server Actions devuelven `{ ok: true }` o `{ ok: false, error: 'mensaje genérico' }`, no registros completos.
- [ ] Errores: el usuario ve un mensaje genérico, y el detalle va solo a los logs del servidor (`console.error`), **sin datos personales** (registrar ids, no correos ni teléfonos). Nunca mostrar trazas de error.

### 6.7 Validar entradas
- [ ] Zod **en el servidor** para todo: formularios, Server Actions, Route Handlers, parámetros de URL y `searchParams`. La validación del cliente es solo comodidad.
- [ ] Cada texto con largo máximo (igual al de la base de datos), correos con `z.email()`, teléfonos con regex colombiano razonable, NIT con formato `\d{6,10}(-\d)?`, enums para estados.
- [ ] Rechazar, no "arreglar", lo que no cumple.

### 6.8 Sanitizar contenido
React escapa el HTML al mostrarlo, pero hay salidas que React no protege:
- [ ] **Normalizar** todo texto de usuario (`src/lib/sanitizar.ts`): `trim`, `normalize('NFC')` y quitar caracteres de control (excepto salto de línea en campos de varias líneas).
- [ ] **Prohibido** `dangerouslySetInnerHTML` con contenido de usuarios o del panel. Si algún día se permite texto con formato, usar Markdown + `sanitize-html` con lista blanca.
- [ ] **JSON-LD** (`LocalBusiness`): escapar `<` al serializar (`JSON.stringify(datos).replace(/</g, '\\u003c')`). Si no, un `</script>` dentro de un texto rompe la página.
- [ ] **Correos (Resend):** armarlos con React Email o en texto plano, nunca concatenando HTML. El asunto debe ser una sola línea sin saltos (evita inyección de cabeceras).
- [ ] **Exportar a Excel/CSV:** si una celda empieza por `=`, `+`, `-`, `@`, tabulador o retorno, anteponer `'`. Evita la inyección de fórmulas al abrir el archivo.
- [ ] **Enlaces:** solo `https://`. Rechazar `javascript:` en cualquier URL editable desde el panel. Para WhatsApp, `encodeURIComponent` del texto.
- [ ] **Redirecciones:** nunca redirigir a una URL recibida por parámetro sin validar que sea del mismo sitio (Auth.js ya valida `callbackUrl`, y no se debe desactivar).

### 6.9 Consultas parametrizadas (inyección SQL)
- [ ] Solo la API de Prisma (`findMany`, `create`…), que ya parametriza.
- [ ] **Prohibidos** `$queryRawUnsafe` y `$executeRawUnsafe`. Si se necesita SQL a mano, usar `$queryRaw` con plantilla etiquetada (`` prisma.$queryRaw`... ${valor}` ``), nunca concatenando texto.
- [ ] Ordenar o filtrar por columnas elegidas por el usuario solo con una lista blanca (enum Zod).

### 6.10 Rate limiting
Guardado en la propia base de datos (tabla `IntentoLimitado`), sin servicios externos.
| Acción | Clave | Límite |
|---|---|---|
| Enviar cotización | HMAC(IP) | 5 por hora |
| Pedir enlace de login | HMAC(IP) | 5 cada 15 min |
| Pedir enlace de login | HMAC(correo) | 3 por hora |
| Acciones del panel (opcional) | id de usuario | 60 por minuto |

- [ ] **IP confiable:** usar la IP que entrega Vercel (`ipAddress()` de `@vercel/functions` o la cabecera `x-real-ip`). **Nunca** el primer valor de `X-Forwarded-For`, porque el cliente lo puede inventar.
- [ ] La clave es `HMAC-SHA256(IP_HASH_SECRET, ip)`. Un SHA-256 simple de una IPv4 se revierte en minutos probando las ~4.300 millones de IPs posibles. Con HMAC y un secreto, no.
- [ ] Al pasar el límite: respuesta genérica ("Intenta de nuevo más tarde") y código 429 en rutas API.
- [ ] Limpieza: al registrar un intento, borrar los registros de más de 24 horas (sin cron).
- [ ] Login: responder **siempre** "Si el correo está autorizado, recibirás un enlace", exista o no. Así no se revela quién es administrador (enumeración de usuarios).

### 6.11 Protección contra bots (formulario de cotización)
Capas, de la más barata a la más fuerte:
1. **Honeypot:** campo oculto (`name="sitio_web"`, fuera de pantalla, `tabIndex={-1}`, `autoComplete="off"`). Si viene lleno, se responde "éxito" pero no se guarda nada (el bot no se entera).
2. **Trampa de tiempo:** el formulario incluye una marca de tiempo firmada con HMAC. Si se envía en menos de 3 segundos o después de 2 horas, o si la firma no coincide, se rechaza.
3. **Cloudflare Turnstile:** CAPTCHA gratuito y casi siempre invisible. El token se verifica **en el servidor** contra `https://challenges.cloudflare.com/turnstile/v0/siteverify` con `TURNSTILE_SECRET_KEY`. Si Cloudflare no responde, se rechaza el envío ("intenta de nuevo"), nunca se acepta sin verificar.
4. **Rate limiting** (§6.10).
- [ ] El formulario de login del admin también usa Turnstile.

### 6.12 Restringir archivos subidos
- [ ] Solo usuarios con `imagenes:subir`, y solo desde una Server Action protegida.
- [ ] Tipos permitidos: JPEG, PNG y WebP. **Se verifica leyendo los primeros bytes del archivo** (paquete `file-type`), no por la extensión ni por el `Content-Type` que manda el navegador. **SVG prohibido** (puede llevar JavaScript).
- [ ] Máximo 4 MB. En Next.js 16 el límite de cuerpo de las Server Actions es 1 MB por defecto: subirlo a `4mb` en `next.config` (verificar el nombre exacto de la opción en la documentación local).
- [ ] **Reprocesar** con `sharp`: redimensionar a máximo 2000 px, convertir a WebP y **quitar metadatos** (EXIF puede traer la ubicación GPS de quien tomó la foto). Esto también elimina archivos "políglota" que esconden código dentro de una imagen.
- [ ] Nombre generado por el servidor: `productos/${crypto.randomUUID()}.webp`. Nunca usar el nombre original.
- [ ] `BLOB_READ_WRITE_TOKEN` solo en el servidor. Las imágenes son públicas (son fotos de catálogo), así que **nunca** se suben documentos ni datos personales a Blob.
- [ ] Al borrar un producto, borrar también sus imágenes de Blob.

### 6.13 Cabeceras de seguridad (`next.config.ts`)
| Cabecera | Valor | Protege contra |
|---|---|---|
| `Content-Security-Policy` | ver abajo | XSS, inyección de scripts, clickjacking |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` | Degradar a HTTP |
| `X-Content-Type-Options` | `nosniff` | Que el navegador "adivine" tipos de archivo |
| `X-Frame-Options` | `DENY` | Clickjacking (navegadores viejos) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Filtrar URLs internas a otros sitios |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=()` | Uso de APIs del dispositivo |
| `Cross-Origin-Opener-Policy` | `same-origin` | Ataques entre ventanas |
| (quitar) `X-Powered-By` | `poweredByHeader: false` | Anunciar la tecnología |

**HSTS `preload`:** se quita por ahora. Agregar a la lista de precarga de los navegadores es muy difícil de revertir, así que solo se activa con el dominio propio definitivo y después de verificar que todos los subdominios tengan HTTPS.

**CSP por etapas:**
- **MVP (actual):** `default-src 'self'`; `script-src 'self' 'unsafe-inline'` + `https://challenges.cloudflare.com`; `frame-src https://challenges.cloudflare.com`; `img-src 'self' data: blob: https://*.public.blob.vercel-storage.com`; `connect-src 'self' https://challenges.cloudflare.com`; `object-src 'none'`; `base-uri 'self'`; `form-action 'self'`; `frame-ancestors 'none'`; `upgrade-insecure-requests`.
- **Día 7 (endurecer):** quitar `'unsafe-inline'` de `script-src`. Opciones según `content-security-policy.md`: (a) **nonces** generados en `proxy.ts`, que obligan a renderizar cada página dinámicamente, aplicarlos al menos en `/admin`, que ya es dinámico, o (b) **SRI** (experimental), que mantiene las páginas estáticas. Probar primero (b) en el sitio público y (a) en `/admin`, y registrar el resultado en `DECISIONES.md`.
- **Mapas:** en lugar de incrustar Google Maps (cookies de terceros y más dominios en la CSP), usar un enlace "Ver en Google Maps" por sede.

### 6.14 Forzar HTTPS en todo
- [ ] Vercel redirige HTTP → HTTPS automáticamente, y HSTS hace que el navegador recuerde usar HTTPS.
- [ ] `upgrade-insecure-requests` en la CSP.
- [ ] Conexión a Neon cifrada: las URLs deben incluir `sslmode=require` (y `channel_binding=require` si Neon lo ofrece en la cadena).
- [ ] Cookies con `Secure`. Todas las APIs externas (Resend, Blob, Turnstile) por `https://`.

### 6.15 Ocultar API keys y secretos
- [ ] Solo `src/lib/env.ts` lee `process.env` en el servidor, y lo valida con Zod al arrancar. Si falta una variable, la app falla con un mensaje claro en lugar de funcionar a medias.
- [ ] **Única** variable pública permitida: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (está diseñada para ser pública). Cualquier otra variable con `NEXT_PUBLIC_` debe justificarse en `DECISIONES.md`.
- [ ] Antes de lanzar: buscar secretos en el código que llega al navegador: `npm run build`, luego buscar en `.next/static` valores como `re_`, `postgres://`, `vercel_blob_rw_`. Debe dar **cero** resultados.
- [ ] Secretos distintos en Production, Preview y local, **excepto** `DATA_ENCRYPTION_KEY` e `IP_HASH_SECRET`, que van **una por rama de Neon**: todos los que usan `development` (locales y Preview) comparten la misma, o no podrían leer los datos cifrados por los otros. `AUTH_SECRET` sí es distinto en cada lugar.
- [ ] `DIRECT_URL` (rol dueño) **no se carga en Vercel**: solo se usa para migraciones desde un computador.
- [ ] Guardar una copia de `DATA_ENCRYPTION_KEY` en un gestor de contraseñas (ej. Bitwarden, gratis). **Si se pierde, los datos cifrados no se pueden recuperar.**

### 6.16 Secretos en Git: prevenir, detectar y eliminar
**Prevenir:**
- [ ] `.gitignore` incluye `.env*` excepto `.env.example`.
- [ ] **gitleaks** en GitHub Actions en cada PR y push (bloquea el PR si encuentra un secreto).
- [ ] Recomendado: gitleaks también como *pre-commit* local, para detectarlo antes de que salga del computador.
- [ ] En GitHub: activar Secret scanning y Push protection en Settings → Advanced Security (gratis porque el repo es público). gitleaks se mantiene como segunda capa.

**Detectar en el historial:** `gitleaks git .` revisa todos los commits, no solo el último. Correrlo una vez ahora y en CI.

**Si se filtró un secreto (en este orden):**
1. **Rotarlo de inmediato** en el servicio (Neon, Resend, Vercel…). Esto es lo único que realmente lo invalida.
2. Revisar los registros del servicio por uso indebido.
3. Borrarlo del historial con `git filter-repo --replace-text` (o BFG), luego `git push --force` y pedir al otro que vuelva a clonar.
4. Registrar el incidente en `BITACORA.md`.
> Borrar el commit **no basta**: GitHub, los forks, las copias locales y los cachés pueden conservarlo. Por eso el paso 1 es rotar.

### 6.17 Dependencias peligrosas y escaneo
- [ ] **Dependabot** (`.github/dependabot.yml`): alertas de seguridad + actualizaciones semanales agrupadas de npm y GitHub Actions.
- [ ] **CI en cada PR** (`.github/workflows/ci.yml`): `npm ci` → `npm run lint` → `npm run build` → `npm audit --audit-level=high --omit=dev` → gitleaks. Si algo falla, no se fusiona.
- [ ] `package-lock.json` siempre en el repo, y en CI se usa `npm ci` (instala exactamente lo del lockfile).
- [ ] `.npmrc` con `save-exact=true` (versiones exactas, sin `^`).
- [ ] **Antes de instalar cualquier paquete nuevo**, Claude Code debe proponerlo y esperar aprobación, verificando: nombre exacto (cuidado con *typosquatting*: `reactt`, `next-auht`), descargas semanales, fecha de la última versión, repositorio público y licencia. Registrar en `DECISIONES.md` por qué se agregó.
- [ ] Revisar `npm audit` antes de cada despliegue a producción. Si una vulnerabilidad alta no tiene arreglo, documentar por qué no afecta o reemplazar el paquete.
- [ ] **CodeQL** (análisis de código): activarlo con *Default setup* en Settings → Advanced Security (gratis porque el repo es público).

### 6.18 Cifrar datos sensibles
**Ya cifrado sin hacer nada:** en tránsito (HTTPS y TLS a Neon) y en reposo (Neon cifra los discos con AES-256).

**Cifrado a nivel de aplicación** (`src/lib/cripto.ts`), para que una copia filtrada de la base de datos o un respaldo no revele datos de contacto:
| Campo | Tratamiento |
|---|---|
| `Cotizacion.correo` | **AES-256-GCM** → `correoCifrado` + `correoHash` (HMAC, para búsquedas) |
| `Cotizacion.telefono` | AES-256-GCM → `telefonoCifrado` |
| `Cotizacion.nit` | AES-256-GCM → `nitCifrado` |
| IP del visitante | **No se guarda**: solo HMAC (§6.10) |
| Nombre, empresa, ciudad, mensaje | Texto normal (se necesitan para leer y gestionar); protegidos por permisos y por el rol de la base |

- Formato guardado: `v1:<iv>:<tag>:<texto_cifrado>` en base64. El `v1` permite rotar la llave después sin perder lo anterior.
- IV aleatorio de 12 bytes **nuevo en cada cifrado** (nunca reutilizar).
- Llave: `DATA_ENCRYPTION_KEY` (32 bytes en base64, `openssl rand -base64 32`), distinta por entorno. Llave HMAC aparte: `IP_HASH_SECRET` (también se usa para `correoHash`).
- Solo se descifra en la DAL, dentro de funciones que exigen `cotizaciones:ver`.
- Usar únicamente `node:crypto`. **No inventar criptografía propia.**

### 6.19 Auditoría y registros
- [ ] `RegistroAuditoria` para: inicio de sesión, cambio de estado de cotización, ver o exportar cotizaciones, crear/editar/borrar productos, cambios de usuarios y roles.
- [ ] Sin datos personales en la auditoría ni en los logs: solo ids y tipo de acción.
- [ ] La app no puede editar ni borrar la auditoría (permiso revocado en la base, §5).
- [ ] Conservar 1 año. Revisión rápida semanal por el ADMIN.

### 6.20 Cuentas y plataformas
- [ ] 2FA en GitHub, Vercel, Neon, Resend, Cloudflare y en los correos de los administradores.
- [ ] Repo **público** (decisión 2026-11-01); solo los dos como colaboradores, `main` protegida con PR obligatorio y revisiones de la CI. Al ser público, cualquiera ve el código y el historial (incluidos los correos de los commits): **la seguridad nunca depende de que el código sea secreto**, solo de los secretos fuera del repo.
- [ ] Vercel: activar **Deployment Protection** en las previsualizaciones (solo personas con acceso a Vercel las ven).
- [ ] Resend: verificar el dominio con SPF, DKIM y DMARC cuando exista el dominio propio, para que nadie se haga pasar por Fesapy por correo.

---

## 7. Datos personales — Ley 1581 de 2012 (Habeas Data)
El formulario de cotización recoge nombre, correo, teléfono y, opcionalmente, NIT: eso obliga a cumplir la ley colombiana de protección de datos.
- [ ] Página `/politica-de-datos` con: responsable (Fesapy, NIT, dirección, correo), finalidad (responder cotizaciones y contacto comercial), derechos del titular (conocer, actualizar, rectificar, suprimir, revocar), canal y plazos para ejercerlos, **tiempo de conservación** y fecha/versión de la política.
- [ ] Casilla **obligatoria y no marcada por defecto**: "Autorizo el tratamiento de mis datos según la política…" con enlace. Se guarda `aceptaDatos`, `aceptaDatosEn` (lo fija el servidor) y `politicaVersion`.
- [ ] Solo pedir los datos necesarios (NIT opcional).
- [ ] **Cookies:** inventario en la política (nombre, para qué, duración). Las necesarias (sesión del panel) no piden permiso; las no esenciales (analítica, terceros) **solo se cargan después de que la persona acepte**, con botones "Aceptar" y "Rechazar" igual de visibles, y se puede cambiar la elección después. Se guarda la elección (sin datos personales).
- [ ] **Conservación:** proponer a la dueña 2 años para cotizaciones. Después, borrado o anonimización. `IntentoLimitado` se borra a las 24 h.
- [ ] **Solicitudes de titulares:** el ADMIN busca por `correoHash`, puede exportar o suprimir, y queda registrado en la auditoría.
- [ ] **Incidentes:** si hay una filtración de datos personales, Fesapy debe informar a la SIC. Tener anotado quién decide y quién reporta (ver §9).
- [ ] Evaluar si Fesapy debe registrar sus bases de datos en el RNBD de la SIC (depende de sus activos; consultarlo con el contador o asesor legal).

> Esto no es asesoría legal: la política final debe revisarla la empresa.

---

## 8. Imágenes de marcas
Usar fotos de productos de marcas solo si Fesapy es distribuidor y la marca lo permite (material de prensa del fabricante o del distribuidor mayorista). Lo ideal: fotos propias. Las imágenes tomadas al azar de Google pueden tener derechos de autor.

---

## 9. Copias de seguridad e incidentes
- Neon guarda historial (point-in-time) limitado en el plan gratis. Además, exportar la base una vez por semana (`pg_dump`) y guardarla **fuera del repo**, en una carpeta privada. Los campos sensibles ya van cifrados dentro del respaldo.
- La llave `DATA_ENCRYPTION_KEY` se respalda **por separado** del respaldo de datos (gestor de contraseñas).
- **Plan de incidente (1 página):** 1) contener (rotar llaves, desactivar usuarios, cerrar sesiones), 2) evaluar qué datos se expusieron, 3) avisar a la dueña de Fesapy, 4) si hubo datos personales, reporte a la SIC, 5) corregir y documentar en `BITACORA.md`.

---

## 10. Variables de entorno

| Variable | Pública | Para qué |
|---|:-:|---|
| `DATABASE_URL` | ❌ | Neon pooled, rol `fesapy_app` |
| `DIRECT_URL` | ❌ | Neon directa, rol dueño (solo migraciones) |
| `AUTH_SECRET` | ❌ | Firmar sesiones de Auth.js |
| `ADMIN_EMAILS` | ❌ | Solo para el script que crea los primeros ADMIN |
| `RESEND_API_KEY` | ❌ | Enviar correos |
| `BLOB_READ_WRITE_TOKEN` | ❌ | Subir imágenes |
| `DATA_ENCRYPTION_KEY` | ❌ | Cifrado AES-256-GCM (32 bytes base64) |
| `IP_HASH_SECRET` | ❌ | HMAC de IPs, correos y marcas de tiempo |
| `TURNSTILE_SECRET_KEY` | ❌ | Verificar Turnstile en el servidor |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | ✅ | Mostrar Turnstile en el navegador |

---

## 11. Checklist por día (resumen)

| Día | Controles |
|---|---|
| 1 | `.gitignore`, `env.ts` con Zod, `server-only`, esquema con campos cifrados, `.npmrc`, Dependabot, CI con audit + gitleaks, rol `fesapy_app`, ramas de Neon, HSTS sin preload |
| 2–3 | DAL pública con `select` mínimo y `activo: true`, slugs, 404 para ocultos, JSON-LD seguro |
| 4 | Zod estricto, sanitización, honeypot + trampa de tiempo + Turnstile, rate limiting con HMAC, cifrado de correo/teléfono/NIT, correo con React Email, casilla Habeas Data con versión |
| 5 | Auth.js con sesiones en BD, `proxy.ts`, roles y permisos, DAL protegida, auditoría, subida con `file-type` + `sharp`, límite en login |
| 6 | CSP con dominios de Blob y Turnstile, metadata sin datos internos |
| 7 | Endurecer CSP, securityheaders.com (meta: A), buscar secretos en `.next/static`, `npm audit`, prueba manual de IDOR y mass assignment, revisión completa de este documento |
