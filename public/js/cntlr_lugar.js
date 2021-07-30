'use strict';

const perfilImagen = document.querySelector('#imgExpandida');
const perfilTitulo = document.querySelector('#tituloPerfilLugar');
const perfilCaracteristicas = document.querySelector('#caracteristicasLugar');
const perfilDescripcion = document.querySelector('#descripcionLugar');
const perfilDireccion = document.querySelector('#direccionLugar');
const perfilComentarios = document.querySelector('#listaComentarios');
const perfilActividades = document.querySelector('#listaActividades');
const inputComentario = document.querySelector('#registrarComentario');
const botonCalificar = document.querySelector('#btnCalificar');
const numeroRatingPerfil = document.querySelector('#numeroRatingPerfil');
const agregarNumeroRating = document.querySelector('#numeroRating');
let tipoUsuario = sessionStorage.getItem('tipo_usuario');
let listaLugares = obtenerLugar();

let listaActividades = obtenerActividadesHabilitadas(); //lista de actividades

//Local Storage 
let idUnicoLugar = localStorage.getItem('lugar');
let perfilLugar = buscarLugar(idUnicoLugar);
let listaComentarios = perfilLugar['comentarios'];

let imagen = perfilLugar['imagen'];
let titulo = perfilLugar['titulo'];
let provincia = perfilLugar['provincia'];
let canton = perfilLugar['canton'];
let categoria = perfilLugar['categoria'];
let descripcion = perfilLugar['descripcion'];
let direccion = perfilLugar['direccion'];
let ratingPerfil = perfilLugar['ratingLugar'];

//variable mapa
let mapa;
let marcador;
let GPSlocation = perfilLugar['coordenadas'];
let LatLng = GPSlocation.split(",");
let Lat = parseFloat(LatLng[0]);
let Lng = parseFloat(LatLng[1]);

//acciones
const botonEditar = document.querySelector('#editarLugar');
const botonBorrar = document.querySelector('#borrarLugar');

function mostrarLugar(){

    //actualizar imagen
    if(imagen){
        perfilImagen.src = imagen;
        perfilImagen.alt = titulo;
    }else{
        perfilImagen.src = 'imgs/placeholder.png';
    }

    //actualizar titulo
    perfilTitulo.innerHTML = '';
    let textoTitulo = document.createTextNode(titulo);
    perfilTitulo.appendChild(textoTitulo);

    //actualizar características
    perfilCaracteristicas.innerHTML = '';
    let liProvincia = document.createElement('li');
    let textoProvincia = document.createTextNode(provincia + ', ' + canton);
    liProvincia.appendChild(textoProvincia);
    let liCategoria = document.createElement('li');
    let textoCategoria = document.createTextNode(categoria);
    liCategoria.appendChild(textoCategoria);
    perfilCaracteristicas.appendChild(liProvincia);
    perfilCaracteristicas.appendChild(liCategoria);

    //actualizar descripcion
    perfilDescripcion.innerHTML = '';
    let textoDescripcion = document.createTextNode(descripcion);
    perfilDescripcion.appendChild(textoDescripcion);

    //actualizar direccion
    perfilDireccion.innerHTML = '';
    let textoDireccion = document.createTextNode('Dirección exacta: ' + direccion);
    perfilDireccion.appendChild(textoDireccion);
};

function iniciarMapa() {
    let sitio = new google.maps.LatLng(Lat, Lng);
    let opcionesMapa = {
        zoom: 13,
        center: sitio
    }

    mapa = new google.maps.Map(document.getElementById("mapa"), opcionesMapa);

    marcador = new google.maps.Marker({
        position: sitio,
        draggable: false,
    });

    marcador.setMap(mapa);
}

mostrarLugar();

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

//lista de usuarios
let dataUsuarios = obtenerUsuarios();

botonCalificar.addEventListener("click", function(event){
    event.preventDefault();
    obtenerComentarios();
});

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

    let id = perfilLugar['_id'];

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
            let accion = `Comentó  y calificó el lugar:  ${titulo} `;
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
        let autor = listaComentarios[i]['autor'];
        let texto = listaComentarios[i]['texto'];
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
function listaActividadesRegistrados() {
    let listaActividadesRegistrados = [];
    let nombreLugar = perfilLugar['titulo'];
    for (let i = 0; i < listaActividades.length; i++) {
        if (listaActividades[i]['ubicacionActividad'] == nombreLugar) {
            let actRegistrada = listaActividades[i]['_id'];
            listaActividadesRegistrados.push(actRegistrada);
        }
    }
    return listaActividadesRegistrados;
};
/****Manuel Delgado****/

