platos.forEach(plato => plato.addEventListener('click', function () {
    actualizarPedido(plato, mostrarTotal);
    managePedidoContainer(true);
}));


function actualizarPedido(plato, mostrar) {
    //añadimos el plato a la lista del pedido
    addPlatoPedido(plato);
    //actualizar total
    pedido.dataset.preciopedido = (parseFloat(pedido.dataset.preciopedido) + parseFloat(plato.dataset.precio)).toFixed(2);

    mostrar();

}


function addPlatoPedido(plato) {
    let nuevoPlato = document.createElement("div");
    nuevoPlato.classList.add("pedido__body__plato");

    let nombre = document.createElement("span");
    nombre.innerText = plato.dataset.nombre;

    let precio = document.createElement("span");
    precio.innerText = plato.dataset.precio + "€";

    nuevoPlato.appendChild(nombre);
    nuevoPlato.appendChild(precio);

    document.querySelector(".pedido__body").appendChild(nuevoPlato);
}

function mostrarTotal() {
    //mostrar total
    document.querySelector(".pedido__body__total__precio").innerHTML = pedido.dataset.preciopedido + "€";
}
