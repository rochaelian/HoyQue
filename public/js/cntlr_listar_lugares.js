'use strict';

const listadoLugares = document.querySelector('#listaLugares');
let listaLugares = obtenerLugar();
let tipoUsuario = sessionStorage.getItem('tipo_usuario');
let idUsuario = sessionStorage.getItem('idUnico');
let dataUsuarios = obtenerUsuarios();

//Variables para filtrar
const inputFiltro = document.querySelector('#buscaInfoPrincipal');

/****Manuel Delgado****/
//variable para llamar información del usuario
let listaLugaresSeguidos;
for(let i = 0; i < dataUsuarios.length; i++){
    if(idUsuario == dataUsuarios[i]['_id']){
        listaLugaresSeguidos = dataUsuarios[i]['seguidos'];
    }
};

/****Manuel Delgado****/
function mostrarLugares(){
    listadoLugares.innerHTML = '';
    let filtro = inputFiltro.value;

    /****Manuel Delgado****/
    switch (tipoUsuario) {
        case 'Administrador':
            //ciclo para todos los almacenados
            for(let i = 0; i < listaLugares.length; i++){
                if(listaLugares[i]['titulo'].toLowerCase().includes(filtro.toLowerCase()) || listaLugares[i]['categoria'].toLowerCase().includes(filtro.toLowerCase())){
                    let imagen = listaLugares[i]['imagen'];
                    let titulo = listaLugares[i]['titulo'];
                    let provincia = listaLugares[i]['provincia'];
                    let canton = listaLugares[i]['canton'];
                    let categoria = listaLugares[i]['categoria'];
                    let descripcion = listaLugares[i]['descripcion'];
                    let idLugar = listaLugares[i]['_id'];

                    //div contenedor de cada entrada
                    let divFila = document.createElement('div');
                    divFila.classList.add('grid-uno-dos-uno');
                    listadoLugares.appendChild(divFila);

                    //div contenedor de columna 1
                    let divColumnaUna = document.createElement('div');
                    divColumnaUna.classList.add('columna');
                    
                    //subir imágenes
                    let contenedorImagen = document.createElement('figure');
                    contenedorImagen.classList.add('subir-imagenes');
                    let imgLugar = document.createElement('img');
                    if(imagen){
                        imgLugar.src = imagen;
                        imgLugar.alt = titulo;
                    }else{
                        imgLugar.src = 'imgs/placeholder.png';
                        imgLugar.alt = 'Lugar';
                    }
                    contenedorImagen.appendChild(imgLugar);
                    divColumnaUna.appendChild(contenedorImagen);

                    //agregar columna 1
                    divFila.appendChild(divColumnaUna);

                    //div contenedor de columna 2
                    let divColumnaDos = document.createElement('div');
                    divColumnaDos.classList.add('columna');
                    
                    //subir titulo
                    let contenedorTitulo = document.createElement('h3');
                    let textoTitulo = document.createTextNode(titulo);
                    contenedorTitulo.appendChild(textoTitulo);

                    //subir boton ver mas
                    let botonVerMas = document.createElement('button');
                    botonVerMas.type = 'button';
                    botonVerMas.classList.add('btn-tres');
                    let textobotonVerMas = document.createTextNode('Ver más');
                    botonVerMas.appendChild(textobotonVerMas);
                    botonVerMas.dataset.idLugar = listaLugares[i]['_id'];

                    botonVerMas.addEventListener('click', visualizarLugar); //activar la redirección

                    //subir caracteristicas
                    let contenedorCaracteristicas = document.createElement('ul');
                    contenedorCaracteristicas.classList.add('caracteristicas');
                    let liProvincia = document.createElement('li');
                    let textoProvincia = document.createTextNode(provincia + ', ' + canton);
                    liProvincia.appendChild(textoProvincia);
                    let liCategoria = document.createElement('li');
                    let textoCategoria = document.createTextNode(categoria);
                    liCategoria.appendChild(textoCategoria);
                    let liRating = document.createElement('li');

                    /****Manuel Delgado****/
                    // Rating System
                    liRating.classList.add('ratingLugar');
                    let numberRating = document.createElement('b');
                    numberRating.classList.add('rating-number');
                    let valueNumberRating = listaLugares[i]['ratingLugar'];
                    numberRating.innerText = valueNumberRating;
                    liRating.appendChild(numberRating);
                    let divRating = document.createElement('div');
                    divRating.classList.add('rating');

                    // 5 star
                    let inputRadio5 = document.createElement('input');
                    inputRadio5.id = '5' + '-' + idLugar;
                    inputRadio5.type = 'radio';
                    inputRadio5.name = 'rating' + '-' + idLugar;
                    inputRadio5.value = '5';
                    inputRadio5.disabled = true;
                    inputRadio5.classList.add('estrella-5');
                    let labelRadio5 = document.createElement('label');
                    labelRadio5.htmlFor = '5' + '-' + idLugar;
                    let iRadio5 = document.createElement('i');
                    iRadio5.classList.add('fas', 'fa-3x', 'fa-star');
                    labelRadio5.appendChild(iRadio5);
                    divRating.appendChild(inputRadio5);
                    divRating.appendChild(labelRadio5);

                    // 4 star
                    let inputRadio4 = document.createElement('input');
                    inputRadio4.id = '4' + '-' + idLugar;
                    inputRadio4.type = 'radio';
                    inputRadio4.name = 'rating' + '-' + idLugar;
                    inputRadio4.value = '4';
                    inputRadio4.disabled = true;
                    inputRadio4.classList.add('estrella-4');
                    let labelRadio4 = document.createElement('label');
                    labelRadio4.htmlFor = '4' + '-' + idLugar;
                    let iRadio4 = document.createElement('i');
                    iRadio4.classList.add('fas', 'fa-3x', 'fa-star');
                    labelRadio4.appendChild(iRadio4);
                    divRating.appendChild(inputRadio4);
                    divRating.appendChild(labelRadio4);

                    // 3 star
                    let inputRadio3 = document.createElement('input');
                    inputRadio3.id = '3' + '-' + idLugar;
                    inputRadio3.type = 'radio';
                    inputRadio3.name = 'rating' + '-' + idLugar;
                    inputRadio3.value = '3';
                    inputRadio3.disabled = true;
                    inputRadio3.classList.add('estrella-3');
                    let labelRadio3 = document.createElement('label');
                    labelRadio3.htmlFor = '3' + '-' + idLugar;
                    let iRadio3 = document.createElement('i');
                    iRadio3.classList.add('fas', 'fa-3x', 'fa-star');
                    labelRadio3.appendChild(iRadio3);
                    divRating.appendChild(inputRadio3);
                    divRating.appendChild(labelRadio3);

                    // 2 star
                    let inputRadio2 = document.createElement('input');
                    inputRadio2.id = '2' + '-' + idLugar;
                    inputRadio2.type = 'radio';
                    inputRadio2.name = 'rating' + '-' + idLugar;
                    inputRadio2.value = '2';
                    inputRadio2.disabled = true;
                    inputRadio2.classList.add('estrella-2');
                    let labelRadio2 = document.createElement('label');
                    labelRadio2.htmlFor = '2' + '-' + idLugar;
                    let iRadio2 = document.createElement('i');
                    iRadio2.classList.add('fas', 'fa-3x', 'fa-star');
                    labelRadio2.appendChild(iRadio2);
                    divRating.appendChild(inputRadio2);
                    divRating.appendChild(labelRadio2);
                
                    // 1 star
                    let inputRadio1 = document.createElement('input');
                    inputRadio1.id = '1' + '-' + idLugar;
                    inputRadio1.type = 'radio';
                    inputRadio1.name = 'rating' + '-' + idLugar;
                    inputRadio1.value = '1';
                    inputRadio1.disabled = true;
                    inputRadio1.classList.add('estrella-1');
                    let labelRadio1 = document.createElement('label');
                    labelRadio1.htmlFor = '1' + '-' + idLugar;
                    let iRadio1 = document.createElement('i');
                    iRadio1.classList.add('fas', 'fa-3x', 'fa-star');
                    labelRadio1.appendChild(iRadio1);
                    divRating.appendChild(inputRadio1);
                    divRating.appendChild(labelRadio1);

                    liRating.appendChild(divRating);
                    /****Manuel Delgado****/

                    contenedorCaracteristicas.appendChild(liProvincia);
                    contenedorCaracteristicas.appendChild(liCategoria);
                    contenedorCaracteristicas.appendChild(liRating);

                    //subir descripcion
                    let contenedorDescripcion = document.createElement('p');
                    let textoDescripcion = document.createTextNode(descripcion);
                    contenedorDescripcion.appendChild(textoDescripcion);
                
                    //agregar columna 2
                    divColumnaDos.appendChild(contenedorTitulo);
                    divColumnaDos.appendChild(botonVerMas);
                    divColumnaDos.appendChild(contenedorCaracteristicas);
                    divColumnaDos.appendChild(contenedorDescripcion);
                    divFila.appendChild(divColumnaDos);

                    //div contenedor de columna 3
                    let divColumnaTres = document.createElement('div');
                    divColumnaTres.classList.add('columna');
                    let contenedorForm = document.createElement('form');
                    
                    //subir Subtitulo
                    let contenedorSubitulo = document.createElement('h4');
                    let textoSubtitulo = document.createTextNode('Opciones');
                    contenedorSubitulo.appendChild(textoSubtitulo);
                    contenedorForm.appendChild(contenedorSubitulo);

                    /****Manuel Delgado****/
                    //Seguir
                    /*let checkSeguir = document.createElement('input');
                    checkSeguir.type = 'checkbox';
                    checkSeguir.classList.add('input-opciones');
                    let labelSeguir = document.createElement('label');
                    checkSeguir.dataset.idLugar = listaLugares[i]['_id'];
                    if(listaLugaresSeguidos == 0 || listaLugaresSeguidos == undefined){
                        checkSeguir.name = 'seguir';
                        labelSeguir.innerText = 'Seguir';
                        checkSeguir.addEventListener('click', confirmarSeguirLugar);
                    } else {
                        for(let j = 0; j < listaLugaresSeguidos.length; j++){
                            if(listaLugaresSeguidos[j]['idLugar'] == listaLugares[i]['_id']) {
                                checkSeguir.name = 'seguido';
                                checkSeguir.checked = true;
                                labelSeguir.classList.add('aprobar');
                                labelSeguir.innerText = 'Seguido';
                                checkSeguir.dataset.idLugarSeguido = listaLugaresSeguidos[j]['_id'];
                                checkSeguir.addEventListener('click', confirmarNoSeguirLugar);
                                break;
                            } else {
                                checkSeguir.name = 'seguir';
                                labelSeguir.innerText = 'Seguir';
                                checkSeguir.addEventListener('click', confirmarSeguirLugar);
                            }
                        } 
                    }
                    contenedorForm.appendChild(checkSeguir);
                    contenedorForm.appendChild(labelSeguir);*/

                    // Habilitar y Deshabilitar
                    if(listaLugares[i]['estado'] == 'Habilitado'){
                        let checkDeshabilitar = document.createElement('input');
                        checkDeshabilitar.type = 'checkbox';
                        checkDeshabilitar.name = 'inhabilitar';
                        checkDeshabilitar.classList.add('input-opciones');
                        contenedorForm.appendChild(checkDeshabilitar);
                        let labelDeshabilitar = document.createElement('label');
                        let textolabelDeshabilitar = document.createTextNode('Deshabilitar');
                        labelDeshabilitar.appendChild(textolabelDeshabilitar);
                        checkDeshabilitar.dataset.idLugar = listaLugares[i]['_id'];
                        checkDeshabilitar.addEventListener('click', confirmarDeshabilitarLugar);
                        contenedorForm.appendChild(labelDeshabilitar);
                    }else{
                        let checkHabilitar = document.createElement('input');
                        checkHabilitar.type = 'checkbox';
                        checkHabilitar.name = 'inhabilitar';
                        checkHabilitar.checked = true;
                        checkHabilitar.classList.add('input-opciones');
                        contenedorForm.appendChild(checkHabilitar);
                        let labelHabilitar = document.createElement('label');
                        labelHabilitar.classList.add('deshabilitado');
                        let textolabelHabilitar = document.createTextNode('Deshabilitado');
                        labelHabilitar.appendChild(textolabelHabilitar);
                        checkHabilitar.dataset.idLugar = listaLugares[i]['_id'];
                        checkHabilitar.addEventListener('click', confirmarHabilitarLugar);
                        contenedorForm.appendChild(labelHabilitar);
                    }

                    // Aprobar y Desaprobar
                    if(listaLugares[i]['permiso'] == 'desaprobado'){
                        let checkAprobar = document.createElement('input');
                        checkAprobar.type = 'checkbox';
                        checkAprobar.name = 'aprobar';
                        checkAprobar.classList.add('input-opciones');
                        contenedorForm.appendChild(checkAprobar);
                        let labelAprobar = document.createElement('label');
                        let textolabelAprobar = document.createTextNode('Aprobar');
                        labelAprobar.appendChild(textolabelAprobar);
                        checkAprobar.dataset.idLugar = listaLugares[i]['_id'];
                        checkAprobar.addEventListener('click', confirmarAprobarLugar);
                        contenedorForm.appendChild(labelAprobar);
                    }else{
                        let checkDesaprobar = document.createElement('input');
                        checkDesaprobar.type = 'checkbox';
                        checkDesaprobar.name = 'inhabilitar';
                        checkDesaprobar.checked = true;
                        checkDesaprobar.classList.add('input-opciones');
                        contenedorForm.appendChild(checkDesaprobar);
                        let labelDesaprobar = document.createElement('label');
                        labelDesaprobar.classList.add('aprobar');
                        let textolabelDesaprobar = document.createTextNode('Aprobado');
                        labelDesaprobar.appendChild(textolabelDesaprobar);
                        checkDesaprobar.dataset.idLugar = listaLugares[i]['_id'];
                        checkDesaprobar.addEventListener('click', confirmarDesaprobarLugar);
                        contenedorForm.appendChild(labelDesaprobar);
                    }
                    /****Manuel Delgado****/
                    
                    //subir botones
                    let botonEditar = document.createElement('button');
                    botonEditar.type = 'button';
                    botonEditar.classList.add('btn-uno');
                    let textoBtnEditar = document.createTextNode('Editar');
                    botonEditar.dataset.idLugar = listaLugares[i]['_id'];
                    botonEditar.appendChild(textoBtnEditar);
                    contenedorForm.appendChild(botonEditar);

                    botonEditar.addEventListener('click', mostrarLugaresEdicion);

                    let botonBorrar = document.createElement('button');
                    botonBorrar.type = 'button';
                    botonBorrar.classList.add('btn-dos');
                    let textoBtnBorrar = document.createTextNode('Borrar');
                    botonBorrar.dataset.idLugar = listaLugares[i]['_id'];
                    botonBorrar.appendChild(textoBtnBorrar);
                    contenedorForm.appendChild(botonBorrar);

                    botonBorrar.addEventListener('click', confirmarBorradoLugar);

                    //agregar columna 3
                    divColumnaTres.appendChild(contenedorForm);
                    divFila.appendChild(divColumnaTres);

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
        break;
        case 'Cliente':
            //ciclo para todos los almacenados
            for(let i = 0; i < listaLugares.length; i++){
                if(listaLugares[i]['titulo'].toLowerCase().includes(filtro.toLowerCase()) || listaLugares[i]['categoria'].toLowerCase().includes(filtro.toLowerCase())){
                    if(listaLugares[i]['permiso'] == 'aprobado' && listaLugares[i]['estado'] == 'Habilitado'){
                        let imagen = listaLugares[i]['imagen'];
                        let titulo = listaLugares[i]['titulo'];
                        let provincia = listaLugares[i]['provincia'];
                        let canton = listaLugares[i]['canton'];
                        let categoria = listaLugares[i]['categoria'];
                        let descripcion = listaLugares[i]['descripcion'];
                        let idLugar = listaLugares[i]['_id'];

                        //div contenedor de cada entrada
                        let divFila = document.createElement('div');
                        divFila.classList.add('grid-uno-dos-uno');
                        listadoLugares.appendChild(divFila);

                        //div contenedor de columna 1
                        let divColumnaUna = document.createElement('div');
                        divColumnaUna.classList.add('columna');
                        
                        //subir imágenes
                        let contenedorImagen = document.createElement('figure');
                        contenedorImagen.classList.add('subir-imagenes');
                        let imgLugar = document.createElement('img');
                        if(imagen){
                            imgLugar.src = imagen;
                            imgLugar.alt = titulo;
                        }else{
                            imgLugar.src = 'imgs/placeholder.png';
                            imgLugar.alt = 'Lugar';
                        }
                        contenedorImagen.appendChild(imgLugar);
                        divColumnaUna.appendChild(contenedorImagen);

                        //agregar columna 1
                        divFila.appendChild(divColumnaUna);

                        //div contenedor de columna 2
                        let divColumnaDos = document.createElement('div');
                        divColumnaDos.classList.add('columna');
                        
                        //subir titulo
                        let contenedorTitulo = document.createElement('h3');
                        let textoTitulo = document.createTextNode(titulo);
                        contenedorTitulo.appendChild(textoTitulo);

                        //subir boton ver mas
                        let botonVerMas = document.createElement('button');
                        botonVerMas.type = 'button';
                        botonVerMas.classList.add('btn-tres');
                        let textobotonVerMas = document.createTextNode('Ver más');
                        botonVerMas.appendChild(textobotonVerMas);
                        botonVerMas.dataset.idLugar = listaLugares[i]['_id'];

                        botonVerMas.addEventListener('click', visualizarLugar); //activar la redirección

                        //subir caracteristicas
                        let contenedorCaracteristicas = document.createElement('ul');
                        contenedorCaracteristicas.classList.add('caracteristicas');
                        let liProvincia = document.createElement('li');
                        let textoProvincia = document.createTextNode(provincia + ', ' + canton);
                        liProvincia.appendChild(textoProvincia);
                        let liCategoria = document.createElement('li');
                        let textoCategoria = document.createTextNode(categoria);
                        liCategoria.appendChild(textoCategoria);
                        let liRating = document.createElement('li');

                        /****Manuel Delgado****/
                        // Rating System
                        liRating.classList.add('ratingLugar');
                        let numberRating = document.createElement('b');
                        numberRating.classList.add('rating-number');
                        let valueNumberRating = listaLugares[i]['ratingLugar'];
                        numberRating.innerText = valueNumberRating;
                        liRating.appendChild(numberRating);
                        let divRating = document.createElement('div');
                        divRating.classList.add('rating');

                        // 5 star
                        let inputRadio5 = document.createElement('input');
                        inputRadio5.id = '5' + '-' + idLugar;
                        inputRadio5.type = 'radio';
                        inputRadio5.name = 'rating' + '-' + idLugar;
                        inputRadio5.value = '5';
                        inputRadio5.disabled = true;
                        inputRadio5.classList.add('estrella-5');
                        let labelRadio5 = document.createElement('label');
                        labelRadio5.htmlFor = '5' + '-' + idLugar;
                        let iRadio5 = document.createElement('i');
                        iRadio5.classList.add('fas', 'fa-3x', 'fa-star');
                        labelRadio5.appendChild(iRadio5);
                        divRating.appendChild(inputRadio5);
                        divRating.appendChild(labelRadio5);

                        // 4 star
                        let inputRadio4 = document.createElement('input');
                        inputRadio4.id = '4' + '-' + idLugar;
                        inputRadio4.type = 'radio';
                        inputRadio4.name = 'rating' + '-' + idLugar;
                        inputRadio4.value = '4';
                        inputRadio4.disabled = true;
                        inputRadio4.classList.add('estrella-4');
                        let labelRadio4 = document.createElement('label');
                        labelRadio4.htmlFor = '4' + '-' + idLugar;
                        let iRadio4 = document.createElement('i');
                        iRadio4.classList.add('fas', 'fa-3x', 'fa-star');
                        labelRadio4.appendChild(iRadio4);
                        divRating.appendChild(inputRadio4);
                        divRating.appendChild(labelRadio4);

                        // 3 star
                        let inputRadio3 = document.createElement('input');
                        inputRadio3.id = '3' + '-' + idLugar;
                        inputRadio3.type = 'radio';
                        inputRadio3.name = 'rating' + '-' + idLugar;
                        inputRadio3.value = '3';
                        inputRadio3.disabled = true;
                        inputRadio3.classList.add('estrella-3');
                        let labelRadio3 = document.createElement('label');
                        labelRadio3.htmlFor = '3' + '-' + idLugar;
                        let iRadio3 = document.createElement('i');
                        iRadio3.classList.add('fas', 'fa-3x', 'fa-star');
                        labelRadio3.appendChild(iRadio3);
                        divRating.appendChild(inputRadio3);
                        divRating.appendChild(labelRadio3);

                        // 2 star
                        let inputRadio2 = document.createElement('input');
                        inputRadio2.id = '2' + '-' + idLugar;
                        inputRadio2.type = 'radio';
                        inputRadio2.name = 'rating' + '-' + idLugar;
                        inputRadio2.value = '2';
                        inputRadio2.disabled = true;
                        inputRadio2.classList.add('estrella-2');
                        let labelRadio2 = document.createElement('label');
                        labelRadio2.htmlFor = '2' + '-' + idLugar;
                        let iRadio2 = document.createElement('i');
                        iRadio2.classList.add('fas', 'fa-3x', 'fa-star');
                        labelRadio2.appendChild(iRadio2);
                        divRating.appendChild(inputRadio2);
                        divRating.appendChild(labelRadio2);
                    
                        // 1 star
                        let inputRadio1 = document.createElement('input');
                        inputRadio1.id = '1' + '-' + idLugar;
                        inputRadio1.type = 'radio';
                        inputRadio1.name = 'rating' + '-' + idLugar;
                        inputRadio1.value = '1';
                        inputRadio1.disabled = true;
                        inputRadio1.classList.add('estrella-1');
                        let labelRadio1 = document.createElement('label');
                        labelRadio1.htmlFor = '1' + '-' + idLugar;
                        let iRadio1 = document.createElement('i');
                        iRadio1.classList.add('fas', 'fa-3x', 'fa-star');
                        labelRadio1.appendChild(iRadio1);
                        divRating.appendChild(inputRadio1);
                        divRating.appendChild(labelRadio1);

                        liRating.appendChild(divRating);
                        /****Manuel Delgado****/

                        contenedorCaracteristicas.appendChild(liProvincia);
                        contenedorCaracteristicas.appendChild(liCategoria);
                        contenedorCaracteristicas.appendChild(liRating);

                        //subir descripcion
                        let contenedorDescripcion = document.createElement('p');
                        let textoDescripcion = document.createTextNode(descripcion);
                        contenedorDescripcion.appendChild(textoDescripcion);
                    
                        //agregar columna 2
                        divColumnaDos.appendChild(contenedorTitulo);
                        divColumnaDos.appendChild(botonVerMas);
                        divColumnaDos.appendChild(contenedorCaracteristicas);
                        divColumnaDos.appendChild(contenedorDescripcion);
                        divFila.appendChild(divColumnaDos);

                        //div contenedor de columna 3
                        let divColumnaTres = document.createElement('div');
                        divColumnaTres.classList.add('columna');
                        let contenedorForm = document.createElement('form');
                        
                        //subir Subtitulo
                        let contenedorSubitulo = document.createElement('h4');
                        let textoSubtitulo = document.createTextNode('Opciones');
                        contenedorSubitulo.appendChild(textoSubtitulo);
                        contenedorForm.appendChild(contenedorSubitulo);

                        /****Manuel Delgado****/
                        //Seguir
                        let checkSeguir = document.createElement('input');
                        checkSeguir.type = 'checkbox';
                        checkSeguir.classList.add('input-opciones');
                        let labelSeguir = document.createElement('label');
                        checkSeguir.dataset.idLugar = listaLugares[i]['_id'];
                        if(listaLugaresSeguidos == 0 || listaLugaresSeguidos == undefined){
                            checkSeguir.name = 'seguir';
                            labelSeguir.innerText = 'Seguir';
                            checkSeguir.addEventListener('click', confirmarSeguirLugar);
                        } else {
                            for(let j = 0; j < listaLugaresSeguidos.length; j++){
                                if(listaLugaresSeguidos[j]['idLugar'] == listaLugares[i]['_id']) {
                                    checkSeguir.name = 'seguido';
                                    checkSeguir.checked = true;
                                    labelSeguir.classList.add('aprobar');
                                    labelSeguir.innerText = 'Seguido';
                                    checkSeguir.dataset.idLugarSeguido = listaLugaresSeguidos[j]['_id'];
                                    checkSeguir.addEventListener('click', confirmarNoSeguirLugar);
                                    break;
                                } else {
                                    checkSeguir.name = 'seguir';
                                    labelSeguir.innerText = 'Seguir';
                                    checkSeguir.addEventListener('click', confirmarSeguirLugar);
                                }
                            } 
                        }
                        contenedorForm.appendChild(checkSeguir);
                        contenedorForm.appendChild(labelSeguir);

                        // Habilitar y Deshabilitar
                        /*if(listaLugares[i]['estado'] == 'Habilitado'){
                            let checkDeshabilitar = document.createElement('input');
                            checkDeshabilitar.type = 'checkbox';
                            checkDeshabilitar.name = 'inhabilitar';
                            checkDeshabilitar.classList.add('input-opciones');
                            contenedorForm.appendChild(checkDeshabilitar);
                            let labelDeshabilitar = document.createElement('label');
                            let textolabelDeshabilitar = document.createTextNode('Deshabilitar');
                            labelDeshabilitar.appendChild(textolabelDeshabilitar);
                            checkDeshabilitar.dataset.idLugar = listaLugares[i]['_id'];
                            checkDeshabilitar.addEventListener('click', confirmarDeshabilitarLugar);
                            contenedorForm.appendChild(labelDeshabilitar);
                        }else{
                            let checkHabilitar = document.createElement('input');
                            checkHabilitar.type = 'checkbox';
                            checkHabilitar.name = 'inhabilitar';
                            checkHabilitar.checked = true;
                            checkHabilitar.classList.add('input-opciones');
                            contenedorForm.appendChild(checkHabilitar);
                            let labelHabilitar = document.createElement('label');
                            labelHabilitar.classList.add('deshabilitado');
                            let textolabelHabilitar = document.createTextNode('Deshabilitado');
                            labelHabilitar.appendChild(textolabelHabilitar);
                            checkHabilitar.dataset.idLugar = listaLugares[i]['_id'];
                            checkHabilitar.addEventListener('click', confirmarHabilitarLugar);
                            contenedorForm.appendChild(labelHabilitar);
                        }

                        // Aprobar y Desaprobar
                        if(listaLugares[i]['permiso'] == 'desaprobado'){
                            let checkAprobar = document.createElement('input');
                            checkAprobar.type = 'checkbox';
                            checkAprobar.name = 'aprobar';
                            checkAprobar.classList.add('input-opciones');
                            contenedorForm.appendChild(checkAprobar);
                            let labelAprobar = document.createElement('label');
                            let textolabelAprobar = document.createTextNode('Aprobar');
                            labelAprobar.appendChild(textolabelAprobar);
                            checkAprobar.dataset.idLugar = listaLugares[i]['_id'];
                            checkAprobar.addEventListener('click', confirmarAprobarLugar);
                            contenedorForm.appendChild(labelAprobar);
                        }else{
                            let checkDesaprobar = document.createElement('input');
                            checkDesaprobar.type = 'checkbox';
                            checkDesaprobar.name = 'inhabilitar';
                            checkDesaprobar.checked = true;
                            checkDesaprobar.classList.add('input-opciones');
                            contenedorForm.appendChild(checkDesaprobar);
                            let labelDesaprobar = document.createElement('label');
                            labelDesaprobar.classList.add('aprobar');
                            let textolabelDesaprobar = document.createTextNode('Aprobado');
                            labelDesaprobar.appendChild(textolabelDesaprobar);
                            checkDesaprobar.dataset.idLugar = listaLugares[i]['_id'];
                            checkDesaprobar.addEventListener('click', confirmarDesaprobarLugar);
                            contenedorForm.appendChild(labelDesaprobar);
                        }*/
                        /****Manuel Delgado****/
                        
                        //subir botones
                        /*let botonEditar = document.createElement('button');
                        botonEditar.type = 'button';
                        botonEditar.classList.add('btn-uno');
                        let textoBtnEditar = document.createTextNode('Editar');
                        botonEditar.dataset.idLugar = listaLugares[i]['_id'];
                        botonEditar.appendChild(textoBtnEditar);
                        contenedorForm.appendChild(botonEditar);

                        botonEditar.addEventListener('click', mostrarLugaresEdicion);

                        let botonBorrar = document.createElement('button');
                        botonBorrar.type = 'button';
                        botonBorrar.classList.add('btn-dos');
                        let textoBtnBorrar = document.createTextNode('Borrar');
                        botonBorrar.dataset.idLugar = listaLugares[i]['_id'];
                        botonBorrar.appendChild(textoBtnBorrar);
                        contenedorForm.appendChild(botonBorrar);

                        botonBorrar.addEventListener('click', confirmarBorradoLugar);*/

                        //agregar columna 3
                        divColumnaTres.appendChild(contenedorForm);
                        divFila.appendChild(divColumnaTres);

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
            };
        break;
        case 'Empresa':
            //ciclo para todos los almacenados
            for(let i = 0; i < listaLugares.length; i++){
                if(listaLugares[i]['titulo'].toLowerCase().includes(filtro.toLowerCase()) || listaLugares[i]['categoria'].toLowerCase().includes(filtro.toLowerCase())){
                    if(listaLugares[i]['permiso'] == 'aprobado'){
                        let imagen = listaLugares[i]['imagen'];
                        let titulo = listaLugares[i]['titulo'];
                        let provincia = listaLugares[i]['provincia'];
                        let canton = listaLugares[i]['canton'];
                        let categoria = listaLugares[i]['categoria'];
                        let descripcion = listaLugares[i]['descripcion'];
                        let idLugar = listaLugares[i]['_id'];

                        //div contenedor de cada entrada
                        let divFila = document.createElement('div');
                        divFila.classList.add('grid-uno-dos-uno');
                        listadoLugares.appendChild(divFila);

                        //div contenedor de columna 1
                        let divColumnaUna = document.createElement('div');
                        divColumnaUna.classList.add('columna');
                        
                        //subir imágenes
                        let contenedorImagen = document.createElement('figure');
                        contenedorImagen.classList.add('subir-imagenes');
                        let imgLugar = document.createElement('img');
                        if(imagen){
                            imgLugar.src = imagen;
                            imgLugar.alt = titulo;
                        }else{
                            imgLugar.src = 'imgs/placeholder.png';
                            imgLugar.alt = 'Lugar';
                        }
                        contenedorImagen.appendChild(imgLugar);
                        divColumnaUna.appendChild(contenedorImagen);

                        //agregar columna 1
                        divFila.appendChild(divColumnaUna);

                        //div contenedor de columna 2
                        let divColumnaDos = document.createElement('div');
                        divColumnaDos.classList.add('columna');
                        
                        //subir titulo
                        let contenedorTitulo = document.createElement('h3');
                        let textoTitulo = document.createTextNode(titulo);
                        contenedorTitulo.appendChild(textoTitulo);

                        //subir boton ver mas
                        let botonVerMas = document.createElement('button');
                        botonVerMas.type = 'button';
                        botonVerMas.classList.add('btn-tres');
                        let textobotonVerMas = document.createTextNode('Ver más');
                        botonVerMas.appendChild(textobotonVerMas);
                        botonVerMas.dataset.idLugar = listaLugares[i]['_id'];

                        botonVerMas.addEventListener('click', visualizarLugar); //activar la redirección

                        //subir caracteristicas
                        let contenedorCaracteristicas = document.createElement('ul');
                        contenedorCaracteristicas.classList.add('caracteristicas');
                        let liProvincia = document.createElement('li');
                        let textoProvincia = document.createTextNode(provincia + ', ' + canton);
                        liProvincia.appendChild(textoProvincia);
                        let liCategoria = document.createElement('li');
                        let textoCategoria = document.createTextNode(categoria);
                        liCategoria.appendChild(textoCategoria);
                        let liRating = document.createElement('li');

                        /****Manuel Delgado****/
                        // Rating System
                        liRating.classList.add('ratingLugar');
                        let numberRating = document.createElement('b');
                        numberRating.classList.add('rating-number');
                        let valueNumberRating = listaLugares[i]['ratingLugar'];
                        numberRating.innerText = valueNumberRating;
                        liRating.appendChild(numberRating);
                        let divRating = document.createElement('div');
                        divRating.classList.add('rating');

                        // 5 star
                        let inputRadio5 = document.createElement('input');
                        inputRadio5.id = '5' + '-' + idLugar;
                        inputRadio5.type = 'radio';
                        inputRadio5.name = 'rating' + '-' + idLugar;
                        inputRadio5.value = '5';
                        inputRadio5.disabled = true;
                        inputRadio5.classList.add('estrella-5');
                        let labelRadio5 = document.createElement('label');
                        labelRadio5.htmlFor = '5' + '-' + idLugar;
                        let iRadio5 = document.createElement('i');
                        iRadio5.classList.add('fas', 'fa-3x', 'fa-star');
                        labelRadio5.appendChild(iRadio5);
                        divRating.appendChild(inputRadio5);
                        divRating.appendChild(labelRadio5);

                        // 4 star
                        let inputRadio4 = document.createElement('input');
                        inputRadio4.id = '4' + '-' + idLugar;
                        inputRadio4.type = 'radio';
                        inputRadio4.name = 'rating' + '-' + idLugar;
                        inputRadio4.value = '4';
                        inputRadio4.disabled = true;
                        inputRadio4.classList.add('estrella-4');
                        let labelRadio4 = document.createElement('label');
                        labelRadio4.htmlFor = '4' + '-' + idLugar;
                        let iRadio4 = document.createElement('i');
                        iRadio4.classList.add('fas', 'fa-3x', 'fa-star');
                        labelRadio4.appendChild(iRadio4);
                        divRating.appendChild(inputRadio4);
                        divRating.appendChild(labelRadio4);

                        // 3 star
                        let inputRadio3 = document.createElement('input');
                        inputRadio3.id = '3' + '-' + idLugar;
                        inputRadio3.type = 'radio';
                        inputRadio3.name = 'rating' + '-' + idLugar;
                        inputRadio3.value = '3';
                        inputRadio3.disabled = true;
                        inputRadio3.classList.add('estrella-3');
                        let labelRadio3 = document.createElement('label');
                        labelRadio3.htmlFor = '3' + '-' + idLugar;
                        let iRadio3 = document.createElement('i');
                        iRadio3.classList.add('fas', 'fa-3x', 'fa-star');
                        labelRadio3.appendChild(iRadio3);
                        divRating.appendChild(inputRadio3);
                        divRating.appendChild(labelRadio3);

                        // 2 star
                        let inputRadio2 = document.createElement('input');
                        inputRadio2.id = '2' + '-' + idLugar;
                        inputRadio2.type = 'radio';
                        inputRadio2.name = 'rating' + '-' + idLugar;
                        inputRadio2.value = '2';
                        inputRadio2.disabled = true;
                        inputRadio2.classList.add('estrella-2');
                        let labelRadio2 = document.createElement('label');
                        labelRadio2.htmlFor = '2' + '-' + idLugar;
                        let iRadio2 = document.createElement('i');
                        iRadio2.classList.add('fas', 'fa-3x', 'fa-star');
                        labelRadio2.appendChild(iRadio2);
                        divRating.appendChild(inputRadio2);
                        divRating.appendChild(labelRadio2);
                    
                        // 1 star
                        let inputRadio1 = document.createElement('input');
                        inputRadio1.id = '1' + '-' + idLugar;
                        inputRadio1.type = 'radio';
                        inputRadio1.name = 'rating' + '-' + idLugar;
                        inputRadio1.value = '1';
                        inputRadio1.disabled = true;
                        inputRadio1.classList.add('estrella-1');
                        let labelRadio1 = document.createElement('label');
                        labelRadio1.htmlFor = '1' + '-' + idLugar;
                        let iRadio1 = document.createElement('i');
                        iRadio1.classList.add('fas', 'fa-3x', 'fa-star');
                        labelRadio1.appendChild(iRadio1);
                        divRating.appendChild(inputRadio1);
                        divRating.appendChild(labelRadio1);

                        liRating.appendChild(divRating);
                        /****Manuel Delgado****/

                        contenedorCaracteristicas.appendChild(liProvincia);
                        contenedorCaracteristicas.appendChild(liCategoria);
                        contenedorCaracteristicas.appendChild(liRating);

                        //subir descripcion
                        let contenedorDescripcion = document.createElement('p');
                        let textoDescripcion = document.createTextNode(descripcion);
                        contenedorDescripcion.appendChild(textoDescripcion);
                    
                        //agregar columna 2
                        divColumnaDos.appendChild(contenedorTitulo);
                        divColumnaDos.appendChild(botonVerMas);
                        divColumnaDos.appendChild(contenedorCaracteristicas);
                        divColumnaDos.appendChild(contenedorDescripcion);
                        divFila.appendChild(divColumnaDos);

                        //div contenedor de columna 3
                        let divColumnaTres = document.createElement('div');
                        divColumnaTres.classList.add('columna');
                        let contenedorForm = document.createElement('form');
                        
                        //subir Subtitulo
                        let contenedorSubitulo = document.createElement('h4');
                        let textoSubtitulo = document.createTextNode('Opciones');
                        contenedorSubitulo.appendChild(textoSubtitulo);
                        contenedorForm.appendChild(contenedorSubitulo);

                        /****Manuel Delgado****/
                        //Seguir
                        /*let checkSeguir = document.createElement('input');
                        checkSeguir.type = 'checkbox';
                        checkSeguir.classList.add('input-opciones');
                        let labelSeguir = document.createElement('label');
                        checkSeguir.dataset.idLugar = listaLugares[i]['_id'];
                        if(listaLugaresSeguidos == 0 || listaLugaresSeguidos == undefined){
                            checkSeguir.name = 'seguir';
                            labelSeguir.innerText = 'Seguir';
                            checkSeguir.addEventListener('click', confirmarSeguirLugar);
                        } else {
                            for(let j = 0; j < listaLugaresSeguidos.length; j++){
                                if(listaLugaresSeguidos[j]['idLugar'] == listaLugares[i]['_id']) {
                                    checkSeguir.name = 'seguido';
                                    checkSeguir.checked = true;
                                    labelSeguir.classList.add('aprobar');
                                    labelSeguir.innerText = 'Seguido';
                                    checkSeguir.dataset.idLugarSeguido = listaLugaresSeguidos[j]['_id'];
                                    checkSeguir.addEventListener('click', confirmarNoSeguirLugar);
                                    break;
                                } else {
                                    checkSeguir.name = 'seguir';
                                    labelSeguir.innerText = 'Seguir';
                                    checkSeguir.addEventListener('click', confirmarSeguirLugar);
                                }
                            } 
                        }
                        contenedorForm.appendChild(checkSeguir);
                        contenedorForm.appendChild(labelSeguir);*/

                        // Habilitar y Deshabilitar
                        if(listaLugares[i]['estado'] == 'Habilitado'){
                            let checkDeshabilitar = document.createElement('input');
                            checkDeshabilitar.type = 'checkbox';
                            checkDeshabilitar.name = 'inhabilitar';
                            checkDeshabilitar.classList.add('input-opciones');
                            contenedorForm.appendChild(checkDeshabilitar);
                            let labelDeshabilitar = document.createElement('label');
                            let textolabelDeshabilitar = document.createTextNode('Deshabilitar');
                            labelDeshabilitar.appendChild(textolabelDeshabilitar);
                            checkDeshabilitar.dataset.idLugar = listaLugares[i]['_id'];
                            checkDeshabilitar.addEventListener('click', confirmarDeshabilitarLugar);
                            contenedorForm.appendChild(labelDeshabilitar);
                        }else{
                            let checkHabilitar = document.createElement('input');
                            checkHabilitar.type = 'checkbox';
                            checkHabilitar.name = 'inhabilitar';
                            checkHabilitar.checked = true;
                            checkHabilitar.classList.add('input-opciones');
                            contenedorForm.appendChild(checkHabilitar);
                            let labelHabilitar = document.createElement('label');
                            labelHabilitar.classList.add('deshabilitado');
                            let textolabelHabilitar = document.createTextNode('Deshabilitado');
                            labelHabilitar.appendChild(textolabelHabilitar);
                            checkHabilitar.dataset.idLugar = listaLugares[i]['_id'];
                            checkHabilitar.addEventListener('click', confirmarHabilitarLugar);
                            contenedorForm.appendChild(labelHabilitar);
                        }

                        // Aprobar y Desaprobar
                        /*if(listaLugares[i]['permiso'] == 'desaprobado'){
                            let checkAprobar = document.createElement('input');
                            checkAprobar.type = 'checkbox';
                            checkAprobar.name = 'aprobar';
                            checkAprobar.classList.add('input-opciones');
                            contenedorForm.appendChild(checkAprobar);
                            let labelAprobar = document.createElement('label');
                            let textolabelAprobar = document.createTextNode('Aprobar');
                            labelAprobar.appendChild(textolabelAprobar);
                            checkAprobar.dataset.idLugar = listaLugares[i]['_id'];
                            checkAprobar.addEventListener('click', confirmarAprobarLugar);
                            contenedorForm.appendChild(labelAprobar);
                        }else{
                            let checkDesaprobar = document.createElement('input');
                            checkDesaprobar.type = 'checkbox';
                            checkDesaprobar.name = 'inhabilitar';
                            checkDesaprobar.checked = true;
                            checkDesaprobar.classList.add('input-opciones');
                            contenedorForm.appendChild(checkDesaprobar);
                            let labelDesaprobar = document.createElement('label');
                            labelDesaprobar.classList.add('aprobar');
                            let textolabelDesaprobar = document.createTextNode('Aprobado');
                            labelDesaprobar.appendChild(textolabelDesaprobar);
                            checkDesaprobar.dataset.idLugar = listaLugares[i]['_id'];
                            checkDesaprobar.addEventListener('click', confirmarDesaprobarLugar);
                            contenedorForm.appendChild(labelDesaprobar);
                        }*/
                        /****Manuel Delgado****/
                        
                        //subir botones
                        let botonEditar = document.createElement('button');
                        botonEditar.type = 'button';
                        botonEditar.classList.add('btn-uno');
                        let textoBtnEditar = document.createTextNode('Editar');
                        botonEditar.dataset.idLugar = listaLugares[i]['_id'];
                        botonEditar.appendChild(textoBtnEditar);
                        contenedorForm.appendChild(botonEditar);

                        botonEditar.addEventListener('click', mostrarLugaresEdicion);

                        let botonBorrar = document.createElement('button');
                        botonBorrar.type = 'button';
                        botonBorrar.classList.add('btn-dos');
                        let textoBtnBorrar = document.createTextNode('Borrar');
                        botonBorrar.dataset.idLugar = listaLugares[i]['_id'];
                        botonBorrar.appendChild(textoBtnBorrar);
                        contenedorForm.appendChild(botonBorrar);

                        botonBorrar.addEventListener('click', confirmarBorradoLugar);

                        //agregar columna 3
                        divColumnaTres.appendChild(contenedorForm);
                        divFila.appendChild(divColumnaTres);

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
            };
        break;
        default:
        break;    
    };
    /****Manuel Delgado****/
};

mostrarLugares();

inputFiltro.addEventListener('keyup', mostrarLugares);

function visualizarLugar(){
    let idLugar =  this.dataset.idLugar;
    localStorage.setItem('lugar', idLugar );
    window.location.href = 'lugar.html';
};

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
      title: '¿Está seguro que desea eliminar el lugar "' + lugar['titulo'] + '"?',
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
        listaLugares = obtenerLugar();
        mostrarLugares();
        swal({
          title:'¡Borrado!',
          text:'El lugar "' + lugar['titulo'] + '" ha sido borrado con éxito',
          type:'success'
        })
      }
    })
};

function confirmarDeshabilitarLugar(){
    let idLugar =  this.dataset.idLugar;
    let lugar = buscarLugar(idLugar);
    let accion = `Deshabilitó el lugar:  ${lugar['titulo']} `;
    deshabilitarLugar(idLugar);
    let bitacora = obtenerDatosBitacora(accion);
    listaLugares = obtenerLugar();
    mostrarLugares();
};
function confirmarHabilitarLugar(){
    let idLugar =  this.dataset.idLugar;
    let lugar = buscarLugar(idLugar);
    let accion = `Habilitó el lugar:  ${lugar['titulo']} `;
    habilitarLugar(idLugar);
    let bitacora = obtenerDatosBitacora(accion);
    listaLugares = obtenerLugar();
    mostrarLugares();
};

function confirmarAprobarLugar(){
    let idLugar =  this.dataset.idLugar;
    let lugar = buscarLugar(idLugar);
    let accion = `Aprobó el lugar:  ${lugar['titulo']} `;
    aprobarLugar(idLugar);
    let bitacora = obtenerDatosBitacora(accion);
    listaLugares = obtenerLugar();
    mostrarLugares();
};
function confirmarDesaprobarLugar(){
    let idLugar =  this.dataset.idLugar;
    let lugar = buscarLugar(idLugar);
    let accion = `Desaprobó el lugar:  ${lugar['titulo']} `;
    desaprobarLugar(idLugar);
    let bitacora = obtenerDatosBitacora(accion);
    listaLugares = obtenerLugar();
    mostrarLugares();
};

/****Manuel Delgado****/
function confirmarSeguirLugar() {
    let idLugar = this.dataset.idLugar;
    let nombreLugar;
    for (let i = 0; i < listaLugares.length; i++) {
      if (listaLugares[i]['_id'] == idLugar) {
        nombreLugar = listaLugares[i]['titulo']
      }
    }
    seguirLugares(idUsuario, idLugar, nombreLugar);
    let accion = `Siguió el lugar:  "${nombreLugar}" `;
    let bitacora = obtenerDatosBitacora(accion);
    listaLugares = obtenerLugar();
    mostrarLugares();
    location.reload();
  };
  
  function confirmarNoSeguirLugar() {
    let idLugarSeguido = this.dataset.idLugarSeguido;
    let nombreLugar;
    swal({
      title: '¿Está seguro que desea dejar de seguir este lugar?',
      text: 'Si cambia su opinión igual puede volver a seguir el lugar',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
        noSeguirLugares(idUsuario, idLugarSeguido);
        let accion = `Dejó de seguir el lugar:  "${nombreLugar}" `;
        let bitacora = obtenerDatosBitacora(accion);
        listaLugares = obtenerLugar();
        mostrarLugares();
        swal({
            title:'¡Ya no sigue el lugar!',
            text:'Se dejó de seguir el lugar con éxito',
            type:'success'
        }).then(function(){
            location.reload();
        });
      }
    })
  };

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