const Recepcion = require("./Recepcion");

const recepcion = new Recepcion();

// Convertir una hora HH:MM a minutos
function convertirMinutos(hora) {
    const [horas, minutos] = hora.split(":").map(Number);

    return horas * 60 + minutos;
}

// Convertir minutos a formato HH:MM
function convertirHora(minutos) {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    return `${String(horas).padStart(2, "0")}:${String(minutosRestantes).padStart(2, "0")}`;
}

// Llegadas de la mañana
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
    },
    {
        mascota: "Nala",
        tutor: "Jorge",
        horaLlegada: "08:40",
        motivo: "Desparasitación",
        tipo: "General"
    },
    {
        mascota: "Rocky",
        tutor: "Daniela",
        horaLlegada: "09:00",
        motivo: "Dificultad para respirar",
        tipo: "Urgencia"
    }
];

// Ordenar las llegadas cronológicamente
turnos.sort((a, b) =>
    convertirMinutos(a.horaLlegada) -
    convertirMinutos(b.horaLlegada)
);

const DURACION_ATENCION = 20;

let indiceLlegada = 0;
let tiempoActual = convertirMinutos("08:00");

let atendidos = [];

let esperaUrgencias = 0;
let cantidadUrgencias = 0;

let esperaGenerales = 0;
let cantidadGenerales = 0;

console.log("======================================");
console.log("      PATITAS - SIMULACIÓN V0.2");
console.log("======================================");

// Simular la mañana
while (atendidos.length < turnos.length) {

    // Registrar todas las mascotas que ya llegaron
    while (
        indiceLlegada < turnos.length &&
        convertirMinutos(turnos[indiceLlegada].horaLlegada) <= tiempoActual
    ) {
        const turno = turnos[indiceLlegada];

        recepcion.registrarLlegada(turno);

        indiceLlegada++;
    }

    // Si no hay nadie esperando, avanzar hasta la siguiente llegada
    if (
        recepcion.urgencias.estaVacia() &&
        recepcion.generales.estaVacia()
    ) {
        if (indiceLlegada < turnos.length) {
            tiempoActual = convertirMinutos(
                turnos[indiceLlegada].horaLlegada
            );
        }

        continue;
    }

    // Llamar al siguiente paciente
    const turnoAtendido = recepcion.llamarSiguiente();

    const llegada = convertirMinutos(turnoAtendido.horaLlegada);

    const espera = tiempoActual - llegada;

    const horaAtencion = convertirHora(tiempoActual);

    console.log("\n--------------------------------------");
    console.log("Mascota:", turnoAtendido.mascota);
    console.log("Tipo:", turnoAtendido.tipo);
    console.log("Hora de llegada:", turnoAtendido.horaLlegada);
    console.log("Hora de atención:", horaAtencion);
    console.log("Tiempo de espera:", espera, "minutos");
    console.log("Motivo:", turnoAtendido.motivo);

    // Acumular tiempos de espera por categoría
    if (turnoAtendido.tipo.toLowerCase() === "urgencia") {
        esperaUrgencias += espera;
        cantidadUrgencias++;
    } else {
        esperaGenerales += espera;
        cantidadGenerales++;
    }

    atendidos.push({
        ...turnoAtendido,
        horaAtencion,
        espera
    });

    // El consultorio queda ocupado durante 20 minutos
    tiempoActual += DURACION_ATENCION;
}

// Mostrar promedios
console.log("\n======================================");
console.log("       REPORTE FINAL DE ATENCIÓN");
console.log("======================================");

console.log("\nOrden de atención:");

atendidos.forEach((turno, indice) => {
    console.log(
        `${indice + 1}. ${turno.mascota} | ` +
        `${turno.tipo} | Llegada: ${turno.horaLlegada} | ` +
        `Atención: ${turno.horaAtencion} | ` +
        `Espera: ${turno.espera} minutos`
    );
});

console.log("\nPromedios de espera:");

if (cantidadUrgencias > 0) {
    console.log(
        "Urgencias:",
        (esperaUrgencias / cantidadUrgencias).toFixed(2),
        "minutos"
    );
}

if (cantidadGenerales > 0) {
    console.log(
        "Generales:",
        (esperaGenerales / cantidadGenerales).toFixed(2),
        "minutos"
    );
}

console.log("\nTotal de mascotas atendidas:", atendidos.length);

console.log("Hora de finalización:", convertirHora(tiempoActual));

console.log("\n======================================");
console.log("       FIN DE LA SIMULACIÓN");
console.log("======================================");