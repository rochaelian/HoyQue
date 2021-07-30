'use strict';

const bitacoraModel = require('./bitacoras.model');

/*******************************************************/
/********** Función para registrar bitacoras **********/
/*****************************************************/

module.exports.registrar_bitacora = function(req, res) {
    
    let fechaActual = new Date();
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth() + 1;
    let anio = fechaActual.getFullYear();
    let hora = fechaActual.getHours();
    let minut = fechaActual.getMinutes();

    if(dia<10){
        dia = '0' + dia;
    }
    if(minut<10){
        minut = '0' + minut;
    }
    if(hora<10){
        hora = '0' + hora;
    }

    let nuevaBitacora = new bitacoraModel({
        rol : req.body.rol,
        correo : req.body.correo,
        nombre : req.body.nombre,
        accion : req.body.accion,
        fecha : dia + '/' + mes + '/' + anio + ' ' + hora + ':' + minut 
    });

    nuevaBitacora.save(function(error){
        if(error){
            res.json({success : false, msg: 'No se pudo registrar en bitácora, ocurrió el siguiente error ' + error});
        }else{
            res.json({success : true, msg: 'La bitácora se registró con éxito'}); 
        }
    });
};

/****************************************************/
/********** Función para listar bitácoras **********/
/**************************************************/

module.exports.listar_bitacoras = function(req , res){
    bitacoraModel.find().sort().then( 
        function(bitacora){
            res.send(bitacora);
        }            
    );
};