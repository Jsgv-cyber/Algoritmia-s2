// ==========================================
// BARBERÍA HADES - MOTOR DEL BARRIO
// ==========================================

// Célula: Hades
// Negocio: Barbería

// ---------- NIVEL 1 · DATOS ----------

const registros = [
    { persona: "Juan", categoria: "Corte clásico", dia: 1, valor: 15000, barbero: "Andrés", metodoPago: "Efectivo" },
    { persona: "Carlos", categoria: "Corte degradado", dia: 1, valor: 20000, barbero: "Julián", metodoPago: "Tarjeta" },
    { persona: "Sebastián", categoria: "Arreglo de barba", dia: 2, valor: 12000, barbero: "Mateo", metodoPago: "Transferencia" },
    { persona: "Miguel", categoria: "Corte + barba", dia: 2, valor: 30000, barbero: "Julián", metodoPago: "Efectivo" },
    { persona: "Andrés", categoria: "Corte clásico", dia: 3, valor: 15000, barbero: "Mateo", metodoPago: "Efectivo" },
    { persona: "Juan", categoria: "Corte + barba", dia: 4, valor: 30000, barbero: "Julián", metodoPago: "Tarjeta" },
    { persona: "Daniel", categoria: "Diseño de cejas", dia: 5, valor: 8000, barbero: "Andrés", metodoPago: "Transferencia" },
    { persona: "Carlos", categoria: "Corte clásico", dia: 5, valor: 15000, barbero: "Mateo", metodoPago: "Efectivo" },
    { persona: "Sebastián", categoria: "Corte degradado", dia: 6, valor: 20000, barbero: "Julián", metodoPago: "Tarjeta" },
    { persona: "Felipe", categoria: "Arreglo de barba", dia: 7, valor: 12000, barbero: "Andrés", metodoPago: "Transferencia" },
    { persona: "Miguel", categoria: "Corte + barba", dia: 1, valor: 30000, barbero: "Mateo", metodoPago: "Efectivo" },
    { persona: "Andrés", categoria: "Corte degradado", dia: 2, valor: 20000, barbero: "Julián", metodoPago: "Tarjeta" },
    { persona: "Juan", categoria: "Arreglo de barba", dia: 3, valor: 12000, barbero: "Andrés", metodoPago: "Transferencia" },
    { persona: "Nicolás", categoria: "Diseño de cejas", dia: 4, valor: 8000, barbero: "Mateo", metodoPago: "Efectivo" },
    { persona: "Carlos", categoria: "Corte + barba", dia: 5, valor: 30000, barbero: "Julián", metodoPago: "Tarjeta" },
    { persona: "Sebastián", categoria: "Corte clásico", dia: 6, valor: 15000, barbero: "Andrés", metodoPago: "Transferencia" },
    { persona: "Santiago", categoria: "Corte degradado", dia: 7, valor: 20000, barbero: "Mateo", metodoPago: "Efectivo" },
    { persona: "Miguel", categoria: "Arreglo de barba", dia: 1, valor: 12000, barbero: "Julián", metodoPago: "Tarjeta" },
    { persona: "Andrés", categoria: "Corte clásico", dia: 2, valor: 15000, barbero: "Andrés", metodoPago: "Transferencia" },
    { persona: "Juan", categoria: "Diseño de cejas", dia: 3, valor: 8000, barbero: "Mateo", metodoPago: "Efectivo" },
    { persona: "Juan", categoria: "Corte clásico", dia: 4, valor: 15000, barbero: "Andrés", metodoPago: "Efectivo" },
    { persona: "Carlos", categoria: "Corte degradado", dia: 5, valor: 20000, barbero: "Julián", metodoPago: "Tarjeta" },
    { persona: "Miguel", categoria: "Arreglo de barba", dia: 6, valor: 12000, barbero: "Mateo", metodoPago: "Transferencia" },
    { persona: "Daniel", categoria: "Corte + barba", dia: 7, valor: 30000, barbero: "Andrés", metodoPago: "Efectivo" }
];



// ---------- NIVEL 1 · DATOS ----------

function mostrarRegistro(registro) {
    const texto = `Día ${registro.dia} | Cliente: ${registro.persona} | Servicio: ${registro.categoria} | Precio: $${registro.valor} | Barbero: ${registro.barbero} | Pago: ${registro.metodoPago}`;

    return texto;
}

function listarTodo(datos) {
    for (let i = 0; i < datos.length; i++) {
        console.log(mostrarRegistro(datos[i]));
    }
}


// ---------- NIVEL 2 · REPORTES ----------

