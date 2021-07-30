'use strict'

let idUnico = sessionStorage.getItem('idUnico'); // sst V3
let tipoUsuario = sessionStorage.getItem('tipo_usuario');
let botonEditar; //sst V3
let botonBorrar; // sst V3
let botonDesHabilitar; // sst V3
let botonBannear; // sst V3
let comentario; // sst V3
let desh;
let userModi;

const inputFiltro = document.querySelector('#txtFiltro');
inputFiltro.addEventListener('keyup', mostrarUsers);

listaUsuarios = obtenerUsuarios();


// let $radios = $('input[name="filtroUsuario"]');

// $radios.change(function () {
//     let $checked = $radios.filter(':checked');
//     console.log($checked.val());
// });

mostrarUsers();

function mostrarUsers(psinputRadio) {
    let tbody = document.querySelector('#listaUsuarios tbody');
    let filtro = inputFiltro.value;

    tbody.innerHTML = '';

    for (let i = 0; i < listaUsuarios.length; i++) {

        if (listaUsuarios[i]['pnombre'].toLowerCase().includes(filtro.toLowerCase()) || listaUsuarios[i]['snombre'].toLowerCase().includes(filtro.toLowerCase()) || listaUsuarios[i]['papellido'].toLowerCase().includes(filtro.toLowerCase()) || listaUsuarios[i]['sapellido'].toLowerCase().includes(filtro.toLowerCase()) || listaUsuarios[i]['identidad'].toLowerCase().includes(filtro.toLowerCase()) || listaUsuarios[i]['correo'].toLowerCase().includes(filtro.toLowerCase()) || listaUsuarios[i]['edad'].toLowerCase().includes(filtro.toLowerCase()) || listaUsuarios[i]['usuario'].toLowerCase().includes(filtro.toLowerCase())) {
            let fila = tbody.insertRow();

            // let celdaPrimerNombre = fila.insertCell();
            // let celdaPrimerApellido = fila.insertCell();
            // let celdaSegundoApellido = fila.insertCell();

            let celdaNombreUsuario = fila.insertCell();
            let celdaNombreUnico = fila.insertCell();
            // let celdaTipoUsuario = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            let celdaIdentificacion = fila.insertCell();
            let celdaEdad = fila.insertCell();
            let celdaFoto = fila.insertCell();
            let celdaOpciones = fila.insertCell();



            // botones de opciones

            let listaOpciones = document.createElement('ul');
            listaOpciones.classList.add('lista-opciones');
            let botonEditarBorrarLi = document.createElement('li');


            botonEditar = document.createElement('a'); // sst v3 quite el let
            //   botonEditar.href = '#';
            botonEditar.classList.add('far');
            botonEditar.classList.add('fa-edit');
            //  botonEditar.id="btnEditar"; // SST V3
            //  botonEditar.dataset.idUnico = idUnico; // sst V3
            botonEditar.dataset.id_usuario = listaUsuarios[i]['_id']; // sst v3
            //  botonEditar.addEventListener('click', editarUsuario); // sst v3
            botonEditar.addEventListener('click', mostrarDatosUsuario); // sst V3


            botonBorrar = document.createElement('a');
            //  botonBorrar.href = '#'; // sst v3
            botonBorrar.classList.add('far');
            botonBorrar.classList.add('fa-trash-alt');
            botonBorrar.dataset.id_usuario = listaUsuarios[i]['_id'];
            // botonBorrar.addEventListener('click', borrarUsuario);
            botonBorrar.addEventListener('click', confirmarBorrado);



            let botonBannearLi = document.createElement('li');
            botonBannear = document.createElement('input');
            botonBannear.id = "inputBanear"; // sst v3
            let botonBannearLabel = document.createElement('label');
            // botonBannear.href = '#';
            botonBannear.type = 'checkbox';
            botonBannear.checked = 'false';
            botonBannear.name = 'bannear';
            botonBannearLabel.innerText = 'Banear'
            botonBannear.dataset.id_usuario = listaUsuarios[i]['_id'];
            //  botonBannear.addEventListener('click', bannearUsuario);

            let baneado = listaUsuarios[i]['baneado']; // sst v3

            if (baneado == 'No') { // sst v3

                botonBannear.checked = false; // sst v3

            } else { // sst v3

                botonBannear.checked = true; //sst v3

            } // sst v3

            botonBannear.addEventListener('click', bannearUsuario); // sst v3

            let botonDesHabilitarLi = document.createElement('li');
            botonDesHabilitar = document.createElement('input');



            botonDesHabilitar.id = "inputDeshabilitar"; // sst v3
            botonDesHabilitar.value = "Deshabilitar";
            let botonDesHabilitarLabel = document.createElement('label');
            //  botonDesHabilitar.href = '#';
            botonDesHabilitar.type = 'checkbox';
            //   botonDesHabilitar.checked = false;
            botonDesHabilitar.name = 'deshabilitar';
            botonDesHabilitarLabel.innerText = 'Deshabilitar';
            botonDesHabilitar.dataset.id_usuario = listaUsuarios[i]['_id'];

            let estado = listaUsuarios[i]['estado']; // sst v3




            if (estado == 'Habilitado') { // sst v3

                botonDesHabilitar.checked = false; // sst v3


            } else { // sst v3

                botonDesHabilitar.checked = true; //sst v3


            } // sst v3


            botonDesHabilitar.addEventListener('click', deshabilitarUsuario); // sst v3



            // celdaPrimerNombre.innerHTML = listaUsuarios[i]['pnombre'];
            // celdaPrimerApellido.innerHTML = listaUsuarios[i]['papellido'];
            // celdaSegundoApellido.innerHTML = listaUsuarios[i]['sapellido'];

            celdaNombreUsuario.innerHTML = listaUsuarios[i]['pnombre'] + ' ' + listaUsuarios[i]['papellido'] + ' ' + '(' + listaUsuarios[i]['usuario'] + ')';
           
            userModi=listaUsuarios[i]['usuario']; //sst v4

            celdaNombreUnico.innerHTML = listaUsuarios[i]['fantasia'];
            // celdaTipoUsuario.innerHTML = listaUsuarios[i]['usuario'];
            celdaCorreo.innerHTML = listaUsuarios[i]['correo'];
            celdaIdentificacion.innerHTML = listaUsuarios[i]['identidad'];
            celdaEdad.innerHTML = listaUsuarios[i]['edad'];
            let imgUrlUsuario = document.createElement('img');
            let imgUsuario = listaUsuarios[i]['imagen'];
            if (imgUsuario == '') {
                imgUrlUsuario.src = 'imgs/usuario.png';
            } else {
                imgUrlUsuario.src = imgUsuario;
            }
            celdaFoto.appendChild(imgUrlUsuario);
            celdaOpciones.appendChild(listaOpciones);
            listaOpciones.appendChild(botonEditarBorrarLi);
            listaOpciones.appendChild(botonBannearLi);
            listaOpciones.appendChild(botonDesHabilitarLi);
            botonEditarBorrarLi.appendChild(botonEditar);
            botonEditarBorrarLi.appendChild(botonBorrar);
            botonBannearLi.appendChild(botonBannear);
            botonBannearLi.appendChild(botonBannearLabel);
            botonDesHabilitarLi.appendChild(botonDesHabilitar);
            botonDesHabilitarLi.appendChild(botonDesHabilitarLabel);

        }

    }

};



