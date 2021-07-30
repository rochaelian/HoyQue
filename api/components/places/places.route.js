'use strict';
const express = require('express');
const router = express.Router();
const placeApi = require('./places.api');

router.route('/registrar_lugares')
    .post(function(req , res){
        placeApi.registrar(req , res);
    });

router.route('/listar_lugares')
    .get(function(req , res){
        placeApi.listar(req , res);
    });

router.route('/registrar_comentarios')
    .post(function(req,res){
        placeApi.comentarios(req , res);
    });

router.route('/listar_comentarios')
    .get(function(req , res){
        placeApi.listarComentarios(req , res);
    });

router.route('/buscar_lugar')
    .post(function(req , res){
        placeApi.buscarLugares(req , res);
    });

router.route('/actualizar_lugar')
    .post(function(req , res){
        placeApi.actualizarLugares(req , res);
    });

router.route('/borrar_lugar')
    .post(function(req , res){
        placeApi.borrarLugares(req , res);
    });

router.route('/deshabilitar_lugar')
    .post(function(req , res){
        placeApi.deshabilitarLugares(req , res);
    });

router.route('/habilitar_lugar')
    .post(function(req , res){
        placeApi.habilitarLugares(req , res);
    });

router.route('/borrar_comentario')
    .post(function(req,res){
        placeApi.borrarComentarios(req , res);
    });

router.route('/actualizar_rating')
    .post(function(req , res){
        placeApi.actualizarRatings(req , res);
    });

router.route('/aprobar_lugar')
    .post(function(req , res){
        placeApi.aprobarLugares(req , res);
    });

router.route('/desaprobar_lugar')
    .post(function(req , res){
        placeApi.desaprobarLugares(req , res);
    });

module.exports = router;
