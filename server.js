
// Se exporta http dentro de la arquitectura
const http = require('http');
// Establecemos un puerto en el que el servidor se va a levantar
const port = 3000;
// Se exporta serveStatic que crea un servidor estático
const serveStatic = require('serve-static');
// Se exporta la conexión de nodejs
const connect = require('connect');
// se exporta nodemon, cuya tarea es crea el servidor del back end
const nodemon = require('nodemon');

// Se establece la conexión y el puerto en el que la aplicación va a correr
connect().use(serveStatic(__dirname)).listen(port, () => {
  console.log('El servidor esta levantado dentro del puerto ' + port);
  nodemon({
    script: 'api/index.js',
    ext: 'js'
  });
});