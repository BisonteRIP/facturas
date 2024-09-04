
const formDetalle = document.getElementById('form-detalle');
const inputCantidad = document.getElementById('cantidad');
const inputDescripcion = document.getElementById('descripcion');
const inputPrecioUnidad = document.getElementById('precio-unidad');
const inputPrecioTotal = document.getElementById('precio-total');
const cuerpoTabla = document.getElementById('cuerpo-tabla');
const btnGuardar = document.getElementById('btn-save');
const inputRazonSocial = document.getElementById('razon-social');
const inputRif = document.getElementById('rif');
const inputNumTelefono = document.getElementById('numero-telefono');
const inputDireccion = document.getElementById('direccion');
const inputFecha = document.getElementById('fecha');
const formCabecera = document.getElementById('form-cabecera')

let facturas = [];
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
        botonEliminar.onclick = () =>{
            eliminarDetalleById(detalle.descripcion);
        };
        divEliminar.appendChild(botonEliminar);
        fila.appendChild(divEliminar);
        cuerpoTabla.appendChild(fila);

    });
};
const eliminarDetalleById = (id) =>{
    arregloDetalle = arregloDetalle.filter((detalle) =>{
        if(id !== detalle.descripcion){
            return detalle;
        }
    });
    redibujarTabla();
};

const agregarDetalle = (objDetalle) => {

    // buscar si el objeto detalle ya existe en el arregloDetalle
    // de ser asi, sumar las cantidades para que solo aparezca una vez en el arreglo

    const resultado = arregloDetalle.find((detalle) =>{
        if(objDetalle.descripcion === detalle.descripcion){
            return detalle;
        }
    });

    if(resultado){
        arregloDetalle = arregloDetalle.map((detalle) => {
            if(detalle.descripcion === objDetalle.descripcion){
                return {
                    cant: detalle.cant + objDetalle.cant,
                    descripcion: detalle.descripcion,
                    pUnit: detalle.pUnit,
                    pTotal: (detalle.cant + objDetalle.cant) * detalle.pUnit,
                };
            }
            return detalle;
        });
    }else {
        arregloDetalle.push(objDetalle);
    }   
};

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

btnGuardar.onclick = () => {
    //crear el objeto de la cabecera de lafactura
    let objFactura = {
        nombre: inputRazonSocial.value,
        direccion: inputDireccion.value,
        fecha: inputFecha.value,
        numero: inputNumTelefono.value,
        rif_CI: inputRif.value,
        detalle: arregloDetalle,
    };
    console.log(objFactura);
    facturas.push(objFactura);

    // limpiar campos
    formCabecera.reset();
    formDetalle.reset();
    //guardar en el local storage
    localStorage.setItem("facturas",JSON.stringify(facturas));
    //borrar tabla del resultado de los detalles
    arregloDetalle = [];
    redibujarTabla();
};

const calcularTotal = () =>{
    const cantidad =+ inputCantidad.value;
    const pUnit =+ inputPrecioUnidad.value;
    const total = cantidad * pUnit;
    inputPrecioTotal.value = total.toFixed(2);
}

inputCantidad.onkeyup = () => {
    calcularTotal();
};
inputPrecioUnidad.onkeyup = () => {
    calcularTotal();
};
inputCantidad.onchange = () => {
    calcularTotal();
};
inputPrecioUnidad.onchange = () => {
    calcularTotal();
};