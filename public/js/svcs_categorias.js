'use strict';


/********************************************************/
/********** Función para registrar categorias **********/
/******************************************************/

function registrarCategoria(pNombre, pDescripcion){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_categorias',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
           nombre : pNombre,
           descripcion : pDescripcion,
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
/********** Función para listar categorías **********/
/***************************************************/

function obtenerCategorias(){
  let listaCategorias = [];
  let peticion = $.ajax({ 
      url: 'http://localhost:4000/api/listar_categorias',
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false, 
      data:{
      }
    });
  
    peticion.done(function(response){
      listaCategorias = response;
    });
  
    peticion.fail(function(){
     
    });

  return listaCategorias;
};

/*****************************************************/
/********* Función para buscar una categoría ********/
/***************************************************/

function buscar_categoria(pid_categoria){
  let categoria = [];
  $.ajax({
      url: 'http://localhost:4000/api/buscar_categoria',
      method: 'POST',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: false,
      data: {
          id : pid_categoria
      },
      beforeSend: function beforeSend() {
          
      },
      success: function success(response) {
          categoria = response;
          
      },
      error: function error(_error) {
          console.log("Request fail error:" + _error);
      }
      
  });
  return categoria;
};

/*****************************************************/
/********** Función para editar categorías **********/
/***************************************************/

function actualizarCategoria(pid_categoria, pNombre, pDescripcion){
  let respuesta = '';
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/actualizar_categoria',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
        id : pid_categoria,
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


/*****************************************************/
/********* Función para borrar una categoría ********/
/***************************************************/

function borrar_categoria(pid_categoria){
  let categoria = [];
  $.ajax({
      url: 'http://localhost:4000/api/borrar_categoria',
      method: 'POST',
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      async: false,
      data: {
          id : pid_categoria
      },
      beforeSend: function beforeSend() {
          
      },
      success: function success(response) {
          categoria = response;
          
      },
      error: function error(_error) {
          console.log("Request fail error:" + _error);
      }
      
  });
  return categoria;
};