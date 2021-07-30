'use strict';

let mongoose = require('mongoose');

let userSchema = new mongoose.Schema(
    {
        usuario: { type: String, required: true },
        pnombre: { type: String, required: true },
        snombre: { type: String },
        papellido: { type: String, required: true },
        sapellido: { type: String },
        tipoID: { type: String, required: true },
        identidad: { type: String, unique: true, required: true },
        fechaNac: { type: String, required: true },
        edad: { type: String, required: true },
        correo: { type: String, unique: true, required: true },
        sexo: { type: String, required: true },
        razon: { type: String }, 
        fantasia: { type: String }, 
        tipoIDRep: { type: String }, 
        identidadRep: { type: String  },  //me indica Prof. Pablo que por el momento elimine el unique
        correoRep: { type: String }, // me indica Prof. Pablo que por el momento elimine el unique
        clave: { type: String, required: true },
        imagen: {type: String}, 
        estado: { type: String, required: true }, // agregada SST
        baneado:{type: String, required: true},  // agregado sst v3
        comentario:{type: String}, // agregado sst v3

        
        // reservacion agregado por Daniel
        reservacion :  [
            {
                idActividadReservada : {type : String},
                nombreActividadReservada : {type : String}
            }
        ],
        /****Manuel Delgado****/
        seguidos : [
            {
                idLugar : {type : String},
                nombreLugar : {type : String}
            }
        ]
    }
);

module.exports = mongoose.model('User', userSchema);