function mostrarActividades(){
    perfilActividades.innerHTML = '';
    let actividadesRegistradas = listaActividadesRegistrados();

    //ciclo para todos los almacenados
    if (actividadesRegistradas != 0 && actividadesRegistradas != undefined){
        for(let i = 0; i < listaActividades.length; i++){
            for(let j = 0; j < actividadesRegistradas.length; j++){
                if (actividadesRegistradas[j] == listaActividades[i]['_id']) {
                    let uniqueActivityID = listaActividades[i]['_id'];
                    let titulo = listaActividades[i]['tituloActividad'];
                    let lugar = listaActividades[i]['ubicacionActividad'];
                    let dia = listaActividades[i]['fechaActividad'];
                    let nuevoDia = new Date(dia);
                    let formatoDia = nuevoDia.toLocaleDateString();

                    let categoria = listaActividades[i]['categoriaActividad'];
                    let descripcion = listaActividades[i]['descripcionActividad'];
                    let imagen = listaActividades[i]['fotoActividad'];
                
                    //div contenedor de cada entrada
                    let divFila = document.createElement('div');
                    divFila.classList.add('entrada-actividad');

                    //div contenedor de imagen
                    let divIzquierdo = document.createElement('div');
                    divIzquierdo.classList.add('lado-izq');

                    //subir imágenes
                    let contenedorImagen = document.createElement('figure');
                    contenedorImagen.classList.add('subir-imagenes');
                    let imgLugar = document.createElement('img');
                    if(imagen){
                        imgLugar.src = imagen;
                        imgLugar.alt = titulo;
                    }else{
                        imgLugar.src = 'imgs/placeholder.png';
                        imgLugar.alt = 'Actividad';
                    }
                    contenedorImagen.appendChild(imgLugar);
                    divIzquierdo.appendChild(contenedorImagen);
                    divFila.appendChild(divIzquierdo);

                    //div contenedor de info derecho
                    let divDerecho = document.createElement('div');
                    divDerecho.classList.add('lado-der');

                    //titulo de cada actividad
                    let tituloActividad = document.createElement('h4');
                    let textoTitulo = document.createTextNode(titulo);
                    tituloActividad.appendChild(textoTitulo);
                    divDerecho.appendChild(tituloActividad);

                    //subir caracteristicas
                    let contenedorCaracteristicas = document.createElement('ul');
                    contenedorCaracteristicas.classList.add('caracteristicas-Activ');
                    let liLugar = document.createElement('li');
                    let textoLugar = document.createTextNode(lugar);
                    liLugar.appendChild(textoLugar);
                    let liCategoria = document.createElement('li');
                    let textoCategoria = document.createTextNode(categoria);
                    liCategoria.appendChild(textoCategoria);
                    let liDia = document.createElement('li');
                    let textoDia = document.createTextNode(formatoDia);
                    liDia.appendChild(textoDia);
                    contenedorCaracteristicas.appendChild(liLugar);
                    contenedorCaracteristicas.appendChild(liCategoria);
                    contenedorCaracteristicas.appendChild(liDia);
                    divDerecho.appendChild(contenedorCaracteristicas);
                    
                    divFila.appendChild(divDerecho);

                    /****Manuel Delgado****/
                    // Rating System
                    let contenedorRating = document.createElement('div');
                    contenedorRating.classList.add('contenedor-rating');
                    let numberRating = document.createElement('b');
                    numberRating.classList.add('rating-number');
                    let valueNumberRating = listaActividades[i]['ratingActividad'];
                    numberRating.innerText = valueNumberRating;
                    contenedorRating.appendChild(numberRating);
                    let divRating = document.createElement('div');
                    divRating.classList.add('rating');
                    divRating.classList.add('nota-listada');

                    // 5 star
                    let inputRadio5 = document.createElement('input');
                    inputRadio5.id = '5' + '-' + uniqueActivityID;
                    inputRadio5.type = 'radio';
                    inputRadio5.name = 'rating' + '-' + uniqueActivityID;
                    inputRadio5.value = '5';
                    inputRadio5.disabled = true;
                    inputRadio5.classList.add('estrella-5');
                    let labelRadio5 = document.createElement('label');
                    labelRadio5.htmlFor = '5' + '-' + uniqueActivityID;
                    let iRadio5 = document.createElement('i');
                    iRadio5.classList.add('fas', 'fa-3x', 'fa-star');
                    labelRadio5.appendChild(iRadio5);
                    divRating.appendChild(inputRadio5);
                    divRating.appendChild(labelRadio5);

                    // 4 star
                    let inputRadio4 = document.createElement('input');
                    inputRadio4.id = '4' + '-' + uniqueActivityID;
                    inputRadio4.type = 'radio';
                    inputRadio4.name = 'rating' + '-' + uniqueActivityID;
                    inputRadio4.value = '4';
                    inputRadio4.disabled = true;
                    inputRadio4.classList.add('estrella-4');
                    let labelRadio4 = document.createElement('label');
                    labelRadio4.htmlFor = '4' + '-' + uniqueActivityID;
                    let iRadio4 = document.createElement('i');
                    iRadio4.classList.add('fas', 'fa-3x', 'fa-star');
                    labelRadio4.appendChild(iRadio4);
                    divRating.appendChild(inputRadio4);
                    divRating.appendChild(labelRadio4);

                    // 3 star
                    let inputRadio3 = document.createElement('input');
                    inputRadio3.id = '3' + '-' + uniqueActivityID;
                    inputRadio3.type = 'radio';
                    inputRadio3.name = 'rating' + '-' + uniqueActivityID;
                    inputRadio3.value = '3';
                    inputRadio3.disabled = true;
                    inputRadio3.classList.add('estrella-3');
                    let labelRadio3 = document.createElement('label');
                    labelRadio3.htmlFor = '3' + '-' + uniqueActivityID;
                    let iRadio3 = document.createElement('i');
                    iRadio3.classList.add('fas', 'fa-3x', 'fa-star');
                    labelRadio3.appendChild(iRadio3);
                    divRating.appendChild(inputRadio3);
                    divRating.appendChild(labelRadio3);

                    // 2 star
                    let inputRadio2 = document.createElement('input');
                    inputRadio2.id = '2' + '-' + uniqueActivityID;
                    inputRadio2.type = 'radio';
                    inputRadio2.name = 'rating' + '-' + uniqueActivityID;
                    inputRadio2.value = '2';
                    inputRadio2.disabled = true;
                    inputRadio2.classList.add('estrella-2');
                    let labelRadio2 = document.createElement('label');
                    labelRadio2.htmlFor = '2' + '-' + uniqueActivityID;
                    let iRadio2 = document.createElement('i');
                    iRadio2.classList.add('fas', 'fa-3x', 'fa-star');
                    labelRadio2.appendChild(iRadio2);
                    divRating.appendChild(inputRadio2);
                    divRating.appendChild(labelRadio2);

                    // 1 star
                    let inputRadio1 = document.createElement('input');
                    inputRadio1.id = '1' + '-' + uniqueActivityID;
                    inputRadio1.type = 'radio';
                    inputRadio1.name = 'rating' + '-' + uniqueActivityID;
                    inputRadio1.value = '1';
                    inputRadio1.disabled = true;
                    inputRadio1.classList.add('estrella-1');
                    let labelRadio1 = document.createElement('label');
                    labelRadio1.htmlFor = '1' + '-' + uniqueActivityID;
                    let iRadio1 = document.createElement('i');
                    iRadio1.classList.add('fas', 'fa-3x', 'fa-star');
                    labelRadio1.appendChild(iRadio1);
                    divRating.appendChild(inputRadio1);
                    divRating.appendChild(labelRadio1);

                    contenedorRating.appendChild(divRating);
                    divFila.appendChild(contenedorRating);
                    /****Manuel Delgado****/

                    //clearfix
                    let divClear = document.createElement('div');
                    divClear.classList.add('clearfix');
                    divFila.appendChild(divClear);

                    //p de cada comentario hecho
                    let pComentario = document.createElement('p');
                    let textoComentario = document.createTextNode(descripcion);
                    pComentario.appendChild(textoComentario);
                    divFila.appendChild(pComentario);

                    perfilActividades.appendChild(divFila);

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
                }
            }
        };
    } else {
        //div contenedor de cada entrada
        let divNoRegistro = document.createElement('div');
        divNoRegistro.classList.add('entrada-sin-lugar');

        let divNoReg = document.createElement('div');
        divNoReg.classList.add('centro');

        let noRegistro = document.createElement('p');
        let textoNoRegistro = document.createTextNode('Este lugar no tiene actividades registradas');
        noRegistro.appendChild(textoNoRegistro);
        divNoReg.appendChild(noRegistro);

        divNoRegistro.appendChild(divNoReg);
        perfilActividades.appendChild(divNoRegistro);
    }
    
};

