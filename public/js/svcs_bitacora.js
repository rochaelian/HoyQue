'use strict';

/******************************************************/
/********** Función para registrar bitacora **********/
/****************************************************/

function registrar_bitacora(prol, psesionCorreo, pnombre, paccion){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_bitacora',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            rol : prol,
            correo : psesionCorreo,
            nombre : pnombre,
            accion : paccion
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
/********** Función para listar bitácoras **********/
/***************************************************/

function obtenerBitacoras(){
  let listaBitacoras = [];
  let peticion = $.ajax({ 
      url: 'http://localhost:4000/api/listar_bitacoras',
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false, 
      data:{
      }
    });
  
    peticion.done(function(response){
      listaBitacoras = response;
    });
  
    peticion.fail(function(){
     
    });

  return listaBitacoras;
};