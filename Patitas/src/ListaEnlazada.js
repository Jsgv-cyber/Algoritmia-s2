function agregarAlInicio(dato) {
    const nuevo = new Nodo(dato);
    nuevo.siguiente = this.cabeza;
    this.cabeza = nuevo;
}