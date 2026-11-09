import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Regla de seguridad del proyecto (docs/ARQUITECTURA-Y-SEGURIDAD.md §5).
  // Hoy el sitio no usa variables de entorno. Si algún día hacen falta, se lee todo desde
  // UN solo archivo validado (src/lib/env.ts) y se agrega a la lista de abajo.
  {
    rules: {
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "env",
          message:
            "No leas process.env aquí. Si necesitas una variable, propónlo y créala en src/lib/env.ts (validada con Zod). Ver docs/ARQUITECTURA-Y-SEGURIDAD.md §5.",
        },
      ],
    },
  },
  {
    // Único archivo que lee process.env hoy: la configuración de Next.js (modo desarrollo).
    files: ["next.config.ts"],
    rules: {
      "no-restricted-properties": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
