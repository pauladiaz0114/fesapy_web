import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Reglas de seguridad del proyecto (docs/ARQUITECTURA-Y-SEGURIDAD.md §6.9 y §6.15).
  {
    rules: {
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "env",
          message: "Lee las variables desde src/lib/env.ts (servidor) o src/lib/env.client.ts (públicas).",
        },
        {
          property: "$queryRawUnsafe",
          message: "Prohibido: usa prisma.$queryRaw con plantilla etiquetada.",
        },
        {
          property: "$executeRawUnsafe",
          message: "Prohibido: usa prisma.$executeRaw con plantilla etiquetada.",
        },
      ],
    },
  },
  {
    // Únicos archivos que pueden leer process.env.
    files: ["src/lib/env.ts", "src/lib/env.client.ts", "next.config.ts"],
    rules: {
      "no-restricted-properties": [
        "error",
        { property: "$queryRawUnsafe", message: "Prohibido." },
        { property: "$executeRawUnsafe", message: "Prohibido." },
      ],
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
