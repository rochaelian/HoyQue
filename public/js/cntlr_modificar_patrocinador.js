'use strict';

let id_patrocinador = localStorage.getItem('patrocinador');
let tipoUsuario = sessionStorage.getItem('tipo_usuario');

const inputNombre = document.querySelector('#nPatrocinador');
const dataListIndustria = document.querySelector('#txtIndustria');
const opciones = document.querySelectorAll('#lstIndustrias option');
const imgPatrocinador = document.querySelector('#registrarImagen');
const botonActualizar = document.querySelector('#botonActualizarPatrocinador');

botonActualizar.addEventListener('click', obtenerDatosFormulario);

if(id_patrocinador){
    mostrarDatos();
    mostrarIndustrias();
}else{
    alert('Debe seleccionar un patrocinador para actualizar');
}

function mostrarDatos(){
    let patrocinador = buscar_patrocinador(id_patrocinador);

    inputNombre.value = patrocinador['nombre'];
    dataListIndustria.value = patrocinador['industria'];


    imgPatrocinador.src = patrocinador['imagen'];

};

function obtenerDatosFormulario(){
    let nombre = inputNombre.value;
    let industria = dataListIndustria.value;
    let imagen = imgPatrocinador.src;
    let error = validar(nombre, industria);
    
    if(error == true){
      swal({
          title: 'Registro incorrecto',
          text: '¡No se pudo actualizar el patrocinador! Por favor, revise los campos en rojo',
          type: 'warning',
          confirmButtonText: 'Entendido'
        });
    }else{
    let respuesta = actualizar_patrocinador(id_patrocinador, nombre, industria, imagen);
    if(respuesta.success == true){
        swal({
            title: 'Registro correcto',
            text: respuesta.msg,
            type: 'success',
            confirmButtonText: 'Entendido'
            }).then(function(){
            let accion = `Modificó el patrocinador: ${nombre} `;
            obtenerDatosBitacora(accion);
            window.location.href = 'listar_patrocinadores.html';
            });
    }else{
        swal({
            title: 'Registro incorrecto',
            text: respuesta.msg,
            type: 'error',
            confirmButtonText: 'Entendido'
          });
    }
}
};

function validar(pnombre, pindustria){
  let error = false;
  let expLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ .]+$/;
  
  if(pnombre=='' || expLetras.test(pnombre)==false){
      error=true;
      inputNombre.classList.add('error-input');
  }else{
      inputNombre.classList.remove('error-input');
  }

  if(pindustria==''){
      error=true;
      dataListIndustria.classList.add('error-input');
  }else{
    dataListIndustria.classList.remove('error-input');
  }

  return error;
};

function mostrarIndustrias(){
  let listaIndustrias = obtenerIndustrias();
  let selectIndustrias = document.querySelector('#lstIndustrias');
  for(let i=0; i < listaIndustrias.length; i++){
      let nuevaOpcion = new Option(listaIndustrias[i]['nombre']);
      nuevaOpcion.value = listaIndustrias[i]['nombre'];
      selectIndustrias.appendChild(nuevaOpcion);
  }
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

