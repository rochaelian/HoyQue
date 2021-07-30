'use strict';
const inputBuscar = document.querySelector('#buscaInfoPrincipal');
let listaIndustrias = obtenerIndustrias();
let tipoUsuario = sessionStorage.getItem('tipo_usuario');

mostrarIndustrias();
inputBuscar.addEventListener('keyup', mostrarIndustrias);

/*****************************************************/
/********** Función para listar industrias **********/
/***************************************************/

function mostrarIndustrias(){
    
    let filtro = inputBuscar.value;
    let tbody = document.querySelector('.tbl_industrias tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaIndustrias.length; i++){
        if(listaIndustrias[i]['nombre'].toLowerCase().includes(filtro.toLowerCase())){
            
            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            celdaNombre.innerHTML = listaIndustrias[i]['nombre'];


            let botonEditar = document.createElement('a');
            botonEditar.href = '#';
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-edit');
            botonEditar.dataset.id_industria = listaIndustrias[i]['_id'];
            
            let botonBorrar = document.createElement('a');
            botonBorrar.href = '#';
            botonBorrar.classList.add('fas');
            botonBorrar.classList.add('fa-trash-alt');
            botonBorrar.dataset.id_industria = listaIndustrias[i]['_id'];

            botonEditar.addEventListener('click', mostrarDatosEdicion);
            botonBorrar.addEventListener('click', confirmarBorrado);

            celdaOpciones.appendChild(botonEditar);
            celdaOpciones.appendChild(botonBorrar);
        }
    }
};

function mostrarDatosEdicion(){
    let id_industria =  this.dataset.id_industria;
    localStorage.setItem('industria', id_industria);
    window.location.href = 'modificar_industria.html';
};


/*****************************************************/
/********** Función para borrar industrias **********/
/***************************************************/

function confirmarBorrado(){
    let id_industria =  this.dataset.id_industria;
    let industria = buscar_industria(id_industria);
    let accion = `Eliminó la industria:  ${industria['nombre']} `;
    swal({
        title: '¿Está seguro que desea borrar la industria "' + industria['nombre'] + '"?',
        text: "Este proceso no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡estoy seguro!'
    }).then((result) => {
        if (result.value) {
            borrar_industria(id_industria);
            let bitacora = obtenerDatosBitacora(accion);
            listaIndustrias = obtenerIndustrias();
            mostrarIndustrias();
          swal(
            '¡Industria eliminada!',
            'La industria "' + industria['nombre'] + '" fue borrada con éxito',
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