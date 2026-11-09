# Arquitectura y seguridad

Este documento es la fuente de verdad de **cómo** está construido el sitio y **qué controles de seguridad** siguen vigentes. Claude Code debe seguirlo en cada tarea. Si un control cambia, se actualiza aquí y se registra en `DECISIONES.md`.

> **Cambio de rumbo (9 de noviembre de 2026):** se cancela la base de datos externa, el panel de administración y el login. El sitio quedó simple: páginas estáticas + un formulario que arma un mensaje y abre WhatsApp o el correo. Este documento se reescribió para reflejarlo. La versión anterior (con DAL, cifrado, roles, Auth.js, límite de intentos, etc.) sigue en el historial de Git: `git log -- docs/ARQUITECTURA-Y-SEGURIDAD.md`. Motivos en `DECISIONES.md`.

> Versión instalada: **Next.js 16** (usa `proxy.ts` en lugar de `middleware.ts` y tiene `cacheComponents` activo). Antes de escribir código de Next.js, leer la guía correspondiente en `node_modules/next/dist/docs/` (ver `AGENTS.md`).

---

## 1. Qué usamos y por qué

| Pieza | Herramienta | Por qué | Costo |
|---|---|---|---|
| Framework | Next.js (App Router) + TypeScript strict | SEO excelente, páginas estáticas rápidas | Gratis |
| Estilos | Tailwind CSS v4 | Rápido, consistente con los colores de marca | Gratis |
| Validación | Zod | Valida el formulario de cotización (en el navegador) | Gratis |
| Escaneo | Dependabot, `npm audit`, gitleaks, GitHub Actions | Dependencias vulnerables y secretos filtrados | Gratis |
| Hosting | Vercel | Despliegue automático, HTTPS incluido | Gratis (Hobby) |

> El plan Hobby de Vercel es para uso no comercial. Para la fase de pruebas está bien; cuando la página salga oficialmente con dominio, evaluar Pro (~USD 20/mes) o mover el hosting. Verificar condiciones vigentes en vercel.com/pricing.

**No hay:** base de datos, ORM, login, panel, correos desde el servidor, subida de archivos ni anti-bots. No hay nada que proteger "del lado del servidor" más allá de las cabeceras y de no filtrar secretos.

---

## 2. Cómo funciona el formulario de cotización

`/cotizacion` es un Client Component:

1. La persona llena nombre, empresa, NIT (opcional), correo, teléfono, ciudad, categoría y mensaje, y marca la casilla de autorización (obligatoria y sin marcar de antemano).
2. Zod valida y `src/lib/sanitizar.ts` limpia el texto (en el navegador).
3. Se arma el mensaje y se abre WhatsApp (`wa.me/<número>?text=...`) o el programa de correo (`mailto:`), siempre con `encodeURIComponent`.
4. La persona envía el mensaje por el canal que eligió. **El sitio no recibe ni guarda nada.**

**Controles que siguen vigentes:**
- [ ] Validar y limpiar todo campo (largos máximos, sin caracteres de control).
- [ ] El asunto de `mailto:` va en **una sola línea**, para que nadie pueda colar otras cabeceras de correo con saltos de línea.
- [ ] La categoría que llega por `?categoria=` solo se acepta si es una categoría conocida; cualquier otra cosa se ignora.
- [ ] Prohibido `dangerouslySetInnerHTML` con contenido que no sea nuestro.
- [ ] Enlaces externos con `target="_blank"` y `rel="noopener noreferrer"`.

> Validar en el navegador ayuda a quien escribe, pero **no es una barrera de seguridad** (cualquiera puede saltársela). Como el sitio no guarda nada, el riesgo es bajo. Si algún día se guardan o procesan datos en un servidor, hay que repetir la validación allí (ver §12).

---

## 3. Cabeceras de seguridad (`next.config.ts`)

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

