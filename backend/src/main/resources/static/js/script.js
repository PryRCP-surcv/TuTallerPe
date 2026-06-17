function validarCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarPassword(password) {
    const tieneMinimo = password.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneNumero = /\d/.test(password);

    return tieneMinimo && tieneMayuscula && tieneNumero;
}

function validarTelefono(telefono) {
    return /^[0-9]{9}$/.test(telefono);
}

function validarNumeroPositivo(valor) {
    return !Number.isNaN(Number(valor)) && Number(valor) > 0;
}

function obtenerCampo(id) {
    return document.getElementById(id);
}

function obtenerParametrosPagina() {
    return new URLSearchParams(window.location.search);
}

function obtenerRutaActual() {
    const ruta = window.location.pathname.split("/").pop();
    return ruta || "index.html";
}

function obtenerRutaActualConBusqueda() {
    return `${obtenerRutaActual()}${window.location.search || ""}`;
}

function construirUrlAccesoOrganizador(destino = "admin.html") {
    const params = new URLSearchParams({
        redirect: destino,
        mode: "organizador"
    });

    return "login.html?" + params.toString();
}

function construirUrlRegistroOrganizador(destino = "admin.html") {
    const params = new URLSearchParams({
        redirect: destino,
        mode: "organizador"
    });

    return "registro.html?" + params.toString();
}

function construirUrlAccesoUsuario(destino = "index.html") {
    const params = new URLSearchParams({
        redirect: destino
    });

    return "login.html?" + params.toString();
}

function construirUrlRegistroUsuario(destino = "index.html") {
    const params = new URLSearchParams({
        redirect: destino
    });

    return "registro.html?" + params.toString();
}

function obtenerContextoRutaUsuario(destino) {
    const ruta = destino || "index.html";

    if (ruta.includes("inscripcion.html")) {
        return {
            loginTitle: "Estas retomando tu inscripcion",
            loginCopy: "Inicia sesion para volver directo al formulario del taller que elegiste y completar tu reserva sin perder el hilo.",
            registerTitle: "Estas creando tu cuenta para continuar con tu inscripcion",
            registerCopy: "Despues del registro iniciaras sesion y volveras directo al formulario del taller que elegiste.",
            nextStep: "Siguiente: completar inscripcion"
        };
    }

    if (ruta.includes("detalle-taller.html")) {
        return {
            loginTitle: "Estas entrando para seguir revisando este taller",
            loginCopy: "Inicia sesion para volver al detalle del taller, revisar su informacion y continuar con seguridad.",
            registerTitle: "Estas creando tu cuenta para volver a este taller",
            registerCopy: "Despues del registro iniciaras sesion y volveras al taller que estabas explorando.",
            nextStep: "Siguiente: volver al detalle"
        };
    }

    return {
        loginTitle: "Estas entrando para inscribirte",
        loginCopy: "Continua para explorar talleres, revisar detalles y reservar tu cupo sin perder tu progreso.",
        registerTitle: "Estas creando tu cuenta para inscribirte",
        registerCopy: "Tu cuenta te permitira guardar intereses, revisar inscripciones y continuar mas rapido con tus reservas.",
        nextStep: "Siguiente: explorar talleres"
    };
}

