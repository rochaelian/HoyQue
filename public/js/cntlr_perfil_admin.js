/** Nuevo cambio Manuel Delgado **/
'use strict';

let botonEditar = document.querySelector('#btnEditar'); // sst v3 lo subi
const usuarioImagen = document.querySelector('#imgUsuarioPerfil');
const usuarioPNombre = document.querySelector('#usuariopNombre');
const usuarioPApellido = document.querySelector('#usuariopApellido');
const usuarioCIdentidad = document.querySelector('#usuariocIdentidad');
const usuarioEmailContacto = document.querySelector('#usuarioEmailCon');
const usuarioSNombre = document.querySelector('#usuariosNombre');
const usuarioSApellido = document.querySelector('#usuariosApellido');
const usuarioEdad = document.querySelector('#usuarioEdad');

// Daniel -- Quitarle el LET ya esta declarada en cntlr_nav.js
listaUsuarios = obtenerUsuarios();

let idUnico = sessionStorage.getItem('idUnico'); // agregue esta linea SST
let usuarioid = buscar_usuario(idUnico); // sst

obtenerUsuarios();

function mostrarSoloUsuario() {
    let sesionCorreo = sessionStorage.getItem('correo');

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]['correo'] == sesionCorreo) {

     botonEditar.dataset.id_usuario = listaUsuarios[i]['_id']; // sst v3 lo coloque aqui

            let imagen = listaUsuarios[i]['imagen'];
            let pNombre = listaUsuarios[i]['pnombre'];
            let pApellido = listaUsuarios[i]['papellido'];
            let cIdentidad = listaUsuarios[i]['identidad'];
            let emailCon = listaUsuarios[i]['correo'];
            let sNombre = listaUsuarios[i]['snombre'];
            let sApellido = listaUsuarios[i]['sapellido'];
            let edad = listaUsuarios[i]['edad'];

            if (listaUsuarios[i]['correo'] == sesionCorreo) {
                if (imagen != '') {
                    usuarioImagen.src = imagen;
                } else {
                    usuarioImagen.src = 'imgs/usuario.png';
                }
            } else {
                usuarioImagen.src = 'imgs/usuario.png';
            }

            usuarioPNombre.innerHTML = '';
            let textoPNombre;
            if (sNombre != '') {
                textoPNombre = document.createTextNode(pNombre + ' ' + sNombre + ' ' + pApellido);
            } else if (sApellido != '') {
                textoPNombre = document.createTextNode(pNombre + ' ' + pApellido + ' ' + sApellido);
            } else if (sNombre != '' && sApellido != '') {
                textoPNombre = document.createTextNode(pNombre + ' ' + sNombre + ' ' + pApellido + ' ' + sApellido);
            } else {
                textoPNombre = document.createTextNode(pNombre + ' ' + pApellido);
            }
            usuarioPNombre.appendChild(textoPNombre);

            usuarioCIdentidad.innerHTML = '';
            let textoCIdentidad = document.createTextNode(cIdentidad);
            usuarioCIdentidad.appendChild(textoCIdentidad);

            usuarioEmailContacto.innerHTML = '';
            let textoEmailContacto = document.createTextNode(emailCon);
            usuarioEmailContacto.appendChild(textoEmailContacto);

            usuarioEdad.innerHTML = '';
            let textoEdad = document.createTextNode(edad);
            usuarioEdad.appendChild(textoEdad);
        }
    }

};

mostrarSoloUsuario();

const usuariosTotales = document.querySelector('#usuariosTotal');
const categoriasTotales = document.querySelector('#categoriasTotal');
const patrocinadoresTotales = document.querySelector('#patrocinadoresTotal');
const lugaresTotales = document.querySelector('#lugaresTotal');
const industriasTotales = document.querySelector('#industriasTotal');
// const palabrasTotales = document.querySelector('#palabrasTotal');

let listaActividades = obtenerActividades();
let listaLugares = obtenerLugar();
let listaCategorias = obtenerCategorias();
let listaPatrocinadores = obtenerPatrocinadores();
// let listaPalabrasClaves = obtenerMensajes();
let listaIndustrias = obtenerIndustrias();

