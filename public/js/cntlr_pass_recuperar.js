'use strict';

const inputCorreo = document.querySelector('#txtUserEmail');
const opcOlvidoPass = document.querySelector('#btnEnviar'); // SST v2


function obtenerDatos() {
    let correo = inputCorreo.value;
    let error = validar(correo);


    if (error) {
        swal({
            type: 'warning',
            title: 'No se pudo enviar clave temporal',
            text: 'Por favor revise los campos en rojo antes de continuar'
        });


    } else {

        generaPass();

        swal({
            type: 'success',
            title: 'Clave temporal ha sido enviada exitosamente',
            text: 'Por favor revise su correo electrónico y use la clave temporal para el ingreso a su perfil'
        }).then(function(){
            obtenerDatosBitacora();
            window.location.href = ('inicio_sesion.html')
        })

    }
}


function validar(pcorreo) {
    let error = false;

    let expCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;



    if (pcorreo == '' || expCorreo.test(pcorreo) == false) {
        error = true;
        inputCorreo.classList.add('error_input');
    } else {
        inputCorreo.classList.remove('error_input');
    }

    return error;
}


function generaPass() {

    let correo = inputCorreo.value;
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


    var pass = "";
    for (let i = 0; i < 8; i++) {

        pass += characters.charAt(Math.floor(Math.random() * characters.length));

    }

    actualizarClaveTemp(correo, pass);


    return pass;

}


opcOlvidoPass.addEventListener('click', obtenerDatos); // sst  v2

/******************************************************/
/********** Función para registrar bitácora **********/
/****************************************************/

function obtenerDatosBitacora(){

    let listaUsuarios = obtenerUsuarios();
    let sesionCorreo = inputCorreo.value;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]['correo'] == sesionCorreo) {
            let rol = listaUsuarios[i]['usuario']
            let nombre = listaUsuarios[i]['pnombre'];
            let accion = `El usuario:  ${nombre} solicitó un cambio de contraseña`; 
            let respuesta = registrar_bitacora(rol, sesionCorreo, nombre, accion);
        }
    }
};