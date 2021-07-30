'use strict';
//let id_usuario = localStorage.getItem('idUnico');
let idUnicoSS = sessionStorage.getItem('idUnico'); // sst v3 // v4
let idUnico = localStorage.getItem('idUsuario');  // sst v3
let tipoUsuario = sessionStorage.getItem('tipo_usuario');
let userModi = localStorage.getItem()
let idMod;

const hoy = new Date();
const inputpNombre = document.querySelector('#txtNRepLegal');
const inputsNombre = document.querySelector('#txtsNombre');
const inputpApellido = document.querySelector('#txtpApellido');
const inputsApellido = document.querySelector('#txtsApellido');

const selectTipoIDRep = document.querySelector('#txtTipoIdRep'); // Cedula Nacional, etc
const opciones = document.querySelectorAll('#TipoIdrep option');

const inputID = document.querySelector('#txtIDRep'); // 303330811
const inputFechaNacimiento = document.querySelector('#fechaNacimiento');
const inputEdad = document.querySelector('#edad');
const inputCorreo = document.querySelector('#correoRep');
const inputEmpresa = document.querySelector('#Empresa');
const inputCliente = document.querySelector('#Cliente');
const inputGeneroM = document.querySelector('#Masculino');
const inputGeneroF = document.querySelector('#Femenino');

const selectTipoID = document.querySelector('#txtTipoId'); // Sociedad Anonima
const opcionesDos = document.querySelectorAll('#TipoId option');

const inputIDRep = document.querySelector('#txtID'); // 3101023617
const razonSocial = document.querySelector('#txtRazonSocial');
const nombreFantasia = document.querySelector('#txtNombreFantasia');
const inputCorreoRep = document.querySelector('#correo');
const inputClave = document.querySelector('#txtContrasena');
const inputConfirma = document.querySelector('#txtConfirma');
const imgCliente = document.querySelector('#registrarImagen');

var elementGeneroM = document.getElementById("lblGenM");
var elementGeneroF = document.getElementById("lblGenF");

const botonActualizar = document.querySelector('.btnActualizar');

let listadoUsuarios = obtenerUsuarios();

/*switch(tipoUsuario){
    case 'Administrador':
    let usuarioImagen = buscar_usuario(idUnico);
    if(usuarioImagen['imagen'] != ''){
        imgCliente.src = usuarioImagen['imagen'];
    }
    break;
    case 'Empresa':
    let idUsuarioEm = sessionStorage.getItem('idUnico');
    for(let i = 0; i < listadoUsuarios.length; i++){
        if(idUsuarioEm == listadoUsuarios[i]['_id']){
            if(listadoUsuarios[i]['imagen'] != ''){
                imgCliente.src = listadoUsuarios[i]['imagen'];
            }
        }
    }
    break;
    case 'Cliente':
    let idUsuarioCl = sessionStorage.getItem('idUnico');
    for(let i = 0; i < listadoUsuarios.length; i++){
        if(idUsuarioCl == listadoUsuarios[i]['_id']){
            if(listadoUsuarios[i]['imagen'] != ''){
                imgCliente.src = listadoUsuarios[i]['imagen'];
            }
        }
    }
    break;
    default:
    break;
}*/

if(tipoUsuario=='Administrador'){

if (idUnico) {

    mostrarDatos(idUnico);
    idMod=idUnico;

} else {

    alert('Debe seleccionar un usuario para actualizar');

}

}else{

mostrarDatos(idUnicoSS)
idMod=idUnicoSS;
}