function obtenerTemaPreferido() {
    const guardado = localStorage.getItem("tutallerTheme");

    if (guardado === "dark" || guardado === "light") {
        return guardado;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function aplicarTema(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem("tutallerTheme", theme);

    const boton = document.querySelector("[data-theme-toggle]");

    if (boton) {
        const esOscuro = theme === "dark";
        boton.textContent = esOscuro ? "\u2600" : "\u263E";
        boton.setAttribute("aria-pressed", String(esOscuro));
        boton.setAttribute("aria-label", esOscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
    }
}

function configurarTema() {
    const nav = document.querySelector("[data-nav-menu]");

    if (!nav) {
        return;
    }

    let boton = nav.querySelector("[data-theme-toggle]");

    if (!boton) {
        boton = document.createElement("button");
        boton.type = "button";
        boton.className = "theme-toggle";
        boton.setAttribute("data-theme-toggle", "true");
        nav.appendChild(boton);
    }

    boton.addEventListener("click", function () {
        const actual = document.body.dataset.theme === "dark" ? "dark" : "light";
        aplicarTema(actual === "dark" ? "light" : "dark");
    });

    aplicarTema(obtenerTemaPreferido());
}

function marcarOpcionAcceso(id, activa) {
    const enlace = obtenerCampo(id);

    if (!enlace) {
        return;
    }

    enlace.classList.toggle("is-active", activa);

    if (activa) {
        enlace.setAttribute("aria-current", "page");
    } else {
        enlace.removeAttribute("aria-current");
    }
}

function mostrarError(campoId, errorId, mensaje) {
    const campo = obtenerCampo(campoId);
    const error = obtenerCampo(errorId);

    if (campo) {
        campo.setAttribute("aria-invalid", "true");
        campo.dataset.valid = "false";
    }

    if (error) {
        error.textContent = mensaje;
    }
}

function mostrarValido(campoId, errorId, mensaje = "") {
    const campo = obtenerCampo(campoId);
    const error = obtenerCampo(errorId);

    if (campo) {
        campo.setAttribute("aria-invalid", "false");
        campo.dataset.valid = "true";
    }

    if (error) {
        error.textContent = mensaje;
    }
}

function limpiarEstado(campoId, errorId) {
    const campo = obtenerCampo(campoId);
    const error = obtenerCampo(errorId);

    if (campo) {
        campo.removeAttribute("aria-invalid");
        campo.removeAttribute("data-valid");
    }

    if (error) {
        error.textContent = "";
    }
}

function mostrarResumen(formId, mensaje) {
    const form = obtenerCampo(formId);
    if (!form) {
        return;
    }

    const resumen = form.querySelector(".form-feedback");
    if (resumen) {
        resumen.textContent = mensaje;
        resumen.classList.add("is-visible");
    }
}

function limpiarResumen(formId) {
    const form = obtenerCampo(formId);
    if (!form) {
        return;
    }

    const resumen = form.querySelector(".form-feedback");
    if (resumen) {
        resumen.textContent = "";
        resumen.classList.remove("is-visible");
    }
}

const IMAGENES_TALLER = {
    arte: [
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
        "imagenes/pintura.webp",
        "imagenes/pintura1.webp"
    ],
    musica: [
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80",
        "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80",
        "imagenes/canto.png"
    ],
    danza: [
        "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&q=80",
        "https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&q=80",
        "imagenes/bailes.webp"
    ],
    tecnologia: [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"
    ],
    cocina: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
        "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80",
        "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=600&q=80"
    ],
    idiomas: [
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80",
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80"
    ],
    comunicacion: [
        "imagenes/oratoria.jpg",
        "imagenes/oratoria1.avif",
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80"
    ],
    teatro: [
        "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&q=80",
        "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&q=80",
        "imagenes/arton28927.jpg"
    ],
    bienestar: [
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80"
    ],
    fotografia: [
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
        "https://images.unsplash.com/photo-1452780212461-4f9f951b6194?w=600&q=80"
    ],
    manualidades: [
        "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        "imagenes/pintura.webp"
    ]
};

function normalizarTexto(valor) {
    return (valor || "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function escapeHtml(valor) {
    return (valor || "")
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatearPrecio(valor) {
    const numero = Number(valor || 0);

    if (Number.isNaN(numero)) {
        return "S/ 0";
    }

    return new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(numero);
}

function formatearRol(rol) {
    return rol === "ADMINISTRADOR" ? "Organizador" : "Usuario";
}

function formatearEstadoTexto(estado) {
    const texto = (estado || "").toString().replace(/_/g, " ").toLowerCase();

    if (!texto) {
        return "Sin estado";
    }

    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function obtenerRolInterfaz(usuario) {
    return usuario?.rol === "ADMINISTRADOR" ? "organizador" : "usuario";
}

function sincronizarSesionConRol() {
    const sesion = obtenerSesion();

    if (!sesion) {
        localStorage.removeItem("tutallerRole");
        return;
    }

    localStorage.setItem("tutallerRole", obtenerRolInterfaz(sesion));
}

function obtenerSesionActiva() {
    return obtenerSesion();
}

function usuarioEsOrganizador() {
    return obtenerRolInterfaz(obtenerSesionActiva()) === "organizador";
}

function usuarioEsCliente() {
    return obtenerRolInterfaz(obtenerSesionActiva()) === "usuario";
}

function obtenerIdTallerDesdePagina() {
    const id = obtenerParametrosPagina().get("id");
    const parsed = Number(id);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function construirUrlDetalleTaller(id) {
    return id ? `detalle-taller.html?id=${id}` : "detalle-taller.html";
}

function construirUrlInscripcionTaller(id) {
    return id ? `inscripcion.html?id=${id}` : "inscripcion.html";
}

function obtenerImagenTaller(categoria, index = 0) {
    const clave = normalizarTexto(categoria);
    const imagenes = IMAGENES_TALLER[clave] || ["imagenes/hero.jpg"];
    return imagenes[index % imagenes.length];
}

function obtenerEtiquetaTipo(tipo) {
    return formatearEstadoTexto(tipo);
}

function tallerCoincideConHorario(taller, horario) {
    const valor = normalizarTexto(horario);
    const horarioTaller = normalizarTexto(taller.horario);

    if (!valor) {
        return true;
    }

    if (valor === "fin de semana") {
        return horarioTaller.includes("sab") || horarioTaller.includes("dom") || horarioTaller.includes("fin de semana");
    }

    if (valor === "manana") {
        return /\b(7|8|9|10|11):/.test(horarioTaller) || horarioTaller.includes("am");
    }

    if (valor === "tarde") {
        return /\b(12|1|2|3|4|5):/.test(horarioTaller) || horarioTaller.includes("pm");
    }

    if (valor === "noche") {
        return /\b(6|7|8|9):/.test(horarioTaller) || horarioTaller.includes("pm");
    }

    return horarioTaller.includes(valor);
}

function tallerCoincideConPrecio(taller, precioSeleccionado) {
    const precio = Number(taller.precio || 0);
    const filtro = normalizarTexto(precioSeleccionado);

    if (!filtro) {
        return true;
    }

    if (filtro.includes("menos de")) {
        return precio < 50;
    }

    if (filtro.includes("50 - 80")) {
        return precio >= 50 && precio <= 80;
    }

    if (filtro.includes("80 - 120")) {
        return precio > 80 && precio <= 120;
    }

    if (filtro.includes("mas de")) {
        return precio > 120;
    }

    return true;
}

function filtrarTalleres(talleres, params) {
    const q = normalizarTexto(params.get("q"));
    const categoria = normalizarTexto(params.get("categoria"));
    const distrito = normalizarTexto(params.get("distrito"));
    const precio = params.get("precio");
    const horario = params.get("horario");
    const tipo = normalizarTexto(params.get("tipo"));

    return talleres.filter(function (taller) {
        const contenido = normalizarTexto([taller.nombre, taller.descripcion, taller.categoria, taller.distrito].join(" "));
        const categoriaTaller = normalizarTexto(taller.categoria);
        const distritoTaller = normalizarTexto(taller.distrito);
        const tipoTaller = normalizarTexto(taller.tipo);

        return (!q || contenido.includes(q))
            && (!categoria || categoriaTaller === categoria)
            && (!distrito || distritoTaller === distrito)
            && tallerCoincideConPrecio(taller, precio)
            && tallerCoincideConHorario(taller, horario)
            && (!tipo || tipoTaller === tipo);
    });
}

function crearCardTallerHtml(taller, index = 0) {
    const imagen = obtenerImagenTaller(taller.categoria, index);
    const tipo = obtenerEtiquetaTipo(taller.tipo);
    const estadoClass = normalizarTexto(taller.tipo) === "virtual" ? "status-pill info" : "status-pill";
    const detalleUrl = construirUrlDetalleTaller(taller.id);

    return `
        <article class="workshop-card fade-in">
            <div class="workshop-media">
                <img src="${escapeHtml(imagen)}" alt="${escapeHtml(`Imagen del ${taller.nombre}`)}">
            </div>
            <div class="workshop-body">
                <div class="tag-list">
                    <span class="tag">${escapeHtml(taller.categoria)}</span>
                    <span class="${estadoClass}">${escapeHtml(tipo)}</span>
                </div>
                <h3>${escapeHtml(taller.nombre)}</h3>
                <div class="workshop-meta">
                    <div class="meta-row"><span>Distrito</span><span>${escapeHtml(taller.distrito)}</span></div>
                    <div class="meta-row"><span>Horario</span><span>${escapeHtml(taller.horario)}</span></div>
                    <div class="meta-row"><span>Precio</span><span>${escapeHtml(formatearPrecio(taller.precio))}</span></div>
                </div>
                <div class="workshop-card-footer">
                    <span class="mini-note">${escapeHtml(`${taller.vacantes} vacantes`)}</span>
                    <a class="btn btn-detail" href="${escapeHtml(detalleUrl)}" aria-label="${escapeHtml(`Ver detalle del ${taller.nombre}`)}">Ver detalle</a>
                </div>
            </div>
        </article>
    `;
}

function actualizarEnlacesResumenTaller(taller) {
    const comparar = obtenerCampo("homeCompararLink");
    const reserva = obtenerCampo("homeReservaLink");

    if (comparar) {
        comparar.setAttribute("href", construirUrlDetalleTaller(taller?.id));
    }

    if (reserva) {
        reserva.setAttribute("href", construirUrlInscripcionTaller(taller?.id));
    }
}

function actualizarResumenResultados(total) {
    const chip = obtenerCampo("catalogoResultadosChip");
    const descripcion = obtenerCampo("catalogoResultadosDescripcion");

    if (chip) {
        chip.textContent = `${total} resultado${total === 1 ? "" : "s"}`;
    }

    if (descripcion) {
        descripcion.textContent = total
            ? `${total} opcion${total === 1 ? "" : "es"} visible${total === 1 ? "" : "s"} para comparar rapido y entrar al detalle.`
            : "No encontramos talleres con esos filtros. Prueba otra combinacion.";
    }
}

function actualizarMetricasHome(talleres) {
    const totalTalleres = talleres.length;
    const totalCategorias = new Set(
        talleres
            .map(function (taller) {
                return normalizarTexto(taller.categoria);
            })
            .filter(Boolean)
    ).size;

    const metricCategorias = obtenerCampo("homeMetricCategorias");
    const metricTalleres = obtenerCampo("homeMetricTalleres");

    if (metricCategorias && totalCategorias) {
        metricCategorias.textContent = String(totalCategorias);
    }

    if (metricTalleres && totalTalleres) {
        metricTalleres.textContent = String(totalTalleres);
    }
}

function activarMenu() {
    const boton = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");

    if (!boton || !menu) {
        return;
    }

    const cerrarMenu = () => {
        menu.classList.remove("is-open");
        boton.setAttribute("aria-expanded", "false");
    };

    boton.addEventListener("click", function () {
        const expandido = boton.getAttribute("aria-expanded") === "true";
        boton.setAttribute("aria-expanded", String(!expandido));
        menu.classList.toggle("is-open", !expandido);
    });

    menu.querySelectorAll("a").forEach(function (enlace) {
        enlace.addEventListener("click", cerrarMenu);
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            cerrarMenu();
        }
    });

    document.addEventListener("click", function (evento) {
        if (!menu.contains(evento.target) && !boton.contains(evento.target)) {
            cerrarMenu();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 920) {
            cerrarMenu();
        }
    });
}

function activarPaginaActual() {
    const pagina = document.body.dataset.page;

    if (!pagina) {
        return;
    }

    document.querySelectorAll("[data-nav-item]").forEach(function (enlace) {
        const coincide = enlace.dataset.navItem === pagina;
        enlace.classList.toggle("is-active", coincide);

        if (coincide) {
            enlace.setAttribute("aria-current", "page");
        } else {
            enlace.removeAttribute("aria-current");
        }
    });
}

function reescribirAccesosOrganizador() {
    if (document.body.dataset.page === "admin") {
        return;
    }

    if (localStorage.getItem("tutallerRole") === "organizador") {
        return;
    }

    document.querySelectorAll('a[href="admin.html"], a[href="crear-taller.html"], a[href="confirmacion-taller.html"]').forEach(function (enlace) {
        const destino = enlace.getAttribute("href");
        enlace.setAttribute("href", construirUrlAccesoOrganizador(destino));
    });
}

function reescribirAccesosUsuario() {
    const rol = localStorage.getItem("tutallerRole");

    if (rol === "usuario") {
        return;
    }

    document.querySelectorAll('a[href="inscripcion.html"]').forEach(function (enlace) {
        enlace.setAttribute("href", construirUrlAccesoUsuario("inscripcion.html"));
    });
}

function protegerRutasOrganizador() {
    if (document.body.dataset.page !== "admin") {
        return;
    }

    const rol = localStorage.getItem("tutallerRole");

    if (rol === "organizador") {
        return;
    }

    window.location.href = construirUrlAccesoOrganizador(obtenerRutaActualConBusqueda());
}

function protegerRutasUsuario() {
    const pagina = obtenerRutaActual();

    if (pagina !== "inscripcion.html") {
        return;
    }

    if (localStorage.getItem("tutallerRole") === "usuario") {
        return;
    }

    window.location.href = construirUrlAccesoUsuario(obtenerRutaActualConBusqueda());
}

function protegerRutaPerfil() {
    if (document.body.dataset.page !== "perfil") {
        return;
    }

    if (usuarioEsCliente()) {
        return;
    }

    window.location.href = construirUrlAccesoUsuario(obtenerRutaActualConBusqueda());
}

function configurarCierreSesion() {
    document.querySelectorAll('[data-nav-item="salir"]').forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            limpiarSesion();
            localStorage.removeItem("tutallerRole");
        });
    });
}

function configurarVistaLogin() {
    const params = obtenerParametrosPagina();
    const modo = params.get("mode");
    const redirectUsuario = params.get("redirect") || "index.html";
    const redirectOrganizador = modo === "organizador" && params.get("redirect")
        ? params.get("redirect")
        : "admin.html";
    const contextoUsuario = obtenerContextoRutaUsuario(redirectUsuario);

    marcarOpcionAcceso("loginChoiceUser", modo !== "organizador");
    marcarOpcionAcceso("loginChoiceOrganizer", modo === "organizador");

    const userChoice = obtenerCampo("loginChoiceUser");
    const organizerChoice = obtenerCampo("loginChoiceOrganizer");

    if (userChoice) {
        userChoice.setAttribute("href", construirUrlAccesoUsuario(redirectUsuario));
    }

    if (organizerChoice) {
        organizerChoice.setAttribute("href", construirUrlAccesoOrganizador(redirectOrganizador));
    }

    const routeBanner = obtenerCampo("loginRouteBanner");
    const routeBadge = obtenerCampo("loginRouteBadge");
    const routeTitle = obtenerCampo("loginRouteTitle");
    const routeCopy = obtenerCampo("loginRouteCopy");
    const routePillOne = obtenerCampo("loginRoutePillOne");
    const routePillTwo = obtenerCampo("loginRoutePillTwo");
    const createAccountLink = obtenerCampo("loginCreateAccountLink");

    if (modo !== "organizador") {
        if (createAccountLink) {
            createAccountLink.setAttribute("href", construirUrlRegistroUsuario(redirectUsuario));
        }

        if (routeBanner) {
            routeBanner.dataset.route = "inscripcion";
        }

        if (routeBadge) {
            routeBadge.textContent = "Ruta activa";
        }

        if (routeTitle) {
            routeTitle.textContent = contextoUsuario.loginTitle;
        }

        if (routeCopy) {
            routeCopy.textContent = contextoUsuario.loginCopy;
        }

        if (routePillOne) {
            routePillOne.textContent = "Acceso personal";
        }

        if (routePillTwo) {
            routePillTwo.textContent = contextoUsuario.nextStep;
        }

        return;
    }

    if (createAccountLink) {
        createAccountLink.setAttribute("href", construirUrlRegistroOrganizador(redirectOrganizador));
    }

    const cambios = [
        ["loginHeroEyebrow", "Acceso para publicar"],
        ["loginHeroTitle", "Inicia sesion para publicar y gestionar tus talleres"],
        ["loginHeroDescription", "Accede con tu cuenta para publicar nuevas experiencias, revisar reservas y mantener actualizada tu oferta."],
        ["loginHeroNoteTitle", "Espacio para tus publicaciones"],
        ["loginHeroNoteCopy", "Entra para crear talleres, revisar reservas y mantener visible tu propuesta."],
        ["loginFormEyebrow", "Quiero publicar talleres"],
        ["titulo-login", "Ingresar para publicar talleres"],
        ["loginSubmitButton", "Entrar a publicar talleres"]
    ];

    cambios.forEach(function ([id, texto]) {
        const elemento = obtenerCampo(id);

        if (elemento) {
            elemento.textContent = texto;
        }
    });

    const hint = obtenerCampo("loginOrganizerHint");

    if (hint) {
        hint.hidden = true;
    }

    if (routeBanner) {
        routeBanner.dataset.route = "publicar";
    }

    if (routeBadge) {
        routeBadge.textContent = "Ruta activa";
    }

    if (routeTitle) {
        routeTitle.textContent = "Estas entrando para publicar talleres";
    }

    if (routeCopy) {
        routeCopy.textContent = "Tu siguiente paso sera entrar al panel para crear publicaciones, revisar reservas y mantener visible tu oferta.";
    }

    if (routePillOne) {
        routePillOne.textContent = "Acceso de negocio";
    }

    if (routePillTwo) {
        routePillTwo.textContent = "Siguiente: entrar al panel";
    }
}

function escucharValidacionEnTiempoReal(validaciones) {
    validaciones.forEach(function (item) {
        const campo = obtenerCampo(item.campoId);

        if (!campo) {
            return;
        }

        const ejecutar = function () {
            const mensaje = item.validar(campo.value);

            if (mensaje) {
                mostrarError(item.campoId, item.errorId, mensaje);
            } else {
                mostrarValido(item.campoId, item.errorId);
            }
        };

        campo.addEventListener("blur", ejecutar);

        campo.addEventListener("input", function () {
            if (campo.getAttribute("aria-invalid") === "true" || campo.dataset.valid === "true") {
                ejecutar();
            }
        });
    });
}

function configurarLogin() {
    const form = obtenerCampo("loginForm");

    if (!form) {
        return;
    }

    const validaciones = [
        {
            campoId: "loginCorreo",
            errorId: "errorLoginCorreo",
            validar: function (valor) {
                const correo = valor.trim();

                if (!correo) {
                    return "El correo electronico es obligatorio.";
                }

                if (!validarCorreo(correo)) {
                    return "Ingresa un correo valido. Ejemplo: usuario@correo.com";
                }

                return "";
            }
        },
        {
            campoId: "loginPassword",
            errorId: "errorLoginPassword",
            validar: function (valor) {
                const password = valor.trim();

                if (!password) {
                    return "La contrasena es obligatoria.";
                }

                if (!validarPassword(password)) {
                    return "La contrasena debe tener minimo 8 caracteres, una mayuscula y un numero.";
                }

                return "";
            }
        }
    ];

    escucharValidacionEnTiempoReal(validaciones);

    form.addEventListener("submit", async function (evento) {
        evento.preventDefault();
        limpiarResumen("loginForm");

        let primerCampoConError = null;

        validaciones.forEach(function (item) {
            const mensaje = item.validar(obtenerCampo(item.campoId).value);

            if (mensaje) {
                mostrarError(item.campoId, item.errorId, mensaje);

                if (!primerCampoConError) {
                    primerCampoConError = obtenerCampo(item.campoId);
                }
            } else {
                mostrarValido(item.campoId, item.errorId);
            }
        });

        if (primerCampoConError) {
            mostrarResumen("loginForm", "Revisa los campos marcados para continuar.");
            primerCampoConError.focus();
            return;
        }

        const params = obtenerParametrosPagina();
        const redirect = params.get("redirect");
        const mode = params.get("mode");
        const submitButton = obtenerCampo("loginSubmitButton");

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {
            const response = await apiPost("/auth/login", {
                correo: obtenerCampo("loginCorreo").value.trim(),
                password: obtenerCampo("loginPassword").value.trim()
            });

            if (mode === "organizador" && response.usuario?.rol !== "ADMINISTRADOR") {
                throw new Error("Esta cuenta no tiene acceso al portal para organizadores.");
            }

            guardarSesion(response.usuario);
            localStorage.setItem("tutallerRole", mode === "organizador" ? "organizador" : obtenerRolInterfaz(response.usuario));
            window.location.href = redirect || "index.html";
        } catch (error) {
            mostrarResumen("loginForm", error.message || "No se pudo iniciar sesion.");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
}

function configurarVistaRegistro() {
    const params = obtenerParametrosPagina();
    const modo = params.get("mode");
    const redirectUsuario = params.get("redirect") || "index.html";
    const redirectOrganizador = modo === "organizador" && params.get("redirect")
        ? params.get("redirect")
        : "admin.html";
    const contextoUsuario = obtenerContextoRutaUsuario(redirectUsuario);

    marcarOpcionAcceso("registroChoiceUser", modo !== "organizador");
    marcarOpcionAcceso("registroChoiceOrganizer", modo === "organizador");

    const userChoice = obtenerCampo("registroChoiceUser");
    const organizerChoice = obtenerCampo("registroChoiceOrganizer");

    if (userChoice) {
        userChoice.setAttribute("href", construirUrlRegistroUsuario(redirectUsuario));
    }

    if (organizerChoice) {
        organizerChoice.setAttribute("href", construirUrlRegistroOrganizador(redirectOrganizador));
    }

    const routeBanner = obtenerCampo("registroRouteBanner");
    const routeBadge = obtenerCampo("registroRouteBadge");
    const routeTitle = obtenerCampo("registroRouteTitle");
    const routeCopy = obtenerCampo("registroRouteCopy");
    const routePillOne = obtenerCampo("registroRoutePillOne");
    const routePillTwo = obtenerCampo("registroRoutePillTwo");
    const loginLink = obtenerCampo("registroLoginLink");

    if (modo !== "organizador") {
        if (loginLink) {
            loginLink.setAttribute("href", construirUrlAccesoUsuario(redirectUsuario));
        }

        if (routeBanner) {
            routeBanner.dataset.route = "inscripcion";
        }

        if (routeBadge) {
            routeBadge.textContent = "Ruta activa";
        }

        if (routeTitle) {
            routeTitle.textContent = contextoUsuario.registerTitle;
        }

        if (routeCopy) {
            routeCopy.textContent = contextoUsuario.registerCopy;
        }

        if (routePillOne) {
            routePillOne.textContent = "Cuenta personal";
        }

        if (routePillTwo) {
            routePillTwo.textContent = "Siguiente: iniciar sesion";
        }

        return;
    }

    const cambios = [
        ["registroHeroEyebrow", "Cuenta para publicar"],
        ["registroHeroTitle", "Crea tu cuenta para publicar talleres en TuTaller.pe"],
        ["registroHeroDescription", "Registra tus datos para empezar a compartir experiencias, gestionar publicaciones y dar seguimiento a tus reservas."],
        ["registroTipOne", "Define la categoria principal de los talleres que deseas publicar."],
        ["registroTipTwo", "Accede luego a un panel para crear, revisar y actualizar tus publicaciones."],
        ["registroTipThree", "Completa el registro con mensajes claros y validaciones en tiempo real."],
        ["registroFormEyebrow", "Quiero publicar talleres"],
        ["titulo-registro", "Crear cuenta para publicar talleres"],
        ["registroFormDescription", "Completa tus datos para crear tu acceso como organizador. Luego podras iniciar sesion y publicar talleres."],
        ["registroInteresLabel", "Categoria principal de tus talleres"]
    ];

    cambios.forEach(function ([id, texto]) {
        const elemento = obtenerCampo(id);

        if (elemento) {
            elemento.textContent = texto;
        }
    });

    if (loginLink) {
        loginLink.setAttribute("href", construirUrlAccesoOrganizador(redirectOrganizador));
    }

    const hint = obtenerCampo("registroOrganizerHint");

    if (hint) {
        hint.hidden = true;
    }

    if (routeBanner) {
        routeBanner.dataset.route = "publicar";
    }

    if (routeBadge) {
        routeBadge.textContent = "Ruta activa";
    }

    if (routeTitle) {
        routeTitle.textContent = "Estas creando tu cuenta para publicar talleres";
    }

    if (routeCopy) {
        routeCopy.textContent = "Despues del registro podras entrar al espacio para crear talleres, actualizar su informacion y revisar actividad.";
    }

    if (routePillOne) {
        routePillOne.textContent = "Cuenta de negocio";
    }

    if (routePillTwo) {
        routePillTwo.textContent = "Siguiente: entrar a publicar";
    }
}

function configurarRegistro() {
    const form = obtenerCampo("registroForm");

    if (!form) {
        return;
    }

    // Mensajito al marcar el checkbox de políticas
    const checkTerminos = obtenerCampo("registroTerminos");
    const errorTerminosEl = obtenerCampo("errorRegistroTerminos");
    if (checkTerminos && errorTerminosEl) {
        checkTerminos.addEventListener("change", function () {
            if (this.checked) {
                errorTerminosEl.textContent = "";
                errorTerminosEl.className = "success-msg";
                errorTerminosEl.textContent = "¡Gracias! Has aceptado los Terminos y la Politica de Privacidad.";
                setTimeout(() => {
                    errorTerminosEl.textContent = "";
                    errorTerminosEl.className = "error-msg";
                }, 3500);
            } else {
                errorTerminosEl.className = "error-msg";
                errorTerminosEl.textContent = "";
            }
        });
    }

    const validaciones = [
        {
            campoId: "registroNombre",
            errorId: "errorRegistroNombre",
            validar: function (valor) {
                return valor.trim() ? "" : "El nombre completo es obligatorio.";
            }
        },
        {
            campoId: "registroCorreo",
            errorId: "errorRegistroCorreo",
            validar: function (valor) {
                const correo = valor.trim();

                if (!correo) {
                    return "El correo electronico es obligatorio.";
                }

                if (!validarCorreo(correo)) {
                    return "Ingresa un correo valido. Ejemplo: usuario@correo.com";
                }

                return "";
            }
        },
        {
            campoId: "registroTelefono",
            errorId: "errorRegistroTelefono",
            validar: function (valor) {
                const telefono = valor.trim();

                if (!telefono) {
                    return "El telefono es obligatorio.";
                }

                if (!validarTelefono(telefono)) {
                    return "El telefono debe tener exactamente 9 digitos.";
                }

                return "";
            }
        },
        {
            campoId: "registroInteres",
            errorId: "errorRegistroInteres",
            validar: function (valor) {
                return valor ? "" : "Selecciona una categoria de interes.";
            }
        },
        {
            campoId: "registroPassword",
            errorId: "errorRegistroPassword",
            validar: function (valor) {
                const password = valor.trim();

                if (!password) {
                    return "La contrasena es obligatoria.";
                }

                if (password.length < 8) {
                    return "La contrasena debe tener al menos 8 caracteres.";
                }

                if (!/[A-Z]/.test(password)) {
                    return "La contrasena debe incluir al menos una mayuscula.";
                }

                if (!/\d/.test(password)) {
                    return "La contrasena debe incluir al menos un numero.";
                }

                return "";
            }
        },
        {
            campoId: "registroConfirmar",
            errorId: "errorRegistroConfirmar",
            validar: function (valor) {
                const confirmar = valor.trim();
                const password = obtenerCampo("registroPassword").value.trim();

                if (!confirmar) {
                    return "Debes confirmar la contrasena.";
                }

                if (confirmar !== password) {
                    return "Las contrasenas no coinciden.";
                }

                return "";
            }
        }
    ];

    escucharValidacionEnTiempoReal(validaciones);

    form.addEventListener("submit", async function (evento) {
        evento.preventDefault();
        limpiarResumen("registroForm");

        let primerCampoConError = null;

        validaciones.forEach(function (item) {
            const mensaje = item.validar(obtenerCampo(item.campoId).value);

            if (mensaje) {
                mostrarError(item.campoId, item.errorId, mensaje);

                if (!primerCampoConError) {
                    primerCampoConError = obtenerCampo(item.campoId);
                }
            } else {
                mostrarValido(item.campoId, item.errorId);
            }
        });

        const terminosCheckbox = obtenerCampo("registroTerminos");
        const errorTerminos = obtenerCampo("errorRegistroTerminos");
        if (terminosCheckbox && !terminosCheckbox.checked) {
            if (errorTerminos) {
                errorTerminos.textContent = "Debes aceptar los Terminos y Condiciones para continuar.";
            }
            if (!primerCampoConError) {
                primerCampoConError = terminosCheckbox;
            }
        } else if (errorTerminos) {
            errorTerminos.textContent = "";
        }

        if (primerCampoConError) {
            mostrarResumen("registroForm", "Completa correctamente la informacion obligatoria.");
            primerCampoConError.focus();
            return;
        }

        const params = obtenerParametrosPagina();
        const mode = params.get("mode");
        const redirect = params.get("redirect") || "index.html";
        const submitButton = form.querySelector('button[type="submit"]');

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {
            await apiPost("/auth/register", {
                nombres: obtenerCampo("registroNombre").value.trim(),
                correo: obtenerCampo("registroCorreo").value.trim(),
                telefono: obtenerCampo("registroTelefono").value.trim(),
                password: obtenerCampo("registroPassword").value.trim(),
                rol: mode === "organizador" ? "ADMINISTRADOR" : "USUARIO"
            });

            if (mode === "organizador") {
                window.location.href = construirUrlAccesoOrganizador(params.get("redirect") || "admin.html");
                return;
            }

            window.location.href = construirUrlAccesoUsuario(redirect);
        } catch (error) {
            mostrarResumen("registroForm", error.message || "No se pudo completar el registro.");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
}

function configurarCrearTaller() {
    const form = obtenerCampo("crearTallerForm");

    if (!form) {
        return;
    }

    const validaciones = [
        {
            campoId: "tallerNombre",
            errorId: "errorTallerNombre",
            validar: function (valor) {
                return valor.trim() ? "" : "El nombre del taller es obligatorio.";
            }
        },
        {
            campoId: "tallerCategoria",
            errorId: "errorTallerCategoria",
            validar: function (valor) {
                return valor ? "" : "Selecciona una categoria.";
            }
        },
        {
            campoId: "tallerDistrito",
            errorId: "errorTallerDistrito",
            validar: function (valor) {
                return valor ? "" : "Selecciona un distrito.";
            }
        },
        {
            campoId: "tallerTipo",
            errorId: "errorTallerTipo",
            validar: function (valor) {
                return valor ? "" : "Selecciona el tipo de taller.";
            }
        },
        {
            campoId: "tallerHorario",
            errorId: "errorTallerHorario",
            validar: function (valor) {
                return valor.trim() ? "" : "El horario es obligatorio.";
            }
        },
        {
            campoId: "tallerPrecio",
            errorId: "errorTallerPrecio",
            validar: function (valor) {
                const precio = valor.trim();

                if (!precio) {
                    return "El precio es obligatorio.";
                }

                if (!validarNumeroPositivo(precio)) {
                    return "Ingresa un precio mayor a 0.";
                }

                return "";
            }
        },
        {
            campoId: "tallerVacantes",
            errorId: "errorTallerVacantes",
            validar: function (valor) {
                const vacantes = valor.trim();

                if (!vacantes) {
                    return "Las vacantes son obligatorias.";
                }

                if (!validarNumeroPositivo(vacantes)) {
                    return "Las vacantes deben ser mayores a 0.";
                }

                return "";
            }
        },
        {
            campoId: "tallerDescripcion",
            errorId: "errorTallerDescripcion",
            validar: function (valor) {
                return valor.trim() ? "" : "La descripcion es obligatoria.";
            }
        }
    ];

    escucharValidacionEnTiempoReal(validaciones);

    form.addEventListener("submit", async function (evento) {
        evento.preventDefault();
        limpiarResumen("crearTallerForm");

        let primerCampoConError = null;

        validaciones.forEach(function (item) {
            const mensaje = item.validar(obtenerCampo(item.campoId).value);

            if (mensaje) {
                mostrarError(item.campoId, item.errorId, mensaje);

                if (!primerCampoConError) {
                    primerCampoConError = obtenerCampo(item.campoId);
                }
            } else {
                mostrarValido(item.campoId, item.errorId);
            }
        });

        if (primerCampoConError) {
            mostrarResumen("crearTallerForm", "Completa los datos obligatorios antes de publicar el taller.");
            primerCampoConError.focus();
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {
            const taller = await apiPost("/talleres", {
                nombre: obtenerCampo("tallerNombre").value.trim(),
                descripcion: obtenerCampo("tallerDescripcion").value.trim(),
                categoria: obtenerCampo("tallerCategoria").value,
                distrito: obtenerCampo("tallerDistrito").value,
                tipo: obtenerCampo("tallerTipo").value.toUpperCase(),
                horario: obtenerCampo("tallerHorario").value.trim(),
                precio: Number(obtenerCampo("tallerPrecio").value),
                vacantes: Number(obtenerCampo("tallerVacantes").value),
                estado: "ACTIVO"
            });

            guardarUltimoTallerPublicado(taller);
            guardarTallerSeleccionado(taller);
            window.location.href = "confirmacion-taller.html";
        } catch (error) {
            mostrarResumen("crearTallerForm", error.message || "No se pudo publicar el taller.");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
}

async function cargarTalleresDisponibles() {
    const talleres = await apiGet("/talleres");
    return talleres.filter(function (taller) {
        return taller.estado === "ACTIVO" || !taller.estado;
    });
}

async function cargarHome() {
    const contenedor = obtenerCampo("featuredTalleresGrid");

    if (!contenedor) {
        return;
    }

    try {
        const talleres = await cargarTalleresDisponibles();
        const destacados = talleres.slice(0, 6);
        actualizarMetricasHome(talleres);

        if (!destacados.length) {
            contenedor.innerHTML = `<article class="panel"><h3>No hay talleres disponibles</h3><p class="panel-text">Cuando registres talleres en el backend apareceran aqui automaticamente.</p></article>`;
            return;
        }

        contenedor.innerHTML = destacados.map(crearCardTallerHtml).join("");
        actualizarEnlacesResumenTaller(destacados[0]);
    } catch (error) {
        contenedor.innerHTML = `<article class="panel"><h3>No pudimos cargar los talleres</h3><p class="panel-text">${escapeHtml(error.message)}</p></article>`;
    }
}

function aplicarValoresFiltros(form, params, ids) {
    if (!form) {
        return;
    }

    Object.entries(ids).forEach(function ([param, id]) {
        const campo = obtenerCampo(id);
        const valor = params.get(param);

        if (campo && valor) {
            campo.value = valor;
        }
    });
}

async function cargarCatalogoTalleres() {
    const contenedor = obtenerCampo("catalogoTalleresGrid");

    if (!contenedor) {
        return;
    }

    const params = obtenerParametrosPagina();
    aplicarValoresFiltros(obtenerCampo("catalogoSearchForm"), params, {
        q: "catalogoBusqueda",
        categoria: "catalogoCategoria",
        distrito: "catalogoDistrito",
        precio: "catalogoPrecio",
        horario: "catalogoHorario",
        tipo: "catalogoTipo"
    });

    try {
        const talleres = await cargarTalleresDisponibles();
        const resultados = filtrarTalleres(talleres, params);

        actualizarResumenResultados(resultados.length);

        if (!resultados.length) {
            contenedor.innerHTML = `<article class="panel"><h3>Sin resultados</h3><p class="panel-text">Prueba con otra categoria, distrito o rango de precio.</p></article>`;
            return;
        }

        contenedor.innerHTML = resultados.map(crearCardTallerHtml).join("");
    } catch (error) {
        contenedor.innerHTML = `<article class="panel"><h3>No pudimos cargar el catalogo</h3><p class="panel-text">${escapeHtml(error.message)}</p></article>`;
    }
}

function renderDetalleInfo(taller) {
    const title = obtenerCampo("detalleTitulo");
    const description = obtenerCampo("detalleDescripcion");
    const highlights = obtenerCampo("detalleHighlights");
    const tags = obtenerCampo("detalleTags");
    const infoList = obtenerCampo("detalleInfoList");
    const image = obtenerCampo("detalleImagen");
    const caption = obtenerCampo("detalleImagenCaption");

    if (title) {
        title.textContent = taller.nombre;
    }

    if (description) {
        description.textContent = taller.descripcion;
    }

    if (highlights) {
        highlights.innerHTML = `
            <span class="chip">${escapeHtml(taller.categoria)}</span>
            <span class="chip">${escapeHtml(`${taller.vacantes} vacantes disponibles`)}</span>
            <span class="chip">${escapeHtml(`Modalidad ${obtenerEtiquetaTipo(taller.tipo)}`)}</span>
        `;
    }

    if (tags) {
        tags.innerHTML = `
            <span class="tag">${escapeHtml(taller.categoria)}</span>
            <span class="status-pill">${escapeHtml(obtenerEtiquetaTipo(taller.tipo))}</span>
            <span class="status-pill info">${escapeHtml(formatearEstadoTexto(taller.estado))}</span>
        `;
    }

    if (infoList) {
        infoList.innerHTML = `
            <li><strong>Distrito</strong><span>${escapeHtml(taller.distrito)}</span></li>
            <li><strong>Horario</strong><span>${escapeHtml(taller.horario)}</span></li>
            <li><strong>Categoria</strong><span>${escapeHtml(taller.categoria)}</span></li>
            <li><strong>Precio</strong><span>${escapeHtml(formatearPrecio(taller.precio))}</span></li>
            <li><strong>Vacantes</strong><span>${escapeHtml(String(taller.vacantes))}</span></li>
            <li><strong>Estado</strong><span>${escapeHtml(formatearEstadoTexto(taller.estado))}</span></li>
        `;
    }

    if (image) {
        image.src = obtenerImagenTaller(taller.categoria);
        image.alt = `Imagen de ${taller.nombre}`;
    }

    if (caption) {
        caption.textContent = `${taller.nombre} en ${taller.distrito}, con horario ${taller.horario} y modalidad ${obtenerEtiquetaTipo(taller.tipo)}.`;
    }
}

function renderComentariosDetalle(comentarios) {
    const list = obtenerCampo("detalleComentariosList");

    if (!list) {
        return;
    }

    if (!comentarios.length) {
        list.innerHTML = `<div class="callout-item"><strong>Aun no hay comentarios</strong><p class="panel-text">Cuando los usuarios empiecen a dejar opiniones, apareceran aqui.</p></div>`;
        return;
    }

    list.innerHTML = comentarios.slice(0, 3).map(function (comentario) {
        return `
            <div class="callout-item">
                <strong>${escapeHtml(comentario.usuarioNombre)}</strong>
                <p class="panel-text">"${escapeHtml(comentario.comentario)}"</p>
            </div>
        `;
    }).join("");
}

function actualizarAccionesDetalle(taller) {
    const inscribirse = document.querySelector('.button-row a[href*="inscripcion.html"]');
    const ingresar = document.querySelector('.button-row a[href*="login.html"]');

    if (inscribirse) {
        inscribirse.setAttribute("href", usuarioEsCliente()
            ? construirUrlInscripcionTaller(taller.id)
            : construirUrlAccesoUsuario(construirUrlInscripcionTaller(taller.id)));
    }

    if (ingresar) {
        ingresar.setAttribute("href", construirUrlAccesoUsuario(construirUrlInscripcionTaller(taller.id)));
    }
}

async function cargarDetalleTaller() {
    if (!obtenerCampo("detalleTitulo")) {
        return;
    }

    try {
        const id = obtenerIdTallerDesdePagina();
        let taller = null;

        if (id) {
            taller = await apiGet(`/talleres/${id}`);
        } else {
            const seleccionado = obtenerTallerSeleccionado();
            if (seleccionado?.id) {
                taller = await apiGet(`/talleres/${seleccionado.id}`);
            } else {
                const talleres = await cargarTalleresDisponibles();
                taller = talleres[0] || null;
            }
        }

        if (!taller) {
            const title = obtenerCampo("detalleTitulo");
            const description = obtenerCampo("detalleDescripcion");
            const comments = obtenerCampo("detalleComentariosList");

            if (title) {
                title.textContent = "No encontramos este taller";
            }

            if (description) {
                description.textContent = "Publica un taller nuevo o vuelve al catalogo para revisar otras opciones disponibles.";
            }

            if (comments) {
                comments.innerHTML = `<div class="callout-item"><strong>Sin informacion disponible</strong><p class="panel-text">Este taller aun no existe en la base de datos o fue retirado del catalogo.</p></div>`;
            }
            return;
        }

        guardarTallerSeleccionado(taller);
        renderDetalleInfo(taller);
        actualizarAccionesDetalle(taller);

        try {
            const comentarios = await apiGet(`/comentarios/taller/${taller.id}`);
            renderComentariosDetalle(comentarios);
        } catch (error) {
            renderComentariosDetalle([]);
        }
    } catch (error) {
        const description = obtenerCampo("detalleDescripcion");
        if (description) {
            description.textContent = error.message || "No se pudo cargar el detalle del taller.";
        }
    }
}

async function configurarInscripcion() {
    const form = obtenerCampo("inscripcionForm");

    if (!form) {
        return;
    }

    const sesion = obtenerSesionActiva();
    const resumen = obtenerCampo("inscripcionResumenList");

    if (sesion) {
        obtenerCampo("inscripcionNombre").value = sesion.nombres || "";
        obtenerCampo("inscripcionCorreo").value = sesion.correo || "";
        obtenerCampo("inscripcionTelefono").value = sesion.telefono || "";
    }

    let taller = null;

    try {
        const id = obtenerIdTallerDesdePagina();
        const seleccionado = obtenerTallerSeleccionado();

        if (id) {
            taller = await apiGet(`/talleres/${id}`);
        } else if (seleccionado?.id) {
            taller = await apiGet(`/talleres/${seleccionado.id}`);
        }

        if (taller) {
            guardarTallerSeleccionado(taller);
        }
    } catch (error) {
        taller = obtenerTallerSeleccionado();
    }

    if (resumen && taller) {
        resumen.innerHTML = `
            <li><strong>Categoria</strong><span>${escapeHtml(taller.categoria)}</span></li>
            <li><strong>Modalidad</strong><span>${escapeHtml(obtenerEtiquetaTipo(taller.tipo))}</span></li>
            <li><strong>Horario</strong><span>${escapeHtml(taller.horario)}</span></li>
            <li><strong>Ubicacion</strong><span>${escapeHtml(taller.distrito)}</span></li>
            <li><strong>Precio</strong><span>${escapeHtml(formatearPrecio(taller.precio))}</span></li>
        `;
    } else if (resumen) {
        resumen.innerHTML = `<li><strong>Taller</strong><span>Selecciona primero un taller desde el catalogo.</span></li>`;
    }

    form.addEventListener("submit", async function (evento) {
        evento.preventDefault();
        limpiarResumen("inscripcionForm");

        if (!sesion?.id) {
            mostrarResumen("inscripcionForm", "Debes iniciar sesion para completar la inscripcion.");
            return;
        }

        const tallerActual = taller || obtenerTallerSeleccionado();

        if (!tallerActual?.id) {
            mostrarResumen("inscripcionForm", "No encontramos el taller seleccionado.");
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {
            const inscripcion = await apiPost("/inscripciones", {
                usuarioId: sesion.id,
                tallerId: tallerActual.id,
                estado: "PENDIENTE"
            });

            guardarUltimaInscripcion({
                ...inscripcion,
                taller: tallerActual,
                contacto: {
                    nombre: obtenerCampo("inscripcionNombre").value.trim(),
                    correo: obtenerCampo("inscripcionCorreo").value.trim(),
                    telefono: obtenerCampo("inscripcionTelefono").value.trim()
                }
            });

            window.location.href = "confirmacion.html";
        } catch (error) {
            mostrarResumen("inscripcionForm", error.message || "No se pudo registrar la inscripcion.");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
}

async function cargarPerfil() {
    const datosList = obtenerCampo("perfilDatosList");
    const tbody = obtenerCampo("perfilInscripcionesBody");

    if (!datosList || !tbody) {
        return;
    }

    const sesion = obtenerSesionActiva();

    if (!sesion?.id) {
        return;
    }

    try {
        const [usuario, inscripciones, talleres] = await Promise.all([
            apiGet(`/usuarios/${sesion.id}`),
            apiGet("/inscripciones"),
            apiGet("/talleres")
        ]);

        guardarSesion(usuario);
        sincronizarSesionConRol();

        datosList.innerHTML = `
            <li><strong>Nombre</strong><span>${escapeHtml(usuario.nombres)}</span></li>
            <li><strong>Correo</strong><span>${escapeHtml(usuario.correo)}</span></li>
            <li><strong>Telefono</strong><span>${escapeHtml(usuario.telefono)}</span></li>
            <li><strong>Tipo de cuenta</strong><span>${escapeHtml(formatearRol(usuario.rol))}</span></li>
        `;

        const talleresPorId = new Map(talleres.map(function (taller) {
            return [taller.id, taller];
        }));

        const propias = inscripciones.filter(function (inscripcion) {
            return inscripcion.usuarioId === usuario.id;
        });

        if (!propias.length) {
            tbody.innerHTML = `<tr><td colspan="4">Aun no tienes inscripciones registradas.</td></tr>`;
            return;
        }

        tbody.innerHTML = propias.map(function (inscripcion) {
            const taller = talleresPorId.get(inscripcion.tallerId);
            return `
                <tr>
                    <td>${escapeHtml(inscripcion.tallerNombre)}</td>
                    <td>${escapeHtml(taller ? obtenerEtiquetaTipo(taller.tipo) : "No disponible")}</td>
                    <td>${escapeHtml(taller?.horario || "Por confirmar")}</td>
                    <td><span class="status-pill">${escapeHtml(formatearEstadoTexto(inscripcion.estado))}</span></td>
                </tr>
            `;
        }).join("");
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="4">${escapeHtml(error.message || "No se pudo cargar tu perfil.")}</td></tr>`;
    }
}

async function cargarAdmin() {
    const metricTalleres = obtenerCampo("adminMetricTalleres");
    const metricUsuarios = obtenerCampo("adminMetricUsuarios");
    const metricReservas = obtenerCampo("adminMetricReservas");
    const metricAlertas = obtenerCampo("adminMetricAlertas");
    const talleresBody = obtenerCampo("adminTalleresBody");
    const usuariosBody = obtenerCampo("adminUsuariosBody");

    if (!metricTalleres || !talleresBody || !usuariosBody) {
        return;
    }

    try {
        const [talleres, usuarios, inscripciones] = await Promise.all([
            apiGet("/talleres"),
            apiGet("/usuarios"),
            apiGet("/inscripciones")
        ]);

        metricTalleres.textContent = String(talleres.filter(function (taller) {
            return taller.estado === "ACTIVO";
        }).length);
        metricUsuarios.textContent = String(usuarios.length);
        metricReservas.textContent = String(inscripciones.length);
        metricAlertas.textContent = String(talleres.filter(function (taller) {
            return Number(taller.vacantes || 0) <= 3;
        }).length);

        talleresBody.innerHTML = talleres.length ? talleres.slice(0, 5).map(function (taller) {
            return `
                <tr>
                    <td>${escapeHtml(taller.nombre)}</td>
                    <td>${escapeHtml(taller.categoria)}</td>
                    <td>${escapeHtml(obtenerEtiquetaTipo(taller.tipo))}</td>
                    <td><span class="status-pill">${escapeHtml(formatearEstadoTexto(taller.estado))}</span></td>
                </tr>
            `;
        }).join("") : `<tr><td colspan="4">Aun no hay talleres publicados.</td></tr>`;

        usuariosBody.innerHTML = usuarios.length ? usuarios.slice(0, 5).map(function (usuario) {
            return `
                <tr>
                    <td>${escapeHtml(usuario.nombres)}</td>
                    <td>${escapeHtml(usuario.correo)}</td>
                    <td>${escapeHtml(formatearRol(usuario.rol))}</td>
                    <td><span class="status-pill">Activo</span></td>
                </tr>
            `;
        }).join("") : `<tr><td colspan="4">Aun no hay usuarios registrados.</td></tr>`;
    } catch (error) {
        talleresBody.innerHTML = `<tr><td colspan="4">${escapeHtml(error.message || "No se pudo cargar el panel.")}</td></tr>`;
        usuariosBody.innerHTML = `<tr><td colspan="4">${escapeHtml(error.message || "No se pudo cargar el panel.")}</td></tr>`;
    }
}

function cargarConfirmacionInscripcion() {
    const data = obtenerUltimaInscripcion();
    const copy = obtenerCampo("confirmacionCopy");
    const resumen = obtenerCampo("confirmacionResumenList");

    if (!data || !copy || !resumen) {
        return;
    }

    copy.textContent = `Hemos confirmado tu reserva para ${data.taller?.nombre || data.tallerNombre}. Ahora puedes revisar el estado de tu inscripcion y seguir explorando nuevas opciones.`;
    resumen.innerHTML = `
        <li><strong>Taller</strong><span>${escapeHtml(data.taller?.nombre || data.tallerNombre)}</span></li>
        <li><strong>Modalidad</strong><span>${escapeHtml(data.taller ? obtenerEtiquetaTipo(data.taller.tipo) : "No disponible")}</span></li>
        <li><strong>Horario</strong><span>${escapeHtml(data.taller?.horario || "Por confirmar")}</span></li>
        <li><strong>Precio</strong><span>${escapeHtml(data.taller ? formatearPrecio(data.taller.precio) : "No disponible")}</span></li>
        <li><strong>Estado</strong><span>${escapeHtml(formatearEstadoTexto(data.estado))}</span></li>
    `;
}

function cargarConfirmacionTaller() {
    const data = obtenerUltimoTallerPublicado();
    const copy = obtenerCampo("confirmacionTallerCopy");
    const resumen = obtenerCampo("confirmacionTallerResumenList");

    if (!data || !copy || !resumen) {
        return;
    }

    copy.textContent = `Tu nueva propuesta ${data.nombre} ya forma parte del catalogo y esta lista para ser revisada desde tu portal de organizador.`;
    resumen.innerHTML = `
        <li><strong>Taller</strong><span>${escapeHtml(data.nombre)}</span></li>
        <li><strong>Categoria</strong><span>${escapeHtml(data.categoria)}</span></li>
        <li><strong>Modalidad</strong><span>${escapeHtml(obtenerEtiquetaTipo(data.tipo))}</span></li>
        <li><strong>Precio</strong><span>${escapeHtml(formatearPrecio(data.precio))}</span></li>
        <li><strong>Estado</strong><span>${escapeHtml(formatearEstadoTexto(data.estado))}</span></li>
    `;
}

function inicializarDatosDePagina() {
    cargarHome();
    cargarCatalogoTalleres();
    cargarDetalleTaller();
    configurarInscripcion();
    cargarPerfil();
    cargarAdmin();
    cargarConfirmacionInscripcion();
    cargarConfirmacionTaller();
}

document.addEventListener("DOMContentLoaded", function () {
    sincronizarSesionConRol();
    configurarTema();
    protegerRutasOrganizador();
    protegerRutasUsuario();
    protegerRutaPerfil();
    activarMenu();
    activarPaginaActual();
    reescribirAccesosOrganizador();
    reescribirAccesosUsuario();
    configurarCierreSesion();
    configurarVistaLogin();
    configurarVistaRegistro();
    configurarLogin();
    configurarRegistro();
    configurarCrearTaller();
    inicializarDatosDePagina();
    inicializarAccesibilidad();
    inicializarModales();
});

/* ── Modales legales ────────────────────────────────────── */
function inicializarModales() {
    function abrirModal(id) {
        const overlay = document.getElementById(id);
        if (!overlay) return;
        overlay.removeAttribute("hidden");
        overlay.querySelector(".modal-box")?.focus?.();
        document.body.style.overflow = "hidden";
    }

    function cerrarModal(id) {
        const overlay = document.getElementById(id);
        if (!overlay) return;
        overlay.setAttribute("hidden", "");
        document.body.style.overflow = "";
    }

    document.getElementById("btnTerminos")?.addEventListener("click", () => abrirModal("modalTerminos"));
    document.getElementById("btnPrivacidad")?.addEventListener("click", () => abrirModal("modalPrivacidad"));

    document.querySelectorAll("[data-modal-close]").forEach(btn => {
        btn.addEventListener("click", () => cerrarModal(btn.dataset.modalClose));
    });

    // Cerrar al hacer click fuera del modal-box
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", e => {
            if (e.target === overlay) cerrarModal(overlay.id);
        });
    });

    // Cerrar con Escape
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            document.querySelectorAll(".modal-overlay:not([hidden])").forEach(o => cerrarModal(o.id));
        }
    });
}

/* ── Barra de accesibilidad ─────────────────────────────── */
function inicializarAccesibilidad() {
    const toggle = document.getElementById("accToggle");
    const panel  = document.getElementById("accPanel");
    if (!toggle || !panel) return;

    const SIZES   = [85, 100, 115, 130];
    const DYSLEXIA_FONT = "'OpenDyslexic', 'Comic Sans MS', cursive";
    let sizeIndex = 1;

    // Recuperar preferencias guardadas
    const saved = JSON.parse(localStorage.getItem("tutallerAcc") || "{}");
    if (saved.sizeIndex !== undefined) { sizeIndex = saved.sizeIndex; aplicarFuente(sizeIndex); }
    if (saved.contrast)  activarContraste(true);
    if (saved.dyslexia)  activarDislexia(true);

    function guardar() {
        localStorage.setItem("tutallerAcc", JSON.stringify({
            sizeIndex, contrast: document.body.dataset.accContrast === "1",
            dyslexia: document.body.dataset.accDyslexia === "1"
        }));
    }

    function aplicarFuente(idx) {
        document.documentElement.style.fontSize = SIZES[idx] + "%";
    }

    function activarContraste(on) {
        document.body.dataset.accContrast = on ? "1" : "0";
        const btn = document.getElementById("accContrast");
        if (btn) btn.setAttribute("aria-pressed", String(on));
    }

    function activarDislexia(on) {
        document.body.dataset.accDyslexia = on ? "1" : "0";
        document.body.style.fontFamily = on ? DYSLEXIA_FONT : "";
        const btn = document.getElementById("accDyslexia");
        if (btn) btn.setAttribute("aria-pressed", String(on));
    }

    toggle.addEventListener("click", function() {
        const open = panel.hidden;
        panel.hidden = !open;
        toggle.setAttribute("aria-expanded", String(open));
    });

    document.getElementById("accFontUp").addEventListener("click", function() {
        if (sizeIndex < SIZES.length - 1) { sizeIndex++; aplicarFuente(sizeIndex); guardar(); }
    });
    document.getElementById("accFontDown").addEventListener("click", function() {
        if (sizeIndex > 0) { sizeIndex--; aplicarFuente(sizeIndex); guardar(); }
    });
    document.getElementById("accFontReset").addEventListener("click", function() {
        sizeIndex = 1; aplicarFuente(sizeIndex); guardar();
    });
    document.getElementById("accContrast").addEventListener("click", function() {
        const on = document.body.dataset.accContrast !== "1";
        activarContraste(on); guardar();
    });
    document.getElementById("accDyslexia").addEventListener("click", function() {
        const on = document.body.dataset.accDyslexia !== "1";
        activarDislexia(on); guardar();
    });

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && !panel.hidden) {
            panel.hidden = true;
            toggle.setAttribute("aria-expanded", "false");
            toggle.focus();
        }
    });

    // Botón restablecer todo
    document.getElementById("accResetAll")?.addEventListener("click", function() {
        sizeIndex = 1; aplicarFuente(1);
        activarContraste(false);
        activarDislexia(false);
        aplicarFiltroColor("none");
        localStorage.removeItem("tutallerAcc");
    });

    // Recuperar modo daltónico guardado
    if (saved.colorFilter) aplicarFiltroColor(saved.colorFilter);

    function aplicarFiltroColor(modo) {
        document.body.dataset.accColor = modo === "none" ? "" : modo;
        document.querySelectorAll(".acc-color-chip").forEach(btn => {
            btn.setAttribute("aria-pressed", String(btn.dataset.filter === modo));
        });
        const s = JSON.parse(localStorage.getItem("tutallerAcc") || "{}");
        s.colorFilter = modo;
        localStorage.setItem("tutallerAcc", JSON.stringify(s));
    }

    document.querySelectorAll(".acc-color-chip").forEach(btn => {
        btn.addEventListener("click", () => aplicarFiltroColor(btn.dataset.filter));
    });
}

/* ── Lector de pantalla (Web Speech API) ─────────────────── */
(function inicializarLector() {
    const btnLeer  = document.getElementById("accLector");
    const btnStop  = document.getElementById("accLectorStop");
    if (!btnLeer || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;

    function obtenerTextoLegible() {
        const main = document.getElementById("contenido-principal") || document.body;
        const clone = main.cloneNode(true);
        // Quitar elementos que no se deben leer
        clone.querySelectorAll("script,style,svg,.acc-bar,nav,footer,[aria-hidden='true']").forEach(el => el.remove());
        return clone.innerText || clone.textContent || "";
    }

    function leerPagina() {
        synth.cancel();
        const texto = obtenerTextoLegible();
        const chunks = texto.match(/[^.!?\n]{1,200}[.!?\n]?/g) || [texto];

        let i = 0;
        function leerChunk() {
            if (i >= chunks.length) { detenerLectura(); return; }
            const utt = new SpeechSynthesisUtterance(chunks[i++]);
            utt.lang = "es-PE";
            utt.rate = 0.95;
            utt.pitch = 1;
            // Elegir voz en español si está disponible
            const voces = synth.getVoices();
            const vozEs = voces.find(v => v.lang.startsWith("es")) || null;
            if (vozEs) utt.voice = vozEs;
            utt.onend = leerChunk;
            synth.speak(utt);
        }

        leerChunk();
        btnLeer.setAttribute("hidden", "");
        btnStop.removeAttribute("hidden");
        btnLeer.setAttribute("aria-pressed", "true");
    }

    function detenerLectura() {
        synth.cancel();
        btnLeer.removeAttribute("hidden");
        btnStop.setAttribute("hidden", "");
        btnLeer.setAttribute("aria-pressed", "false");
    }

    btnLeer.addEventListener("click", leerPagina);
    btnStop.addEventListener("click", detenerLectura);

    // Detener si el usuario navega fuera
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) synth.pause();
        else synth.resume();
    });
})();

/* ── Control por voz (Web Speech Recognition) ────────────── */
(function inicializarVoz() {
    const btnVoz    = document.getElementById("accVoz");
    const labelVoz  = document.getElementById("accVozLabel");
    const statusDiv = document.getElementById("accVozStatus");
    const textoDiv  = document.getElementById("accVozTexto");
    if (!btnVoz) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        btnVoz.title = "Tu navegador no soporta reconocimiento de voz";
        btnVoz.disabled = true;
        return;
    }

    const rec = new SpeechRecognition();
    rec.lang = "es-PE";
    rec.continuous = false;
    rec.interimResults = false;

    const COMANDOS = {
        "inicio":          () => { window.location.href = "index.html"; },
        "ir a inicio":     () => { window.location.href = "index.html"; },
        "talleres":        () => { window.location.href = "talleres.html"; },
        "ver talleres":    () => { window.location.href = "talleres.html"; },
        "ir a talleres":   () => { window.location.href = "talleres.html"; },
        "registrarme":     () => { window.location.href = "registro.html"; },
        "crear cuenta":    () => { window.location.href = "registro.html"; },
        "ingresar":        () => { window.location.href = "login.html"; },
        "iniciar sesion":  () => { window.location.href = "login.html"; },
        "publicar taller": () => { window.location.href = "admin.html"; },
        "subir":           () => { window.scrollTo({ top: 0, behavior: "smooth" }); },
        "bajar":           () => { window.scrollBy({ top: 400, behavior: "smooth" }); },
        "buscar":          () => { document.getElementById("searchInput")?.focus(); },
    };

    let activo = false;

    function activar() {
        activo = true;
        btnVoz.setAttribute("aria-pressed", "true");
        labelVoz.textContent = "Voz activa";
        statusDiv.removeAttribute("hidden");
        textoDiv.textContent = "Escuchando...";
        rec.start();
    }

    function desactivar() {
        activo = false;
        rec.stop();
        btnVoz.setAttribute("aria-pressed", "false");
        labelVoz.textContent = "Activar voz";
        statusDiv.setAttribute("hidden", "");
    }

    btnVoz.addEventListener("click", () => { activo ? desactivar() : activar(); });

    rec.onresult = function(e) {
        const dicho = e.results[0][0].transcript.toLowerCase().trim()
            .normalize("NFD").replace(/[̀-ͯ]/g, ""); // quitar tildes
        textoDiv.textContent = `"${dicho}"`;

        const accion = COMANDOS[dicho];
        if (accion) {
            setTimeout(accion, 400);
        } else {
            textoDiv.textContent = `No reconocido: "${dicho}"`;
            setTimeout(() => { if (activo) { textoDiv.textContent = "Escuchando..."; rec.start(); } }, 2000);
            return;
        }
    };

    rec.onerror = function(e) {
        if (e.error === "no-speech") {
            if (activo) rec.start();
        } else {
            textoDiv.textContent = "Error: " + e.error;
            desactivar();
        }
    };

    rec.onend = function() {
        if (activo) {
            setTimeout(() => { try { rec.start(); } catch(_) {} }, 300);
        }
    };
})();
