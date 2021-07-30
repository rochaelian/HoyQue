'use strict';
const placeModel = require('./places.model');

module.exports.registrar = function(req, res) {
   
    let nuevoLugar = new placeModel({
        provincia : req.body.provincia,
        canton : req.body.canton,
        distrito : req.body.distrito,
        titulo : req.body.titulo,
        categoria : req.body.categoria,
        descripcion : req.body.descripcion,
        direccion : req.body.direccion,
        coordenadas : req.body.coordenadas,
        imagen : req.body.imagen,
        ratingLugar : req.body.ratingLugar,
        estado : req.body.estado,
        permiso : req.body.permiso,
        registradoEmpresa : req.body.registradoEmpresa
    });

    nuevoLugar.save(function(error){
        if(error){
            res.json(
                {success : false, msg: 'Ocurrió el siguiente error ' + error}
            );
        } else {
            res.json(
                {success : true, msg: 'Ya puede navegar por el nuevo perfil del lugar'}
            ); 
        }
    });
};

module.exports.listar = function(req , res){
    placeModel.find().then(
        function(lugares){
            res.send(lugares);
        }
    );

};

module.exports.comentarios = function (req, res) {
    placeModel.update({
        _id: req.body._id
    }, {
            $push: {
                'comentarios': {
                    autor: req.body.autor,
                    texto: req.body.texto,
                    rating: req.body.rating
                }
            }
        },
        function (error) {
            if (error) {
                res.json({
                    success: false,
                    msg: 'No se pudo publicar el comentario, ocurrió el siguiente error' + error
                });
            } else {
                res.json({
                    success: true,
                    msg: 'El comentario se publicó con éxito'
                });
            }
        }
    )
};

module.exports.listarComentarios = function(req , res){
    placeModel.find().then(
        function(comentarios){
            res.send(comentarios);
        }
    );

};

module.exports.buscarLugares = function(req, res){
    placeModel.findOne({_id : req.body.id}).then(
        function(lugar){
            if(lugar){
                res.send(lugar);
            }else{
                res.send('No se encontró el lugar');
            }
            
        }
    )
};

module.exports.actualizarLugares = function(req, res){
    placeModel.findByIdAndUpdate(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success: false ,msg: 'Ocurrió el siguiente error ' + error});
            }else{
                res.json({success: true ,msg: 'Puede revisar la actualización'}); 
            }
        }
    )
};

module.exports.borrarLugares = function(req, res){
    placeModel.findByIdAndDelete(req.body.id,
        function(error){
            if(error){
                res.json({success: false ,msg: 'Ocurrió el siguiente error ' + error});
            }else{
                res.json({success: true ,msg: 'El lugar se borró del sistema'}); 
            }
        }
    )
};

module.exports.deshabilitarLugares = function(req, res){
    placeModel.findByIdAndUpdate(req.body.id, {$set: { 
        estado: 'Deshabilitado'
      }},
        function(error){
            if(error){
                res.json({success: false ,msg: 'Ocurrió el siguiente error ' + error});
            }else{
                res.json({success: true ,msg: 'No puede acceder más al lugar por el momento'}); 
            }
        }
    )
};

module.exports.habilitarLugares = function(req, res){
    placeModel.findByIdAndUpdate(req.body.id, {$set: { 
        estado: 'Habilitado'
      }},
        function(error){
            if(error){
                res.json({success: false ,msg: 'Ocurrió el siguiente error ' + error});
            }else{
                res.json({success: true ,msg: 'Puede acceder al lugar habilitado'}); 
            }
        }
    )
};

module.exports.borrarComentarios = function (req, res) {
    placeModel.update({
        _id: req.body.id
    }, {
            $pull: {
                'comentarios':{_id : req.body.idcomentario} 
            }
        },
        function (error) {
            if (error) {
                res.json({
                    success: false,
                    msg: 'No se pudo borrar el comentario, ocurrió el siguiente error' + error
                });
            } else {
                res.json({
                    success: true,
                    msg: 'El comentario se borró con éxito'
                });
            }
        }
    )
};

module.exports.actualizarRatings = function(req, res){
    placeModel.findByIdAndUpdate(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success: false ,msg: 'Ocurrió el siguiente error ' + error});
            }else{
                res.json({success: true ,msg: 'La calificación se actualizó'}); 
            }
        }
    )
};

module.exports.aprobarLugares = function(req, res){
    placeModel.findByIdAndUpdate(req.body.id, {$set: { 
        permiso: 'aprobado'
      }},
        function(error){
            if(error){
                res.json({success: false ,msg: 'Ocurrió el siguiente error ' + error});
            }else{
                res.json({success: true ,msg: 'Se aprobó la publicación del lugar'}); 
            }
        }
    )
};

module.exports.desaprobarLugares = function(req, res){
    placeModel.findByIdAndUpdate(req.body.id, {$set: { 
        permiso: 'desaprobado'
      }},
        function(error){
            if(error){
                res.json({success: false ,msg: 'Ocurrió el siguiente error ' + error});
            }else{
                res.json({success: true ,msg: 'No se ha aprobado la publicación del lugar'}); 
            }
        }
    )
};