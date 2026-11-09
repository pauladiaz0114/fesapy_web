"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { clasesBoton } from "@/components/ui/Boton";
import { IconoWhatsApp } from "@/components/ui/iconos";
import { categorias, contacto } from "@/lib/contenido";
import { enlaceCorreo } from "@/lib/correo";
import { asuntoCotizacion, mensajeCotizacion } from "@/lib/mensajeCotizacion";
import {
  validarCotizacion,
  type CampoCotizacion,
  type ValoresFormulario,
} from "@/lib/validaciones/cotizacion";
import { enlaceWhatsApp } from "@/lib/whatsapp";

// Formulario de cotización. NO guarda nada en ningún servidor:
//   1. valida y limpia lo escrito (Zod, en el navegador),
//   2. arma el mensaje,
//   3. abre WhatsApp o el programa de correo con ese mensaje ya escrito.
// La persona es quien lo envía, por el canal que elija.

type Errores = Partial<Record<CampoCotizacion, string>>;

// Orden en que aparecen los campos: sirve para llevar el foco al primero con error.
const ORDEN: CampoCotizacion[] = [
  "nombre",
  "empresa",
  "nit",
  "correo",
  "telefono",
  "ciudad",
  "categoria",
  "mensaje",
  "acepta",
];

const idCampo = (campo: CampoCotizacion) => `cotizacion-${campo}`;
const idError = (campo: CampoCotizacion) => `cotizacion-${campo}-error`;

const claseCampo = (hayError: boolean) =>
  `min-h-11 w-full rounded border-2 bg-blanco px-3 py-2 text-negro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-negro ${
    hayError ? "border-red-700" : "border-negro/60"
  }`;

