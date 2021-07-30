'use strict';
const patrocinadorModel = require('./patrocinadores.model');

/************************************************************/
/********** Función para registrar patrocinadores **********/
/**********************************************************/

module.exports.registrar = function(req, res) {
   
    let nuevoPatrocinador = new patrocinadorModel({
        nombre : req.body.nombre,
        industria : req.body.industria,
        imagen : req.body.imagen
    });

    nuevoPatrocinador.save(function(error){
        if(error){
            res.json({success : false, msg: 'No se pudo registrar el patrocinaddor, ocurrió el siguiente error ' + error});
        }else{
            res.json({success : true, msg: 'El patrocinador se registró con éxito'}); 
        }
    });
};


/*********************************************************/
/********** Función para listar patrocinadores **********/
/*******************************************************/

module.exports.lista_patrocinadores = function(req , res){
    patrocinadorModel.find().sort({nombre: 'asc'}).then( 
        function(patrocinadores){
            res.send(patrocinadores);
        }            
    );
};

/****************************************************/
/******* Función para buscar un patrocinador *******/
/**************************************************/

module.exports.buscar_patrocinador = function(req, res){
    patrocinadorModel.findOne({_id : req.body.id}).then(
        function(patrocinador){
            if(patrocinador){
                res.send(patrocinador);
            }else{
                res.send('No se encontró el patrocinador');
            }
        }
    )
};


/*******************************************************/
/******* Función para actualizar patrocinadores *******/
/*****************************************************/

module.exports.actualizar_patrocinador = function(req, res){
    patrocinadorModel.findByIdAndUpdate(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo actualizar el patrocinador'});
            }else{
                res.json({success: true ,msg: 'El patrocinador se actualizó con éxito'}); 
            }
        }
    )
};


/****************************************************/
/******* Función para borrar un patrocinador *******/
/**************************************************/

module.exports.borrar_patrocinador = function(req, res){
    patrocinadorModel.findByIdAndDelete(req.body.id,
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo eliminar el patrocinador'});
            }else{
                res.json({success: true ,msg: 'El patrocinador se eliminó con éxito'}); 
            }
        }
    )
};