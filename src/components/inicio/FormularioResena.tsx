"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { clasesBoton } from "@/components/ui/Boton";
import { IconoWhatsApp } from "@/components/ui/iconos";
import { enlaceCorreo } from "@/lib/correo";
import {
  asuntoResena,
  mensajeResena,
  validarResena,
  type CampoResena,
  type ValoresResena,
} from "@/lib/validaciones/resena";
import { enlaceWhatsApp } from "@/lib/whatsapp";

// Formulario para dejar una reseña. Igual que la cotización, NO guarda nada en ningún servidor:
// valida y limpia lo escrito (Zod, en el navegador), arma el mensaje y abre WhatsApp o el correo.
// Fesapy decide qué reseñas publicar (con la autorización que da este formulario) y las agrega a
// src/lib/resenas.ts.
//
// Los errores solo se muestran AL ENVIAR (nunca al salir de un campo): así nada se mueve entre
// presionar y soltar un clic.

type Errores = Partial<Record<CampoResena, string>>;
const ORDEN: CampoResena[] = ["nombre", "empresa", "calificacion", "resena", "autoriza"];
const VACIO: ValoresResena = { nombre: "", empresa: "", calificacion: 0, resena: "", autoriza: false };

const claseCampo = (hayError: boolean) =>
  `min-h-11 w-full rounded border-2 bg-carbon px-3 py-2 text-blanco placeholder:text-blanco/50 transition-colors duration-200 ${
    hayError ? "border-red-400" : "border-blanco/40 hover:border-blanco/80"
  }`;

