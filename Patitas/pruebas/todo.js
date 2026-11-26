const ListaEnlazada = require("../src/estructuras/ListaEnlazada");
const Cola = require("../src/estructuras/Cola");
const Pila = require("../src/estructuras/Pila");
const RegistroClinico = require("../src/dominio/RegistroClinico");
const Recepcion = require("../src/dominio/Recepcion");
const Editor = require("../src/dominio/Editor");
const {
    catalogo,
    contarServicios,
    profundidad,
    buscarServicio,
    rutaDeServicio,
    precioPaquete,
    serviciosEnRango
} = require("../src/dominio/catalogo");

let fallas = 0;

function verificar(nombrePrueba, condicion) {
    if (condicion) {
        console.log(`OK    - ${nombrePrueba}`);
    } else {
        console.log(`FALLA - ${nombrePrueba}`);
        fallas++;
    }
}

console.log("===== PRUEBAS INTEGRADAS PATITAS v1.0 =====");

// 1. ListaEnlazada (normal + borde + recursivos)
const lista = new ListaEnlazada();
verificar("Lista vacía inicialmente", lista.estaVacia() && lista.tamanioRecursivo() === 0);
verificar("Eliminar en lista vacía retorna null", lista.eliminar(x => x === "A") === null);

lista.agregarAlFinal({ motivo: "Vacuna", costo: 50000 });
lista.agregarAlFinal({ motivo: "Control", costo: 30000 });
verificar(
    "Lista con 2 elementos tiene tamaño recursivo 2 y costo 80000",
    lista.tamanioRecursivo() === 2 && lista.costoTotalRecursivo() === 80000
);
verificar(
    "Buscar recursivo encuentra Control",
    lista.buscarRecursivo(x => x.motivo === "Control")?.costo === 30000
);

// Prueba de desbordamiento de pila con 100,000 nodos
const listaGrande = new ListaEnlazada();
for (let i = 0; i < 100000; i++) {
    listaGrande.agregarAlFinal({ costo: 1 });
}
let lanzoRangeError = false;
try {
    listaGrande.tamanioRecursivo();
} catch (err) {
    lanzoRangeError = err instanceof RangeError;
}
verificar("tamanioRecursivo con 100,000 nodos lanza RangeError", lanzoRangeError);

// 2. Cola FIFO
const cola = new Cola();
verificar("Desencolar cola vacía retorna null", cola.desencolar() === null);
cola.encolar("Primero");
cola.encolar("Segundo");
verificar(
    "Cola respeta FIFO y verFrente no retira",
    cola.verFrente() === "Primero" && cola.desencolar() === "Primero"
);

// 3. Pila LIFO
const pila = new Pila();
verificar("Desapilar pila vacía retorna null", pila.desapilar() === null);
pila.apilar("A");
pila.apilar("B");
verificar("Pila respeta LIFO", pila.desapilar() === "B" && pila.verTope() === "A");

// 4. Recepcion con prioridad
const recepcion = new Recepcion();
recepcion.registrarLlegada({ mascota: "Toby", tipo: "General" });
recepcion.registrarLlegada({ mascota: "Luna", tipo: "Urgencia" });
verificar("Recepción atiende Urgencia antes que General", recepcion.llamarSiguiente().mascota === "Luna");

// 5. RegistroClinico y Editor (deshacer / rehacer)
const registro = new RegistroClinico();
registro.registrarAtencion("Mía", { motivo: "Consulta", costo: 40000 });
verificar("RegistroClinico guarda historial de Mía", registro.obtenerHistorial("Mía").obtenerTamanio() === 1);

const editor = new Editor();
editor.agregar("Lola", { motivo: "A" });
editor.agregar("Lola", { motivo: "B" });
editor.deshacer();
verificar("Editor deshacer revierte última acción", editor.obtenerHistorial("Lola").aArreglo().length === 1);
editor.rehacer();
verificar("Editor rehacer reaplica acción", editor.obtenerHistorial("Lola").aArreglo().length === 2);
editor.agregar("Lola", { motivo: "C" });
verificar("Nueva acción limpia pilaRehacer", editor.rehacer() === null);

// 6. Catálogo recursivo
const cirugias = catalogo.subcategorias.find(c => c.nombre === "Cirugías");
verificar("Contar servicios incluye Oftalmología (10 servicios)", contarServicios(catalogo) === 10);
verificar("Profundidad máxima del catálogo es 4", profundidad(catalogo) === 4);
verificar("buscarServicio encuentra Gata y detiene búsqueda", buscarServicio(catalogo, "Gata")?.precio === 280000);
verificar("buscarServicio inexistente retorna null", buscarServicio(catalogo, "NoExiste") === null);
verificar(
    "rutaDeServicio devuelve ruta completa de Gata",
    JSON.stringify(rutaDeServicio(catalogo, "Gata")) === JSON.stringify(["Patitas", "Cirugías", "Esterilización", "Gata"])
);
verificar("rutaDeServicio inexistente retorna null", rutaDeServicio(catalogo, "Peluquería") === null);
verificar("precioPaquete Cirugías aplica 10% una sola vez (702000)", precioPaquete(cirugias) === 702000);
verificar("serviciosEnRango [80000, 150000] devuelve 5 servicios", serviciosEnRango(catalogo, 80000, 150000).length === 5);

console.log(`\nResumen: ${fallas === 0 ? "TODAS LAS PRUEBAS OK" : `${fallas} PRUEBA(S) CON FALLA`}`);
process.exit(fallas === 0 ? 0 : 1);