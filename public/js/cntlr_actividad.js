'use strict';

// let tipoUsuario = sessionStorage.getItem('tipo_usuario');
let id_actividad = localStorage.getItem('actividad');
let actividad = buscar_actividad(id_actividad);
let tipoUsuario = sessionStorage.getItem('tipo_usuario');
let dataUsuarios = obtenerUsuarios();

/****Manuel Delgado****/
//comentarios
// const botonCalificar = document.querySelector('#btnCalificar');
// const inputComentario = document.querySelector('#registrarComentario');
// const perfilComentarios = document.querySelector('#listaComentarios');
const numeroRatingPerfil = document.querySelector('#numeroRatingPerfil');
const agregarNumeroRating = document.querySelector('#numeroRating');
// let listaActividades = obtenerActividades();
// let listaComentarios = actividad['comentarios'];
let ratingPerfil = actividad['ratingActividad'];
/****Manuel Delgado****/

mostrarActividad();
mostarPatrocinadores();

function mostrarActividad() {
    // let actividad = obtenerActividades();
    const contenedorActividad = document.querySelector('#actividad');

    let imgActividad = actividad['fotoActividad'];
    let tituloActividad = actividad['tituloActividad'];
    // let idActividad = actividad['idActividad'];
    let descripcionActividad = actividad['descripcionActividad'];
    let fechaActividad = actividad['fechaActividad'];
    let horaInicioActividad = actividad['horaInicioActividad'];
    let horaFinActividad = actividad['horaFinActividad'];
    let ubicacionActividad = actividad['ubicacionActividad'];
    let cupoActividad = actividad['capacidadParticipantesActividad'];
    let disponibleActividad = actividad['cupoActividad'];
    let costoActividad = actividad['costoActividad'];
    let monedaActividad = actividad['monedaActividad'];
    let categoriaActividad = actividad['categoriaActividad'];
    let patrocinadorActividad = actividad['patrocinadorActividad'];
    let aportePatrocinador = actividad['aportePatrocinador'];
    let fotoActividad = actividad['fotoActividad'];
    let ratingActividad = actividad['ratingActividad'];
    let palabrasActividad = actividad['palabrasActividad'];

    const idImgActividad = document.querySelector('#imagenActividad');
    idImgActividad.src = imgActividad;
    idImgActividad.alt = tituloActividad;
    const idTituloActividad = document.querySelector('#tituloActividad');
    idTituloActividad.innerText = tituloActividad;
    // const idIdActividad = document.querySelector('#idActividad');
    // idIdActividad.innerText = idActividad;
    const idLugarActividad = document.querySelector('#lugarActividad');
    idLugarActividad.innerText = ubicacionActividad;
    const idCategoriaActividad = document.querySelector('#categoriaActividad');
    idCategoriaActividad.innerText = categoriaActividad.split(',').join(', ');;
    let newFechaActividad = new Date(fechaActividad);
    newFechaActividad = newFechaActividad.toLocaleDateString();
    const idFechaActividad = document.querySelector('#fechaActividad');
    idFechaActividad.innerText = newFechaActividad;
    const idHorarioActividad = document.querySelector('#horarioActividad');
    idHorarioActividad.innerText = horaInicioActividad + ' a ' + horaFinActividad;
    const idDescripcionActividad = document.querySelector('#descripcionActividad');
    idDescripcionActividad.innerText = descripcionActividad;
    const idPalabrasActividad = document.querySelector('#palabrasActividad');
    idPalabrasActividad.innerText = palabrasActividad.split(',').join(', ');;
    const idPatrocinadorActividad = document.querySelector('#patrocinadorActividad');
    idPatrocinadorActividad.innerText = patrocinadorActividad;
    const idAportePatrocinador = document.querySelector('#aportePatrocinador');
    idAportePatrocinador.innerText = aportePatrocinador;
    // const idRatingActividad = document.querySelector('#ratingActividad');
    // idRatingActividad.innerText = ratingActividad;

    const idMonedaActividad = document.querySelector('#monedaActividad');
    const idPrecioActividad = document.querySelector('#precioActividad');
    let costoActividadColones = costoActividad.toLocaleString('es');
    let costoActividadDolares = costoActividad.toLocaleString('en');

    if (monedaActividad == 'Colones') {
        monedaActividad = '₡';
        costoActividad = costoActividadColones;
        idMonedaActividad.innerText = monedaActividad;
        idPrecioActividad.innerText = costoActividad;
    } else {
        monedaActividad = '$'
        costoActividad = costoActividadDolares;
        idMonedaActividad.innerText = costoActividad;
        idMonedaActividad.innerText = monedaActividad;
        idPrecioActividad.innerText = costoActividad;
    }

    const idCupoActividad = document.querySelector('#cupoActividad');
    idCupoActividad.innerText = cupoActividad;
    const idDisponibleActividad = document.querySelector('#disponibleActividad');
    idDisponibleActividad.innerText = disponibleActividad;
};