mostrarActividades();

function mostrarLugaresEdicion(){
    let idLugar =  this.dataset.idLugar;
    localStorage.setItem('lugar', idLugar );
    window.location.href = 'modificar_lugar.html';
};

function confirmarBorradoLugar(){
    let idLugar =  this.dataset.idLugar;
    let lugar = buscarLugar(idLugar);
    let accion = `Eliminó el lugar:  ${lugar['titulo']} `;
    swal({
      title: '¿Está seguro que desea eliminar el lugar?',
      text: "¡Este proceso no se puede revertir!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
        borrarLugar(idLugar);
        let bitacora = obtenerDatosBitacora(accion);
        swal({
          title:'¡Borrada!',
          text:'El lugar ha sido borrado con éxito',
          type:'success'
        }).then(function(){
            window.location.href = 'lugares.html'
        });
      }
    })
};

function confirmarBorradoComentario(){
    let idLugar = perfilLugar['_id'];
    let idComentario =  this.dataset.idComentario;
    let lugar = buscarLugar(idLugar);
    let accion = `Eliminó su comentario sobre el lugar:  ${lugar['titulo']} `;
    swal({
      title: '¿Está seguro que desea eliminar su comentario sobre "' + lugar['titulo'] + '"?',
      text: "¡Este proceso no se puede revertir!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
        borrarComentario(idLugar,idComentario);
        let bitacora = obtenerDatosBitacora(accion);
        swal({
          title:'¡Borrado!',
          text:'El comentario sobre "' + lugar['titulo'] + '" ha sido borrado con éxito',
          type:'success'
        }).then(function(){
            location.reload();
        });
      }
    })
};

/****Manuel Delgado****/
function obtenerRating(){
    let idLugar =  perfilLugar['_id'];
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
    
    actualizarRating(idLugar,rating);
    
  


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