**CSP actual (todo sale del propio sitio):** `default-src 'self'`; `script-src 'self' 'unsafe-inline'` (+ `'unsafe-eval'` solo en desarrollo); `style-src 'self' 'unsafe-inline'`; `img-src 'self' blob: data:`; `font-src 'self'`; `connect-src 'self'`; `object-src 'none'`; `base-uri 'self'`; `form-action 'self'`; `frame-ancestors 'none'`; `upgrade-insecure-requests` (en producción).
- **Pendiente:** quitar `'unsafe-inline'` de `script-src` (SRI o nonces, según `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`).
- **Si agregas un servicio externo** (scripts, imágenes, iframes, analítica, mapas, chat): actualiza la CSP y anótalo en `DECISIONES.md`.
- **Mapas:** en lugar de incrustar Google Maps (cookies de terceros y más dominios en la CSP), usar un enlace "Ver en Google Maps".
- **HSTS `preload`:** se quita por ahora. Agregar a la lista de precarga de los navegadores es muy difícil de revertir; solo se activa con el dominio propio definitivo y cuando todos los subdominios tengan HTTPS.

---

## 4. Forzar HTTPS
- [ ] Vercel redirige HTTP → HTTPS automáticamente, y HSTS hace que el navegador recuerde usar HTTPS.
- [ ] `upgrade-insecure-requests` en la CSP.
- [ ] Cualquier servicio externo que se agregue, por `https://`.

---

## 5. Secretos y variables de entorno
Hoy el sitio **no usa ninguna variable de entorno** (`.env.example` solo explica cómo agregar una).
- [ ] Si hace falta una: proponerlo antes, leerla solo desde `src/lib/env.ts` validado con Zod, y **no hacerla obligatoria** si el sitio puede funcionar sin ella (para no romper el build en Vercel).
- [ ] ESLint prohíbe leer `process.env` fuera de `next.config.ts`, así la regla se cumple sola en cada `npm run lint` y en la CI.
- [ ] Las variables `NEXT_PUBLIC_` terminan en el JavaScript que descarga el navegador: solo para datos que puedan ser públicos.
- [ ] Antes de lanzar: `npm run build` y buscar valores sospechosos en `.next/static` (claves, `postgres://`, `Bearer `). Debe dar **cero** resultados.
- [ ] `.env.local` está en `.gitignore`. **El repo es público**: nunca escribas un valor real en un archivo que se suba.

---

## 6. Secretos en Git: prevenir, detectar y eliminar
**Prevenir:**
- [ ] `.gitignore` incluye `.env*` excepto `.env.example`.
- [ ] **gitleaks** en GitHub Actions en cada PR y push (bloquea el PR si encuentra un secreto).
- [ ] Recomendado: gitleaks también como *pre-commit* local.
- [ ] GitHub: Secret scanning y Push protection (gratis en repos públicos): Settings → Advanced Security.

**Detectar en el historial:** `gitleaks git .` revisa todos los commits, no solo el último.

**Si se filtró un secreto (en este orden):**
1. **Rotarlo de inmediato** en el servicio al que pertenece. Es lo único que realmente lo invalida.
2. Revisar los registros del servicio por uso indebido.
3. Borrarlo del historial con `git filter-repo --replace-text` (o BFG), luego `git push --force` y pedir al otro que vuelva a clonar.
4. Registrar el incidente en `BITACORA.md`.
> Borrar el commit **no basta**: GitHub, los forks, las copias locales y los cachés pueden conservarlo. Por eso el paso 1 es rotar.

---

## 7. Dependencias peligrosas y escaneo
- [ ] **Dependabot** (`.github/dependabot.yml`): alertas de seguridad + actualizaciones semanales agrupadas de npm y GitHub Actions.
- [ ] **CI en cada PR** (`.github/workflows/ci.yml`): `npm ci` → `npm run lint` → `npm run build` → `npm audit --audit-level=high --omit=dev` → gitleaks. Si algo falla, no se fusiona.
- [ ] `package-lock.json` siempre en el repo; en CI se usa `npm ci` (instala exactamente lo del lockfile).
- [ ] `.npmrc` con `save-exact=true` (versiones exactas, sin `^`).
- [ ] **Antes de instalar cualquier paquete nuevo**, proponerlo y esperar aprobación, verificando: nombre exacto (cuidado con *typosquatting*), descargas semanales, fecha de la última versión, repositorio público y licencia. Registrar en `DECISIONES.md` por qué se agregó.
- [ ] Revisar `npm audit` antes de cada despliegue a producción. Si una vulnerabilidad alta no tiene arreglo, documentar por qué no afecta o reemplazar el paquete.
- [ ] **CodeQL** (análisis de código): gratis porque el repo es público; activarlo con *Default setup* en Settings → Advanced Security.
- [ ] No fusionar actualizaciones mayores de Dependabot sin probarlas (por ejemplo, TypeScript 7 todavía no funciona con Next.js 16; `@types/node` debe coincidir con la versión de Node de Vercel).