function mostrarDatos(pid) {


   // let usuario = buscar_usuario(idUnico);

let usuario =buscar_usuario(pid);

    inputpNombre.value = usuario['pnombre'];
    inputsNombre.value = usuario['snombre'];
    inputpApellido.value = usuario['papellido'];
    inputsApellido.value = usuario['sapellido'];

    for (let i = 0; i < opciones.length; i++) {

        if (usuario['tipoID'] == opciones[i].textContent) {
            selectTipoIDRep.value = opciones[i].textContent;

        }
    }


    inputID.value = usuario['identidad']; ////////////////

   ///////////// selectTipoIDRep.value = usuario['tipoID']; ///Ced Nac
   imgCliente.src = usuario['imagen'];

    var parts = usuario['fechaNac'].split('/');

    let datoFechaNacimiento = new Date(parts[2], parts[1], parts[0]);

    let nuevaFechaNac = formatoFecha(datoFechaNacimiento);

    inputFechaNacimiento.value = nuevaFechaNac;

    inputEdad.value = usuario['edad'];
    inputCorreo.value = usuario['correo'];


    inputGeneroM.value = usuario['sexo'];
    inputGeneroF.value = usuario['sexo'];

    if (inputGeneroM.value == 'Masculino') {

        $('#Masculino').attr('checked', true);
    }

    if (inputGeneroF.value == 'Femenino') {

        $('#Femenino').attr('checked', true);
    }


    inputEmpresa.value = usuario['empresa'];
    inputCliente.value = usuario['cliente'];

    for (let i = 0; i < opcionesDos.length; i++) {

        if (usuario['tipoIDRep'] == opcionesDos[i].textContent) {
            selectTipoID.value = opcionesDos[i].textContent;

        }
    }

    inputIDRep.value = usuario['identidadRep']; //////////////
    razonSocial.value = usuario['razon'];
    nombreFantasia.value = usuario['fantasia'];

   /////// selectTipoID.value = usuario['tipoIDRep']; ///SA
    inputCorreoRep.value = usuario['correoRep'];
    inputClave.value = usuario['clave'];
    inputConfirma.value = usuario['clave'];


};


