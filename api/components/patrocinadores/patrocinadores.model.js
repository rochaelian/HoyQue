'use strict';
let mongoose = require('mongoose');

let patrocinadorSchema = new mongoose.Schema({
    nombre : {type : String, unique : true, required : true},
    industria : {type: String, unique : false, required: true},
    imagen : {type: String, required : true}
});

module.exports = mongoose.model('Patrocinador', patrocinadorSchema);