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

function obtenerWidgetAccesibilidadMarkup() {
    return `
        <div class="acc-widget" role="region" aria-label="Opciones de accesibilidad">
            <button class="acc-fab" id="accToggle" aria-expanded="false" aria-controls="accPanel" aria-label="Abrir opciones de accesibilidad" title="Accesibilidad">
                <svg class="acc-fab-icon acc-fab-icon--open" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm13.66-52.69,19.06-22.25a8,8,0,1,0-12.15-10.4l-16.77,19.6L115.6,132.5A8,8,0,0,0,104,128v-8h24a8,8,0,0,0,0-16H104V96a24,24,0,0,1,43.26-14.41,8,8,0,1,0,12.93-9.45A40,40,0,0,0,88,96v47.71l-19.06,22.25a8,8,0,1,0,12.15,10.4l16.11-18.81,20.4,17.49a8,8,0,0,0,10.37-.21Z"/></svg>
                <svg class="acc-fab-icon acc-fab-icon--close" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg>
                <span class="acc-fab-tooltip">Accesibilidad</span>
            </button>

            <div class="acc-panel" id="accPanel" hidden role="dialog" aria-label="Opciones de accesibilidad">
                <div class="acc-panel-header">
                    <div class="acc-panel-header-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm13.66-52.69,19.06-22.25a8,8,0,1,0-12.15-10.4l-16.77,19.6L115.6,132.5A8,8,0,0,0,104,128v-8h24a8,8,0,0,0,0-16H104V96a24,24,0,0,1,43.26-14.41,8,8,0,1,0,12.93-9.45A40,40,0,0,0,88,96v47.71l-19.06,22.25a8,8,0,1,0,12.15,10.4l16.11-18.81,20.4,17.49a8,8,0,0,0,10.37-.21Z"/></svg>
                    </div>
                    <div class="acc-panel-header-copy">
                        <p class="acc-panel-title">Accesibilidad</p>
                        <p class="acc-panel-subtitle">Personaliza tu experiencia</p>
                    </div>
                    <button class="acc-panel-close" id="accPanelClose" type="button" aria-label="Minimizar panel de accesibilidad" title="Minimizar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M40,128a8,8,0,0,1,8-8H208a8,8,0,0,1,0,16H48A8,8,0,0,1,40,128Z"/></svg>
                    </button>
                </div>

                <div class="acc-panel-body">
                    <div class="acc-section">
                        <div class="acc-section-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,221.66a8,8,0,0,1-11.32,0L188,207.31l-14.34,14.35a8,8,0,0,1-11.32-11.32L176.69,196,162.34,181.66a8,8,0,0,1,11.32-11.32L188,184.69l14.34-14.35a8,8,0,0,1,11.32,11.32L199.31,196l14.35,14.34A8,8,0,0,1,213.66,221.66ZM48,208a8,8,0,0,0,8-8V168h88v32a8,8,0,0,0,16,0V95.76l16.26,40.64a8,8,0,0,0,14.86-5.94l-40-100a8,8,0,0,0-14.86,0l-40,100a8,8,0,0,0,14.86,5.94L126.07,96H144v56H56V56h48a8,8,0,0,0,0-16H48A16,16,0,0,0,32,56V200A8,8,0,0,0,48,208Z"/></svg>
                            Tamano de texto
                        </div>
                        <div class="acc-font-row">
                            <button class="acc-font-btn" id="accFontDown" aria-label="Reducir texto"><span style="font-size:0.75rem;font-weight:800">A</span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"/></svg></button>
                            <button class="acc-font-btn acc-font-btn--reset" id="accFontReset" aria-label="Tamano normal">Normal</button>
                            <button class="acc-font-btn" id="accFontUp" aria-label="Aumentar texto"><span style="font-size:1rem;font-weight:800">A</span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/></svg></button>
                        </div>
                    </div>

                    <div class="acc-divider"></div>

                    <div class="acc-section">
                        <div class="acc-section-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/></svg>
                            Visual
                        </div>
                        <div class="acc-toggle-list">
                            <button class="acc-toggle-item" id="accContrast" aria-pressed="false">
                                <span class="acc-toggle-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192V40a88,88,0,0,1,0,176Z"/></svg></span>
                                <span class="acc-toggle-item-text"><strong>Alto contraste</strong><small>Mejora la visibilidad</small></span>
                                <span class="acc-toggle-switch" aria-hidden="true"></span>
                            </button>
                            <button class="acc-toggle-item" id="accDyslexia" aria-pressed="false">
                                <span class="acc-toggle-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208ZM96,120h64a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16Zm0-32h64a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16Zm0,64h64a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16Z"/></svg></span>
                                <span class="acc-toggle-item-text"><strong>Fuente dislexia</strong><small>Facilita la lectura</small></span>
                                <span class="acc-toggle-switch" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>

                    <div class="acc-divider"></div>

                    <div class="acc-section">
                        <div class="acc-section-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89ZM214,151.58A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,163,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,214,151.58ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100a12,12,0,1,1-12-12A12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Zm88-56a12,12,0,1,1-12-12A12,12,0,0,1,184,100Zm-44,12a12,12,0,1,1-12-12A12,12,0,0,1,140,112Z"/></svg>
                            Daltonismo
                        </div>
                        <div class="acc-color-grid">
                            <button class="acc-color-chip" id="accColorNone" data-filter="none" aria-pressed="true"><span class="acc-color-swatch acc-color-swatch--normal"></span><span>Normal</span></button>
                            <button class="acc-color-chip" id="accColorDeut" data-filter="deuteranopia" aria-pressed="false"><span class="acc-color-swatch acc-color-swatch--deut"></span><span>Deuteranopia</span></button>
                            <button class="acc-color-chip" id="accColorProt" data-filter="protanopia" aria-pressed="false"><span class="acc-color-swatch acc-color-swatch--prot"></span><span>Protanopia</span></button>
                            <button class="acc-color-chip" id="accColorTrit" data-filter="tritanopia" aria-pressed="false"><span class="acc-color-swatch acc-color-swatch--trit"></span><span>Tritanopia</span></button>
                        </div>
                    </div>

                    <div class="acc-divider"></div>

                    <div class="acc-section">
                        <div class="acc-section-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81Z"/></svg>
                            Asistencia
                        </div>
                        <div class="acc-action-list">
                            <button class="acc-action-btn" id="accLector">
                                <span class="acc-action-icon acc-action-icon--blue"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM144,207.64l-57.6-44.79A8,8,0,0,0,81.6,160H32V96H81.6a8,8,0,0,0,4.8-1.85L144,49.36Zm66.06-93.7a39.78,39.78,0,0,1-11.77,28.29,8,8,0,0,1-11.31-11.31,24,24,0,0,0,0-33.94,8,8,0,0,1,11.31-11.31A39.78,39.78,0,0,1,210.06,113.94Zm32.12-37.69a80.1,80.1,0,0,1,0,75.5,8,8,0,0,1-13.94-7.85,64.09,64.09,0,0,0,0-59.8,8,8,0,0,1,13.94-7.85Z"/></svg></span>
                                <span class="acc-action-text"><strong>Leer pagina</strong><small>Escucha el contenido</small></span>
                            </button>
                            <button class="acc-action-btn acc-action-btn--stop" id="accLectorStop" hidden>
                                <span class="acc-action-icon acc-action-icon--red"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M216,48H40a16,16,0,0,0-16,16V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48Zm0,144H40V64H216Z"/></svg></span>
                                <span class="acc-action-text"><strong>Detener lectura</strong><small>Pausar el lector</small></span>
                            </button>
                            <button class="acc-action-btn" id="accVoz" aria-pressed="false">
                                <span class="acc-action-icon acc-action-icon--orange"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V232a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"/></svg></span>
                                <span class="acc-action-text"><strong id="accVozLabel">Control por voz</strong><small>Di un comando</small></span>
                                <span class="acc-toggle-switch" aria-hidden="true"></span>
                            </button>
                            <div class="acc-voz-status" id="accVozStatus" hidden>
                                <span class="acc-voz-dot"></span>
                                <span id="accVozTexto">Escuchando...</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="acc-panel-footer">
                    <button class="acc-reset-all" id="accResetAll">Restablecer todo</button>
                </div>
            </div>
        </div>
    `;
}

