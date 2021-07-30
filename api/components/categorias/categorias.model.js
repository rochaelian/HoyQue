'use strict';
let mongoose = require('mongoose');

let categoriaSchema = new mongoose.Schema({
    nombre : {type : String, unique : true, required : true},
    descripcion : {type : String, unique: true, required : true}
});

module.exports = mongoose.model('Categoria', categoriaSchema);
