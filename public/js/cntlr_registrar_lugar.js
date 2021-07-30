'use strict';

const botonRegistrar = document.querySelector('#btnRegistrar');

const inputProvincia = document.querySelector('#registrarProvincia');
const inputCanton = document.querySelector('#registrarCanton');
const inputDistrito = document.querySelector('#registrarDistrito');
const inputRegTitulo = document.querySelector('#registrarTitulo');
const inputRegDescripcion = document.querySelector('#registrarDescripcion');
const inputRegDireccion = document.querySelector('#registrarDireccion');
const inputCategorias = document.querySelector('#registrarCategoria');
const inputCoordenadas = document.querySelector('#registrarCoordenadas');
const inputmapa = document.querySelector('#mapa');
const inputImagen = document.querySelector('#registrarImagen');
let tipoUsuario = sessionStorage.getItem('tipo_usuario');

//variables datalist
const provincias = document.querySelector('#provincia');
const cantones = document.querySelector('#canton');
const distritos = document.querySelector('#distrito');
const categorias = document.querySelector('#categorias');
//variables para datalist ids
let idProvincia = 0;
let idCanton = 0;

let dataProvincias = obtenerProvincias();
let dataCantones = obtenerCantones();
let dataDistritos = obtenerDistritos();
let dataCategorias = obtenerCategorias();

//variable mapa
let coordenadas = {};
let marcador;

//id empresa que registra
let idEmpresa = sessionStorage.getItem('id_usuario');

botonRegistrar.addEventListener('click', obtenerDatos);

function obtenerDatos(){
    let provincia = inputProvincia.value;
    let canton = inputCanton.value;    
    let distrito = inputDistrito.value;
    let titulo = inputRegTitulo.value;
    let descripcion = inputRegDescripcion.value;    
    let direccion = inputRegDireccion.value;
    let categoria = inputCategorias.value;
    let coordenadas = inputCoordenadas.value;
    let imagen = inputImagen.src;
    let rating = 0;
    let estado = 'Habilitado';
    let permiso = 'desaprobado';
    let empresa = idEmpresa;

    let error = validar(provincia,canton,distrito,titulo,categoria,descripcion,direccion,coordenadas);

    if(error == true){
        swal({
            type: 'warning',
            title: 'No se pudo registrar el lugar',
            text: 'Por favor revise los campos en rojo antes de continuar',
            confirmButtonText: 'Entendido'
          });
    } else {
        let respuesta = registrarLugar(provincia,canton,distrito,titulo,categoria,descripcion,direccion,coordenadas,imagen,rating,estado,permiso,empresa);
        if(respuesta.success == true){
            swal({
                type: 'success',
                title: 'El lugar ha sido registrado',
                text: respuesta.msg,
                confirmButtonText: 'Entendido'
              });
            inputProvincia.value = '';
            inputCanton.value = '';    
            inputDistrito.value = '';
            inputRegTitulo.value = '';
            inputRegDescripcion.value = '';    
            inputRegDireccion.value = '';
            inputCategorias.value = '';
           
        } else {
            swal({
                type: 'error',
                title: 'No se pudo registrar el lugar',
                text: respuesta.msg,      
                confirmButtonText: 'Entendido'
              });
        } 
    }

    if(error == true){
        swal({
            type: 'warning',
            title: 'No se pudo registrar el lugar',
            text: 'Por favor revise los campos en rojo antes de continuar',
            confirmButtonText: 'Entendido'
        })
    } else {
        swal({
            type: 'success',
            title: 'El lugar ha sido registrado',
            text: 'Ya puede navegar por el nuevo perfil del lugar',
        }).then(function(){
            /*** Elian Rocha ***/
            let accion = `Registró el lugar:  ${titulo} `;
            obtenerDatosBitacora(accion);  
            window.location.href = 'lugares.html'
            /*** Elian Rocha ***/
    });
    }

};