// Inicio funcion de mostrar Categorías
function mostarPatrocinadores() {
    let listaPatrocinadores = obtenerPatrocinadores();
    let imgPatrocinadores = document.querySelector('#imgPatrocinador');
    let patrocinadorActividad = document.querySelector('#patrocinadorActividad');
    let txtPatrocinadorActividad = patrocinadorActividad.innerHTML;


    for (let i = 0; i < listaPatrocinadores.length; i++) {
        let nombrePatrocinador = listaPatrocinadores[i]
            ['nombre'];
        let logoPatrocinador = listaPatrocinadores[i]['imagen'];
        if (nombrePatrocinador == txtPatrocinadorActividad) {
            imgPatrocinadores.src = logoPatrocinador;
        }
    }
}

//comentarios
const botonCalificar = document.querySelector('#btnCalificar');
const inputComentario = document.querySelector('#registrarComentario');
const perfilComentarios = document.querySelector('#listaComentarios');
// let listaActividades = obtenerActividades();
let listaComentarios = actividad['comentarios'];
//lista de usuarios
// let dataUsuarios = obtenerUsuarios();

botonCalificar.addEventListener("click", function (event) {
    event.preventDefault();
    obtenerComentarios();
});

// Reporte de clientes con reservacion
function listaTodasReservaciones() {
    let reservaciones = [];
    let idReservaciones = [];
    let idUsuario = [];
    let idEmpresa = [];
    let reservacionesDeUsuario = [];
    for (let i = 0; i < dataUsuarios.length; i++) {
        reservaciones = dataUsuarios[i]['reservacion'];
        idUsuario = dataUsuarios[i]['_id'];
        if (reservaciones) {
            for (let j = 0; j < reservaciones.length; j++) {
                idReservaciones = reservaciones[j].idActividadReservada;
                for (let k = 0; k < listaActividades.length; k++) {
                    if (listaActividades[k]['_id'] === idReservaciones) {
                        idEmpresa = listaActividades[k]['id_usuario'];
                    }
                }
                reservacionesDeUsuario.push({
                    usuario: idUsuario,
                    actividad: idReservaciones,
                    empresa: idEmpresa
                })
            }
        }
    }
    return reservacionesDeUsuario;
};

if (tipoUsuario === 'Empresa') {
    let listaDeReservaciones = listaTodasReservaciones();
    let usuariosConReservacion = [];
    const actividadMetadata = document.querySelector('#reservar-actividad');
    const tituloActividadMetadata = document.createElement('h4');
    tituloActividadMetadata.classList = 'last';
    actividadMetadata.appendChild(tituloActividadMetadata);
    tituloActividadMetadata.innerText = 'Usuarios con reservación:';
    const ulActividadMetadata = document.createElement('ul');
    actividadMetadata.appendChild(ulActividadMetadata);
    ulActividadMetadata.id = 'usuarios-reservados';


    for (let i = 0; i < listaDeReservaciones.length; i++) {
        if (actividad['_id'] === listaDeReservaciones[i].actividad) {
            usuariosConReservacion.push(listaDeReservaciones[i].usuario);
        }
    }
    for (let i = 0; i < usuariosConReservacion.length; i++) {
        const liActividadMetadata = document.createElement('li');
        let nombreCliente;
        let apellidoCliente;
        for (let j = 0; j < dataUsuarios.length; j++) {
            if (dataUsuarios[j]['_id'] === usuariosConReservacion[i]) {
                nombreCliente = dataUsuarios[i]['pnombre'];
                apellidoCliente = dataUsuarios[i]['papellido'];

                ulActividadMetadata.appendChild(liActividadMetadata);
                liActividadMetadata.innerText = `${nombreCliente} ${apellidoCliente}`;
            }
        }
    }
}


