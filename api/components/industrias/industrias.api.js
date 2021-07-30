'use strict';

const industriaModel = require('./industrias.model');

/********************************************************/
/********** Función para registrar industrias **********/
/******************************************************/

module.exports.registrar = function(req, res) {
   
    let nuevaIndustria = new industriaModel({
        nombre : req.body.nombre
    });

    nuevaIndustria.save(function(error){ //Lo del error: con que id lo captp, ya lo intente con numero
        if(error){
            res.json({success : false, msg: 'No se pudo registrar la industria, ocurrió el siguiente error ' + error});
        }else{
            res.json({success : true, msg: 'La inidustria registró con éxito'}); 
        }
    });
};


/*****************************************************/
/********** Función para listar industrias **********/
/***************************************************/

module.exports.listar_industrias = function(req , res){
    industriaModel.find().sort({nombre: 'asc'}).then( 
        function(industria){
            res.send(industria);
        }            
    );
};

/**************************************************/
/******* Función para buscar una industria *******/
/************************************************/

module.exports.buscar_industria = function(req, res){
    industriaModel.findOne({_id : req.body.id}).then(
        function(industria){
            if(industria){
                res.send(industria);
            }else{
                res.send('No se encontró la industria');
            }
        }
    )
};


/***************************************************/
/******* Función para actualizar industrias *******/
/*************************************************/

module.exports.actualizar_industria = function(req, res){
    industriaModel.findByIdAndUpdate(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo actualizar la industria'});
            }else{
                res.json({success: true ,msg: 'La industria se actualizó con éxito'}); 
            }
        }
    )
};

/***********************************************/
/******* Función para borrar industrias *******/
/*********************************************/

module.exports.borrar_industria = function(req, res){
    industriaModel.findByIdAndDelete(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo eliminar la industria'});
            }else{
                res.json({success: true ,msg: 'La industria se eliminó con éxito'}); 
            }
        }
    )
};