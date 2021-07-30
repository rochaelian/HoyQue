'use strict';
const express = require('express');
const router = express.Router();
const userApi = require('./users.api');

router.route('/registro_usuario')
  .post(function (req, res) {
    userApi.registrar(req, res);

  });

router.route('/validar_credenciales')
  .post(function (req, res) {
    userApi.ingresar(req, res);

  });


router.route('/listar_usuarios')
  .get(function (req, res) {
    userApi.listar_todos(req, res);
  });


//agregue estas rutas SST

router.route('/buscar_usuario')
  .post(function (req, res) {
    userApi.buscar_usuario(req, res);
  });


router.route('/actualizar_usuario')
  .post(function (req, res) {
    userApi.actualizar_usuario(req, res);
  });


router.route('/deshabilitar_usuario')
  .post(function (req, res) {
    userApi.deshabilitar_usuario(req, res);
  });

router.route('/habilitar_usuario')
  .post(function (req, res) {
    userApi.habilitar_usuario(req, res);
  });


router.route('/borrar_usuario')
  .post(function (req, res) {
    userApi.borrar_usuario(req, res);
  });

// Daniel --
router.route('/reservar_actividad')
  .post(function (req, res) {
    userApi.reservarActividad(req, res);
  });

// Daniel - para cancelar la reservacion a la actividad
router.route('/cancelar_actividad')
  .post(function (req, res) {
    userApi.cancelarActividad(req, res);
  });

// Daniel - listar reservaciones
router.route('/listar_reservaciones_usuario')
  .get(function (req, res) {
    userApi.listarReservaciones(req, res);
  });

//SST v2

router.route('/actualizarPass_usuario')
  .post(function (req, res) {
    userApi.actualizarPass_usuario(req, res);
  });

/****Manuel Delgado****/
router.route('/seguir_lugar')
  .post(function (req, res) {
    userApi.seguirLugar(req, res);
  });

/****Manuel Delgado****/
router.route('/no_seguir_lugar')
  .post(function (req, res) {
    userApi.noSeguirLugar(req, res);
  });

// SST v3 de aqui para abajo

router.route('/desbanear_usuario')
  .post(function (req, res) {
    userApi.desbanear_usuario(req, res);
  });

router.route('/banear_usuario')
  .post(function (req, res) {
    userApi.banear_usuario(req, res);
  });

module.exports = router;