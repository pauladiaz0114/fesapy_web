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
