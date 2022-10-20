export class Producto {
constructor (id,medida,marca,ubicacion,precio,stock,estado,detalle,categoria,cantidad){
this.id =id,
this.medida=medida,
this.marca=marca,
this.ubicacion=ubicacion,
this.precio=precio,
this.stock=stock,
this.estado=estado,
this.detalle=detalle,
this.categoria=categoria,
this.cantidad = cantidad || 0
}

sumarCantidad(){ 
    if (Number(this.cantidad)<=Number(this.stock)) {
        return this.cantidad++;
    }
    return Swal.fire({
    icon: "error",
    title: "te has cargado todas!!",
    text: "no tenemos mas en stock!",
    footer: "gracias por tu compra"
    });
}

restarCantidad(){
    if (this.cantidad <= 0) {
    return this.cantidad
    }else{
        return this.cantidad--}
}
restarStock(){

    Number(this.stock) - Number(this.cantidad);

}
}