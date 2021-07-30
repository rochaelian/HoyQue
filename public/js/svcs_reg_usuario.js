'use strict';

function registrarUsuario(pusuario, ppnombre, psnombre, ppapellido, psapellido, ptipoID, pidentidad,
    pfechaNac, pedad, pcorreo, psexo, prazon, pfantasia, ptipoIDRep, pidentidadRep, pcorreoRep, pclave, pimagen) {


    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registro_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

            usuario: pusuario,
            pnombre: ppnombre,
            snombre: psnombre,
            papellido: ppapellido,
            sapellido: psapellido,
            tipoID: ptipoID,
            identidad: pidentidad,
            fechaNac: pfechaNac,
            edad: pedad,
            correo: pcorreo,
            sexo: psexo,
            razon: prazon,
            fantasia: pfantasia,
            tipoIDRep: ptipoIDRep,
            identidadRep: pidentidadRep,
            correoRep: pcorreoRep,
            clave: pclave,
            imagen: pimagen

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
        respuesta = response;
    });

    return respuesta;

};

function obtenerUsuarios(){
    let listaUsuarios = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_usuarios',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaUsuarios = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaUsuarios;
};

// agregue estas lineas SST

function buscar_usuario(pid_usuario) {
    let usuario = [];
    $.ajax({
        url: 'http://localhost:4000/api/buscar_usuario',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        data: {
            id: pid_usuario
        },
        beforeSend: function beforeSend() {

        },
        success: function success(response) {
            usuario = response;

        },
        error: function error(_error) {
            console.log("Request fail error:" + _error);
        }

    });
    return usuario;
};


function actualizarUsuario(pidUnico, pusuario, ppnombre, psnombre, ppapellido, psapellido, pselectTipoID,
    pidentidad, pfechaNac, pedad, pcorreo, psexo, prazon, pfantasia,
    pselectTipoIDRep, pidentidadRep, pcorreoRep, pclave, pimagen){

        let respuesta = '';
        let peticion = $.ajax({
            url: 'http://localhost:4000/api/actualizar_usuario',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            async: false,
            data: {
    
                id: pidUnico,
                usuario: pusuario,
                pnombre: ppnombre,
                snombre: psnombre,
                papellido: ppapellido,
                sapellido: psapellido,
                tipoID: pselectTipoID,
                identidad: pidentidad,
                fechaNac: pfechaNac,
                edad: pedad,
                correo: pcorreo,
                sexo: psexo,
                razon: prazon,
                fantasia: pfantasia,
                tipoIDRep: pselectTipoIDRep,
                identidadRep: pidentidadRep,
                correoRep: pcorreoRep,
                clave: pclave,
                imagen: pimagen
    
            }
        });
    
        peticion.done(function (response) {
            respuesta = response;
        });
    
        peticion.fail(function (response) {
            respuesta = response;
        });
    
        return respuesta;   


};


function deshabilitar_usuario(pidUnico){

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/deshabilitar_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

            id: pidUnico
           

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
        respuesta = response;
    });

    return respuesta;  

};

function habilitar_usuario(pidUnico){

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/habilitar_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

            id: pidUnico
           

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
        respuesta = response;
    });

    return respuesta;  

};

function borrar_usuario(pidUnico){


    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/borrar_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

            id: pidUnico
           

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
        respuesta = response;
    });

    return respuesta; 



};

// sst v3 de aqui para abajo


function desbanear_usuario(pidUnico){

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/desbanear_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

            id: pidUnico
           

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
        respuesta = response;
    });

    return respuesta;  

};

function banear_usuario(pidUnico, pcomentario){

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/banear_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

            id: pidUnico,
            comentario: pcomentario // sst v3
           

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
        respuesta = response;
    });

    return respuesta;  

};
