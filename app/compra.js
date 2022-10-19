import {levantarCarrito} from "../index.js"

let table = document.querySelector(".table")
let itotal = document.querySelector(".total")
let imgcarrito= document.querySelector("#carrito")

imgcarrito.style.display = "none";
document.querySelector("#buscar").style.display = "none";


// hacer pedido al arraycarrito y creo tabla
const getCompra = () =>{
    let compradb =levantarCarrito()
    console.log(compradb);
    for (const el of compradb) {
        let{id,medida,marca,ubicacion,precio,cantidad}= el
        let subtotal= el.cantidad * el.precio; 
        console.log(subtotal);
        table.innerHTML +=`
        <tr>
        <th><img class="reduc-img"src="${ubicacion}"></th>  
        <td>${cantidad}</td>
        <td>${medida}</td>
        <td>${marca}</td>
        <td>$${precio}</td>
        <td>$${subtotal}</td>`
        }
        let total= compradb.reduce((counter,el)=>counter +(el.precio*el.cantidad),0)
        itotal.innerHTML +=`<h4>total :$${total}</h4>`
        eventoEliminar()
        imgcarrito.style.opacity="1";
}

// evento eliminar noeumatico de lista de a uno
const eventoEliminar =()=> {
        let btns =document.querySelectorAll(".btn-eliminar")
        let carrito=levantarCarrito()
    for (const btn of btns) {
    btn.addEventListener("click",(evento)=>{
        let id = evento.target.attributes[1].textContent
        let idproducto= carrito.find(el => el.id ==id);
        console.log(idproducto);

        idproducto.restarCantidad()
    }
)
}
}

// alert , cierre compra positiva , vuelve al index.
const EventoComprar = ()=>{
    let btn= document.querySelector("#comprar")
btn.addEventListener("click",(event)=>{
    event.preventDefault()
    Swal.fire({
        title: 'seguro quieres finalizar tu compra?',
        text: "agamoslo!",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Comprar!',
        timer:20000,
        }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire(
            'compra realizada!',
            'Felicitaciones! la facturate sera enviada a la brevedad',
            'success'
        )
        localStorage.clear()
        } 
        setTimeout(()=> location.href="../index.html",4000)
    }) 
})
}
EventoComprar()

// cancelar compra. vuelve al index
const EventoCancelar =()=>{
    let btn= document.querySelector("#cancelar")
btn.addEventListener("click",()=>{
    Swal.fire({
        title: 'deseas cancelar tu compra?',
        text: "que lastima! tomate tu tiempo para pensarlo..",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si',
        timer:40000
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire(
            
            'compra cancelada!',
            'sigue buscando, hay muchas ofertas en la web para ti!',
            'success'
        )
        localStorage.clear()
        }
        setTimeout(()=> location.href="../index.html",3000)
    })
})
}
EventoCancelar()





document.addEventListener("DOMContentLoaded", getCompra)

