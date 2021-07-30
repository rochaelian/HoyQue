'use strict';
const express = require('express');
const router = express.Router();
const industriasApi = require('./industrias.api');


/**********************************************/
/***** Función para registrar industrias *****/
/********************************************/

router.route('/registrar_industria')
    .post(function(req , res){
        industriasApi.registrar(req , res);
    });


/*******************************************/
/***** Función para listar industrias *****/
/*****************************************/

router.route('/listar_industrias')
    .get(function(req , res){
        industriasApi.listar_industrias(req , res);
    });    


/**********************************************/
/***** Función para buscar una industria *****/
/********************************************/    

router.route('/buscar_industria')
.post(function(req , res){
    industriasApi.buscar_industria(req , res);
});


/**********************************************/
/***** Función para modificar industrias *****/
/********************************************/

router.route('/actualizar_industria')
    .post(function(req , res){
    industriasApi.actualizar_industria(req , res);
});

/*******************************************/
/***** Función para borrar industrias *****/
/*****************************************/

router.route('/borrar_industria')
    .post(function(req , res){
    industriasApi.borrar_industria(req , res);
});

module.exports = router;    