/****Manuel Delgado****/
function calificarPerfil(){
    numeroRatingPerfil.innerHTML = ratingPerfil;
    let calificacion5 = document.getElementById('ratingPerfil5');
    let calificacion4 = document.getElementById('ratingPerfil4');
    let calificacion3 = document.getElementById('ratingPerfil3');
    let calificacion2 = document.getElementById('ratingPerfil2');
    let calificacion1 = document.getElementById('ratingPerfil1');
    
    switch (ratingPerfil) {
        case 5:
        calificacion5.checked = true;
        break;
        case 4:
        calificacion4.checked = true;
        break;
        case 3:
        calificacion3.checked = true;
        break;
        case 2:
        calificacion2.checked = true;
        break;
        case 1:
        calificacion1.checked = true;
        break;
        default:
        break;    
    };
};
calificarPerfil();
/****Manuel Delgado****/

/****Manuel Delgado****/
let estrellas = document.querySelectorAll('.registrar-estrella');
    for(let i = 0; i < estrellas.length; i++){
        estrellas[i].addEventListener('click', calificarComentario);
    };

function calificarComentario(){
    document.querySelector('#numeroRating').value = this.dataset.valor;
};
/****Manuel Delgado****/

/****Manuel Delgado****/
//lista de usuarios
// let dataUsuarios = obtenerUsuarios();


function obtenerComentarios() {
    let comentario = inputComentario.value;
    let sesionCorreo = sessionStorage.getItem('correo');
      let autor;
      let rating;
  
      for (let i = 0; i < dataUsuarios.length; i++) {
          if (dataUsuarios[i]['correo'] == sesionCorreo) {
              autor = dataUsuarios[i]['pnombre'] + ' ' + dataUsuarios[i]['papellido'];
          }
      }
    let id = actividad['_id'];
  
    let error = validar(comentario,rating);

    if(error == false){
        rating = Number(document.querySelector('#agregarRating input[type=radio]:checked').value);
        }
  
    if(error == true){
        swal({
            type: 'warning',
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el comentario, por favor revise el campo en rojo',
            confirmButtonText: 'Entendido'
          });
    } else {
        let respuesta = registrarComentario(id,autor,comentario,rating);
        if(respuesta.success == true){
            swal({
                type: 'success',
                title: 'Registro correcto',
                text: respuesta.msg,
                confirmButtonText: 'Entendido'
              }).then(function(){
                  location.reload();
              });
        } else {
            swal({
                type: 'error',
                title: 'Registro incorrecto',
                text: respuesta.msg,      
                confirmButtonText: 'Entendido'
              });
        } 
    }
  
    if(error == true){
        swal({
            type: 'warning',
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el comentario, por favor revise el campo en Rojo',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            type: 'success',
            title: 'Registro correcto',
            text: 'Puede revisar el comentario en este perfil',
        }).then(function(){
            let accion = `Comentó y calificó la actividad:  ${actividad['tituloActividad']} `;
            obtenerDatosBitacora(accion);
          location.reload();
      });
    }
  };
  
function validar(pComentario,pRating){
    let error = false;

    if(pComentario == ''){
        error = true;
        inputComentario.classList.add('error-input');
    } else {
        inputComentario.classList.remove('error-input');
    }
    //validación de Rating
    if(document.querySelector('#agregarRating input[type=radio]:checked') == null){
        error = true;
        agregarNumeroRating.classList.add('error-texto');
    } else {
        agregarNumeroRating.classList.remove('error-texto');
    }
    return error;
};

