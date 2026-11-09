import { Reveal } from "@/components/ui/Reveal";

// "Problemas que resolvemos": 6 tarjetas. Textos originales y prudentes: solo se dice
// lo que está confirmado en docs/BRIEF.md (fabrica y personaliza, distribuye varias
// categorías, productos certificados, facturación electrónica, despachos).
const problemas = [
  {
    titulo: "Pedidos incompletos",
    texto: "Reúne dotación, calzado y elementos de seguridad en un solo pedido, no en varios.",
  },
  {
    titulo: "Calidad que no convence",
    texto: "Trabajamos con productos certificados para que tu equipo esté protegido.",
  },
  {
    titulo: "Tallas que no cuadran",
    texto: "Cuéntanos las tallas y cantidades de tu equipo al cotizar y las tenemos en cuenta.",
  },
  {
    titulo: "Uniformes sin tu logo",
    texto: "Bordamos o estampamos el logo de tu empresa en la dotación que fabricamos.",
  },
  {
    titulo: "Entregas que se complican",
    texto: "Dinos la ciudad de entrega y coordinamos el despacho contigo.",
  },
  {
    titulo: "Poca variedad",
    texto: "EPP, calzado, señalización y seguridad vial, botiquines, lubricantes y más, con un solo proveedor.",
  },
];

export function Problemas() {
  return (
    <section aria-labelledby="titulo-problemas" className="bg-crema px-4 py-14 sm:py-16">
      <Reveal className="mx-auto max-w-6xl">
        <h2
          id="titulo-problemas"
          className="font-titulo text-3xl font-bold uppercase text-negro sm:text-4xl"
        >
          Problemas que resolvemos
        </h2>
        <p className="mt-2 max-w-2xl text-lg text-gris">
          Comprar dotación y seguridad para una empresa no debería ser complicado.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problemas.map(({ titulo, texto }) => (
            <li key={titulo} className="rounded border-t-4 border-dorado bg-blanco p-6">
              <h3 className="font-titulo text-xl font-bold uppercase text-negro">{titulo}</h3>
              <p className="mt-2 text-gris">{texto}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
