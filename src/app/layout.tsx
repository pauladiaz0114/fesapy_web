import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

// Barlow no es una fuente variable: hay que indicar los grosores que usamos.
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  // Cada página escribe solo su parte ("Productos") y Next.js agrega el nombre de la empresa.
  title: { default: "Fesapy Distribuciones", template: "%s — Fesapy Distribuciones" },
  description:
    "Todo lo que tu empresa necesita en seguridad, en un solo lugar. Uniformes industriales, elementos de protección personal y calzado de seguridad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-CO"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