function Campo({
  campo,
  etiqueta,
  opcional = false,
  ayuda,
  error,
  ancho = false,
  children,
}: {
  campo: CampoCotizacion;
  etiqueta: string;
  opcional?: boolean;
  ayuda?: string;
  error?: string;
  /** Ocupa las dos columnas en pantallas medianas. */
  ancho?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1 ${ancho ? "md:col-span-2" : ""}`}>
      <label htmlFor={idCampo(campo)} className="font-bold text-negro">
        {etiqueta}
        {opcional && <span className="font-normal text-gris"> (opcional)</span>}
      </label>
      {children}
      {ayuda && !error && <p className="text-sm text-gris">{ayuda}</p>}
      {error && (
        <p id={idError(campo)} className="text-sm font-bold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormularioCotizacion({ categoriaInicial }: { categoriaInicial?: string }) {
  const [valores, setValores] = useState<ValoresFormulario>({
    nombre: "",
    empresa: "",
    nit: "",
    correo: "",
    telefono: "",
    ciudad: "",
    categoria: categoriaInicial ?? "",
    mensaje: "",
    acepta: false, // La casilla de autorización siempre empieza SIN marcar.
  });
  const [errores, setErrores] = useState<Errores>({});
  const [enviado, setEnviado] = useState<"whatsapp" | "correo" | null>(null);

  function cambiar<K extends keyof ValoresFormulario>(campo: K, valor: ValoresFormulario[K]) {
    setValores((anterior) => ({ ...anterior, [campo]: valor }));
    setErrores((anterior) => ({ ...anterior, [campo]: undefined }));
    setEnviado(null);
  }

  // Atributos comunes para accesibilidad: avisan al lector de pantalla que hay un error.
  const accesibilidad = (campo: CampoCotizacion) => ({
    id: idCampo(campo),
    "aria-invalid": errores[campo] ? (true as const) : undefined,
    "aria-describedby": errores[campo] ? idError(campo) : undefined,
  });

  function enviar(canal: "whatsapp" | "correo") {
    const resultado = validarCotizacion(valores);

    if (!resultado.ok) {
      setErrores(resultado.errores);
      setEnviado(null);
      // Lleva el foco al primer campo con error, para que se vea qué corregir.
      const primero = ORDEN.find((campo) => resultado.errores[campo]);
      if (primero) document.getElementById(idCampo(primero))?.focus();
      return;
    }

    setErrores({});
    const texto = mensajeCotizacion(resultado.datos);

    if (canal === "whatsapp") {
      // noopener: la pestaña nueva no puede controlar esta página.
      window.open(enlaceWhatsApp(texto), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = enlaceCorreo(asuntoCotizacion(resultado.datos), texto);
    }
    setEnviado(canal);
  }

  const hayErrores = Object.values(errores).some(Boolean);

  return (
    <form
      noValidate
      // Enter dentro de un campo no envía nada: la persona elige uno de los dos botones.
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-6"
      aria-label="Solicitud de cotización"
    >
      {hayErrores && (
        <p role="alert" className="rounded border-l-4 border-red-700 bg-crema p-4 font-bold text-negro">
          Revisa los campos marcados en rojo.
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Campo campo="nombre" etiqueta="Nombre" error={errores.nombre}>
          <input
            {...accesibilidad("nombre")}
            type="text"
            name="nombre"
            autoComplete="name"
            maxLength={80}
            value={valores.nombre}
            onChange={(e) => cambiar("nombre", e.target.value)}
            className={claseCampo(!!errores.nombre)}
          />
        </Campo>

        <Campo campo="empresa" etiqueta="Empresa" error={errores.empresa}>
          <input
            {...accesibilidad("empresa")}
            type="text"
            name="empresa"
            autoComplete="organization"
            maxLength={100}
            value={valores.empresa}
            onChange={(e) => cambiar("empresa", e.target.value)}
            className={claseCampo(!!errores.empresa)}
          />
        </Campo>

        <Campo
          campo="nit"
          etiqueta="NIT"
          opcional
          ayuda="Con o sin dígito de verificación, por ejemplo 900123456-7."
          error={errores.nit}
        >
          <input
            {...accesibilidad("nit")}
            type="text"
            name="nit"
            inputMode="numeric"
            autoComplete="off"
            maxLength={20}
            value={valores.nit}
            onChange={(e) => cambiar("nit", e.target.value)}
            className={claseCampo(!!errores.nit)}
          />
        </Campo>

        <Campo campo="correo" etiqueta="Correo" error={errores.correo}>
          <input
            {...accesibilidad("correo")}
            type="email"
            name="correo"
            autoComplete="email"
            maxLength={120}
            value={valores.correo}
            onChange={(e) => cambiar("correo", e.target.value)}
            className={claseCampo(!!errores.correo)}
          />
        </Campo>

        <Campo campo="telefono" etiqueta="Teléfono" error={errores.telefono}>
          <input
            {...accesibilidad("telefono")}
            type="tel"
            name="telefono"
            autoComplete="tel"
            maxLength={25}
            value={valores.telefono}
            onChange={(e) => cambiar("telefono", e.target.value)}
            className={claseCampo(!!errores.telefono)}
          />
        </Campo>

        <Campo campo="ciudad" etiqueta="Ciudad de entrega" error={errores.ciudad}>
          <input
            {...accesibilidad("ciudad")}
            type="text"
            name="ciudad"
            autoComplete="address-level2"
            maxLength={80}
            value={valores.ciudad}
            onChange={(e) => cambiar("ciudad", e.target.value)}
            className={claseCampo(!!errores.ciudad)}
          />
        </Campo>

        <Campo campo="categoria" etiqueta="Categoría" error={errores.categoria} ancho>
          <select
            {...accesibilidad("categoria")}
            name="categoria"
            value={valores.categoria}
            onChange={(e) => cambiar("categoria", e.target.value)}
            className={claseCampo(!!errores.categoria)}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.nombre}
              </option>
            ))}
          </select>
        </Campo>

        <Campo
          campo="mensaje"
          etiqueta="Mensaje"
          ayuda="Cuéntanos qué productos necesitas, cantidades, tallas y si llevan el logo de tu empresa."
          error={errores.mensaje}
          ancho
        >
          <textarea
            {...accesibilidad("mensaje")}
            name="mensaje"
            rows={5}
            maxLength={800}
            value={valores.mensaje}
            onChange={(e) => cambiar("mensaje", e.target.value)}
            className={claseCampo(!!errores.mensaje)}
          />
        </Campo>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-3">
          {/* Casilla obligatoria y NO marcada de antemano (Habeas Data, Ley 1581 de 2012). */}
          <input
            {...accesibilidad("acepta")}
            type="checkbox"
            name="acepta"
            checked={valores.acepta}
            onChange={(e) => cambiar("acepta", e.target.checked)}
            className="mt-1 size-6 shrink-0 accent-negro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-negro"
          />
          <label htmlFor={idCampo("acepta")} className="text-negro">
            Autorizo el tratamiento de mis datos según la{" "}
            <Link
              href="/politica-de-datos"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-4 hover:text-gris"
            >
              política de tratamiento de datos
            </Link>
            .
          </label>
        </div>
        {errores.acepta && (
          <p id={idError("acepta")} className="text-sm font-bold text-red-700">
            {errores.acepta}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => enviar("whatsapp")}
          className={clasesBoton("negro")}
        >
          <IconoWhatsApp className="size-5 shrink-0" />
          Enviar por WhatsApp
        </button>
        <button
          type="button"
          onClick={() => enviar("correo")}
          className={clasesBoton("contorno")}
        >
          Enviar por correo
        </button>
      </div>

      {/* Dónde van los datos: se dice claro y a la vista. */}
      <p className="text-sm text-gris">
        Tus datos <strong>no se guardan en este sitio</strong>: se envían por el canal que
        elijas (WhatsApp o correo) y solo los recibe Fesapy.
      </p>

      {enviado && (
        <div role="status" className="rounded border-l-4 border-dorado bg-crema p-4 text-negro">
          <p className="font-bold">Muchas gracias por escribirnos, pronto nos comunicaremos contigo.</p>
          <p className="mt-1 text-gris">
            {enviado === "whatsapp"
              ? "Recuerda tocar “enviar” en WhatsApp para que tu mensaje llegue."
              : `Recuerda enviar el correo desde tu programa de correo. Si no se abrió, escríbenos a ${contacto.correo}.`}
          </p>
        </div>
      )}
    </form>
  );
}
