# TuTaller.pe

Proyecto academico para el curso de Interaccion Hombre Maquina.

## Estructura actual

Este repositorio queda organizado en tres partes:

- frontend web en `frontend/`.
- backend Spring Boot en `backend/`.
- bitacora de avance dentro de `frontend/documentacion/`.

## Frontend

### Como ejecutar

Opcion simple:

1. Abre [frontend/index.html](C:\Users\SURICH\Documents\TuTallerPe\frontend\index.html) en tu navegador.

Opcion recomendada:

```powershell
cd C:\Users\SURICH\Documents\TuTallerPe
python -m http.server 5500
```

Luego abre `http://localhost:5500/frontend/index.html`.

### Flujos disponibles

- Usuario: `index.html -> talleres.html -> detalle-taller.html -> inscripcion.html -> confirmacion.html -> perfil.html`
- Login: `login.html -> index.html`
- Registro: `registro.html -> login.html -> index.html`
- Administrador: `admin.html -> crear-taller.html -> confirmacion-taller.html -> admin.html`

### Paginas del sitio

- [frontend/index.html](C:\Users\SURICH\Documents\TuTallerPe\frontend\index.html)
- [frontend/talleres.html](C:\Users\SURICH\Documents\TuTallerPe\frontend\talleres.html)
- [frontend/detalle-taller.html](C:\Users\SURICH\Documents\TuTallerPe\frontend\detalle-taller.html)
- [frontend/inscripcion.html](C:\Users\SURICH\Documents\TuTallerPe\frontend\inscripcion.html)
- [frontend/confirmacion.html](C:\Users\SURICH\Documents\TuTallerPe\frontend\confirmacion.html)
- [frontend/perfil.html](C:\Users\SURICH\Documents\TuTallerPe\frontend\perfil.html)
- [frontend/login.html](C:\Users\SURICH\Documents\TuTallerPe\frontend\login.html)
- [frontend/registro.html](C:\Users\SURICH\Documents\TuTallerPe\frontend\registro.html)
- [frontend/admin.html](C:\Users\SURICH\Documents\TuTallerPe\frontend\admin.html)
- [frontend/crear-taller.html](C:\Users\SURICH\Documents\TuTallerPe\frontend\crear-taller.html)
- [frontend/confirmacion-taller.html](C:\Users\SURICH\Documents\TuTallerPe\frontend\confirmacion-taller.html)

### Bitacora del avance

- [frontend/documentacion/bitacora-avance3.txt](C:\Users\SURICH\Documents\TuTallerPe\frontend\documentacion\bitacora-avance3.txt)

### Mejoras aplicadas en el sitio

- identidad visual mas consistente.
- navegacion con pagina activa y breadcrumbs.
- mejor responsive para escritorio y movil.
- estados visuales para botones, cards, formularios y mensajes.
- validaciones obligatorias en login, registro y publicacion de talleres.
- mejoras de accesibilidad con foco visible, labels asociados, alt y atributos aria.

## Backend futuro: `backend`

### Stack

- Java 21
- Spring Boot 3.5.15
- Maven
- Spring Web
- Spring Data JPA
- MySQL Driver
- Validation
- Spring Security
- Lombok
- Spring Boot DevTools

### Como ejecutar

Requisitos:

- Java 21
- MySQL local
- base de datos `tutaller_db`

Configuracion actual en [application.properties](C:\Users\SURICH\Documents\TuTallerPe\backend\src\main\resources\application.properties):

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/tutaller_db
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

Ejecucion:

```powershell
cd C:\Users\SURICH\Documents\TuTallerPe\backend
.\mvnw.cmd spring-boot:run
```

Prueba basica:

```powershell
.\mvnw.cmd test
```

### Arquitectura base

```text
src/main/java/com/tutaller/api/
|-- config
|-- controller
|-- dto
|-- exception
|-- model
|-- repository
|-- security
`-- service
```

Entidades base:

- `Usuario`
- `Taller`
- `Inscripcion`
- `Comentario`

### Endpoints disponibles

Usuarios:

- `GET /api/usuarios`
- `GET /api/usuarios/{id}`
- `POST /api/usuarios`

Talleres:

- `GET /api/talleres`
- `GET /api/talleres/{id}`
- `POST /api/talleres`
- `PUT /api/talleres/{id}`
- `DELETE /api/talleres/{id}`

Inscripciones:

- `GET /api/inscripciones`
- `POST /api/inscripciones`

Comentarios:

- `GET /api/comentarios/taller/{tallerId}`
- `POST /api/comentarios`

Auth:

- `POST /api/auth/login`
- `POST /api/auth/register`

## Relacion futura frontend/backend

El sitio y la API quedan desacoplados a proposito.

Siguiente etapa sugerida:

1. Consumir `GET /api/talleres` desde el catalogo.
2. Conectar login y registro con `/api/auth`.
3. Registrar inscripciones reales desde el formulario.
4. Publicar talleres desde el flujo administrador usando `/api/talleres`.
5. Persistir comentarios y estados desde la API.

## Estructura recomendada a futuro

Si van a seguir creciendo el proyecto, la estructura recomendada es:

```text
TuTallerPe/
|-- frontend/
|   |-- index.html
|   |-- talleres.html
|   |-- css/
|   |-- js/
|   `-- documentacion/
|-- backend/
`-- README.md
```

Mas adelante, `frontend/` puede migrar a React + Vite sin afectar la API, porque ya quedo desacoplado y separado del backend.

## Estado actual

- sitio listo para presentar.
- documentacion separada del recorrido principal.
- backend listo como base tecnica futura.
- integracion frontend/backend pendiente.
