# Bitácora Técnica Completa — Motor Clínico Patitas (v0.1, v0.2 y v1.0)

Este documento registra el proceso de desarrollo del motor clínico Patitas, las estructuras de datos implementadas, las decisiones técnicas, los conceptos de recursividad y el análisis de complejidad de los 12 MiniRetos.

---

## MiniRetos 1 a 4 (v0.1 — Historiales con ListaEnlazada)

### Estructuras y conceptos implementados

- **Nodo (`src/estructuras/Nodo.js`):** Unidad básica de la lista enlazada. Contiene el dato y una referencia al siguiente nodo. Si se pierde una referencia, por ejemplo mediante `n1.siguiente = null`, los nodos posteriores dejan de ser accesibles desde ese enlace, salvo que existan otras referencias.

- **ListaEnlazada (`src/estructuras/ListaEnlazada.js`):** Mantiene las referencias `cabeza` y `cola`, además de un contador de `tamanio`. Esto permite realizar operaciones como `agregarAlInicio` y `agregarAlFinal` en tiempo O(1).

- **Eliminación de la cola:** En una lista simplemente enlazada es necesario recorrer desde la cabeza para encontrar el nodo anterior a la cola. Por esta razón, eliminar el último elemento tiene un costo O(n).

- **RegistroClinico (`src/dominio/RegistroClinico.js`):** Asocia cada mascota con su propio historial clínico mediante un `Map`. Cada historial se gestiona utilizando una instancia de `ListaEnlazada`.

### Aprendizajes

- Funcionamiento de los nodos y sus referencias.
- Construcción de listas enlazadas.
- Inserción y eliminación de elementos.
- Manejo de casos especiales, como listas vacías y listas con un solo elemento.
- Organización de historiales clínicos independientes por mascota.

---

## MiniRetos 5 a 8 (v0.2 — Colas, Prioridades, Pilas y Simulación)

### Cola FIFO

**Archivo:** `src/estructuras/Cola.js`

La estructura `Cola` utiliza nodos y mantiene referencias al `frente` y al `final`.

Sus operaciones principales son:

- `encolar`: agrega un elemento al final.
- `desencolar`: retira el primer elemento.
- Consulta del primer elemento.
- Verificación de si la cola está vacía.

Las operaciones de encolar y desencolar tienen un costo O(1), gracias al uso de referencias directas.

A diferencia de una implementación basada en `Array.prototype.shift()`, que desplaza los elementos restantes y puede requerir O(n) por operación, la cola enlazada evita esos desplazamientos.

### Recepción por prioridades

**Archivo:** `src/dominio/Recepcion.js`

El sistema de recepción gestiona dos colas independientes:

- `urgencias`
- `generales`

La regla de atención establece que primero se atienden las urgencias. Cuando esta cola queda vacía, se atienden las consultas generales.

Dentro de cada fila se conserva el orden FIFO: el primero en llegar es el primero en ser atendido.

### Pila LIFO y Editor

**Archivos:**

- `src/estructuras/Pila.js`
- `src/dominio/Editor.js`

La estructura `Pila` utiliza nodos y una referencia al `tope`.

Sus operaciones principales son:

- Apilar elementos.
- Desapilar elementos.
- Consultar el elemento superior.
- Verificar si la pila está vacía.

Las operaciones principales de la pila tienen un costo O(1).

El módulo `Editor` utiliza dos pilas:

- `pilaDeshacer`: almacena las acciones que pueden revertirse.
- `pilaRehacer`: almacena las acciones que pueden reaplicarse.

Cuando se realiza una nueva acción, se limpia la pila de rehacer para evitar reaplicar cambios que ya no corresponden al estado actual del historial.

### Aprendizajes

- Diferencias entre FIFO y LIFO.
- Implementación de colas y pilas mediante nodos.
- Gestión de prioridades mediante dos colas.
- Uso de pilas para implementar deshacer y rehacer.
- Simulación del flujo de atención de pacientes.

---

## MiniReto 9 — Catálogo Recursivo y Diseño de Funciones

El catálogo de servicios se organiza jerárquicamente mediante categorías que pueden contener servicios y otras subcategorías.

Para recorrer esta estructura se implementaron funciones recursivas.

### Diseño recursivo: caso base, reducción y combinación

**1. `contarServicios(categoria)`**

- **Caso base:** Si una categoría no tiene subcategorías, se cuentan únicamente sus servicios propios.
- **Reducción:** Se llama recursivamente a la función para cada subcategoría.
- **Combinación:** Se suman los servicios propios y los resultados obtenidos de las subcategorías.

**2. `listarCatalogo(categoria, nivel)`**

- **Caso base:** No existen subcategorías adicionales que recorrer.
- **Reducción:** Se invoca la función para cada subcategoría, incrementando el nivel de profundidad.
- **Combinación:** Se imprime la categoría actual y sus elementos con la sangría correspondiente mediante `"  ".repeat(nivel)`.

**3. `profundidad(categoria)`**

