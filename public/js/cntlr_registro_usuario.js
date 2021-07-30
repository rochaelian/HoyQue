'use strict';

// let conectado = sessionStorage.getItem('conectado'); // agregue esta linea SST  sstv4
let tipoUsuario = sessionStorage.getItem('tipo_usuario');
const btnRegistrar = document.querySelector('#btnRegistrar');

const inputpNombre = document.querySelector('#txtNRepLegal');
const inputsNombre = document.querySelector('#txtsNombre');
const inputpApellido = document.querySelector('#txtpApellido');
const inputsApellido = document.querySelector('#txtsApellido');
const inputTipoID = document.querySelector('#txtTipoIdRep');
const inputID = document.querySelector('#txtIDRep');
const inputFechaNacimiento = document.querySelector('#fechaNacimiento');
const hoy = new Date();
const inputEdad = document.querySelector('#edad');
const inputCorreo = document.querySelector('#correoRep');
const inputEmpresa = document.querySelector('#Empresa');
const inputCliente = document.querySelector('#Cliente');
const inputGeneroM = document.querySelector('#Masculino');
const inputGeneroF = document.querySelector('#Femenino');
const inputTipoIDRep = document.querySelector('#txtTipoId');
const inputIDRep = document.querySelector('#txtID');
const razonSocial = document.querySelector('#txtRazonSocial');
const nombreFantasia = document.querySelector('#txtNombreFantasia');
const inputCorreoRep = document.querySelector('#correo');
const inputClave = document.querySelector('#txtContrasena');
const inputConfirma = document.querySelector('#txtConfirma');
const imgCliente = document.querySelector('#registrarImagen');
//const inputFiltrar = document.querySelector('#txtFiltrar');

//const cuerpoTabla = document.querySelector('#tblEmpresas tbody');


//let listaUsuarios = obtenerUsuarios(); //borrar luego

//mostrarListaUsuarios(); //borrar luego
//inputFiltrar.addEventListener('keyup', mostrarListaUsuarios); // borrar luego

var elementGeneroM = document.getElementById("lblGenM");
var elementGeneroF = document.getElementById("lblGenF");

