
const formDetalle = document.getElementById('form-detalle');
const inputCantidad = document.getElementById('cantidad');
const inputDescripcion = document.getElementById('descripcion');
const inputPrecioUnidad = document.getElementById('precio-unidad');
const inputPrecioTotal = document.getElementById('precio-total');
const cuerpoTabla = document.getElementById('cuerpo-tabla');

let arregloDetalle = [];
const redibujarTabla = () => {
    cuerpoTabla.innerHTML = "";
    arregloDetalle.forEach((detalle)=>{
        let fila = document.createElement("div");
        fila.innerHTML =`<div>${detalle.cant}</div>
                         <div>${detalle.descripcion}</div>
                         <div>${detalle.pUnit}</div>
                         <div>${detalle.pTotal}</div>`;
        
        fila.classList.add("table-row-items");
        let divEliminar = document.createElement("div")
        let botonEliminar = document.createElement('button');
        botonEliminar.classList.add("button-red", "btn-danger");
        botonEliminar.innerText = "Eliminar"
        divEliminar.appendChild(botonEliminar);
        fila.appendChild(divEliminar);
        cuerpoTabla.appendChild(fila);

    });
}
formDetalle.onsubmit = (e) =>{
    e.preventDefault();

    //Creando objeto detalle
    const objDetalle = {
        cant: inputCantidad.value,
        descripcion: inputDescripcion.value,
        pUnit: inputPrecioUnidad.value,
        pTotal: inputPrecioTotal.value,
    };
    arregloDetalle.push(objDetalle);
    redibujarTabla();
};