'use strict';

function obtenerActividades() {
    let listaActividades = [];

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_actividades',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
        }
    });

    peticion.done(function (response) {
        listaActividades = response;
    });

    peticion.fail(function () {

    });

    return listaActividades;
}

function obtenerActividadesHabilitadas() {
    let listaActividades = [];

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_actividades_habilitadas',
        type: 'GET',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {}
    });

    peticion.done(function (response) {
        listaActividades = response;
    });

    peticion.fail(function () {

    });

    return listaActividades;
}

function buscar_actividad(pid_actividad) {
    let actividad = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_actividad',
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            id: pid_actividad
        }
    });
    peticion.done(function (response) {
        actividad = response;
    });

    peticion.fail(function (response) {
        actividad = response;
    });

    return actividad;
};

function deshabilitarActividad_svcs(pid_actividad) {
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/deshabilitar_actividad',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            id: pid_actividad,
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

function habilitarActividad_svcs(pid_actividad) {
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/habilitar_actividad',
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
            respuesta = response;
        },
        error: function error(response) {
            respuesta = response;
        }
    });
    return respuesta;
};

function borrar_actividad(pid_actividad) {
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/borrar_actividad',
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
            respuesta = response;
        },
        error: function error(response) {
            respuesta = response;
        }
    });
    return respuesta;
};

function obtenerReservaciones(pid_usuario) {
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/listar_reservaciones_usuario',
        method: 'GET',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            id: pid_usuario
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

function activarReservacion(pid_actividad, pnombreActividad, pid_usuarioReserva) {
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/reservar_actividad',
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pid_usuarioReserva,
            idActividadReservada: pid_actividad,
            nombreActividadReservada: pnombreActividad,
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

// Funcion para borrar la reservacion 
function cancelar_reservacion(pid_usuario, pid_reservacion, pid_actividad, pnombreActividad) {
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/cancelar_actividad',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            id_usuario: pid_usuario,
            id_reservacion: pid_reservacion
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

function actualizarCupoActividad(pid_actividad, pcupoActividad) {
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/actualizar_actividad',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            id: pid_actividad,
            cupoActividad: pcupoActividad
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

/****Manuel Delgado****/
function registrarComentario(id, autor, comentario, rating) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_comentarios_Actividad',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: id,
            autorActividad: autor,
            textoActividad: comentario,
            rating : rating
        }
    });
    peticion.done(function (response) {
        respuesta = response;

    });

    peticion.fail(function () {

    });

    return respuesta;
};

function obtenerComentario() {
    let respuesta = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_comentarios_Actividad', //Endpoint
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {}
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function () {

    });

    return respuesta;
};

function borrarComentario(pIdActividad,pIdComentario){
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/borrar_comentario_Actividad', //Endpoint
        method: 'post',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        data: {
          id : pIdActividad,
          idcomentario : pIdComentario,
        },
        beforeSend: function beforeSend() {
            
        },
        success: function success(response) {
            respuesta = response;
            
        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }
        
    });
    return respuesta;
};

function actualizarRating(pIdActividad,pRating){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/actualizar_rating_Actividad', //Endpoint
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
          //llave : valor
          id : pIdActividad,
          ratingActividad : pRating,
        }
    });

    peticion.done(function(response){
    respuesta = response;
    });

    peticion.fail(function(response){
    respuesta = response;
    });

    return respuesta;
};
/****Manuel Delgado****/