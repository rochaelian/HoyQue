'use strict';

const botonRegistrar = document.querySelector('#botonRegistrar');
const inputNombre = document.querySelector('#palabracl');
const inputDescripcion = document.querySelector('#txtPalabra');
const cuerpoTabla = document.querySelector('#tbl_propiedades tbody');

let mensajes = obtenerMensajes();

botonRegistrar.addEventListener('click', obtenerDatos);

// mostrarMensajes();

function obtenerDatos(){
    let nombre = inputNombre.value;
    let descripcion = inputDescripcion.value;
    
    let estadoError = validar(nombre, descripcion);

    if(estadoError == false){
        registrarMensaje(nombre, descripcion);
        mensajes = obtenerMensajes();
        // mostrarMensajes();

        swal({
            title: 'Registro correcto',
            text: 'Su palabra ha sido registrada exitosamente',
            type: 'success',
            confirmButtonText: 'Entendido'
          }).then(function(){
            window.location.href = 'listar_palabracl.html';
        });

        inputNombre.value = ('');
        inputDescripcion.value = ('');
    }else{
         swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la palabra, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });

    }
   
};

function validar(pnombre, pdescripcion){
    let error = false;

    // Validación del mensaje
    if(pnombre == ''){
        inputNombre.classList.add('error-input');
        error = true;
    }else{
        inputNombre.classList.remove('error-input');
    }


    if(pdescripcion == ''){
        inputDescripcion.classList.add('error-input');
        error = true;
    }else{
        inputDescripcion.classList.remove('error-input');
    }
    return error;
};


// function mostrarMensajes(){
//     cuerpoTabla.innerHTML = '';
//     for(let i = 0; i < mensajes.length; i++){
//         let fila = cuerpoTabla.insertRow();

//         fila.insertCell().innerHTML = mensajes[i]['nombre'];
//         fila.insertCell().innerHTML = mensajes[i]['descripcion'];
//         fila.insertCell().innerHTML = '<i class="fas fa-eye"></i><i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i>';

//     }
// };


