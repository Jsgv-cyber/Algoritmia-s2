
const Pila = require("./Pila");
const RegistroClinico = require("./RegistroClinico");

class Editor {
    constructor() {
        this.registro = new RegistroClinico();

        this.pilaDeshacer = new Pila();
        this.pilaRehacer = new Pila();
    }

    // Registrar una atención nueva
    agregar(mascota, atencion) {
        this.registro.registrarAtencion(mascota, atencion);

        const accion = {
            tipo: "agregar",
            mascota: mascota,
            atencion: atencion
        };

        this.pilaDeshacer.apilar(accion);

        // Una acción nueva elimina la posibilidad de rehacer
        this.pilaRehacer = new Pila();

        return true;
    }

    // Eliminar una atención del historial
    eliminar(mascota, condicion) {
        const historial = this.registro.obtenerHistorial(mascota);

        if (historial === null) {
            return null;
        }

        const elementos = historial.aArreglo();

        const indice = elementos.findIndex(condicion);

        if (indice === -1) {
            return null;
        }

        const anterior = indice > 0 ? elementos[indice - 1] : null;

        const eliminada = historial.eliminar(condicion);

        const accion = {
            tipo: "eliminar",
            mascota: mascota,
            atencion: eliminada,
            anterior: anterior
        };

        this.pilaDeshacer.apilar(accion);

        this.pilaRehacer = new Pila();

        return eliminada;
    }

    // Deshacer la última acción
    deshacer() {
        if (this.pilaDeshacer.estaVacia()) {
            return null;
        }

        const accion = this.pilaDeshacer.desapilar();

        const historial = this.registro.obtenerHistorial(accion.mascota);

        if (accion.tipo === "agregar") {
            historial.eliminar(
                dato => dato === accion.atencion
            );
        }

        if (accion.tipo === "eliminar") {
            if (accion.anterior === null) {
                historial.agregarAlInicio(accion.atencion);
            } else {
                historial.insertarDespuesDe(
                    dato => dato === accion.anterior,
                    accion.atencion
                );
            }
        }

        this.pilaRehacer.apilar(accion);

        return accion;
    }

    // Rehacer la última acción deshecha
    rehacer() {
        if (this.pilaRehacer.estaVacia()) {
            return null;
        }

        const accion = this.pilaRehacer.desapilar();

        const historial = this.registro.obtenerHistorial(accion.mascota);

        if (accion.tipo === "agregar") {
            this.registro.registrarAtencion(
                accion.mascota,
                accion.atencion
            );
        }

        if (accion.tipo === "eliminar") {
            historial.eliminar(
                dato => dato === accion.atencion
            );
        }

        this.pilaDeshacer.apilar(accion);

        return accion;
    }

    // Consultar el historial de una mascota
    obtenerHistorial(mascota) {
        return this.registro.obtenerHistorial(mascota);
    }

    // Consultar todas las mascotas registradas
    obtenerTodasLasMascotas() {
        return this.registro.obtenerTodasLasMascotas();
    }
}

module.exports = Editor;
