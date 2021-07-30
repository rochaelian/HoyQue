'use strict';
const nodeMailer = require('nodemailer');
const userModel = require('./users.model');


const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sstcamaleon@gmail.com',
        pass: 'Prueba123$'
    },
    tls:{
        rejectUnauthorized : false
    }
});

module.exports.registrar = function (req, res) {

    let nuevoUsuario = new userModel(
        {
            usuario: req.body.usuario,
            pnombre: req.body.pnombre,
            snombre: req.body.snombre,
            papellido: req.body.papellido,
            sapellido: req.body.sapellido,
            tipoID: req.body.tipoID,
            identidad: req.body.identidad,
            fechaNac: req.body.fechaNac,
            edad: req.body.edad,
            correo: req.body.correo,
            sexo: req.body.sexo,
            razon: req.body.razon,
            fantasia: req.body.fantasia,
            tipoIDRep: req.body.tipoIDRep,
            identidadRep: req.body.identidadRep,
            correoRep: req.body.correoRep,
            clave: req.body.clave,
            imagen: req.body.imagen,
            estado: 'Habilitado',  // agregado SST
            baneado: 'No',        // agregado sst v3
            comentario: ''  // agregado sst v3

        }
    );
    //  console.log('usuario: ' + nuevoUsuario);
    nuevoUsuario.save(
        function (error) {
            //       console.log('usuario: ' + error);

            if (error) {


                res.json(
                    {
                        success: false,
                        msg: 'Ocurrió el siguiente error ' + error
                    }
                );

            } else {

                // console.log('errFalso: ' + error)

                let mailOptions = {

                    from: 'sstcamaleon@gmail.com',
                    to: nuevoUsuario.correo,
                    subject: 'Bienvenido a Hoy Qué?',
                    html: `<html>
                <head>
                <link href="https://fonts.googleapis.com/css?family=Roboto"
                rel="stylesheet">
                </head>
                <body>
                <main>
                <h1>Bienvenido a Hoy Qué></h1>
                <h2>Su página de entretenimiento</h2>

                <p>Saludos ${nuevoUsuario.nombre} le agradecemos por escoger utilizar
                los servicios de Hoy Qué?</p>
                <p>El correo electronico asociado es: ${nuevoUsuario.correo}</p>
                <p>Su contrasena temporal es: ${nuevoUsuario.clave}</p>
                <p>Para ingresar visite el siguiente</p>
                <a href="http://localhost:3000/public/inicio_sesion.html"
                class="boton">Ingresar a Hoy Qué?</a>
                </main>

                </body>
                <style>
                body{
                background: #81ecec;
                font-family: 'Roboto', sans-serif;
                }

                main{
                margin: 0 auto;
                background: #fff;
                width: 40%;
                text-align: center;
                padding: 10px;

                }
            .boton{

            background: #ff7675;
            color: #fff;
            display: block;
            padding: 15px;
            text-decoration: none;
            width: 50%;
            margin: 0 auto;


            }
            </style>
            </html>`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);

                    } else {

                        console.log('Correo enviado' + info.response);

                    }


                })
                res.json({ success: true, msg: 'Ya puede navegar por el nuevo perfil del usuario' });
            }
        }
    );
};

module.exports.ingresar = function (req, res) {


    userModel.findOne({ correo: req.body.correo }).then(

        function (elusuario) {

            console.log('elusuario: ' + elusuario)

            console.log('elusuario.clave: ' + elusuario.clave)
            console.log('req.body.clave: ' + req.body.clave)
            console.log('req.body.id: ' + elusuario._id)  // agregue esta linea SST


      // sst V3
            if (elusuario.clave == req.body.clave && elusuario.estado=='Habilitado' && elusuario.baneado=='No') {

                res.json(
                    {
                        sucess: true,
                        usuario: elusuario.usuario,
                        correo: elusuario.correo,
                        _id: elusuario._id  // agregue esta linea SST
                    }
                );
            } else {

                
             //  res.send(false);


               res.json(
                   {


                    sucess:false,
                    baneado: elusuario.baneado,
                    comentario: elusuario.comentario

               }
               );
               
            }

        }
    );
}