function numerosTotales() {
    usuariosTotales.innerHTML = '';
    let cantidadUsuarios = Number(listaUsuarios.length);
    let textoUsuarios = cantidadUsuarios.toString();
    usuariosTotales.innerHTML = textoUsuarios;

    categoriasTotales.innerHTML = '';
    let cantidadCategorias = Number(listaCategorias.length);
    let textoCategorias = cantidadCategorias.toString();
    categoriasTotales.innerHTML = textoCategorias;

    patrocinadoresTotales.innerHTML = '';
    let cantidadPatrocinadores = Number(listaPatrocinadores.length);
    let textoPatrocinadores = cantidadPatrocinadores.toString();
    patrocinadoresTotales.innerHTML = textoPatrocinadores;

    industriasTotales.innerHTML = '';
    let cantidadIndustrias = Number(listaIndustrias.length);
    let textoIndustrias = cantidadIndustrias.toString();
    industriasTotales.innerHTML = textoIndustrias;

    lugaresTotales.innerHTML = '';
    let cantidadLugares = Number(listaLugares.length);
    let textoLugares = cantidadLugares.toString();
    lugaresTotales.innerHTML = textoLugares;

    // palabrasTotales.innerHTML = '';
    // let cantidadPalabras = Number(listaPalabrasClaves.length);
    // let textoPalabras = cantidadPalabras.toString();
    // palabrasTotales.innerHTML = textoPalabras;
}

numerosTotales();

// agregue de aqui para abajo SST

// let botonEditar = document.querySelector('#btnEditar'); // sst v3 lo comente
//botonEditar.dataset.idUnico=listaUsuarios[i]['idUnico']; // sst
// botonEditar.dataset.idUnico = idUnico; // sst v3 lo comente
botonEditar.addEventListener('click', mostrarDatosUsuario); // sst


// let botonBorrar = document.querySelector('#btnBorrar'); // sst
// botonBorrar.dataset.idUnico = idUnico; // sst
// botonBorrar.addEventListener('click', confirmarBorrado); // sst



// if (usuarioid['estado'] == 'Habilitado') {

//     let botonDeshabilitar = document.querySelector('#btnDeshabilitar'); // sst
//     botonDeshabilitar.dataset.idUnico = idUnico; // sst
//     botonDeshabilitar.addEventListener('click', deshabilitar); // sst
//     $('#btnDeshabilitar').addClass('deshabilitar');

// } else {


//     let botonDeshabilitar = document.querySelector('#btnDeshabilitar'); // sst
//     botonDeshabilitar.dataset.idUnico = idUnico; // sst
//     botonDeshabilitar.addEventListener('click', habilitar); // sst
//     $('#btnDeshabilitar').addClass('habilitar');


// };


function confirmarBorrado() {

    let id_usuario = this.dataset.idUnico;  //sst 

    swal({
        title: '¿Está seguro que desea eliminar el usuario?',
        text: "¡Este proceso no se puede revertir!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro!'
    }).then((result) => {
        if (result.value) {
            borrar_usuario(id_usuario);
            swal(
                '¡Usuario eliminado!',
                'El usuario fue borrado con éxito.',
                'success'
            )
        }

        setInterval(function () {

            window.location.href = 'inicio_sesion.html';
    
        }, 2000);


    })

    

};


function deshabilitar() {

    let id_usuario = this.dataset.idUnico;  //sst 
    deshabilitar_usuario(id_usuario);


    swal({

        type: 'success',
        title: 'Se ha deshabilitado exitosamente',
        text: 'Dar click en botón para continuar',
        confirmButtonText: 'OK'

    }


    );

    setInterval(function () {
       
        if (usuario == 'Empresa') {

          //  window.location.href = 'perfil_empresa.html'; //SST v2
            window.location.href = 'inicio_sesion.html'; //SST v2
        }

        if (usuario == 'Cliente') {

           // window.location.href = 'perfil_cliente.html'; //SST v2
            window.location.href = 'inicio_sesion.html'; //SST v2

        }

        if (usuario == 'Administrador') {

            window.location.href = 'perfil_admin.html';

        }

    }, 2000);


};


function habilitar() {

    let id_usuario = this.dataset.idUnico;  //sst 
    habilitar_usuario(id_usuario);


    swal({

        type: 'success',
        title: 'Se ha habilitado exitosamente',
        text: 'Dar click en botón para continuar',
        confirmButtonText: 'OK'

    }


    );

    setInterval(function () {

        if (usuario == 'Empresa') {

            window.location.href = 'perfil_empresa.html';
        }

        if (usuario == 'Cliente') {

            window.location.href = 'perfil_cliente.html';

        }

        if (usuario == 'Administrador') {

            window.location.href = 'perfil_admin.html';

        }

    }, 2000);


};


function mostrarDatosUsuario() {    //sst

    let id_usuario = this.dataset.id_usuario;  //sst 
    localStorage.setItem('idUsuario', id_usuario);  //sst
    window.location.href = 'modificar_usuario.html'; //sst


};