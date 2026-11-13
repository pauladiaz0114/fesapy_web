import type { NextConfig } from "next";

const esDesarrollo = process.env.NODE_ENV === "development";

// Content-Security-Policy BÁSICA (sin nonces). Todo se sirve desde el propio sitio.
// Si agregas un servicio externo (scripts, imágenes, iframes, analítica), actualiza esta
// lista y anótalo en docs/DECISIONES.md.
// PENDIENTE: endurecerla (SRI y/o nonces, quitar 'unsafe-inline').
// Detalle en docs/ARQUITECTURA-Y-SEGURIDAD.md §3.
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
  // Sin "preload" hasta tener el dominio propio definitivo (es muy difícil de revertir).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
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
  // Redirecciones permanentes (308) de direcciones que ya no existen, para que no queden
  // enlaces rotos. 2026-11-12: "Trabajo en alturas e izaje" se unió a "Protección personal".
  async redirects() {
    return [
      {
        source: "/productos/trabajo-en-alturas",
        destination: "/productos/proteccion-personal",
        permanent: true,
      },
      {
        source: "/productos/trabajo-en-alturas/:producto",
        destination: "/productos/proteccion-personal/:producto",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
