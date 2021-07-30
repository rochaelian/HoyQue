'use strict';

const express = require('express');
const router = express.Router();
const actividadApi = require('./actividades.api');

router.route('/registrar_actividad')
    .post(
        function (req, res) {
            actividadApi.registrar(req, res);
        }
    );

router.route('/listar_actividades')
    .get(
        function (req, res) {
            actividadApi.listar_todas(req, res);
        }
    );

router.route('/listar_actividades_habilitadas')
    .get(
        function (req, res) {
            actividadApi.listar_habilitadas(req, res);
        }
    );

router.route('/buscar_actividad')
    .post(
        function (req, res) {
            actividadApi.buscar_actividad(req, res);
        }
    );

router.route('/registrar_comentarios_Actividad')
    .post(function (req, res) {
        actividadApi.comentarios(req, res);
    });

router.route('/listar_comentarios_Actividad')
    .get(function (req, res) {
        actividadApi.listarComentarios(req, res);
    });

router.route('/actualizar_actividad')
    .post(function (req, res) {
        actividadApi.actualizarActividad(req, res);
    });

router.route('/deshabilitar_actividad')
    .post(function (req, res) {
        actividadApi.deshabilitarActividad(req, res);
    });

router.route('/habilitar_actividad')
    .post(function (req, res) {
        actividadApi.habilitarActividad(req, res);
    });

router.route('/borrar_actividad')
    .post(function (req, res) {
        actividadApi.borrarActividad(req, res);
    });

/****Manuel Delgado****/
router.route('/borrar_comentario_Actividad')
    .post(function (req, res) {
        actividadApi.borrarComentarios(req, res);
    });

router.route('/actualizar_rating_Actividad')
    .post(function (req, res) {
        actividadApi.actualizarRatings(req, res);
    });
/****Manuel Delgado****/

module.exports = router;