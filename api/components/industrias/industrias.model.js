'use strict';
let mongoose = require('mongoose');

let industriaSchema = new mongoose.Schema({
    nombre : {type : String, unique : true, required : true}
});

module.exports = mongoose.model('Industria', industriaSchema);
