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
    return alert("no puedes comprar mas de lo que hay")
}

restarCantidad(){
    if (this.cantidad <= 0) {alert("no puedes comprar menos de lo que hay");
      return this.cantidad
    }else{
        return this.cantidad--}
}

}