function obtenerDatosFormulario() {

   // let usuario = "";
    let pnombre = inputpNombre.value;
    let snombre = inputsNombre.value;
    let papellido = inputpApellido.value;
    let sapellido = inputsApellido.value;
    let selectTipoIDReps = selectTipoID.value; ///**** */
    let identidad = inputID.value;
    let fechaNac = new Date(inputFechaNacimiento.value);
    let edad = Number(inputEdad.value);
    let correo = inputCorreo.value;
    let empresa = inputEmpresa.value;
    let cliente = inputCliente.value;
    let masculino = inputGeneroM.value;
    let femenino = inputGeneroF.value;
    let selectTipoIDs = selectTipoIDRep.value;  ///*** */
    let identidadRep = inputIDRep.value;

    let sexo = "";

   
    let razon = razonSocial.value;
    let fantasia = nombreFantasia.value;
    
   
    let correoRep = inputCorreoRep.value;
    let clave = inputClave.value;
    let confirma = inputConfirma.value;
    let imagen = imgCliente.src;

    let feNac = fechaNac.toLocaleDateString();


    sexo = document.querySelector('#sexo input[type=radio]:checked').value;

    if (usuario == "Empresa" || usuario == "") {

        let error = validarE(selectTipoIDs, identidad, razon, fantasia, correo, pnombre, snombre, papellido,
            sapellido, selectTipoIDReps, identidadRep, fechaNac, edad, correoRep, sexo, clave, confirma);

        if (error == true) {
            swal({
                type: 'warning',
                title: 'No se pudo registrar el usuario',
                text: 'Por favor revise los campos en rojo'
            });


        } else {

            // mostrarEmpresas();          

            let respuesta = actualizarUsuario(idMod, usuario, pnombre, snombre, papellido, sapellido, selectTipoIDs,
                identidad, feNac, edad, correo, sexo, razon, fantasia,
                selectTipoIDReps, identidadRep, correoRep, clave, imagen);
   

            if (respuesta.success == true) {
                swal({

                    type: 'success',
                    title: 'Actualización realizada con éxito',
                    text: 'Dar click en botón para continuar'
                });

                let id_usuario = this.dataset.id_usuario; // agregado SST
                localStorage.setItem('idUser', id_usuario); // agregado SST
                let accion = `Modificó al usuario: ${pnombre}  ${papellido}`; // Bitácora
                obtenerDatosBitacora(accion);  // Bitácora


                $('#txtTipoId').attr('disabled', false).val('');
                $('#txtID').attr('disabled', false).val('');
                $('#txtRazonSocial').attr('disabled', false).val('');
                $('#txtNombreFantasia').attr('disabled', false).val('');
                $('#correo').attr('disabled', false).val('');
                $('#txtNRepLegal').attr('disabled', false).val('');
                $('#txtsNombre').attr('disabled', false).val('');
                $('#txtpApellido').attr('disabled', false).val('');
                $('#txtsApellido').attr('disabled', false).val('');
                $('#txtTipoIdRep').attr('disabled', false).val('');
                $('#txtIDRep').attr('disabled', false).val('');
                $('#Masculino').attr('disabled', false);
                $('#Femenino').attr('disabled', false);
                $('#fechaNacimiento').attr('disabled', false).val('');
                $('#edad').attr('disabled', true).val('');
                $('#correoRep').attr('disabled', false).val('');
                $('#txtContrasena').attr('disabled', false).val('');
                $('#txtConfirma').attr('disabled', false).val('');

                setInterval(function () {
                  
        if (usuario == 'Empresa') {

            window.location.href = 'perfil_empresa.html';
        }

        if (usuario == 'Cliente') {

            window.location.href = 'perfil_cliente.html';

        }

        if (usuario == 'Administrador') {

            window.location.href = 'perfil_admin.html';

        }

                }, 2000);

            } else {


                swal({
                    title: 'Registro incorrecto',
                    // text: respuesta.msg,
                    text: 'No su pudo realizar el registro debido a un error con la base de datos',
                    type: 'error',
                    confirmButtonText: 'Entendido'
                });

            }

            //  mostrarListaUsuarios(); // borrar luego
        }
    };


    if (usuario == "Cliente" || usuario=="Administrador") {

       

        let error = validarC(pnombre, snombre, papellido, sapellido, selectTipoIDs, identidad, fechaNac,
            edad, correo, sexo, clave, confirma);

        if (error == true) {
            swal({
                type: 'warning',
                title: 'No se pudo enviar su mensaje',
                text: 'Por favor revise los campos en rojo'
            });


        } else {


            let respuestac = actualizarUsuario(idMod, usuario, pnombre, snombre, papellido, sapellido, selectTipoIDs,
                identidad, feNac, edad, correo, sexo, razon, fantasia,
                selectTipoIDReps, identidadRep, correoRep, clave, imagen);
            //  mostrarClientes();

            if (respuestac.success == true) {
                swal({

                    type: 'success',
                    title: 'Actualización realizada con éxito',
                    text: 'Dar click en botón para continuar',
                    confirmButtonText: 'OK'

                });

                let accion = `Modificó al usuario: ${pnombre}  ${papellido}`; // Bitácora
                obtenerDatosBitacora(accion);  // Bitácora


                $('#txtTipoId').attr('disabled', true).val('');
                $('#txtID').attr('disabled', true).val('');
                $('#txtRazonSocial').attr('disabled', true).val('');
                $('#txtNombreFantasia').attr('disabled', true).val('');
                $('#correo').attr('disabled', true).val('');
                $('#txtNRepLegal').attr('disabled', false).val('');
                $('#txtsNombre').attr('disabled', false).val('');
                $('#txtpApellido').attr('disabled', false).val('');
                $('#txtsApellido').attr('disabled', false).val('');
                $('#txtTipoIdRep').attr('disabled', false).val('');
                $('#txtIDRep').attr('disabled', false).val('');
                $('#Masculino').attr('disabled', false);
                $('#Femenino').attr('disabled', false);
                $('#fechaNacimiento').attr('disabled', false).val('');
                $('#edad').attr('disabled', true).val('');
                $('#correoRep').attr('disabled', false).val('');
                $('#txtContrasena').attr('disabled', false).val('');
                $('#txtConfirma').attr('disabled', false).val('');


                setInterval(function () {
                  
        if (usuario == 'Empresa') {

            window.location.href = 'perfil_empresa.html';
        }

        if (usuario == 'Cliente') {

            window.location.href = 'perfil_cliente.html';

        }

        if (usuario == 'Administrador') {

            window.location.href = 'listar_usuarios.html';

        }

                }, 2000);



            } else {

                swal({
                    title: 'Registro incorrecto',
                    // text: respuesta.msg,
                    text: 'No su pudo realizar el registro debido a un error con la base de datos',
                    type: 'error',
                    confirmButtonText: 'Entendido'
                });

            }

            //   mostrarListaUsuarios(); // borrar luego
        }


    };




    function validarE(pselectTipoIDs, pidentidad, prazon, pfantasia, pcorreo, ppnombre, psnombre, ppapellido,
        psapellido, pselectTipoIDReps, pidentidadRep, pfechaNac, pedad, pcorreoRep, psexo, pclave, pconfirma) {
        let error = false;
        let expLetras = /^[a-z A-ZáéíóúñÑÁÉÍÓÚüÜ]+$/;
        let expNumero = /^[0-9]+$/;
        let expCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let expClave = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;


        if (pselectTipoIDs == '') {
            error = true;
            selectTipoID.classList.add('error_input');
        } else {
            selectTipoID.classList.remove('error_input');
        }

        if (pidentidad == '' || expNumero.test(pidentidad) == false) {
            error = true;
            inputID.classList.add('error_input');
        } else {
            inputID.classList.remove('error_input');
        }

        if (prazon == '') {
            error = true;
            razonSocial.classList.add('error_input');
        } else {
            razonSocial.classList.remove('error_input');
        }

        if (pfantasia == '') {
            error = true;
            nombreFantasia.classList.add('error_input');
        } else {
            nombreFantasia.classList.remove('error_input');
        }

        if (pcorreo == '' || expCorreo.test(pcorreo) == false) {
            error = true;
            inputCorreo.classList.add('error_input');
        } else {
            inputCorreo.classList.remove('error_input');
        }


        if (ppnombre == '' || expLetras.test(ppnombre) == false) {
            error = true;
            inputpNombre.classList.add('error_input');
        } else {
            inputpNombre.classList.remove('error_input');
        }

        if (!psnombre == '' && expLetras.test(psnombre) == false) {
            error = true;
            inputsNombre.classList.add('error_input');
        } else {
            inputsNombre.classList.remove('error_input');
        }


        if (ppapellido == '' || expLetras.test(ppapellido) == false) {
            error = true;
            inputpApellido.classList.add('error_input');
        } else {
            inputpApellido.classList.remove('error_input');
        }

        if (!psapellido == '' && expLetras.test(psapellido) == false) {
            error = true;
            inputsApellido.classList.add('error_input');
        } else {
            inputsApellido.classList.remove('error_input');
        }

        if (pselectTipoIDReps == '') {
            error = true;
            selectTipoIDRep.classList.add('error_input');
        } else {
            selectTipoIDRep.classList.remove('error_input');
        }


        if (pidentidadRep == '' || expNumero.test(pidentidadRep) == false) {
            error = true;
            inputIDRep.classList.add('error_input');
        } else {
            inputIDRep.classList.remove('error_input');
        }


        if (pfechaNac == 'Invalid Date' || pfechaNac > hoy) {
            error = true;
            inputFechaNacimiento.classList.add('error_input');
        } else {
            inputFechaNacimiento.classList.remove('error_input');
        }

        if (pedad == '' || pedad < inputEdad.min || pedad > inputEdad.max) {
            error = true;
            inputEdad.classList.add('error_input');
            inputFechaNacimiento.classList.add('error_input');

        } else {
            inputEdad.classList.remove('error_input');

        }


        if (pcorreoRep == '' || expCorreo.test(pcorreoRep) == false) {
            error = true;
            inputCorreoRep.classList.add('error_input');
        } else {
            inputCorreoRep.classList.remove('error_input');
        }

        if (psexo == '') {
            error = true;
            elementGeneroM.classList.add('error_sexo');
            elementGeneroF.classList.add('error_sexo');

        } else {
            elementGeneroM.classList.remove('error_sexo');
            elementGeneroF.classList.remove('error_sexo');

        }


        if (pclave == '' || expClave.test(pclave) == false || pclave != pconfirma) {
            error = true;
            inputClave.classList.add('error_input');
            inputConfirma.classList.add('error_input');
        } else {
            inputClave.classList.remove('error_input');
            inputConfirma.classList.remove('error_input');
        }


        if (pconfirma == '' || expClave.test(pconfirma) == false || pconfirma != pclave) {
            error = true;
            inputClave.classList.add('error_input');
            inputConfirma.classList.add('error_input');
        } else {
            inputConfirma.classList.remove('error_input');
            inputClave.classList.remove('error_input');
        }



        return error;

    };

    function validarC(ppnombre, psnombre, ppapellido, psapellido, pselectTipoIDReps, pidentidad, pfechaNac, pedad, pcorreo, psexo, pclave, pconfirma) {
        let error = false;
        let expLetras = /^[a-z A-ZáéíóúñÑÁÉÍÓÚüÜ]+$/;
        let expNumero = /^[0-9]+$/;
        let expCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let expClave = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;



        if (ppnombre == '' || expLetras.test(ppnombre) == false) {
            error = true;
            inputpNombre.classList.add('error_input');
        } else {
            inputpNombre.classList.remove('error_input');
        }

        if (!psnombre == '' && expLetras.test(psnombre) == false) {
            error = true;
            inputsNombre.classList.add('error_input');
        } else {
            inputsNombre.classList.remove('error_input');
        }

        if (ppapellido == '' || expLetras.test(ppapellido) == false) {
            error = true;
            inputpApellido.classList.add('error_input');
        } else {
            inputpApellido.classList.remove('error_input');
        }

        if (!psapellido == '' && expLetras.test(psapellido) == false) {
            error = true;
            inputsApellido.classList.add('error_input');
        } else {
            inputsApellido.classList.remove('error_input');
        }

        if (pselectTipoIDReps == '') {
            error = true;
            selectTipoIDRep.classList.add('error_input');
        } else {
            selectTipoIDRep.classList.remove('error_input');
        }


        if (pidentidad == '' || expNumero.test(pidentidad) == false) {
            error = true;
            inputID.classList.add('error_input');
        } else {
            inputID.classList.remove('error_input');
        }

        if (pfechaNac == 'Invalid Date' || pfechaNac > hoy) {
            error = true;
            inputFechaNacimiento.classList.add('error_input');
        } else {
            inputFechaNacimiento.classList.remove('error_input');
        }

        if (pedad == '' || pedad < inputEdad.min || pedad > inputEdad.max) {
            error = true;
            inputEdad.classList.add('error_input');
            inputFechaNacimiento.classList.add('error_input');

        } else {
            inputEdad.classList.remove('error_input');

        }

        if (pcorreo == '' || expCorreo.test(pcorreo) == false) {
            error = true;
            inputCorreo.classList.add('error_input');
        } else {
            inputCorreo.classList.remove('error_input');
        }


        if (psexo == '') {
            error = true;
            elementGeneroM.classList.add('error_sexo');
            elementGeneroF.classList.add('error_sexo');

        } else {
            elementGeneroM.classList.remove('error_sexo');
            elementGeneroF.classList.remove('error_sexo');

        }



        //    if (document.querySelector('#sexo input[type=radio]:checked') == null) {
        //      document.querySelector('#sexo').classList.add('error_input');
        //      error = true;
        //   } else {
        //      document.querySelector('#sexo').classList.remove('error_input');
        //   }

        if (pclave == '' || expClave.test(pclave) == false || pclave != pconfirma) {
            error = true;
            inputClave.classList.add('error_input');
            inputConfirma.classList.add('error_input');
        } else {
            inputClave.classList.remove('error_input');
            inputConfirma.classList.remove('error_input');
        }


        if (pconfirma == '' || expClave.test(pconfirma) == false || pconfirma != pclave) {
            error = true;
            inputClave.classList.add('error_input');
            inputConfirma.classList.add('error_input');
        } else {
            inputConfirma.classList.remove('error_input');
            inputClave.classList.remove('error_input');
        }

        return error;

    };



    
};





