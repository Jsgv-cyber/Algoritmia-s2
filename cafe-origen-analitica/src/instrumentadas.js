
function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

// 1. Total vendido
function totalVendidoC(ventas, c) {
    let total = 0;

    for (const v of ventas) {
        c.ops++;
        total += valorVenta(v);
    }

    return total;
}

// 2. Venta de mayor valor
function ventaMayorC(ventas, c) {
    if (ventas.length === 0) {
        return null;
    }

    let mayor = ventas[0];
    c.ops++;

    for (let i = 1; i < ventas.length; i++) {
        c.ops += 2;

        if (valorVenta(ventas[i]) > valorVenta(mayor)) {
            mayor = ventas[i];
        }
    }

    return mayor;
}

// 3. Total vendido por ciudad
function totalPorCiudadC(ventas, c) {
    const resultado = {};

    for (const v of ventas) {
        c.ops++;

        if (!resultado[v.ciudad]) {
            resultado[v.ciudad] = 0;
        }

        resultado[v.ciudad] += valorVenta(v);
    }

    return resultado;
}

// 4. Primera venta
function primeraVentaC(ventas, c) {
    c.ops++;

    return ventas.length > 0 ? ventas[0] : null;
}

// 5. Total por ciudad utilizando métodos encadenados
function totalPorCiudadCadena(ventas) {
    const ciudades = [...new Set(ventas.map(v => v.ciudad))];

    return ciudades.map(ciudad => ({
        ciudad,
        total: ventas
            .filter(v => v.ciudad === ciudad)
            .reduce((suma, v) => suma + valorVenta(v), 0)
    }));
}

module.exports = {
    valorVenta,
    totalVendidoC,
    ventaMayorC,
    totalPorCiudadC,
    primeraVentaC,
    totalPorCiudadCadena
};
