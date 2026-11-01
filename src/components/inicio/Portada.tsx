import { BotonWhatsApp } from "@/components/ui/BotonWhatsApp";
import { empresa } from "@/lib/contenido";
import { CollageFotos } from "./CollageFotos";

// Primera sección (portada o "hero"). Aquí está el ÚNICO <h1> de la página:
// los buscadores y los lectores de pantalla lo usan como título principal.
export function Portada() {
  return (
    <section className="bg-crema px-4 py-12 sm:py-16 lg:py-20">
      {/* Mobile first: en celular una columna; desde lg, texto a la izquierda y fotos a la derecha. */}
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-5">
          {/* Texto negro sobre crema: el dorado no se usa como texto aquí. */}
          <p className="border-l-4 border-dorado pl-3 font-titulo text-lg font-bold uppercase tracking-wider text-gris">
            {empresa.lema}
          </p>
          <h1 className="font-titulo text-4xl font-extrabold uppercase leading-tight text-negro sm:text-5xl lg:text-6xl">
            Todo lo que tu empresa necesita en seguridad, en un solo lugar
          </h1>
          <p className="max-w-xl text-lg text-gris">
            Uniformes industriales, elementos de protección personal y calzado
            de seguridad, con el logo de tu empresa. Atendemos fábricas,
            petroleras y constructoras desde {empresa.ciudad}.
          </p>
          <BotonWhatsApp variante="negro" />
        </div>

        <CollageFotos />
      </div>
    </section>
  );
}
