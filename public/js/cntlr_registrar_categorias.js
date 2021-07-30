'use strict';
let botonRegistrar = document.querySelector('#botonRegistrar');
let inputNombreCategoria = document.querySelector('#nCategoria');
let inputDescripcionCategoria = document.querySelector('#txtCategoria');
let tipoUsuario = sessionStorage.getItem('tipo_usuario');

botonRegistrar.addEventListener('click' , obtenerDatos);

function obtenerDatos(){
      let nombre = inputNombreCategoria.value;
      let descripcion = inputDescripcionCategoria.value;
      let error = validar(nombre, descripcion);

    if(error == true){
        swal({
            title: 'No se pudo registrar la categoría',
            text: 'Por favor revise los campos en rojo antes de continuar',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = registrarCategoria(nombre, descripcion);
        if(respuesta.success == true){
            swal({
                title: 'La categoría ha sido registrada',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
              }).then(function(){
                let accion = `Registró la categoría:  ${nombre} `;
                obtenerDatosBitacora(accion);  
                window.location.href = 'listar_categorias.html';
            });   
        }else{
            swal({
                title: 'No se pudo registrar la categoría',
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
        inputNombreCategoria.classList.add('error-input');
    }else{
        inputNombreCategoria.classList.remove('error-input');
    }

    if(pdescripcion==''){
        error=true;
        inputDescripcionCategoria.classList.add('error-input');
    }else{
        inputDescripcionCategoria.classList.remove('error-input');
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