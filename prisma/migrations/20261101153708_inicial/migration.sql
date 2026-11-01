-- CreateEnum
CREATE TYPE "EstadoCotizacion" AS ENUM ('NUEVA', 'EN_PROCESO', 'RESPONDIDA', 'CERRADA');

-- CreateEnum
CREATE TYPE "AccionLimitada" AS ENUM ('COTIZACION', 'LOGIN');

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "descripcion" VARCHAR(1000),
    "imagen" VARCHAR(500),
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(170) NOT NULL,
    "descripcion" VARCHAR(3000) NOT NULL,
    "marca" VARCHAR(100),
    "tallas" TEXT[],
    "personalizable" BOOLEAN NOT NULL DEFAULT false,
    "imagenes" TEXT[],
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "categoriaId" TEXT NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "logo" VARCHAR(500),
    "orden" INTEGER NOT NULL DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonio" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "cargo" VARCHAR(100),
    "empresa" VARCHAR(150),
    "texto" VARCHAR(1000) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Testimonio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotizacion" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "empresa" VARCHAR(150) NOT NULL,
    "nitCifrado" TEXT,
    "correoCifrado" TEXT NOT NULL,
    "correoHash" VARCHAR(64) NOT NULL,
    "telefonoCifrado" TEXT NOT NULL,
    "ciudad" VARCHAR(100) NOT NULL,
    "mensaje" VARCHAR(2000) NOT NULL,
    "productos" VARCHAR(2000),
    "aceptaDatos" BOOLEAN NOT NULL,
    "aceptaDatosEn" TIMESTAMP(3) NOT NULL,
    "politicaVersion" VARCHAR(20) NOT NULL,
    "estado" "EstadoCotizacion" NOT NULL DEFAULT 'NUEVA',
    "creadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntentoLimitado" (
    "id" TEXT NOT NULL,
    "accion" "AccionLimitada" NOT NULL,
    "clave" VARCHAR(64) NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IntentoLimitado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_slug_key" ON "Categoria"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Producto_slug_key" ON "Producto"("slug");

-- CreateIndex
CREATE INDEX "Producto_categoriaId_idx" ON "Producto"("categoriaId");

-- CreateIndex
CREATE INDEX "Cotizacion_estado_creadaEn_idx" ON "Cotizacion"("estado", "creadaEn");

-- CreateIndex
CREATE INDEX "Cotizacion_correoHash_idx" ON "Cotizacion"("correoHash");

-- CreateIndex
CREATE INDEX "IntentoLimitado_accion_clave_creadoEn_idx" ON "IntentoLimitado"("accion", "clave", "creadoEn");

-- CreateIndex
CREATE INDEX "IntentoLimitado_creadoEn_idx" ON "IntentoLimitado"("creadoEn");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
