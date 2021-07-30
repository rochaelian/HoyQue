'use strict';
let mongoose = require('mongoose');

let placeSchema = new mongoose.Schema({
    provincia : {type : String, required : true},
    canton : {type : String, required : true},
    distrito : {type : String, required : true},
    categoria : {type : String, required : true},
    titulo : {type : String, required : true},
    descripcion : {type : String, required : true},
    direccion : {type : String, required : true},
    coordenadas : {type : String, required : true},
    imagen : {type: String},
    ratingLugar: {type : Number, required : true},
    estado: {type: String, required : true},
    permiso: {type: String, required : true},
    registradoEmpresa: {type: String, required : true},
    comentarios : [
        {
            autor : {type : String},
            texto : {type : String},
            rating : {type : Number}
        }
    ]
});

module.exports = mongoose.model('Place', placeSchema);