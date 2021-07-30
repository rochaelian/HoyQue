'use strict'
//Daniel - cambios a esta funcion
let registrar_actividad = function registrarActividad(psTituloActividad, psDescripcionActividad, pdFechaActividad, psHoraInicioActividad, psHoraFinActividad, psUbicacionActividad, pnCapacidadParticipantesActividad, pnCupoActividad, pnCostoActividad, psMonedaActividad, psCategoriaActividad, psPatrocinadorActividad, psAportePatrocinador, psFotoActividad, pnRatingActividad, psPalabrasActividad, pid_usuario) {
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/registrar_actividad',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            tituloActividad: psTituloActividad,
            /*
             * Daniel : Borre el numero de identificacion de actividad - importante incluye los parametros de la funcion tambien!
             */
            descripcionActividad: psDescripcionActividad,
            fechaActividad: pdFechaActividad,
            horaInicioActividad: psHoraInicioActividad,
            horaFinActividad: psHoraFinActividad,
            ubicacionActividad: psUbicacionActividad,
            capacidadParticipantesActividad: pnCapacidadParticipantesActividad,
            cupoActividad: pnCupoActividad,
            costoActividad: pnCostoActividad,
            monedaActividad: psMonedaActividad,
            categoriaActividad: psCategoriaActividad,
            patrocinadorActividad: psPatrocinadorActividad,
            aportePatrocinador: psAportePatrocinador,
            fotoActividad: psFotoActividad,
            ratingActividad: pnRatingActividad,
            palabrasActividad: psPalabrasActividad,
            id_usuario: pid_usuario
        },
        beforeSend: function beforeSend() {

        },
        // Daniel - cambios en success y error
        success: function success(response) {
            respuesta = response;
        },
        error: function error(response) {
            respuesta = response;
        }

    });
    return respuesta;
};

//Daniel - cambios a esta funcion
function obtenerActividades() {
    let listaActividades = [];
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/listar_actividades',
        method: 'GET',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {},
        beforeSend: function beforeSend() {

        },
        sucess: function success(response) {
            respuesta = response;
        },
        error: function error(response) {
            respuesta = response;
        }
    });
    return respuesta;
};

//Daniel - cambios a esta funcion
function buscar_actividad(pid_actividad) {
    let actividad = [];
    $.ajax({
        url: 'http://localhost:4000/api/buscar_actividad',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            id: pid_actividad
        },
        beforeSend: function beforeSend() {

        },
        success: function success(response) {
            actividad = response;
        },
        error: function error(_error) {
            console.log("Request fail error: " + _error);
        }
    });
    return actividad;
};

/************************
 ** Daniel : Comienzo ***
 ************************/
function actualizarActividad(pid_actividad, pTituloActividad, pDescripcionActividad, pFechaActividad, pHoraInicioActividad, pHoraFinActividad, pUbicacionActividad, pCapacidadParticipantesActividad, pCostoActividad, pMonedaActividad, pCategoriaActividad, pPatrocinadorActividad, pAportePatrocinador, pFotoActividad, pRatingActividad, sPalabrasActividad) {
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/actualizar_actividad',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            id: pid_actividad,
            tituloActividad: pTituloActividad,
            descripcionActividad: pDescripcionActividad,
            fechaActividad: pFechaActividad,
            horaInicioActividad: pHoraInicioActividad,
            horaFinActividad: pHoraFinActividad,
            ubicacionActividad: pUbicacionActividad,
            capacidadParticipantesActividad: Number(pCapacidadParticipantesActividad),
            costoActividad: Number(pCostoActividad),
            monedaActividad: pMonedaActividad,
            categoriaActividad: pCategoriaActividad,
            patrocinadorActividad: pPatrocinadorActividad,
            aportePatrocinador: pAportePatrocinador,
            fotoActividad: pFotoActividad,
            ratingActividad: pRatingActividad,
            palabrasActividad: sPalabrasActividad
        },
        beforeSend: function beforeSend() {

        },
        success: function success(response) {
            respuesta = response;
        },
        error: function error(response) {
            respuesta = response;
        }
    });
    return respuesta;
};

/************************
 ** Daniel : Final ******
 ************************/