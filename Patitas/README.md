# Motor Clínico Patitas (`patitas-motor`) — v1.0

Sistema de gestión clínica veterinaria en **JavaScript (Node.js)** construido desde cero con estructuras de datos basadas en nodos y funciones recursivas.

## Qué hace el motor Patitas v1.0
* **Historiales clínicos (`ListaEnlazada` y `RegistroClinico`):** Registra atenciones cronológicas por mascota, calcula costos totales, busca registros y permite insertar o eliminar sin perder referencias.
* **Recepción por prioridad (`Cola` y `Recepcion`):** Atiende **Urgencias** antes que **Consultas Generales**, manteniendo orden **FIFO** dentro de cada fila, y simula jornadas clínicas con tiempos de espera.
* **Deshacer y rehacer (`Pila` y `Editor`):** Permite revertir o reaplicar cambios en los historiales mediante dos pilas **LIFO**, invalidando `rehacer` al realizar una nueva acción.
* **Catálogo jerárquico recursivo (`catalogo.js`):** Cuenta servicios a cualquier profundidad, imprime la jerarquía indentada, calcula profundidad, busca servicios y su ruta completa, filtra por rango de precios y calcula precios de paquetes con descuento único al final.
* **Operaciones recursivas en lista:** Incluye versiones recursivas sobre nodos (`tamanioRecursivo`, `costoTotalRecursivo`, `buscarRecursivo`, `imprimirAlReves`) para comparar costos de tiempo y pila de llamadas.

## Estructura del proyecto
```text
Patitas/
├── demo.js
├── README.md
├── bitacora.md
├── src/
│   ├── estructuras/
│   │   ├── Nodo.js
│   │   ├── ListaEnlazada.js
│   │   ├── Cola.js
│   │   └── Pila.js
│   └── dominio/
│       ├── RegistroClinico.js
│       ├── Recepcion.js
│       ├── Editor.js
│       └── catalogo.js
└── pruebas/
    └── todo.js