function Estrella({ llena }: { llena: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7">
      <path
        d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"
        className={llena ? "fill-dorado stroke-dorado" : "fill-transparent stroke-blanco/60"}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FormularioResena() {
  const base = useId();
  const id = (campo: CampoResena) => `${base}-${campo}`;
  const idError = (campo: CampoResena) => `${base}-${campo}-error`;
  const [valores, setValores] = useState<ValoresResena>(VACIO);
  const [errores, setErrores] = useState<Errores>({});
  const [aviso, setAviso] = useState("");
  const [abriendo, setAbriendo] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout>>(undefined);

  const cambiar = <K extends keyof ValoresResena>(campo: K, valor: ValoresResena[K]) =>
    setValores((v) => ({ ...v, [campo]: valor }));

  const propsCampo = (campo: CampoResena) => ({
    id: id(campo),
    "aria-invalid": errores[campo] ? (true as const) : undefined,
    "aria-describedby": errores[campo] ? idError(campo) : undefined,
  });

  const error = (campo: CampoResena) =>
    errores[campo] ? (
      <p id={idError(campo)} className="text-sm font-bold text-red-400">
        {errores[campo]}
      </p>
    ) : null;

  function enviar(canal: "whatsapp" | "correo") {
    if (abriendo) return; // evita el doble clic
    const resultado = validarResena(valores);
    if (!resultado.ok) {
      setErrores(resultado.errores);
      const conError = ORDEN.filter((c) => resultado.errores[c]);
      setAviso(`Hay ${conError.length} ${conError.length === 1 ? "campo" : "campos"} por corregir.`);
      const primero = conError[0];
      if (primero) {
        // En la calificación, el foco va a la primera estrella.
        const destino = primero === "calificacion" ? document.getElementById(`${id("calificacion")}-1`) : document.getElementById(id(primero));
        destino?.focus();
      }
      return;
    }
    setErrores({});
    const texto = mensajeResena(resultado.datos);
    // window.open debe ir directo en el clic (si no, el navegador lo bloquea como ventana emergente).
    if (canal === "whatsapp") window.open(enlaceWhatsApp(texto), "_blank", "noopener,noreferrer");
    else window.location.href = enlaceCorreo(asuntoResena(resultado.datos), texto);
    setAbriendo(true);
    setAviso(canal === "whatsapp" ? "Abriendo WhatsApp…" : "Abriendo tu programa de correo…");
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => {
      setAbriendo(false);
      setAviso("¡Gracias por tu reseña! La revisaremos antes de publicarla.");
      setValores(VACIO);
    }, 1200);
  }

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor={id("nombre")} className="font-bold text-blanco">
            Nombre
          </label>
          <input
            {...propsCampo("nombre")}
            type="text"
            autoComplete="name"
            maxLength={80}
            value={valores.nombre}
            onChange={(e) => cambiar("nombre", e.target.value)}
            className={claseCampo(!!errores.nombre)}
          />
          {error("nombre")}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor={id("empresa")} className="font-bold text-blanco">
            Empresa <span className="font-normal text-blanco/75">(opcional)</span>
          </label>
          <input
            {...propsCampo("empresa")}
            type="text"
            autoComplete="organization"
            maxLength={100}
            value={valores.empresa}
            onChange={(e) => cambiar("empresa", e.target.value)}
            className={claseCampo(!!errores.empresa)}
          />
          {error("empresa")}
        </div>
      </div>

      {/* Estrellas: radios de verdad (teclado: flechas), escondidos a la vista; se ve la estrella.
          Como el radio está oculto, el foco del teclado se dibuja en su etiqueta (has-[:focus-visible]). */}
      <fieldset
        className="flex flex-col gap-1"
        aria-describedby={errores.calificacion ? idError("calificacion") : undefined}
      >
        <legend className="font-bold text-blanco">Calificación</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <label
              key={n}
              className="flex size-11 cursor-pointer items-center justify-center rounded has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-dorado has-[:focus-visible]:outline-solid"
            >
              <input
                id={`${id("calificacion")}-${n}`}
                type="radio"
                name={`${base}-calificacion`}
                value={n}
                checked={valores.calificacion === n}
                onChange={() => cambiar("calificacion", n)}
                className="sr-only"
              />
              <span className="sr-only">
                {n} {n === 1 ? "estrella" : "estrellas"}
              </span>
              <Estrella llena={n <= valores.calificacion} />
            </label>
          ))}
        </div>
        {error("calificacion")}
      </fieldset>

      <div className="flex flex-col gap-1">
        <label htmlFor={id("resena")} className="font-bold text-blanco">
          Tu reseña
        </label>
        <textarea
          {...propsCampo("resena")}
          rows={4}
          maxLength={600}
          value={valores.resena}
          onChange={(e) => cambiar("resena", e.target.value)}
          placeholder="¿Cómo te fue con tu pedido, la atención y los productos?"
          className={claseCampo(!!errores.resena)}
        />
        {error("resena")}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-3">
          <input
            {...propsCampo("autoriza")}
            type="checkbox"
            checked={valores.autoriza}
            onChange={(e) => cambiar("autoriza", e.target.checked)}
            className="mt-1 size-6 shrink-0 accent-dorado"
          />
          <label htmlFor={id("autoriza")} className="text-blanco">
            Autorizo a Fesapy a publicar esta reseña con mi nombre y empresa en su sitio web, y el
            tratamiento de mis datos según la{" "}
            <Link href="/politica-de-datos" className="font-bold underline underline-offset-4 hover:text-dorado">
              política de datos
            </Link>
            .
          </label>
        </div>
        {error("autoriza")}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => enviar("whatsapp")}
          aria-disabled={abriendo || undefined}
          className={clasesBoton("dorado", "aria-disabled:cursor-wait aria-disabled:opacity-80")}
        >
          <IconoWhatsApp className="size-5 shrink-0" />
          Enviar por WhatsApp
        </button>
        <button
          type="button"
          onClick={() => enviar("correo")}
          aria-disabled={abriendo || undefined}
          className={clasesBoton("contornoClaro", "aria-disabled:cursor-wait aria-disabled:opacity-80")}
        >
          Enviar por correo
        </button>
      </div>
      {/* Espacio reservado (min-h) para el aviso: aparece sin mover nada. */}
      <p aria-live="polite" className="min-h-6 font-bold text-blanco">
        {aviso}
      </p>
    </form>
  );
}
