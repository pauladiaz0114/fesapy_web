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
La app usa el rol `fesapy_app` (solo SELECT/INSERT/UPDATE/DELETE); las migraciones, el rol dueño. Rama `production` de Neon para producción y `development` para previews y local (nombres definitivos, ver 2026-11-01).
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

## 2026-11-01 · Ramas de Neon: `production` y `development`
La rama principal de Neon se llama `production`; `development` se creó desde ella (hereda tablas, roles y permisos). En `development` se cambiaron las contraseñas de `fesapy_app` y `neondb_owner`.
**Por qué:** nombres que coinciden con los entornos de Vercel; contraseñas distintas para que un `.env.local` filtrado no exponga producción.

## 2026-11-01 · `fesapy_app` se crea con SQL, no desde la consola de Neon
**Por qué:** según la documentación de Neon, los roles creados por la consola, la CLI o la API son miembros de `neon_superuser` (CREATEDB, CREATEROLE, BYPASSRLS, todos los permisos en `public`). Los creados con SQL solo tienen lo concedido. También se revoca el acceso a `_prisma_migrations`.
**Verificado:** la app lee las tablas, pero no puede crear, borrar, alterar ni vaciar tablas, ni crear roles.

## 2026-11-01 · Scripts `db:*` con `node --env-file=.env.local`
`npm run db:migrar`, `db:estado` y `db:studio` ejecutan la CLI de Prisma cargando `.env.local` con una opción nativa de Node.
**Por qué:** la CLI de Prisma 6 solo lee `.env`; así los secretos viven en un solo archivo.
**Descartado:** `dotenv-cli` (paquete nuevo innecesario); duplicar las variables en `.env`.

## 2026-11-01 · Llaves de cifrado por rama de Neon; `DIRECT_URL` fuera de Vercel
`DATA_ENCRYPTION_KEY` e `IP_HASH_SECRET` son una por rama de Neon: los `.env.local` y Preview (todos sobre `development`) comparten las mismas; Production tiene las suyas. `AUTH_SECRET` es distinto en cada lugar. `DIRECT_URL` (rol dueño) solo existe en los computadores y en el gestor de contraseñas.
**Por qué:** con llaves distintas sobre la misma base, nadie podría leer los datos cifrados por los otros. Vercel no necesita la URL del dueño para compilar ni para funcionar, y tenerla allí permitiría alterar tablas si se filtrara.
**Cómo compartir secretos:** organización gratuita de Bitwarden para los dos (o Bitwarden Send con la contraseña por otro canal). Nunca por chat, correo ni GitHub.

