var pedidoHeader = document.querySelector(".pedido__header");
var pedidoHeaderClose = document.querySelector(".pedido__header__close");
var pedido = document.querySelector(".pedido");
var pedidoBody = document.querySelector(".pedido__body");
var isOpen = false;


pedidoHeader.addEventListener("click", function () { managePedidoContainer(false) });

function managePedidoContainer(platoClick) {
    if (isOpen) {
        if (!platoClick) {
            closePedidoContainer();
        }
    }
    else {
        openPedidoContainer();
    }
}

function openPedidoContainer() {
    isOpen = true;
    pedido.style.transform = "translateY(0px)";
    pedidoHeaderClose.innerHTML = ">";
}

function closePedidoContainer() {
    isOpen = false;
    pedido.style.transform = "translateY(" + pedidoBody.offsetHeight + "px)";
    pedidoHeaderClose.innerHTML = "<";
}