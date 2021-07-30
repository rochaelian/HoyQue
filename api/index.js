'use strict';

/**
 * Exportamos todas las dependencias necesarias para establecer la conexión
 */
const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      morgan =  require('morgan'),
      mongoose = require('mongoose');

/**
 * Se definen las variables necesarias para la conexión con MongoDB
 */
let db = mongoose.connection,
    dburl = 'mongodb://camaleon:Camalab.1@ds125293.mlab.com:25293/proyectohoyque',
    port = 4000;

/**
 * Se le indica que cree un servidor extra dentro del puerto 4000 y escuche los cambios que se le hagan a esos archivos
 */
let server = app.listen(port,_server());

/**
 * Se define la conexión con Mongoose, enviándole como parámetro la url de la base de datos
 */
mongoose.connect(dburl, {useNewUrlParser: true });

/**
 * Si la conexión falla, imprime en consola el error
 */
db.on('error', console.error.bind(console, 'Error de conexión: '));

/**
 * Si la conexión es exitosa nos imprime en la consola que se ha establecido conexión con Mongo
 */
db.once('open', function () {
  console.log('Base de datos conectada correctamente');
});

/**
 * Le indicamos a express que envíe las respuestas a la carpeta "public"
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Le indicamos a la aplicación que el formato de los datos va a ser JSON
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use( function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/**
 * Exportams todas las rutas dentro del index.js
 */
const lugares = require('./components/places/places.route');
const categorias = require('./components/categorias/categorias.route');
const usuarios = require('./components/users/users.route');
const actividades = require('./components/actividades/actividades.route');
const industrias = require('./components/industrias/industrias.route');
const palabrascl = require('./components/palabracl/palabracl.route');
const patrocinadores = require('./components/patrocinadores/patrocinadores.route');
const bitacoras = require('./components/bitacoras/bitacoras.route');

/**
 * Le indicamos que le de acceso externo a las rutas inicializadas
 */
app.use('/api', lugares);
app.use('/api', categorias);
app.use('/api', usuarios);
app.use('/api', actividades);
app.use('/api', industrias);
app.use('/api', palabrascl);
app.use('/api', patrocinadores);
app.use('/api', bitacoras);

// Se guarda todo lo que se ha realizado
module.exports = app;

function _server(){
  console.log('Conexión establecida en el puerto ' + port);
};