'use strict';

const categoriaModel = require('./categorias.model');

/********************************************************/
/********** Función para registrar categorías **********/
/******************************************************/

module.exports.registrar = function(req, res) {
   
    let nuevaCategoria = new categoriaModel({
        nombre : req.body.nombre,
        descripcion : req.body.descripcion
    });

    nuevaCategoria.save(function(error){ //Lo del error: con que id lo captp, ya lo intente con numero
        if(error){
            res.json({success : false, msg: 'No se pudo registrar la categoría, ocurrió el siguiente error ' + error});
        }else{
            res.json({success : true, msg: 'La categoría se registró con éxito'}); 
        }
    });
};


/*****************************************************/
/********** Función para listar categorías **********/
/***************************************************/

module.exports.listar_categorias = function(req , res){
    categoriaModel.find().sort({nombre: 'asc'}).then( 
        function(categoria){
            res.send(categoria);
        }            
    );
};


/**************************************************/
/******* Función para buscar una categoría *******/
/************************************************/

module.exports.buscar_categoria = function(req, res){
    categoriaModel.findOne({_id : req.body.id}).then(
        function(categoria){
            if(categoria){
                res.send(categoria);
            }else{
                res.send('No se encontró la categoría');
            }
        }
    )
};


/***************************************************/
/******* Función para actualizar categorías *******/
/*************************************************/

module.exports.actualizar_categoria = function(req, res){
    categoriaModel.findByIdAndUpdate(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo actualizar la categoría'});
            }else{
                res.json({success: true ,msg: 'La categoría se actualizó con éxito'}); 
            }
        }
    )
};

/*****************************************************/
/******* Función para eliminar unna categoría *******/
/***************************************************/

module.exports.borrar_categoria = function(req, res){
    categoriaModel.findByIdAndDelete(req.body.id,
        function(error){
            if(error){
                res.json({success: false ,msg: 'Se ha eliminado la categoría'});
            }else{
                res.json({success: true ,msg: 'La categoría se eliminó con éxito'}); 
            }
        }
    )
};