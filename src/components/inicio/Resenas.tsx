import { Reveal } from "@/components/ui/Reveal";
import { enlaceResenasGoogle, resenas, type Resena } from "@/lib/resenas";
import { FormularioResena } from "./FormularioResena";

// "Lo que dicen nuestros clientes": al final del inicio (2026-11-27).
// Estructura tomada de la referencia (dwork.com.co): tarjetas con inicial, nombre, estrellas y
// texto. Las reseñas salen de src/lib/resenas.ts (solo reales y autorizadas; hoy está vacía) y
// al lado va el formulario para dejar una nueva, que llega a Fesapy por WhatsApp o correo.

function Estrellas({ n }: { n: number }) {
  return (
    <p className="flex gap-0.5" aria-label={`${n} de 5 estrellas`} role="img">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className="size-5">
          <path
            d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"
            className={i <= n ? "fill-dorado" : "fill-blanco/20"}
          />
        </svg>
      ))}
    </p>
  );
}

function TarjetaResena({ r }: { r: Resena }) {
  return (
    <li data-escalon className="flex flex-col gap-3 rounded border border-blanco/10 bg-negro p-5">
      <div className="flex items-center gap-3">
        {/* Inicial en un círculo dorado con texto negro (no usamos fotos de clientes). */}
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-dorado font-titulo text-xl font-bold text-negro"
        >
          {r.nombre.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="font-bold text-blanco">{r.nombre}</p>
          {r.empresa && <p className="text-sm text-blanco/75">{r.empresa}</p>}
        </div>
      </div>
      <Estrellas n={r.calificacion} />
      <blockquote className="text-blanco/80">“{r.texto}”</blockquote>
      <p className="mt-auto text-sm text-blanco/60">{r.fecha}</p>
    </li>
  );
}

export function Resenas() {
  return (
    <section aria-labelledby="titulo-resenas" className="bg-carbon px-4 py-14 text-blanco sm:py-20">
      <Reveal escalonar className="mx-auto max-w-6xl">
        <h2 id="titulo-resenas" className="font-titulo text-3xl font-bold uppercase sm:text-5xl">
          Lo que dicen nuestros <span className="text-dorado">clientes</span>
        </h2>

        {resenas.length > 0 ? (
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {resenas.map((r) => (
              <TarjetaResena key={`${r.nombre}-${r.fecha}`} r={r} />
            ))}
          </ul>
        ) : (
          <p className="mt-3 max-w-2xl text-lg text-blanco/80">
            Estamos reuniendo las primeras reseñas de nuestros clientes. ¿Ya trabajaste con
            Fesapy? Cuéntanos cómo te fue.
          </p>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div data-escalon className="flex flex-col items-start gap-4">
            <h3 className="font-titulo text-2xl font-bold uppercase">Deja tu reseña</h3>
            <p className="text-blanco/80">
              Tu opinión ayuda a otras empresas a elegir su proveedor de seguridad. Te tomará un
              minuto: escribe tu reseña y envíala por WhatsApp o por correo. La revisamos y, con
              tu autorización, la publicamos aquí.
            </p>
            {enlaceResenasGoogle && (
              <a
                href={enlaceResenasGoogle}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-bold underline underline-offset-4 hover:text-dorado"
              >
                Ver reseñas en Google
              </a>
            )}
          </div>
          <div data-escalon className="rounded border border-blanco/10 bg-negro p-5 sm:p-8">
            <FormularioResena />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
