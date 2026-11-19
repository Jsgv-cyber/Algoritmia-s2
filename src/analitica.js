
const ventas = require("./datos");

// 1. Calcular el total vendido
function totalVendido(ventas) {
    let total = 0;

    for (const venta of ventas) {
        total += venta.cantidad * venta.precio;
    }

    return total;
}

// 2. Calcular las unidades vendidas
function unidadesVendidas(ventas) {
    let total = 0;

    for (const venta of ventas) {
        total += venta.cantidad;
    }

    return total;
}

// 3. Encontrar la venta de mayor valor
function ventaMayor(ventas) {
    let mayor = null;

    for (const venta of ventas) {
        const valor = venta.cantidad * venta.precio;

        if (valor > 0 && (mayor === null ||
            valor > mayor.valor)) {
            mayor = {
                ...venta,
                valor: valor
            };
        }
    }

    return mayor;
}

// 4. Normalizar los nombres de las ciudades
function normalizarCiudad(texto) {
    const ciudad = texto.trim().toLowerCase();

    return ciudad.charAt(0).toUpperCase() +
           ciudad.slice(1);
}

// 5. Calcular las ventas por ciudad
function ventasPorCiudad(ventas) {
    const resultado = {};

    for (const venta of ventas) {
        const ciudad = normalizarCiudad(venta.ciudad);
        const valor = venta.cantidad * venta.precio;

        if (!resultado[ciudad]) {
            resultado[ciudad] = 0;
        }

        resultado[ciudad] += valor;
    }

    return resultado;
}

// 6. Calcular las unidades por producto
function unidadesPorProducto(ventas) {
    const resultado = {};

    for (const venta of ventas) {
        const producto = venta.producto;

        if (!resultado[producto]) {
            resultado[producto] = 0;
        }

        resultado[producto] += venta.cantidad;
    }

    return resultado;
}

// 7. Calcular el ticket promedio
function ticketPromedio(ventas) {
    let total = 0;
    let cantidadVentas = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += venta.cantidad * venta.precio;
            cantidadVentas++;
        }
    }

    if (cantidadVentas === 0) {
        return 0;
    }

    return total / cantidadVentas;
}

// 8. Encontrar los tres productos con mayor valor vendido
function topProductosPorValor(ventas) {
    const resultado = {};

    for (const venta of ventas) {
        const producto = venta.producto;
        const valor = venta.cantidad * venta.precio;

        if (!resultado[producto]) {
            resultado[producto] = 0;
        }

        resultado[producto] += valor;
    }

    return Object.entries(resultado)
        .map(([producto, valor]) => ({
            producto,
            valor
        }))
        .sort((a, b) => b.valor - a.valor)
        .slice(0, 3);
}

module.exports = {
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    normalizarCiudad,
    ventasPorCiudad,
    unidadesPorProducto,
    ticketPromedio,
    topProductosPorValor
};
