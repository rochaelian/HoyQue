'use strict';

const inputBuscar = document.querySelector('#buscaInfoPrincipal');
let listaPatrocinadores = obtenerPatrocinadores();
let tipoUsuario = sessionStorage.getItem('tipo_usuario');



mostrarPatrocinadores();
inputBuscar.addEventListener('keyup', mostrarPatrocinadores);


/*************************************************************/
/********** Función para listar los patrocinadores **********/
/***********************************************************/

function mostrarPatrocinadores(){

    let filtro = inputBuscar.value;
    let tbody = document.querySelector('.tbl_patrocinadores tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaPatrocinadores.length; i++){
        if(listaPatrocinadores[i]['nombre'].toLowerCase().includes(filtro.toLowerCase())){

            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaIndustria = fila.insertCell();
            let celdaImagen = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            celdaNombre.innerHTML = listaPatrocinadores[i]['nombre'];
            celdaIndustria.innerHTML = listaPatrocinadores[i]['industria'];

            let imagen = document.createElement('img');
            imagen.classList.add('imagenTabla');
            if(listaPatrocinadores[i]['imagen']){
                imagen.src = listaPatrocinadores[i]['imagen'];
            }else{
                imagen.src = './imgs/lugar.png';
            }

            let botonEditar = document.createElement('a');
            botonEditar.href = '#';
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-edit');
            botonEditar.dataset.id_patrocinador = listaPatrocinadores[i]['_id'];
            
            let botonBorrar = document.createElement('a');
            botonBorrar.href = '#';
            botonBorrar.classList.add('fas');
            botonBorrar.classList.add('fa-trash-alt');
            botonBorrar.dataset.id_patrocinador = listaPatrocinadores[i]['_id'];


            botonEditar.addEventListener('click', mostrarDatosEdicion);
            botonBorrar.addEventListener('click', confirmarBorrado);

            celdaImagen.appendChild(imagen);
            celdaOpciones.appendChild(botonEditar);
            celdaOpciones.appendChild(botonBorrar);
        }
    }
};

function mostrarDatosEdicion(){
    let id_patrocinador =  this.dataset.id_patrocinador;
    localStorage.setItem('patrocinador', id_patrocinador);
    window.location.href = 'modificar_patrocinador.html';
};


/**********************************************************/
/********** Función para borrar patrocinadores  **********/
/********************************************************/

function confirmarBorrado(){
    let id_patrocinador =  this.dataset.id_patrocinador;
    let patrocinador = buscar_patrocinador(id_patrocinador); 
    let accion = `Eliminó el patrocinador:  ${patrocinador['nombre']} `;
    
    swal({
        title: '¿Está seguro que desea borrar el patrocinador "' + patrocinador['nombre'] + '"?',
        text: "Este proceso no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡estoy seguro!'
    }).then((result) => {
        if (result.value) {
            borrar_patrocinador(id_patrocinador);
            let bitacora = obtenerDatosBitacora(accion);
            listaPatrocinadores = obtenerPatrocinadores();    
            mostrarPatrocinadores();       
          swal(
            '¡Patrocinador eliminado!',
            'El patrocinador "' + patrocinador['nombre'] + '" fue borrado con éxito',
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