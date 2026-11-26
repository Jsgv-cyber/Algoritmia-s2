const catalogo = {
    nombre: "Patitas",
    servicios: [],
    subcategorias: [
        {
            nombre: "Consultas",
            servicios: [
                { nombre: "Consulta general", precio: 60000 },
                { nombre: "Consulta a domicilio", precio: 90000 }
            ],
            subcategorias: [
                {
                    nombre: "Especializada",
                    servicios: [
                        { nombre: "Dermatología", precio: 110000 },
                        { nombre: "Cardiología", precio: 130000 }
                    ],
                    subcategorias: [
                        {
                            nombre: "Oftalmología",
                            servicios: [
                                { nombre: "Examen oftalmológico", precio: 95000 }
                            ],
                            subcategorias: []
                        }
                    ]
                }
            ]
        },
        {
            nombre: "Cirugías",
            servicios: [],
            subcategorias: [
                {
                    nombre: "Esterilización",
                    servicios: [
                        { nombre: "Gata", precio: 280000 },
                        { nombre: "Perra", precio: 350000 }
                    ],
                    subcategorias: []
                },
                {
                    nombre: "Limpieza dental",
                    servicios: [
                        { nombre: "Con anestesia", precio: 150000 }
                    ],
                    subcategorias: []
                }
            ]
        },
        {
            nombre: "Vacunas",
            servicios: [
                { nombre: "Rabia", precio: 45000 },
                { nombre: "Triple felina", precio: 85000 }
            ],
            subcategorias: []
        }
    ]
};

function contarServicios(categoria) {
    if (!categoria) {
        return 0;
    }

    let total = Array.isArray(categoria.servicios) ? categoria.servicios.length : 0;

    if (Array.isArray(categoria.subcategorias)) {
        for (const sub of categoria.subcategorias) {
            total += contarServicios(sub);
        }
    }

    return total;
}

function listarCatalogo(categoria, nivel = 0) {
    if (!categoria) {
        return;
    }

    const sangria = "  ".repeat(nivel);
    console.log(`${sangria}[${categoria.nombre}]`);

    if (Array.isArray(categoria.servicios)) {
        for (const servicio of categoria.servicios) {
            console.log(`${sangria}  - ${servicio.nombre}: $${servicio.precio.toLocaleString("es-CO")}`);
        }
    }

    if (Array.isArray(categoria.subcategorias)) {
        for (const sub of categoria.subcategorias) {
            listarCatalogo(sub, nivel + 1);
        }
    }
}

function profundidad(categoria) {
    if (!categoria) {
        return 0;
    }

    if (!Array.isArray(categoria.subcategorias) || categoria.subcategorias.length === 0) {
        return 1;
    }

    let maxSub = 0;
    for (const sub of categoria.subcategorias) {
        const profSub = profundidad(sub);
        if (profSub > maxSub) {
            maxSub = profSub;
        }
    }

    return 1 + maxSub;
}

function buscarServicio(categoria, nombre) {
    if (!categoria) {
        return null;
    }

    if (Array.isArray(categoria.servicios)) {
        for (const servicio of categoria.servicios) {
            if (servicio.nombre === nombre) {
                return servicio;
            }
        }
    }

    if (Array.isArray(categoria.subcategorias)) {
        for (const sub of categoria.subcategorias) {
            const encontrado = buscarServicio(sub, nombre);
            if (encontrado !== null) {
                return encontrado;
            }
        }
    }

    return null;
}

function rutaDeServicio(categoria, nombre) {
    function buscarRuta(actual, rutaActual) {
        if (!actual) {
            return null;
        }

        const nuevaRuta = [...rutaActual, actual.nombre];

        if (Array.isArray(actual.servicios)) {
            for (const servicio of actual.servicios) {
                if (servicio.nombre === nombre) {
                    return [...nuevaRuta, servicio.nombre];
                }
            }
        }

        if (Array.isArray(actual.subcategorias)) {
            for (const sub of actual.subcategorias) {
                const encontrada = buscarRuta(sub, nuevaRuta);
                if (encontrada !== null) {
                    return encontrada;
                }
            }
        }

        return null;
    }

    return buscarRuta(categoria, []);
}

function sumarServiciosRecursivo(categoria) {
    if (!categoria) {
        return 0;
    }

    let suma = 0;
    if (Array.isArray(categoria.servicios)) {
        for (const servicio of categoria.servicios) {
            suma += servicio.precio;
        }
    }

    if (Array.isArray(categoria.subcategorias)) {
        for (const sub of categoria.subcategorias) {
            suma += sumarServiciosRecursivo(sub);
        }
    }

    return suma;
}

function precioPaquete(categoria, descuento = 0.1) {
    const subtotal = sumarServiciosRecursivo(categoria);
    return subtotal * (1 - descuento);
}

function serviciosEnRango(categoria, min, max) {
    const resultados = [];

    function recolectar(actual) {
        if (!actual) {
            return;
        }

        if (Array.isArray(actual.servicios)) {
            for (const servicio of actual.servicios) {
                if (servicio.precio >= min && servicio.precio <= max) {
                    resultados.push(servicio);
                }
            }
        }

        if (Array.isArray(actual.subcategorias)) {
            for (const sub of actual.subcategorias) {
                recolectar(sub);
            }
        }
    }

    recolectar(categoria);
    return resultados;
}

module.exports = {
    catalogo,
    contarServicios,
    listarCatalogo,
    profundidad,
    buscarServicio,
    rutaDeServicio,
    sumarServiciosRecursivo,
    precioPaquete,
    serviciosEnRango
};