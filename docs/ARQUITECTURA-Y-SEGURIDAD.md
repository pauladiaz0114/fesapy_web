# Arquitectura y seguridad

## Qué vamos a usar y por qué

| Pieza | Herramienta | Por qué | Costo |
|---|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Ya lo conocen, SEO excelente, frontend y backend en un solo proyecto | Gratis |
| Estilos | Tailwind CSS | Rápido, consistente con los colores de marca | Gratis |
| Base de datos | **PostgreSQL en Neon** | Postgres real, plan gratuito, se integra con Vercel en un clic | Gratis (0,5 GB) |
| ORM | Prisma | Tipado con TypeScript, migraciones, evita inyección SQL | Gratis |
| Login del admin | **Auth.js (NextAuth)** con enlace mágico por correo | Sin contraseñas que filtrar; solo correos autorizados entran | Gratis |
| Imágenes | Vercel Blob | Subir fotos de productos desde el panel | Gratis (cuota limitada) |
| Correos | Resend | Aviso de nueva cotización y enlaces de login | Gratis (3.000/mes) |
| Validación | Zod | Valida en servidor todo lo que entra | Gratis |
| Hosting | Vercel | Despliegue automático desde GitHub, HTTPS incluido | Gratis (Hobby) |

> Nota: el plan Hobby de Vercel es para uso no comercial. Para la fase de pruebas está bien; cuando la página salga oficialmente con dominio, evaluar pasar a Pro (~USD 20/mes) o mover el hosting. Verificar condiciones vigentes en vercel.com/pricing.

### Alternativa si quieren aún más simple
**Supabase** (base de datos + login + almacenamiento en un solo servicio, plan gratis). Menos piezas, pero los proyectos gratis se pausan tras una semana sin uso. Elegimos Neon + Auth.js porque el panel tiene poco tráfico y no queremos pausas.

## Modelo de datos (inicial)
```
Categoria   id, nombre, slug, descripcion, imagen, orden
Producto    id, nombre, slug, descripcion, marca, tallas[], personalizable, imagenes[], destacado, activo, categoriaId
Cliente     id, nombre, logo, orden, activo           (empresas que confían en Fesapy)
Testimonio  id, nombre, cargo, empresa, texto, activo
Cotizacion  id, nombre, empresa, nit?, correo, telefono, ciudad, mensaje, productos?, aceptaDatos, aceptaDatosEn, estado, creadaEn
IntentoEnvio id, ipHash, creadoEn                     (límite de envíos por IP; se guarda el hash, nunca la IP)
Usuario / Sesion / CuentaVerificacion   (tablas de Auth.js)
```

## Seguridad — lista de verificación

### 1. Secretos
- [ ] `.env.local` en `.gitignore`. `.env.example` sin valores reales.
- [ ] Variables en Vercel (Production y Preview separadas).
- [ ] Activar **secret scanning** y **push protection** en GitHub.
- [ ] Si un secreto se sube por error: rotarlo de inmediato (borrar el commit no basta).

### 2. Acceso al panel
- [ ] Login solo con enlace mágico a correos de `ADMIN_EMAILS`.
- [ ] `middleware.ts` protege `/admin/*`, **y además** cada server action y ruta API del admin verifica la sesión (defensa en profundidad).
- [ ] Sesiones con expiración razonable (ej. 7 días).
- [ ] Activar 2FA en GitHub, Vercel, Neon y el correo de los administradores.

### 3. Entradas de usuario
- [ ] Zod en el servidor para todo formulario y acción.
- [ ] Prisma (consultas parametrizadas) — nunca SQL concatenado.
- [ ] React escapa HTML por defecto; prohibido `dangerouslySetInnerHTML` con datos de usuarios.
- [ ] Formulario de cotización: honeypot, límite de envíos por IP (ej. 5 por hora; se puede guardar en la propia base de datos) y longitud máxima en cada campo.
- [ ] Server Actions de Next.js ya traen protección CSRF (verifican el origen).

### 4. Archivos
- [ ] Solo el admin sube imágenes. Tipos permitidos: JPEG, PNG, WebP. Máx. 4 MB.
- [ ] Nombres de archivo generados por el servidor, no los del usuario.

### 5. Cabeceras HTTP (en `next.config.ts`)
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy` básica (ajustar si se agregan Google Maps o analítica)

Verificar con securityheaders.com al desplegar.

### 6. Dependencias
- [ ] Activar **Dependabot** en GitHub.
- [ ] Revisar `npm audit` antes de cada despliegue a producción.

### 7. Datos personales — Ley 1581 de 2012 (Habeas Data)
El formulario de cotización recoge nombre, correo y teléfono: eso obliga a cumplir la ley colombiana de protección de datos.
- [ ] Página `/politica-de-datos` con: responsable (Fesapy, NIT, dirección, correo), finalidad (responder cotizaciones y contacto comercial), derechos del titular (conocer, actualizar, rectificar, suprimir), canal para ejercerlos.
- [ ] Casilla **obligatoria y no marcada por defecto** en el formulario: "Autorizo el tratamiento de mis datos según la política…". Guardar `aceptaDatos` y la fecha.
- [ ] Solo pedir los datos necesarios.
- [ ] Evaluar si Fesapy debe registrar sus bases de datos en el RNBD de la SIC (depende de sus activos; consultarlo con el contador o asesor legal).

> Esto no es asesoría legal: la política final debe revisarla la empresa.

### 8. Imágenes de marcas
Usar fotos de productos de marcas solo si Fesapy es distribuidor y la marca lo permite (material de prensa del fabricante o del distribuidor mayorista). Lo ideal: fotos propias. Las imágenes tomadas al azar de Google pueden tener derechos de autor.

### 9. Copias de seguridad
- Neon guarda historial (point-in-time) limitado en el plan gratis. Exportar la base de datos una vez por semana como respaldo extra.
