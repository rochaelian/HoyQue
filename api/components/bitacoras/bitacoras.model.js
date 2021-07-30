'use strict';
let mongoose = require('mongoose');

let bitacoraSchema = new mongoose.Schema({
    rol : {type : String, required : true},
    correo : {type : String, required : true},
    nombre : {type : String, required : true},
    accion : {type : String, required : true},
    fecha : {type: String, required : true}
});

module.exports = mongoose.model('Bitacora', bitacoraSchema);
