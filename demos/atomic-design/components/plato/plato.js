var platos = document.querySelectorAll('.plato');
var imgs = document.querySelectorAll('.plato__img');
var pedido = document.querySelector('.pedido__body');


let platos_array = getPlatosJson();
let i = 0;
let found = false;
platos.forEach(plato => {
    while (!found && i < platos_array.length) {
        if (platos_array[i].id == plato.dataset.id) {
            found = true;
            plato.dataset.nombre = platos_array[i].nombre;
            plato.dataset.precio = platos_array[i].precio;
            plato.dataset.desc = platos_array[i].desc;
            refreshPlato(plato);
        }
        i++;
    }

    found = false;
    i=0;
});


function getPlatosJson() {
    return data_platos;
}

function refreshPlato(plato) {
    plato.querySelector("h3").innerHTML = plato.dataset.nombre;
    plato.querySelector("h4").innerHTML = plato.dataset.precio + "€";
    plato.querySelector("p").innerHTML = plato.dataset.desc;
}