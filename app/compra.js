import {levantarCarrito} from "../index.js";
import { Producto } from "../app/class.js";

let table = document.querySelector(".table");
let itotal = document.querySelector(".total");
let imgcarrito = document.querySelector("#carrito");
const arrayCarrito=levantarCarrito()
imgcarrito.style.display = "none";
document.querySelector("#buscar").style.display = "none";


//evento sumaR CANTIDAD DE A 1
const eventoSumar = () => {
  let btns = document.querySelectorAll(".btn-sumar");
  console.log(btns);
  for (const btn of btns) {
    btn.addEventListener("click", (evento) => {
      let id = evento.target.attributes[1].textContent;
      let idproducto = arrayCarrito.find((el) => el.id == id);
      console.log(idproducto);
      idproducto.sumarCantidad();
      localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
      getCompra(arrayCarrito);
    });
  }
};

// evento eliminar noeumatico de lista de a uno
const eventoRestar = () => {
  let btns = document.querySelectorAll(".btn-restar");
  console.log(btns);

  for (const btn of btns) {
    btn.addEventListener("click", (evento) => {
      let id = evento.target.attributes[1].textContent;
      let idproducto = arrayCarrito.find((el) => el.id == id);
      console.log(idproducto.id);
      idproducto.restarCantidad();
      let borrar=idproducto.cantidad
      console.log(borrar);
      if (borrar == 0) {
        arrayCarrito.splice(borrar,1)}
      localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
      getCompra(arrayCarrito);
    });
  }
};
// evento eliminar total de ese neumatico del array)sin funcionar aun
const eventoEliminar = (indice) => {
  let btns = document.querySelectorAll(".btn-eliminar");
  console.log(btns);
  for (const btn of btns) {
    btn.addEventListener("click", (evento) => {
      let idproducto = arrayCarrito.find(el => el.id == evento.target.attributes[1].value);
      console.log(idproducto);
      arrayCarrito.splice(idproducto,1)
      localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
      getCompra(arrayCarrito);
    });
  }
};

// creo tabla
const getCompra = () => {
     table.innerHTML = ` <thead >
      <tr>
        <th scope="col">Foto</th>
        <th scope="col">Unidades</th>
        <th scope="col">Medida</th>
        <th scope="col">Marca</th>
        <th scope="col">Precio</th>
        <th scope="col">Subtotal</th>
        <th scope="col">Sumar</th>
        <th scope="col">Quitar</th>
        <th scope="col">Eliminar</th>
    </thead>`;
      for (const el of arrayCarrito) {
      console.log(arrayCarrito);
      let { id, medida, marca, ubicacion, precio, cantidad } = el;
      let subtotal = el.cantidad * el.precio;
      console.log(subtotal);
      table.innerHTML += `
        <tr>
        <th><img class="reduc-img"src=".${ubicacion}"></th>  
        <td>${cantidad}</td>
        <td>${medida}</td>
        <td>${marca}</td>
        <td>$${precio}</td>
        <td>$${subtotal}</td>
        <td><button class="btn-sumar btn btn-success" data-id=${id}>+</button></td>
        <td><button class="btn-restar btn btn-warning" data-id=${id}>-</button></td>
        <td><button class="btn-eliminar btn btn-danger" data-id=${id}>x</button></td>`;
    }
    let total = arrayCarrito.reduce(
      (counter, el) => counter + el.precio * el.cantidad,0);
    itotal.innerHTML = `<h4>total :$${total}</h4>`;
    eventoSumar(), 
    eventoRestar(),
    eventoEliminar()
  }

// alert , cierre compra positiva , vuelve al index.
const EventoComprar = () => {
  let btn = document.querySelector("#comprar");
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    Swal.fire({
      title: "seguro quieres finalizar tu compra?",
      text: "agamoslo!",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Comprar!",
      timer: 20000,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "compra realizada!",
          "Felicitaciones! la facturate sera enviada a la brevedad",
          "success"
        );
        localStorage.clear();
      }
      setTimeout(() => (location.href = "../index.html"), 4000);
    });
  });
};
EventoComprar();

// cancelar compra. vuelve al index
const EventoCancelar = () => {
  let btn = document.querySelector("#cancelar");
  btn.addEventListener("click", () => {
    Swal.fire({
      title: "deseas cancelar tu compra?",
      text: "que lastima! tomate tu tiempo para pensarlo..",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si",
      timer: 40000,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "compra cancelada!",
          "sigue buscando, hay muchas ofertas en la web para ti!",
          "success"
        );
        localStorage.clear();
      }
      setTimeout(() => (location.href = "../index.html"), 3000);
    });
  });
};
EventoCancelar();

document.addEventListener("DOMContentLoaded",
eventoSumar(), 
eventoRestar(),
eventoEliminar(),
getCompra(),
)
