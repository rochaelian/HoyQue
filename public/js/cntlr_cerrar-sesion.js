'use strict';

const botonCerrarSesion = document.querySelector('#btnAceptar');
const botonCancelarCierre = document.querySelector('#btnCancelar');

/** Nuevo cambio Manuel Delgado **/
let listaUsuarios = obtenerUsuarios();
let tipoUsuario = sessionStorage.getItem('tipo_usuario');

function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = 'inicio_sesion.html';

};

function noSalir() {
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


/*function mostrarListaUsuarios() {

    let filtro = correo;

    let tbody = document.querySelector('#tblUsuarios tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]['correo'].toLowerCase().includes(filtro.toLowerCase())) {
           
            let fila13 = tbody.insertRow();

            let celdaImagen13 = fila13.insertCell();
            celdaImagen13.id = "fotoavatar";
            

            let imagen13 = document.createElement('img');
            imagen13.classList.add('imagenTabla13');
            if (listaUsuarios[i]['imagen']) {
                imagen13.src = listaUsuarios[i]['imagen'];
            } else {
                imagen13.src = 'imgs/empresa1.jpg';
            }

            celdaImagen13.appendChild(imagen13);


        }


    }
};*/






botonCerrarSesion.addEventListener('click', cerrarSesion);
botonCancelarCierre.addEventListener('click', noSalir);