- **Caso base:** Si no existen subcategorías (`subcategorias.length === 0`), retorna `1`.
- **Reducción:** Se calcula recursivamente la profundidad de cada subcategoría.
- **Combinación:** Se retorna `1 + max(profundidad de las subcategorías)`.

### Traza de la pila de llamadas para `contarServicios` en "Cirugías"

1. `contarServicios(Cirugías)` encuentra 0 servicios propios y llama a las subcategorías `Esterilización` y `Limpieza dental`.
2. `contarServicios(Esterilización)` encuentra 2 servicios (`Gata` y `Perra`) y retorna `2`.
3. `contarServicios(Limpieza dental)` encuentra 1 servicio (`Con anestesia`) y retorna `1`.
4. `contarServicios(Cirugías)` combina los resultados: `0 + 2 + 1`, por lo que retorna `3`.

### Aprendizajes

- Recorrido de estructuras jerárquicas.
- Identificación de casos base.
- Reducción del problema mediante llamadas recursivas.
- Combinación de resultados.
- Seguimiento de la pila de llamadas.

---

## MiniReto 10 — Búsquedas, Rutas, Paquetes y Error del Descuento Repetido

En este MiniReto se implementaron funciones para buscar servicios, identificar su ubicación dentro del catálogo, calcular precios de paquetes y filtrar servicios por precio.

### Funciones implementadas

- **`buscarServicio`:** Busca un servicio dentro del catálogo y utiliza retorno temprano cuando encuentra una coincidencia.
- **`rutaDeServicio`:** Permite obtener la ruta jerárquica de un servicio dentro del catálogo.
- **`precioPaquete`:** Calcula el precio de los servicios de una categoría y aplica el descuento correspondiente una sola vez sobre el total.
- **`serviciosEnRango`:** Filtra los servicios según un precio mínimo y un precio máximo.

### Por qué es incorrecto aplicar el 10% de descuento en cada llamada recursiva

Supongamos la categoría "Cirugías", que contiene:

- Esterilización: $280.000 + $350.000 = $630.000.
- Limpieza dental: $150.000.

El total sin descuento es:

$630.000 + $150.000 = $780.000.

Aplicando un descuento único del 10%:

$780.000 × 0,9 = $702.000.

Si se aplicara el descuento en cada llamada recursiva, se obtendrían estos resultados:

- Esterilización: $630.000 × 0,9 = $567.000.
- Limpieza dental: $150.000 × 0,9 = $135.000.
- Al combinar los resultados y aplicar nuevamente el descuento: ($567.000 + $135.000) × 0,9 = $631.800.

Esto representa un descuento efectivo del 19%, en lugar del 10% establecido.

**Decisión de implementación:** Primero se acumulan los precios de todos los servicios y después se aplica el descuento una sola vez al resultado final.

### Consideración sobre `serviciosEnRango`

El filtro utiliza un límite mínimo inclusivo y un límite máximo exclusivo:

- Incluye servicios cuyo precio sea mayor o igual al mínimo.
- Excluye servicios cuyo precio sea igual o superior al máximo.

La condición implementada es:

`servicio.precio >= min && servicio.precio < max`

Por ejemplo, para el rango `[80000, 150000)`, se incluyen los servicios desde $80.000 hasta valores inferiores a $150.000. Un servicio que cueste exactamente $150.000 no se incluye.

### Aprendizajes

- Búsqueda recursiva en estructuras jerárquicas.
- Obtención de rutas dentro de un catálogo.
- Acumulación de resultados recursivos.
- Aplicación correcta de descuentos.
- Filtrado de elementos mediante condiciones de rango.

---

## MiniReto 11 — Historial Recursivo, Call Stack y Comparativa

En este MiniReto se incorporaron operaciones recursivas a la lista enlazada para comparar sus características con las versiones iterativas.

### Operaciones recursivas

Se implementaron las siguientes operaciones sobre los nodos:

- `tamanioRecursivo`
- `costoTotalRecursivo`
- `buscarRecursivo`
- `imprimirAlReves`

### Por qué `imprimirAlReves()` invierte el orden sin arreglos ni pilas explícitas

Cada llamada recursiva a `recorrerInverso(nodo.siguiente)` agrega un marco a la pila de llamadas (*call stack*) del motor de JavaScript.

La instrucción que imprime el dato se ejecuta después de la llamada recursiva.

Cuando se alcanza el final de la lista (`nodo === null`), las llamadas comienzan a retornar en orden LIFO. Por esta razón, primero se imprime el último nodo y finalmente la cabeza de la lista.

No se necesita crear una pila manual ni un arreglo auxiliar, porque el propio mecanismo de llamadas recursivas conserva el orden de retorno.

### Desbordamiento con 100.000 nodos

La recursividad consume memoria en la pila de llamadas.

Al ejecutar una operación como `tamanioRecursivo()` sobre una lista de 100.000 nodos, se pueden generar demasiadas llamadas anidadas.

Cuando se supera el límite de profundidad de la pila de llamadas de V8/Node.js, puede producirse el error:

