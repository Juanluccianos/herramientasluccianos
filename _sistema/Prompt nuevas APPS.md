# Crear una app nueva dentro de "Herramientas de Lucciano's"

> Pegá este texto entero al principio del chat nuevo. Al final completá la sección **"La app nueva"**.
> Todo lo que sigue es obligatorio: la app nueva tiene que ser **una más del sistema**, igual a las otras en acceso, diseño y comportamiento. Nada de apps "sueltas".

---

## 1. Quién soy y cómo trabajamos
- Soy Juan, de Administración y Finanzas de Lucciano's. **No soy programador**: explicame en criollo, sin jerga, paso a paso y de a una cosa por vez. Tratame de vos.
- **Antes de tocar nada, leé lo publicado** en GitHub (usuario `Juanluccianos`). Nunca trabajes sobre versiones viejas ni de memoria.
- **Entregas: SIEMPRE un solo `.zip` con el formato del robot** (punto 8). Yo lo subo tal cual a `herramientasluccianos` y el robot publica todo solo. Nada de "un zip por repo" ni de pegar Workers a mano.
- **Una sola entrega completa y probada**, no pedacitos que me hagan subir todo diez veces.
- Si necesitás el código actual de un Worker, pedímelo como archivo **.txt** (lo copio desde Cloudflare → Edit code: es lo que está andando). Trabajá siempre sobre ese.
- Antes de pedirme que corra SQL, decime **en qué base de D1** va. Una instrucción por vez y decime qué tiene que responder.
- Al final de cada entrega: **qué subir, dónde, en qué orden y qué probar**.

---

## 2. Mapa del sistema
Repos en **https://github.com/Juanluccianos/** · Workers en `https://<worker>.lucciano-viaticos.workers.dev` · Cuenta de Cloudflare "Contabilidad@luccianos.com.ar's Account" (plan **Workers Paid**). El dominio luccianos.com.ar está en **otra** cuenta de Cloudflare (ahí se cargan los DNS).