function totalGeneral(datos) {
    let total = 0;

    for (let i = 0; i < datos.length; i++) {
        total = total + datos[i].valor;
    }

    return total;
}

function promedio(datos) {

    if (datos.length === 0) {
        return 0;
    }

    let total = totalGeneral(datos);

    let resultado = total / datos.length;

    return resultado;
}

function registroMayor(datos) {

    if (datos.length === 0) {
        return null;
    }

    let mayor = datos[0];

    for (let i = 1; i < datos.length; i++) {

        if (datos[i].valor > mayor.valor) {
            mayor = datos[i];
        }

    }

    return mayor;
}

function filtrarPorCategoria(datos, categoria) {

    let resultado = [];

    for (let i = 0; i < datos.length; i++) {

        if (datos[i].categoria === categoria) {
            resultado.push(datos[i]);


        }

    }

    return resultado;
}

function totalesPorCategoria(datos) {

    let totales = {};

    for (let i = 0; i < datos.length; i++) {

        let categoria = datos[i].categoria;

        if (totales[categoria] === undefined) {

            totales[categoria] = 0;

        }

        totales[categoria] = totales[categoria] + datos[i].valor;

    }

    return totales;
}

function personasUnicas(datos) {

    let clientes = new Set();

    for (let i = 0; i < datos.length; i++) {

        clientes.add(datos[i].persona);

    }

    return clientes.size;
}

function recurrentesLento(datos) {

    let recurrentes = [];

    for (let i = 0; i < datos.length; i++) {

        let contador = 0;

        for (let j = 0; j < datos.length; j++) {

            if (datos[i].persona === datos[j].persona) {
                contador++;
            }

        }

        if (contador > 1) {

            let repetido = false;

            for (let k = 0; k < recurrentes.length; k++) {

                if (recurrentes[k] === datos[i].persona) {
                    repetido = true;
                }

            }

            if (repetido === false) {
                recurrentes.push(datos[i].persona);
            }

        }

    }

    return recurrentes;
}

function recurrentesRapido(datos) {

    let visitas = new Map();

    for (let i = 0; i < datos.length; i++) {

        let cliente = datos[i].persona;

        if (visitas.has(cliente)) {

            visitas.set(cliente, visitas.get(cliente) + 1);

        } else {

            visitas.set(cliente, 1);

        }

    }

    let recurrentes = [];

    for (let [cliente, cantidad] of visitas) {

        if (cantidad > 1) {
            recurrentes.push(cliente);
        }

    }

    return recurrentes;
}

function categoriaEstrella(datos) {

let categorias = new Map();

for (let i = 0; i < datos.length; i++) {

    let categoria = datos[i].categoria;

    if (categorias.has(categoria)) {

        categorias.set(categoria, categorias.get(categoria) + 1);

    } else {

        categorias.set(categoria, 1);

    }

}

let mayorCantidad = 0;
let categoriaGanadora = null;

for (let [categoria, cantidad] of categorias) {

    if (cantidad > mayorCantidad) {

        mayorCantidad = cantidad;
        categoriaGanadora = categoria;

    }

}

return categoriaGanadora;


}

// ---------- PAR QUE SUMA ----------

function parQueSuma(datos, objetivo) {

for (let i = 0; i < datos.length; i++) {

    for (let j = i + 1; j < datos.length; j++) {

        if (datos[i].valor + datos[j].valor === objetivo) {

            return [datos[i], datos[j]];

        }

    }

}

return null;


}

// ---------- NIVEL 4 · COLA Y PILA ----------

const colaDeAtencion = [];

function llegar(persona) {
    colaDeAtencion.push(persona);
    return persona;
}

function atender() {
    if (colaDeAtencion.length === 0) {
        return "No hay clientes en espera";
    }

    return colaDeAtencion.shift();
}

// ---------- PILA ----------

const historial = [];

function agregarRegistro(datos, registro) {

    datos.push(registro);

    historial.push(registro);

    return registro;
}

function deshacer(datos) {

    if (historial.length === 0) {
        return null;
    }

    let registroEliminado = historial.pop();

    for (let i = datos.length - 1; i >= 0; i--) {

        if (datos[i] === registroEliminado) {
            datos.splice(i, 1);
            break;
        }

    }

    return registroEliminado;
}

// ---------- NIVEL 5 · CONTADOR DE PASOS ----------

