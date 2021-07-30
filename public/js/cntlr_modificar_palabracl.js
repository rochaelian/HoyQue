'use strict';
let id_palabracl = localStorage.getItem('palabracl');
let tipoUsuario = sessionStorage.getItem('tipo_usuario');
const inputNombre = document.querySelector('#palabracl');
const inputDescripcion = document.querySelector('#txtPalabra')
const botonActualizar = document.querySelector('#botonActualizar');

botonActualizar.addEventListener('click', obtenerDatosFormulario);

if(id_palabracl){
    mostrarDatos();
}else{
    alert('Debe seleccionar una categoria para actualizar');
}

function mostrarDatos(){
    let palabracl = buscar_palabracl(id_palabracl);

    inputNombre.value = palabracl['nombre'];
    inputDescripcion.value = palabracl['descripcion'];
}

function obtenerDatosFormulario(){
    let nombre = inputNombre.value;
    let descripcion = inputDescripcion.value;

    let error = validar(nombre, descripcion);

    if(error == true){
        swal({
            title: 'Registro incorrecto',
            text: '¡No se pudo actualizar la palabra clave! Por favor, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = actualizar_palabracl(id_palabracl, nombre, descripcion);
        if(respuesta.success == true){
            swal({
                title: 'La palabra clave: "' + nombre + '" se ha actualizado correctamente',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido',
              }).then(function(){
                let accion = `Modificó la palabra clave:  ${nombre} `;
                obtenerDatosBitacora(accion); 
                window.location.href = 'listar_palabracl.html';
            });
              $('#nIndustria').val('');      
        }else{
            swal({
                title: 'No se pudo actualizar',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
              });
        }
    }
};

function validar(pnombre, pdescripcion){
    let error = false;
    let expLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ .]+$/;
    
    if(pnombre=='' || expLetras.test(pnombre)==false){
        error=true;
        inputNombre.classList.add('error-input');
    }else{
        inputNombre.classList.remove('error-input');
    }

    if(pdescripcion==''){
        error=true;
        inputDescripcion.classList.add('error-input');
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