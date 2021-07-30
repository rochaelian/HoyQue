'use strict';
function validarCredenciales(pcorreo, pclave) {
    let respuesta = false;
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/validar_credenciales',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            correo: pcorreo,
            clave: pclave
        }
    });

    peticion.done(function (response) {
        respuesta = response;
        sessionStorage.setItem('conectado', response.success);
        sessionStorage.setItem('tipo_usuario', response.usuario);
        sessionStorage.setItem('correo', response.correo);  
        sessionStorage.setItem('idUnico',response._id);  //linea agregada sst
        sessionStorage.setItem('estado',response.estado); //linea agregada SST v2
});

peticion.fail(function () {

});

return respuesta;

};



//SERGIO SST V2

function actualizarClaveTemp(pcorreo, pclave){

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/actualizarPass_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

           
            correo: pcorreo,
            clave: pclave
           

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
