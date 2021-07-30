'use strict';
let botonRegistrari = document.querySelector('#botonRegistrari');
const inputNombreIndustria = document.querySelector('#nIndustria');
let tipoUsuario = sessionStorage.getItem('tipo_usuario');

botonRegistrari.addEventListener('click' , obtenerDatos);

function obtenerDatos(){
      let nombre = inputNombreIndustria.value;
      let error = validar(nombre);

    if(error == true){
        swal({
            title: 'No se pudo registrar la industria',
            text: 'Por favor revise los campos en rojo antes de continuar',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = registrarIndustria(nombre);
        if(respuesta.success == true){
            swal({
                title: 'La industria ha sido registrada',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido',
              }).then(function(){
                let accion = `Registró la industria: ${nombre} `;
                obtenerDatosBitacora(accion); 
                window.location.href = 'listar_industrias.html';
            });  
        }else{
            swal({
                title: 'No se pudo registrar la industria',
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
        inputNombreIndustria.classList.add('error-input');
    }else{
        inputNombreIndustria.classList.remove('error-input');
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