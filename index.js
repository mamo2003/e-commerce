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
let{id,medida,marca,ubicacion,precio,stock,estado,detalle,categoria}=element;
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
const AgregarNeumaticos = ()=>{
let btns= document.querySelectorAll(".agregar")
let prueba = levantarCarrito();
console.log(prueba);
for (const btn of btns)  {
    btn.addEventListener ("click",(event)=>{
    let id= event.target.attributes[1].value;
    console.dir(id)
    let okid= prueba.findIndex(el => el.id == id);
        if (okid !== -1) {
        let producto = prueba[okid]
            console.log("existe, sumar 1");
            producto.sumarCantidad()
            console.log(arrayCarrito);
    } else {
        let ok= arrayNeumaticos.find(el => el.id ==id);
        let producto = new Producto (ok.id,ok.medida,ok.marca,ok.ubicacion,ok.precio,ok.stock,ok.estado,ok.detalle,ok.categoria,ok.cantidad)
        console.log("no existe en carrito");
        producto.sumarCantidad()
        producto.restarStock()
        arrayCarrito.push(producto) 
    }
    localStorage.setItem ("carrito",JSON.stringify(arrayCarrito))  
    ImgCarrito()
})
}
}

// itero array luego de refrescar la pagina  vuelvo a subir al localstorage
export const levantarCarrito =()=>{
    let carrito = JSON.parse(localStorage.getItem("carrito"))  || []  ;
    console.log(carrito);
    for (const el of carrito) {
    let producto = new Producto (el.id,el.medida,el.marca,el.ubicacion,el.precio,el.stock,el.estado,el.detalle,el.categoria,el.cantidad)
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
main.innerHTML=""
let resultado = arrayNeumaticos.filter(el =>el.categoria.includes(event.target.value)) 
if (resultado.length>0) {
    CrearCards(resultado)
} else {
    main.innerHTML=`<h3>no se encontraron articulos relacionados, busque nuevamente</h3>`
}
});


for (const btn of btnsCategoria)  {
    btn.addEventListener("click",(event)=>{
    event.preventDefault()
    let Categoria= event.target.textContent;
    console.log(Categoria);
    let arrayBusca=arrayNeumaticos;
    console.log(arrayBusca)
    main.innerHTML="";
    let busqueda;
switch (Categoria) { 
    case "autos":
        busqueda =arrayBusca.filter(el=>el.categoria == "auto")
        CrearCards(busqueda)
        console.log(busqueda);
        break;
    case "camionetas":
        busqueda = arrayBusca.filter(el=>el.categoria == "camioneta")
        CrearCards(busqueda)
        break;
    case "camiones":
        busqueda=arrayBusca.filter(el=>el.categoria == "camion")
        CrearCards(busqueda)
        break;
    case "motos":
        busqueda=arrayBusca.filter(el=>el.categoria == "motos")
        CrearCards(busqueda)
        break;
    default:
        break;
}
})}


document.addEventListener("DOMContentLoaded", () =>{
    getRequest(),
    ImgCarrito()
})

