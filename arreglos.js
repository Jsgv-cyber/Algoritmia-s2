const ventas = [
  { id: 1, producto: "Teclado", categoria: "Periféricos",
    ciudad: "Medellín", valor: 120000 },
  { id: 2, producto: "Mouse", categoria: "Periféricos",
    ciudad: "Bogotá", valor: 45000 },
  { id: 3, producto: "Monitor", categoria: "Pantallas",
    ciudad: "Medellín", valor: 780000 },
  { id: 4, producto: "Webcam", categoria: "Periféricos",
    ciudad: "Cali", valor: 150000 },
  { id: 5, producto: "Monitor", categoria: "Pantallas",
    ciudad: "Bogotá", valor: 820000 }
    
];

console.table(ventas,["producto", "ciudad", "valor" ] );