function obtenerDatos() {

    let usuarioTemp = "";
    let pnombre = inputpNombre.value;
    let snombre = inputsNombre.value;
    let papellido = inputpApellido.value;
    let sapellido = inputsApellido.value;
    let tipoID = inputTipoID.value;
    let identidad = inputID.value;
    let fechaNac = new Date(inputFechaNacimiento.value);
    let edad = Number(inputEdad.value);
    let correo = inputCorreo.value;
    let masculino = inputGeneroM.value;
    let femenino = inputGeneroF.value;

    let sexo = "";

    let empresa = inputEmpresa.value;
    let cliente = inputCliente.value;
    let razon = razonSocial.value;
    let fantasia = nombreFantasia.value;
    let tipoIDRep = inputTipoIDRep.value;
    let identidadRep = inputIDRep.value;
    let correoRep = inputCorreoRep.value;
    let clave = inputClave.value;
    let confirma = inputConfirma.value;
    let imagen = imgCliente.src;

    let feNac = fechaNac.toLocaleDateString();


    if (conectado == 'true'|| tipoUsuario=='Administrador') {  // sst v4


        usuarioTemp = document.querySelector('#tipoCliente input[type=radio]:checked').value;


    } else {

        usuarioTemp = "";

    }

 /*
    BORRE ESTA INSTRUCCION SST

            if (usuario == 'Empresa') {
    
                if (document.querySelector('#sexo input[type=radio]:checked') == null) {
                    sexo = "";
    
                } else {
    
                    sexo = document.querySelector('#sexo input[type=radio]:checked').value;
    
                }
            };
    
            if (usuario == 'Cliente') {
    
                if (document.querySelector('#sexo input[type=radio]:checked') == null) {
                    sexo = "";
    
                } else {
    
                    sexo = document.querySelector('#sexo input[type=radio]:checked').value;
    
                }
    
            };
        }
    
    */
   
    //agregado SSTv2
    if (document.querySelector('#sexo input[type=radio]:checked') == null) {
        sexo = "";

    } else {

        sexo = document.querySelector('#sexo input[type=radio]:checked').value;

    }

    if (conectado == 'true'|| tipoUsuario=='Administrador' && usuarioTemp == "Empresa" || usuarioTemp == "") {  // sst v4

      

        let error = validarE(tipoID, identidad, razon, fantasia, correo, pnombre, snombre, papellido,
            sapellido, tipoIDRep, identidadRep, fechaNac, edad, correoRep, sexo, clave, confirma);

        if (error == true) {
            swal({
                type: 'warning',
                title: 'No se pudo registrar el usuario',
                text: 'Por favor revise los campos en rojo antes de continuar'
            });


        } else {

            // mostrarEmpresas();          

            let respuesta = registrarUsuario(usuarioTemp, pnombre, snombre, papellido, sapellido, tipoID,
                identidad, feNac, edad, correo, sexo, razon, fantasia,
                tipoIDRep, identidadRep, correoRep, clave, imagen);

            if (respuesta.success == true) {
                swal({

                    type: 'success',
                    title: 'El usuario ha sido registrado',
                    text: 'Ya puede navegar por el nuevo perfil del usuario'
                });

                let id_usuario = this.dataset.id_usuario; // agregado SST
                localStorage.setItem('idUser', id_usuario); // agregado SST
                let accion = `Se ha registrado un nuevo usuario con el nombre:  ${pnombre}`;    
                obtenerDatosBitacora(accion);

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
                    window.location.href = 'listar_usuarios.html'; //SSTv2 antes estaba inicio_sesion.html   sst v4.. lista usuarios

                }, 2000);

            } else {


                swal({
                    title: 'No se pudo registrar el usuario',
                    // text: respuesta.msg,
                    text: 'Ocurrió un error con la base de datos',
                    type: 'error',
                    confirmButtonText: 'Entendido'
                });

            }

            //  mostrarListaUsuarios(); // borrar luego
        }
    };


    if (conectado == null || usuarioTemp == "Cliente") {  // AGREGUE LO DE CONECTADO NULL SST

        if (conectado == null) { //SST
            usuarioTemp = "Cliente";  //SST
        }

        fantasia = "";  //SST
        razon = "";  //SST
        tipoIDRep = "";  //SST
        identidadRep = ""; //SST
        correoRep = ""; //SST



        let error = validarC(pnombre, snombre, papellido, sapellido, tipoID, identidad, fechaNac,
            edad, correo, sexo, clave, confirma);

        if (error == true) {
            swal({
                type: 'warning',
                title: 'No se pudo registrar el usuario',
                text: 'Por favor revise los campos en rojo antes de continuar'
            });


        } else {


            let respuestac = registrarUsuario(usuarioTemp, pnombre, snombre, papellido, sapellido, tipoID,
                identidad, feNac, edad, correo, sexo, razon, fantasia,
                tipoIDRep, identidadRep, correoRep, clave, imagen);
            //  mostrarClientes();

            if (respuestac.success == true) {
                swal({

                    type: 'success',
                    title: 'El usuario ha sido registrado',
                    text: 'Ya puede navegar por el nuevo perfil del usuario',
                    confirmButtonText: 'Entendido'

                });

                let accion = `Se ha registrado un nuevo usuario con el nombre:  ${pnombre}`;    
                obtenerDatosBitacora(accion);

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

                    if (conectado == 'true') {
                        let accion = `Se ha registrado un nuevo usuario con el nombre:  ${pnombre}`;    
                        obtenerDatosBitacora(accion);
                        window.location.href = 'listar_usuarios.html';  // agregado SSTv2  // sst v4
                    } else {
    
                        window.location.href = 'inicio_sesion.html';  // agregado SSTv2
    
                    }
                }, 2000);


            } else {

                swal({
                    title: 'No se pudo registrar el usuario',
                    // text: respuesta.msg,
                    text: 'Ocurrió un error con la base de datos',
                    type: 'error',
                    confirmButtonText: 'Entendido'
                });

            }

            //   mostrarListaUsuarios(); // borrar luego
        }


    };




    function validarE(ptipoID, pidentidad, prazon, pfantasia, pcorreo, ppnombre, psnombre, ppapellido,
        psapellido, ptipoIDRep, pidentidadRep, pfechaNac, pedad, pcorreoRep, psexo, pclave, pconfirma) {
        let error = false;
        let expLetras = /^[a-z A-ZáéíóúñÑÁÉÍÓÚüÜ]+$/;
        let expNumero = /^[0-9]+$/;
        let expCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let expClave = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;


        if (ptipoID == '') {
            error = true;
            inputTipoID.classList.add('error_input');
        } else {
            inputTipoID.classList.remove('error_input');
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

        if (ptipoIDRep == '') {
            error = true;
            inputTipoIDRep.classList.add('error_input');
        } else {
            inputTipoIDRep.classList.remove('error_input');
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

    function validarC(ppnombre, psnombre, ppapellido, psapellido, ptipoID, pidentidad, pfechaNac, pedad, pcorreo, psexo, pclave, pconfirma) {
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

        if (ptipoID == '') {
            error = true;
            inputTipoID.classList.add('error_input');
        } else {
            inputTipoID.classList.remove('error_input');
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



btnRegistrar.addEventListener('click', obtenerDatos);
inputFechaNacimiento.addEventListener('change', calcularEdad);



function mostrarListaUsuarios() {

    let filtro = inputFiltrar.value;

    let tbody = document.querySelector('#tblUsuarios tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]['correo'].toLowerCase().includes(filtro.toLowerCase())) {
            let fila = tbody.insertRow();

            let celdaImagen = fila.insertCell();
            let celdaPNombre = fila.insertCell();
            let celdaSNombre = fila.insertCell();
            let celdaPApellido = fila.insertCell();
            let celdaSApellido = fila.insertCell();
            let celdaIdentidad = fila.insertCell();
            let celdaEdad = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            let celdaRazon = fila.insertCell();
            let celdaFantasia = fila.insertCell();
            let celdaIdentidadRep = fila.insertCell();
            let celdaCorreoRep = fila.insertCell();



            let imagen = document.createElement('img');
            imagen.classList.add('imagenTabla');
            if (listaUsuarios[i]['imagen']) {
                imagen.src = listaUsuarios[i]['imagen'];
            } else {
                imagen.src = 'imgs/usuario.png';
            }

            celdaImagen.appendChild(imagen);


            celdaPNombre.innerHTML = listaUsuarios[i]['pnombre'];
            celdaSNombre.innerHTML = listaUsuarios[i]['snombre'];
            celdaPApellido.innerHTML = listaUsuarios[i]['papellido'];
            celdaSApellido.innerHTML = listaUsuarios[i]['sapellido'];
            celdaIdentidad.innerHTML = listaUsuarios[i]['identidad'];
            celdaEdad.innerHTML = listaUsuarios[i]['edad'];
            celdaCorreo.innerHTML = listaUsuarios[i]['correo'];
            celdaRazon.innerHTML = listaUsuarios[i]['razon'];
            celdaFantasia.innerHTML = listaUsuarios[i]['fantasia'];

            celdaIdentidadRep.innerHTML = listaUsuarios[i]['identidadRep'];
            celdaCorreoRep.innerHTML = listaUsuarios[i]['correoRep'];




        }


    }
};





//mostrarEmpresas();

/*
function mostrarEmpresas() {
 
    cuerpoTabla.innerHTML = '';
    for (let i = 0; i < listaEmpresas.length; i++) {
 
        let fila = cuerpoTabla.insertRow();
        fila.insertCell().innerHTML = listaEmpresas[i][0];
        fila.insertCell().innerHTML = listaEmpresas[i][1];
        fila.insertCell().innerHTML = listaEmpresas[i][2];
        fila.insertCell().innerHTML = listaEmpresas[i][3];
        fila.insertCell().innerHTML = listaEmpresas[i][4];
        fila.insertCell().innerHTML = listaEmpresas[i][5];
        fila.insertCell().innerHTML = listaEmpresas[i][6];
        fila.insertCell().innerHTML = listaEmpresas[i][7];
        fila.insertCell().innerHTML = listaEmpresas[i][8];
        fila.insertCell().innerHTML = listaEmpresas[i][9];
        fila.insertCell().innerHTML = listaEmpresas[i][10];
        fila.insertCell().innerHTML = listaEmpresas[i][11];
        fila.insertCell().innerHTML = listaEmpresas[i][12];
        fila.insertCell().innerHTML = listaEmpresas[i][13];
        fila.insertCell().innerHTML = listaEmpresas[i][14];
    }
 
};
 
*/

$(document).ready(function () {


    $('#Empresa').click(function () {

        inputTipoID.classList.remove('error_input');
        inputID.classList.remove('error_input');
        razonSocial.classList.remove('error_input');
        nombreFantasia.classList.remove('error_input');
        inputCorreo.classList.remove('error_input');
        inputpNombre.classList.remove('error_input');
        inputpApellido.classList.remove('error_input');
        inputTipoIDRep.classList.remove('error_input');
        inputIDRep.classList.remove('error_input');
        inputFechaNacimiento.classList.remove('error_input');
        inputEdad.classList.remove('error_input');
        inputCorreoRep.classList.remove('error_input');
        inputClave.classList.remove('error_input');
        inputConfirma.classList.remove('error_input');
        elementGeneroM.classList.remove('error_sexo');
        elementGeneroF.classList.remove('error_sexo');


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
        $('#correoRep').attr('disabled', false).val('');
        $('#txtContrasena').attr('disabled', false).val('');
        $('#txtConfirma').attr('disabled', false).val('');

    });

    $('#Cliente').click(function () {


        inputTipoID.classList.remove('error_input');
        inputID.classList.remove('error_input');
        razonSocial.classList.remove('error_input');
        nombreFantasia.classList.remove('error_input');
        inputCorreo.classList.remove('error_input');
        inputpNombre.classList.remove('error_input');
        inputpApellido.classList.remove('error_input');
        inputTipoIDRep.classList.remove('error_input');
        inputIDRep.classList.remove('error_input');
        inputFechaNacimiento.classList.remove('error_input');
        inputEdad.classList.remove('error_input');
        inputCorreoRep.classList.remove('error_input');
        inputClave.classList.remove('error_input');
        inputConfirma.classList.remove('error_input');
        elementGeneroM.classList.remove('error_sexo');
        elementGeneroF.classList.remove('error_sexo');


        // comente estas lineas SST
        // $('#txtTipoId').attr('disabled', true).val('');
        //  $('#txtID').attr('disabled', true).val('');
        // $('#txtRazonSocial').attr('disabled', true).val('');
        //  $('#txtNombreFantasia').attr('disabled', true).val('');
        //  $('#correo').attr('disabled', true).val('');

        // agregue estas lineas SST
        $('#h1RegUser').text("Registro de Cliente");
        $('#frmUno').addClass('ocultar');
        $('#sectionPrincipal').addClass('ocultarDos');
        $('#frmDos').addClass('ocultarCuatro');
        $('#frmTres').addClass('ocultarCuatro');



        $('#txtNRepLegal').attr('disabled', false).val('');
        $('#txtsNombre').attr('disabled', false).val('');
        $('#txtpApellido').attr('disabled', false).val('');
        $('#txtsApellido').attr('disabled', false).val('');
        $('#txtTipoIdRep').attr('disabled', false).val('');
        $('#txtIDRep').attr('disabled', false).val('');
        $('#Masculino').attr('disabled', false);
        $('#Femenino').attr('disabled', false);
        $('#fechaNacimiento').attr('disabled', false).val('');
        $('#correoRep').attr('disabled', false).val('');
        $('#txtContrasena').attr('disabled', false).val('');
        $('#txtConfirma').attr('disabled', false).val('');

    });

});



// agregue este apartado SST

if (conectado == null) {


    inputTipoID.classList.remove('error_input');
    inputID.classList.remove('error_input');
    razonSocial.classList.remove('error_input');
    nombreFantasia.classList.remove('error_input');
    inputCorreo.classList.remove('error_input');
    inputpNombre.classList.remove('error_input');
    inputpApellido.classList.remove('error_input');
    inputTipoIDRep.classList.remove('error_input');
    inputIDRep.classList.remove('error_input');
    inputFechaNacimiento.classList.remove('error_input');
    inputEdad.classList.remove('error_input');
    inputCorreoRep.classList.remove('error_input');
    inputClave.classList.remove('error_input');
    inputConfirma.classList.remove('error_input');
    elementGeneroM.classList.remove('error_sexo');
    elementGeneroF.classList.remove('error_sexo');



    // $('#txtTipoId').attr('disabled', true).val('');
    //  $('#txtID').attr('disabled', true).val('');
    //  $('#txtRazonSocial').attr('disabled', true).val('');
    //  $('#txtNombreFantasia').attr('disabled', true).val('');
    //   $('#correo').attr('disabled', true).val('');

    $('#h1RegUser').text("Registro de Cliente");
    $('#frmUno').addClass('ocultar');
    $('#sectionPrincipal').addClass('ocultarDos');
    $('.btnRegistrar').addClass('ocultarTres');
    $('#frmDos').addClass('ocultarCuatro');
    $('#frmTres').addClass('ocultarCuatro');



    $('#txtNRepLegal').attr('disabled', false).val('');
    $('#txtsNombre').attr('disabled', false).val('');
    $('#txtpApellido').attr('disabled', false).val('');
    $('#txtsApellido').attr('disabled', false).val('');
    $('#txtTipoIdRep').attr('disabled', false).val('');
    $('#txtIDRep').attr('disabled', false).val('');
    $('#Masculino').attr('disabled', false);
    $('#Femenino').attr('disabled', false);
    $('#fechaNacimiento').attr('disabled', false).val('');
    $('#correoRep').attr('disabled', false).val('');
    $('#txtContrasena').attr('disabled', false).val('');
    $('#txtConfirma').attr('disabled', false).val('');
}

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





