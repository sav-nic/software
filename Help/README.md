# Manual SAV

Sitio estático de ayuda, sin compilación ni dependencias.

## Abrir

- `index.html`: manual funcional para clientes; no muestra contenido interno.
- `tecnico.html`: manual completo para implementación, soporte y desarrollo.

Ambos pueden abrirse directamente en un navegador o publicarse como contenido estático.

## Archivos

- `index.html`: fuente compartida del manual funcional y técnico.
- `tecnico.html`: entrada restringida que activa el modo técnico.
- `styles.css`: presentación responsiva e impresión.
- `app.js`: navegación, búsqueda y controles.
- `assets/placeholder.svg`: imagen temporal.
- `images/README.txt`: nombres sugeridos para capturas.

## Agregar capturas

Guarde cada captura dentro de `images` con el nombre indicado en
`images/README.txt`. Si una imagen no existe, el navegador muestra
automáticamente `assets/placeholder.svg`.

Antes de publicar una captura, oculte usuarios, clientes, credenciales,
tokens, licencias, referencias bancarias y demás información sensible.
