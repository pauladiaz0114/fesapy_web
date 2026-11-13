# Fesapy — sitio web

Sitio de Fesapy Distribuciones (dotación y seguridad industrial; sedes en Madrid (Cundinamarca), Bogotá y Villavicencio). Next.js 16 + TypeScript + Tailwind v4, desplegado en Vercel.

Es un sitio **sin base de datos, login ni panel**: el visitante escribe por WhatsApp o llena un formulario de cotización que **no guarda nada** (arma un mensaje y abre WhatsApp o su correo). El contenido se edita en `src/lib/contenido.ts`.

## Empezar
1. `npm install`
2. `npm run dev` y abrir http://localhost:3000

No hace falta ningún archivo `.env.local` (hoy el sitio no usa variables de entorno).

## Antes de subir cambios
`npm run lint` y `npm run build` deben pasar. Trabaja siempre en una rama (nunca en `main`) y abre un Pull Request.

## Documentación
- `docs/BRIEF.md` — qué es Fesapy y qué necesita la página
- `docs/PLAN.md` — qué está hecho y qué sigue
- `docs/ARQUITECTURA-Y-SEGURIDAD.md` — cómo está construido y los controles de seguridad vigentes
- `docs/COLABORACION.md` — ramas, pull requests y cómo no pisarnos
- `docs/DECISIONES.md` y `docs/BITACORA.md` — registro de decisiones y de tareas
- `docs/CREDITOS-IMAGENES.md` — origen y licencia de las imágenes
