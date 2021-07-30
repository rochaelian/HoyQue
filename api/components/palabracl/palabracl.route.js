'use strict';
const express = require('express');
const router = express.Router();
const palabraclApi = require('./palabracl.api');

/**************************************************/
/***** Función para registrar palabras clave *****/
/************************************************/

router.route('/registrar_palabracl')
    .post(function(req , res){
        palabraclApi.registrar(req , res);
    });


/***********************************************/
/***** Función para listar palabras clave *****/
/*********************************************/

router.route('/listar_palabracl')
    .get(function(req , res){
        palabraclApi.listar_todos(req , res);
    });

/**************************************************/
/***** Función para buscar una palabra clave *****/
/************************************************/    

router.route('/buscar_palabracl')
.post(function(req , res){
    palabraclApi.buscar_palabracl(req , res);
});
    
    
/**************************************************/
/***** Función para modificar palabras clave *****/
/************************************************/

router.route('/actualizar_palabracl')
    .post(function(req , res){
    palabraclApi.actualizar_palabracl(req , res);
});

/**************************************************/
/***** Función para borrar palabras clave *****/
/************************************************/

router.route('/borrar_palabracl')
    .post(function(req , res){
    palabraclApi.borrar_palabracl(req , res);
});

module.exports = router;
