## Frontend actual

Este frontend sigue en HTML, CSS y JavaScript para no romper el avance actual.

### Estructura

- `index.html`, `talleres.html`, `detalle-taller.html`, `inscripcion.html`, `confirmacion.html`, `perfil.html`
- `login.html`, `registro.html`
- `admin.html`, `crear-taller.html`, `confirmacion-taller.html`
- `ayuda.html`
- `css/`
- `js/`
- `imagenes/`
- `img/`
- `documentacion/`

### Preparado para migrar a React

La separacion actual permite migrar luego a `React + Vite` con este criterio:

- cada HTML principal puede convertirse en una pagina React
- `css/estilos.css` puede dividirse en estilos globales y por componente
- `js/script.js` puede separarse en validaciones, navegacion y utilidades
- `imagenes/` e `img/` pueden pasar a `src/assets/`

### Estructura sugerida para la migracion

```text
frontend/
|-- public/
|-- src/
|   |-- assets/
|   |-- components/
|   |-- pages/
|   |-- layouts/
|   |-- styles/
|   |-- utils/
|   |-- App.jsx
|   `-- main.jsx
|-- package.json
`-- vite.config.js
```

### Mapa sugerido de paginas

- `index.html` -> `pages/Home.jsx`
- `talleres.html` -> `pages/Talleres.jsx`
- `detalle-taller.html` -> `pages/DetalleTaller.jsx`
- `inscripcion.html` -> `pages/Inscripcion.jsx`
- `confirmacion.html` -> `pages/Confirmacion.jsx`
- `perfil.html` -> `pages/Perfil.jsx`
- `login.html` -> `pages/Login.jsx`
- `registro.html` -> `pages/Registro.jsx`
- `admin.html` -> `pages/Admin.jsx`
- `crear-taller.html` -> `pages/CrearTaller.jsx`
- `confirmacion-taller.html` -> `pages/ConfirmacionTaller.jsx`
- `ayuda.html` -> `pages/Ayuda.jsx`
