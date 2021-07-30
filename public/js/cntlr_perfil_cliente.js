/** Nuevo cambio Manuel Delgado **/
'use strict';

const usuarioImagen = document.querySelector('#imgUsuarioPerfil');
const usuarioPNombre = document.querySelector('#usuariopNombre');
const usuarioPApellido = document.querySelector('#usuariopApellido');
const usuarioCIdentidad = document.querySelector('#usuariocIdentidad');
const usuarioEmailContacto = document.querySelector('#usuarioEmailCon');
const usuarioNComercial = document.querySelector('#usuarioNombreComer');
const usuarioEmailEmpresa = document.querySelector('#usuarioEmailEmp');
const usuarioSNombre = document.querySelector('#usuariosNombre');
const usuarioSApellido = document.querySelector('#usuariosApellido');
const usuarioEdad = document.querySelector('#usuarioEdad');
const usuarioRazonSoc = document.querySelector('#usuarioRazonSoc');
const usuarioCJuridica = document.querySelector('#usuariocJuridica');

const usuarioLugares = document.querySelector('#listaLugares');
const usuarioActividades = document.querySelector('#lista-actividades');

/** Nuevo cambio Manuel Delgado **/
// Daniel -- Quitarle el LET ya esta declarada en cntlr_nav.js
listaUsuarios = obtenerUsuarios();

let idUnico = sessionStorage.getItem('idUnico'); // agregue esta linea SST
let usuarioid = buscar_usuario(idUnico); // sst
let tipoUsuario = sessionStorage.getItem('tipo_usuario');

obtenerUsuarios();

