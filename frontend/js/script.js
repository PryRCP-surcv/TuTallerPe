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

        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect");

        window.location.href = redirect || "index.html";
    });
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

        window.location.href = "login.html";
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
    activarMenu();
    activarPaginaActual();
    configurarLogin();
    configurarRegistro();
    configurarCrearTaller();
});
