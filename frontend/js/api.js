const API_BASE_URL = window.location.port === "8080"
    ? `${window.location.origin}/api`
    : "http://localhost:8080/api";
const SESSION_STORAGE_KEY = "tutallerSession";
const SELECTED_TALLER_KEY = "tutallerSelectedTaller";
const LAST_INSCRIPCION_KEY = "tutallerLastInscripcion";
const LAST_PUBLISHED_TALLER_KEY = "tutallerLastPublishedTaller";

async function requestApi(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
        const validationErrors = payload?.errors ? Object.values(payload.errors) : [];
        throw new Error(validationErrors[0] || payload?.message || payload?.error || "No se pudo completar la solicitud.");
    }

    return payload;
}

async function apiGet(endpoint) {
    return requestApi(endpoint, { method: "GET" });
}

async function apiPost(endpoint, data) {
    return requestApi(endpoint, {
        method: "POST",
        body: JSON.stringify(data)
    });
}

async function apiPut(endpoint, data) {
    return requestApi(endpoint, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

async function apiDelete(endpoint) {
    await requestApi(endpoint, { method: "DELETE" });
}

function guardarSesion(usuario) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(usuario));
}

function obtenerSesion() {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        return null;
    }
}

function limpiarSesion() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
}

function guardarTallerSeleccionado(taller) {
    localStorage.setItem(SELECTED_TALLER_KEY, JSON.stringify(taller));
}

function obtenerTallerSeleccionado() {
    const raw = localStorage.getItem(SELECTED_TALLER_KEY);

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        localStorage.removeItem(SELECTED_TALLER_KEY);
        return null;
    }
}

function guardarUltimaInscripcion(inscripcion) {
    localStorage.setItem(LAST_INSCRIPCION_KEY, JSON.stringify(inscripcion));
}

function obtenerUltimaInscripcion() {
    const raw = localStorage.getItem(LAST_INSCRIPCION_KEY);

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        localStorage.removeItem(LAST_INSCRIPCION_KEY);
        return null;
    }
}

function guardarUltimoTallerPublicado(taller) {
    localStorage.setItem(LAST_PUBLISHED_TALLER_KEY, JSON.stringify(taller));
}

function obtenerUltimoTallerPublicado() {
    const raw = localStorage.getItem(LAST_PUBLISHED_TALLER_KEY);

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        localStorage.removeItem(LAST_PUBLISHED_TALLER_KEY);
        return null;
    }
}

