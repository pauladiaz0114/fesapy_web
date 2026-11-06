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
