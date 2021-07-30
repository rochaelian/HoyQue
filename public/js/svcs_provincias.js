'use strict';

function obtenerProvincias(){
    let listaProvincias = [];
    let peticion = $.ajax({ 
        url: 'http://costa-rica-places.herokuapp.com/api/provinces',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){ 
        listaProvincias = response;
      });
    
      peticion.fail(function(){
      });

    return listaProvincias;
};

function obtenerCantones(){
  let listaCantones = [];
  let peticion = $.ajax({ 
      url: 'http://costa-rica-places.herokuapp.com/api/cantons',
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
      }
    });
  
    peticion.done(function(response){ 
      listaCantones = response;
    });
  
    peticion.fail(function(){
    });

  return listaCantones;
};

function obtenerDistritos(){
  let listaCantones = [];
  let peticion = $.ajax({ 
      url: 'http://costa-rica-places.herokuapp.com/api/districts',
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
      }
    });
  
    peticion.done(function(response){ 
      listaCantones = response;
    });
  
    peticion.fail(function(){
    });

  return listaCantones;
};