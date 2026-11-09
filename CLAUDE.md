# CLAUDE.md — Proyecto web Fesapy

Este archivo lo lee Claude Code al inicio de cada sesión. Contiene el contexto y las reglas del proyecto. Si algo aquí cambia, se actualiza este archivo en el mismo commit.

## Qué es Fesapy
Empresa colombiana proveedora integral de seguridad industrial para empresas (B2B principalmente). Nombre: **Fesapy Distribuciones** ("Dotaciones para tu empresa"). Una sola sede, en Madrid (Cundinamarca). Despacha a nivel nacional e internacional.

- **Fabrica y personaliza dotación**: overoles, uniformes, ropa de trabajo con logos estampados y bordados.
- **Distribuye**: EPP, calzado de seguridad de varias marcas, eslingas, lubricantes y mantenimiento (WD-40, CRC), botiquines.
- **Señalización y seguridad vial**: letreros, señales, conos, cintas de demarcación, barreras y delineadores; stickers.
- **Diferencial**: es una marca multifuncional, "todo en uno": la empresa le compra toda su seguridad a un solo proveedor.

Detalles completos en `docs/BRIEF.md`.

## Objetivo de la página
1. Que el visitante conozca la empresa y confíe (clientes, testimonios y la sede de Madrid).
2. Que escriba por WhatsApp con un clic.
3. Que pida cotización con un formulario que arma el mensaje y abre WhatsApp o su correo (el sitio no guarda nada).
4. Que el equipo de Fesapy mantenga el contenido (categorías, datos de contacto, textos) en `src/lib/contenido.ts` y en las páginas, mediante un Pull Request.

No hay pagos en línea ni precios públicos (por ahora). **Tampoco hay base de datos, login ni panel** (cambio de rumbo del 9 de noviembre de 2026; ver `docs/DECISIONES.md`).

## Equipo y forma de trabajo
- Dos personas trabajan en este repo, cada una con su propio Claude Code. Ambas están aprendiendo.
- **Explica siempre lo que haces** en español sencillo: qué archivo tocaste, por qué y qué concepto hay detrás. Al final de cada tarea, resume en 3 a 6 viñetas.
- **Documenta cada tarea terminada** en `docs/BITACORA.md` (formato al inicio de ese archivo).
- **Toda decisión técnica relevante** (librería nueva, cambio de estructura, cambio de modelo de datos, cambio de seguridad) va en `docs/DECISIONES.md`.
- Trabaja en una rama `feat/...`, `fix/...`, `docs/...` o `chore/...`, nunca directo en `main`. Flujo en `docs/COLABORACION.md`.
- Antes de empezar: `git pull` y revisa `docs/PLAN.md` para saber qué sigue y qué está tomado.
- Si una instrucción es ambigua o falta contenido real (textos, fotos, datos de contacto), **no lo inventes**: usa un placeholder visible `TODO(contenido): ...` y avisa.

## Stack
- **Next.js 16** (App Router, `cacheComponents` activo) + TypeScript (modo `strict`)
  - Esta versión trae cambios importantes respecto a versiones anteriores: **antes de escribir código de Next.js, lee la guía correspondiente en `node_modules/next/dist/docs/`** (ver `AGENTS.md`). Por ejemplo, el antiguo `middleware.ts` ahora se llama `proxy.ts`.
- Tailwind CSS v4 (tokens con `@theme` en `src/app/globals.css`)
- Zod para validar el formulario de cotización (en el navegador)
- Despliegue en Vercel (hoy el sitio no usa variables de entorno)
- Sin base de datos, login, panel ni servicios externos

Justificación y alternativas en `docs/ARQUITECTURA-Y-SEGURIDAD.md`.

## Comandos
```bash
npm run dev          # servidor local
npm run build        # build de producción (debe pasar antes de abrir PR)
npm run lint         # ESLint
npm audit --audit-level=high --omit=dev   # vulnerabilidades en dependencias
```

## Estructura
```
src/
  app/
    layout.tsx  globals.css   # fuentes, metadata base y tokens de diseño
    (sitio)/                  # páginas públicas (comparten layout.tsx: barra, encabezado, pie, WhatsApp)
      page.tsx                # inicio
      cotizacion/             # formulario (arma el mensaje; no guarda nada)
      productos/              # solo las categorías, sin precios
      personalizacion/        # bordado y estampado
      nosotros/
      politica-de-datos/
  components/
    ui/                       # botones e íconos
    sitio/                    # barra de anuncio, encabezado, pie, botón WhatsApp flotante
    inicio/                   # secciones de la home (incluye el carrusel del hero)
    catalogo/                 # tarjetas de categoría y de producto, galería, migas, carrusel móvil
    cotizacion/               # formulario de cotización (Client Component)
  lib/
    contenido.ts              # datos de la empresa, contacto, sede, redes y las 8 categorías
    catalogo.ts               # los 30 productos, transcritos del portafolio de Fesapy (sin precios)
    whatsapp.ts  correo.ts  mensajeCotizacion.ts   # enlaces wa.me y mailto: con encodeURIComponent
    sanitizar.ts              # limpieza de texto escrito por personas
    validaciones/             # esquemas Zod
public/
  marca/  referencia/  catalogo/   # logo, fotos de referencia y fotos del catálogo (créditos en docs/CREDITOS-IMAGENES.md)
_fuentes/                     # SOLO en tu computador (ignorada por Git): portafolio en PDF y scripts de extracción
docs/
```

