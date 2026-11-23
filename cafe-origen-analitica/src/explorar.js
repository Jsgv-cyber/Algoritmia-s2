
const ventas = require("./datos");

console.log("===== EXPLORACIÓN DE VENTAS =====");

// 1. Cantidad de registros
console.log("Registros:", ventas.length);

// 2. Primera venta
console.log("Primera venta:", ventas[0]);

// 3. Última venta
console.log("Última venta:", ventas[ventas.length - 1]);

// 4. Consultar un producto por su posición
console.log("Producto en la posición 4:", ventas[4].producto);

// 5. Consultar una posición inexistente
console.log("Venta en la posición 12:", ventas[12]);

// 6. Mostrar todas las ventas en una tabla
console.log("\n===== TABLA DE VENTAS =====");
console.table(ventas);

// 7. Mostrar únicamente las ciudades
console.log("\n===== CIUDADES REGISTRADAS =====");

console.log(
    ventas.map(v => v.ciudad).join(" | ")
);

// 8. Identificar clientes registrados
console.log("\n===== CLIENTES REGISTRADOS =====");

console.log(
    ventas.map(v => v.cliente).join(" | ")
);

// 9. Identificar ventas con cantidad cero
console.log("\n===== VENTAS SIN UNIDADES =====");

console.table(
    ventas.filter(v => v.cantidad === 0)
);

// 10. Agregar una nueva venta
const nuevaVenta = {
    id: 13,
    fecha: "2026-09-07",
    cliente: "C09",
    producto: "Origen Huila 500 g",
    ciudad: "Medellín",
    cantidad: 2,
    precio: 42000
};

ventas.push(nuevaVenta);

console.log("\n===== NUEVA VENTA AGREGADA =====");

console.log("Total de registros:", ventas.length);
console.log("Nueva venta:", ventas[ventas.length - 1]);
