import type { Metadata } from "next";
import { FranjaCotizar } from "@/components/inicio/FranjaCotizar";
import { LoQueOfrecemos } from "@/components/inicio/LoQueOfrecemos";
import { Portada } from "@/components/inicio/Portada";
import { Sectores } from "@/components/inicio/Sectores";
import { Encabezado } from "@/components/sitio/Encabezado";
import { PiePagina } from "@/components/sitio/PiePagina";
import { WhatsAppFlotante } from "@/components/sitio/WhatsAppFlotante";

// Título y descripción que muestran Google y WhatsApp al compartir el enlace.
export const metadata: Metadata = {
  title: "Fesapy Distribuciones — Dotaciones para tu empresa",
  description:
    "Uniformes industriales, elementos de protección personal y calzado de seguridad con el logo de tu empresa. Atendemos fábricas, petroleras y constructoras desde Madrid, Cundinamarca. Cotiza por WhatsApp.",
};

// Página de inicio: una sola página, sin menú. La única acción es cotizar por WhatsApp.
export default function Inicio() {
  return (
    <>
      <Encabezado />
      <main className="flex-1">
        <Portada />
        <LoQueOfrecemos />
        <Sectores />
        <FranjaCotizar />
      </main>
      <PiePagina />
      <WhatsAppFlotante />
    </>
  );
}
