const carro = new Carrito();
const cardimg_btn_addshooping=document.querySelectorAll('#lista-productos .col .card .botonesactions');
const cardimg_btn_abuy_now   =document.querySelectorAll('#lista-productos .col .card .botonesactions');

const list_productscards= document.querySelectorAll('#lista-productos .cardimgitem');
const list_cardproducto = document.getElementsByClassName('cardimgitem');

list_productscards.forEach(function(card_body, index) {
    card_body.addEventListener('click',event=>{
        const producto = list_cardproducto[index];
        cargarcardimg(producto);
    })
});
//boton agregar al carrito
document.getElementById('addtocar_shoopping').addEventListener('click',(event)=>{
    const producto= document.querySelector('#modalproductllevar');
    carro.leerDatosProducto(producto);
});
//boton comprar card list
document.getElementById('mdaddandbuy_now').addEventListener('click',(event)=>{
    const producto= document.querySelector('#modalproductllevar');
    carro.leerDatosProducto_liscards_buy_now(producto);
});
//evento recorre lista de botones comprar_productocard y le añade un evento clic
// cardimg_btn_abuy_now.forEach(function(btn_buy_now, index) {
//     btn_buy_now.addEventListener('click',event=>{
//         const producto = list_cardproducto[index];
//        cargarcardimg(producto);
//    })
// });

// evento recorre lista de botones agregar-carrito y le añade un evento clic
// cardimg_btn_addshooping.forEach(function(btn_carshopp, index) {
//     btn_carshopp.addEventListener('click',event=>{
//         const producto = list_cardproducto[index];
//         // carro.leerDatosProducto_liscards(producto);
//                cargarcardimg(producto);
//     })
// });



const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');

cargarEventos();

stopfombuycards();
// window.onload=carro.cargareventimages();



function cargarEventos(){

    //Se ejecuta cuando se presionar agregar carrito
    // productos.addEventListener('click', (e)=>{carro.comprarProducto(e)});

    //Cuando se elimina productos del carrito
    // carrito.addEventListener('click', (e)=>{carro.eliminarProducto(e)});

    //Al vaciar carrito
    vaciarCarritoBtn.addEventListener('click', (e)=>{carro.vaciarCarrito(e)});

    //Al cargar documento se muestra lo almacenado en LS
    document.addEventListener('DOMContentLoaded', carro.obtenerProductosLocalStorage());

    //Enviar pedido a otra pagina
    procesarPedidoBtn.addEventListener('click', (e)=>{carro.procesarPedido(e)});
}

function stopfombuycards(){
    document.getElementById('form_compraview').addEventListener("click",event =>{
        event.preventDefault();
    });

    var contador=1;
    document.getElementById('btn_minvalnm').addEventListener("click",event =>{
        if (contador > 1) {
            contador=contador-1;
            txt_number_buy.innerHTML=contador;
        }else{
        }
    });
    document.getElementById('btn_masvalnm').addEventListener("click", event =>{
        contador=contador+1;
        txt_number_buy.innerHTML=contador;
    });

    var txt_number_buy= document.getElementById('nm_buyb');
}

function cargarcardimg(producto){
    console.log(producto);
        // OBTENCION DE SOURCE IMG 
        let id_product="";
        let urlImg="";
        let title_card="";
        let price_card="";
        const modal_show_id_productc=document.getElementById('id_productocard');
        const modal_show_prodtitle= document.getElementById('modal_title_product');
        const modal_show_prodimg= document.getElementById('img_modal_show');
        const modal_show_price=document.getElementById('price_modal_val');

        const infoProducto = {
            url_imagen : producto.querySelector('img').src,
            titulo: producto.querySelector('.card-title').textContent,
            precio: producto.querySelector('.img_pricecard').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        urlImg=infoProducto.url_imagen;
        title_card=infoProducto.titulo;
        price_card=infoProducto.precio;
        console.log("id dselected.",infoProducto.titulo); 
        //modal
        modal_show_id_productc.innerHTML=infoProducto.id;
        modal_show_prodtitle.innerHTML=title_card;
        modal_show_price.innerHTML=price_card;
        modal_show_prodimg.src=urlImg;
    }