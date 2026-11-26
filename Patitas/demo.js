const {
    catalogo,
    listarCatalogo,
    contarServicios,
    profundidad,
    rutaDeServicio,
    precioPaquete
} = require("./src/dominio/catalogo");
const Recepcion = require("./src/dominio/Recepcion");
const Editor = require("./src/dominio/Editor");

function convertirMinutos(hora) {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
}

function convertirHora(minutos) {
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

console.log("==================================================");
console.log("         DEMOSTRACIÓN OFICIAL — PATITAS v1.0");
console.log("==================================================");

// 1. Catálogo de servicios con su jerarquía
console.log("\n--- 1. CATÁLOGO DE SERVICIOS Y JERARQUÍA ---");
listarCatalogo(catalogo);
console.log(
    `Total de servicios: ${contarServicios(catalogo)} | Profundidad máxima: ${profundidad(catalogo)} niveles`
);

// 2. Simulación de la mañana con urgencias
console.log("\n--- 2. SIMULACIÓN DE LA MAÑANA (URGENCIAS > GENERALES) ---");
const recepcion = new Recepcion();
const editor = new Editor();

const turnos = [
    { mascota: "Toby", tutor: "Carlos", horaLlegada: "08:00", motivo: "Control de vacunas", tipo: "General" },
    { mascota: "Max", tutor: "Laura", horaLlegada: "08:05", motivo: "Revisión de piel", tipo: "General" },
    { mascota: "Luna", tutor: "Pedro", horaLlegada: "08:10", motivo: "Intoxicación", tipo: "Urgencia" },
    { mascota: "Simón", tutor: "Andrés", horaLlegada: "08:20", motivo: "Corte de uñas", tipo: "General" },
    { mascota: "Kira", tutor: "María", horaLlegada: "08:25", motivo: "Herida en pata", tipo: "Urgencia" },
    { mascota: "Nala", tutor: "Jorge", horaLlegada: "08:40", motivo: "Desparasitación", tipo: "General" },
    { mascota: "Rocky", tutor: "Daniela", horaLlegada: "09:00", motivo: "Dificultad para respirar", tipo: "Urgencia" }
].sort((a, b) => convertirMinutos(a.horaLlegada) - convertirMinutos(b.horaLlegada));

const DURACION = 20;
let idx = 0;
let tiempoActual = convertirMinutos("08:00");
const atendidos = [];

while (atendidos.length < turnos.length) {
    while (idx < turnos.length && convertirMinutos(turnos[idx].horaLlegada) <= tiempoActual) {
        recepcion.registrarLlegada(turnos[idx]);
        idx++;
    }

    if (recepcion.urgencias.estaVacia() && recepcion.generales.estaVacia()) {
        if (idx < turnos.length) {
            tiempoActual = convertirMinutos(turnos[idx].horaLlegada);
        }
        continue;
    }

    const actual = recepcion.llamarSiguiente();
    const espera = tiempoActual - convertirMinutos(actual.horaLlegada);
    const horaAtencion = convertirHora(tiempoActual);

    console.log(
        `Atendido: ${actual.mascota} (${actual.tipo}) | Llegada ${actual.horaLlegada} -> Atención ${horaAtencion} | Espera: ${espera} min`
    );

    editor.agregar(actual.mascota, {
        hora: horaAtencion,
        motivo: actual.motivo,
        tipo: actual.tipo
    });

    atendidos.push(actual);
    tiempoActual += DURACION;
}

if (recepcion.llamarSiguiente() === null) {
    console.log("Validación de sala vacía: sin pacientes pendientes, sin errores.");
}

// 3. Corrección con deshacer y rehacer
console.log("\n--- 3. CORRECCIÓN CON DESHACER Y REHACER ---");
const notaTemporal = { hora: "10:20", motivo: "Nota de prueba", tipo: "General" };
editor.agregar("Lola", notaTemporal);
console.log(
    "Tras agregar nota temporal a Lola:",
    editor.obtenerHistorial("Lola").aArreglo().map(x => x.motivo)
);

editor.deshacer();
console.log(
    "Tras deshacer():",
    editor.obtenerHistorial("Lola").aArreglo().map(x => x.motivo)
);

editor.rehacer();
console.log(
    "Tras rehacer():",
    editor.obtenerHistorial("Lola").aArreglo().map(x => x.motivo)
);

editor.deshacer();
console.log(
    "Dejando historial limpio tras deshacer():",
    editor.obtenerHistorial("Lola").aArreglo().map(x => x.motivo)
);

// 4. Historiales finales
console.log("\n--- 4. HISTORIALES FINALES DE MASCOTAS ---");
for (const mascota of editor.obtenerTodasLasMascotas()) {
    const hist = editor.obtenerHistorial(mascota);
    const detalles = hist.aArreglo().map(a => `${a.motivo} [${a.hora}]`).join(", ");
    console.log(`${mascota} (${hist.obtenerTamanio()}): ${detalles}`);
}

// 5. Búsqueda de un servicio con su ruta y precio de paquete
console.log("\n--- 5. BÚSQUEDA, RUTA Y PRECIO DE PAQUETE ---");
const servicioObjetivo = "Gata";
const ruta = rutaDeServicio(catalogo, servicioObjetivo);
const categoriaCirugias = catalogo.subcategorias.find(c => c.nombre === "Cirugías");
const paqueteCirugias = precioPaquete(categoriaCirugias);

console.log(`Servicio buscado: ${servicioObjetivo}`);
console.log(`Ruta: ${ruta ? ruta.join(" > ") : "No encontrado"}`);
console.log(`Precio paquete Cirugías (10% desc.): $${paqueteCirugias.toLocaleString("es-CO")}`);