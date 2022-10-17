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
    return this.cantidad++
}

restarCantidad(){
    return this.cantidad--;
}

}