const Cola = require("./Cola");

class Recepcion {
    constructor() {
        this.urgencias = new Cola();
        this.generales = new Cola();
    }

    // Registrar una nueva llegada
    registrarLlegada(turno) {
        if (turno.tipo.toLowerCase() === "urgencia") {
            this.urgencias.encolar(turno);
            console.log("Urgencia registrada:", turno.mascota);
        } else {
            this.generales.encolar(turno);
            console.log("Consulta general registrada:", turno.mascota);
        }
    }

    // Llamar al siguiente paciente según la prioridad
    llamarSiguiente() {
        if (!this.urgencias.estaVacia()) {
            return this.urgencias.desencolar();
        }

        if (!this.generales.estaVacia()) {
            return this.generales.desencolar();
        }

        return null;
    }
}

module.exports = Recepcion;