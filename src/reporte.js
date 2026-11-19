
const ventas = require("./datos");

const {
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ventasPorCiudad,
    ticketPromedio,
    topProductosPorValor
} = require("./analitica");

function formatoPesos(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

// RESUMEN GENERAL

console.log("\n===== CAFÉ ORIGEN - REPORTE V0.1 =====");

console.log("\nResumen general");

console.log("Total vendido:", formatoPesos(totalVendido(ventas)));

console.log("Unidades vendidas:", unidadesVendidas(ventas));

console.log("Ticket promedio:", formatoPesos(ticketPromedio(ventas)));

const mayor = ventaMayor(ventas);

if (mayor) {
    console.log(
        "Venta mayor:",
        formatoPesos(mayor.valor),
        `(venta ${mayor.id}, ${mayor.cliente}, ${mayor.producto}, ${mayor.ciudad})`
    );
}

// VENTAS POR CIUDAD

console.log("\nVentas por ciudad");

for (const [ciudad, total] of Object.entries(ventasPorCiudad(ventas))) {
    console.log(ciudad + ":", formatoPesos(total));
}

// TOP 3 PRODUCTOS

console.log("\nTop 3 por valor");

const top3 = topProductosPorValor(ventas);

top3.forEach((producto, indice) => {
    console.log(
        `${indice + 1}. ${producto.producto}: ${formatoPesos(producto.valor)}`
    );
});

// REPORTE DE UN DÍA ESPECÍFICO

function reporteDiario(ventas, fecha) {
    const ventasDia = ventas.filter(venta => venta.fecha === fecha);

    const total = totalVendido(ventasDia);
    const unidades = unidadesVendidas(ventasDia);
    const ticket = ticketPromedio(ventasDia);

    console.log("\n===== REPORTE DIARIO =====");

    console.log("Fecha:", fecha);
    console.log("Cantidad de ventas:", ventasDia.filter(v => v.cantidad > 0).length);
    console.log("Unidades:", unidades);
    console.log("Total:", formatoPesos(total));
    console.log("Ticket promedio:", formatoPesos(ticket));
}

reporteDiario(ventas, "2026-09-07");
