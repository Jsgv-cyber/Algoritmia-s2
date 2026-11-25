
const Nodo = require("./Nodo");

class Cola {
    constructor() {
        this.frente = null;
        this.final = null;
        this.cantidad = 0;
    }

    // Agregar un elemento al final de la cola: O(1)
    encolar(dato) {
        const nuevo = new Nodo(dato);

        if (this.frente === null) {
            this.frente = nuevo;
            this.final = nuevo;
        } else {
            this.final.siguiente = nuevo;
            this.final = nuevo;
        }

        this.cantidad++;
    }

    // Retirar el primer elemento: O(1)
    desencolar() {
        if (this.frente === null) {
            return null;
        }

        const eliminado = this.frente.dato;

        this.frente = this.frente.siguiente;

        this.cantidad--;

        if (this.frente === null) {
            this.final = null;
        }

        return eliminado;
    }

    // Consultar el primer elemento sin retirarlo: O(1)
    verFrente() {
        if (this.frente === null) {
            return null;
        }

        return this.frente.dato;
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

module.exports = Cola;
