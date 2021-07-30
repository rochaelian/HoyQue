'use strict';


/**********************************************************/
/********* Función para registrar palabras clave *********/
/********************************************************/

function registrarMensaje(pnombre, pdescripcion){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_palabracl',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
           nombre : pnombre,
           descripcion : pdescripcion,
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
/********** Función para listar palabras clave **********/
/*******************************************************/

function obtenerMensajes(){
    let listaMensajes = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_palabracl',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaMensajes = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaMensajes;
};

/**********************************************************/
/********* Función para buscar una palabra clave *********/
/********************************************************/

function buscar_palabracl(pid_palabracl){
  let palabracl = [];
  $.ajax({
      url: 'http://localhost:4000/api/buscar_palabracl',
      method: 'POST',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: false,
      data: {
          id : pid_palabracl
      },
      beforeSend: function beforeSend() {
          
      },
      success: function success(response) {
          palabracl = response;
          
      },
      error: function error(_error) {
          console.log("Request fail error:" + _error);
      }
      
  });
  return palabracl;
};


/*********************************************************/
/********** Función para editar palabras clave **********/
/*******************************************************/

function actualizar_palabracl(pid_palabracl, pNombre, pDescripcion){
  let respuesta = '';
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/actualizar_palabracl',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
        id : pid_palabracl,
        nombre : pNombre,
        descripcion : pDescripcion
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
/********* Función para borrar una palabra clave ********/
/*******************************************************/

function borrar_palabracl(pid_palabracl){
  let palabracl = [];
  $.ajax({
      url: 'http://localhost:4000/api/borrar_palabracl',
      method: 'POST',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: false,
      data: {
          id : pid_palabracl
      },
      beforeSend: function beforeSend() {
          
      },
      success: function success(response) {
          palabracl = response;
          
      },
      error: function error(_error) {
          console.log("Request fail error:" + _error);
      }
      
  });
  return palabracl;
};