// SST V3 de aqui para abajo agregado

//botonEditar = document.querySelectorAll('#btnEditar'); // sst V3

//const btnclick=document.querySelectorAll('#inputDeshabilitar');
//btnclick.addEventListener('click', deshabilitarUsuario);


function mostrarDatosUsuario() { //sst V3

    let id_usuario = this.dataset.id_usuario; //sst V3
    localStorage.setItem('idUsuario', id_usuario); //sst V3
    localStorage.setItem('userModi',userModi);
    window.location.href = 'modificar_usuario.html'; //sst V3


};


//function editarUsuario(){  //sst V3
//  console.log('editar usuario') // sst V3
//}  // sst V3

//function borrarUsuario() {
//  console.log('borrar usuario')
//}

async function bannearUsuario() {


    let check = this; // sst v3
    if (this.checked == true) { //sst v3



        let id_usuario = this.dataset.id_usuario;
        const {
            value: text
        } = await Swal({ // sst v3
            input: 'textarea',
            inputPlaceholder: 'Favor indicar el motivo por el que está baneando al usuario',
            showCancelButton: true
        })

        if (text) {

            comentario = text;
        } else {

            comentario = 'No se agregó ningún comentario del motivo del baneo';

        }

        banear(id_usuario, comentario);




    } else {

        let id_usuario = this.dataset.id_usuario;
        desbanear(id_usuario);



    }

}

