import type { Metadata } from "next";
import { EncabezadoPagina } from "@/components/sitio/EncabezadoPagina";
import { contacto, empresa, legal } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Política de tratamiento de datos",
  description:
    "Cómo Fesapy Distribuciones trata los datos personales que recibe al responder cotizaciones, según la Ley 1581 de 2012.",
};

const TODO = (texto: string) => (
  <strong className="bg-crema px-1 text-negro">TODO(contenido): {texto}</strong>
);

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-titulo text-2xl font-bold uppercase text-negro">{titulo}</h2>
      {children}
    </section>
  );
}

// BORRADOR. La empresa debe revisarlo (idealmente con un abogado) antes de publicarlo
// como definitivo. Marco legal: Ley 1581 de 2012 y sus decretos reglamentarios.
export default function PoliticaDeDatos() {
  return (
    <>
      <EncabezadoPagina titulo="Política de tratamiento de datos personales">
        <p>
          Versión {legal.politicaVersion} · {legal.politicaFecha}
        </p>
      </EncabezadoPagina>

      <section className="bg-blanco px-4 py-12 sm:py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 text-gris">
          <p
            role="note"
            className="rounded border-l-4 border-dorado bg-crema p-4 font-bold text-negro"
          >
            Borrador: este texto debe ser revisado por la empresa (y, de ser posible, por un
            abogado) antes de considerarse definitivo.
          </p>

          <Seccion titulo="1. Responsable del tratamiento">
            <p>
              El responsable de tus datos personales es <strong>{empresa.nombre}</strong>.
            </p>
            <ul className="list-disc pl-6">
              <li>Razón social: {legal.razonSocial || TODO("razón social")}</li>
              <li>NIT: {legal.nit || TODO("NIT")}</li>
              <li>
                Domicilio: {empresa.ciudad}. Dirección: TODO(contenido): dirección de la sede.
              </li>
              <li>
                Correo:{" "}
                <a
                  href={`mailto:${contacto.correo}`}
                  className="font-bold text-negro underline underline-offset-4"
                >
                  {contacto.correo}
                </a>
              </li>
            </ul>
          </Seccion>

          <Seccion titulo="2. Qué datos tratamos">
            <p>
              Los que tú escribes en el formulario de cotización: nombre, empresa, NIT
              (opcional), correo, teléfono, ciudad de entrega, categoría de interés y mensaje.
              No pedimos datos sensibles ni datos de menores de edad.
            </p>
          </Seccion>

          <Seccion titulo="3. Cómo llegan tus datos a Fesapy">
            <p>
              <strong>Este sitio no guarda tus datos.</strong> El formulario arma un mensaje y
              abre WhatsApp o tu programa de correo para que tú lo envíes. Los datos solo
              llegan a Fesapy cuando tú envías ese mensaje. WhatsApp y tu proveedor de correo
              tienen sus propias políticas de privacidad.
            </p>
          </Seccion>

          <Seccion titulo="4. Para qué los usamos (finalidad)">
            <p>
              Únicamente para responder tu solicitud de cotización y comunicarnos contigo sobre
              ella. No vendemos ni compartimos tus datos con terceros para publicidad.
            </p>
          </Seccion>

          <Seccion titulo="5. Tus derechos como titular">
            <p>De acuerdo con la Ley 1581 de 2012, puedes:</p>
            <ul className="list-disc pl-6">
              <li>Conocer, actualizar y rectificar tus datos.</li>
              <li>Solicitar prueba de la autorización que nos diste.</li>
              <li>Ser informado sobre el uso que se ha dado a tus datos.</li>
              <li>Revocar la autorización y pedir que eliminemos tus datos.</li>
              <li>Acceder de forma gratuita a tus datos.</li>
              <li>
                Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por
                infracciones a la ley.
              </li>
            </ul>
          </Seccion>

          <Seccion titulo="6. Cómo ejercer tus derechos">
            <p>
              Escríbenos a{" "}
              <a
                href={`mailto:${contacto.correo}`}
                className="font-bold text-negro underline underline-offset-4"
              >
                {contacto.correo}
              </a>{" "}
              indicando tu nombre y qué quieres hacer. Respondemos las consultas en máximo 10
              días hábiles y los reclamos en máximo 15 días hábiles, conforme a la ley.
            </p>
          </Seccion>

          <Seccion titulo="7. Tiempo de conservación">
            <p>
              Conservamos los datos solo el tiempo necesario para atender tu solicitud y las
              obligaciones legales de la empresa. {TODO("plazo de conservación definido por la empresa")}
            </p>
          </Seccion>

          <Seccion titulo="8. Cookies">
            <p>
              Este sitio no usa cookies de analítica ni de publicidad. El alojamiento del sitio
              puede registrar datos técnicos de visita (como la dirección IP) con fines de
              seguridad y funcionamiento.
            </p>
          </Seccion>

          <Seccion titulo="9. Cambios en esta política">
            <p>
              Si esta política cambia, publicaremos la nueva versión en esta página con su
              fecha.
            </p>
          </Seccion>
        </div>
      </section>
    </>
  );
}
