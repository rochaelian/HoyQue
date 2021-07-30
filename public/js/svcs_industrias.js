'use strict';


/********************************************************/
/********** Función para registrar industrias **********/
/******************************************************/

function registrarIndustria(pNombre){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_industria',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
           nombre : pNombre
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


/*****************************************************/
/********** Función para listar industrias **********/
/***************************************************/

function obtenerIndustrias(){
  let listaIndustrias = [];
  let peticion = $.ajax({ 
      url: 'http://localhost:4000/api/listar_industrias',
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false, 
      data:{
      }
    });
  
    peticion.done(function(response){
      listaIndustrias = response;
    });
  
    peticion.fail(function(){
     
    });

  return listaIndustrias;
};


/****************************************************/
/******** Función para buscar una industria ********/
/**************************************************/

function buscar_industria(pid_industria){
  let industria = [];
  $.ajax({
      url: 'http://localhost:4000/api/buscar_industria',
      method: 'POST',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: false,
      data: {
          id : pid_industria
      },
      beforeSend: function beforeSend() {
          
      },
      success: function success(response) {
          industria = response;
          
      },
      error: function error(_error) {
          console.log("Request fail error:" + _error);
      }
      
  });
  return industria;
};

/*****************************************************/
/********** Función para editar industrias **********/
/***************************************************/

function actualizarIndustria(pid_industria, pNombre){
  let respuesta = '';
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/actualizar_industria',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
        id : pid_industria,
        nombre : pNombre
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


/*****************************************************/
/********* Función para borrar una industria ********/
/***************************************************/

function borrar_industria(pid_industria){
  let industria = [];
  $.ajax({
      url: 'http://localhost:4000/api/borrar_industria',
      method: 'POST',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: false,
      data: {
          id : pid_industria
      },
      beforeSend: function beforeSend() {
          
      },
      success: function success(response) {
          industria = response;
          
      },
      error: function error(_error) {
          console.log("Request fail error:" + _error);
      }
      
  });
  return industria;
};