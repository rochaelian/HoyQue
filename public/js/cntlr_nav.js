'use strict';

let nav = document.querySelectorAll('.nav-principal .nav-lista li a');

let conectado = sessionStorage.getItem('conectado');
let usuario = sessionStorage.getItem('tipo_usuario');
// Daniel --
let correo_usuario = sessionStorage.getItem('correo');
let listaUsuarios = obtenerUsuarios();
let id_usuario;
for(let i = 0; i < listaUsuarios.length; i++){
    if(listaUsuarios[i]['correo'] == correo_usuario) {
        id_usuario = listaUsuarios[i]['_id'];
    }
}
sessionStorage.setItem('id_usuario', id_usuario);
console.log(sessionStorage);
// fin Daniel --

if (conectado) {
    /** Nuevo cambio Manuel Delgado **/
        switch (usuario) {
            case 'Administrador':
                nav[0].classList.remove('ocultar');
                nav[1].classList.remove('ocultar');
                nav[2].classList.remove('ocultar');
                nav[3].classList.remove('ocultar');
                nav[4].classList.remove('ocultar');
                nav[4].href = 'perfil_admin.html';
                nav[5].classList.remove('ocultar');
                nav[6].classList.add('ocultar');
                nav[7].classList.add('ocultar');
                subirImagenMenu();
                break;
    
            case 'Cliente':
    
    
                nav[1].classList.remove('ocultar');
                nav[2].classList.remove('ocultar');
                nav[4].classList.remove('ocultar');
                nav[4].href = 'perfil_cliente.html';
                nav[5].classList.remove('ocultar');
                nav[6].classList.add('ocultar');
                nav[7].classList.add('ocultar');
    
                subirImagenMenu();
                break;
    
            case 'Empresa':
                nav[1].classList.remove('ocultar');
                nav[2].classList.remove('ocultar');
                nav[3].classList.remove('ocultar');
                nav[4].classList.remove('ocultar');
                nav[4].href = 'perfil_empresa.html';
                nav[5].classList.remove('ocultar');
                nav[6].classList.add('ocultar');
                nav[7].classList.add('ocultar');
    
                subirImagenMenu();
                break;
    
            default:
    
                break;
    
        }
    }  else {
        window.location.href = 'inicio_sesion.html';
       
    } 
    
function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = 'inicio_sesion.html';

}

obtenerUsuarios();

/** Nuevo cambio Manuel Delgado **/
function subirImagenMenu() {
    listaUsuarios = obtenerUsuarios();
    let sesionCorreo = sessionStorage.getItem('correo');
    let imagen = document.querySelector('#imagenMenu');
    let nombre = document.querySelector('#nombreUsuario');

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]['correo'] == sesionCorreo) {
            if (listaUsuarios[i]['imagen'] != '') {
                imagen.src = listaUsuarios[i]['imagen'];
            }
            let nombreUsuario = listaUsuarios[i]['pnombre'] + ' ' + listaUsuarios[i]['papellido'];
            let textoNombreUsuario = document.createTextNode(nombreUsuario);
            nombre.appendChild(textoNombreUsuario);
        }
    }
}