if (tipoUsuario == 'Cliente' || tipoUsuario == 'Administrador') {


    $('#txtTipoId').addClass('ocultar');
    $('#txtID').addClass('ocultar');
    $('#txtRazonSocial').addClass('ocultar');
    $('#txtNombreFantasia').addClass('ocultar');
    $('#correo').addClass('ocultar');


    if (tipoUsuario == 'Cliente') {
      //$('#h1RegUser').text("Modificar Cliente");  // sst v3
        $('#h1RegUser').text("Modificar Usuario");
    }

    if (tipoUsuario == 'Administrador') {

       // $('#h1RegUser').text("Modificar Administrador");  // sst v3
       $('#h1RegUser').text("Modificar Usuario");


    }


    $('#frmUno').addClass('ocultar');
    $('#sectionPrincipal').addClass('ocultarDos');

    $('.frmDos').addClass('ocultarCuatro');
    $('.frmTres').addClass('ocultarCuatro');
    $('.fotoCliente').addClass('ocultarCinco');
    $('.btnActualizar').addClass('ocultarSiete');


}


if (tipoUsuario == 'Empresa') {
// $('#h1RegUser').text("Modificar Empresa"); // sst v3

    $('#h1RegUser').text("Modificar Usuario");
    $('#Empresa').attr('disabled', true);
    $('#Cliente').attr('disabled', true);
    $('#Empresa').attr('checked', true);
    $('#frmUno').addClass('ocultarCinco');
    $('.frmDos').addClass('ocultarCinco');
    $('.frmTres').addClass('ocultarTres');
    $('.btnActualizar').addClass('ocultarSeis');

}



