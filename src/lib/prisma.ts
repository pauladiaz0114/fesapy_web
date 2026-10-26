import { PrismaClient } from "@prisma/client";

// En desarrollo, Next.js recarga los módulos con cada cambio. Si creáramos un
// PrismaClient nuevo cada vez, se agotarían las conexiones a la base de datos.
// Por eso guardamos una sola instancia en globalThis y la reutilizamos.
const globalParaPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalParaPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalParaPrisma.prisma = prisma;
}
