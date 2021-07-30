'use strict';
const inputBuscar = document.querySelector('#buscaInfoPrincipal');
let listaBitacoras = obtenerBitacoras();
mostrarBitacora();
inputBuscar.addEventListener('keyup', mostrarBitacora);
/******************************************************/
/********** Función para listar bitacoras  **********/
/****************************************************/

function mostrarBitacora(){
    let filtro = inputBuscar.value;
    let tbody = document.querySelector('.tbl_bitacoras tbody');
    tbody.innerHTML = '';
    
    for(let i = 0; i < listaBitacoras.length; i++){
        if(listaBitacoras[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) || listaBitacoras[i]['rol'].toLowerCase().includes(filtro.toLowerCase())){
            
            let fila = tbody.insertRow();
            let celdaRol = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaAccion = fila.insertCell();
            let celdaFecha = fila.insertCell();
  
            celdaRol.innerHTML = listaBitacoras[i]['rol'];
            celdaCorreo.innerHTML = listaBitacoras[i]['correo']
            celdaNombre.innerHTML = listaBitacoras[i]['nombre'];
            celdaAccion.innerHTML = listaBitacoras[i]['accion'];
            celdaFecha.innerHTML = listaBitacoras[i]['fecha'];
        }
    }
  };