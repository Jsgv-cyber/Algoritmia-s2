const Pila = require("../src/Pila");

const pila = new Pila();

console.log("===== PRUEBAS DE PILA =====");

console.log("¿Está vacía?:", pila.estaVacia());
console.log("Tamaño inicial:", pila.tamanio());

// Agregar elementos
pila.apilar("Acción A");
pila.apilar("Acción B");
pila.apilar("Acción C");

console.log("\nTamaño actual:", pila.tamanio());
console.log("Elemento superior:", pila.verTope());

// Retirar elementos
console.log("\nElemento retirado:", pila.desapilar());
console.log("Nuevo tope:", pila.verTope());

console.log("Elemento retirado:", pila.desapilar());
console.log("Nuevo tope:", pila.verTope());

console.log("Elemento retirado:", pila.desapilar());

// Comprobar pila vacía
console.log("\n¿Está vacía?:", pila.estaVacia());
console.log("Tamaño final:", pila.tamanio());
console.log("Desapilar vacía:", pila.desapilar());