function obtenerFiltrosAccesibilidadMarkup() {
    return `
        <svg id="accColorFiltersSvg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
            <defs>
                <filter id="filter-deuteranopia"><feColorMatrix type="matrix" values="0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0"/></filter>
                <filter id="filter-protanopia"><feColorMatrix type="matrix" values="0.152 1.053 -0.205 0 0  0.115 0.786 0.099 0 0  -0.004 -0.048 1.052 0 0  0 0 0 1 0"/></filter>
                <filter id="filter-tritanopia"><feColorMatrix type="matrix" values="1.256 -0.077 -0.179 0 0  -0.078 0.931 0.148 0 0  0.005 0.691 0.304 0 0  0 0 0 1 0"/></filter>
            </defs>
        </svg>
    `;
}

function asegurarWidgetAccesibilidad() {
    if (!document.querySelector(".acc-widget")) {
        document.body.insertAdjacentHTML("beforeend", obtenerWidgetAccesibilidadMarkup());
    }

    if (!document.getElementById("filter-deuteranopia")) {
        document.body.insertAdjacentHTML("beforeend", obtenerFiltrosAccesibilidadMarkup());
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

const STOP_WORDS_BUSQUEDA = new Set([
    "a",
    "al",
    "con",
    "de",
    "del",
    "el",
    "en",
    "la",
    "las",
    "lo",
    "los",
    "para",
    "por",
    "quiero",
    "un",
    "una",
    "ver",
    "verme",
    "buscar",
    "busca",
    "buscame",
    "busqueda",
    "mostrar",
    "muestrame",
    "necesito",
    "taller",
    "talleres"
]);

const CATEGORIAS_BUSQUEDA = [
    "Arte",
    "Musica",
    "Danza",
    "Tecnologia",
    "Cocina",
    "Idiomas",
    "Comunicacion",
    "Teatro",
    "Bienestar",
    "Fotografia",
    "Manualidades"
];

const DISTRITOS_BUSQUEDA = [
    "Ancon",
    "Ate",
    "Barranco",
    "Bellavista",
    "Brena",
    "Callao",
    "Carabayllo",
    "Carmen de la Legua-Reynoso",
    "Chaclacayo",
    "Chorrillos",
    "Cieneguilla",
    "Comas",
    "El Agustino",
    "Independencia",
    "Jesus Maria",
    "La Molina",
    "La Perla",
    "La Punta",
    "La Victoria",
    "Lima Cercado",
    "Lince",
    "Los Olivos",
    "Lurigancho-Chosica",
    "Lurin",
    "Magdalena del Mar",
    "Mi Peru",
    "Miraflores",
    "Pachacamac",
    "Pucusana",
    "Pueblo Libre",
    "Puente Piedra",
    "Punta Hermosa",
    "Punta Negra",
    "Rimac",
    "San Bartolo",
    "San Borja",
    "San Isidro",
    "San Juan de Lurigancho",
    "San Juan de Miraflores",
    "San Luis",
    "San Martin de Porres",
    "San Miguel",
    "Santa Anita",
    "Santa Maria del Mar",
    "Santa Rosa",
    "Santiago de Surco",
    "Surco",
    "Surquillo",
    "Virtual",
    "Ventanilla",
    "Villa El Salvador",
    "Villa Maria del Triunfo"
];

const DIAS_TALLER = [
    ["Lunes", "L"],
    ["Martes", "M"],
    ["Miercoles", "Mi"],
    ["Jueves", "J"],
    ["Viernes", "V"],
    ["Sabados", "S"],
    ["Domingos", "D"]
];

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

function obtenerPrimerNombreUsuario(usuario) {
    const nombreCompleto = (usuario?.nombres || "").toString().trim();

    if (!nombreCompleto) {
        return "Tu cuenta";
    }

    return nombreCompleto.split(/\s+/)[0];
}

function usuarioEsOrganizador() {
    return obtenerRolInterfaz(obtenerSesionActiva()) === "organizador";
}

function usuarioEsCliente() {
    return obtenerRolInterfaz(obtenerSesionActiva()) === "usuario";
}

function crearEnlaceNavegacion(nav, etiqueta, href, navItem, clases = "") {
    const enlace = document.createElement("a");
    enlace.className = `nav-link ${clases}`.trim();
    enlace.href = href;
    enlace.dataset.navItem = navItem;
    enlace.textContent = etiqueta;
    nav.appendChild(enlace);
    return enlace;
}

function obtenerOcrearEnlaceNavegacion(nav, selector, etiqueta, href, navItem, clases = "") {
    const existente = nav.querySelector(selector);

    if (existente) {
        return existente;
    }

    const enlaceSalida = nav.querySelector('[data-nav-item="salir"], [data-nav-item="registro"]');
    const enlace = document.createElement("a");
    enlace.className = `nav-link ${clases}`.trim();
    enlace.href = href;
    enlace.dataset.navItem = navItem;
    enlace.textContent = etiqueta;

    if (enlaceSalida) {
        nav.insertBefore(enlace, enlaceSalida);
    } else {
        nav.appendChild(enlace);
    }

    return enlace;
}

function actualizarNavegacionSesion() {
    const nav = document.querySelector("[data-nav-menu]");
    const sesion = obtenerSesionActiva();

    if (!nav) {
        return;
    }

    if (!sesion) {
        return;
    }

    const esOrganizador = obtenerRolInterfaz(sesion) === "organizador";
    const destinoCuenta = esOrganizador ? "admin.html" : "perfil.html";
    const etiquetaCuenta = esOrganizador ? "tu panel de organizador" : "tu perfil";
    const primerNombre = obtenerPrimerNombreUsuario(sesion);
    const perfilLink = obtenerOcrearEnlaceNavegacion(
        nav,
        '[data-nav-item="perfil"]',
        "Mi cuenta",
        "perfil.html",
        "perfil"
    );
    let adminLink = nav.querySelector('[data-nav-item="admin"]');
    const enlaceLogin = obtenerOcrearEnlaceNavegacion(
        nav,
        '[data-nav-item="login"], [data-nav-item="sesion"]',
        `Hola, ${primerNombre}`,
        destinoCuenta,
        "sesion",
        "nav-session"
    );
    const enlaceRegistro = obtenerOcrearEnlaceNavegacion(
        nav,
        '[data-nav-item="registro"], [data-nav-item="salir"]',
        "Cerrar sesion",
        "index.html",
        "salir",
        "nav-logout"
    );

    perfilLink.textContent = "Mi cuenta";
    perfilLink.setAttribute("href", "perfil.html");
    perfilLink.dataset.navItem = "perfil";

    if (adminLink) {
        adminLink.textContent = esOrganizador ? "Mi panel" : "Publica tu taller";
        adminLink.setAttribute("href", esOrganizador ? "admin.html" : construirUrlAccesoOrganizador("admin.html"));
    } else if (esOrganizador) {
        adminLink = crearEnlaceNavegacion(nav, "Mi panel", "admin.html", "admin");
    }

    if (enlaceLogin) {
        enlaceLogin.textContent = `Hola, ${primerNombre}`;
        enlaceLogin.setAttribute("href", destinoCuenta);
        enlaceLogin.dataset.navItem = "sesion";
        enlaceLogin.classList.add("nav-session");
        enlaceLogin.classList.remove("nav-cta");
        enlaceLogin.setAttribute("title", `Sesion iniciada como ${sesion.nombres}`);
        enlaceLogin.setAttribute("aria-label", `Ir a ${etiquetaCuenta}. Sesion iniciada como ${sesion.nombres}`);
    }

    if (enlaceRegistro) {
        enlaceRegistro.textContent = "Cerrar sesion";
        enlaceRegistro.setAttribute("href", "index.html");
        enlaceRegistro.dataset.navItem = "salir";
        enlaceRegistro.classList.add("nav-logout");
        enlaceRegistro.classList.remove("nav-cta");
        enlaceRegistro.setAttribute("title", "Cerrar sesion");
        enlaceRegistro.setAttribute("aria-label", `Cerrar sesion de ${sesion.nombres}`);
    }

    if (adminLink && perfilLink) {
        nav.insertBefore(perfilLink, adminLink);
    }

    if (adminLink && enlaceLogin) {
        nav.insertBefore(enlaceLogin, enlaceRegistro);
    }
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

function obtenerNombreVisibleTaller(nombre) {
    const texto = (nombre || "").toString().trim();

    if (!texto) {
        return "";
    }

    const partes = texto.split(" - ");
    return (partes[0] || texto).trim();
}

function obtenerConsultaBusqueda(texto) {
    return normalizarTexto(texto)
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(Boolean)
        .filter(function (token) {
            return !STOP_WORDS_BUSQUEDA.has(token);
        })
        .join(" ")
        .trim();
}

function obtenerTokensBusqueda(texto) {
    return obtenerConsultaBusqueda(texto)
        .split(/\s+/)
        .filter(Boolean);
}

function tallerCoincideConBusquedaLibre(taller, consulta) {
    const q = obtenerConsultaBusqueda(consulta);

    if (!q) {
        return true;
    }

    const contenido = normalizarTexto([
        obtenerNombreVisibleTaller(taller.nombre),
        taller.nombre,
        taller.descripcion,
        taller.categoria,
        taller.distrito,
        taller.tipo,
        taller.horario
    ].join(" "));

    if (contenido.includes(q)) {
        return true;
    }

    const tokens = obtenerTokensBusqueda(q);

    if (!tokens.length) {
        return true;
    }

    const coincidencias = tokens.filter(function (token) {
        return contenido.includes(token);
    });

    if (!coincidencias.length) {
        return false;
    }

    if (tokens.length === 1) {
        return true;
    }

    if (coincidencias.length >= Math.min(2, tokens.length)) {
        return true;
    }

    return contenido.includes(tokens[0]);
}

function enfocarCampoBusqueda() {
    const campo = document.getElementById("catalogoBusqueda") || document.getElementById("homeBusqueda");
    campo?.focus();
}

function buscarCoincidenciaEnLista(texto, opciones) {
    const normalizado = normalizarTexto(texto);
    return opciones.find(function (opcion) {
        const valor = normalizarTexto(opcion);
        return normalizado.includes(valor) || valor.includes(normalizado);
    }) || "";
}

function detectarFiltroHorarioPorVoz(texto) {
    const normalizado = normalizarTexto(texto);

    if (normalizado.includes("fin de semana") || normalizado.includes("sabado") || normalizado.includes("domingo")) {
        return "Fin de semana";
    }

    if (normalizado.includes("manana")) {
        return "Manana";
    }

    if (normalizado.includes("tarde")) {
        return "Tarde";
    }

    if (normalizado.includes("noche")) {
        return "Noche";
    }

    return "";
}

function detectarTipoPorVoz(texto) {
    const normalizado = normalizarTexto(texto);

    if (normalizado.includes("virtual") || normalizado.includes("online")) {
        return "Virtual";
    }

    if (normalizado.includes("mixto") || normalizado.includes("hibrido")) {
        return "Mixto";
    }

    if (normalizado.includes("presencial")) {
        return "Presencial";
    }

    return "";
}

function construirUrlBusquedaVoz(texto) {
    const consulta = obtenerConsultaBusqueda(texto);
    const params = new URLSearchParams();
    const categoria = buscarCoincidenciaEnLista(texto, CATEGORIAS_BUSQUEDA);
    const distrito = buscarCoincidenciaEnLista(texto, DISTRITOS_BUSQUEDA);
    const horario = detectarFiltroHorarioPorVoz(texto);
    const tipo = detectarTipoPorVoz(texto);

    if (consulta) {
        params.set("q", consulta);
    }

    if (categoria) {
        params.set("categoria", categoria);
    }

    if (distrito) {
        params.set("distrito", distrito);
    }

    if (horario) {
        params.set("horario", horario);
    }

    if (tipo) {
        params.set("tipo", tipo);
    }

    const query = params.toString();
    return `talleres.html${query ? `?${query}` : ""}#catalogo-filtros`;
}

function ejecutarBusquedaPorVoz(texto) {
    const consulta = obtenerConsultaBusqueda(texto);

    if (!consulta) {
        enfocarCampoBusqueda();
        return false;
    }

    window.location.href = construirUrlBusquedaVoz(consulta);
    return true;
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
    const q = params.get("q");
    const categoria = normalizarTexto(params.get("categoria"));
    const distrito = normalizarTexto(params.get("distrito"));
    const precio = params.get("precio");
    const horario = params.get("horario");
    const tipo = normalizarTexto(params.get("tipo"));

    return talleres.filter(function (taller) {
        const categoriaTaller = normalizarTexto(taller.categoria);
        const distritoTaller = normalizarTexto(taller.distrito);
        const tipoTaller = normalizarTexto(taller.tipo);

        return tallerCoincideConBusquedaLibre(taller, q)
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
    const nombreVisible = obtenerNombreVisibleTaller(taller.nombre);

    return `
        <article class="workshop-card fade-in">
            <div class="workshop-media">
                <img src="${escapeHtml(imagen)}" alt="${escapeHtml(`Imagen del ${nombreVisible}`)}">
            </div>
            <div class="workshop-body">
                <div class="tag-list">
                    <span class="tag">${escapeHtml(taller.categoria)}</span>
                    <span class="${estadoClass}">${escapeHtml(tipo)}</span>
                </div>
                <h3>${escapeHtml(nombreVisible)}</h3>
                <div class="workshop-meta">
                    <div class="meta-row"><span>Distrito</span><span>${escapeHtml(taller.distrito)}</span></div>
                    <div class="meta-row"><span>Horario</span><span>${escapeHtml(taller.horario)}</span></div>
                    <div class="meta-row"><span>Precio</span><span>${escapeHtml(formatearPrecio(taller.precio))}</span></div>
                </div>
                <div class="workshop-card-footer">
                    <span class="mini-note">${escapeHtml(`${taller.vacantes} vacantes`)}</span>
                    <a class="btn btn-detail" href="${escapeHtml(detalleUrl)}" aria-label="${escapeHtml(`Ver detalle del ${nombreVisible}`)}">Ver detalle</a>
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

    if (obtenerSesionActiva()) {
        return;
    }

    window.location.href = construirUrlAccesoUsuario(obtenerRutaActualConBusqueda());
}

function configurarCierreSesion() {
    document.querySelectorAll('[data-nav-item="salir"]').forEach(function (enlace) {
        enlace.addEventListener("click", function (event) {
            event.preventDefault();
            limpiarSesion();
            localStorage.removeItem("tutallerRole");
            window.location.href = "index.html";
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

    // Mensajito al marcar el checkbox de politicas
    const checkTerminos = obtenerCampo("registroTerminos");
    const errorTerminosEl = obtenerCampo("errorRegistroTerminos");
    if (checkTerminos && errorTerminosEl) {
        checkTerminos.addEventListener("change", function () {
            if (this.checked) {
                errorTerminosEl.textContent = "";
                errorTerminosEl.className = "success-msg";
                errorTerminosEl.textContent = "Gracias. Has aceptado los Terminos y la Politica de Privacidad.";
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

function minutosAHoraTexto(totalMinutos) {
    const horas24 = Math.floor(totalMinutos / 60);
    const minutos = totalMinutos % 60;
    const periodo = horas24 >= 12 ? "PM" : "AM";
    const horas12 = horas24 % 12 || 12;

    return `${horas12}:${String(minutos).padStart(2, "0")} ${periodo}`;
}

function llenarSelectHorario(select, inicio = 6 * 60, fin = 23 * 60 + 45) {
    if (!select || select.options.length) {
        return;
    }

    for (let minuto = inicio; minuto <= fin; minuto += 15) {
        const option = document.createElement("option");
        option.value = String(minuto);
        option.textContent = minutosAHoraTexto(minuto);
        select.appendChild(option);
    }
}

function obtenerDiasSeleccionadosTaller() {
    return Array.from(document.querySelectorAll('input[name="tallerDias"]:checked'))
        .map(function (input) {
            return input.value;
        });
}

function unirDiasHorario(dias) {
    if (dias.length <= 1) {
        return dias[0] || "";
    }

    if (dias.length === 2) {
        return `${dias[0]} y ${dias[1]}`;
    }

    return `${dias.slice(0, -1).join(", ")} y ${dias[dias.length - 1]}`;
}

function construirHorarioTaller() {
    const dias = obtenerDiasSeleccionadosTaller();
    const inicio = obtenerCampo("tallerHoraInicio");
    const fin = obtenerCampo("tallerHoraFin");

    if (!dias.length || !inicio?.value || !fin?.value) {
        return "";
    }

    const inicioMinutos = Number(inicio.value);
    const finMinutos = Number(fin.value);

    if (Number.isNaN(inicioMinutos) || Number.isNaN(finMinutos) || finMinutos <= inicioMinutos) {
        return "";
    }

    return `${unirDiasHorario(dias)} ${minutosAHoraTexto(inicioMinutos)} a ${minutosAHoraTexto(finMinutos)}`;
}

function actualizarHorarioTaller() {
    const hidden = obtenerCampo("tallerHorario");
    const preview = obtenerCampo("tallerHorarioPreview");
    const horario = construirHorarioTaller();

    if (hidden) {
        hidden.value = horario;
        hidden.dispatchEvent(new Event("input", { bubbles: true }));
    }

    if (preview) {
        preview.textContent = horario || "Selecciona dias y horario para publicar.";
    }

    return horario;
}

function inicializarSelectorHorarioTaller() {
    const inicio = obtenerCampo("tallerHoraInicio");
    const fin = obtenerCampo("tallerHoraFin");
    const hidden = obtenerCampo("tallerHorario");

    if (!inicio || !fin || !hidden) {
        return;
    }

    llenarSelectHorario(inicio);
    llenarSelectHorario(fin);
    inicio.value = String(18 * 60);
    fin.value = String(19 * 60);

    document.querySelectorAll('input[name="tallerDias"]').forEach(function (input) {
        input.addEventListener("change", actualizarHorarioTaller);
    });

    inicio.addEventListener("change", actualizarHorarioTaller);
    fin.addEventListener("change", actualizarHorarioTaller);
    actualizarHorarioTaller();
}

function configurarCrearTaller() {
    const form = obtenerCampo("crearTallerForm");

    if (!form) {
        return;
    }

    inicializarSelectorHorarioTaller();

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
                const inicio = Number(obtenerCampo("tallerHoraInicio")?.value);
                const fin = Number(obtenerCampo("tallerHoraFin")?.value);

                if (!obtenerDiasSeleccionadosTaller().length) {
                    return "Selecciona al menos un dia del taller.";
                }

                if (!valor.trim()) {
                    return "Selecciona hora de inicio y fin del taller.";
                }

                if (fin <= inicio) {
                    return "La hora de fin debe ser posterior a la hora de inicio.";
                }

                return "";
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
            const campoFoco = primerCampoConError.type === "hidden"
                ? document.querySelector('input[name="tallerDias"]') || obtenerCampo("tallerHoraInicio")
                : primerCampoConError;
            campoFoco?.focus();
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {
            const sesion = obtenerSesionActiva();
            const taller = await apiPost("/talleres", {
                nombre: obtenerCampo("tallerNombre").value.trim(),
                descripcion: obtenerCampo("tallerDescripcion").value.trim(),
                categoria: obtenerCampo("tallerCategoria").value,
                distrito: obtenerCampo("tallerDistrito").value,
                tipo: obtenerCampo("tallerTipo").value.toUpperCase(),
                horario: actualizarHorarioTaller(),
                precio: Number(obtenerCampo("tallerPrecio").value),
                vacantes: Number(obtenerCampo("tallerVacantes").value),
                organizadorId: sesion?.id || null,
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
    const nombreVisible = obtenerNombreVisibleTaller(taller.nombre);

    if (title) {
        title.textContent = nombreVisible;
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
        image.alt = `Imagen de ${nombreVisible}`;
    }

    if (caption) {
        caption.textContent = `${nombreVisible} en ${taller.distrito}, con horario ${taller.horario} y modalidad ${obtenerEtiquetaTipo(taller.tipo)}.`;
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

function obtenerTalleresGestionables(talleres, usuario) {
    if (!usuario?.id) {
        return [];
    }

    const propios = talleres.filter(function (taller) {
        return Number(taller.organizadorId) === Number(usuario.id);
    });

    if (propios.length) {
        return propios;
    }

    // Compatibilidad con data inicial antigua, que aun no tiene organizadorId.
    return talleres.filter(function (taller) {
        return !taller.organizadorId;
    }).slice(0, 8);
}

function obtenerInscripcionesDeTalleres(inscripciones, talleres) {
    const ids = new Set(talleres.map(function (taller) {
        return Number(taller.id);
    }));

    return inscripciones.filter(function (inscripcion) {
        return ids.has(Number(inscripcion.tallerId));
    });
}

function obtenerIniciales(nombre) {
    return (nombre || "TuTaller")
        .toString()
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(function (parte) {
            return parte.charAt(0).toUpperCase();
        })
        .join("") || "TT";
}

function contarPorClave(items, obtenerClave) {
    return items.reduce(function (acc, item) {
        const clave = obtenerClave(item) || "Sin categoria";
        acc[clave] = (acc[clave] || 0) + 1;
        return acc;
    }, {});
}

function ordenarConteos(conteos) {
    return Object.entries(conteos)
        .sort(function (a, b) {
            return b[1] - a[1];
        });
}

function calcularReservasPorTaller(inscripciones) {
    return contarPorClave(inscripciones, function (inscripcion) {
        return Number(inscripcion.tallerId);
    });
}

function calcularCapacidadEstimada(taller, reservas) {
    return Math.max(Number(taller.vacantes || 0) + Number(reservas || 0), Number(reservas || 0), 1);
}

function calcularMetricasOrganizador(talleres, inscripciones) {
    const reservasPorTaller = calcularReservasPorTaller(inscripciones);
    const rendimiento = talleres.map(function (taller) {
        const reservas = Number(reservasPorTaller[Number(taller.id)] || 0);
        const precio = Number(taller.precio || 0);
        const ingresos = reservas * precio;
        const capacidad = calcularCapacidadEstimada(taller, reservas);
        const ocupacion = Math.round((reservas / capacidad) * 100);

        return {
            taller,
            reservas,
            ingresos,
            capacidad,
            ocupacion
        };
    });
    const ingresosTotal = rendimiento.reduce(function (total, item) {
        return total + item.ingresos;
    }, 0);
    const reservasTotal = rendimiento.reduce(function (total, item) {
        return total + item.reservas;
    }, 0);
    const capacidadTotal = rendimiento.reduce(function (total, item) {
        return total + item.capacidad;
    }, 0);
    const ocupacionPromedio = capacidadTotal ? Math.round((reservasTotal / capacidadTotal) * 100) : 0;
    const ticketPromedio = reservasTotal ? ingresosTotal / reservasTotal : 0;
    const categorias = contarPorClave(inscripciones, function (inscripcion) {
        const taller = talleres.find(function (item) {
            return Number(item.id) === Number(inscripcion.tallerId);
        });
        return taller?.categoria;
    });

    return {
        rendimiento,
        ingresosTotal,
        reservasTotal,
        capacidadTotal,
        ocupacionPromedio,
        ticketPromedio,
        categoriasOrdenadas: ordenarConteos(categorias)
    };
}

function crearBarraAnaliticaHtml(label, valor, maximo, detalle) {
    const porcentaje = maximo ? Math.max(6, Math.round((Number(valor || 0) / maximo) * 100)) : 0;

    return `
        <div class="chart-row">
            <div class="chart-row-head">
                <strong>${escapeHtml(label)}</strong>
                <span>${escapeHtml(detalle)}</span>
            </div>
            <div class="chart-track" aria-hidden="true">
                <span style="width: ${porcentaje}%"></span>
            </div>
        </div>
    `;
}

function obtenerCategoriaPreferida(inscripciones, talleresPorId) {
    const categorias = contarPorClave(inscripciones, function (inscripcion) {
        return talleresPorId.get(inscripcion.tallerId)?.categoria;
    });
    const primera = ordenarConteos(categorias)[0];
    return primera ? primera[0] : "Por descubrir";
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
        actualizarNavegacionSesion();

        const avatar = obtenerCampo("perfilAvatar");
        const roleEyebrow = obtenerCampo("perfilRoleEyebrow");
        const welcomeTitle = obtenerCampo("perfilWelcomeTitle");
        const welcomeCopy = obtenerCampo("perfilWelcomeCopy");
        const focusCard = obtenerCampo("perfilFocusCard");
        const statPrincipal = obtenerCampo("perfilStatPrincipal");
        const statPrincipalLabel = obtenerCampo("perfilStatPrincipalLabel");
        const statSecundario = obtenerCampo("perfilStatSecundario");
        const statSecundarioLabel = obtenerCampo("perfilStatSecundarioLabel");
        const statPreferencia = obtenerCampo("perfilStatPreferencia");
        const statPreferenciaLabel = obtenerCampo("perfilStatPreferenciaLabel");
        const accionesList = obtenerCampo("perfilNextActionsList");
        const accionesButtons = obtenerCampo("perfilActionButtons");

        if (avatar) {
            avatar.textContent = obtenerIniciales(usuario.nombres);
        }

        datosList.innerHTML = `
            <li><strong>Nombre</strong><span>${escapeHtml(usuario.nombres)}</span></li>
            <li><strong>Correo</strong><span>${escapeHtml(usuario.correo)}</span></li>
            <li><strong>Telefono</strong><span>${escapeHtml(usuario.telefono)}</span></li>
            <li><strong>Tipo de cuenta</strong><span>${escapeHtml(formatearRol(usuario.rol))}</span></li>
        `;

        const talleresPorId = new Map(talleres.map(function (taller) {
            return [taller.id, taller];
        }));

        if (usuario.rol === "ADMINISTRADOR") {
            const talleresGestionables = obtenerTalleresGestionables(talleres, usuario);
            const inscripcionesGestionadas = obtenerInscripcionesDeTalleres(inscripciones, talleresGestionables);
            const metricas = calcularMetricasOrganizador(talleresGestionables, inscripcionesGestionadas);
            const titulo = document.querySelector("#talleres-inscritos .section-title");
            const caption = document.querySelector("#talleres-inscritos caption");
            const seguimientoTitle = document.querySelector("#siguientes-pasos .section-title");
            const accionesTitle = document.querySelector("#siguientes-pasos .panel:last-child .section-title");

            if (roleEyebrow) {
                roleEyebrow.textContent = "Cuenta de organizador";
            }

            if (welcomeTitle) {
                welcomeTitle.textContent = `Hola, ${obtenerPrimerNombreUsuario(usuario)}`;
            }

            if (welcomeCopy) {
                welcomeCopy.textContent = "Este es tu espacio para seguir talleres publicados, reservas e ingresos estimados.";
            }

            if (focusCard) {
                focusCard.innerHTML = `
                    <span>Prioridad de gestion</span>
                    <strong>${metricas.reservasTotal ? "Revisa tus reservas recientes" : "Publica tu primera experiencia"}</strong>
                    <p>${metricas.reservasTotal ? "Tus participantes ya estan interactuando con tu oferta." : "Empieza creando un taller con horario y cupos claros."}</p>
                `;
            }

            if (statPrincipal) {
                statPrincipal.textContent = String(talleresGestionables.length);
            }

            if (statPrincipalLabel) {
                statPrincipalLabel.textContent = "talleres publicados";
            }

            if (statSecundario) {
                statSecundario.textContent = formatearPrecio(metricas.ingresosTotal);
            }

            if (statSecundarioLabel) {
                statSecundarioLabel.textContent = "ingresos estimados";
            }

            if (statPreferencia) {
                statPreferencia.textContent = `${metricas.ocupacionPromedio}%`;
            }

            if (statPreferenciaLabel) {
                statPreferenciaLabel.textContent = "ocupacion promedio";
            }

            if (titulo) {
                titulo.textContent = "Talleres publicados";
            }

            if (caption) {
                caption.textContent = "Seguimiento de talleres publicados por el organizador.";
            }

            if (seguimientoTitle) {
                seguimientoTitle.textContent = "Acciones de organizador";
            }

            if (accionesTitle) {
                accionesTitle.textContent = "Gestion de tu oferta";
            }

            if (accionesList) {
                accionesList.innerHTML = `
                    <li>Revisar inscritos y cupos disponibles en tus talleres publicados.</li>
                    <li>Crear nuevas experiencias con horario, precio y vacantes actualizadas.</li>
                    <li>Actualizar la informacion de tus talleres para mantener tu oferta clara.</li>
                `;
            }

            if (accionesButtons) {
                accionesButtons.innerHTML = `
                    <a class="btn" href="crear-taller.html">Crear nuevo taller</a>
                    <a class="btn-secondary" href="admin.html">Ver panel</a>
                `;
            }

            if (!talleresGestionables.length) {
                tbody.innerHTML = `<tr><td colspan="4">Aun no tienes talleres publicados.</td></tr>`;
                return;
            }

            tbody.innerHTML = talleresGestionables.map(function (taller) {
                const reservas = inscripcionesGestionadas.filter(function (inscripcion) {
                    return Number(inscripcion.tallerId) === Number(taller.id);
                }).length;

                return `
                    <tr>
                        <td>${escapeHtml(obtenerNombreVisibleTaller(taller.nombre))}</td>
                        <td>${escapeHtml(obtenerEtiquetaTipo(taller.tipo))}</td>
                        <td>${escapeHtml(taller.horario || "Por confirmar")}</td>
                        <td><span class="status-pill">${escapeHtml(`${reservas} inscritos`)}</span></td>
                    </tr>
                `;
            }).join("");
            return;
        }

        const propias = inscripciones.filter(function (inscripcion) {
            return inscripcion.usuarioId === usuario.id;
        });
        const categoriaPreferida = obtenerCategoriaPreferida(propias, talleresPorId);
        const siguiente = propias[0];
        const tallerSiguiente = siguiente ? talleresPorId.get(siguiente.tallerId) : null;

        if (roleEyebrow) {
            roleEyebrow.textContent = "Cuenta de participante";
        }

        if (welcomeTitle) {
            welcomeTitle.textContent = `Hola, ${obtenerPrimerNombreUsuario(usuario)}`;
        }

        if (welcomeCopy) {
            welcomeCopy.textContent = propias.length
                ? "Aqui tienes tus reservas activas y recomendaciones para seguir explorando."
                : "Aun no tienes reservas. Puedes comenzar buscando talleres por categoria, distrito u horario.";
        }

        if (focusCard) {
            focusCard.innerHTML = `
                <span>Proximo paso</span>
                <strong>${propias.length ? "Revisa tu taller inscrito" : "Encuentra tu primer taller"}</strong>
                <p>${propias.length ? "Confirma horario, modalidad y estado antes de asistir." : "Usa filtros o busqueda por voz para encontrar opciones segun tus intereses."}</p>
            `;
        }

        if (statPrincipal) {
            statPrincipal.textContent = String(propias.length);
        }

        if (statPrincipalLabel) {
            statPrincipalLabel.textContent = "inscripciones";
        }

        if (statSecundario) {
            statSecundario.textContent = tallerSiguiente ? formatearEstadoTexto(siguiente.estado) : "Buscar";
        }

        if (statSecundarioLabel) {
            statSecundarioLabel.textContent = tallerSiguiente ? obtenerNombreVisibleTaller(tallerSiguiente.nombre) : "nuevo taller";
        }

        if (statPreferencia) {
            statPreferencia.textContent = categoriaPreferida;
        }

        if (statPreferenciaLabel) {
            statPreferenciaLabel.textContent = "categoria mas frecuente";
        }

        if (accionesList) {
            accionesList.innerHTML = `
                <li>${propias.length ? "Revisa el horario y modalidad de tus talleres inscritos." : "Explora talleres destacados para iniciar tu primera reserva."}</li>
                <li>Usa filtros por distrito, precio y horario para comparar opciones rapidamente.</li>
                <li>Activa lectura o busqueda por voz si prefieres navegar con asistencia.</li>
            `;
        }

        if (accionesButtons) {
            accionesButtons.innerHTML = `
                <a class="btn" href="talleres.html#catalogo-filtros">Buscar talleres</a>
                <a class="btn-secondary" href="${propias.length ? construirUrlDetalleTaller(propias[0].tallerId) : "index.html"}">${propias.length ? "Ver ultimo taller" : "Volver al inicio"}</a>
            `;
        }

        if (!propias.length) {
            tbody.innerHTML = `<tr><td colspan="4">Aun no tienes inscripciones registradas.</td></tr>`;
            return;
        }

        tbody.innerHTML = propias.map(function (inscripcion) {
            const taller = talleresPorId.get(inscripcion.tallerId);
            return `
                <tr>
                    <td>${escapeHtml(obtenerNombreVisibleTaller(inscripcion.tallerNombre))}</td>
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
    const metricIngresos = obtenerCampo("adminMetricIngresos");
    const metricOcupacion = obtenerCampo("adminMetricOcupacion");
    const metricTicket = obtenerCampo("adminMetricTicket");
    const revenueBars = obtenerCampo("adminRevenueBars");
    const categoryBars = obtenerCampo("adminCategoryBars");
    const insightsList = obtenerCampo("adminInsightsList");
    const quickStatus = obtenerCampo("adminQuickStatus");
    const quickStatusCopy = obtenerCampo("adminQuickStatusCopy");
    const talleresBody = obtenerCampo("adminTalleresBody");
    const usuariosBody = obtenerCampo("adminUsuariosBody");

    if (!metricTalleres || !talleresBody || !usuariosBody) {
        return;
    }

    const sesion = obtenerSesionActiva();

    try {
        const [talleres, usuarios, inscripciones] = await Promise.all([
            apiGet("/talleres"),
            apiGet("/usuarios"),
            apiGet("/inscripciones")
        ]);
        const talleresGestionables = obtenerTalleresGestionables(talleres, sesion);
        const inscripcionesGestionadas = obtenerInscripcionesDeTalleres(inscripciones, talleresGestionables);
        const usuariosPorId = new Map(usuarios.map(function (usuario) {
            return [Number(usuario.id), usuario];
        }));
        const participantesIds = new Set(inscripcionesGestionadas.map(function (inscripcion) {
            return Number(inscripcion.usuarioId);
        }));
        const metricas = calcularMetricasOrganizador(talleresGestionables, inscripcionesGestionadas);
        const alertas = metricas.rendimiento.filter(function (item) {
            return Number(item.taller.vacantes || 0) <= 3 || item.ocupacion >= 85;
        }).length;
        const topCategoria = metricas.categoriasOrdenadas[0]?.[0] || "Sin datos";

        metricTalleres.textContent = String(talleresGestionables.filter(function (taller) {
            return taller.estado === "ACTIVO";
        }).length);
        metricUsuarios.textContent = String(participantesIds.size);
        metricReservas.textContent = String(metricas.reservasTotal);
        metricAlertas.textContent = String(alertas);

        if (metricIngresos) {
            metricIngresos.textContent = formatearPrecio(metricas.ingresosTotal);
        }

        if (metricOcupacion) {
            metricOcupacion.textContent = `${metricas.ocupacionPromedio}%`;
        }

        if (metricTicket) {
            metricTicket.textContent = `Ticket ${formatearPrecio(metricas.ticketPromedio)}`;
        }

        if (quickStatus) {
            quickStatus.textContent = metricas.reservasTotal
                ? `${metricas.reservasTotal} reservas en seguimiento`
                : "Sin reservas todavia";
        }

        if (quickStatusCopy) {
            quickStatusCopy.textContent = metricas.reservasTotal
                ? `Categoria con mas movimiento: ${topCategoria}. Prioriza talleres con alta ocupacion.`
                : "Publica o actualiza talleres para empezar a recibir inscripciones.";
        }

        if (revenueBars) {
            const topIngresos = metricas.rendimiento
                .slice()
                .sort(function (a, b) {
                    return b.ingresos - a.ingresos;
                })
                .slice(0, 5);
            const maxIngreso = Math.max(...topIngresos.map(function (item) {
                return item.ingresos;
            }), 0);

            revenueBars.innerHTML = topIngresos.length && maxIngreso
                ? topIngresos.map(function (item) {
                    return crearBarraAnaliticaHtml(
                        obtenerNombreVisibleTaller(item.taller.nombre),
                        item.ingresos,
                        maxIngreso,
                        formatearPrecio(item.ingresos)
                    );
                }).join("")
                : `<p class="panel-text">Aun no hay ingresos estimados porque no existen reservas asociadas.</p>`;
        }

        if (categoryBars) {
            const maxCategoria = Math.max(...metricas.categoriasOrdenadas.map(function (item) {
                return item[1];
            }), 0);

            categoryBars.innerHTML = metricas.categoriasOrdenadas.length
                ? metricas.categoriasOrdenadas.slice(0, 5).map(function ([categoria, total]) {
                    return crearBarraAnaliticaHtml(categoria, total, maxCategoria, `${total} reservas`);
                }).join("")
                : `<p class="panel-text">Cuando lleguen reservas, aqui veras las categorias con mas demanda.</p>`;
        }

        if (insightsList) {
            insightsList.innerHTML = `
                <li>${topCategoria !== "Sin datos" ? `${topCategoria} concentra la mayor demanda actual.` : "Aun falta movimiento para detectar una categoria fuerte."}</li>
                <li>${alertas ? `${alertas} taller(es) requieren revisar cupos o disponibilidad.` : "No hay alertas criticas de vacantes por ahora."}</li>
                <li>Ingresos estimados: ${formatearPrecio(metricas.ingresosTotal)} con ticket promedio de ${formatearPrecio(metricas.ticketPromedio)}.</li>
            `;
        }

        talleresBody.innerHTML = talleresGestionables.length ? talleresGestionables.slice(0, 6).map(function (taller) {
            const item = metricas.rendimiento.find(function (rendimiento) {
                return Number(rendimiento.taller.id) === Number(taller.id);
            }) || { reservas: 0, ingresos: 0, capacidad: calcularCapacidadEstimada(taller, 0) };

            return `
                <tr>
                    <td>${escapeHtml(obtenerNombreVisibleTaller(taller.nombre))}</td>
                    <td>${escapeHtml(taller.categoria)}</td>
                    <td><span class="status-pill">${escapeHtml(`${item.reservas}/${item.capacidad} cupos`)}</span></td>
                    <td>${escapeHtml(formatearPrecio(item.ingresos))}</td>
                </tr>
            `;
        }).join("") : `<tr><td colspan="4">Aun no hay talleres publicados.</td></tr>`;

        usuariosBody.innerHTML = inscripcionesGestionadas.length ? inscripcionesGestionadas.slice(0, 6).map(function (inscripcion) {
            const usuario = usuariosPorId.get(Number(inscripcion.usuarioId));
            const taller = talleresGestionables.find(function (item) {
                return Number(item.id) === Number(inscripcion.tallerId);
            });

            return `
                <tr>
                    <td>${escapeHtml(usuario?.nombres || inscripcion.usuarioNombre)}</td>
                    <td>${escapeHtml(usuario?.correo || "No disponible")}</td>
                    <td>${escapeHtml(obtenerNombreVisibleTaller(taller?.nombre || inscripcion.tallerNombre))}</td>
                    <td><span class="status-pill">${escapeHtml(formatearEstadoTexto(inscripcion.estado))}</span></td>
                </tr>
            `;
        }).join("") : `<tr><td colspan="4">Aun no hay inscritos en tus talleres.</td></tr>`;
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

    const nombreVisible = obtenerNombreVisibleTaller(data.taller?.nombre || data.tallerNombre);

    copy.textContent = `Hemos confirmado tu reserva para ${nombreVisible}. Ahora puedes revisar el estado de tu inscripcion y seguir explorando nuevas opciones.`;
    resumen.innerHTML = `
        <li><strong>Taller</strong><span>${escapeHtml(nombreVisible)}</span></li>
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

    const nombreVisible = obtenerNombreVisibleTaller(data.nombre);

    copy.textContent = `Tu nueva propuesta ${nombreVisible} ya forma parte del catalogo y esta lista para ser revisada desde tu portal de organizador.`;
    resumen.innerHTML = `
        <li><strong>Taller</strong><span>${escapeHtml(nombreVisible)}</span></li>
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

function ejecutarInicializadorSeguro(nombre, callback) {
    try {
        callback();
    } catch (error) {
        console.error(`Error al inicializar ${nombre}:`, error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    ejecutarInicializadorSeguro("widget de accesibilidad", asegurarWidgetAccesibilidad);
    ejecutarInicializadorSeguro("sincronizacion de sesion", sincronizarSesionConRol);
    ejecutarInicializadorSeguro("navegacion de sesion", actualizarNavegacionSesion);
    ejecutarInicializadorSeguro("tema", configurarTema);
    ejecutarInicializadorSeguro("barra de accesibilidad", inicializarAccesibilidad);
    ejecutarInicializadorSeguro("lector de pagina", inicializarLector);
    ejecutarInicializadorSeguro("control por voz", inicializarVoz);
    ejecutarInicializadorSeguro("proteccion organizador", protegerRutasOrganizador);
    ejecutarInicializadorSeguro("proteccion usuario", protegerRutasUsuario);
    ejecutarInicializadorSeguro("proteccion perfil", protegerRutaPerfil);
    ejecutarInicializadorSeguro("menu", activarMenu);
    ejecutarInicializadorSeguro("pagina activa", activarPaginaActual);
    ejecutarInicializadorSeguro("accesos organizador", reescribirAccesosOrganizador);
    ejecutarInicializadorSeguro("accesos usuario", reescribirAccesosUsuario);
    ejecutarInicializadorSeguro("cierre de sesion", configurarCierreSesion);
    ejecutarInicializadorSeguro("vista login", configurarVistaLogin);
    ejecutarInicializadorSeguro("vista registro", configurarVistaRegistro);
    ejecutarInicializadorSeguro("login", configurarLogin);
    ejecutarInicializadorSeguro("registro", configurarRegistro);
    ejecutarInicializadorSeguro("crear taller", configurarCrearTaller);
    ejecutarInicializadorSeguro("datos de pagina", inicializarDatosDePagina);
    ejecutarInicializadorSeguro("modales", inicializarModales);
});

/* â”€â”€ Modales legales â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function inicializarModales() {
    let ultimoDisparadorModal = null;

    function abrirModal(id, trigger = null) {
        const overlay = document.getElementById(id);
        if (!overlay) return;
        ultimoDisparadorModal = trigger;
        overlay.removeAttribute("hidden");
        overlay.querySelector(".modal-box")?.focus?.();
        document.body.style.overflow = "hidden";
    }

    function cerrarModal(id) {
        const overlay = document.getElementById(id);
        if (!overlay) return;
        overlay.setAttribute("hidden", "");
        document.body.style.overflow = "";
        if (ultimoDisparadorModal) {
            ultimoDisparadorModal.focus();
            ultimoDisparadorModal = null;
        }
    }

    document.getElementById("btnTerminos")?.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        abrirModal("modalTerminos", e.currentTarget);
    });
    document.getElementById("btnPrivacidad")?.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        abrirModal("modalPrivacidad", e.currentTarget);
    });

    document.querySelectorAll("[data-modal-close]").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            cerrarModal(btn.dataset.modalClose);
        });
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

/* â”€â”€ Barra de accesibilidad â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function inicializarAccesibilidad() {
    const toggle = document.getElementById("accToggle");
    const panel  = document.getElementById("accPanel");
    const closeButton = document.getElementById("accPanelClose");
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
        const actual = JSON.parse(localStorage.getItem("tutallerAcc") || "{}");
        localStorage.setItem("tutallerAcc", JSON.stringify({
            ...actual,
            sizeIndex,
            contrast: document.body.dataset.accContrast === "1",
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

    function abrirPanel() {
        panel.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Cerrar opciones de accesibilidad");
    }

    function cerrarPanel(devolverFoco = false) {
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir opciones de accesibilidad");

        if (devolverFoco) {
            toggle.focus();
        }
    }

    toggle.addEventListener("click", function() {
        if (panel.hidden) {
            abrirPanel();
            return;
        }

        cerrarPanel();
    });

    closeButton?.addEventListener("click", function () {
        cerrarPanel(true);
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
            cerrarPanel(true);
        }
    });

    document.addEventListener("click", function (evento) {
        if (panel.hidden) {
            return;
        }

        if (panel.contains(evento.target) || toggle.contains(evento.target)) {
            return;
        }

        cerrarPanel();
    });

    // Boton restablecer todo
    document.getElementById("accResetAll")?.addEventListener("click", function() {
        sizeIndex = 1; aplicarFuente(1);
        activarContraste(false);
        activarDislexia(false);
        aplicarFiltroColor("none");
        localStorage.removeItem("tutallerAcc");
    });

    // Recuperar modo daltonico guardado
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

/* â”€â”€ Lector de pantalla (Web Speech API) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function inicializarLector() {
    const btnLeer  = document.getElementById("accLector");
    const btnStop  = document.getElementById("accLectorStop");
    if (!btnLeer || !window.speechSynthesis) return;
    if (btnLeer.dataset.accBound === "true") return;

    btnLeer.dataset.accBound = "true";
    if (btnStop) {
        btnStop.dataset.accBound = "true";
    }

    const synth = window.speechSynthesis;
    const leerTitle = btnLeer.querySelector("strong");
    const leerCopy = btnLeer.querySelector("small");
    const stopTitle = btnStop?.querySelector("strong");
    const stopCopy = btnStop?.querySelector("small");
    let feedbackTimeout = null;

    function limpiarFeedbackLectura() {
        if (feedbackTimeout) {
            clearTimeout(feedbackTimeout);
            feedbackTimeout = null;
        }

        btnLeer.classList.remove("is-confirmed");
        btnStop?.classList.remove("is-confirmed");
    }

    function actualizarEstadoLectura(leyendo, mostrarConfirmacion = false) {
        limpiarFeedbackLectura();

        btnLeer.hidden = false;
        btnLeer.setAttribute("aria-pressed", String(leyendo));
        btnLeer.classList.toggle("is-reading", leyendo);

        if (leerTitle) {
            leerTitle.textContent = leyendo ? "Leyendo pagina" : "Leer pagina";
        }

        if (leerCopy) {
            leerCopy.textContent = leyendo
                ? "Reproduccion activa"
                : (mostrarConfirmacion ? "Lectura detenida correctamente" : "Escucha el contenido");
        }

        if (btnStop) {
            btnStop.hidden = false;
            btnStop.disabled = !leyendo;
            btnStop.setAttribute("aria-disabled", String(!leyendo));
            btnStop.classList.toggle("is-ready", leyendo);
        }

        if (stopTitle) {
            stopTitle.textContent = "Detener lectura";
        }

        if (stopCopy) {
            stopCopy.textContent = leyendo
                ? "Pulsa para pausar ahora"
                : (mostrarConfirmacion ? "Accion confirmada" : "Pausar el lector");
        }

        if (mostrarConfirmacion) {
            btnLeer.classList.add("is-confirmed");
            btnStop?.classList.add("is-confirmed");

            feedbackTimeout = setTimeout(function () {
                btnLeer.classList.remove("is-confirmed");
                btnStop?.classList.remove("is-confirmed");

                if (leerCopy) {
                    leerCopy.textContent = "Escucha el contenido";
                }

                if (stopCopy) {
                    stopCopy.textContent = "Pausar el lector";
                }
            }, 1200);
        }
    }

    function obtenerTextoLegible() {
        const main = document.getElementById("contenido-principal") || document.body;
        const clone = main.cloneNode(true);
        // Quitar elementos que no se deben leer
        clone.querySelectorAll("script,style,svg,.acc-bar,.acc-widget,nav,footer,[aria-hidden='true']").forEach(el => el.remove());
        return clone.innerText || clone.textContent || "";
    }

    function leerPagina() {
        if (btnLeer.getAttribute("aria-pressed") === "true") {
            return;
        }

        synth.cancel();
        const texto = obtenerTextoLegible();
        const chunks = texto.match(/[^.!?\n]{1,200}[.!?\n]?/g) || [texto];

        let i = 0;
        function leerChunk() {
            if (i >= chunks.length) { detenerLectura(false); return; }
            const utt = new SpeechSynthesisUtterance(chunks[i++]);
            utt.lang = "es-PE";
            utt.rate = 0.95;
            utt.pitch = 1;
            // Elegir voz en espanol si esta disponible
            const voces = synth.getVoices();
            const vozEs = voces.find(v => v.lang.startsWith("es")) || null;
            if (vozEs) utt.voice = vozEs;
            utt.onend = leerChunk;
            synth.speak(utt);
        }

        leerChunk();
        actualizarEstadoLectura(true);
    }

    function detenerLectura(mostrarConfirmacion = true) {
        synth.cancel();
        actualizarEstadoLectura(false, mostrarConfirmacion);
    }

    btnLeer.addEventListener("click", leerPagina);
    btnStop?.addEventListener("click", function () {
        detenerLectura(true);
    });

    actualizarEstadoLectura(false, false);

    // Detener si el usuario navega fuera
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) synth.pause();
        else synth.resume();
    });
}

/* â”€â”€ Control por voz (Web Speech Recognition) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function inicializarVoz() {
    const btnVoz    = document.getElementById("accVoz");
    const labelVoz  = document.getElementById("accVozLabel");
    const statusDiv = document.getElementById("accVozStatus");
    const textoDiv  = document.getElementById("accVozTexto");
    const vozCopy   = btnVoz?.querySelector("small");
    if (!btnVoz) return;
    if (btnVoz.dataset.accBound === "true") return;

    btnVoz.dataset.accBound = "true";

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
        "mi cuenta":       () => { window.location.href = obtenerSesionActiva() ? "perfil.html" : construirUrlAccesoUsuario("perfil.html"); },
        "abrir mi cuenta": () => { window.location.href = obtenerSesionActiva() ? "perfil.html" : construirUrlAccesoUsuario("perfil.html"); },
        "perfil":          () => { window.location.href = obtenerSesionActiva() ? "perfil.html" : construirUrlAccesoUsuario("perfil.html"); },
        "mi panel":        () => { window.location.href = usuarioEsOrganizador() ? "admin.html" : construirUrlAccesoOrganizador("admin.html"); },
        "publicar taller": () => { window.location.href = usuarioEsOrganizador() ? "crear-taller.html" : construirUrlAccesoOrganizador("crear-taller.html"); },
        "crear taller":    () => { window.location.href = usuarioEsOrganizador() ? "crear-taller.html" : construirUrlAccesoOrganizador("crear-taller.html"); },
        "inscribirme":     () => { window.location.href = "talleres.html#catalogo-filtros"; },
        "subir":           () => { window.scrollTo({ top: 0, behavior: "smooth" }); },
        "bajar":           () => { window.scrollBy({ top: 400, behavior: "smooth" }); },
        "buscar":          () => { enfocarCampoBusqueda(); },
    };

    let activo = false;

    function activar() {
        activo = true;
        btnVoz.setAttribute("aria-pressed", "true");
        btnVoz.classList.add("is-listening");
        labelVoz.textContent = "Voz activa";
        if (vozCopy) {
            vozCopy.textContent = "Microfono activo";
        }
        statusDiv.removeAttribute("hidden");
        textoDiv.textContent = "Escuchando...";
        rec.start();
    }

    function desactivar() {
        activo = false;
        rec.stop();
        btnVoz.setAttribute("aria-pressed", "false");
        btnVoz.classList.remove("is-listening");
        labelVoz.textContent = "Control por voz";
        if (vozCopy) {
            vozCopy.textContent = "Di un comando";
        }
        statusDiv.setAttribute("hidden", "");
    }

    btnVoz.addEventListener("click", function () {
        if (activo) {
            desactivar();
            return;
        }

        activar();
    });

    rec.onresult = function(e) {
        const dicho = normalizarTexto(e.results[0][0].transcript);
        textoDiv.textContent = `"${dicho}"`;

        const accion = COMANDOS[dicho];
        if (accion) {
            setTimeout(accion, 400);
            return;
        }

        if (ejecutarBusquedaPorVoz(dicho)) {
            textoDiv.textContent = `Buscando: "${obtenerConsultaBusqueda(dicho)}"`;
            return;
        }

        textoDiv.textContent = `No reconocido: "${dicho}"`;
        setTimeout(function () {
            if (activo) {
                textoDiv.textContent = "Escuchando...";
                rec.start();
            }
        }, 2000);
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
}
