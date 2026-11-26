const Nodo = require("../src/estructuras/Nodo");

const n1 = new Nodo({
    fecha: "02/02",
    motivo: "Vacunación anual",
    veterinario: "Dra. Ríos",
    costo: 85000
});

const n2 = new Nodo({
    fecha: "15/03",
    motivo: "Control de peso",
    veterinario: "Dr. Gómez",
    costo: 40000
});

const n3 = new Nodo({
    fecha: "20/05",
    motivo: "Limpieza dental",
    veterinario: "Dra. Ríos",
    costo: 150000
});

// Enlace manual en orden cronológico
n1.siguiente = n2;
n2.siguiente = n3;

const cabeza = n1;

function formatoPesos(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

console.log("=== HISTORIAL DE LOLA (ENLACE MANUAL) ===");
let actual = cabeza;
while (actual !== null) {
    const { fecha, motivo, veterinario, costo } = actual.dato;
    console.log(`${fecha} | ${motivo} | ${veterinario} | ${formatoPesos(costo)}`);
    actual = actual.siguiente;
}

let costoTotal = 0;
actual = cabeza;
while (actual !== null) {
    costoTotal += actual.dato.costo;
    actual = actual.siguiente;
}

console.log("Costo total:", formatoPesos(costoTotal));