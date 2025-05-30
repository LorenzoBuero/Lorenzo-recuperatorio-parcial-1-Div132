/* Instrucciones del Parcial

    - Responde los puntos en orden.
    - Se valorará:
        * Código limpio
        * Comentarios claros
        * Separación en bloques funcionales
        * Buen uso de funciones/modularización

    IMPORTANTE:
    - El trabajo debe desarrollarse utilizando buenas buenas prácticas de programación en JavaScript.
*/

/* Punto 1 _________________________

    Este parcial consiste en crear el frontend de una tienda de frutas.
    Para ello ya se dispone del HTML y deberás programar el JavaScript necesario.

    1. Almacena tus datos personales (nombre, apellido, DNI) en un objeto y:
        - Imprime tu nombre y apellido en la etiqueta del <nav> (donde corresponda).
        - Imprímelo también en la consola.
*/

/* Punto 2 _________________________

    Simula la carga de datos desde un archivo `db.json`. Este debe tener objetos con esta estructura:
    {
        "id": 1,
        "nombre": "arandano",
        "precio": 5000,
        "img": "img/arandano.jpg"
    }
*/

/* Punto 3 _________________________

    Imprime los productos en pantalla al cargar la página.
    Agrega esta funcionalidad dentro de la función `init()`.

    El HTML que debes agregar por cada producto es el siguiente:

        <div class="product-card">
            <img src="ruta" alt="nombre">
            <h3>Nombre del producto</h3>
            <p>$Precio</p>
            <button class="add-to-cart">Agregar a carrito</button>
        </div>
*/

/* Punto 4 _________________________

    Crea la función `filtro()` para filtrar los productos por nombre.
    - Asocia esta función al evento `keyup` de un campo `<input>`.
    - Cada vez que se escriba una letra, deben mostrarse solo los productos que coincidan con el texto ingresado.
*/

/* Punto 5 _________________________

    Agrega la funcionalidad de carrito:
    - Crea un array `carrito` que almacene los productos seleccionados.
    - Al presionar “Agregar a carrito”, el producto debe aparecer en el listado con id `cart-items`.

    El HTML del carrito debe tener el siguiente formato:

        <li class="item-block">
            <p class="item-name">nombreproducto - $precioproducto</p>
            <button class="delete-button">Eliminar</button>
        </li>
*/

/* Punto 6 _________________________

    Guarda los productos del carrito en `localStorage`.
    - Asegúrate de que al recargar la página el carrito se recupere automáticamente desde `localStorage`.
*/

/*
    A partir de aquí, se agregan funcionalidades avanzadas para el recuperatorio.
    Asegúrate de integrar estas mejoras con el código existente, manteniendo la estructura y las buenas prácticas.
*/

/* Punto 7 _________________________

    Gestión de Cantidades en el Carrito:

    Hasta ahora, cada vez que un usuario agrega un producto al carrito, este aparece como un nuevo elemento, incluso si ya está en la lista. Para optimizar la gestión del carrito, se requiere una mejora fundamental:

    * **Si un producto ya se encuentra en el carrito**, su **cantidad debe incrementarse** en lugar de duplicarlo.
    * La **visualización de los productos en el carrito** debe reflejar esta cantidad (por ejemplo, "Nombre Producto - $Precio x Cantidad").
    * La funcionalidad para **eliminar productos del carrito** debe adaptarse para gestionar estas cantidades: si la cantidad es mayor a uno, debe decrementarse; solo debe eliminarse completamente si su cantidad es uno.
    * **Considerá si es necesario modificar la estructura de tus datos (por ejemplo, en el `db.json`) para facilitar esta funcionalidad.**
*/

/* Punto 8 _________________________

    Cálculo y Visualización del Total del Carrito:

    Para proporcionar una visión clara del costo total de la compra, se necesita implementar un **cálculo dinámico del total del carrito**.

    * Este total debe **actualizarse en tiempo real** cada vez que se agreguen, eliminen o modifiquen cantidades de productos en el carrito.
    * El valor total debe **mostrar el total calculado** en el elemento HTML destinado para ello (por ejemplo, el `div` que ya poseen).
*/

/* Punto 9 _________________________

    Funcionalidad "Vaciar Carrito":

    Ofrece al usuario la comodidad de poder **vaciar todo el carrito** con una sola acción.

    * Implementa un **botón** que, al ser presionado, elimine todos los productos del carrito y reinicie el total.
*/

/* Punto 10 _________________________

    Persistencia Avanzada del Carrito:

    Es crucial que el estado completo del carrito se mantenga incluso después de que el usuario recargue la página.

    * Asegurate de que la **cantidad de cada producto y el total del carrito** se **guarden y recuperen correctamente** desde `localStorage` al cargar la página. La información debe ser persistente en su totalidad.
*/

