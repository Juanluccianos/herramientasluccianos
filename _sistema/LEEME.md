# Sistema de Herramientas (carpeta interna, no se publica en la web)

- Las entregas se suben como **un solo .zip** a la raíz de este repo. El robot (.github/workflows/robot.yml) las publica solo.
- Dentro del zip: una carpeta por repo (`facturasluccianos/`, `viaticosluccianos/`…, `herramientasluccianos/` para el portal)
  y `workers/` con cada Worker cerrado con candado (`<worker>.js.cerrado`).
- `_sistema/workers/` guarda la última versión cerrada de cada Worker (historial en los commits).
- Regla de oro: los Workers se cambian SOLO por acá. Si se edita uno a mano en Cloudflare, la próxima entrega lo pisa.