| Herramienta | Repo | Dirección | Worker | Base D1 | id en el portal |
|---|---|---|---|---|---|
| Portal (login único) | [herramientasluccianos](https://github.com/Juanluccianos/herramientasluccianos) | herramientas.luccianos.com.ar | acceso-api | acceso | — |
| Facturas de proveedores | [facturasluccianos](https://github.com/Juanluccianos/facturasluccianos) | facturas.luccianos.com.ar | facturas-api | facturas | facturas |
| Gastos con tarjeta y efectivo | [facturasefectivoluccianos](https://github.com/Juanluccianos/facturasefectivoluccianos) | gastos.luccianos.com.ar | facturasefectivo-api | facturasefectivo | efectivo |
| Viáticos | [viaticosluccianos](https://github.com/Juanluccianos/viaticosluccianos) | viaticos.luccianos.com.ar | viaticos-api | viaticos-db | viaticos |
| Relevamientos | [relevamientosluccianos](https://github.com/Juanluccianos/relevamientosluccianos) | relevamientos.luccianos.com.ar | relevamientos-api | relevamientos | relevamientos |
| Liquidaciones Payway | [payway](https://github.com/Juanluccianos/payway) | payway.luccianos.com.ar | payway-api | payway | payway |
| Costos de insumos | [costosluccianos](https://github.com/Juanluccianos/costosluccianos) | costos.luccianos.com.ar | costos-api | costos | costos |
| Asientos contables | [asientosluccianos](https://github.com/Juanluccianos/asientosluccianos) | asientos.luccianos.com.ar | asientos-api | asientos | asientos |
| Calidad | [calidadluccianos](https://github.com/Juanluccianos/calidadluccianos) | calidad.luccianos.com.ar | calidad-api | calidad | calidad |
| Ruleta de sorteos (sin login) | [sorteoluccianos](https://github.com/Juanluccianos/sorteoluccianos) | ruletadesorteos.luccianos.com.ar | ruleta-ocr | — | — |
| Lectura con IA (compartida, paga) | — | — | gemini-luccianos | gemini-luccianos | — |

- Además: [facturas-lector](https://github.com/Juanluccianos/facturas-lector) (parte de Facturas: el que lee las facturas que llegan).
- El código de los Workers **no** está en los repos de las apps. La versión publicada está en Cloudflare (Edit code) y una copia **cerrada con candado** queda en `herramientasluccianos/_sistema/workers/` (la carpeta `_sistema` no se publica en la web porque empieza con guion bajo).
- **El robot** (`herramientasluccianos/.github/workflows/robot.yml`) publica las entregas: ver punto 8.
- Las apps se hablan entre sí con el encabezado `X-Integracion` (Viáticos → Efectivo, Facturas ↔ Costos). No tocar esas rutas sin avisar.
- **Lectura con IA: un solo servicio para todas.** El Worker `gemini-luccianos` lee comprobantes con este orden: **Claude → Gemini pago → Gemini gratis de respaldo**, y lleva el gasto del mes por app. Lo usan **Facturas** (facturas que llegan por mail), **Efectivo** (tickets), **Viáticos** (comprobantes de los supervisores) y **Costos** (renglones de cada factura: descripción, cantidad, unidad, precio).
- Si la app nueva necesita **leer con IA**, usa `gemini-luccianos` igual que esas cuatro: **nunca** otra conexión ni otra clave propia de Gemini o Claude.
- Cada app que lee con IA muestra en **Configuración → Salud** el bloque común **"Lectura automática"** (función `htmlSaludGemini`, la misma en las cuatro): estado del servicio, gasto del mes en lectura paga, modelos y últimos errores. Copiarlo tal cual.
- Cuando terminemos, **agregá el renglón de la app nueva a esta tabla** y pasame este documento actualizado.

---

## 3. La base: se arranca copiando una app existente
**No se arranca de cero.** La app nueva se arma copiando la estructura de **Calidad** (la más nueva) o de **Asientos**, y se adapta. Así hereda todo lo que ya funciona:

- Archivos del repo: `index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.webmanifest`, `icons/` (icon-192, icon-512, apple-touch-icon), `logo-negro.png`, `logo-blanco.png`, `CNAME` (con su subdominio).
- `styles.css` se copia **tal cual** (colores, tipografías, modo oscuro, tablas, botones, chips, barra lateral). Solo se agrega lo propio de la app al final, sin cambiar lo común.
- De `app.js` se copian tal cual estos bloques: `api()` + "Pantallas rápidas", acceso desde el portal (`#portal`, `#acceso=`, `controlarCuenta`), `marcoHerramientas`, `avisoVersionNueva`, ojito de contraseña, tarjeta "Instalar en el celular", `toast`, `confirmar`, `modal`, el router por `#/ruta` y la barra lateral.

---

## 4. Cómo es el acceso (login único) — obligatorio

### Cómo lo vive la persona
1. Entra a **herramientas.luccianos.com.ar** con su mail y su contraseña (la misma para todo). La sesión **no vence**: no se la vuelve a pedir en ese dispositivo.
2. En el portal ve solo las herramientas a las que tiene acceso. Toca una y se abre **en la misma pestaña**, ya adentro.
3. En la app hay un botón negro **"‹ Herramientas"** (barra lateral, debajo del logo) y la ruta arriba "Herramientas / App / Pantalla" para volver.
4. **No hay "Cerrar sesión" ni "Cambiar contraseña" en las apps**: todo eso está en el portal (su nombre arriba a la derecha → Mi cuenta / Cerrar sesión). En la app, "Mi cuenta" solo muestra su mail, su rol y un botón "Ir al portal".
5. **Operativos** (quien tiene una sola app y rol supervisor o solo_escaneo): entran directo a su app y **no** ven el botón "Herramientas" (`herr_portal = 0`).
6. Si alguien abre la app directo sin sesión: pantalla con un solo botón **"Ir al portal"**. La app no tiene formulario de usuario y contraseña.

### Cómo funciona por dentro (frontend)
- Llegada desde el portal:
  - `#acceso=<código>` → `POST https://acceso-api.lucciano-viaticos.workers.dev/canjear` con `{codigo, app: '<id>'}` → devuelve `{token, usuario:{id,nombre,email}, rol, extras, ve_portal}`. Guardar el token, y en localStorage `herr_uid` = usuario.id y `herr_portal` = '1'/'0' (ve_portal).
  - `#portal!<uid>` o `#portal!<uid>=<ruta>`: si la sesión guardada es de **otra persona** (herr_uid distinto) o no es del portal, se borra y se pide de nuevo (`controlarCuenta`). Si hay `=<ruta>`, abrir esa pantalla (lo usan "Para hoy" y el buscador del portal).
  - Sin sesión → `https://herramientas.luccianos.com.ar/#ir=<id>` (el portal la consigue y vuelve).
- Todos los pedidos al Worker van con `Authorization: Bearer <token>`. Si responde 401, se borra la sesión y se muestra "Ir al portal".

### Cómo funciona por dentro (Worker)
- Service binding **`ACCESO` → `acceso-api`**.
- Para cada pedido: `POST /verificar` a acceso-api por el binding, con el mismo `Authorization` y `{ app: '<id>' }`. Devuelve `usuario {id, email, nombre}`, `rol` y `extras`. Guardar el resultado **60 segundos** en memoria (no consultar en cada pedido).
- **La persona se ata a su número del portal** (`usuario.id` → columna `portal_id` en la tabla de usuarios de la app): se busca primero por ese número y, si todavía no lo tiene, por mail (y se le guarda el número). Si el mail del portal cambió, se actualiza en la misma ficha: **nunca** se crea una ficha nueva por un cambio de mail. Si no existe, se crea sola con su `portal_id`. Copiar las funciones `asegurarPortalId` y `vincularPersona` de cualquier Worker (las 8 apps las tienen). Si la app guarda el mail en otras tablas (como Calidad en puestos y tareas), reemplazarlo ahí también (`cambioDeMail`).
- **Superadmins** (Juan, Ximena, Fran) llegan con rol `admin` en todas las apps: la app **tiene que tener** el rol `admin`.
- Rol **`consulta`** (socios: Daniel, Franco y Chris Otero) = ve todo como admin pero **no puede modificar nada**: todo pedido que no sea GET responde 403 "Tenés acceso de solo consulta: podés ver todo, pero no modificar nada."
- **Sin login propio**: nada de `/api/login`, claves, usuarios ni doble factor en la app.
- **CORS**: además de su propio dominio, aceptar `https://herramientas.luccianos.com.ar` (el portal le pide los pendientes y búsquedas). Se hace envolviendo el `export default` como en los otros Workers.

---

## 5. Alta de la app en el sistema (todo esto es parte de la entrega)

**a) Cloudflare**
- Base D1 nueva con el nombre de la app; Worker `<app>-api` con bindings `DB` (su base) y `ACCESO` (acceso-api).
- Repo nuevo en GitHub con GitHub Pages y `CNAME` = `<app>.luccianos.com.ar`; DNS (CNAME a `juanluccianos.github.io`) en la **otra** cuenta de Cloudflare. Explicame cada paso.

**b) Base `acceso`** (SQL, de a una instrucción):
- Tabla `apps` (columnas: `id, nombre, url, color, roles, orden, activa`). `roles` es un JSON con los roles de la app (siempre incluye `admin` y `consulta`; si hay permisos especiales, como el Director de Facturas, van como extras).
- Tabla `permisos` (`usuario_id, app_id, rol, extras`): los permisos de cada persona. Después se administran desde el portal (Administrar usuarios).
- Los socios llevan `consulta` en la app nueva salvo que yo diga otra cosa.

**c) Portal** (`herramientasluccianos/index.html`):
- `APPS_TODAS`: nombre, repo, url, área (`compras`, `contable`, `costos` o `gestion`), icono, color, resumen, 3 puntos, usuarios, dispositivos.
- `ICONOS` (ícono de línea, trazo 2) y `PREVIAS` (la mini vista de la tarjeta, como las otras).
- `ID_ACCESO` (repo → id), `CON_LOGIN_UNICO` y `API_APP` (dirección del Worker).
- Si suma: su entrada en `PENDIENTES` ("Para hoy") y en `BUSCADORES` (buscador Ctrl+K del portal), con su ruta para abrir directo.

**d) Mails** (`acceso-api`): agregar la app en `QUE_HACE` (qué hace y qué puede hacer cada rol, en criollo); si tiene roles operativos (celular), también en `PARA_QUE_OPERATIVO`.

**e) Guía**: sumar la app a la guía PDF de Herramientas (qué hace, para qué sirve, beneficio para la empresa, quién la usa).

---

## 6. Diseño — igual que las otras
- **Colores:** fondo `#f6f5f2`, tarjetas `#ffffff`, barra lateral `#eeede9`, líneas `#e5e3de`, texto `#15140f`/`#1c1b16`, gris `#6c6a62`, verde de acción `#4f7a28`, **pistacho `#A8C686`** (lo destacado), OK `#1f7a45`, aviso `#a35a07`, error `#b42318`. Modo oscuro incluido (el de styles.css).
- **Tipografías:** títulos y números **Manrope**; texto **Instrument Sans**; códigos IBM Plex Mono (solo para CUIT, números de comprobante, etc. — **los montos van en Manrope**, no en mono).
- **Barra lateral** (compu): logo + nombre de la app en mayúsculas chicas, botón negro "‹ Herramientas", menú agrupado (Trabajo / Datos / Configuración…), tarjeta del usuario abajo (iniciales, nombre, rol, modo oscuro, cuadritos al portal).
- **Barra de arriba:** ruta "Herramientas / App / Pantalla", buscador con **Ctrl+K** y botón de actualizar.
- **Inicio:** saludo ("Buen día, Juan"), una línea de contexto, tarjetas de resumen (**la principal en pistacho**) y lo pendiente. Cada pantalla con encabezado (título grande + bajada).
- **Filtros** como botones redondeados (chips) o selects compactos de 38 px. **Estados** con los colores de arriba (verde OK, naranja revisar, rojo error). Íconos de línea, trazo 2.
- **Celular:** si la usan en la calle, pensada primero para celular (botones grandes, barra de abajo); si es de oficina, que igual se vea bien.
- Antes de algo visual grande, mostrame una **vista previa**.

---

## 7. Comportamientos comunes — obligatorios
- **Aviso de versión nueva:** píldora negra abajo "Hay una versión nueva de <App>" + botón pistacho "Actualizar" (bloque `avisoVersionNueva`; modo `app.js?v=` como Facturas, o `sw.js` + `BUILD` como Relevamientos).
- **Pantallas rápidas:** Inicio, tableros y Salud muestran al instante lo último guardado (por persona) y se actualizan de fondo. **Después de cualquier cambio (POST/PUT/DELETE) se borra lo guardado**, así los contadores y tableros se actualizan en el acto. Si el Worker guarda el tablero en su base (como Facturas y Efectivo, `kv.tablero_cache`), también se borra al haber un cambio.
- **Tablas largas:** con alto máximo se desplazan adentro de su recuadro, encabezado fijo.
- **Sin usuarios propios:** ninguna pestaña "Usuarios", "Cambiar clave" ni "Cerrar sesión".
- **Configuración → Salud** (si la app usa servicios externos: Shares, Drive, IA): estado de cada conexión, igual que en las otras.
- **Instalable** (PWA) con la tarjeta "Instalar en el celular" en Mi cuenta.
- Mensajes cortos y en criollo; confirmación antes de borrar; estados vacíos con texto claro ("Todavía no hay…").

---

## 8. Cómo se entrega: un solo zip para el robot (obligatorio)
Juan sube **un solo archivo `.zip`**, sin descomprimir, a la raíz de **herramientasluccianos** (Add file → Upload files → Commit). El robot de GitHub lo abre y en uno o dos minutos publica todo: copia cada app a su repo (GitHub Pages las actualiza), publica los Workers en Cloudflare y deja un resumen ✅/❌ en la pestaña **Actions**. Después borra el zip.

**Formato del zip** (nombre sugerido: `entrega-AAAA-MM-DD-tema.zip`):
```
entrega.zip
├── facturasluccianos/            ← una carpeta por repo, con el NOMBRE EXACTO del repo
│   ├── app.js                    ← los archivos que cambian, con su ruta dentro del repo
│   └── index.html                   (si hay subcarpetas, van igual: icons/icon-192.png)
├── viaticosluccianos/
│   └── …
├── herramientasluccianos/        ← el portal; lo que va en _sistema/ queda oculto
│   └── index.html
└── workers/                      ← los Workers, CERRADOS con candado
    ├── facturas-api.js.cerrado   ← <nombre exacto del Worker en Cloudflare>.js.cerrado
    └── acceso-api.js.cerrado
```
- Solo los archivos que cambian. El robot **pisa** archivos, **no borra** nada: si hay que borrar un archivo, avisale a Juan.
- Repos válidos: los de la tabla del punto 2, `facturas-lector` y `sorteoluccianos`. Un repo **nuevo** tiene que agregarse a mano al token del robot (`GH_REPOS_TOKEN`, Contents: Read and write): pedíselo a Juan con los pasos.
- **Workers:** el robot solo actualiza el **código** de un Worker que ya existe; los bindings y los secretos quedan como están. Un Worker **nuevo** se crea una vez a mano en Cloudflare (con sus bindings y secretos) y desde ahí se actualiza por el robot.
- **Regla de oro:** los Workers se cambian solo por el robot. Si alguien editó uno a mano en Cloudflare, pedí el .txt actual antes de tocarlo.

**Cómo cerrar un Worker con candado** (cifrado híbrido RSA-OAEP-SHA256 + AES-256-GCM; el robot lo abre con el secreto `LLAVE_ABRIR`). Llave para cerrar (pública, no abre nada):
```
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1RQeYTnXiC52hcKLtIFb
ur95RC7h3vGF+p/8Yg6W5O/4vOg8naxdwcqQp6YlD6iZhvJs9OnQZUwjVfxoDhN+
dtKfnP39VoHl7+r7p/vNzwp8KDXiC5bvsBE8tEWv8kmyQAFZbEF3DC0v2ZXIyZT0
UWxO6MpOxEJIieNiQM3tUOGCqs24gPqnkjGHLN5LHwrpHypWeKYvDgJj7kiEqs+w
1hlxQ51I9zb9IJC+QqyBc4+LgoRPc0pQiYdMPoY2KL+vcsuJJjDoATt73nB36qhz
kTfjdsf8FUpSY8hexYj0Nbzh3cUbGV/GaK/qoERsiATHCOWvJlt1FMUYGnAhR83N
ptXIFN1S1lybh4CEnPJeyzzue/asczp0HsEvwurjuZ3jOhDvXkI5PRaWx2rKbxOY
ipOjhvD78o6GOGQNcXMlM64sQBnw+A/AfsRZ9vsU6xmSmx1F0CT1J6s6Gufye8hb
a6tZbS01So6PxxX5NimX8fPhTeXL0IWbkGgLeB0IkG6n47Be+nGYB59/dYSYO9Pe
lmPaa6gbFz9Xa8ZloZjplc8G89EWCuk/bZJUsevc184xNij0I7IbgcWlHmWYpcbL
5JsIb15ssznnUFUOMpEMu2mAFvGjK0KF+MjkQFaGC5BreUeXT69YLb37R8t64R0i
246DO1gkqMegjBfH2qkrU0UCAwEAAQ==
-----END PUBLIC KEY-----
```
Script (Node 18+), se corre como `node cerrar.mjs facturas-api.js` y genera `facturas-api.js.cerrado` (poner la llave de arriba en `llave_cerrar.pem` al lado del script):
```js
// Cierra con candado un Worker para la entrega: node cerrar.mjs archivo.js  →  archivo.js.cerrado
import fs from 'node:fs'; import crypto from 'node:crypto';
const pub = fs.readFileSync(new URL('./llave_cerrar.pem', import.meta.url));
for (const f of process.argv.slice(2)) {
  const llave = crypto.randomBytes(32), iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', llave, iv);
  const data = Buffer.concat([c.update(fs.readFileSync(f)), c.final()]);
  const k = crypto.publicEncrypt({ key: pub, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' }, llave);
  fs.writeFileSync(f + '.cerrado', JSON.stringify({ v: 1, k: k.toString('base64'), iv: iv.toString('base64'), tag: c.getAuthTag().toString('base64'), data: data.toString('base64') }));
  console.log('cerrado', f);
}
```
**Nunca** pongas un Worker sin cerrar en el zip: el repo es público.

**Versiones:** en cada entrega subí el número en `index.html` (`app.js?v=` y `styles.css?v=`) y, en las apps con service worker, el `CACHE` de `sw.js` **y el mismo valor en `BUILD`** (Relevamientos y Viáticos). Sin eso, los navegadores no toman el cambio y no aparece el aviso de versión nueva.

**Orden:** si hace falta SQL o crear algo en Cloudflare, eso va **antes** de subir el zip; decíselo a Juan paso a paso. Después: subir el zip → mirar el resumen en Actions → probar con Ctrl+F5.

**Al final de cada entrega**, decile a Juan: qué trae el zip, si hay algo para hacer antes (SQL, binding, secreto) y qué probar. Y revisá en GitHub que los archivos hayan quedado publicados.

---

## 9. Cuidados
- **Base de datos:** índices en lo que se filtra seguido; nada que recorra tablas enteras en cada pantalla; nada que consulte cada pocos segundos (mínimo 15 s, y solo con la pantalla abierta). Aunque el plan es pago, leer de más hace todo más lento y se cobra.
- Secretos (claves de APIs) **solo** como Secrets del Worker, nunca en el repo.
- Probar antes de entregar: sintaxis, una prueba simulada del Worker (acceso, rol consulta, CORS del portal) y capturas de las pantallas.

---

## 10. Checklist de entrega
- [ ] Copia de la base (Calidad o Asientos) con styles.css tal cual
- [ ] Acceso por portal, sin login propio, sin "Cerrar sesión"
- [ ] Worker con ACCESO, verificación cacheada, persona atada a `portal_id`, roles `admin` y `consulta`, CORS del portal
- [ ] Botón "‹ Herramientas", ruta arriba, Ctrl+K, Inicio con saludo y tarjetas
- [ ] Aviso de versión nueva y pantallas rápidas
- [ ] Alta en base `acceso`, portal (APPS_TODAS, ICONOS, PREVIAS, ID_ACCESO, CON_LOGIN_UNICO, API_APP, pendientes/buscador) y mails (QUE_HACE)
- [ ] DNS y GitHub Pages explicados paso a paso
- [ ] Guía PDF y la tabla del punto 2 actualizadas
- [ ] Un solo zip con el formato del robot (repos con su nombre exacto, Workers `.js.cerrado`), versiones subidas, e instrucciones de qué hacer antes, qué subir y qué probar

---

## La app nueva
(Completá:)
- **Nombre** y dirección que querés (ej. `calidad.luccianos.com.ar`):
- **Para qué sirve** (qué problema resuelve):
- **Quién la usa y con qué rol** (y qué puede hacer cada rol):
- **Qué se carga** (datos, fotos, archivos…):
- **Qué se ve** (listados, tableros, informes, exportaciones):
- **Dónde se usa** (celular, compu o los dos):
- **Conexiones** (¿Shares? ¿Drive? ¿lectura con IA? ¿otra app de Herramientas?):
- **Qué tiene que aparecer en "Para hoy"** del portal:
