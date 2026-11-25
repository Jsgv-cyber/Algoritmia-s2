const Nodo = require("./Nodo");

class Pila {
    constructor() {
        this.tope = null;
        this.cantidad = 0;
    }

    // Agregar un elemento: O(1)
    apilar(dato) {
        const nuevo = new Nodo(dato);

        nuevo.siguiente = this.tope;
        this.tope = nuevo;

        this.cantidad++;
    }

    // Retirar el elemento superior: O(1)
    desapilar() {
        if (this.tope === null) {
            return null;
        }

        const eliminado = this.tope.dato;

        this.tope = this.tope.siguiente;

        this.cantidad--;

        return eliminado;
    }

    // Consultar el elemento superior: O(1)
    verTope() {
        if (this.tope === null) {
            return null;
        }

        return this.tope.dato;
    }

    // Comprobar si está vacía: O(1)
    estaVacia() {
        return this.cantidad === 0;
    }

    // Consultar cantidad de elementos: O(1)
    tamanio() {
        return this.cantidad;
    }
}

module.exports = Pila;