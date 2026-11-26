
const Cola = require("../src/estructuras/Cola");

const cola = new Cola();

// Cinco turnos de recepción
const turnos = [
    {
        mascota: "Lola",
        tutor: "Carlos",
        horaLlegada: "08:00",
        motivo: "Vacunación"
    },
    {
        mascota: "Toby",
        tutor: "María",
        horaLlegada: "08:05",
        motivo: "Control"
    },
    {
        mascota: "Mía",
        tutor: "Andrés",
        horaLlegada: "08:10",
        motivo: "Consulta general"
    },
    {
        mascota: "Max",
        tutor: "Laura",
        horaLlegada: "08:15",
        motivo: "Revisión de piel"
    },
    {
        mascota: "Luna",
        tutor: "Pedro",
        horaLlegada: "08:20",
        motivo: "Dolor abdominal"
    }
];

console.log("===== PRUEBAS DE COLA FIFO =====");

// Comprobar cola vacía
console.log("¿Está vacía?:", cola.estaVacia());
console.log("Tamaño inicial:", cola.tamanio());
console.log("Desencolar vacía:", cola.desencolar());

// Registrar los cinco turnos
turnos.forEach((turno) => {
    cola.encolar(turno);
});

console.log("\nTurnos registrados:", cola.tamanio());

console.log("Primer turno:", cola.verFrente().mascota);

// Atender los cinco turnos
console.log("\n===== ORDEN DE ATENCIÓN =====");

while (!cola.estaVacia()) {
    const atendido = cola.desencolar();

    console.log(
        atendido.mascota,
        "| Tutor:",
        atendido.tutor,
        "| Llegada:",
        atendido.horaLlegada,
        "| Motivo:",
        atendido.motivo
    );
}

// Comprobar estado final
console.log("\n¿Está vacía?:", cola.estaVacia());
console.log("Tamaño final:", cola.tamanio());
console.log("Desencolar nuevamente:", cola.desencolar());
console.log("Frente final:", cola.verFrente());
console.log("Final final:", cola.final);


console.log("\n===== COMPARACIÓN DE RENDIMIENTO =====");

const cantidadPruebas = 100000;

// Prueba con nuestra cola enlazada
const colaRendimiento = new Cola();

console.time("Cola con nodos - Encolar");

for (let i = 0; i < cantidadPruebas; i++) {
    colaRendimiento.encolar(i);
}

console.timeEnd("Cola con nodos - Encolar");

console.time("Cola con nodos - Desencolar");

while (!colaRendimiento.estaVacia()) {
    colaRendimiento.desencolar();
}

console.timeEnd("Cola con nodos - Desencolar");

// Prueba con un arreglo
const arreglo = [];

console.time("Arreglo - Encolar");

for (let i = 0; i < cantidadPruebas; i++) {
    arreglo.push(i);
}

console.timeEnd("Arreglo - Encolar");

console.time("Arreglo - Desencolar");

while (arreglo.length > 0) {
    arreglo.shift();
}

console.timeEnd("Arreglo - Desencolar");