/* Punto 11 _________________________

    Botón "Finalizar Compra":

    Agrega un botón en la interfaz del carrito que permita al usuario finalizar su compra.

    * Al hacer clic en este botón, debe mostrarse una **alerta** con el mensaje "Tu pedido está siendo procesado".
    * Inmediatamente después de mostrar la alerta, el **carrito debe vaciarse** por completo (tanto visualmente como en `localStorage`).
*/


    init();


function init() {
    mostrarDatos();
    obtenerJSON("DB/db.json");
    actualizarCarrito();
}

//punto 1
function mostrarDatos()
{
    const datos = {nombre:"Lorenzo", apellido:"buero"};

    const datosMostrados = (datos.nombre + " " + datos.apellido);

    console.log(datosMostrados);

    const nombreApellidoHTML = document.querySelector(".nombreAlumno");

    nombreApellidoHTML.innerHTML += datosMostrados;  
}

//punto 2
async function obtenerJSON(url)
{
    let frutas = await (await fetch(url)).json();
    mostrarFrutasEnHTML(frutas);
    filtrarFrutas(frutas);
    
    //filtrarFrutas(frutas);
}

//punto 3
function mostrarFrutasEnHTML(frutas)
{
    const lugarDeLasFrutas = document.querySelector(".product-grid");
    lugarDeLasFrutas.innerHTML = "";
    console.log("falalalalal")
    frutas.forEach(fruta => {
        

        lugarDeLasFrutas.innerHTML += `<div class="product-card">
                                            <img src="${fruta.img}" alt="${fruta.nombre}">
                                            <h3>${fruta.nombre}</h3>
                                            <p>$${fruta.precio}</p>
                                            <button class="add-to-cart" onclick="clickAgregarAlCarrito('${fruta.nombre}', '${fruta.precio}')">Agregar a carrito</button>
                                        </div>`
                                        //
    });


}


//punto 4
function filtrarFrutas(frutas)
{
    const buscador = document.querySelector(".search-bar");
    let frutasFiltradas = frutas;
    buscador.onkeyup = ()=>{
        frutasFiltradas = [];

        frutas.forEach(fruta => {
                    if(String(fruta.nombre).includes(buscador.value))
                    {
                        //console.log(fruta);
                        frutasFiltradas.push(fruta);

                    }
            
                }   
            );
            mostrarFrutasEnHTML(frutasFiltradas);
        }
        
        
}


//punto 5
function clickAgregarAlCarrito(nombre, precio)
{
    agregarFrutaALocalStorage(nombre, precio);

    actualizarCarrito();
    
}
function agregarAlCarrito(nombre, precio, cantidad)
{
    let estaFruta = {"nombre":nombre, "precio":precio};
    
    //frutasEnCarrito.push(estaFruta);

    const zonaCarrito = document.querySelector("#cart-items");

    zonaCarrito.innerHTML += `<li class="item-block">
            <p class="item-name">${nombre} - $${precio} X cantidad:${cantidad}</p>
            <button class="delete-button">Eliminar</button>
        </li>`;
    

}

function agregarFrutaALocalStorage(nombre, precio)
{
    let fruta = {"nombre":nombre, "precio":precio, "cantidad":1};
    let compra=[];
    //console.log("holaaa", localStorage.getItem("frutas"));
    if(localStorage.getItem("frutas") != null)
    {
      
        compra = JSON.parse(localStorage.getItem("frutas"));
        
    }
    

    compra.push(fruta);
  
    if(!aumentarCantidadDeFrutaSiExiste(nombre))
    {
        localStorage.setItem("frutas", JSON.stringify(compra));
    }
    


}

function actualizarCarrito()
{
    if(localStorage.getItem("frutas"))
    {
        let historialFrutas=JSON.parse(localStorage.getItem("frutas"));
        const zonaCarrito = document.querySelector("#cart-items");
        let precio = 0;

        zonaCarrito.innerHTML = "";
        historialFrutas.forEach(fruta => {
            agregarAlCarrito(fruta.nombre, fruta.precio, fruta.cantidad);
            precio += fruta.precio * fruta.cantidad;
        });
        actualizarPrecio(precio);
    }
    

}

function aumentarCantidadDeFrutaSiExiste(nombreFruta)
{
    let frutaRegistrada = false;
    if(localStorage.getItem("frutas"))
    {

        let frutasLocales=JSON.parse(localStorage.getItem("frutas"));
        
        frutasLocales.forEach(frutaLocal => {
            console.log("wowowow")
            if(frutaLocal.nombre == nombreFruta)
                {
                    frutaRegistrada = true;
                    frutaLocal.cantidad += 1;

                }
        });
        localStorage.clear();
        localStorage.setItem("frutas", JSON.stringify(frutasLocales));

    }
    return frutaRegistrada;

}

function actualizarPrecio(precio)
{
    const tagPrecio = document.querySelector("#total-price");
    tagPrecio.innerHTML = `$${precio}.00`;


}
















