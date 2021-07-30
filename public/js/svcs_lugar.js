'use strict';

function registrarLugar(pProvincia,pCanton,pDistrito,pTitulo,pCategoria,pDescripcion,pDireccion,pCoordenadas,pImagen, pRating, pEstado, pPermiso, pIdEmpresa){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_lugares', //Endpoint
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
          //llave : valor
          provincia : pProvincia,
          canton : pCanton,
          distrito : pDistrito,
          titulo : pTitulo,
          categoria : pCategoria,
          descripcion : pDescripcion,
          direccion : pDireccion,
          coordenadas : pCoordenadas,
          imagen : pImagen,
          ratingLugar : pRating,
          estado : pEstado,
          permiso : pPermiso,
          registradoEmpresa : pIdEmpresa 
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

function obtenerLugar(){
  let respuesta = [];
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/listar_lugares', //Endpoint
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json', 
      async:false,
      data:{
      }
    });
  
    peticion.done(function(response){ 
      respuesta = response;
    });
  
    peticion.fail(function(){
     
    });

  return respuesta;
};

function registrarComentario(id, autor, comentario, rating){
  let respuesta = '' ;
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/registrar_comentarios',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async : false,
      data:{
          _id : id,
         autor : autor,
         texto : comentario,
         rating : rating
      }
  });
  peticion.done(function(response){
      respuesta = response;
     
     });
   
     peticion.fail(function(){ 

     });

     return respuesta;
}

function obtenerComentario(){
  let respuesta = [];
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/listar_comentarios', //Endpoint
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json', 
      async:false,
      data:{
      }
    });
  
    peticion.done(function(response){ 
      respuesta = response;
    });
  
    peticion.fail(function(){
     
    });

  return respuesta;
};

function buscarLugar(pIdLugar){
  let respuesta = [];
  $.ajax({
      url: 'http://localhost:4000/api/buscar_lugar', //Endpoint
      method: 'post',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: false,
      data: {
          id : pIdLugar
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

function actualizarLugar(pidLugar,pProvincia,pCanton,pDistrito,pTitulo,pCategoria,pDescripcion,pDireccion,pCoordenadas,pImagen){
  let respuesta = '';
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/actualizar_lugar', //Endpoint
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
        //llave : valor
        id : pidLugar,
        provincia : pProvincia,
        canton : pCanton,
        distrito : pDistrito,
        titulo : pTitulo,
        categoria : pCategoria,
        descripcion : pDescripcion,
        direccion : pDireccion,
        coordenadas : pCoordenadas,
        imagen : pImagen
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

function borrarLugar(pIdLugar){
  let respuesta = '';
  $.ajax({
      url: 'http://localhost:4000/api/borrar_lugar', //Endpoint
      method: 'post',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: false,
      data: {
          id : pIdLugar
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

function deshabilitarLugar(pIdLugar){
  let respuesta = '';
  $.ajax({
      url: 'http://localhost:4000/api/deshabilitar_lugar', //Endpoint
      method: 'post',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      dataType: 'json',
      async: false,
      data: {
          id : pIdLugar
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

function habilitarLugar(pIdLugar){
  let respuesta = '';
  $.ajax({
      url: 'http://localhost:4000/api/habilitar_lugar', //Endpoint
      method: 'post',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      dataType: 'json',
      async: false,
      data: {
          id : pIdLugar
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

function borrarComentario(pIdLugar,pIdComentario){
  let respuesta = '';
  $.ajax({
      url: 'http://localhost:4000/api/borrar_comentario', //Endpoint
      method: 'post',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: false,
      data: {
        id : pIdLugar,
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

function actualizarRating(pidLugar,pRating){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/actualizar_rating', //Endpoint
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
          //llave : valor
          id : pidLugar,
          ratingLugar : pRating,
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

function aprobarLugar(pIdLugar){
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/aprobar_lugar', //Endpoint
        method: 'post',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: 'json',
        async: false,
        data: {
            id : pIdLugar
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
  
function desaprobarLugar(pIdLugar){
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/desaprobar_lugar', //Endpoint
        method: 'post',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: 'json',
        async: false,
        data: {
            id : pIdLugar
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

function seguirLugares(pIdUsuario,pIdLugar,pNombreLugar) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/seguir_lugar',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id : pIdUsuario,
            idLugar: pIdLugar,
            nombreLugar: pNombreLugar
        }
    });
    peticion.done(function(response){
        respuesta = response;
       
        });
        
        peticion.fail(function(){ 
    
        });
    
        return respuesta;
  }

function noSeguirLugares(pIdUsuario,pIdLugarSeguido) {
    let respuesta = '';
    $.ajax({
        url: 'http://localhost:4000/api/no_seguir_lugar',
        method: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            id : pIdUsuario,
            idLugarSeguido : pIdLugarSeguido,
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