/************************
 ** Daniel : Comienzo ***
 ************************/

'use strict';
// Recibir el ID de la actividad a modificar usando localstorage
let id_actividad = localStorage.getItem('actividad');
let tipoUsuario = sessionStorage.getItem('tipo_usuario');
console.log(id_actividad);

// Inicio de variables 
const inputTituloActividad = document.querySelector('#txtTituloActividad');
const inputDescripcionActividad = document.querySelector('#txtDescripcionActividad');
const inputFechaActividad = document.querySelector('#txtFechaActividad');
const inputHoraInicioActividad = document.querySelector('#txtHoraInicioActividad');
const inputHoraFinActividad = document.querySelector('#txtHoraFinActividad');
const inputUbicacionActividad = document.querySelector('#txtUbicacionActividad');
const inputCapacidadParticipantesActividad = document.querySelector('#txtCapacidadParticipantesActividad');
const inputCostoActividad = document.querySelector('#txtCostoActividad');
const inputMonedaActividad = document.querySelector('#moneda input[type=radio]');
const inputMonedaColones = document.querySelector('#monedaColones');
const inputMonedaDolares = document.querySelector('#monedaDolares');
const inputCategoriaActividad = document.querySelector('#txtCategoriaActividad');
const inputPatrocinadorActividad = document.querySelector('#txtPatrocinadorActividad');
const inputAportePatrocinador = document.querySelector('#txtAportePatrocinador');
const inputFotoActividad = document.querySelector('#registrarImagen');
const inputRatingActividad = 0;
const inputPalabrasActividad = document.querySelector('#txtPalabrasActividad');
const botonActualizarActividad = document.querySelector('#btnActualizarActividad');

botonActualizarActividad.addEventListener('click', obtenerDatosFormularioActividad);

// Variables de new Date()
const fechaHoy = new Date();
const diaHoy = fechaHoy.getDate();
const mesHoy = fechaHoy.getMonth() + 1;
const anoHoy = fechaHoy.getFullYear();
const fechaHoyTexto = anoHoy + "/" + mesHoy + "/" + diaHoy;

if (id_actividad) {
    mostrarDatos();
} else {
    swal({
        title: 'No se escogió una actividad',
        text: 'Debe de seleccionar una actividad para actualizar. El sistema lo redigirá a la lista de activiades disponibles',
        type: 'warning',
        confirmButtonText: 'Entendido',
    }).then(function () {
        window.location.href = 'listar_actividades.html';
    });
}

function mostrarDatos() {
    let actividad = buscar_actividad(id_actividad);
    console.log(id_actividad);

    inputTituloActividad.value = actividad['tituloActividad'];
    inputDescripcionActividad.value = actividad['descripcionActividad'];
    let datoFechaActividad = new Date(actividad['fechaActividad']);
    datoFechaActividad;

    //función para formatear la fecha a yyyy-MM-dd que es el formato en que el form esta recibiendo los datos
    function formatoFecha(fecha) {
        let f = new Date(fecha),
            mes = '' + (f.getMonth() + 1),
            dia = '' + f.getDate(),
            anno = f.getFullYear();

        if (mes.length < 2) {
            mes = '0' + mes;
        }
        if (dia.length < 2) {
            dia = '0' + dia;
        }
        return [anno, mes, dia].join('-');
    }

    let nuevaFecha = formatoFecha(datoFechaActividad);

    inputFechaActividad.value = nuevaFecha;

    inputHoraInicioActividad.value = actividad['horaInicioActividad'];
    inputHoraFinActividad.value = actividad['horaFinActividad'];
    inputUbicacionActividad.value = actividad['ubicacionActividad'];
    inputCapacidadParticipantesActividad.value = actividad['capacidadParticipantesActividad'];
    inputCostoActividad.value = actividad['costoActividad'];
    inputMonedaActividad.value = actividad['monedaActividad'];
    inputCategoriaActividad.value = actividad['categoriaActividad'];
    inputPatrocinadorActividad.value = actividad['patrocinadorActividad'];
    inputAportePatrocinador.value = actividad['aportePatrocinador'];
    inputFotoActividad.value = actividad['fotoActividad'];
    // inputRatingActividad.value = actividad['ratingActividad'];
    inputPalabrasActividad.value = actividad['palabrasActividad'];

    let monedaActividad = inputMonedaActividad.value;

    if (monedaActividad === 'Colones') {
        inputMonedaColones.checked = 'checked';
    } else if(monedaActividad === 'Dólares') {
        inputMonedaDolares.checked = 'checked';
    }
};

