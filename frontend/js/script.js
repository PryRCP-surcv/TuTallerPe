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

    window.location.href = construirUrlAccesoOrganizador(obtenerRutaActual());
}

function protegerRutasUsuario() {
    const pagina = obtenerRutaActual();

    if (pagina !== "inscripcion.html") {
        return;
    }

    if (localStorage.getItem("tutallerRole") === "usuario") {
        return;
    }

    window.location.href = construirUrlAccesoUsuario("inscripcion.html");
}

function configurarCierreSesion() {
    document.querySelectorAll('[data-nav-item="salir"]').forEach(function (enlace) {
        enlace.addEventListener("click", function () {
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

    form.addEventListener("submit", function (evento) {
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

        localStorage.setItem("tutallerRole", mode === "organizador" ? "organizador" : "usuario");

        window.location.href = redirect || "index.html";
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

    form.addEventListener("submit", function (evento) {
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

        if (primerCampoConError) {
            mostrarResumen("registroForm", "Completa correctamente la informacion obligatoria.");
            primerCampoConError.focus();
            return;
        }

        const params = obtenerParametrosPagina();
        const mode = params.get("mode");
        const redirect = params.get("redirect") || "index.html";

        if (mode === "organizador") {
            window.location.href = construirUrlAccesoOrganizador(params.get("redirect") || "admin.html");
            return;
        }

        window.location.href = construirUrlAccesoUsuario(redirect);
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

    form.addEventListener("submit", function (evento) {
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

        window.location.href = "confirmacion-taller.html";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    configurarTema();
    protegerRutasOrganizador();
    protegerRutasUsuario();
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
});
