'use strict';
let mongoose = require('mongoose');

let palabraclSchema = new mongoose.Schema(
    {
        nombre : {type : String, unique : true, required : true},
        descripcion : {type : String, required : true},
    }
);

module.exports = mongoose.model('Palabracl', palabraclSchema);