function mostrarComentarios(){
    perfilComentarios.innerHTML = '';
    //ciclo para todos los almacenados
    for(let i = 0; i < listaComentarios.length; i++){
        let autor = listaComentarios[i]['autorActividad'];
        let texto = listaComentarios[i]['textoActividad'];
        let idComentario = listaComentarios[i]['_id'];
    
        //div contenedor de cada entrada
        let divFila = document.createElement('div');
        divFila.classList.add('entrada-comentario');
        perfilComentarios.appendChild(divFila);
  
        //label de cada usuario que comentó
        let labelUsuario = document.createElement('label');
        let textoUsuario = document.createTextNode(autor);
        labelUsuario.appendChild(textoUsuario);
        divFila.appendChild(labelUsuario);
  
        //p de cada comentario hecho
        let pComentario = document.createElement('p');
        let textoComentario = document.createTextNode(texto);
        pComentario.appendChild(textoComentario);
        divFila.appendChild(pComentario);
  
        /****Manuel Delgado****/
          // Rating System
          let contenedorRating = document.createElement('div');
          contenedorRating.classList.add('contenedor-rating');
          let numberRating = document.createElement('b');
          numberRating.classList.add('rating-number');
          let valueNumberRating = listaComentarios[i]['rating'];
          numberRating.innerText = valueNumberRating;
          contenedorRating.appendChild(numberRating);
          let divRating = document.createElement('div');
          divRating.classList.add('rating');
          divRating.classList.add('nota-listada');
  
          // 5 star
          let inputRadio5 = document.createElement('input');
          inputRadio5.id = '5' + '-' + idComentario;
          inputRadio5.type = 'radio';
          inputRadio5.name = 'rating' + '-' + idComentario;
          inputRadio5.value = '5';
          inputRadio5.disabled = true;
          inputRadio5.classList.add('estrella-5');
          let labelRadio5 = document.createElement('label');
          labelRadio5.htmlFor = '5' + '-' + idComentario;
          let iRadio5 = document.createElement('i');
          iRadio5.classList.add('fas', 'fa-3x', 'fa-star');
          labelRadio5.appendChild(iRadio5);
          divRating.appendChild(inputRadio5);
          divRating.appendChild(labelRadio5);
  
          // 4 star
          let inputRadio4 = document.createElement('input');
          inputRadio4.id = '4' + '-' + idComentario;
          inputRadio4.type = 'radio';
          inputRadio4.name = 'rating' + '-' + idComentario;
          inputRadio4.value = '4';
          inputRadio4.disabled = true;
          inputRadio4.classList.add('estrella-4');
          let labelRadio4 = document.createElement('label');
          labelRadio4.htmlFor = '4' + '-' + idComentario;
          let iRadio4 = document.createElement('i');
          iRadio4.classList.add('fas', 'fa-3x', 'fa-star');
          labelRadio4.appendChild(iRadio4);
          divRating.appendChild(inputRadio4);
          divRating.appendChild(labelRadio4);
  
          // 3 star
          let inputRadio3 = document.createElement('input');
          inputRadio3.id = '3' + '-' + idComentario;
          inputRadio3.type = 'radio';
          inputRadio3.name = 'rating' + '-' + idComentario;
          inputRadio3.value = '3';
          inputRadio3.disabled = true;
          inputRadio3.classList.add('estrella-3');
          let labelRadio3 = document.createElement('label');
          labelRadio3.htmlFor = '3' + '-' + idComentario;
          let iRadio3 = document.createElement('i');
          iRadio3.classList.add('fas', 'fa-3x', 'fa-star');
          labelRadio3.appendChild(iRadio3);
          divRating.appendChild(inputRadio3);
          divRating.appendChild(labelRadio3);
  
          // 2 star
          let inputRadio2 = document.createElement('input');
          inputRadio2.id = '2' + '-' + idComentario;
          inputRadio2.type = 'radio';
          inputRadio2.name = 'rating' + '-' + idComentario;
          inputRadio2.value = '2';
          inputRadio2.disabled = true;
          inputRadio2.classList.add('estrella-2');
          let labelRadio2 = document.createElement('label');
          labelRadio2.htmlFor = '2' + '-' + idComentario;
          let iRadio2 = document.createElement('i');
          iRadio2.classList.add('fas', 'fa-3x', 'fa-star');
          labelRadio2.appendChild(iRadio2);
          divRating.appendChild(inputRadio2);
          divRating.appendChild(labelRadio2);
  
          // 1 star
          let inputRadio1 = document.createElement('input');
          inputRadio1.id = '1' + '-' + idComentario;
          inputRadio1.type = 'radio';
          inputRadio1.name = 'rating' + '-' + idComentario;
          inputRadio1.value = '1';
          inputRadio1.disabled = true;
          inputRadio1.classList.add('estrella-1');
          let labelRadio1 = document.createElement('label');
          labelRadio1.htmlFor = '1' + '-' + idComentario;
          let iRadio1 = document.createElement('i');
          iRadio1.classList.add('fas', 'fa-3x', 'fa-star');
          labelRadio1.appendChild(iRadio1);
          divRating.appendChild(inputRadio1);
          divRating.appendChild(labelRadio1);
  
          contenedorRating.appendChild(divRating);
          divFila.appendChild(contenedorRating);
          /****Manuel Delgado****/
  
        //subir botones
        if(tipoUsuario == 'Administrador'){
            let divBoton = document.createElement('div');
            divBoton.classList.add('posicion-btn');
    
            /****Manuel Delgado****/
            let botonBorrarComentario = document.createElement('button');
            botonBorrarComentario.type = 'button';
            botonBorrarComentario.classList.add('btn-dos');
            botonBorrarComentario.classList.add('btn-mini');
            let textoBtnBorrarComentario = document.createTextNode('Borrar');
            botonBorrarComentario.dataset.idComentario = listaComentarios[i]['_id'];
            botonBorrarComentario.appendChild(textoBtnBorrarComentario);
            divBoton.appendChild(botonBorrarComentario);
            divFila.appendChild(divBoton);
    
            botonBorrarComentario.addEventListener('click', confirmarBorradoComentario);
        }
  
        /****Manuel Delgado****/
          //mostrar calificación
          let star5 = inputRadio5.id;
          let calificacion5 = document.getElementById(star5);
          let star4 = inputRadio4.id;
          let calificacion4 = document.getElementById(star4);
          let star3 = inputRadio3.id;
          let calificacion3 = document.getElementById(star3);
          let star2 = inputRadio2.id;
          let calificacion2 = document.getElementById(star2);
          let star1 = inputRadio1.id;
          let calificacion1 = document.getElementById(star1);
          
          switch (valueNumberRating) {
              case 5:
              calificacion5.checked = true;
              break;
              case 4:
              calificacion4.checked = true;
              break;
              case 3:
              calificacion3.checked = true;
              break;
              case 2:
              calificacion2.checked = true;
              break;
              case 1:
              calificacion1.checked = true;
              break;
              default:
              break;    
          };
          /****Manuel Delgado****/
    };
  
  };