function validar(pProvincia,pCanton,pDistrito,pTitulo,pCategoria,pDescripcion,pDireccion,pCoordenadas){
    let error = false;

    if(pProvincia == ''){
        error = true;
        inputProvincia.classList.add('error-input');
    } else {
        inputProvincia.classList.remove('error-input');
    }

    if(pCanton == ''){
        error = true;
        inputCanton.classList.add('error-input');
    } else {
        inputCanton.classList.remove('error-input');
    }

    if(pDistrito == ''){
        error = true;
        inputDistrito.classList.add('error-input');
    } else {
        inputDistrito.classList.remove('error-input');
    }

    if(pTitulo == ''){
        error = true;
        inputRegTitulo.classList.add('error-input');
    } else {
        inputRegTitulo.classList.remove('error-input');
    }

    if(pCategoria == ''){
        error = true;
        inputCategorias.classList.add('error-input');
    } else {
        inputCategorias.classList.remove('error-input');
    }

    if(pDescripcion == ''){
        error = true;
        inputRegDescripcion.classList.add('error-input');
    } else {
        inputRegDescripcion.classList.remove('error-input');
    }

    if(pDireccion == ''){
        error = true;
        inputRegDireccion.classList.add('error-input');
    } else {
        inputRegDireccion.classList.remove('error-input');
    }

    if(pCoordenadas == ''){
        error = true;
        inputCoordenadas.classList.add('error-input');
        inputmapa.classList.add('error-input');
    } else {
        inputCoordenadas.classList.remove('error-input');
        inputmapa.classList.remove('error-input');
    }
    
    return error;
};

function mostrarProvincias() {
    for (let i = 0; i < dataProvincias.length; i++) {
        let opcion = new Option(dataProvincias[i].nombre);
        opcion.value = dataProvincias[i].nombre;
        provincias.appendChild(opcion);
    }
};

function mostrarCantones(pidProvincia) {
    cantones.innerHTML = '';

    for(let i=0; i < dataProvincias.length; i++) {
        if(pidProvincia == dataProvincias[i].nombre){
            idProvincia = dataProvincias[i].idProvincia;
        }
    }

    for (let i = 0; i < dataCantones.length; i++) {
        if (idProvincia == dataCantones[i].Provincia_idProvincia) {
            let opcion = new Option(dataCantones[i].nombre);
            opcion.value = dataCantones[i].nombre;
            cantones.appendChild(opcion);
        }
    }
};

function mostrarDistritos(pidCanton) {
    distritos.innerHTML = '';

    for(let i=0; i < dataCantones.length; i++) {
        if(pidCanton == dataCantones[i].nombre){
            idCanton = dataCantones[i].idCanton;
        }
    }

    for (let i = 0; i < dataDistritos.length; i++) {
        if (idCanton == dataDistritos[i].Canton_idCanton){
            let opcion = new Option(dataDistritos[i].nombre);
            opcion.value = dataDistritos[i].nombre;
            distritos.appendChild(opcion);
        }    
    }
};

function mostrarCategorias() {
    for (let i = 0; i < dataCategorias.length; i++) {
        let opcion = new Option(dataCategorias[i].nombre);
        opcion.value = dataCategorias[i].nombre;
        categorias.appendChild(opcion);
    }
};

function iniciarMapa() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            coordenadas = {
                lng: position.coords.longitude,
                lat: position.coords.latitude
            };
            nuevoMapa(coordenadas);  
        }, 
        function (error) { console.log(error); });
}

function nuevoMapa(coordenadas) {
    let sitio = new google.maps.Map(document.getElementById('mapa'),
        {
            zoom: 13,
            center: new google.maps.LatLng(coordenadas.lat, coordenadas.lng),
        });

    marcador = new google.maps.Marker({
        map: sitio,
        draggable: true,
        position: new google.maps.LatLng(coordenadas.lat, coordenadas.lng),
    });
    
    marcador.addListener('dragend', function (event) {
        inputCoordenadas.value = this.getPosition().lat() + "," + this.getPosition().lng();
    });
}

mostrarProvincias();

mostrarCategorias();

inputProvincia.addEventListener('change', function(){
    mostrarCantones(this.value);
});

inputCanton.addEventListener('change', function(){
    mostrarDistritos(this.value);
});


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