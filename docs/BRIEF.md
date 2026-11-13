# Brief — Página web Fesapy

## 1. La empresa
**Fesapy Distribuciones** ("Dotaciones para tu empresa") es un proveedor integral de seguridad industrial para empresas en Colombia. Es una empresa pequeña que atiende empresas medianas y grandes.

- **Sedes**: Madrid (Cundinamarca), Bogotá y Villavicencio (aclarado 2026-11-12), sin direcciones publicadas por ahora. Atiende por WhatsApp, correo y redes, todos los días de 7:00 a. m. a 8:00 p. m.
- **Cobertura**: despachos nacionales e internacionales.
- **Clientes**: empresas (B2B): fábricas, petroleras y constructoras.
- **Lo que más valoran sus clientes**: personalización, atención y rapidez.
- **Confirmado**: facturación electrónica; productos con certificaciones/normas.
- **Pendiente de confirmar**: crédito/plazos de pago, entrega en obra/planta y tiempos, cantidad mínima para personalizar, asesoría en EPP, producto estrella.
- **Fabrica**: dotación y ropa de trabajo; personaliza con logos estampados y bordados.
- **Distribuye**: productos de marcas reconocidas de seguridad industrial.

### Diferencial
Fesapy es una **marca multifuncional**: no solo vende dotaciones, también señalización y seguridad vial (conos, cintas, barreras), botiquines, stickers, letreros, insumos y más. Una empresa resuelve toda su seguridad con un solo proveedor.

> Mensaje central sugerido: **"Todo lo que tu empresa necesita en seguridad, en un solo lugar."**

## 2. Categorías de productos (propuesta)
1. Dotación y ropa de trabajo (overoles, camisas, chaquetas, uniformes)
2. Calzado de seguridad (botas de varias marcas)
3. Elementos de protección personal (cascos, guantes, gafas, protección auditiva y respiratoria)
4. Trabajo en alturas e izaje (eslingas, arneses)
5. Botiquines y primeros auxilios
6. Señalización y seguridad vial (letreros y señales, conos, cintas de demarcación, barreras y delineadores)
7. Stickers y personalización
8. Lubricantes y mantenimiento (WD-40, CRC)

Servicio transversal: **personalización con logo** (bordado y estampado).

## 3. Objetivos de la página
1. Dar a conocer la empresa y generar confianza.
2. Contacto inmediato por **WhatsApp** (acción principal: "Cotizar por WhatsApp" con mensaje prellenado).
3. **Solicitud de cotizaciones** por formulario.
4. Mostrar las categorías de productos (sin catálogo administrable): el contenido se mantiene en el código, con un Pull Request.

Sin precios públicos ni tienda en línea por ahora.

## 4. Páginas
| Página | Contenido |
|---|---|
| Inicio | Propuesta de valor, categorías, personalización, CTA WhatsApp y cotizar (clientes y testimonios vuelven cuando haya logos y reseñas reales con permiso) |
| Nosotros | Historia, misión, sedes (ciudades), cómo atendemos, redes, por qué elegirnos |
| Productos | Las 8 categorías, sin precios |
| Personalización | Bordado y estampado: proceso, ejemplos de trabajos |
| Cotización | Formulario que arma el mensaje y abre WhatsApp o correo (no guarda datos ni pide NIT); WhatsApp, correo, horario y redes |
| Política de tratamiento de datos | Requerida por Ley 1581 de 2012 |

## 5. Contacto y redes a mostrar
Todos los datos viven en `src/lib/contenido.ts` (confirmados 2026-11-12):
- WhatsApp: +57 312 332 9422
- Correo: asistente.fesapy@gmail.com
- Instagram: https://www.instagram.com/fesapydistribuciones
- Facebook: https://www.facebook.com/fesapy.distribuciones/
- Horario de atención: todos los días, 7:00 a. m. a 8:00 p. m.
- Sitio web: www.fesapy.tech (dominio aún no conectado en Vercel)
- Sedes: Madrid (Cundinamarca), Bogotá y Villavicencio (sin direcciones publicadas: `TODO(contenido)`).

## 6. Identidad visual
- Logo: emblema circular **dorado sobre negro** ("Fesapy Distribuciones"), archivo en `public/marca/`. Dorado de referencia `#E8B53E` (muestreado del logo). Pendiente: versión vectorial/plana del logo.
- Estilo buscado: **serio, cercano y corporativo**. Sin animaciones recargadas ni menús desplegables.
- Tipografía elegida: **Barlow Condensed** (títulos) + **Barlow** (texto). Estilo industrial, parecido a la señalización, gratuita en Google Fonts.
  - Alternativa 1: Oswald + Inter (más clásica).
  - Alternativa 2: Archivo Black + Archivo (más pesada y llamativa).

## 7. Contenido pendiente
- [x] Logo recibido (JPG) — falta versión SVG/PNG transparente
- [ ] Fotos por categoría y, más adelante, catálogo (nombre, marca, descripción, tallas, foto)
- [ ] Lista de clientes (con logo y permiso para mostrarlos) — en trámite
- [ ] Testimonios (nombre, cargo, empresa, texto, permiso)
- [ ] Fotos propias: trabajos bordados y estampados, equipo (mientras tanto: fotos de referencia con licencia libre)
- [x] Datos de contacto y redes
- [ ] Texto de "Nosotros" (año de fundación, historia)
- [ ] Competidores o páginas de referencia que les gusten

## 8. Restricciones
- Presupuesto inicial: **$0** (planes gratuitos).
- Dominio: se comprará después; mientras tanto, URL de Vercel.
- Tiempo: **una semana** para el MVP.
