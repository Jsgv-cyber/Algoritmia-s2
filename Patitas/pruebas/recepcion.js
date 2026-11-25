const Recepcion = require("../src/Recepcion");

const recepcion = new Recepcion();

const turnos = [
    {
        mascota: "Toby",
        tutor: "Carlos",
        horaLlegada: "08:00",
        motivo: "Control de vacunas",
        tipo: "General"
    },
    {
        mascota: "Max",
        tutor: "Laura",
        horaLlegada: "08:05",
        motivo: "Revisión de piel",
        tipo: "General"
    },
    {
        mascota: "Luna",
        tutor: "Pedro",
        horaLlegada: "08:10",
        motivo: "Intoxicación",
        tipo: "Urgencia"
    },
    {
        mascota: "Simón",
        tutor: "Andrés",
        horaLlegada: "08:20",
        motivo: "Corte de uñas",
        tipo: "General"
    },
    {
        mascota: "Kira",
        tutor: "María",
        horaLlegada: "08:25",
        motivo: "Herida en pata",
        tipo: "Urgencia"
    }
];

console.log("===== PRUEBAS DE RECEPCIÓN =====");

// Registrar las cinco mascotas
turnos.forEach(turno => {
    recepcion.registrarLlegada(turno);
});

// Atender las mascotas
console.log("\n===== ORDEN DE ATENCIÓN =====");

let atendido;

while ((atendido = recepcion.llamarSiguiente()) !== null) {
    console.log(
        atendido.mascota,
        "-",
        atendido.tipo,
        "-",
        atendido.motivo
    );
}

// Comprobar sala vacía
console.log("\n===== VALIDACIÓN FINAL =====");
console.log("Siguiente paciente:", recepcion.llamarSiguiente());