function formatoFecha(fecha) {
    let f = new Date(fecha),
        mes = '' + (f.getMonth()),
        dia = '' + (f.getDate()+1),
        anno = f.getFullYear();

    if (mes.length < 2) {
        mes = '0' + mes;
    }
    if (dia.length < 2) {
        dia = '0' + dia;
    }

    return [anno, mes, dia].join('-');
}

botonActualizar.addEventListener('click', obtenerDatosFormulario);
inputFechaNacimiento.addEventListener('change', calcularEdad);


function calcularEdad() {
    let fechaActual = new Date();
    let fechaIngresada = new Date(inputFechaNacimiento.value);
    let edad = fechaActual.getFullYear() - fechaIngresada.getFullYear();
    let mes = fechaActual.getMonth() - fechaIngresada.getMonth();

    if (mes < 0 || mes === 0 && fechaActual.getDate() < (fechaIngresada.getDate() + 1)) {

        edad--;

    }

    inputEdad.value = edad;

};

/******************************************************/
/********** Función para registrar bitácora **********/
/****************************************************/

function obtenerDatosBitacora(paccion){
    let bitacora = false;
    let accion = paccion;
    //let listaUsuarios = obtenerUsuarios();
    let sesionCorreo = sessionStorage.getItem('correo');
    let rol = tipoUsuario;

    for (let i = 0; i < listadoUsuarios.length; i++) {
        if (listadoUsuarios[i]['correo'] == sesionCorreo) {
            let nombre = listadoUsuarios[i]['pnombre'];
            let respuesta = registrar_bitacora(rol, sesionCorreo, nombre, accion);
            if(respuesta.success==true){
                bitacora = true;
            }
        }
    }
    return bitacora;
};

