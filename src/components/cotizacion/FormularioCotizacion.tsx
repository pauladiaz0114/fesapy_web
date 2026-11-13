"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
//
// Cuándo se valida (para no regañar mientras la persona escribe):
// - al SALIR de un campo (onBlur), si ya escribió algo en él o si tenía un error;
// - al ENVIAR, todos los campos. Si hay errores, el foco va al primero.
// Mientras escribe no aparece ni desaparece nada (así el formulario no "salta").

type Errores = Partial<Record<CampoCotizacion, string>>;
type Canal = "whatsapp" | "correo";

// Orden en que aparecen los campos: sirve para llevar el foco al primero con error.
const ORDEN: CampoCotizacion[] = [
  "nombre",
  "empresa",
  "correo",
  "telefono",
  "ciudad",
  "categoria",
  "mensaje",
  "acepta",
];

// Nombres para los avisos del lector de pantalla.
const ETIQUETAS: Record<CampoCotizacion, string> = {
  nombre: "Nombre",
  empresa: "Empresa",
  correo: "Correo",
  telefono: "Teléfono",
  ciudad: "Ciudad de entrega",
  categoria: "Categoría",
  mensaje: "Mensaje",
  acepta: "Autorización de datos",
};

// Tiempo que el botón muestra "Abriendo…" antes del mensaje de gracias (y en el que no se
// puede volver a enviar, para evitar el doble clic).
const ESPERA_ABRIENDO_MS = 1200;

const idCampo = (campo: CampoCotizacion) => `cotizacion-${campo}`;
const idError = (campo: CampoCotizacion) => `cotizacion-${campo}-error`;
const idAyuda = (campo: CampoCotizacion) => `cotizacion-${campo}-ayuda`;

const claseCampo = (hayError: boolean) =>
  `min-h-11 w-full rounded border-2 bg-blanco px-3 py-2 text-negro transition-colors duration-200 ${
    hayError ? "border-red-700" : "border-negro/60 hover:border-negro"
  }`;

