'use strict'

mostarCategorias();
mostarLugares();
mostarPatrocinadores();

// Inicio de variables 
const inputTituloActividad = document.querySelector('#txtTituloActividad');
let tipoUsuario = sessionStorage.getItem('tipo_usuario');
/*
* Daniel : Borre el numero de identificacion de actividad
*/
const inputDescripcionActividad = document.querySelector('#txtDescripcionActividad');
const inputFechaActividad = document.querySelector('#txtFechaActividad');
const inputHoraInicioActividad = document.querySelector('#txtHoraInicioActividad');
const inputHoraFinActividad = document.querySelector('#txtHoraFinActividad');
const inputUbicacionActividad = document.querySelector('#txtUbicacionActividad');
const inputCapacidadParticipantesActividad = document.querySelector('#txtCapacidadParticipantesActividad');
const inputCostoActividad = document.querySelector('#txtCostoActividad');
const inputMonedaActividad = document.querySelector('#txtMonedaActividad');
const inputCategoriaActividad = document.querySelector('#txtCategoriaActividad');
const inputPatrocinadorActividad = document.querySelector('#txtPatrocinadorActividad');
const inputAportePatrocinador = document.querySelector('#txtAportePatrocinador');
const inputFotoActividad = document.querySelector('#registrarImagen');
const ratingActividad = 0;
const inputPalabrasActividad = document.querySelector('#txtPalabrasActividad');
const botonRegistrarActividad = document.querySelector('#btnRegistrarActividad');

botonRegistrarActividad.addEventListener('click', obtenerDatos);

let listaActividades = obtenerActividades();

// Variables de new Date()
const fechaHoy = new Date();
const diaHoy = fechaHoy.getDate();
const mesHoy = fechaHoy.getMonth() + 1;
const anoHoy = fechaHoy.getFullYear();
const fechaHoyTexto = anoHoy + "/" + mesHoy + "/" + diaHoy;

