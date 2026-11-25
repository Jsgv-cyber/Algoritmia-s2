# Bitácora — Patitas Motor v0.1 (Sesión 7)

## MiniReto 1: Nodos y enlace manual
Diagrama inicial:
`cabeza -> [02/02 Vacunación] -> [15/03 Control] -> [20/05 Limpieza] -> null`

Si se pierde un enlace (por ejemplo, `n1.siguiente = null`):
`cabeza -> [02/02 Vacunación] -> null`   `[15/03 Control] -> [20/05 Limpieza] -> null`
Al recorrer desde `cabeza`, el ciclo `while (actual !== null)` se detiene tras imprimir la primera atención porque `n1.siguiente` es `null`. Los nodos siguientes quedan desconectados de la cadena alcanzada desde `cabeza` (en un lenguaje sin recolector de basura serían fuga de memoria; en JS quedan sin referencia desde `cabeza` y son elegibles para garbage collection si no hay otra variable apuntando a ellos).

## MiniReto 2: Inserción al inicio y al final (`O(1)`)
- **Lista vacía + `agregarAlFinal(X)`**: `cabeza = X`, `cola = X`, `tamanio = 1`.
- **Lista vacía + `agregarAlInicio(X)`**: `cabeza = X`, `cola = X`, `tamanio = 1`.
- **1 nodo `[A]` + `agregarAlFinal(B)`**: `A.siguiente = B`, `cola = B`, `tamanio = 2`.
- **1 nodo `[A]` + `agregarAlInicio(B)`**: `B.siguiente = A`, `cabeza = B`, `tamanio = 2`.
- **Varios nodos (`cabeza -> [A] -> [B] <- cola`) + `agregarAlFinal(C)`**: `B.siguiente = C`, `cola = C`, `tamanio = 3`.
- **Varios nodos (`cabeza -> [A] -> [B] <- cola`) + `agregarAlInicio(Z)`**: `Z.siguiente = A`, `cabeza = Z`, `tamanio = 3`.

Complejidad por operación en `ListaEnlazada`:
- `agregarAlInicio`: `O(1)`
- `agregarAlFinal`: `O(1)` (con puntero `cola`)
- `recorrer` / `aArreglo`: `O(n)`
- `estaVacia` / `obtenerTamanio`: `O(1)`

## MiniReto 3: Eliminación — Casos en diagrama
1. **Eliminar cabeza**: `cabeza -> [A] -> [B] -> [C] -> null`  ==>  `cabeza = A.siguiente`  ==>  `cabeza -> [B] -> [C] -> null`.
2. **Eliminar intermedio (`[B]`)**: `[A] -> [B] -> [C]`  ==>  `A.siguiente = B.siguiente`  ==>  `[A] -> [C]`.
3. **Eliminar cola (`[C]`)**: `[A] -> [B] -> [C] <- cola`  ==>  `B.siguiente = null`, `cola = B`  ==>  `[A] -> [B] <- cola`.

Complejidades MiniReto 3:
- `buscar`: `O(n)`
- `insertarDespuesDe`: `O(n)` (recorre hasta encontrar el nodo)
- `eliminar`: `O(n)`

**¿Por qué eliminar la cola en una lista simplemente enlazada requiere recorrerla?**
Porque cada nodo solo guarda la referencia `siguiente` (hacia adelante) y no `anterior` (hacia atrás). Para actualizar `this.cola` al nodo previo y asignar `anterior.siguiente = null`, hay que recorrer desde `this.cabeza` hasta llegar al penúltimo nodo.

## MiniReto 4: Tabla comparativa — `ListaEnlazada` vs. `Arreglo`

| Operación | `ListaEnlazada` | `Arreglo` |
| :--- | :--- | :--- |
| Agregar al final | `O(1)` (con puntero `cola`) | `O(1)` amortizado (`push`) |
| Agregar al inicio | `O(1)` | `O(n)` (`unshift` desplaza elementos) |
| Acceder a la atención número `k` | `O(n)` (recorre paso a paso) | `O(1)` (acceso directo por índice) |
| Buscar | `O(n)` | `O(n)` |
| Eliminar la primera | `O(1)` (actualiza `cabeza`) | `O(n)` (`shift` desplaza elementos) |