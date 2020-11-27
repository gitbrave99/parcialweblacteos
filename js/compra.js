const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const listaCompra_footertb = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');
const list_btn_borrarproducto= document.querySelectorAll('#lista-compra tbody');



cargarEventos();
list_btn_borrarproducto.forEach(function(btn_borrprod, index){
    btn_borrprod.addEventListener('click', event=>{
        if (event.target.classList.contains('borrar-producto')) {
            compra.eliminarProducto(event);
        }
    });
    btn_borrprod.addEventListener('change', event=>{
        if (event.target.classList.contains('cantidad')) {
            compra.obtenerEvento(event);
            // compra.calcularTotal();
        }
    });
     btn_borrprod.addEventListener('keyup', event=>{
        if (event.target.classList.contains('cantidad')) {
            compra.obtenerEvento(event);
            // compra.calcularTotal();
        }
    });
});

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    compra.calcularTotal();
    procesarCompraBtn.addEventListener('click', procesarCompra);
}

function procesarCompra() {
    // e.preventDefault();
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "index.html";
        })
    }
    else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            showConfirmButton: false,
            timer: 2000
        })
    }
    else {
       emailjs.init('user_Zh2tv7HnR1a3m019Hh0rs');
        let cadena = "";
        productosLS = compra.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto) {
            cadena += `
            Producto : ${producto.titulo}
            Precio : ${producto.precio}
            Cantidad: ${producto.cantidad}
            `;
        });
        document.getElementById('detalleCompra').innerHTML = cadena;
        /* ------------------------- */

        var myform = $("form#procesar-pago");

        myform.submit((event) => {
            event.preventDefault();

            // Change to your service ID, or keep using the default service
            var service_id = "default_service";
            var template_id = "template_6vd51pu";

            const cargandoGif = document.querySelector('#cargando');
            cargandoGif.style.display = 'block';

            const enviado = document.createElement('img');
            enviado.src = 'img/mail.gif';
            enviado.style.display = 'block';
            enviado.width = '150';

            emailjs.sendForm(service_id, template_id, myform[0])
            .then(() => {
                cargandoGif.style.display = 'none';
                document.querySelector('#loaders').appendChild(enviado);

                setTimeout(() => {
                    compra.vaciarLocalStorage();
                    enviado.remove();
                    window.location = "index.html";
                }, 2000);


            }, (err) => {
                alert("Error al enviar el email\r\n Response:\n " + JSON.stringify(err));
                    // myform.find("button").text("Send");
                });

            return false;

        });

    }
}