// Inicio funcion para obtener los datos
function obtenerDatos() {
    let sTituloActividad = inputTituloActividad.value;
    /*
    * Daniel : Borre el numero de identificacion de actividad - inluye los parametros en LAS funcion de abajo!!
    */
    let sDescripcionActividad = inputDescripcionActividad.value;
    let dFechaActividad = new Date(inputFechaActividad.value);
    let sHoraInicioActividad = inputHoraInicioActividad.value;
    let sHoraFinActividad = inputHoraFinActividad.value;
    let sUbicacionActividad = inputUbicacionActividad.value;
    let nCapacidadParticipantesActividad = Number(inputCapacidadParticipantesActividad.value);
    let nCupoActividad = Number(inputCapacidadParticipantesActividad.value);
    let nCostoActividad = Number(inputCostoActividad.value);
    let sMonedaActividad = '';
    let sCategoriaActividad = inputCategoriaActividad.value;
    let sPatrocinadorActividad = inputPatrocinadorActividad.value;
    let sAportePatrocinador = inputAportePatrocinador.value;
    let sFotoActividad = inputFotoActividad.src;
    let nRatingActividad = ratingActividad;
    let sPalabrasActividad = inputPalabrasActividad.value;

    let error = validar(sTituloActividad, sDescripcionActividad, dFechaActividad, sHoraInicioActividad, sHoraFinActividad, sUbicacionActividad, nCapacidadParticipantesActividad, nCupoActividad, nCostoActividad, sMonedaActividad, sCategoriaActividad, sPatrocinadorActividad, sAportePatrocinador, sFotoActividad, nRatingActividad, sPalabrasActividad);

    // if para mostrar el mensaje segun el resultado del error de la  validacion (true / false)
    nRatingActividad = 0;
    nCupoActividad = nCapacidadParticipantesActividad;

    if (error == false) {
        sMonedaActividad = document.querySelector('#moneda input[type=radio]:checked').value;
    }

    if (error == true) {
        swal({
            type: 'warning',
            title: 'No se pudo registrar la actividad',
            text: 'Por favor revise los campos en rojo antes de continuar',
            confirmButtonText: 'Entendido'
        });
    } else {
        //Daniel - cambios a esta funcion y hay que preguntarle al profe que poner en el if para que funcione como los ejemplos que el ha dado.
        let respuesta = registrar_actividad(sTituloActividad, sDescripcionActividad, dFechaActividad, sHoraInicioActividad, sHoraFinActividad, sUbicacionActividad, nCapacidadParticipantesActividad, nCupoActividad, nCostoActividad, sMonedaActividad, sCategoriaActividad, sPatrocinadorActividad, sAportePatrocinador, sFotoActividad, nRatingActividad, sPalabrasActividad, id_usuario);

        //Daniel - cambios aqui
        if (respuesta.success == true) {
            swal({
                type: 'success',
                title: 'La actividad ha sido registrada',
                text: respuesta.msg,
                confirmButtonText: 'Entendido'
            }).then(function(){
                let accion = `Registró la actividad:  ${sTituloActividad} `; //Esto va para bitácora - Elian
                obtenerDatosBitacora(accion);  // Bitácora - Elian
                window.location.href = 'listar_actividades.html';
            });
            
        } else {
            swal({
                title: 'No se pudo registrar la actividad',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    }
};

/************************
    ** Daniel : Comienzo ***
     ************************/
    const colDosRegistrar = document.querySelector('#colDosRegistrar');
    const divMoneda = document.querySelector('#moneda');
    $(document).ready(function(){
        $("#txtCostoActividad").change(function(){
            let pGratis = document.querySelector('p#pGratis');
            if (inputCostoActividad.value > 0){
                divMoneda.classList.remove('hide');
                pGratis.classList.add('hide');
            } else {
                divMoneda.classList.add('hide');
                pGratis.classList.remove('hide');
            }
            
        });
    });
    /************************
    ** Daniel : Final ******
     ************************/

    

// Inicio funcion de validacion
function validar(pTituloActividad, pDescripcionActividad, pFechaActividad, pHoraInicioActividad, pHoraFinActividad, pUbicacionActividad, pCapacidadParticipantesActividad, nCupoActividad, pCostoActividad, sMonedaActividad, pCategoriaActividad, pPatrocinadorActividad, pAportePatrocinador, pFotoActividad, pRatingActividad, sPalabrasActividad) {
    let error = false;
    let expPalabras = /[À-ÿ\w &]+$/;
    let expNumeros = /[0-9]+$/;
    let expPalabrasSimbolos = /[À-ÿ\w.,-:$()*%#!@+=''""?¿ &]+$/;


    // fechas
    let diaActividad = pFechaActividad.getDate() + 1;
    let mesActividad = pFechaActividad.getMonth() + 1;
    let annoActividad = pFechaActividad.getFullYear();

    

    if (pTituloActividad == '' || expPalabras.test(pTituloActividad) == false) {
        error = true;
        inputTituloActividad.classList.add('error-input');
    } else {
        inputTituloActividad.classList.remove('error-input');
    }

    /**
     * Daniel: borre el validar del ID Actividad
     */

    if (pDescripcionActividad == '' || expPalabrasSimbolos.test(pDescripcionActividad) == false) {
        error = true;
        inputDescripcionActividad.classList.add('error-input');
    } else {
        inputDescripcionActividad.classList.remove('error-input');
    }

    if (annoActividad < anoHoy || isNaN(annoActividad) == true) {
        error = true;
        inputFechaActividad.classList.add('error-input');
    } else if ((annoActividad == anoHoy && mesActividad < mesHoy) || isNaN(mesActividad) == true) {
        error = true;
        inputFechaActividad.classList.add('error-input');
    } else if ((annoActividad == anoHoy && mesActividad == mesHoy && diaActividad < diaHoy+1) || isNaN(diaActividad) == true) {
        error = true;
        inputFechaActividad.classList.add('error-input');
    } else {
        inputFechaActividad.classList.remove('error-input');
    }

    if (pHoraInicioActividad == '') {
        error = true;
        inputHoraInicioActividad.classList.add('error-input');
    } else {
        inputHoraInicioActividad.classList.remove('error-input');
    }

    if (pHoraFinActividad == '' || pHoraFinActividad < pHoraInicioActividad) {
        error = true;
        inputHoraFinActividad.classList.add('error-input');
    } else {
        inputHoraFinActividad.classList.remove('error-input');
    }

    if (pUbicacionActividad == '' || expPalabras.test(pUbicacionActividad) == false) {
        error = true;
        inputUbicacionActividad.classList.add('error-input');
    } else {
        inputUbicacionActividad.classList.remove('error-input');
    }

    if (sPalabrasActividad == '' || expPalabrasSimbolos.test(sPalabrasActividad) == false) {
        error = true;
        inputPalabrasActividad.classList.add('error-input');
    } else {
        inputPalabrasActividad.classList.remove('error-input');
    }

    if (pCapacidadParticipantesActividad == '' || expNumeros.test(pCapacidadParticipantesActividad) == false || pCapacidadParticipantesActividad <= 0) {
        error = true;
        inputCapacidadParticipantesActividad.classList.add('error-input');
    } else {
        inputCapacidadParticipantesActividad.classList.remove('error-input');
    }

    if (pCostoActividad === '' || expNumeros.test(pCostoActividad) == false || pCostoActividad < 0) {
        error = true;
        inputCostoActividad.classList.add('error-input');
    } else {
        inputCostoActividad.classList.remove('error-input');
    }

    if (document.querySelector('#moneda input[type=radio]:checked') == null) {
        document.querySelector('#moneda').classList.add('error-texto');
        error = true;
    } else {
        document.querySelector('#moneda').classList.remove('error-texto');
    }

    if (pCategoriaActividad == '') {
        error == true;
        inputCategoriaActividad.classList.add('error-input');
    } else {
        inputCategoriaActividad.classList.remove('error-input');
    }

    if (pPatrocinadorActividad == '') {
        inputPatrocinadorActividad.classList.add('error-input');
    } else {
        inputPatrocinadorActividad.classList.remove('error-input');
    }
    if (pAportePatrocinador == '' || expPalabrasSimbolos.test(pAportePatrocinador) == false) {
        error = true;
        inputAportePatrocinador.classList.add('error-input');
    } else {
        inputAportePatrocinador.classList.remove('error-input');
    }

    return error;
};

// Inicio funcion de mostrar Categorías
function mostarCategorias(){
    let listaCategorias = obtenerCategorias();
    let dataListCategoria = document.querySelector('#categoriasActividad');
    for(let i = 0; i < listaCategorias.length; i++){
        let nuevaOpcion = new Option(listaCategorias[i]['nombre'])
        nuevaOpcion.value = listaCategorias[i]['nombre'];
        dataListCategoria.appendChild(nuevaOpcion);
    }
}

// Inicio funcion de mostrar Categorías
function mostarLugares(){
    let listaLugares = obtenerLugar();
    let dataListLugares = document.querySelector('#lugares');
    for(let i = 0; i < listaLugares.length; i++){
        let nuevaOpcion = new Option(listaLugares[i]['titulo'])
        nuevaOpcion.value = listaLugares[i]['titulo'];
        dataListLugares.appendChild(nuevaOpcion);
    }
}

// Inicio funcion de mostrar Categorías
function mostarPatrocinadores(){
    let listaPatrocinadores = obtenerPatrocinadores();
    let dataListPatrocinadores = document.querySelector('#patrocinadores');
    for(let i = 0; i < listaPatrocinadores.length; i++){
        let nuevaOpcion = new Option(listaPatrocinadores[i]['nombre'])
        nuevaOpcion.value = listaPatrocinadores[i]['nombre'];
        dataListPatrocinadores.appendChild(nuevaOpcion);
    }
}

// Flex list
$('.flexdatalistCategorias').flexdatalist({
    selectionRequired: 1,
    minLength: 1
});

$('.flexdatalistPalabras').flexdatalist({
    minLength: 1
});

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