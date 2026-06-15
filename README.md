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
spring.datasource.url=jdbc:mysql://localhost:3307/tutaller_db
spring.datasource.username=root
spring.datasource.password=Scv123456!
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

Ejecucion:

```powershell
cd C:\Users\SURICH\Documents\TuTallerPe\backend
.\sync-frontend.ps1
.\mvnw.cmd spring-boot:run
```

Luego abre `http://localhost:8080/`.

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

El sitio y la API quedan desacoplados a nivel de estructura, pero ya integrados en ejecucion.

Estado actual de integracion:

- Spring Boot sirve el frontend desde `backend/src/main/resources/static`.
- `http://localhost:8080/` carga el `index.html`.
- el frontend consume la API en `/api/...`.
- login, registro, talleres, detalle, inscripcion y publicacion ya usan backend.

## Datos demo

SQL de poblacion:

- [backend/database/seed_tutaller.sql](C:\Users\SURICH\Documents\TuTallerPe\backend\database\seed_tutaller.sql)

Contenido:

- 20 usuarios
- 60 talleres
- 120 inscripciones
- 72 comentarios

Password de todas las cuentas demo:

```text
Demo2026!
```

Cuentas utiles:

- Usuario: `camila.rojas@demo.com`
- Usuario: `diego.salazar@demo.com`
- Organizador: `organizador.arte@tutaller.pe`
- Organizador: `organizador.cocina@tutaller.pe`

Puedes importar ese SQL en MySQL Workbench para que tu grupo tenga exactamente la misma data.

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
- frontend y backend conectados.
- frontend servido desde `localhost:8080`.
- base de datos demo cargada y lista para pruebas.
