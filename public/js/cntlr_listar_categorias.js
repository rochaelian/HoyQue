'use strict';

const inputBuscar = document.querySelector('#buscaInfoPrincipal');
let listaCategorias = obtenerCategorias();
let tipoUsuario = sessionStorage.getItem('tipo_usuario');

mostrarCategorias();
inputBuscar.addEventListener('keyup', mostrarCategorias);

/******************************************************/
/********** Función para listar categorías  **********/
/****************************************************/

function mostrarCategorias(){
    let filtro = inputBuscar.value;
    let tbody = document.querySelector('.tbl_categorias tbody');
    tbody.innerHTML = '';
    
    for(let i = 0; i < listaCategorias.length; i++){
        if(listaCategorias[i]['nombre'].toLowerCase().includes(filtro.toLowerCase())){
            
            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaDescripcion = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            celdaNombre.innerHTML = listaCategorias[i]['nombre'];
            celdaDescripcion.innerHTML = listaCategorias[i]['descripcion'];

            let botonEditar = document.createElement('a');
            botonEditar.href = '#';
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-edit');
            botonEditar.dataset.id_categoria = listaCategorias[i]['_id'];
            
            let botonBorrar = document.createElement('a');
            botonBorrar.href = '#';
            botonBorrar.classList.add('fas');
            botonBorrar.classList.add('fa-trash-alt');
            botonBorrar.dataset.id_categoria = listaCategorias[i]['_id'];

            botonEditar.addEventListener('click', mostrarDatosEdicion);
            botonBorrar.addEventListener('click', confirmarBorrado);

            celdaOpciones.appendChild(botonEditar);
            celdaOpciones.appendChild(botonBorrar);
        }
    }
};

function mostrarDatosEdicion(){
    let id_categoria =  this.dataset.id_categoria;
    localStorage.setItem('categoria', id_categoria);
    window.location.href = 'modificar_categoria.html';
};

/******************************************************/
/********** Función para borrar categorías  **********/
/****************************************************/

function confirmarBorrado(){
    let id_categoria =  this.dataset.id_categoria;
    let categoria = buscar_categoria(id_categoria);
    let accion = `Eliminó la categoría:  ${categoria['nombre']} `;
    swal({
        title: '¿Está seguro que desea borrar la categoría "' + categoria['nombre'] + '"?',
        text: "Este proceso no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡estoy seguro!'
    }).then((result) => {
        if (result.value) {
            borrar_categoria(id_categoria);
            let bitacora = obtenerDatosBitacora(accion);
            listaCategorias = obtenerCategorias();
            mostrarCategorias();
          swal(
            '¡Categoría eliminada!',
            'La categoría "' + categoria['nombre'] + '" fue borrada con éxito',
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