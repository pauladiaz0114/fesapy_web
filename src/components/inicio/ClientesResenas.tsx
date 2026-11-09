// Clientes y reseñas. NO se inventa ningún cliente ni testimonio: mientras no haya
// datos reales, esta sección muestra marcadores TODO(contenido) a propósito.
// Cuando lleguen: logos solo con permiso por escrito del cliente, y reseñas reales
// con nombre, cargo, empresa y permiso para publicarlas (ver docs/BRIEF.md §7).
export function ClientesResenas() {
  const marcador =
    "flex min-h-32 items-center justify-center rounded border-2 border-dashed border-negro/40 p-4 text-center text-gris";

  return (
    <section aria-labelledby="titulo-clientes" className="bg-crema px-4 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h2
          id="titulo-clientes"
          className="font-titulo text-3xl font-bold uppercase text-negro sm:text-4xl"
        >
          Clientes y reseñas
        </h2>

        <h3 className="mt-8 font-titulo text-xl font-bold uppercase text-negro">
          Empresas que confían en nosotros
        </h3>
        <div className={`mt-4 ${marcador}`}>
          TODO(contenido): logos de clientes (solo con su permiso por escrito).
        </div>

        <h3 className="mt-8 font-titulo text-xl font-bold uppercase text-negro">
          Lo que dicen nuestros clientes
        </h3>
        <div className={`mt-4 ${marcador}`}>
          TODO(contenido): reseñas reales de clientes (nombre, cargo, empresa y permiso para
          publicarlas).
        </div>
      </div>
    </section>
  );
}
