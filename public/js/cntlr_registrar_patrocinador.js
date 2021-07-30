'use strict';

let botonRegistrarPatrocinador = document.querySelector('#botonRegistrarPatrocinador');
const inputNombrePatrocinador = document.querySelector('#nPatrocinador');
const imgPatrocinador = document.querySelector('#registrarImagen');
const selectIndustria = document.querySelector('#txtIndustria')
let tipoUsuario = sessionStorage.getItem('tipo_usuario');
let sesionCorreo = sessionStorage.getItem('correo');

botonRegistrarPatrocinador.addEventListener('click' , obtenerDatos);


mostrarIndustrias();

function obtenerDatos(){
      let nombre = inputNombrePatrocinador.value;
      let industria = selectIndustria.value;
      let imagen = imgPatrocinador.src;
      let error = validar(nombre, industria);

    if(error == true){
        swal({
            title: 'Registro incorrecto',
            text: '¡No se pudo registrar el patrocinador! Por favor, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = registrarPatrocinador(nombre, industria, imagen); 
        if(respuesta.success){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
                }).then(function(){
                let accion = `Registró el patrocinador:  ${nombre} `;    
                obtenerDatosBitacora(accion);
                window.location.href = 'listar_patrocinadores.html';
                });
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

function validar(pnombre, pindustria){
    let error = false;
    let expLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ .]+$/;
    
    if(pnombre=='' || expLetras.test(pnombre)==false){
        error=true;
        inputNombrePatrocinador.classList.add('error-input');
    }else{
        inputNombrePatrocinador.classList.remove('error-input');
    }

    if(pindustria==''){
        error=true;
        selectIndustria.classList.add('error-input');
    }else{
        selectIndustria.classList.remove('error-input');
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
    let correo = sesionCorreo;
    let rol = tipoUsuario;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]['correo'] == sesionCorreo) {
            let nombre = listaUsuarios[i]['pnombre'];
            let respuesta = registrar_bitacora(rol, correo, nombre, accion);
            if(respuesta.success==true){
                bitacora = true;
            }
        }
    }
    return bitacora;
};

/******************************************************/
/********** Función para mostrar industrias **********/
/****************************************************/

function mostrarIndustrias(){
    let listaIndustrias = obtenerIndustrias();
    let selectIndustrias = document.querySelector('#lstIndustrias');
    for(let i=0; i < listaIndustrias.length; i++){
        let nuevaOpcion = new Option(listaIndustrias[i]['nombre']);
        nuevaOpcion.value = listaIndustrias[i]['nombre'];
        selectIndustrias.appendChild(nuevaOpcion);
    }
};