## 2026-11-01 · Colores: dorado del logo en vez de amarillo
`--amarillo` (#FFD100) se reemplaza por `--dorado: #E8B53E`, muestreado del logo "Fesapy Distribuciones" (dorado sobre negro). Se agrega `--crema: #F5F4F0` para fondos claros. `--gris: #4A4A4A` queda para texto secundario (el `#F4F4F4` que decía `CLAUDE.md` nunca se usó).
**Regla:** el dorado nunca va como texto sobre blanco o crema; solo como fondo con texto negro (≈ 10:1) o sobre negro.
**Por qué:** la marca tiene logo dorado y el amarillo ya no combinaba. Resuelve también la diferencia de colores entre `CLAUDE.md` y `globals.css` anotada en la bitácora del Día 1.

## 2026-11-01 · Primera versión: página de inicio única con WhatsApp
Antes del sitio completo se publica una sola página, sin menú ni enlaces a otras páginas. La única acción es "Cotizar por WhatsApp" con mensaje prellenado (empresa, NIT, productos, logo, ciudad), armado con `encodeURIComponent` en `src/lib/whatsapp.ts`. Los datos de la empresa viven en `src/lib/contenido.ts`.
**Por qué:** no se guarda ningún dato personal en la base, se publica rápido y sirve para ver qué piden los clientes. El formulario de cotización y el catálogo siguen en el plan.
**Detalles:** enlaces externos con `target="_blank" rel="noopener noreferrer"`. Página 100 % estática (el año del © está fijo en `contenido.ts` para no depender de la fecha del servidor). Íconos en SVG escritos en el código (trazos de Lucide, licencia ISC), sin instalar paquetes.

## 2026-11-01 · Fotos de referencia de Pexels mientras llegan las propias
Cuatro fotos de Pexels (licencia libre, uso comercial permitido) en `public/referencia/`, registradas en `docs/CREDITOS-IMAGENES.md` con autor y enlace. Sin caras en primer plano ni logos de marcas. Optimizadas a WebP 800 × 800 sin metadatos con `sharp` (dependencia que ya trae Next.js; no se instaló nada).
**Pendiente:** reemplazarlas por fotos propias de Fesapy, sobre todo un overol con logo bordado.

## 2026-11-09 · Formulario de cotización sin guardar datos (arma mensaje y abre WhatsApp/correo)
`/cotizacion` es un Client Component: valida con Zod en el navegador, arma el mensaje y abre `wa.me/573123329422?text=...` o un `mailto:` con asunto y cuerpo (`encodeURIComponent`). No hay Server Actions, base de datos ni almacenamiento; la persona envía el mensaje por el canal que elige.
**Por qué:** cambio de rumbo (sin base de datos, login ni panel). Al no guardar nada, el sitio no almacena datos personales y baja el riesgo bajo la Ley 1581 de 2012: no hay datos que filtrar, cifrar, conservar ni borrar. El aviso bajo el formulario y la política de datos lo dicen claro.
**Descartado (para evaluar luego):** Server Action + Resend, que entrega la solicitud aunque la persona no envíe nada y permite un historial, pero obliga a guardar o procesar datos personales, Turnstile, límite por IP y cifrado (las reglas de seguridad de `CLAUDE.md`).
**Detalles:** el asunto del correo va en una sola línea y los textos se limpian (`src/lib/sanitizar.ts`) para evitar inyección de cabeceras. Teléfono colombiano (celular, fijo con indicativo o fijo local), NIT opcional y límites de largo. Casilla de autorización obligatoria y sin marcar. Si se agrega un servidor, esta validación se repite allí.

## 2026-11-09 · Home con estructura de dwork.com.co, contenido propio
Se tomó solo la estructura (orden de secciones, dos botones en el hero, bloque de cotización, categorías, reseñas) como referencia. Textos, imágenes, logos y nombre son de Fesapy; no se copió nada.
**Por qué:** estructura probada para compra B2B sin copiar contenido ajeno (derechos de autor).
**Decisiones de diseño:** menú de enlaces simples, sin desplegables ni "hamburguesa" (en celular baja de renglón); marco común en `src/app/(sitio)/layout.tsx`; textos prudentes: no se afirman plazos, inventario, crédito ni alcance de la asesoría (quedan como `TODO(contenido)`); clientes y reseñas son marcadores visibles hasta tener datos reales y permiso.

## 2026-11-09 · Política de datos como borrador revisable
`/politica-de-datos` se publica como borrador (versión 0.1) con una nota visible: la empresa (idealmente con un abogado) debe revisarla. Razón social, NIT, dirección y plazo de conservación quedan como `TODO(contenido)`.
**Por qué:** hace falta el enlace de la casilla de autorización, pero no se deben inventar los datos legales de la empresa.

## 2026-11-09 · Categoría "Señalización y seguridad vial" (se mantienen 8 categorías)
"Señalización y letreros" se renombra a "Señalización y seguridad vial" (slug `senalizacion-y-seguridad-vial`) para incluir conos, cintas de demarcación, barreras y delineadores.
**Por qué:** Fesapy vende esos productos y no cabían en el nombre anterior. No se crea una novena categoría para no alargar el menú ni la lista del formulario.
**Slug viejo:** `?categoria=senalizacion` ya no coincide con ninguna categoría y se ignora sin error (el formulario queda sin categoría elegida). Aceptable: el sitio es nuevo y no hay enlaces guardados en otros lados.
**Texto:** el bloque "¿No ves lo que buscas? Cuéntanos qué necesitas y te cotizamos." no promete inventario ni plazos.

## 2026-11-09 · Catálogo estático con datos del portafolio (sin base de datos)
Los 30 productos del portafolio de Fesapy se transcriben en `src/lib/catalogo.ts` (un archivo tipado) y las páginas `/productos`, `/productos/<categoria>` y `/productos/<categoria>/<producto>` se generan como páginas estáticas con `generateStaticParams`. Una categoría o un producto inválido responde con `notFound()`.
**Por qué:** el sitio no tiene base de datos ni panel (ver "Se cancela Neon…"). Con 30 productos, un archivo en el repo es lo más simple, no se puede romper en tiempo de ejecución, carga rápido y cada cambio pasa por un Pull Request revisado. Los datos son solo texto y fotos públicas: no hay datos personales.
**Regla de oro:** nombres, descripciones, características, diferenciadores y normas se **transcriben** del portafolio. No se inventan precios, tallas, colores, existencias ni certificaciones. Lo que falta queda como `TODO(contenido)`. Las normas se muestran con la etiqueta "Normas indicadas en el portafolio de Fesapy" y se copian tal cual (incluido un probable error de tipeo del PDF: `ANSI/ASSEA10.32-2012`).
**Detalles:**
- Las categorías sin productos en el portafolio (botiquines, stickers y lubricantes) no inventan nada: muestran "Pídenos cotización de esta categoría".
- `/cotizacion?categoria=<slug>&producto=<slug>` valida ambos valores contra el catálogo (los desconocidos se ignoran) y escribe "Quiero cotizar: <producto>" en el mensaje, que la persona puede editar.
- Las fotos (62, 1,0 MB) vienen del propio PDF, en `public/catalogo/` (ver `CREDITOS-IMAGENES.md`). Falta confirmar con Fesapy que puede usarlas en la web.
- **Comportamiento conocido de Next.js 16 con `cacheComponents`:** `dynamicParams` no está disponible, así que la **primera** visita a una URL inventada responde 200 (con el contenido "404: This page could not be found" y `noindex`) y las siguientes 404. Nadie enlaza a URLs inválidas, así que no se agregó un `proxy.ts` para forzarlo.
**Alternativas descartadas:** base de datos o panel (descartados el 2026-11-09); un CMS externo (más cuentas y servicios que mantener); una página de producto por cada referencia (el portafolio agrupa varias referencias por ficha, p. ej. las botas 9009 / 9309 / 8609, y se respetó esa agrupación).

## 2026-11-09 · Animaciones discretas con respeto a prefers-reduced-motion
Se agregan animaciones pequeñas, hechas solo con CSS y React (sin librerías): aparición al hacer scroll (`Reveal`: sube 12 px y se desvanece en 500 ms, una sola vez), tarjetas que suben 3 px con sombra suave y foto que se agranda ~3 %, botones con transición de 200 ms y leve presión al hacer clic, subrayado dorado que crece en el menú, sombra del encabezado al hacer scroll y entrada suave (una vez) del botón flotante de WhatsApp.
**Reglas:**
- Solo se animan `opacity` y `transform`: no mueven el diseño (CLS 0 medido en la home y en `/productos`) y casi no cuestan rendimiento.
- Sin rebotes, parallax, pulsos permanentes ni efectos llamativos.
- **Todo se apaga con `prefers-reduced-motion: reduce`:** un interruptor general en `globals.css` deja las transiciones y animaciones en ~0 s, `Reveal` ni siquiera marca los bloques y los efectos de movimiento (subir, agrandar, presionar) usan `motion-safe:`.
- **Si JavaScript falla, nada queda invisible:** el servidor no pone ningún atributo de ocultar; `Reveal` lo agrega ya en el navegador y solo a lo que está fuera de la pantalla al cargar (lo de arriba no parpadea).
**Detalles:** el encabezado se queda pegado arriba solo desde pantallas grandes (`lg`); en celular ocuparía demasiado (2 filas). Su sombra y `Reveal` cambian un atributo del elemento directamente, sin `useState`, para no volver a pintar componentes en cada scroll (el evento va como *passive* y agrupado con `requestAnimationFrame`). El carrusel del hero agrega un botón de pausa (no pedido) porque pausar solo con el mouse o el foco no sirve a quien usa el celular.
**Descartado:** Framer Motion, GSAP y similares (dependencias nuevas sin necesidad); `scroll-behavior: smooth` global; animar el menú del celular.

## 2026-11-10 · Pulir movimiento y experiencia: carruseles con pointer events, validación al salir del campo y menú hamburguesa
**Carruseles sin librería, con *pointer events*.** El hero se desliza con el dedo o el mouse comparando dónde empieza y dónde termina el arrastre (mínimo 40 px y más horizontal que vertical), con `touch-action: pan-y` para no bloquear el scroll de la página. El punto activo se llena como barra de progreso: esa animación de CSS (5 s) es el "reloj" del carrusel (`animationend` pasa la foto y `animation-play-state` la pausa). Se pausa con mouse (solo puntero de mouse), foco, botón, pestaña oculta y cuando el hero sale de la pantalla (IntersectionObserver). Con `prefers-reduced-motion` nunca avanza solo.
**Por qué:** cero dependencias (regla del proyecto) y el comportamiento que se necesita es poco: no hace falta arrastre que siga al dedo, solo cambiar de foto. **Descartado:** Embla, Swiper, Keen Slider (dependencias nuevas sin necesidad); un `setInterval` aparte de la barra (se desincronizan al pausar).

**Validación al salir del campo (onBlur) y al enviar, no mientras se escribe.** Un error aparece al salir del campo (si la persona escribió algo o ya tenía error) o al enviar; se **quita** apenas el campo queda bien mientras escribe. Si se sale del campo presionando algo con el mouse o el dedo, la validación espera a que termine el clic.
**Por qué:** regañar mientras se escribe es molesto ("correo inválido" a la segunda letra). La espera del clic evita un error real encontrado al probar: el mensaje de error movía el formulario entre presionar y soltar y el clic se perdía. **Descartado:** validar en cada tecla; reservar siempre un renglón vacío bajo cada campo (cambia el diseño).

**Envío sin doble clic.** Los botones usan `aria-disabled` (no `disabled`, que quita el foco del teclado) durante 1,2 s mientras dicen "Abriendo WhatsApp…" / "Abriendo correo…"; los dos textos ocupan la misma celda de una grilla para que el botón no cambie de ancho. El cuadro de gracias ocupa su lugar desde el clic y aparece con un fundido (CLS 0). Sigue sin enviarse nada a un servidor.

**Menú hamburguesa en celular y tableta (cambia la decisión del 2026-11-09 de "sin hamburguesa").** Por debajo de 1024 px el menú pasa a un botón que abre un panel (200 ms), con trampa de foco, scroll bloqueado y cierre con Escape, tocando fuera, al navegar o al agrandar la ventana. `html` lleva `scrollbar-gutter: stable` para que la página no se corra al bloquear el scroll.
**Por qué:** lo pidió Sebastián para pulir la experiencia: el encabezado del celular pasa de 2 filas a 1 y el menú se lee mejor con enlaces grandes (48 px).

**Un solo anillo de foco global** (`:focus-visible` fuera de las capas de Tailwind): franja negra + línea dorada, visible sobre crema, blanco y negro. Reemplaza las clases de foco que cada componente repetía.

**Entradas escalonadas e imágenes suaves.** `Reveal escalonar` (70 ms entre tarjetas; solo las 6 primeras de cada grupo suman retraso, las demás aparecen con la sexta) e `ImagenSuave` (fundido de 300 ms al cargar sobre el fondo crema). Las dos marcan el elemento solo desde JavaScript y solo si hace falta: si JS falla, todo se ve. Al terminar quitan su atributo para no interferir con el hover de las tarjetas. `preload` queda solo en la primera foto del hero; el logo y la foto principal del producto usan `loading="eager"`.

**Qué se dejó fuera y por qué:**
- *Transiciones entre páginas* (View Transitions): en Next.js 16 todavía son experimentales, cambian todo el sitio a la vez y en un sitio de pocas páginas no aportan; podrían marear o sentirse lentas.
- *Animaciones en el detalle de producto* (galería que se desliza, zoom): las fotos del portafolio son pequeñas (200–400 px) y agrandarlas o moverlas las vería peor; la galería solo usa el fundido de `ImagenSuave`.
