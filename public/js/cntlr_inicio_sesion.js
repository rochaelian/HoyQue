'use strict';

sessionStorage.clear(); // agregue esta linea SST

const btnIngresar = document.querySelector('#btnIngresar');

const inputCorreo = document.querySelector('#txtUserEmail');
const inputClave= document.querySelector('#txtContrasena');

/** Nuevo cambio Manuel Delgado **/
let listaUsuarios = obtenerUsuarios();

async function obtenerDatos() {
    let correo = inputCorreo.value;
    let clave = inputClave.value;
    
    let error = validar(correo, clave);
    let usuarioAceptado = false;
let tipoUsuario = []; // sst v3
    if (error) {
        swal({
            type: 'warning',
            title: 'No se pudo iniciar sesión',
            text: 'Por favor revise los campos en rojo antes de continuar'
        });


    }else{
        usuarioAceptado = await validarCredenciales(correo, clave);
       if(usuarioAceptado.sucess==true){ //sst v3
            for(let i = 0; i < listaUsuarios.length; i++){
                 tipoUsuario = listaUsuarios[i]['usuario'];  // sst v3 le quite el let
                if(correo == listaUsuarios[i]['correo'] && clave == listaUsuarios[i]['clave']){
                    
                    switch (tipoUsuario) {
                        case 'Administrador':
                        window.location.href = 'perfil_admin.html'; 
                        break;
                
                        case 'Cliente':
                        window.location.href = 'perfil_cliente.html'; 
                        break;
                
                        case 'Empresa':
                        window.location.href = 'perfil_empresa.html'; 
                        break;
                
                        default:
                        break;
                
                    }
                }
            }
        }else{

  if(usuarioAceptado.baneado=='Si'){ // agregado de aqui para abajo sst v3


 swal({       //agregado SST v2
                title: 'Acceso no permitido porque su cuenta ha sido baneada',
                text: usuarioAceptado.comentario,
                type: 'error',
                confirmButtonText: 'Entendido'
            });



}else{


            swal({       //agregado SST v2
                title: 'Acceso no permitido',
                text: 'No se permitió el acceso, favor revisar que el correo y la clave son correctas, caso contrario contactar al administrador',
                type: 'error',
                confirmButtonText: 'Entendido'
            });



}




        }
    }
}

function validar(pcorreo, pclave) {
    let error = false;
    let expLetras = /^[a-z A-ZáéíóúñÑÁÉÍÓÚüÜ]+$/;
    let expNumero = /^[0-9]+$/;
    let expCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   // let expClave = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;  //SST v2
  //  let expClave = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,}$/;  //SST v2
   let expClave = /^(?=\w*[A-Z])(?=\w*[a-z])\S{8,}$/;  //SST v3

    if (pcorreo == ''|| expCorreo.test(pcorreo) == false) {
        error = true;
        inputCorreo.classList.add('error_input');
    } else {
        inputCorreo.classList.remove('error_input');
    }



    if (pclave == '' || expClave.test(pclave) == false) {
        error = true;
        inputClave.classList.add('error_input');
    } else {
        inputClave.classList.remove('error_input');
    }

    /** Nuevo cambio Manuel Delgado **/
    if(error == false){
        for(let i = 0; i < listaUsuarios.length; i++){
            if(pcorreo != listaUsuarios[i]['correo'] && pclave != listaUsuarios[i]['clave']){
                error = true;
                inputClave.classList.add('error_input');
                inputCorreo.classList.add('error_input');
            } else {
                error = false;
                inputClave.classList.remove('error_input');
                inputCorreo.classList.remove('error_input');
                break;
            }
        };
    }
    
    return error;

};



btnIngresar.addEventListener('click', obtenerDatos);