mostrarComentarios();

/****Manuel Delgado****/
function confirmarBorradoComentario(){
    let idActividad = actividad['_id'];
    let idComentario =  this.dataset.idComentario;
    let accion = `Eliminó un comentario de la actividad: ${actividad['tituloActividad']} `;
    swal({
      title: '¿Está seguro que desea eliminar el comentario?',
      text: "¡Este proceso no se puede revertir!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
        borrarComentario(idActividad,idComentario);
        let bitacora = obtenerDatosBitacora(accion);
        swal({
          title:'¡Borrado!',
          text:'El comentario ha sido borrado con éxito',
          type:'success'
        }).then(function(){
            location.reload();
        });
      }
    })
};

function obtenerRating(){
    let idActividad =  actividad['_id'];
    let sumaRating = 0;
    let cantidadRating = 0;
    let rating = 0;

    for(let i = 0; i < listaComentarios.length; i++){
        sumaRating = listaComentarios[i]['rating'] + sumaRating;
        cantidadRating ++;
    }

    let promedio = sumaRating / cantidadRating;
    
    if(sumaRating == 0){
        rating = 0;
    } else {
        rating = Math.round(promedio);
    }
    
    actualizarRating(idActividad,rating);

    numeroRatingPerfil.innerHTML = rating;
    let calificacion5 = document.getElementById('ratingPerfil5');
    let calificacion4 = document.getElementById('ratingPerfil4');
    let calificacion3 = document.getElementById('ratingPerfil3');
    let calificacion2 = document.getElementById('ratingPerfil2');
    let calificacion1 = document.getElementById('ratingPerfil1');
    
    switch (rating) {
        case 5:
        calificacion5.checked = true;
        break;
        case 4:
        calificacion4.checked = true;
        break;
        case 3:
        calificacion3.checked = true;
        break;
        case 2:
        calificacion2.checked = true;
        break;
        case 1:
        calificacion1.checked = true;
        break;
        default:
        break;    
    };
};
obtenerRating();
/****Manuel Delgado****/

/******************************************************/
/********** Función para registrar bitácora **********/
/****************************************************/

function obtenerDatosBitacora(paccion){
    let bitacora = false;
    let accion = paccion;
    let listaUsuarios = obtenerUsuarios();
    let sesionCorreo = sessionStorage.getItem('correo');
    let rol = tipoUsuario;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]['correo'] == sesionCorreo) {
            let nombre = listaUsuarios[i]['pnombre'];
            let respuesta = registrar_bitacora(rol, sesionCorreo, nombre, accion);
            if(respuesta.success==true){
                bitacora = true;
            }
        }
    }
    return bitacora;
};