function recurrentesLentoConPasos(datos) {
    let recurrentes = [];
    let pasos = 0;

    for (let i = 0; i < datos.length; i++) {
        pasos++; // Iteración del bucle externo (i)
        let contador = 0;

        for (let j = 0; j < datos.length; j++) {
            pasos++; // Comparación dentro del bucle interno (j)
            if (datos[i].persona === datos[j].persona) {
                contador++;
            }
        }

        if (contador > 1) {
            let repetido = false;

            for (let k = 0; k < recurrentes.length; k++) {
                pasos++; // Bucle de verificación de repetidos (k)
                if (recurrentes[k] === datos[i].persona) {
                    repetido = true;
                }
            }

            if (repetido === false) {
                recurrentes.push(datos[i].persona);
            }
        }
    }

    return { resultado: recurrentes, pasos };
}

function recurrentesRapidoConPasos(datos) {
    let visitas = new Map();
    let pasos = 0;

    for (let i = 0; i < datos.length; i++) {
        pasos++; // Recorrido sobre los registros (i)
        let cliente = datos[i].persona;

        if (visitas.has(cliente)) {
            visitas.set(cliente, visitas.get(cliente) + 1);
        } else {
            visitas.set(cliente, 1);
        }
    }

    let recurrentes = [];

    for (let [cliente, cantidad] of visitas) {
        pasos++; // Recorrido sobre las entradas del Map
        if (cantidad > 1) {
            recurrentes.push(cliente);
        }
    }

    return { resultado: recurrentes, pasos };
}



// ---------- ZONA DE PRUEBAS ----------

listarTodo(registros);

console.log("Total de registros:", registros.length);

console.log("Ingresos totales:", totalGeneral(registros));

console.log("Prueba con arreglo vacío:", totalGeneral([]));

console.log("Promedio por servicio:", promedio(registros));

console.log("Promedio con arreglo vacío:", promedio([]));

console.log("Servicio más costoso:", registroMayor(registros));

console.log("Prueba con arreglo vacío:", registroMayor([]));

console.log("Servicios de corte clásico:",
    filtrarPorCategoria(registros, "Corte clásico"));

console.log("Prueba con arreglo vacío:",
    filtrarPorCategoria([], "Corte clásico"));

console.log("Totales por categoría:", totalesPorCategoria(registros));

console.log("Prueba con arreglo vacío:", totalesPorCategoria([]));

console.log("Clientes únicos:", personasUnicas(registros));

console.log("Clientes únicos con arreglo vacío:", personasUnicas([]));

console.log("Clientes recurrentes:", recurrentesLento(registros));

console.log("Recurrentes con arreglo vacío:", recurrentesLento([]));

console.log("Clientes recurrentes rápidos:", recurrentesRapido(registros));

console.log("Recurrentes rápidos con arreglo vacío:", recurrentesRapido([]));

console.log("Categoría estrella:", categoriaEstrella(registros));

console.log("Categoría estrella con arreglo vacío:", categoriaEstrella([]));

console.log("Pareja que suma 45000:", parQueSuma(registros, 45000));

console.log("Prueba con arreglo vacío:", parQueSuma([], 45000));

console.log("Atender con la fila vacía:", atender());

llegar("Juan");
llegar("Carlos");
llegar("Sebastian");

console.log("Cola después de llegar:", colaDeAtencion);

console.log("Primer cliente atendido:", atender());
console.log("Segundo cliente atendido:", atender());

console.log("Cola después de atender:", colaDeAtencion);

console.log("Último cliente atendido:", atender());

console.log("Atender nuevamente con la fila vacía:", atender());

// ---------- PRUEBAS NIVEL 4 · PILA ----------

console.log("\n===== PRUEBAS DE LA PILA =====");

let nuevoServicio = {
    persona: "David",
    categoria: "Corte clásico",
    dia: 7,
    valor: 15000,
    barbero: "Andrés",
    metodoPago: "Efectivo"
};

console.log("Servicio agregado:",
    agregarRegistro(registros, nuevoServicio));

console.log("Total después de agregar:",
    registros.length);

console.log("Servicio deshecho:",
    deshacer(registros));

console.log("Total después de deshacer:",
    registros.length);

console.log("Intentar deshacer nuevamente:",
    deshacer(registros));

// ---------- PRUEBAS NIVEL 5 · COMPARACIÓN DE PASOS ----------

console.log("\n===== PRUEBAS NIVEL 5 · COSTOS =====");

const pruebaLento = recurrentesLentoConPasos(registros);
const pruebaRapido = recurrentesRapidoConPasos(registros);

console.log("Recurrentes (lento) y pasos:", pruebaLento);
console.log("Recurrentes (rápido) y pasos:", pruebaRapido);
console.log("Diferencia de pasos (Lento - Rápido):", pruebaLento.pasos - pruebaRapido.pasos);