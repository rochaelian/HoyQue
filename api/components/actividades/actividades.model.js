'use strict';
let mongoose = require('mongoose');

let actividadSchema = new mongoose.Schema({
    tituloActividad : {type : String, required : true,},
    /*
    * Daniel : Borre el numero de identificacion de actividad
    */
    descripcionActividad : {type : String, required : true,},
    fechaActividad : {type : Date, required : true,},
    horaInicioActividad : {type : String, required : true,},
    horaFinActividad : {type : String, required : true,},
    ubicacionActividad : {type : String, required : true,},
    capacidadParticipantesActividad : {type : Number, required : true, min : 0,},
    cupoActividad : {type : Number, required : true, min : 0,},
    costoActividad : {type : Number, required : true, min : 0,},
    monedaActividad : {type : String, required : true,},
    categoriaActividad : {type : String, required : true,},
    patrocinadorActividad : {type : String, required : true,},
    aportePatrocinador : {type : String, required : true,},
    fotoActividad : {type : String, required : true,},
    ratingActividad : {type : Number, required : true,},
    palabrasActividad : {type : String, required : true,},
    id_usuario: {type: String, required: true,},
    estado: {type: String, required : true,}, //Daniel - nueva linea ****
    comentarios : [
        {
            autorActividad : {type : String},
            textoActividad : {type : String},
            rating : {type : Number} /****Manuel Delgado****/
        }
    ]
});

module.exports = mongoose.model('Actividad', actividadSchema);