`RangeError: Maximum call stack size exceeded`

Por esta razón, las operaciones recursivas deben utilizarse considerando la cantidad de elementos y la profundidad de las llamadas.

### Tabla comparativa: iterativo vs. recursivo en ListaEnlazada

| Operación | Tiempo iterativo | Memoria iterativa | Tiempo recursivo | Memoria recursiva (call stack) | Decisión y justificación |
|---|---|---|---|---|---|
| Tamaño / Conteo | O(1), utilizando `this.tamanio` | O(1) | O(n) | O(n) | Iterativo: aprovecha el contador existente y evita llamadas adicionales. |
| Costo total | O(n) | O(1) | O(n) | O(n) | Iterativo: conserva el mismo tiempo y utiliza memoria constante. |
| Búsqueda | O(n) | O(1) | O(n) | O(n) | Iterativo: evita el consumo adicional de la pila de llamadas. |
| Imprimir al revés | O(n), con estructura auxiliar | O(n) | O(n) | O(n) | Recursivo en historiales acotados: evita una estructura auxiliar explícita, aunque utiliza la pila de llamadas. |

### Aprendizajes

- Funcionamiento de la pila de llamadas.
- Diferencias entre recursividad e iteración.
- Costos de tiempo y memoria.
- Riesgos de desbordamiento de pila.
- Selección de la implementación según el tamaño de los datos.

---

## MiniReto 12 — Cierre y Resumen de los 12 MiniRetos (Patitas v1.0)

El proyecto integra los conocimientos desarrollados durante los 12 MiniRetos.

### Resumen del proceso

1. **Consulta cero:** Creación de nodos y enlaces manuales.
2. **Historial como lista:** Implementación de `ListaEnlazada` con referencias a `cabeza` y `cola`.
3. **Corregir historial:** Operaciones de búsqueda, inserción y eliminación con manejo de casos especiales.
4. **Patitas v0.1:** Implementación de `RegistroClinico` y gestión de atenciones y costos.
5. **Sala de espera:** Implementación de una cola FIFO mediante nodos.
6. **Urgencias primero:** Implementación de `Recepcion` con dos colas y simulación de atención.
7. **Deshacer y rehacer:** Implementación de `Pila` y `Editor` con historial reversible.
8. **Patitas v0.2:** Integración de simulación, prioridades y registros clínicos.
9. **Catálogo anidado:** Recorrido recursivo de jerarquías mediante `contarServicios`, `listarCatalogo` y `profundidad`.
10. **Rutas y paquetes:** Implementación de `buscarServicio`, `rutaDeServicio`, `precioPaquete` y `serviciosEnRango`.
11. **Historial recursivo:** Implementación de métodos recursivos en `ListaEnlazada` y análisis de la pila de llamadas.
12. **Patitas v1.0:** Organización final en las carpetas `estructuras/` y `dominio/`, integración mediante `demo.js`, pruebas y documentación del proyecto.

---

## Validación final del proyecto

Para comprobar el funcionamiento de los módulos se ejecutaron pruebas individuales y una prueba integrada.

Los comandos se ejecutan desde la carpeta principal `Patitas`.

### Demostración general

```bash
node demo.js
```

Permite comprobar el funcionamiento integrado de las funcionalidades principales del motor clínico.

### Pruebas individuales

```bash
node pruebas/nodos.js
node pruebas/cola.js
node pruebas/pila.js
node pruebas/lista.js
node pruebas/recepcion.js
node pruebas/editor.js
```

Estas pruebas verifican los nodos, las estructuras de datos, la recepción de pacientes, las listas enlazadas y las operaciones del editor.

### Prueba integrada

```bash
node pruebas/todo.js
```

Ejecuta las verificaciones generales del proyecto.

**Resultado de la validación:** Las pruebas individuales y la prueba integrada finalizaron correctamente. La prueba integrada mostró el mensaje:

`Resumen: TODAS LAS PRUEBAS OK`

---

## Elección de estructuras de datos

Las estructuras fueron seleccionadas de acuerdo con las necesidades del motor clínico:

- **ListaEnlazada:** Para almacenar secuencias de atenciones clínicas y permitir inserciones y eliminaciones.
- **Cola:** Para organizar la atención de pacientes respetando el orden FIFO.
- **Dos colas:** Para separar las urgencias de las consultas generales y aplicar prioridades.
- **Pila:** Para implementar las operaciones de deshacer y rehacer mediante el comportamiento LIFO.
- **Map:** Para asociar cada mascota con su historial clínico.
- **Recursividad:** Para recorrer el catálogo jerárquico y realizar operaciones recursivas sobre los historiales.

La integración de estas estructuras permite construir un motor clínico modular, organizado y funcional, aplicando los conceptos de estructuras de datos, programación orientada a objetos, análisis de complejidad y recursividad.

---

**Proyecto:** Motor Clínico Patitas  
**Versión:** 1.0  
**Lenguaje:** JavaScript  
**Entorno de ejecución:** Node.js