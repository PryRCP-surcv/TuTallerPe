// ===============================
// Validaciones TuTaller.pe
// Prototipo IHM - Prevención de errores
// ===============================

function validarPassword(password) {
    const tieneMinimo = password.length >= 8;
    const tieneNumero = /\d/.test(password);
    const tieneMayuscula = /[A-Z]/.test(password);

    return tieneMinimo && tieneNumero && tieneMayuscula;
}

function validarCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarTelefono(telefono) {
    return /^[0-9]{9}$/.test(telefono);
}

function mostrarError(id, mensaje) {
    const error = document.getElementById(id);

    if (error) {
        error.textContent = mensaje;
        error.style.display = "block";
    }
}

function limpiarError(id) {
    const error = document.getElementById(id);

    if (error) {
        error.textContent = "";
        error.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {

    // LOGIN

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let valido = true;

            const correo = document.getElementById("loginCorreo").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            limpiarError("errorLoginCorreo");
            limpiarError("errorLoginPassword");

            if (correo === "") {
                mostrarError("errorLoginCorreo", "El correo electrónico es obligatorio.");
                valido = false;
            } else if (!validarCorreo(correo)) {
                mostrarError("errorLoginCorreo", "Ingrese un correo válido. Ejemplo: usuario@correo.com");
                valido = false;
            }

            if (password === "") {
                mostrarError("errorLoginPassword", "La contraseña es obligatoria.");
                valido = false;
            } else if (!validarPassword(password)) {
                mostrarError(
                    "errorLoginPassword",
                    "La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número."
                );
                valido = false;
            }

            if (valido) {
                const params = new URLSearchParams(window.location.search);
                const redirect = params.get("redirect");

                if (redirect) {
                    window.location.href = redirect;
                } else {
                    window.location.href = "index.html";
                }
            }
        });
    }


    // REGISTRO

    const registroForm = document.getElementById("registroForm");

    if (registroForm) {
        registroForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let valido = true;

            const nombre = document.getElementById("registroNombre").value.trim();
            const correo = document.getElementById("registroCorreo").value.trim();
            const telefono = document.getElementById("registroTelefono").value.trim();
            const interes = document.getElementById("registroInteres").value;
            const password = document.getElementById("registroPassword").value.trim();
            const confirmar = document.getElementById("registroConfirmar").value.trim();

            limpiarError("errorRegistroNombre");
            limpiarError("errorRegistroCorreo");
            limpiarError("errorRegistroTelefono");
            limpiarError("errorRegistroInteres");
            limpiarError("errorRegistroPassword");
            limpiarError("errorRegistroConfirmar");

            if (nombre === "") {
                mostrarError("errorRegistroNombre", "El nombre completo es obligatorio.");
                valido = false;
            }

            if (correo === "") {
                mostrarError("errorRegistroCorreo", "El correo electrónico es obligatorio.");
                valido = false;
            } else if (!validarCorreo(correo)) {
                mostrarError("errorRegistroCorreo", "Ingrese un correo válido. Ejemplo: usuario@correo.com");
                valido = false;
            }

            if (telefono === "") {
                mostrarError("errorRegistroTelefono", "El teléfono es obligatorio.");
                valido = false;
            } else if (!validarTelefono(telefono)) {
                mostrarError("errorRegistroTelefono", "El teléfono debe tener exactamente 9 dígitos.");
                valido = false;
            }

            if (interes === "") {
                mostrarError("errorRegistroInteres", "Seleccione una categoría de interés.");
                valido = false;
            }

            if (password === "") {
                mostrarError("errorRegistroPassword", "La contraseña es obligatoria.");
                valido = false;
            } else if (!validarPassword(password)) {
                mostrarError(
                    "errorRegistroPassword",
                    "La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número."
                );
                valido = false;
            }

            if (confirmar === "") {
                mostrarError("errorRegistroConfirmar", "Debe confirmar la contraseña.");
                valido = false;
            } else if (password !== confirmar) {
                mostrarError("errorRegistroConfirmar", "Las contraseñas no coinciden.");
                valido = false;
            }

            if (valido) {
                window.location.href = "login.html";
            }
        });
    }

});