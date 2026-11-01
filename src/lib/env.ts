import "server-only";
import { z } from "zod";

// ÚNICO lugar del servidor que lee process.env (docs/ARQUITECTURA-Y-SEGURIDAD.md §6.15).
// Valida todo al arrancar: si falta una variable o tiene mal formato, la app falla
// con un mensaje claro en lugar de funcionar a medias.
// DIRECT_URL no está aquí: solo la usa la CLI de Prisma (migraciones), no la app.

const urlPostgres = z
  .string()
  .regex(/^postgres(ql)?:\/\//, "debe empezar por postgresql://")
  .refine(
    (url) => /[?&]sslmode=require\b/.test(url) || /@(localhost|127\.0\.0\.1)[:/]/.test(url),
    "debe incluir sslmode=require (conexión cifrada a Neon)",
  );

// 32 bytes en base64 = llave AES-256. Se genera con: openssl rand -base64 32
const llave32Bytes = z
  .string()
  .refine((valor) => Buffer.from(valor, "base64").length === 32, "debe ser de 32 bytes en base64");

const secretoLargo = z.string().min(32, "debe tener al menos 32 caracteres");

const esquema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: urlPostgres,
  AUTH_SECRET: secretoLargo,
  DATA_ENCRYPTION_KEY: llave32Bytes,
  IP_HASH_SECRET: secretoLargo,
  TURNSTILE_SECRET_KEY: z.string().min(1),
  // Solo la usa el script que crea los primeros ADMIN (Día 5). Correos separados por comas.
  ADMIN_EMAILS: z
    .string()
    .optional()
    .transform((valor) =>
      (valor ?? "")
        .split(",")
        .map((correo) => correo.trim().toLowerCase())
        .filter(Boolean),
    )
    .pipe(z.array(z.email())),
  // Opcionales hasta que exista la función que las usa: se vuelven obligatorias
  // el Día 4 (Resend) y el Día 5 (Blob).
  RESEND_API_KEY: z.string().startsWith("re_").optional(),
  BLOB_READ_WRITE_TOKEN: z.string().startsWith("vercel_blob_rw_").optional(),
});

// Se arma el objeto campo por campo (no se pasa process.env completo).
const resultado = esquema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  DATA_ENCRYPTION_KEY: process.env.DATA_ENCRYPTION_KEY,
  IP_HASH_SECRET: process.env.IP_HASH_SECRET,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  ADMIN_EMAILS: process.env.ADMIN_EMAILS,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
});

if (!resultado.success) {
  // Solo nombres de variables y el problema, NUNCA los valores (son secretos).
  const problemas = resultado.error.issues
    .map((problema) => `  - ${problema.path.join(".") || "(raíz)"}: ${problema.message}`)
    .join("\n");
  throw new Error(
    `Variables de entorno inválidas o faltantes (revisa .env.local o Vercel; plantilla en .env.example):\n${problemas}`,
  );
}

export const env = resultado.data;
