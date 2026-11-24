const n1 = new Nodo ({motivo: "Vacunacion anual", costo: 85000});
const n2 = new Nodo ({motivo: "Control de peso", costo: 40000});
const n3 = new Nodo ({motivo: "Limpieza dental", costo: 150000});
n1.siguiente = n2;
n2.siguiente = n3;
const cabeza = n1;