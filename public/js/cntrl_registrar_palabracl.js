'use strict';

const botonRegistrar = document.querySelector('#botonRegistrar');
const inputNombre = document.querySelector('#palabracl');
const inputDescripcion = document.querySelector('#txtPalabra');
let tipoUsuario = sessionStorage.getItem('tipo_usuario');

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
            text: 'La palabra: "' + nombre + '" ha sido registrada exitosamente',
            type: 'success',
            confirmButtonText: 'Entendido'
          }).then(function(){
            let accion = `Registró la palabra clave:  ${nombre} `;
            obtenerDatosBitacora(accion);
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

/******************************************************/
/********** Función para registrar bitácora **********/
/****************************************************/

function obtenerDatosBitacora(paccion){
    let bitacora = false;
    let accion = paccion;
    let listaUsuarios = obtenerUsuarios();
    let sesionCorreo = sessionStorage.getItem('correo');
    let rol = tipoUsuario;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]['correo'] == sesionCorreo) {
            let nombre = listaUsuarios[i]['pnombre'];
            let respuesta = registrar_bitacora(rol, sesionCorreo, nombre, accion);
            if(respuesta.success==true){
                bitacora = true;
            }
        }
    }
    return bitacora;
};


