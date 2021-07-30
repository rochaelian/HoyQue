'use strict';

const inputFiltro = document.querySelector('#buscaInfoPrincipal');
let mensajes = obtenerMensajes();
let tipoUsuario = sessionStorage.getItem('tipo_usuario');

mostrarMensajes();
inputFiltro.addEventListener('keyup', mostrarMensajes);




function mostrarMensajes(){

    let filtro = inputFiltro.value;
    let tbody = document.querySelector('#tbl_palabrascl tbody');
    tbody.innerHTML = '';
    for(let i = 0; i < mensajes.length; i++){
        if(mensajes[i]['nombre'].toLowerCase().includes(filtro.toLowerCase())){

            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaDescripcion = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            celdaNombre.innerHTML = mensajes[i]['nombre'];
            celdaDescripcion.innerHTML = mensajes[i]['descripcion'];

            let botonEditar = document.createElement('a');
            botonEditar.href = '#';
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-edit');
            botonEditar.dataset.id_palabracl = mensajes[i]['_id'];
            
            let botonBorrar = document.createElement('a');
            botonBorrar.href = '#';
            botonBorrar.classList.add('fas');
            botonBorrar.classList.add('fa-trash-alt');
            botonBorrar.dataset.id_palabracl = mensajes[i]['_id'];

            botonEditar.addEventListener('click', mostrarDatosEdicion);
            botonBorrar.addEventListener('click', confirmarBorrado);

            celdaOpciones.appendChild(botonEditar);
            celdaOpciones.appendChild(botonBorrar);
        }
    }
};

function mostrarDatosEdicion(){
    let id_palabracl =  this.dataset.id_palabracl;
    localStorage.setItem('palabracl', id_palabracl);
    window.location.href = 'modificar_palabracl.html';
};

/*******************************************************/
/********* Función para borrar palabras clave *********/
/*****************************************************/

function confirmarBorrado(){
    let id_palabracl =  this.dataset.id_palabracl;
    let palabracl = buscar_palabracl(id_palabracl);
    let accion = `Eliminó la palabra clave:  ${palabracl['nombre']} `;

    swal({
        title: '¿Está seguro que desea borrar la palabra clave "' + palabracl['nombre'] + '"?',
        text: "Este proceso no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡estoy seguro!'
    }).then((result) => {
        if (result.value) {
            borrar_palabracl(id_palabracl);
            let bitacora = obtenerDatosBitacora(accion);
            mensajes = obtenerMensajes();
            mostrarMensajes();
          swal(
            '¡Palabra clave eliminada!',
            'La palabra "' + palabracl['nombre'] + '" fue borrada con éxito',
            'success'
          )
        }
    })    
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