---

## 8. Cuentas y plataformas
- [ ] 2FA en GitHub y Vercel (y en cualquier servicio nuevo que se agregue).
- [ ] Repo **público** (el plan Hobby de Vercel no permite colaborar en repos privados); solo los dos como colaboradores, con `main` protegida (PR obligatorio y revisiones de la CI). La seguridad nunca depende de que el código sea secreto, sino de que no haya secretos en él.
- [ ] Vercel: activar **Deployment Protection** en las previsualizaciones (solo personas con acceso a Vercel las ven).

---

## 9. Datos personales — Ley 1581 de 2012 (Habeas Data)
El formulario pide nombre, empresa, correo, teléfono y, opcionalmente, NIT, así que aplica la ley colombiana de protección de datos, aunque el sitio **no los almacene**: cuando la persona envía el mensaje, Fesapy pasa a tratar esos datos.
- [ ] Página `/politica-de-datos` con: responsable (razón social, NIT, dirección y correo de Fesapy), finalidad (responder cotizaciones), derechos del titular (conocer, actualizar, rectificar, suprimir, revocar), canal y plazos para ejercerlos, tiempo de conservación y fecha/versión. Hoy es un **borrador** con `TODO(contenido)`: debe revisarla la empresa (idealmente con un abogado).
- [ ] Casilla **obligatoria y no marcada por defecto**: "Autorizo el tratamiento de mis datos según la política…" con enlace. El mensaje que se arma incluye la frase de autorización.
- [ ] Solo pedir los datos necesarios (NIT opcional). No pedir datos sensibles.
- [ ] **Cookies:** el sitio no usa cookies de analítica ni de publicidad, así que no hay aviso de cookies. Si se agrega analítica o un servicio de terceros, hay que agregar el aviso con "Aceptar" y "Rechazar" igual de visibles, y que no se cargue nada hasta aceptar.
- [ ] **Conservación:** definir con la dueña cuánto tiempo guarda Fesapy las cotizaciones recibidas por WhatsApp y correo, y escribirlo en la política.
- [ ] Evaluar con el contador o asesor legal si Fesapy debe registrar sus bases de datos en el RNBD de la SIC.

> Esto no es asesoría legal: la política final debe revisarla la empresa.

---

## 10. Imágenes y derechos de autor
- Usar fotos de productos de marcas solo si Fesapy es distribuidor y la marca lo permite (material de prensa del fabricante o del distribuidor mayorista). Lo ideal: fotos propias. Las imágenes tomadas al azar de Google pueden tener derechos de autor.
- Toda imagen que no sea propia se registra en `docs/CREDITOS-IMAGENES.md` (autor, enlace y licencia).
- Archivos subidos al repo: sin metadatos (EXIF) y optimizados.

---

## 11. Incidentes
**Plan de incidente (1 página):** 1) contener (rotar la clave afectada, quitar el contenido o el acceso), 2) evaluar qué se expuso, 3) avisar a la dueña de Fesapy, 4) si hubo datos personales, evaluar el reporte a la SIC, 5) corregir y documentar en `BITACORA.md`.

---

## 12. Si algún día vuelve un servidor o una base de datos
Hoy no hay nada de esto. Si una tarea necesita guardar o procesar datos personales en un servidor (base de datos, correo desde el servidor, cuentas, panel), **no se improvisa**: primero se propone, se registra en `DECISIONES.md` y se vuelve a diseñar la seguridad. Como punto de partida están los controles de la versión anterior de este documento (en el historial de Git): validar en el servidor con `z.strictObject`, una sola capa de acceso a datos con permisos verificados, cifrar correo, teléfono y NIT, límite de intentos y anti-bots en los formularios, respuestas genéricas y sin datos personales en los logs, y subida de archivos verificando los bytes.
La alternativa más simple para recibir las solicitudes sin base de datos sería un envío de correo desde el servidor (Server Action + Resend), que se descartó por ahora (ver `DECISIONES.md`, 2026-11-09).