// if (document.querySelector('#inputBanear input[type=checkbox]:checked') == null) {

//   let id_usuario = this.dataset.id_usuario;




//   banear(id_usuario, comentario);

//  } else {
//      let id_usuario = this.dataset.id_usuario;
//     desbanear(id_usuario);

//  }

//}



function deshabilitarUsuario() {

    let check = this; // sst v3
    if (this.checked == true) { //sst v3

        let id_usuario = this.dataset.id_usuario;
        deshabilitar(id_usuario);


    } else {


        let id_usuario = this.dataset.id_usuario;
        habilitar(id_usuario);


    }

    //    if (document.querySelector('#inputDeshabilitar input[type=checkbox]:checked') ==null) {

    //  } else {

    // }


}

function confirmarBorrado() {

    let id_usuario = this.dataset.id_usuario; //sst 
    let usuarioB = buscar_usuario(id_usuario);
    let accion = `Ha eliminado al usuario:  ${usuarioB['pnombre']} ${usuarioB['papellido']} `;

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
            let bitacora = obtenerDatosBitacora(accion);
            swal(
                '¡Usuario eliminado!',
                'El usuario fue borrado con éxito.',
                'success'
            )
        }

        setInterval(function () {

            window.location.href = 'listar_usuarios.html';

        }, 2000);


    })



};



function deshabilitar(id_usuario) {

    // let id_usuario = this.dataset.id_usuario;  //sst 
    deshabilitar_usuario(id_usuario);

    let id_usuarioD = id_usuario;
    let usuarioD = buscar_usuario(id_usuarioD);
    let accion = `Ha deshabilitado al usuario:  ${usuarioD['pnombre']} ${usuarioD['papellido']} `;
    let bitacora = obtenerDatosBitacora(accion);


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

            window.location.href = 'listar_usuarios.html';

        }

    }, 2000);


};



function habilitar(id_usuario) {

    //   let id_usuario = this.dataset.id_usuario;  //sst 
    habilitar_usuario(id_usuario);

    let id_usuarioD = id_usuario;
    let usuarioD = buscar_usuario(id_usuarioD);
    let accion = `Ha habilitado al usuario:  ${usuarioD['pnombre']} ${usuarioD['papellido']} `;
    let bitacora = obtenerDatosBitacora(accion);

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

            window.location.href = 'listar_usuarios.html';

        }

    }, 2000);


};


// sst v3 


function desbanear(id_usuario) {

    // let id_usuario = this.dataset.id_usuario;  //sst 
    desbanear_usuario(id_usuario);

    let id_usuariob = id_usuario;
    let usuariob = buscar_usuario(id_usuariob);
    let accion = `Ha desbaneado al usuario:  ${usuariob['pnombre']} ${usuariob['papellido']} `;
    let bitacora = obtenerDatosBitacora(accion);

    swal({

            type: 'success',
            title: 'Se ha desbaneado exitosamente',
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

            window.location.href = 'listar_usuarios.html';

        }

    }, 2000);


};



function banear(id_usuario, comentario) {

    //   let id_usuario = this.dataset.id_usuario;  //sst 
    banear_usuario(id_usuario, comentario);

    let id_usuariob = id_usuario;
    let usuariob = buscar_usuario(id_usuariob);
    let accion = `Ha baneado al usuario:  ${usuariob['pnombre']} ${usuariob['papellido']} `;
    let bitacora = obtenerDatosBitacora(accion);

    swal({

            type: 'success',
            title: 'Se ha baneado exitosamente',
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

            window.location.href = 'listar_usuarios.html';

        }

    }, 2000);


};

/******************************************************/
/********** Función para registrar bitácora **********/
/****************************************************/

function obtenerDatosBitacora(paccion) {
    let bitacora = false;
    let accion = paccion;
    let listaUsuarios = obtenerUsuarios();
    let sesionCorreo = sessionStorage.getItem('correo');
    let rol = tipoUsuario;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]['correo'] == sesionCorreo) {
            let nombre = listaUsuarios[i]['pnombre'];
            let respuesta = registrar_bitacora(rol, sesionCorreo, nombre, accion);
            if (respuesta.success == true) {
                bitacora = true;
            }
        }
    }
    return bitacora;
};