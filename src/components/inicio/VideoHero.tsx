"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { EtiquetaReferencia } from "@/components/ui/EtiquetaReferencia";

// PRUEBA (rama prueba/video-hero, NO para producción): video del hero en lugar del carrusel,
// para ver cómo queda. El video de prueba trae marca de agua de TikTok y logos de otra marca:
// solo se puede publicar uno propio de Fesapy o con licencia libre.
//
// Comportamiento (sin librerías):
// - <video> nativo: muted, loop, playsInline, preload="metadata" y poster.
// - Se reproduce al entrar en pantalla y se pausa al salir (IntersectionObserver).
// - Con "reducir movimiento" o con ahorro de datos NO se reproduce solo: se queda el poster.
// - Botón de pausa/reproducir con aria-label en español (foco: regla global de globals.css).
// - Marco cuadrado (aspect-square), igual que el carrusel: nada se mueve al cargar (CLS 0).
// - Si el video falla, se queda la imagen del poster, sin errores en consola.

const VIDEO = "/video/hero-prueba.mp4";
const POSTER = "/video/hero-prueba-poster.jpg";

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
      const ahorro = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
      return reducir || ahorro;
    },
    () => true, // en el servidor: no reproducir
  );
}

export function VideoHero() {
  const video = useRef<HTMLVideoElement>(null);
  const noSolo = useNoReproducirSolo();
  const [visible, setVisible] = useState(false);
  // null = la persona no ha tocado el botón; true/false = lo pausó o lo reanudó a mano.
  const [eleccion, setEleccion] = useState<boolean | null>(null);
  const [fallo, setFallo] = useState(false);
  const [reproduciendo, setReproduciendo] = useState(false);

  // Visible en pantalla (al menos la mitad).
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reproduce o pausa según lo visible, la preferencia del sistema y el botón.
  const debeReproducir = visible && !fallo && (eleccion ?? !noSolo);
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (debeReproducir) el.play().catch(() => setReproduciendo(false));
    else el.pause();
  }, [debeReproducir]);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded bg-carbon-claro">
      {fallo ? (
        // eslint-disable-next-line @next/next/no-img-element -- solo en esta prueba
        <img src={POSTER} alt="" className="absolute inset-0 size-full object-cover" />
      ) : (
        <video
          ref={video}
          className="absolute inset-0 size-full object-cover"
          src={VIDEO}
          poster={POSTER}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Video de bomberos con equipo de protección"
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
