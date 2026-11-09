import type { Metadata } from "next";
import { Categorias } from "@/components/inicio/Categorias";
import { EncabezadoPagina } from "@/components/sitio/EncabezadoPagina";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Categorías de Fesapy Distribuciones: dotación, calzado de seguridad, protección personal, trabajo en alturas, botiquines, señalización y seguridad vial, stickers y lubricantes.",
};

// Por ahora solo se muestran las categorías, sin precios ni fichas de producto.
export default function Productos() {
  return (
    <>
      <EncabezadoPagina titulo="Productos">
        <p>Estas son las categorías que manejamos. Elige una y cuéntanos qué necesitas.</p>
      </EncabezadoPagina>
      {/* TODO(contenido): catálogo de productos con foto, marca y descripción (docs/BRIEF.md §7). */}
      <Categorias titulo="Elige una categoría" />
    </>
  );
}
