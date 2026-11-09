// Muchas viñetas del portafolio tienen la forma "Título: texto" (por ejemplo
// "Alta durabilidad: Materiales resistentes…"). Aquí se resalta el título en negrita.
// Si el texto no tiene esa forma (o el "título" es larguísimo), se muestra tal cual.
export function ItemConTitulo({ texto }: { texto: string }) {
  const m = texto.match(/^(.{3,90}?):\s+([\s\S]+)$/);
  if (!m) return <>{texto}</>;
  return (
    <>
      <strong className="text-negro">{m[1]}:</strong> {m[2]}
    </>
  );
}
