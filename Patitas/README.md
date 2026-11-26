# Motor Clínico Patitas (`patitas-motor`) — v1.0

Sistema de gestión clínica veterinaria desarrollado en **JavaScript (Node.js)**, construido desde cero mediante estructuras de datos basadas en nodos y funciones recursivas.

## ¿Qué hace el motor Patitas v1.0?

- **Historiales clínicos (`ListaEnlazada` y `RegistroClinico`):** Registra atenciones cronológicas por mascota, calcula costos totales, busca registros y permite insertar o eliminar elementos.
- **Recepción por prioridad (`Cola` y `Recepcion`):** Atiende urgencias antes que consultas generales, manteniendo el orden FIFO dentro de cada fila.
- **Deshacer y rehacer (`Pila` y `Editor`):** Permite revertir y reaplicar cambios en los historiales mediante dos pilas LIFO.
- **Catálogo jerárquico recursivo (`catalogo.js`):** Cuenta servicios, imprime la jerarquía, calcula profundidad, busca servicios, obtiene rutas, filtra precios y calcula paquetes con descuentos.
- **Operaciones recursivas en listas:** Incluye `tamanioRecursivo`, `costoTotalRecursivo`, `buscarRecursivo` e `imprimirAlReves`.

## Requisitos

- Node.js instalado.
- Terminal o consola de comandos.
- Proyecto descargado en el equipo.

Para comprobar que Node.js está instalado:

```bash
node --version
```

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
    ├── todo.js
    ├── nodos.js
    ├── cola.js
    ├── pila.js
    ├── lista.js
    ├── recepcion.js
    └── editor.js
```

## Ejecución del proyecto

Abre una terminal y ubícate en la carpeta principal:

```bash
cd ~/Algoritmia-s2/Patitas
```

Ejecuta la demostración general:

```bash
node demo.js
```

Este archivo muestra las funcionalidades principales del motor clínico Patitas, incluyendo el catálogo de servicios, la recepción de pacientes, los historiales clínicos y las operaciones de deshacer y rehacer.

## Pruebas del proyecto

El proyecto cuenta con pruebas individuales para verificar el funcionamiento de cada estructura y módulo, además de una prueba integrada.

Todos los comandos deben ejecutarse desde la carpeta principal `Patitas`.

### 1. Prueba de nodos

```bash
node pruebas/nodos.js
```

Verifica la creación de nodos, sus enlaces y la información almacenada.

### 2. Prueba de cola

```bash
node pruebas/cola.js
```

Comprueba:

- Encolar elementos.
- Desencolar elementos.
- Consultar el primer elemento.
- Verificar si la cola está vacía.
- Mantener el orden FIFO.

### 3. Prueba de pila

```bash
node pruebas/pila.js
```

Comprueba:

- Apilar elementos.
- Desapilar elementos.
- Consultar el elemento superior.
- Verificar si la pila está vacía.
- Mantener el orden LIFO.

### 4. Prueba de lista enlazada

```bash
node pruebas/lista.js
```

Verifica:

- Inserción de elementos.
- Búsqueda de registros.
- Eliminación de elementos.
- Recorrido de la lista.
- Manejo de casos especiales.
- Operaciones recursivas.

### 5. Prueba de recepción

```bash
node pruebas/recepcion.js
```

Comprueba:

- Atención de urgencias antes que consultas generales.
- Orden FIFO dentro de cada fila.
- Gestión de pacientes.

### 6. Prueba del editor

```bash
node pruebas/editor.js
```

Verifica:

- Agregar registros.
- Eliminar registros.
- Deshacer cambios.
- Rehacer cambios.

### 7. Prueba integrada

```bash
node pruebas/todo.js
```

Ejecuta el conjunto de pruebas del proyecto para comprobar el funcionamiento general de las estructuras y funcionalidades.

Si todas las pruebas se ejecutan correctamente, se mostrará un resumen indicando que fueron aprobadas.

## Consideraciones sobre el catálogo

El catálogo permite filtrar servicios mediante un precio mínimo y un precio máximo.

El límite mínimo está incluido y el límite máximo está excluido.

Por ejemplo, para un rango entre $80.000 y $150.000, se incluyen los servicios cuyo precio sea mayor o igual a $80.000 y menor que $150.000.

Los precios de los paquetes aplican el descuento una sola vez sobre el total.

## Estructuras de datos implementadas

| Estructura | Archivo | Funcionalidad principal |
|---|---|---|
| Nodo | `Nodo.js` | Almacena información y referencias a otros nodos. |
| Lista enlazada | `ListaEnlazada.js` | Gestiona registros clínicos. |
| Cola | `Cola.js` | Organiza la atención mediante FIFO. |
| Pila | `Pila.js` | Gestiona operaciones mediante LIFO. |

## Tecnologías utilizadas

- JavaScript.
- Node.js.
- Estructuras de datos.
- Programación orientada a objetos.
- Recursividad.
- Modularización.

## Estado del proyecto

**Motor Clínico Patitas — Versión 1.0**

Proyecto académico desarrollado para aplicar estructuras de datos, programación orientada a objetos, modularización y recursividad mediante JavaScript.