'use strict';
const palabraclModel = require('./palabracl.model');


/******************************************************/
/******* Función para registrar palabras clave *******/
/****************************************************/

module.exports.registrar = function(req, res) {
   
    let nuevoPalabracl = new palabraclModel({
        nombre : req.body.nombre,
        descripcion : req.body.descripcion
    });

    nuevoPalabracl.save(function(error){
            if(error == true){
                res.json(
                    {
                        success : false, 
                        msg: 'No se pudo registrar la palabra clave, ocurrió el siguiente error ' + error
                    }
                );
            }else{
                res.json({success : true, msg: 'La palabra clave se registró con éxito'}); 
            }
        }
    );
};


/******************************************************/
/******* Función para listar palabras clave *******/
/****************************************************/

module.exports.listar_todos = function(req , res){
    palabraclModel.find().sort({nombre: 'asc'}).then(
        function(palabracl){
            res.send(palabracl);
        }
    );

};

/******************************************************/
/******* Función para buscar una palabra clave *******/
/****************************************************/

module.exports.buscar_palabracl = function(req, res){
    palabraclModel.findOne({_id : req.body.id}).then(
        function(palabracl){
            if(palabracl){
                res.send(palabracl);
            }else{
                res.send('No se encontró la palabra clave');
            }
        }
    )
};


/*******************************************************/
/******* Función para actualizar palabras clave *******/
/*****************************************************/

module.exports.actualizar_palabracl = function(req, res){
    palabraclModel.findByIdAndUpdate(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo actualizar la palabra clave'});
            }else{
                res.json({success: true ,msg: 'La palabra clave se actualizó con éxito'}); 
            }
        }
    )
};

/***************************************************/
/******* Función para borrar palabras clave *******/
/*************************************************/

module.exports.borrar_palabracl = function(req, res){
    palabraclModel.findByIdAndDelete(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo eliminar la palabra clave'});
            }else{
                res.json({success: true ,msg: 'La palabra clave se eliminó con éxito'}); 
            }
        }
    )
};