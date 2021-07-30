'use strict';

/************************************************************/
/********** Función para registrar patrocinadores **********/
/**********************************************************/

function registrarPatrocinador(pnombre, pindustria, pimagen){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_patrocinador',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            nombre : pnombre,
            industria : pindustria,
            imagen : pimagen
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

/*********************************************************/
/********** Función para listar patrocinadores **********/
/*******************************************************/

function obtenerPatrocinadores(){
    let listaPatrocindores = [];
    let peticion = $.ajax({ 
        url: 'http://localhost:4000/api/listar_patrocinadores',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false, 
        data:{
        }
      });
    
      peticion.done(function(response){
        listaPatrocindores = response;
      });
    
      peticion.fail(function(){
       
      });
  
    return listaPatrocindores;
  };


/********************************************************/
/********* Función para buscar un patrocinador *********/
/******************************************************/

function buscar_patrocinador(pid_patrocinador){
  let patrocinador = [];
  $.ajax({
      url: 'http://localhost:4000/api/buscar_patrocinador',
      method: 'POST',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: false,
      data: {
          id : pid_patrocinador
      },
      beforeSend: function beforeSend() {
          
      },
      success: function success(response) {
          patrocinador = response;
          
      },
      error: function error(_error) {
          console.log("Request fail error:" + _error);
      }
      
  });
  return patrocinador;
};


/*********************************************************/
/********** Función para editar patrocinadores **********/
/*******************************************************/

function actualizar_patrocinador(pid_patrocinador, pnombre, pindustria, pimagen){
  let respuesta = '';
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/actualizar_patrocinador',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
        id : pid_patrocinador,
        nombre : pnombre,
        industria : pindustria,
        imagen : pimagen
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


/********************************************************/
/********* Función para borrar un patrocinador *********/
/******************************************************/

function borrar_patrocinador(pid_patrocinador){
  let patrocinador = [];
  $.ajax({
      url: 'http://localhost:4000/api/borrar_patrocinador',
      method: 'POST',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: false,
      data: {
          id : pid_patrocinador
      },
      beforeSend: function beforeSend() {
          
      },
      success: function success(response) {
          patrocinador = response;
          
      },
      error: function error(_error) {
          console.log("Request fail error:" + _error);
      }
      
  });
  return patrocinador;
};