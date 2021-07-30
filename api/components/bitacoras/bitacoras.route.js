'use strict';
const express = require('express');
const router = express.Router();
const bitacorasApi = require('./bitacoras.api');


/*******************************************/
/***** Función para registrar bitáora *****/
/*****************************************/

router.route('/registrar_bitacora')
    .post(function(req , res){
        bitacorasApi.registrar_bitacora(req , res);
    });

/*******************************************/
/***** Función para listar bitacoras *****/
/*****************************************/

router.route('/listar_bitacoras')
    .get(function(req , res){
        bitacorasApi.listar_bitacoras(req , res);
    });     

module.exports = router;