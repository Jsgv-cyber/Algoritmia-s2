
const Editor = require("../src/dominio/Editor");

const editor = new Editor();

const A = {
    fecha: "25/11/2026",
    motivo: "Vacunación",
    veterinario: "Dra. Ríos"
};

const B = {
    fecha: "25/11/2026",
    motivo: "Control médico",
    veterinario: "Dr. Gómez"
};

const C = {
    fecha: "25/11/2026",
    motivo: "Desparasitación",
    veterinario: "Dra. Ríos"
};

// Mostrar historial
function mostrarHistorial(mascota) {
    const historial = editor.obtenerHistorial(mascota);

    if (historial === null) {
        console.log("Historial vacío");
        return;
    }

    console.log(
        historial.aArreglo().map(atencion => atencion.motivo)
    );
}

// Mostrar acciones de una pila
function mostrarPila(pila) {
    const acciones = [];

    let actual = pila.tope;

    while (actual !== null) {
        acciones.push(actual.dato.tipo + " " + actual.dato.atencion.motivo);
        actual = actual.siguiente;
    }

    return acciones;
}

// Mostrar estado completo
function mostrarEstado(paso) {
    console.log("\n===== " + paso + " =====");

    console.log("Historial de Lola:");
    mostrarHistorial("Lola");

    console.log("Pila deshacer:", mostrarPila(editor.pilaDeshacer));
    console.log("Pila rehacer:", mostrarPila(editor.pilaRehacer));
}

// Secuencia exigida por el MiniReto 7

editor.agregar("Lola", A);
mostrarEstado("1. Agregar A");

editor.agregar("Lola", B);
mostrarEstado("2. Agregar B");

editor.eliminar("Lola", atencion => atencion === A);
mostrarEstado("3. Eliminar A");

editor.deshacer();
mostrarEstado("4. Deshacer");

editor.deshacer();
mostrarEstado("5. Deshacer");

editor.rehacer();
mostrarEstado("6. Rehacer");

editor.agregar("Lola", C);
mostrarEstado("7. Agregar C");

editor.rehacer();
mostrarEstado("8. Rehacer después de acción nueva");

// Estado final
console.log("\n===== RESULTADO FINAL =====");
mostrarHistorial("Lola");
