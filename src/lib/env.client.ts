import { z } from "zod";

// Variables PÚBLICAS: terminan en el JavaScript que descarga el navegador.
// La ÚNICA permitida es NEXT_PUBLIC_TURNSTILE_SITE_KEY (diseñada para ser pública).
// Cualquier otra NEXT_PUBLIC_ debe justificarse en docs/DECISIONES.md.
// Next.js solo reemplaza process.env.NEXT_PUBLIC_... si se escribe literalmente así.

const esquema = z.object({
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1),
});

export const envCliente = esquema.parse({
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
});
