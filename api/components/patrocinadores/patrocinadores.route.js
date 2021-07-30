'use strict';
const express = require('express');
const router = express.Router();
const patrocinadorApi = require('./patrocinadores.api');

/**************************************************/
/***** Función para registrar patrocinadores *****/
/************************************************/  

router.route('/registrar_patrocinador')
    .post(function(req , res){
        patrocinadorApi.registrar(req , res);
    });

/***********************************************/
/***** Función para listar patrocinadores *****/
/*********************************************/      

router.route('/listar_patrocinadores')
    .get(function(req , res){
        patrocinadorApi.lista_patrocinadores(req , res);
    });


/************************************************/
/***** Función para buscar un patrocinador *****/
/**********************************************/    

router.route('/buscar_patrocinador')
.post(function(req , res){
    patrocinadorApi.buscar_patrocinador(req , res);
});
    
    
/**************************************************/
/***** Función para modificar patrocinadores *****/
/************************************************/

router.route('/actualizar_patrocinador')
    .post(function(req , res){
    patrocinadorApi.actualizar_patrocinador(req , res);
}); 


/************************************************/
/***** Función para borrar un patrocinador *****/
/**********************************************/    

router.route('/borrar_patrocinador')
.post(function(req , res){
    patrocinadorApi.borrar_patrocinador(req , res);
});

module.exports = router;