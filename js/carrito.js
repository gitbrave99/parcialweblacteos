class Carrito {
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
        //Enviamos el producto seleccionado para tomar sus datos
        this.leerDatosProducto(producto);
    }
}

//Leer datos del producto
leerDatosProducto(producto){
    const infoProducto = {
        imagen : producto.querySelector('img').src,
        titulo: producto.querySelector('#modal_title_product').textContent,
        precio: producto.querySelector('#price_modal_val').textContent,
        id: producto.querySelector('#id_productocard').textContent,
        cantidad: producto.querySelector('#nm_buyb').textContent
    }
    console.log("precio="+infoProducto.precio);
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (productoLS){
        if(productoLS.id === infoProducto.id){
            productosLS = productoLS.id;
        }
    });

    if(productosLS === infoProducto.id){
        Swal.fire({
            type: 'info',
            title: 'Oops...',
            text: 'El producto ya está agregado',
            showConfirmButton: false,
            timer: 1000
        })
    }
    else {
        console.log("seha ingresado a ls");
        this.insertarCarrito(infoProducto);
    }
}

 //Leer datos del producto
 leerDatosProducto_liscards(producto){
    const infoProducto = {
        imagen : producto.querySelector('img').src,
        titulo: producto.querySelector('h5').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (productoLS){
        if(productoLS.id === infoProducto.id){
            productosLS = productoLS.id;
            // ++count_shoppingp;
            // spancantproduct.innerHTML=count_shoppingp;
        }
    });

    if(productosLS === infoProducto.id){
        Swal.fire({
            type: 'info',
            title: 'Oops...',
            text: 'El producto ya está agregado',
            showConfirmButton: false,
            timer: 1000
        })
    }
    else {
        this.insertarCarrito(infoProducto);
    }
}

 //Leer datos apra comprar o prguntar si dese preoceder comrpa
 leerDatosProducto_liscards_buy_now(producto){
  const infoProducto = {
    imagen : producto.querySelector('img').src,
    titulo: producto.querySelector('#modal_title_product').textContent,
    precio: producto.querySelector('#price_modal_val').textContent,
    id: producto.querySelector('#id_productocard').textContent,
    cantidad: producto.querySelector('#nm_buyb').textContent
}
console.log("precio="+infoProducto.precio);
let productosLS;
productosLS = this.obtenerProductosLocalStorage();
productosLS.forEach(function (productoLS){
    if(productoLS.id === infoProducto.id){
        productosLS = productoLS.id;
    }
});

if(productosLS === infoProducto.id){

    location.href = "compra.html";
}
else {

    this.insertarCarrito(infoProducto);
    location.href = "compra.html";
}
}

//muestra producto seleccionado en carrito
insertarCarrito(producto){
    // const row = document.createElement('tr');
    // row.innerHTML = `
    // <td>
    // <img src="${producto.imagen}" width=100>
    // </td>
    // <td>${producto.titulo}</td>
    // <td>${producto.precio}</td>
    // <td>
    // <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
    // </td>
    // `;
    // listaProductos.appendChild(row);
    this.guardarProductosLocalStorage(producto);

}

//Eliminar el producto del carrito en el DOM
eliminarProducto(e){
    e.preventDefault();
    let producto, productoID;
    if(e.target.classList.contains('borrar-producto')){
        e.target.parentElement.parentElement.remove();
        producto = e.target.parentElement.parentElement;
        productoID = producto.querySelector('a').getAttribute('data-id');
    }
    this.eliminarProductoLocalStorage(productoID);
    this.calcularTotal();
}
//Elimina todos los productos
vaciarCarrito(e){
    e.preventDefault();
    this.vaciarLocalStorage();
   const span_count_products=document.querySelector('#cant_products_shoopping');
    span_count_products.innerHTML=0;
}

//Almacenar en el LS
guardarProductosLocalStorage(producto){
    const span_count_products=document.querySelector('#cant_products_shoopping');
    let productos;
    productos = this.obtenerProductosLocalStorage();
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
    var prson=JSON.stringify(productos);
    var obj = JSON.parse(prson);
    var length = Object.keys(obj).length;
    span_count_products.innerHTML=length;
    // console.log(length);
}

obtenerProductosLocalStorage(){
    const span_count_products=document.querySelector('#cant_products_shoopping');
    let productoLS;
    if(localStorage.getItem('productos') === null){
        productoLS = [];
    }
    else {
        productoLS = JSON.parse(localStorage.getItem('productos'));
        var length_products_array= Object.keys(productoLS).length;
        span_count_products.innerHTML=length_products_array;
        
    }
    return productoLS;
}

//Mostrar los productos guardados en el LS
leerLocalStorage(){
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto){
        //Construir plantilla
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
        <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
        `;
        listaProductos.appendChild(row);
    });
}

//Mostrar los productos guardados en el LS en compra.html
leerLocalStorageCompra(){
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>$ ${producto.precio}</td>
        <td>
        <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
        </td>
        <td >$<span id='subtotales'>${producto.precio * producto.cantidad}</span> </td>
        <td>
        <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
        </td>
        `;
        listaCompra_footertb.appendChild(row);
    });
}

//Eliminar producto por ID del LS
eliminarProductoLocalStorage(productoID){
    const span_count_products=document.querySelector('#cant_products_shoopping');
    let productosLS;
    //Obtenemos el arreglo de productos
    productosLS = this.obtenerProductosLocalStorage();
    //Comparar el id del producto borrado con LS
    productosLS.forEach(function(productoLS, index){
        if(productoLS.id === productoID){
            productosLS.splice(index, 1);
        }
    });
    //Añadimos el arreglo actual al LS
    localStorage.setItem('productos', JSON.stringify(productosLS));
    
    var prson=JSON.stringify(productosLS);
    var obj = JSON.parse(prson);
    var length = Object.keys(obj).length;
    span_count_products.innerHTML=length;
    console.log(length);
}

//Eliminar todos los datos del LS
vaciarLocalStorage(){
    localStorage.clear();
}

//Procesar pedido
procesarPedido(e){
    e.preventDefault();

    if(this.obtenerProductosLocalStorage().length === 0){
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'El carrito está vacío, agrega algún producto',
            showConfirmButton: false,
            timer: 2000
        })
    }
    else {
        location.href = "compra.html";
    }
}

//Calcular montos
calcularTotal(){
    let productosLS;
    let total = 0, iva = 0, subtotal = 0, total_final=0;
    productosLS = this.obtenerProductosLocalStorage();
    for(let i = 0; i < productosLS.length; i++){
        let element = Number(productosLS[i].precio * productosLS[i].cantidad);
        total = total + element;
    }
    iva = parseFloat(total * 0.13).toFixed(2);
    subtotal = parseFloat(total).toFixed(2);
    total_final=parseFloat(subtotal)+parseFloat(iva);

    document.getElementById('subtotal').innerHTML = "$ " + subtotal;
    document.getElementById('igv').innerHTML = "$ " + iva;
    document.getElementById('total').value = "$ " + total_final;
}

obtenerEvento(e) {
    e.preventDefault();
    let id, cantidad, producto, productosLS;
    if (e.target.classList.contains('cantidad')) {
        producto = e.target.parentElement.parentElement;
        id = producto.querySelector('a').getAttribute('data-id');
        cantidad = producto.querySelector('input').value;
        let actualizarMontos = document.querySelectorAll('#subtotales');
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS, index) {
            if (productoLS.id === id) {
                productoLS.cantidad = cantidad;                    
                actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
            }    
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
        this.calcularTotal();
    }
    else {
        console.log("click afuera");
    }
}
}
