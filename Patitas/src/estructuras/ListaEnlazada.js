const Nodo = require("./Nodo");

class ListaEnlazada {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamanio = 0;
    }

    estaVacia() {
        return this.tamanio === 0;
    }

    obtenerTamanio() {
        return this.tamanio;
    }

    // Inserción al inicio en O(1)
    agregarAlInicio(dato) {
        const nuevo = new Nodo(dato);
        nuevo.siguiente = this.cabeza;
        this.cabeza = nuevo;

        if (this.cola === null) {
            this.cola = nuevo;
        }

        this.tamanio++;
    }

    // Inserción al final en O(1) usando puntero cola
    agregarAlFinal(dato) {
        const nuevo = new Nodo(dato);

        if (this.cabeza === null) {
            this.cabeza = nuevo;
            this.cola = nuevo;
        } else {
            this.cola.siguiente = nuevo;
            this.cola = nuevo;
        }

        this.tamanio++;
    }

    recorrer(callback) {
        let actual = this.cabeza;
        while (actual !== null) {
            callback(actual.dato);
            actual = actual.siguiente;
        }
    }

    aArreglo() {
        const elementos = [];
        this.recorrer((dato) => {
            elementos.push(dato);
        });
        return elementos;
    }

    buscar(condicion) {
        let actual = this.cabeza;
        while (actual !== null) {
            if (condicion(actual.dato)) {
                return actual.dato;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    insertarDespuesDe(condicion, dato) {
        let actual = this.cabeza;

        while (actual !== null) {
            if (condicion(actual.dato)) {
                const nuevo = new Nodo(dato);
                nuevo.siguiente = actual.siguiente;
                actual.siguiente = nuevo;

                if (actual === this.cola) {
                    this.cola = nuevo;
                }

                this.tamanio++;
                return true;
            }
            actual = actual.siguiente;
        }

        return false;
    }

    eliminar(condicion) {
        if (this.cabeza === null) {
            return null;
        }

        // Caso 1: eliminar la cabeza (incluye cuando es el único nodo)
        if (condicion(this.cabeza.dato)) {
            const eliminado = this.cabeza.dato;
            this.cabeza = this.cabeza.siguiente;
            this.tamanio--;

            if (this.cabeza === null) {
                this.cola = null;
            }

            return eliminado;
        }

        // Caso 2: eliminar nodo intermedio o cola
        let anterior = this.cabeza;
        let actual = this.cabeza.siguiente;

        while (actual !== null) {
            if (condicion(actual.dato)) {
                const eliminado = actual.dato;
                anterior.siguiente = actual.siguiente;

                if (actual === this.cola) {
                    this.cola = anterior;
                }

                this.tamanio--;
                return eliminado;
            }

            anterior = actual;
            actual = actual.siguiente;
        }

        return null;
    }

    // MiniReto 11: tamaño recursivo mediante función auxiliar sobre nodo
    tamanioRecursivo() {
        function contar(nodo) {
            if (nodo === null) {
                return 0;
            }
            return 1 + contar(nodo.siguiente);
        }

        return contar(this.cabeza);
    }

    // MiniReto 11: costo total recursivo mediante función auxiliar sobre nodo
    costoTotalRecursivo() {
        function sumar(nodo) {
            if (nodo === null) {
                return 0;
            }
            const costoActual = typeof nodo.dato?.costo === "number" ? nodo.dato.costo : 0;
            return costoActual + sumar(nodo.siguiente);
        }

        return sumar(this.cabeza);
    }

    // MiniReto 11: búsqueda recursiva mediante función auxiliar sobre nodo
    buscarRecursivo(condicion) {
        function buscarEnNodo(nodo) {
            if (nodo === null) {
                return null;
            }
            if (condicion(nodo.dato)) {
                return nodo.dato;
            }
            return buscarEnNodo(nodo.siguiente);
        }

        return buscarEnNodo(this.cabeza);
    }

    // MiniReto 11: imprimir de más reciente a más antigua usando la pila de llamadas
    imprimirAlReves() {
        function recorrerInverso(nodo) {
            if (nodo === null) {
                return;
            }
            recorrerInverso(nodo.siguiente);
            console.log(nodo.dato);
        }

        recorrerInverso(this.cabeza);
    }
}

module.exports = ListaEnlazada;