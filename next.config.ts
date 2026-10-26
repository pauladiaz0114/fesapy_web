import type { NextConfig } from "next";

const esDesarrollo = process.env.NODE_ENV === "development";

// Content-Security-Policy BÁSICA (sin nonces).
// PENDIENTE Día 7: endurecerla (nonces, quitar 'unsafe-inline') y agregar los
// dominios de Vercel Blob, mapas o analítica si se usan. Ver docs/PLAN.md.
const csp = [
  "default-src 'self'",
  // 'unsafe-eval' solo en desarrollo: lo necesita la recarga en vivo de Next.js.
  `script-src 'self' 'unsafe-inline'${esDesarrollo ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(esDesarrollo ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const cabecerasDeSeguridad = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Quita la cabecera "X-Powered-By: Next.js" (no hay que anunciar la tecnología).
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: cabecerasDeSeguridad }];
  },
};

export default nextConfig;