function Campo({
  campo,
  etiqueta,
  ayuda,
  error,
  ancho = false,
  children,
}: {
  campo: CampoCotizacion;
  etiqueta: string;
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
      </label>
      {children}
      {ayuda && (
        <p id={idAyuda(campo)} className="text-sm text-gris">
          {ayuda}
        </p>
      )}
      {error && (
        <p id={idError(campo)} className="text-sm font-bold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

// Texto del botón de envío. Las dos versiones ("Enviar…" y "Abriendo…") ocupan la misma celda
// de una grilla: el botón toma el ancho de la más larga y no cambia de tamaño al alternar.
function TextoBoton({ normal, abriendo, activo }: { normal: string; abriendo: string; activo: boolean }) {
  return (
    <span className="grid">
      <span className={`[grid-area:1/1] ${activo ? "invisible" : ""}`}>{normal}</span>
      <span className={`[grid-area:1/1] ${activo ? "" : "invisible"}`} aria-hidden={!activo}>
        {abriendo}
      </span>
    </span>
  );
}

export function FormularioCotizacion({
  categoriaInicial,
  mensajeInicial,
}: {
  categoriaInicial?: string;
  /** Texto con el que arranca el mensaje (por ejemplo "Quiero cotizar: <producto>"). La persona lo puede editar. */
  mensajeInicial?: string;
}) {
  const [valores, setValores] = useState<ValoresFormulario>({
    nombre: "",
    empresa: "",
    correo: "",
    telefono: "",
    ciudad: "",
    categoria: categoriaInicial ?? "",
    mensaje: mensajeInicial ?? "",
    acepta: false, // La casilla de autorización siempre empieza SIN marcar.
  });
  const [errores, setErrores] = useState<Errores>({});
  // Campos que la persona ya tocó (escribió algo): solo esos se validan al salir.
  const [tocados, setTocados] = useState<Partial<Record<CampoCotizacion, true>>>({});
  const [intentoEnviar, setIntentoEnviar] = useState(false);
  // "abriendo": el botón muestra "Abriendo…" y no se puede volver a enviar.
  // "enviado": se ve el mensaje de gracias.
  const [abriendo, setAbriendo] = useState<Canal | null>(null);
  const [enviado, setEnviado] = useState<Canal | null>(null);
  // Texto para el lector de pantalla (zona aria-live, invisible).
  const [aviso, setAviso] = useState("");
  const temporizador = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  function cambiar<K extends keyof ValoresFormulario>(campo: K, valor: ValoresFormulario[K]) {
    if (!tocados[campo]) setTocados((anterior) => ({ ...anterior, [campo]: true }));
    const nuevos = { ...valores, [campo]: valor };
    setValores(nuevos);
    // Si el campo tenía un error y con lo que escribió ya quedó bien, el error se quita de una vez
    // (nunca se AGREGA un error mientras escribe; eso solo pasa al salir del campo o al enviar).
    if (errores[campo]) {
      const resultado = validarCotizacion(nuevos);
      if (resultado.ok || !resultado.errores[campo]) {
        setErrores((anterior) => ({ ...anterior, [campo]: undefined }));
      }
    }
    // Si ya se había enviado y la persona cambia algo, se quita el mensaje de gracias.
    if (enviado) setEnviado(null);
  }

  // Valida UN campo (con los valores actuales) y actualiza solo su error.
  // anunciar: false cuando la validación se hace después de un clic (si ese clic fue "Enviar",
  // el aviso con el resumen de errores no debe quedar tapado por el de un solo campo).
  function validarCampo(campo: CampoCotizacion, actuales: ValoresFormulario = valores, anunciar = true) {
    const resultado = validarCotizacion(actuales);
    const error = resultado.ok ? undefined : resultado.errores[campo];
    setErrores((anterior) => ({ ...anterior, [campo]: error }));
    if (anunciar && error && error !== errores[campo]) setAviso(`${ETIQUETAS[campo]}: ${error}`);
  }

  // Al salir de un campo. Si salió porque la persona PRESIONÓ algo con el mouse o el dedo (otro
  // campo, la casilla, el botón de enviar), se espera a que termine ese clic: si el mensaje de
  // error apareciera o desapareciera justo entre presionar y soltar, el formulario se movería
  // unos píxeles y el clic caería en otro lugar (se perdería).
  function alSalir(campo: CampoCotizacion, formulario: HTMLFormElement | null) {
    if (!tocados[campo] && !errores[campo]) return;
    if (formulario?.dataset.presionando) {
      document.addEventListener("pointerup", () => setTimeout(() => validarCampo(campo, valores, false), 0), {
        once: true,
      });
    } else {
      validarCampo(campo);
    }
  }

  // Atributos comunes: id, aviso de error para el lector de pantalla y validación al salir.
  const propsCampo = (campo: CampoCotizacion, conAyuda = false) => {
    const describe = [conAyuda && idAyuda(campo), errores[campo] && idError(campo)]
      .filter(Boolean)
      .join(" ");
    return {
      id: idCampo(campo),
      "aria-invalid": errores[campo] ? (true as const) : undefined,
      "aria-describedby": describe || undefined,
      onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        alSalir(campo, e.currentTarget.form),
    };
  };

  function enviar(canal: Canal) {
    if (abriendo) return; // ya se está abriendo: evita el doble clic
    const resultado = validarCotizacion(valores);
    setIntentoEnviar(true);

    if (!resultado.ok) {
      setErrores(resultado.errores);
      setEnviado(null);
      const conError = ORDEN.filter((campo) => resultado.errores[campo]);
      setAviso(
        `Hay ${conError.length} ${conError.length === 1 ? "campo" : "campos"} por corregir: ${conError
          .map((c) => ETIQUETAS[c])
          .join(", ")}.`,
      );
      // Lleva el foco al primer campo con error, para que se vea qué corregir.
      if (conError[0]) document.getElementById(idCampo(conError[0]))?.focus();
      return;
    }

    setErrores({});
    const texto = mensajeCotizacion(resultado.datos);

    // window.open debe ir directo en el clic (si no, el navegador lo bloquea como ventana emergente).
    if (canal === "whatsapp") {
      // noopener: la pestaña nueva no puede controlar esta página.
      window.open(enlaceWhatsApp(texto), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = enlaceCorreo(asuntoCotizacion(resultado.datos), texto);
    }

    setAbriendo(canal);
    setEnviado(null);
    setAviso(canal === "whatsapp" ? "Abriendo WhatsApp…" : "Abriendo tu programa de correo…");
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => {
      setAbriendo(null);
      setEnviado(canal);
      setAviso("Muchas gracias por escribirnos, pronto nos comunicaremos contigo.");
    }, ESPERA_ABRIENDO_MS);
  }

  const hayErrores = Object.values(errores).some(Boolean);
  // El cuadro de gracias ocupa su lugar desde el clic (cuando la persona ya espera un cambio) y
  // aparece con un fundido al terminar "Abriendo…". Así nada se mueve de golpe después.
  const canalAviso = enviado ?? abriendo;

  return (
    <form
      noValidate
      // Enter dentro de un campo no envía nada: la persona elige uno de los dos botones.
      onSubmit={(e) => e.preventDefault()}
      // Marca "se está presionando algo dentro del formulario" hasta que termine el clic (ver alSalir).
      onPointerDownCapture={(e) => {
        const formulario = e.currentTarget;
        formulario.dataset.presionando = "si";
        const soltar = () => setTimeout(() => delete formulario.dataset.presionando, 0);
        document.addEventListener("pointerup", soltar, { once: true });
        document.addEventListener("pointercancel", soltar, { once: true });
      }}
      className="flex flex-col gap-6"
      aria-label="Solicitud de cotización"
    >
      {/* Zona invisible que el lector de pantalla lee cuando cambia (errores, "Abriendo…", gracias). */}
      <p aria-live="polite" className="sr-only">
        {aviso}
      </p>

      {intentoEnviar && hayErrores && (
        <p className="rounded border-l-4 border-red-700 bg-crema p-4 font-bold text-negro">
          Revisa los campos marcados en rojo.
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Campo campo="nombre" etiqueta="Nombre" error={errores.nombre}>
          <input
            {...propsCampo("nombre")}
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
            {...propsCampo("empresa")}
            type="text"
            name="empresa"
            autoComplete="organization"
            maxLength={100}
            value={valores.empresa}
            onChange={(e) => cambiar("empresa", e.target.value)}
            className={claseCampo(!!errores.empresa)}
          />
        </Campo>

        <Campo campo="correo" etiqueta="Correo" error={errores.correo}>
          <input
            {...propsCampo("correo")}
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
            {...propsCampo("telefono")}
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
            {...propsCampo("ciudad")}
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
            {...propsCampo("categoria")}
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
            {...propsCampo("mensaje", true)}
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
          {/* Casilla obligatoria y NO marcada de antemano (Habeas Data, Ley 1581 de 2012).
              Marcarla no es "escribir": si tenía error, se vuelve a revisar al momento. */}
          <input
            {...propsCampo("acepta")}
            type="checkbox"
            name="acepta"
            checked={valores.acepta}
            onChange={(e) => {
              const marcada = e.target.checked;
              cambiar("acepta", marcada);
              if (errores.acepta) validarCampo("acepta", { ...valores, acepta: marcada });
            }}
            className="mt-1 size-6 shrink-0 accent-negro"
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
        {/* aria-disabled (no "disabled") mientras se abre: el botón conserva el foco del teclado. */}
        <button
          type="button"
          onClick={() => enviar("whatsapp")}
          aria-disabled={abriendo !== null}
          className={clasesBoton("negro", "aria-disabled:cursor-wait aria-disabled:opacity-80")}
        >
          <IconoWhatsApp className="size-5 shrink-0" />
          <TextoBoton
            normal="Enviar por WhatsApp"
            abriendo="Abriendo WhatsApp…"
            activo={abriendo === "whatsapp"}
          />
        </button>
        <button
          type="button"
          onClick={() => enviar("correo")}
          aria-disabled={abriendo !== null}
          className={clasesBoton("contorno", "aria-disabled:cursor-wait aria-disabled:opacity-80")}
        >
          <TextoBoton
            normal="Enviar por correo"
            abriendo="Abriendo correo…"
            activo={abriendo === "correo"}
          />
        </button>
      </div>

      {/* Dónde van los datos: se dice claro y a la vista. */}
      <p className="text-sm text-gris">
        Tus datos <strong>no se guardan en este sitio</strong>: se envían por el canal que
        elijas (WhatsApp o correo) y solo los recibe Fesapy.
      </p>

      {canalAviso && (
        <div
          aria-hidden={!enviado}
          className={`rounded border-l-4 border-dorado bg-crema p-4 text-negro transition-opacity duration-300 ease-out ${
            enviado ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-bold">Muchas gracias por escribirnos, pronto nos comunicaremos contigo.</p>
          <p className="mt-1 text-gris">
            {canalAviso === "whatsapp"
              ? "Recuerda tocar “enviar” en WhatsApp para que tu mensaje llegue."
              : `Recuerda enviar el correo desde tu programa de correo. Si no se abrió, escríbenos a ${contacto.correo}.`}
          </p>
        </div>
      )}
    </form>
  );
}
