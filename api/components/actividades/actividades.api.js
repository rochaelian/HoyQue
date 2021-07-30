'use strict';

const actividadModel = require('./actividades.model');

module.exports.registrar = function (req, res) {

    let nuevaActividad = new actividadModel({
        tituloActividad: req.body.tituloActividad,
        /*
        * Daniel : Borre el numero de identificacion de actividad
        */
        descripcionActividad: req.body.descripcionActividad,
        fechaActividad: req.body.fechaActividad,
        horaInicioActividad: req.body.horaInicioActividad,
        horaFinActividad: req.body.horaFinActividad,
        ubicacionActividad: req.body.ubicacionActividad,
        capacidadParticipantesActividad: req.body.capacidadParticipantesActividad,
        cupoActividad: req.body.cupoActividad,
        costoActividad: req.body.costoActividad,
        monedaActividad: req.body.monedaActividad,
        categoriaActividad: req.body.categoriaActividad,
        patrocinadorActividad: req.body.patrocinadorActividad,
        aportePatrocinador: req.body.aportePatrocinador,
        fotoActividad: req.body.fotoActividad,
        ratingActividad: req.body.ratingActividad,
        palabrasActividad: req.body.palabrasActividad,
        id_usuario: req.body.id_usuario,
        estado: 'habilitada',
        // razonDeshabilitar: req.body.razonDeshabilitar,
    });

    nuevaActividad.save(function (error) {
            if (error) {
                res.json({
                    success: false,
                    msg: 'No se pudo registrar la actividad, ocurrió el siguiente error: ' + error
                });
            } else {
                res.json({
                    success: true,
                    msg: 'La actividad se registró con éxito'
                });
            }
        });
};

module.exports.listar_todas = function (req, res) {
    actividadModel.find().sort({fechaActividad: 'asc'}).then(
        function(actividad){
            res.send(actividad);
        }
    );
};

module.exports.listar_habilitadas = function (req, res) {
    actividadModel.find({estado: 'habilitada'}).sort({fechaActividad: 'asc'}).then(
        function(actividad){
            res.send(actividad);
        }
    );
};


module.exports.buscar_actividad = function(req, res){
    actividadModel.findOne({_id : req.body.id}).then(
        function(actividad){
            if(actividad){
                res.send(actividad);
            }else {
                res.send('No se encontró la actividad.');
            }
        }
    );
};

module.exports.comentarios = function (req, res) {
    actividadModel.update({
        _id: req.body._id
    }, {
            $push: {
                'comentarios': {
                    autorActividad: req.body.autorActividad,
                    textoActividad: req.body.textoActividad
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
    actividadModel.find().then(
        function(comentarios){
            res.send(comentarios);
        }
    );

};


module.exports.actualizarActividad = function(req, res){
    actividadModel.findByIdAndUpdate(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({
                    success: false,
                    msg: 'No se pudo actualizar la actividad, ocurrió el siguiente error' + error
                });
            } else {
                res.json({
                    success: true,
                    msg: 'La actividad se actualizó con éxito'
                });
            }
        }
    )
};

module.exports.deshabilitarActividad = function(req, res){
    actividadModel.findByIdAndUpdate(req.body.id, {$set : {
        estado: 'deshabilitada',
    }},
        function(error){
            if(error){
                res.json({
                    success: false,
                    msg: 'No se pudo deshabilitar la actividad, ocurrió el siguiente error' + error
                });
            } else {
                res.json({
                    success: true,
                    msg: 'La actividad se deshabilitó con éxito'
                });
            }
        }
    )
};

module.exports.habilitarActividad = function(req, res){
    actividadModel.findByIdAndUpdate(req.body.id, {$set : {
        estado: 'habilitada'
    }},
        function(error){
            if(error){
                res.json({
                    success: false,
                    msg: 'No se pudo habilitar la actividad, ocurrió el siguiente error' + error
                });
            } else {
                res.json({
                    success: true,
                    msg: 'La actividad se actualizó con éxito'
                });
            }
        }
    )
};

module.exports.borrarActividad = function(req, res){
    actividadModel.findByIdAndDelete(req.body.id,
        function(error){
            if(error){
                res.json({
                    success: false,
                    msg: 'No se pudo actualizar la actividad, ocurrió el siguiente error' + error
                });
            } else {
                res.json({
                    success: true,
                    msg: 'La actividad se actualizó con éxito'
                });
            }
        }
    )
};

/****Manuel Delgado****/
module.exports.comentarios = function (req, res) {
    actividadModel.update({
        _id: req.body._id
    }, {
            $push: {
                'comentarios': {
                    autorActividad: req.body.autorActividad,
                    textoActividad: req.body.textoActividad,
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

module.exports.borrarComentarios = function (req, res) {
    actividadModel.update({
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
    actividadModel.findByIdAndUpdate(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success: false ,msg: 'Ocurrió el siguiente error ' + error});
            }else{
                res.json({success: true ,msg: 'La calificación se actualizó'}); 
            }
        }
    )
};
/****Manuel Delgado****/