module.exports.listar_todos = function (req, res) {
    userModel.find().sort({ titulo: 'asc' }).then(
        function (elusuario) {
            res.send(elusuario);
        }
    );

};

// agregue de aqui en adelante SST

module.exports.buscar_usuario = function (req, res) {
    userModel.findOne({ _id: req.body.id }).then(
        function (elusuario) {
            if (elusuario) {
                res.send(elusuario);
            } else {
                res.send('No se encontró el usuario');
            }

        }
    )
};

module.exports.actualizar_usuario = function (req, res) {
    userModel.findByIdAndUpdate(req.body.id, { $set: req.body },

        function (error) {

            if (error) {

                res.json({ success: false, msg: 'No se pudo actualizar el usuario' });
            } else {
                res.json({ success: true, msg: 'El usuario se actualizo con éxito' });


            }

        }

    )

};

module.exports.deshabilitar_usuario = function (req, res) {
    userModel.findByIdAndUpdate(req.body.id, {
        $set: {
            estado: 'Deshabilitado'
        }
    },

        function (error) {

            if (error) {

                res.json({ success: false, msg: 'No se pudo deshabilitar el usuario' });
            } else {
                res.json({ success: true, msg: 'El usuario se deshabilito con éxito' });


            }

        }

    )

};

module.exports.habilitar_usuario = function (req, res) {
    userModel.findByIdAndUpdate(req.body.id, {
        $set: {
            estado: 'Habilitado'
        }
    },

        function (error) {

            if (error) {

                res.json({ success: false, msg: 'No se pudo habilitar el usuario' });
            } else {
                res.json({ success: true, msg: 'El usuario se habilito con éxito' });


            }

        }

    )

};

module.exports.borrar_usuario = function (req, res) {
    userModel.findByIdAndDelete(req.body.id,

        function (error) {

            if (error) {

                res.json({ success: false, msg: 'No se pudo borrar el usuario' });
            } else {
                res.json({ success: true, msg: 'El usuario se borro con éxito' });


            }

        }

    )

};

// Daniel -- reservar actividad
module.exports.reservarActividad = function (req, res) {
    userModel.update({
        _id: req.body._id
    }, {
            $push: {
                'reservacion': {
                    idActividadReservada: req.body.idActividadReservada,
                    nombreActividadReservada: req.body.nombreActividadReservada
                }
            }
        },
        function (error) {
            if (error) {
                res.json({
                    success: false,
                    msg: 'No se pudo reservar la actividad, ocurrió el siguiente error' + error
                });
            } else {
                res.json({
                    success: true,
                    msg: 'La reservación se realizó con éxito'
                });
            }
        }
    )
};

// Daniel - para obtener el listado de reservaciones de un usuario
module.exports.listarReservaciones = function(req, res){
    userModel.findOne({id: req.body.id}).then(
        function(user){
            if(user){
                res.send(user);
            }else {
                res.send('No se encontró el usuario.');
            }
        }
    );
};

// Daniel -- para cancelar la reservacion a la actividad
module.exports.cancelarActividad = function(req, res){

    console.log(`El usuario es ${req.body.id_usuario} y la reserva es ${req.body.id_reservacion}`);

    userModel.update({
        _id: req.body.id_usuario
    }, {
        $pull: {
            'reservacion': {
                _id : req.body.id_reservacion
            }
        }
    },
    function(error){
        if (error) {
            res.json({
                success: false,
                msg: 'No se pudo cancelar la reservación, ocurrió el siguiente error: ' + error
            });
        } else {
            res.json({
                success: true,
                msg: 'La reservación se canceló con éxito'
            });
        }
    })
};


//SERGIO SST V2

