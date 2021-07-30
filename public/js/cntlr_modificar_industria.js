'use strict';
let id_industria = localStorage.getItem('industria');
const inputNombre = document.querySelector('#nIndustria');
const botonActualizar = document.querySelector('#botonActualizari');
let tipoUsuario = sessionStorage.getItem('tipo_usuario');

botonActualizar.addEventListener('click', obtenerDatosFormulario);

if(id_industria){
    mostrarDatos();
}else{
    alert('Debe seleccionar una industria para actualizar');
}

function mostrarDatos(){
    let industria = buscar_industria(id_industria);

    inputNombre.value = industria['nombre'];
}

function obtenerDatosFormulario(){
    let nombre = inputNombre.value;

    let error = validar(nombre);

    if(error == true){
        swal({
            title: 'Registro incorrecto',
            text: '¡No se pudo actualizar la industria! Por favor, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = actualizarIndustria(id_industria, nombre);
        if(respuesta.success == true){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido',
              }).then(function(){
                let accion = `Modificó la industria: ${nombre} `;
                obtenerDatosBitacora(accion);
                window.location.href = 'listar_industrias.html';
            });
              $('#nIndustria').val('');      
        }else{
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
              });
        }
    }
};

function validar(pnombre){
    let error = false;
    let expLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ .]+$/;
    
    if(pnombre=='' || expLetras.test(pnombre)==false){
        error=true;
        inputNombre.classList.add('error-input');
    }else{
        inputNombre.classList.remove('error-input');
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