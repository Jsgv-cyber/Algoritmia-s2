
const generarVentas = require("./generador");
const clientesRecurrentes = require("./recurrentes");

const {
    totalVendidoC,
    ventaMayorC,
    totalPorCiudadC,
    primeraVentaC
} = require("./instrumentadas");

// CANTIDADES DE VENTAS PARA LAS PRUEBAS
const cantidades = [100, 1000, 10000, 100000];

console.log("\n===== CAFÉ ORIGEN: ANÁLISIS BIG O =====");

// PRIMERA PRUEBA: CONTADOR DE OPERACIONES

console.log("\n===== CONTADOR DE OPERACIONES =====");

console.log(
    "Ventas".padEnd(12),
    "Total vendido".padEnd(16),
    "Venta mayor".padEnd(16),
    "Por ciudad".padEnd(16),
    "Primera venta"
);

for (const n of cantidades) {

    const ventas = generarVentas(n);

    const c1 = { ops: 0 };
    const c2 = { ops: 0 };
    const c3 = { ops: 0 };
    const c4 = { ops: 0 };

    totalVendidoC(ventas, c1);
    ventaMayorC(ventas, c2);
    totalPorCiudadC(ventas, c3);
    primeraVentaC(ventas, c4);

    console.log(
        String(n).padEnd(12),
        String(c1.ops).padEnd(16),
        String(c2.ops).padEnd(16),
        String(c3.ops).padEnd(16),
        c4.ops
    );
}

// SEGUNDA PRUEBA: TIEMPO DE EJECUCIÓN

console.log("\n===== TIEMPO DE CLIENTES RECURRENTES =====");

const tamanos = [1000, 2000, 4000, 8000, 16000];

for (const n of tamanos) {

    const ventas = generarVentas(n);

    console.log(`\nCantidad de ventas: ${n}`);

    console.time(`Tiempo para ${n} ventas`);

    const recurrentes = clientesRecurrentes(ventas);

    console.timeEnd(`Tiempo para ${n} ventas`);

    console.log(
        "Clientes recurrentes encontrados:",
        recurrentes.length
    );
}