## Diseño
- Colores de marca: dorado (del logo) y negro. Tokens como variables CSS en `globals.css` (`@theme`):
  - `--dorado: #E8B53E` (fondos, botones, acentos; sacado del logo)
  - `--negro: #111111` (texto y fondos oscuros)
  - `--crema: #F5F4F0` (fondos de sección claros)
  - `--gris: #4A4A4A` (texto secundario y bordes)
  - `--blanco: #FFFFFF`
- **Nunca** texto dorado sobre fondo blanco o crema (contraste insuficiente). Dorado siempre como fondo con texto negro, o como texto sobre fondo negro.
- Tipografía: **Barlow Condensed** (títulos, en mayúsculas, peso 700) + **Barlow** (texto). Cargar con `next/font/google`.
- Estilo industrial, limpio, mucho contraste. Mobile first: la mayoría de clientes entrará desde el celular.
- Botón flotante de WhatsApp visible en todas las páginas públicas.
- Animaciones discretas y sin librerías (ver `docs/DECISIONES.md`, 2026-11-09): solo `opacity` y `transform`, sin rebotes ni parallax, sin mover el diseño (CLS 0), y **todas se desactivan con `prefers-reduced-motion`**. El contenido debe verse aunque falle JavaScript. Botones de mínimo 44 px de alto. Un solo `h1` por página.
- Enlace "estirado" (un `::after` que cubre toda una tarjeta): **nunca** lleva `transform`/`scale`, porque se vuelve el contenedor de su `::after` y el clic sobre la tarjeta se pierde.
- Fotos que no sean propias: solo con licencia libre o autorización de uso, registradas en `docs/CREDITOS-IMAGENES.md`.
- Catálogo: nombres, descripciones, características, diferenciadores y normas se **transcriben** del portafolio; no se inventan precios, tallas, colores, existencias ni certificaciones (si falta algo, `TODO(contenido)`). `_fuentes/` nunca se sube (el repo es público).

## Reglas de seguridad (obligatorias)
Detalle completo y razones en `docs/ARQUITECTURA-Y-SEGURIDAD.md`. Si una tarea choca con estas reglas, **detente y pregunta**.

**Sin datos en el servidor**
- El sitio no tiene base de datos, login, panel ni Server Actions que guarden datos. El formulario de cotización solo arma un mensaje y abre WhatsApp (`wa.me`) o el correo (`mailto:`); no envía nada a un servidor propio.
- Si una tarea necesita guardar, enviar o procesar datos personales en un servidor (base de datos, correo desde el servidor, analítica, cuentas), **detente y pregunta**: obliga a volver a diseñar la seguridad (validación en el servidor, cifrado, límites, Ley 1581 de 2012).

**Datos que entran**
- Todo campo del formulario se valida con Zod (`z.strictObject`, con límites de largo) y se limpia con `src/lib/sanitizar.ts`. Validar en el navegador ayuda a quien escribe; no es una barrera de seguridad.
- Los enlaces con datos de personas se arman con `encodeURIComponent`. El asunto de `mailto:` va en una sola línea.
- Prohibido `dangerouslySetInnerHTML` con contenido que no sea nuestro. JSON-LD escapando `<`.
- Enlaces externos con `target="_blank"` y `rel="noopener noreferrer"`.

**Secretos**
- Nunca subir secretos al repo. Todo va en `.env.local` (ignorado) y en Vercel. `.env.example` actualizado sin valores.
- Hoy no hay variables de entorno. Si hace falta una, propónlo antes: se lee solo desde `src/lib/env.ts` validado con Zod, y no se hace obligatoria si el sitio puede funcionar sin ella (para no romper el build). ESLint prohíbe `process.env` fuera de `next.config.ts`.
- Las variables `NEXT_PUBLIC_` llegan al navegador: solo para datos que puedan ser públicos.
- Nunca imprimas en la terminal ni copies al chat el contenido de `.env.local`.

**Dependencias**
- **No instales paquetes sin proponerlo primero** con su nombre exacto, para qué sirve, descargas semanales y última versión. Espera aprobación y regístralo en `DECISIONES.md`.
- Versiones exactas (`.npmrc` con `save-exact=true`). `npm audit` sin vulnerabilidades altas antes de abrir PR.

**Infraestructura**
- Cabeceras de seguridad en `next.config.ts`. Si agregas un servicio externo (scripts, imágenes, iframes), actualiza la CSP y anótalo en `DECISIONES.md`.

**Contenido**
- Imágenes de productos de marcas: solo las que Fesapy tenga autorización de usar (material de prensa del fabricante o distribuidor, o fotos propias). No descargar imágenes al azar de Google.

## Contenido
- Textos en español de Colombia, tono profesional y cercano, orientado a empresas (jefes de compras, HSE/SST).
- SEO: cada página con `metadata` (título y descripción), `sitemap.ts`, `robots.ts`, datos estructurados `LocalBusiness` para la sede de Madrid.
