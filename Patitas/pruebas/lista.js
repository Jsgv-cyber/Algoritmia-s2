const ListaEnlazada = require("../src/ListaEnlazada");

function estadoLista(lista, etiqueta) {
    console.log(`\n--- ${etiqueta} ---`);
    console.log("Datos:", lista.aArreglo());
    console.log("Tamaño:", lista.obtenerTamanio(), "| Vacía:", lista.estaVacia());
    console.log("Cabeza:", lista.cabeza ? lista.cabeza.dato : null);
    console.log("Cola:", lista.cola ? lista.cola.dato : null);
    if (lista.cola) {
        console.log("Cola.siguiente:", lista.cola.siguiente);
    }
}

console.log("=== MINIRETO 2: INSERCIÓN AL INICIO Y AL FINAL ===");

// 1. Agregar al final en lista vacía
const l1 = new ListaEnlazada();
l1.agregarAlFinal("A1");
estadoLista(l1, "Final en lista vacía");

// 2. Agregar al inicio en lista vacía
const l2 = new ListaEnlazada();
l2.agregarAlInicio("I1");
estadoLista(l2, "Inicio en lista vacía");

// 3. Agregar al final en lista de un nodo
const l3 = new ListaEnlazada();
l3.agregarAlFinal("N1");
l3.agregarAlFinal("N2");
estadoLista(l3, "Final en lista de 1 nodo");

// 4. Agregar al inicio en lista de un nodo
const l4 = new ListaEnlazada();
l4.agregarAlInicio("N1");
l4.agregarAlInicio("N0");
estadoLista(l4, "Inicio en lista de 1 nodo");

// 5. Agregar al final en lista de varios nodos
l3.agregarAlFinal("N3");
estadoLista(l3, "Final en lista de varios nodos");

// 6. Agregar al inicio en lista de varios nodos
l4.agregarAlInicio("N-1");
estadoLista(l4, "Inicio en lista de varios nodos");

console.log("\n=== MINIRETO 3: BÚSQUEDA, INSERCIÓN INTERMEDIA Y CASOS BORDE ===");

const lista = new ListaEnlazada();

// Caso borde A: eliminar en lista vacía
console.log("Eliminar en vacía:", lista.eliminar(x => x === "X"));
estadoLista(lista, "Tras eliminar en lista vacía");

// Caso borde B: eliminar el único nodo
lista.agregarAlFinal("Unico");
console.log("Eliminar único nodo:", lista.eliminar(x => x === "Unico"));
estadoLista(lista, "Tras eliminar el único nodo");

// Preparar lista con varios nodos
lista.agregarAlFinal("Vacunación");
lista.agregarAlFinal("Control");
lista.agregarAlFinal("Limpieza");

// Buscar existente y no existente
console.log("Buscar 'Control':", lista.buscar(x => x === "Control"));
console.log("Buscar 'Inexistente':", lista.buscar(x => x === "Inexistente"));

// Insertar después de un nodo intermedio y después de la cola
lista.insertarDespuesDe(x => x === "Vacunación", "Desparasitación");
estadoLista(lista, "Tras insertar después de 'Vacunación'");

lista.insertarDespuesDe(x => x === "Limpieza", "Revisión final");
estadoLista(lista, "Tras insertar después de la cola ('Limpieza')");

// Caso borde C: eliminar la cabeza
console.log("Eliminar cabeza:", lista.eliminar(x => x === "Vacunación"));
estadoLista(lista, "Tras eliminar la cabeza");

// Caso borde D: eliminar la cola
console.log("Eliminar cola:", lista.eliminar(x => x === "Revisión final"));
estadoLista(lista, "Tras eliminar la cola");

// Caso borde E: eliminar algo que no existe
console.log("Eliminar inexistente:", lista.eliminar(x => x === "NoExiste"));
estadoLista(lista, "Tras intentar eliminar algo que no existe");