function mostrarSoloUsuario() {
    let sesionCorreo = sessionStorage.getItem('correo');

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]['correo'] == sesionCorreo) {

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

// let listaActividades = obtenerActividades();
let listaActividadesHabilitadas = obtenerActividadesHabilitadas();
let dataUsuarios = obtenerUsuarios();
let actividadesReservadas = listaActividadesReservadas();

function listaActividadesReservadas() {
    let listaReservaciones = [];
    for (let j = 0; j < dataUsuarios.length; j++) {
        if (dataUsuarios[j]['_id'] == id_usuario) {
            listaReservaciones = dataUsuarios[j]['reservacion'];
            let listaIdsActividadesReservadas = [];
            if (listaReservaciones === null) {
                return listaIdsActividadesReservadas;
            } else {
                for (let i = 0; i < listaReservaciones.length; i++) {
                    let idActividadesReservadas = listaReservaciones[i]['idActividadReservada'];
                    let id_reservacion = listaReservaciones[i]['_id'];
                    listaIdsActividadesReservadas.push(idActividadesReservadas);
                }
                return listaIdsActividadesReservadas;
            }

        }
    }
};


function cancelarReserva() {
    let id_actividad = this.dataset.id_actividad;
    let reservationArray = [];
    let id_reservacion;
    for (let j = 0; j < dataUsuarios.length; j++) {
        if (dataUsuarios[j]['_id'] == id_usuario) {
            reservationArray = dataUsuarios[j]['reservacion'];
            for (let k = 0; k < reservationArray.length; k++) {
                if (reservationArray[k].idActividadReservada === id_actividad) {
                    id_reservacion = reservationArray[k]._id;
                }
            }
        }
    }
    let nombreActividad;
    let cupoActividad;
    for (let i = 0; i < listaActividadesHabilitadas.length; i++) {
        if (listaActividadesHabilitadas[i]['_id'] == id_actividad) {
            nombreActividad = listaActividadesHabilitadas[i]['tituloActividad'];
            cupoActividad = listaActividadesHabilitadas[i]['cupoActividad'];
        }
    }
    swal({
        title: '¿Está seguro que desea cancelar su reservación a esta actividad?',
        text: 'Si cambia su opinión igual puede volver a reservar siempre y cuando aún existan cupos disponibles',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, cancele mi reservación!'
    }).then((result) => {
        if (result.value) {
            cupoActividad = cupoActividad + 1;
            actualizarCupoActividad(id_actividad, cupoActividad);
            cancelar_reservacion(id_usuario, id_reservacion, id_actividad, nombreActividad);
            let accion = `Canceló su reservación para la la actividad:  ${nombreActividad} `;
            let bitacora = obtenerDatosBitacora(accion);
            swal(
                '¡Cancelada!',
                'Su reservación ha sido cancelada con éxisto',
                'success'
            ).then(function () {
                location.reload();
            })
        }
    })
};


function mostrarActividades() {
    usuarioActividades.innerHTML = '';
    if (actividadesReservadas.length === 0) {
        console.log('No hay reservaciones');
        //titulo de cada actividad
        let noReservaciones = document.createElement('h4');
        noReservaciones.innerHTML = `Usted no tiene reservaciones, le invitamos a ver las <a href="listar_actividades.html">opciones de las actividades disponibles</a> y reservar una.`;
        usuarioActividades.appendChild(noReservaciones);
    }
    //ciclo para todos los almacenados
    for (let i = 0; i < listaActividadesHabilitadas.length; i++) {
        for (let j = 0; j < actividadesReservadas.length; j++) {
            if (actividadesReservadas[j] == listaActividadesHabilitadas[i]['_id']) {
                let uniqueActivityID = actividadesReservadas[j];

                let titulo = listaActividadesHabilitadas[i]['tituloActividad'];
                let lugar = listaActividadesHabilitadas[i]['ubicacionActividad'];
                let dia = listaActividadesHabilitadas[i]['fechaActividad'];
                let nuevoDia = new Date(dia);
                let formatoDia = nuevoDia.toLocaleDateString();

                let capacidad = listaActividadesHabilitadas[i]['capacidadParticipantesActividad'];
                let costo = listaActividadesHabilitadas[i]['costoActividad'];
                let moneda = listaActividadesHabilitadas[i]['monedaActividad'];
                let horaInicio = listaActividadesHabilitadas[i]['horaInicioActividad'];
                let horaFin = listaActividadesHabilitadas[i]['horaFinActividad'];
                let imagen = listaActividadesHabilitadas[i]['fotoActividad'];

                //div contenedor de cada entrada
                let divFila = document.createElement('div');
                divFila.classList.add('entrada-actividad');

                //div contenedor de imagen
                let divIzquierdo = document.createElement('div');
                divIzquierdo.classList.add('lado-izq');

                //subir imágenes
                let contenedorImagen = document.createElement('figure');
                contenedorImagen.classList.add('subir-imagenes');
                let imgLugar = document.createElement('img');
                if (imagen) {
                    imgLugar.src = imagen;
                    imgLugar.alt = titulo;
                } else {
                    imgLugar.src = 'imgs/placeholder.png';
                    imgLugar.alt = 'Actividad';
                }
                contenedorImagen.appendChild(imgLugar);
                divIzquierdo.appendChild(contenedorImagen);
                divFila.appendChild(divIzquierdo);

                //div contenedor de info derecho
                let divDerecho = document.createElement('div');
                divDerecho.classList.add('lado-der');

                //titulo de cada actividad
                let tituloActividad = document.createElement('h4');
                let textoTitulo = document.createTextNode(titulo);
                tituloActividad.appendChild(textoTitulo);
                divDerecho.appendChild(tituloActividad);

                //subir caracteristicas
                let contenedorCaracteristicas = document.createElement('ul');
                contenedorCaracteristicas.classList.add('caracteristicas-Activ');
                let liDia = document.createElement('li');
                let textoDia = document.createTextNode(formatoDia);
                liDia.appendChild(textoDia);
                let liHora = document.createElement('li');
                let textoHora = document.createTextNode('Inicio: ' + horaInicio + ' - Fin: ' + horaFin);
                liHora.appendChild(textoHora);
                contenedorCaracteristicas.appendChild(liDia);
                contenedorCaracteristicas.appendChild(liHora);
                divDerecho.appendChild(contenedorCaracteristicas);

                //subir caracteristicas
                let contenedorlugar = document.createElement('ul');
                contenedorlugar.classList.add('caracteristicas-Activ');
                let liLugar = document.createElement('li');
                let textoLugar = document.createTextNode(lugar);
                liLugar.appendChild(textoLugar);
                contenedorlugar.appendChild(liLugar);
                divDerecho.appendChild(contenedorlugar);

                //subir caracteristicas
                let contenedorInformacion = document.createElement('ul');
                contenedorInformacion.classList.add('caracteristicas-Activ');
                let liCapacidad = document.createElement('li');
                let textoCapacidad = document.createTextNode('Capacidad: ' + capacidad);
                liCapacidad.appendChild(textoCapacidad);
                let liCosto = document.createElement('li');
                let textoCosto = document.createTextNode('Costo: ' + costo + ' ' + moneda);
                liCosto.appendChild(textoCosto);
                contenedorInformacion.appendChild(liCapacidad);
                contenedorInformacion.appendChild(liCosto);
                divDerecho.appendChild(contenedorInformacion);
                divFila.appendChild(divDerecho);

                //clearfix
                let divClear = document.createElement('div');
                divClear.classList.add('clearfix');
                divFila.appendChild(divClear);

                //subir botones
                let divBoton = document.createElement('div');
                divBoton.classList.add('posicion-btn-mini');

                /****Manuel Delgado****/
                // Rating System
                let idActividad = listaActividadesHabilitadas[i]['_id'];

                let liRating = document.createElement('div');
                liRating.classList.add('ratingActividad');
                let numberRating = document.createElement('b');
                numberRating.classList.add('rating-number');
                let valueNumberRating = listaActividadesHabilitadas[i]['ratingActividad'];
                numberRating.innerText = valueNumberRating;
                liRating.appendChild(numberRating);
                let divRating = document.createElement('div');
                divRating.classList.add('rating');

                // 5 star
                let inputRadio5 = document.createElement('input');
                inputRadio5.id = '5' + '-' + idActividad;
                inputRadio5.type = 'radio';
                inputRadio5.name = 'rating' + '-' + idActividad;
                inputRadio5.value = '5';
                inputRadio5.disabled = true;
                inputRadio5.classList.add('estrella-5');
                let labelRadio5 = document.createElement('label');
                labelRadio5.htmlFor = '5' + '-' + idActividad;
                let iRadio5 = document.createElement('i');
                iRadio5.classList.add('fas', 'fa-3x', 'fa-star');
                labelRadio5.appendChild(iRadio5);
                divRating.appendChild(inputRadio5);
                divRating.appendChild(labelRadio5);

                // 4 star
                let inputRadio4 = document.createElement('input');
                inputRadio4.id = '4' + '-' + idActividad;
                inputRadio4.type = 'radio';
                inputRadio4.name = 'rating' + '-' + idActividad;
                inputRadio4.value = '4';
                inputRadio4.disabled = true;
                inputRadio4.classList.add('estrella-4');
                let labelRadio4 = document.createElement('label');
                labelRadio4.htmlFor = '4' + '-' + idActividad;
                let iRadio4 = document.createElement('i');
                iRadio4.classList.add('fas', 'fa-3x', 'fa-star');
                labelRadio4.appendChild(iRadio4);
                divRating.appendChild(inputRadio4);
                divRating.appendChild(labelRadio4);

                // 3 star
                let inputRadio3 = document.createElement('input');
                inputRadio3.id = '3' + '-' + idActividad;
                inputRadio3.type = 'radio';
                inputRadio3.name = 'rating' + '-' + idActividad;
                inputRadio3.value = '3';
                inputRadio3.disabled = true;
                inputRadio3.classList.add('estrella-3');
                let labelRadio3 = document.createElement('label');
                labelRadio3.htmlFor = '3' + '-' + idActividad;
                let iRadio3 = document.createElement('i');
                iRadio3.classList.add('fas', 'fa-3x', 'fa-star');
                labelRadio3.appendChild(iRadio3);
                divRating.appendChild(inputRadio3);
                divRating.appendChild(labelRadio3);

                // 2 star
                let inputRadio2 = document.createElement('input');
                inputRadio2.id = '2' + '-' + idActividad;
                inputRadio2.type = 'radio';
                inputRadio2.name = 'rating' + '-' + idActividad;
                inputRadio2.value = '2';
                inputRadio2.disabled = true;
                inputRadio2.classList.add('estrella-2');
                let labelRadio2 = document.createElement('label');
                labelRadio2.htmlFor = '2' + '-' + idActividad;
                let iRadio2 = document.createElement('i');
                iRadio2.classList.add('fas', 'fa-3x', 'fa-star');
                labelRadio2.appendChild(iRadio2);
                divRating.appendChild(inputRadio2);
                divRating.appendChild(labelRadio2);

                // 1 star
                let inputRadio1 = document.createElement('input');
                inputRadio1.id = '1' + '-' + idActividad;
                inputRadio1.type = 'radio';
                inputRadio1.name = 'rating' + '-' + idActividad;
                inputRadio1.value = '1';
                inputRadio1.disabled = true;
                inputRadio1.classList.add('estrella-1');
                let labelRadio1 = document.createElement('label');
                labelRadio1.htmlFor = '1' + '-' + idActividad;
                let iRadio1 = document.createElement('i');
                iRadio1.classList.add('fas', 'fa-3x', 'fa-star');
                labelRadio1.appendChild(iRadio1);
                divRating.appendChild(inputRadio1);
                divRating.appendChild(labelRadio1);

                liRating.appendChild(divRating);
                divBoton.appendChild(liRating);
                /****Manuel Delgado****/

                //subir opciones
                let contenedorOpciones = document.createElement('ul');
                contenedorOpciones.classList.add('cancelar-reserva');
                let itemOpcionCancelarReserva = document.createElement('li');
                let inputCancelarReserva = document.createElement('input');
                let labelCancelarReserva = document.createElement('label');
                itemOpcionCancelarReserva.appendChild(inputCancelarReserva);
                itemOpcionCancelarReserva.appendChild(labelCancelarReserva);
                inputCancelarReserva.dataset.id_actividad = uniqueActivityID;
                inputCancelarReserva.name = 'opcionCancelarReserva';
                inputCancelarReserva.value = 'Cancelar_Reserva';
                inputCancelarReserva.checked = 'checked';
                labelCancelarReserva.innerText = 'Cancelar Reserva';
                inputCancelarReserva.addEventListener('click',
                    cancelarReserva);
                contenedorOpciones.appendChild(itemOpcionCancelarReserva);
                divBoton.appendChild(contenedorOpciones);
                itemOpcionCancelarReserva.classList.add('opcionCancelarReserva');
                inputCancelarReserva.type = 'checkbox';


                //subir boton ver mas
                let botonVerMas = document.createElement('button');
                botonVerMas.type = 'button';
                botonVerMas.classList.add('btn-tres');
                let textobotonVerMas = document.createTextNode('Ver más');
                botonVerMas.appendChild(textobotonVerMas);
                botonVerMas.dataset.id_actividad = listaActividadesHabilitadas[i]['_id'];
                divBoton.appendChild(botonVerMas);
                botonVerMas.addEventListener('click', visualizarActividad); //activar la redirección

                divFila.appendChild(divBoton);
                usuarioActividades.appendChild(divFila);

                /****Manuel Delgado****/
                //mostrar calificación
                let star5 = inputRadio5.id;
                let calificacion5 = document.getElementById(star5);
                let star4 = inputRadio4.id;
                let calificacion4 = document.getElementById(star4);
                let star3 = inputRadio3.id;
                let calificacion3 = document.getElementById(star3);
                let star2 = inputRadio2.id;
                let calificacion2 = document.getElementById(star2);
                let star1 = inputRadio1.id;
                let calificacion1 = document.getElementById(star1);

                switch (valueNumberRating) {
                    case 5:
                        calificacion5.checked = true;
                        break;
                    case 4:
                        calificacion4.checked = true;
                        break;
                    case 3:
                        calificacion3.checked = true;
                        break;
                    case 2:
                        calificacion2.checked = true;
                        break;
                    case 1:
                        calificacion1.checked = true;
                        break;
                    default:
                        break;
                };
                /****Manuel Delgado****/
            }

        }
    };

};

mostrarActividades();

function visualizarActividad() {
    let id_actividad = this.dataset.id_actividad;
    localStorage.setItem('actividad', id_actividad);
    window.location.href = 'perfil_actividad.html';
};

let listaLugares = obtenerLugar();
let listaLugaresSeguidos = usuarioid['seguidos'];

function mostrarLugares() {
    usuarioLugares.innerHTML = '';

    //ciclo para todos los almacenados
    if (listaLugaresSeguidos != 0 && listaLugaresSeguidos != undefined) {
        for (let i = 0; i < listaLugares.length; i++) {
            for (let j = 0; j < listaLugaresSeguidos.length; j++) {
                if (listaLugaresSeguidos[j]['idLugar'] == listaLugares[i]['_id']) {
                    let titulo = listaLugares[i]['titulo'];
                    let imagen = listaLugares[i]['imagen'];

                    //div contenedor de cada entrada
                    let divFila = document.createElement('div');
                    divFila.classList.add('entrada-lugar');

                    //div contenedor de imagen
                    let divUnico = document.createElement('div');
                    divUnico.classList.add('centro');

                    //subir imágenes
                    let contenedorImagen = document.createElement('figure');
                    contenedorImagen.classList.add('subir-imagenes');
                    let imgLugar = document.createElement('img');
                    if (imagen) {
                        imgLugar.src = imagen;
                        imgLugar.alt = titulo;
                    } else {
                        imgLugar.src = 'imgs/placeholder.png';
                        imgLugar.alt = 'Lugar';
                    }
                    contenedorImagen.appendChild(imgLugar);
                    divUnico.appendChild(contenedorImagen);

                    //titulo de cada lugar
                    let tituloLugar = document.createElement('h4');
                    let textoTitulo = document.createTextNode(titulo);
                    tituloLugar.appendChild(textoTitulo);
                    divUnico.appendChild(tituloLugar);

                    divFila.appendChild(divUnico);

                    //subir botones
                    let divBoton = document.createElement('div');
                    divBoton.classList.add('posicion-btn-mini');

                    //subir boton ver mas
                    let botonVerMas = document.createElement('button');
                    botonVerMas.type = 'button';
                    botonVerMas.classList.add('btn-tres');
                    let textobotonVerMas = document.createTextNode('Ver más');
                    botonVerMas.appendChild(textobotonVerMas);
                    botonVerMas.dataset.idLugar = listaLugares[i]['_id'];
                    divBoton.appendChild(botonVerMas);

                    botonVerMas.addEventListener('click', visualizarLugar); //activar la redirección

                    divFila.appendChild(divBoton);
                    usuarioLugares.appendChild(divFila);
                }
            }
        }
    } else {
        //div contenedor de cada entrada
        let divNoRegistro = document.createElement('div');
        divNoRegistro.classList.add('entrada-sin-lugar');

        let divNoReg = document.createElement('div');
        divNoReg.classList.add('centro');

        let noRegistro = document.createElement('p');
        let textoNoRegistro = document.createTextNode('No tiene lugares seguidos');
        noRegistro.appendChild(textoNoRegistro);
        divNoReg.appendChild(noRegistro);

        divNoRegistro.appendChild(divNoReg);
        usuarioLugares.appendChild(divNoRegistro);
    }
};

mostrarLugares();

function visualizarLugar() {
    let idLugar = this.dataset.idLugar;
    localStorage.setItem('lugar', idLugar);
    window.location.href = 'lugar.html';
};

// agregue de aqui para abajo SST

let botonEditar = document.querySelector('#btnEditar'); // sst
//botonEditar.dataset.idUnico=listaUsuarios[i]['idUnico']; // sst
botonEditar.dataset.idUnico = idUnico; // sst
botonEditar.addEventListener('click', mostrarDatosUsuario); // sst


let botonBorrar = document.querySelector('#btnBorrar'); // sst
botonBorrar.dataset.idUnico = idUnico; // sst
botonBorrar.addEventListener('click', confirmarBorrado); // sst



if (usuarioid['estado'] == 'Habilitado') {

    let botonDeshabilitar = document.querySelector('#btnDeshabilitar'); // sst
    botonDeshabilitar.dataset.idUnico = idUnico; // sst
    botonDeshabilitar.addEventListener('click', deshabilitar); // sst
    $('#btnDeshabilitar').addClass('deshabilitar');

} else {


    let botonDeshabilitar = document.querySelector('#btnDeshabilitar'); // sst
    botonDeshabilitar.dataset.idUnico = idUnico; // sst
    botonDeshabilitar.addEventListener('click', habilitar); // sst
    $('#btnDeshabilitar').addClass('habilitar');


};


function confirmarBorrado() {

    let id_usuario = this.dataset.idUnico; //sst 

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

    let id_usuario = this.dataset.idUnico; //sst 
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

    let id_usuario = this.dataset.idUnico; //sst 
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


function mostrarDatosUsuario() { //sst

    let id_usuario = this.dataset.id_usuario; //sst 
    localStorage.setItem('idUsuario', id_usuario); //sst
    window.location.href = 'modificar_usuario.html'; //sst


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