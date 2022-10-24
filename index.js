import {Producto} from "./app/class.js"

// variables globales
let main = document.querySelector("#root")
let imgcarrito= document.querySelector("#carrito")
let input =document.querySelector("#buscar")
let btnsCategoria = document.querySelectorAll(".btn-categoria")
const arrayNeumaticos = [];
const arrayCarrito=[];

// genero el llamdo al JSON
const getRequest = async() =>{
let req =  await fetch ("./neumaticos.json")
let response= await req.json();
console.log(req);
for(const el of response){
arrayNeumaticos.push(el)}
CrearCards(arrayNeumaticos);
}

// creo cards
export const CrearCards = (array) => {
array.forEach(element => {
let{id,medida,marca,ubicacion,precio,stock,estado,detalle,categoria,cantidad}=element;
main.innerHTML  += `
<div class="row row-cols-1 row-cols-md-3 row-cols-sm-2">
    <div class="col">
        <div class="card">
            <img src=${ubicacion} class="card-img-top" alt="card-grid-image">
            <h5 class="card-title">${medida}</h5>
            <h8 class="card-title">disponibles :${stock} </h8><h8 class="card-title">precio: $${precio}</h8>
            <p class="card-title">marca:${marca}</p>
            <p class="card-title"> categoria: ${categoria} </p>
            <p class="card-title">estado:${estado}</p>
            <p class="card-title" id="detalle"> ${detalle}</p>
            <div class="card-body">
            <button href="" class="btn btn-warning" id="masinfo" data-id=${id} data-ubicacion=${ubicacion}>+ info</button> 
            <button href="#"  data-id=${id} class ="agregar" class="btn btn-warning">+Carrito</button>          
            </div>
        </div>
    </div>
</div> `
});
EventoMasinfo()
AgregarNeumaticos()
} 

// agrego al carrito
const AgregarNeumaticos = () => {
  let btns = document.querySelectorAll(".agregar");
  for (const btn of btns) {
    btn.addEventListener("click", (event) => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "felicitaciones,acabas de agregar un Neumatico a tu compra!",
        showConfirmButton: false,
        timer: 900,
      });
      let id = event.target.attributes[1].value;
      let okid = arrayCarrito.findIndex((el) => el.id == id);
      console.log(okid);
      if (okid !== -1) {
        let producto = arrayCarrito[okid];
        console.log("existe, sumar 1");
        producto.sumarCantidad();
        console.log(arrayCarrito);
      } else {
        let ok = arrayNeumaticos.find(el => el.id == id);
        let producto = new Producto(
        ok.id,
        ok.medida,
        ok.marca,
        ok.ubicacion,
        ok.precio,
        ok.stock,
        ok.estado,
        ok.detalle,
        ok.categoria,
        ok.cantidad
        );
        console.log("no existe en carrito");
        producto.sumarCantidad();
        arrayCarrito.push(producto);
      }
      localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
      ImgCarrito();
    });
  }
}


// itero array luego de refrescar la pagina  vuelvo a subir al localstorage
export const levantarCarrito =()=>{
    let iCarro = JSON.parse(localStorage.getItem("carrito")) || []  ;
    console.log(iCarro);
    for (const oi of iCarro) {
    let producto = new Producto(
    oi.id,
    oi.medida,
    oi.marca,
    oi.ubicacion,
    oi.precio,
    oi.stock,
    oi.estado,
    oi.detalle,
    oi.categoria,
    oi.cantidad
    );
    console.log(producto);
    arrayCarrito.push(producto)
}
return arrayCarrito
}

const ImgCarrito =()=>{
let verTotCarrito=JSON.parse(localStorage.length)
if (verTotCarrito > 0) {
    console.log("carrito cargado");
    imgcarrito.style.opacity="1";
} else {
    imgcarrito.style.opacity="0.1";
    console.log("carrito vacio");
}
}

// mas info a corregir , tira error y hay que configurar la tosty
const EventoMasinfo = ()=>{
    let btns= document.querySelectorAll("#masinfo")
    for (const btn of btns) {
    btn.addEventListener("click", (event)=>{ 
    let ok = arrayNeumaticos.find(el => el.id == event.target.attributes[3].value);
    Swal.fire({
    title: `${ok.medida}`,
    text: `${ok.detalle}`,
    imageUrl: `${ok.ubicacion}`,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: `${ok.marca}`,
    });
})
}
}

// busqueda input

input.addEventListener("input",(event)=>{
main.innerHTML ="";
let resultado = arrayNeumaticos.filter(el =>el.categoria.includes(event.target.value)) 
if (resultado.length>0) {
    CrearCards(resultado)
    console.log(resultado);
} else {
    main.innerHTML=`<h3>no se encontraron articulos relacionados, busque nuevamente</h3>`
}
});



for (const btn of btnsCategoria)  {
    btn.addEventListener("click",(event)=>{
    event.preventDefault()
    main.innerHTML = "";
    let Categoria= event.target.textContent;
    let arrayBusca=arrayNeumaticos;
    let busq;
switch (Categoria) { 
    case "autos":
        busq = arrayBusca.filter((el) => el.categoria == "auto");
        CrearCards(busq);
        busq
        console.log(busq);
        break;
    case "camionetas":
        busq = arrayBusca.filter((el) => el.categoria == "camioneta");
        CrearCards(busq);
        break;
    case "camiones":
        busq = arrayBusca.filter((el) => el.categoria == "camion");
        CrearCards(busq);
        break;
    case "motos":
        busq = arrayBusca.filter((el) => el.categoria == "motos");
        CrearCards(busq);
        break;
    default:
        break;
}
})
}


document.addEventListener("DOMContentLoaded", () =>{
    getRequest(),
    levantarCarrito(),
    ImgCarrito()
})
