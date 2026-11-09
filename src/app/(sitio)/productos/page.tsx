import type { Metadata } from "next";
import { ChipsCategorias } from "@/components/catalogo/ChipsCategorias";
import { Migas } from "@/components/catalogo/Migas";
import { Categorias } from "@/components/inicio/Categorias";
import { EncabezadoPagina } from "@/components/sitio/EncabezadoPagina";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Productos del portafolio de Fesapy Distribuciones: dotación, calzado de seguridad, elementos de protección personal, trabajo en alturas y señalización y seguridad vial. Sin precios: cotiza por WhatsApp o por correo.",
};

// Catálogo estático: categorías y, dentro de cada una, los productos del portafolio. Sin precios.
export default function Productos() {
  return (
    <>
      <EncabezadoPagina titulo="Productos">
        <p>
          Estos son los productos de nuestro portafolio, organizados por categoría. Elige una y
          cotiza lo que necesita tu empresa.
        </p>
      </EncabezadoPagina>
      <div className="bg-crema px-4 pb-4">
        <div className="mx-auto max-w-6xl">
          <Migas items={[{ texto: "Inicio", href: "/" }, { texto: "Productos" }]} />
        </div>
      </div>
      <ChipsCategorias />
      <Categorias titulo="Elige una categoría" id="titulo-categorias-productos" />
    </>
  );
}
