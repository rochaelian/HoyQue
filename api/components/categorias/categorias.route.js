'use strict';
const express = require('express');
const router = express.Router();
const categoriasApi = require('./categorias.api');


/**********************************************/
/***** Función para registrar categorías *****/
/********************************************/

router.route('/registrar_categorias')
    .post(function(req , res){
        categoriasApi.registrar(req , res);
    });


/*******************************************/
/***** Función para listar categorías *****/
/*****************************************/

router.route('/listar_categorias')
    .get(function(req , res){
        categoriasApi.listar_categorias(req , res);
    });
    

/**********************************************/
/***** Función para buscar una categoría *****/
/********************************************/    

router.route('/buscar_categoria')
.post(function(req , res){
    categoriasApi.buscar_categoria(req , res);
});


/**********************************************/
/***** Función para modificar categorías *****/
/********************************************/

router.route('/actualizar_categoria')
    .post(function(req , res){
    categoriasApi.actualizar_categoria(req , res);
});

/**********************************************/
/***** Función para borrar una categoría *****/
/********************************************/

router.route('/borrar_categoria')
    .post(function(req , res){
    categoriasApi.borrar_categoria(req , res);
});


    

module.exports = router;    