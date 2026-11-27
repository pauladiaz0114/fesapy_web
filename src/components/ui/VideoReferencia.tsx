"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { EtiquetaReferencia } from "@/components/ui/EtiquetaReferencia";

// Video corto de referencia dentro de un marco (sin librerías).
// - <video> nativo: muted, loop, playsInline, preload="metadata" y poster.
// - Se reproduce al estar en pantalla (al menos la mitad) y se pausa al salir (IntersectionObserver).
// - Con "reducir movimiento" o con ahorro de datos NO se reproduce solo: se queda el poster
//   (la persona puede darle play con el botón).
// - Botón de pausa/reproducir de 44 px con aria-label en español (foco: regla global de globals.css).
// - El marco (className) reserva el espacio: nada se mueve al cargar (CLS 0).
// - Si el video falla, se muestra el poster como imagen, sin errores en consola.
// - Lleva la etiqueta "Video de referencia" mientras no sea un video de Fesapy.

function useNoReproducirSolo(): boolean {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", avisar);
      return () => mq.removeEventListener("change", avisar);
    },
    () => {
      const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // navigator.connection.saveData: "ahorro de datos" en Chrome/Android (no existe en todos).
      const ahorro =
        (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
      return reducir || ahorro;
    },
    () => true, // en el servidor: no reproducir
  );
}

export function VideoReferencia({
  src,
  poster,
  descripcion,
  className = "",
  claseVideo = "object-cover",
}: {
  src: string;
  poster: string;
  /** Qué muestra el video (para lectores de pantalla). */
  descripcion: string;
  /** Clases del marco: tamaño y proporción (por ejemplo "aspect-[4/3]"). */
  className?: string;
  /** Cómo llena el video el marco: "object-cover" (recorta) u "object-contain" (completo, con fondo negro). */
  claseVideo?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const noSolo = useNoReproducirSolo();
  const [visible, setVisible] = useState(false);
  // null = la persona no ha tocado el botón; true/false = lo reanudó o lo pausó a mano.
  const [eleccion, setEleccion] = useState<boolean | null>(null);
  const [fallo, setFallo] = useState(false);
  const [reproduciendo, setReproduciendo] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const debeReproducir = visible && !fallo && (eleccion ?? !noSolo);
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (debeReproducir) el.play().catch(() => setReproduciendo(false));
    else el.pause();
  }, [debeReproducir]);

  return (
    <div className={`relative overflow-hidden bg-negro ${className}`}>
      {fallo ? (
        // eslint-disable-next-line @next/next/no-img-element -- respaldo simple cuando el video no carga
        <img src={poster} alt={descripcion} className={`absolute inset-0 size-full ${claseVideo}`} />
      ) : (
        <video
          ref={video}
          className={`absolute inset-0 size-full ${claseVideo}`}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={descripcion}
          onPlay={() => setReproduciendo(true)}
          onPause={() => setReproduciendo(false)}
          onError={() => setFallo(true)}
        />
      )}
      <EtiquetaReferencia>Video de referencia</EtiquetaReferencia>
      {!fallo && (
        <button
          type="button"
          onClick={() => setEleccion(!reproduciendo)}
          aria-label={reproduciendo ? "Pausar el video" : "Reproducir el video"}
          className="absolute right-2 bottom-2 z-10 flex size-11 items-center justify-center rounded-full bg-negro/70 text-blanco transition-colors duration-200 hover:bg-negro"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
            {reproduciendo ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
          </svg>
        </button>
      )}
    </div>
  );
}