module.exports.actualizarPass_usuario = function (req, res) {
    console.log(`yo soy el correo ${req.body.correo} soy la clave ${req.body.clave}`);
    userModel.findOneAndUpdate({correo: req.body.correo}, { $set:{ clave: req.body.clave} },

        function (error) {

            if (error) {

                res.json({ success: false, msg: 'No se pudo enviar clave temporal' + error });
            } else {

                let mailOptions = {

                    from: 'sstcamaleon@gmail.com',
                    to: req.body.correo,
                    subject: 'Contraseña Temporal acceso a nuestro sitio Hoy Qué?',
                    html: `<html>
                <head>
                <link href="https://fonts.googleapis.com/css?family=Roboto"
                rel="stylesheet">
                </head>
                <body>
                <main>
                <h1>Bienvenido a Hoy Qué</h1>
                <h2>Su página de entretenimiento</h2>

                <p>Saludos estimado usuario, le agradecemos por  utilizar
                los servicios de Hoy Qué?</p>
                <p>El correo electrónico asociado es: ${req.body.correo}</p>
                <p>Su contraseña temporal es: ${req.body.clave}</p>
                <p>Para ingresar visite el siguiente</p>
                <a href="http://localhost:3000/public/inicio_sesion.html"
                class="boton">Ingresar a Hoy Qué?</a>
                </main>

                </body>
                <style>
                body{
                background: #81ecec;
                font-family: 'Roboto', sans-serif;
                }

                main{
                margin: 0 auto;
                background: #fff;
                width: 40%;
                text-align: center;
                padding: 10px;

                }
            .boton{

            background: #ff7675;
            color: #fff;
            display: block;
            padding: 15px;
            text-decoration: none;
            width: 50%;
            margin: 0 auto;


            }
            </style>
            </html>`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);

                    } else {

                        console.log('Correo enviado' + info.response);

                    }


                })
                res.json({ success: true, msg: 'Clave temporal enviada con éxito' });
            }
        }
    );
};

/****Manuel Delgado****/
module.exports.seguirLugar = function (req, res) {
    userModel.update({
        _id: req.body._id
    }, {
            $push: {
                'seguidos': {
                    idLugar: req.body.idLugar,
                    nombreLugar: req.body.nombreLugar
                }
            }
        },
        function (error) {
            if (error) {
                res.json({
                    success: false,
                    msg: 'No se pudo seguir el lugar, ocurrió el siguiente error' + error
                });
            } else {
                res.json({
                    success: true,
                    msg: 'se sigue el lugar con éxito'
                });
            }
        }
    )
};

/****Manuel Delgado****/
module.exports.noSeguirLugar = function(req, res){
    userModel.update({
        _id: req.body.id
    }, {
            $pull: {
                'seguidos':{_id : req.body.idLugarSeguido} 
            }
        },
        function (error) {
            if (error) {
                res.json({
                    success: false,
                    msg: 'No se pudo dejar de seguir el lugar, ocurrió el siguiente error' + error
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Se dejó de seguir el lugar con éxito'
                });
            }
        }
    )
};

// SST V3 de aqui para abajo

module.exports.desbanear_usuario = function (req, res) {
    userModel.findByIdAndUpdate(req.body.id, {
        $set: {
            baneado: 'No'
        }
    },

        function (error) {

            if (error) {

                res.json({ success: false, msg: 'No se pudo desbanear el usuario' });
            } else {
                res.json({ success: true, msg: 'El usuario se desbaneo con éxito' });


            }

        }

    )

};


module.exports.banear_usuario = function (req, res) {
    userModel.findByIdAndUpdate(req.body.id, {
        $set: {
            baneado: 'Si',
            comentario:req.body.comentario  // sst v3
        }
    },

        function (error) {

            if (error) {

                res.json({ success: false, msg: 'No se pudo banear el usuario' });
            } else {
                res.json({ success: true, msg: 'El usuario se baneo con éxito' });


            }

        }

    )

};