function obtenerDatosFormularioActividad() {
    let tituloActividad = inputTituloActividad.value;
    let descripcionActividad = inputDescripcionActividad.value;
    let fechaActividad = inputFechaActividad.value;
    let horaInicioActividad = inputHoraInicioActividad.value;
    let horaFinActividad = inputHoraFinActividad.value;
    let ubicacionActividad = inputUbicacionActividad.value;
    let capacidadParticipantesActividad = inputCapacidadParticipantesActividad.value;
    let costoActividad = inputCostoActividad.value;
    let monedaActividad = inputMonedaActividad.value;
    let categoriaActividad = inputCategoriaActividad.value;
    let patrocinadorActividad = inputPatrocinadorActividad.value;
    let aportePatrocinador = inputAportePatrocinador.value;
    let fotoActividad = inputFotoActividad.value;
    let ratingActividad = inputRatingActividad.value;
    let palabrasActividad = inputPalabrasActividad.value;


    //AQUI QUEDE - AQUI DEBERIA DE EMPEZAR LA VALIDACION. VER EL CNTRL DE REGISTRAR LINEA 62 COMO REFERENCIA DE LO QUE HAY QUE PROGRAMAR AQUI.

    let error = validar(id_actividad, tituloActividad, descripcionActividad, fechaActividad, horaInicioActividad, horaFinActividad, ubicacionActividad, capacidadParticipantesActividad, costoActividad, monedaActividad, categoriaActividad, patrocinadorActividad, aportePatrocinador, fotoActividad, ratingActividad, palabrasActividad);

    if (costoActividad > 0) {
        if (error == false) {
            if (inputMonedaColones.checked = true) {
                monedaActividad = 'Colones';
            } else if (inputMonedaDolares.checked = true) {
                monedaActividad = 'Dólares';
            }
        }
    } else {

    }

    


    if (error == true) {
        swal({
            type: 'warning',
            title: 'No se pudo registrar la actividad',
            text: 'Por favor revise los campos en rojo antes de continuar',
            confirmButtonText: 'Entendido'
        });
    } else {

        let respuesta = actualizarActividad(id_actividad, tituloActividad, descripcionActividad, fechaActividad, horaInicioActividad, horaFinActividad, ubicacionActividad, capacidadParticipantesActividad, costoActividad, monedaActividad, categoriaActividad, patrocinadorActividad, aportePatrocinador, fotoActividad, ratingActividad, palabrasActividad);

        if (respuesta.success == true) {
            swal({
                type: 'success',
                title: 'La actividad ha sido registrada',
                text: respuesta.msg,
                confirmButtonText: 'Entendido'
            }).then(function () {
                let accion = `Modificó la actividad: ${tituloActividad} `;
                obtenerDatosBitacora(accion);
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

    // actualizarActividad(id_actividad, tituloActividad, descripcionActividad, fechaActividad, horaInicioActividad, horaFinActividad, ubicacionActividad, capacidadParticipantesActividad, costoActividad, monedaActividad, categoriaActividad, patrocinadorActividad, aportePatrocinador, fotoActividad, ratingActividad, palabrasActividad);
};

// Validacion del costo de la actividad
const colDosRegistrar = document.querySelector('#colDosRegistrar');
const divMoneda = document.querySelector('#moneda');
$(document).ready(function () {
    let pGratis = document.querySelector('#pGratis');
    if (inputCostoActividad.value > 0) {
        pGratis.classList.add('hide');
    }
    $("#txtCostoActividad").change(function () {
        if (inputCostoActividad.value > 0) {
            divMoneda.classList.remove('hide');
            pGratis.classList.add('hide');
        } else {
            divMoneda.classList.add('hide');
            pGratis.classList.remove('hide');
        }

    });
});

// Inicio funcion de validacion
function validar(pId_actividad, pTituloActividad, pDescripcionActividad, pFechaActividad, pHoraInicioActividad, pHoraFinActividad, pUbicacionActividad, pCapacidadParticipantesActividad, pCostoActividad, pMonedaActividad, pCategoriaActividad, pPatrocinadorActividad, pAportePatrocinador, pFotoActividad, pRatingActividad, pPalabrasActividad) {
    let error = false;
    let expPalabras = /[À-ÿ\w &]+$/;
    let expNumeros = /[0-9]+$/;
    let expPalabrasSimbolos = /[À-ÿ\w.,-:$()*%#!@+=''""?¿ &]+$/;

    pFechaActividad;
    pFechaActividad = new Date(pFechaActividad);

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
    } else if ((annoActividad == anoHoy && mesActividad == mesHoy && diaActividad < diaHoy + 1) || isNaN(diaActividad) == true) {
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

    // if (sPalabrasActividad == '' || expPalabrasSimbolos.test(sPalabrasActividad) == false) {
    //     error = true;
    //     inputPalabrasActividad.classList.add('error-input');
    // } else {
    //     inputPalabrasActividad.classList.remove('error-input');
    // }

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

    if (pCostoActividad > 0) {
        if (document.querySelector('#moneda input[type=radio]:checked') == null) {
            document.querySelector('#moneda').classList.add('error-texto');
            error = true;
        } else {
            document.querySelector('#moneda').classList.remove('error-texto');
        }
    } else {

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
function mostarCategorias() {
    let listaCategorias = obtenerCategorias();
    let dataListCategoria = document.querySelector('#categoriasActividad');
    for (let i = 0; i < listaCategorias.length; i++) {
        let nuevaOpcion = new Option(listaCategorias[i]['nombre'])
        nuevaOpcion.value = listaCategorias[i]['nombre'];
        dataListCategoria.appendChild(nuevaOpcion);
    }
}

// Inicio funcion de mostrar Categorías
function mostarLugares() {
    let listaLugares = obtenerLugar();
    let dataListLugares = document.querySelector('#lugares');
    for (let i = 0; i < listaLugares.length; i++) {
        let nuevaOpcion = new Option(listaLugares[i]['titulo'])
        nuevaOpcion.value = listaLugares[i]['titulo'];
        dataListLugares.appendChild(nuevaOpcion);
    }
}

// Inicio funcion de mostrar Categorías
function mostarPatrocinadores() {
    let listaPatrocinadores = obtenerPatrocinadores();
    let dataListPatrocinadores = document.querySelector('#patrocinadores');
    for (let i = 0; i < listaPatrocinadores.length; i++) {
        let nuevaOpcion = new Option(listaPatrocinadores[i]['nombre'])
        nuevaOpcion.value = listaPatrocinadores[i]['nombre'];
        dataListPatrocinadores.appendChild(nuevaOpcion);
    }
}

/************************
 ** Daniel : Final ******
 ************************/

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