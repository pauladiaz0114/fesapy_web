# Créditos de imágenes

Registro de toda imagen que no sea propia de Fesapy: de dónde salió, quién la tomó y con qué licencia. Si se agrega o se quita una imagen, se actualiza esta tabla en el mismo PR.

## Fotos de referencia (`public/referencia/`)

> ⚠️ **Reemplazar por fotos propias.** Son temporales para mostrar la página mientras Fesapy toma fotos de sus productos y trabajos (sobre todo un overol con logo bordado). Cuando lleguen, se borran estos archivos y sus filas.

Licencia: [Pexels License](https://www.pexels.com/license/). Permite uso gratis, también comercial y en sitios web, y no exige dar crédito (igual lo dejamos aquí). **No permite** venderlas sin modificar, subirlas a otros bancos de imágenes ni dar a entender que las personas o marcas que aparecen respaldan a Fesapy.

| Archivo | Qué muestra | Autor | Enlace original |
|---|---|---|---|
| `botas-seguridad.webp` | Botas de seguridad negras en un charco (blanco y negro) | [Teddy tavan](https://www.pexels.com/@bear/) | [Pexels 2236716](https://www.pexels.com/photo/person-wearing-black-safety-shoes-2236716/) |
| `casco-epp.webp` | Maniquí con casco, gafas y tapabocas | [Rathaphon Nanthapreecha](https://www.pexels.com/@bank/) | [Pexels 3846183](https://www.pexels.com/photo/blue-helmet-and-white-mask-3846183/) |
| `dotacion-reflectiva.webp` | Trabajadores con pantalón naranja reflectivo y botas (sin caras) | [Xavier Messina](https://www.pexels.com/@messina/) | [Pexels 12491630](https://www.pexels.com/photo/legs-of-workers-12491630/) |
| `guantes-trabajo.webp` | Trabajador poniéndose guantes gastados (sin cara) | [Andrea Piacquadio](https://www.pexels.com/@olly/) | [Pexels 3846440](https://www.pexels.com/photo/anonymous-worker-in-heavy-duty-gloves-3846440/) |
| `casco-chaleco.webp` | Trabajador de espaldas con casco amarillo y chaleco reflectivo (agregada 2026-11-12) | [Andrie Yansen Tumewu](https://www.pexels.com/@andrie-yansen-tumewu-2311227/) | [Pexels 3979016](https://www.pexels.com/photo/a-worker-wearing-a-safety-hat-and-vest-3979016/) |
| `arnes-alturas.webp` | Trabajador de espaldas con arnés y línea de vida en un techo (agregada 2026-11-12) | [Chris Shafer](https://www.pexels.com/@christafaari/) | [Pexels 34019842](https://www.pexels.com/photo/construction-worker-on-roof-removing-debris-34019842/) |
| `senalizacion-vial.webp` | Barril y cono de señalización junto a un letrero "Caution" (agregada 2026-11-12) | [Connor Scott McManus](https://www.pexels.com/@connorscottmcmanus/) | [Pexels 34806519](https://www.pexels.com/photo/construction-site-warning-with-traffic-cones-34806519/) |
| `chaleco-obra.webp` | Trabajador de espaldas con chaleco naranja junto a un andamio (agregada 2026-11-12) | [Brian Jiz](https://www.pexels.com/@brianjiz/) | [Pexels 31161593](https://www.pexels.com/photo/urban-construction-worker-in-safety-vest-31161593/) |

**Fotos agregadas el 2026-11-12 (carrusel del hero de 4 a 8 fotos):** mismo proceso (descarga a 1600 px, recorte cuadrado elegido a mano, 800 × 800, WebP calidad 78 sin metadatos; pesan entre 43 y 81 KB). Mismos criterios: de espaldas o sin cara reconocible y sin logos de marcas. Se descartaron por caras de frente o una valla con una cara (Pexels 21923132, 9258892) y una de conos (Pexels 3095695) porque la textura del pavimento pesaba 200 KB aun comprimida.

**Cómo se prepararon (2026-11-01):** se descargaron a 1600 px y se recortaron en cuadrado de 800 × 800 con `sharp` (viene con Next.js). Se convirtieron a WebP calidad 78 **sin metadatos** (EXIF, ubicación, cámara). Pesan entre 16 y 62 KB cada una. La del casco se recortó a mano desde arriba para que se vea el casco completo.

**Criterios de selección:** sin caras en primer plano y sin logos de marcas visibles. Se descartaron fotos con logos (una bota con la marca bordada y unos guantes con marca) y una con la cara de frente.

## Marca (`public/marca/`)

| Archivo | Origen |
|---|---|
| `fesapy-emblema.jpg` | Logo de Fesapy entregado por la empresa (400 × 400). |
| `fesapy-logo-original.jpg` | Logo de Fesapy entregado por la empresa (1254 × 1254). Pendiente: versión SVG o PNG con fondo transparente. |

## Fotos del catálogo (`public/catalogo/`)

**Origen:** el *Portafolio* de Fesapy (documento PDF propio de la empresa, 40 páginas). Son 62 fotos de producto con fondo transparente, extraídas del PDF; no se descargó nada de internet.

> ⚠️ **Pendiente de confirmar con Fesapy:** que la empresa tiene autorización para usar estas fotos en su sitio web. Varias muestran marcas de terceros (por ejemplo Kondor, SAGA, Westland, MSA, 3M o INSAFE). `CLAUDE.md` pide usar solo imágenes de marcas que Fesapy tenga autorización de usar (material de prensa del fabricante o distribuidor, o fotos propias).
>
> **Calidad:** las fotos del PDF son pequeñas (la mayoría de botas, EPP y eslingas miden entre 200 y 400 px de ancho). Se ven bien en tarjetas, pero algo suaves en la foto grande del detalle. Conviene pedir los originales a Fesapy o a los distribuidores.

**Cómo se prepararon (2026-11-09):** se extrajeron con un script propio (Python + Pillow, sin instalar nada) que une cada foto con su máscara de transparencia, se descartaron las sombras difuminadas, los fondos de página, los logos y los sellos de normas, se recortaron los márgenes transparentes y se convirtieron a WebP con transparencia, máximo 800 px de ancho, sin metadatos. Pesan en total 1,0 MB (la más pesada, 86 KB). El script y el PDF **no** se suben al repo (carpeta `_fuentes/`, ignorada).

Archivos: `public/catalogo/<producto>.webp` (la foto principal) y `<producto>-2.webp`, `-3`, ... (fotos adicionales del mismo producto). Cada foto se asigna a su producto en `src/lib/catalogo.ts`. Las que no se pudo asignar con total certeza (qué referencia es cada bota Westland, cada bota de soldador y cada guante) tienen un `TODO(contenido)` en ese archivo.

## Imágenes de referencia del catálogo (`public/catalogo/`, 2026-11-12)

**Origen:** tres hojas de imágenes entregadas por Fesapy (`_fuentes/fotos-nuevas/`: botiquines y señales, dotación, avisos para vehículos). No se descargó nada de internet. Son **imágenes de referencia**: en la ficha del producto se ve el texto "Imagen de referencia" (campo `referencia: true` en `src/lib/catalogo.ts`).

> ⚠️ **Pendiente de confirmar con Fesapy:** que las imágenes se pueden publicar y que representan lo que la empresa entrega (material, medidas y contenido quedan como `TODO(contenido)`).

**Cómo se prepararon:** script propio (`_fuentes/pruebas/recortar_hojas.py`, Python + Pillow, sin instalar nada): recorte de cada producto, cuadrado con fondo blanco y margen parejo, WebP calidad 80, sin metadatos y **sin agrandar** (las piezas miden 270–800 px). Las señales y avisos que se agrupan en un producto se unen en una sola imagen. Pesan 3–44 KB cada una (18 archivos, +227 KB en total).

| Archivo | Producto |
|---|---|
| `botiquin-maletin-rojo.webp`, `botiquin-maletin-plastico-blanco.webp`, `botiquin-morral-azul-reflectivo.webp`, `botiquin-maletin-rojo-reflectivo.webp` | Botiquines (vista de frente) |
| `senales-evacuacion-primeros-auxilios.webp`, `senales-contra-incendios.webp`, `senales-de-advertencia.webp` | Señales (agrupadas por color) |
| `avisos-vehiculos-no-adelantar.webp`, `avisos-vehiculos-advertencia.webp`, `avisos-vehiculos-distancia-y-velocidad.webp`, `franjas-reflectivas-chevrones.webp` | Avisos reflectivos para vehículos |
| `overol-con-reflectivo-plateado.webp`, `overol-con-reflectivo-plateado-2.webp` | Overol con reflectivo plateado (azul y azul oscuro) |
| `camisas-oxford-2.webp`, `camisa-tipo-polo-2.webp`, `camisa-en-jean-2.webp`, `chaqueta-en-jean-2.webp`, `pantalon-en-jean-2.webp` | Segunda foto de productos que ya existían (la del portafolio sigue como principal) |

Las vistas de atrás, abierto y espalda quedan **solo** en `_fuentes/fotos-nuevas/recortes/` (no se suben). Algunas espaldas de camisas tienen restos de la prenda vecina y necesitan retoque antes de usarlas.
