'use strict'

let radioReporte = '';
radioReporte = document.querySelectorAll('#tipo_reportes input[type=radio]');



for (let i = 0; i < radioReporte.length; i++) {
    
    if(radioReporte[i].value == 'Clientes deshabilitados'){
    radioReporte[i].addEventListener('click', mostrarUsersDeshabilitados);    
    }
    if(radioReporte[i].value == 'Clientes habilitados'){
        radioReporte[i].addEventListener('click', mostrarUsersHabilitados); 
    }
    if(radioReporte[i].value == 'Clientes baneados'){
        radioReporte[i].addEventListener('click', mostrarUsersBaneados);
    }
    
}

function reportes(){
    
    let reporte = radioReporte.value;
    
    if(reporte == 'Clientes deshabilitados'){
    mostrarUsersDeshabilitados();
    }
    if(reporte == 'Clientes habilitados'){
    mostrarUsersHabilitados();
    }
};

/*******************************************************************/
/********** Función para mostrar usuarios deshabilitados **********/
/*****************************************************************/

function mostrarUsersDeshabilitados() {

    let listaUsuarios = obtenerUsuarios();

    let tbody = document.querySelector('.tbl_reportes tbody');
    tbody.innerHTML = '';
    let contador = 0;

    for (let i = 0; i < listaUsuarios.length; i++) {
            
        let usuarioD = listaUsuarios[i]['estado'];
        
        if(usuarioD=='Deshabilitado'){

            let fila = tbody.insertRow();

            let celdaNombre = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            let celdaEstado = fila.insertCell();
            celdaNombre.innerHTML = listaUsuarios[i]['pnombre'] + ' ' + listaUsuarios[i]['papellido'];
            celdaCorreo.innerHTML = listaUsuarios[i]['correo']
            celdaEstado.innerHTML = listaUsuarios[i]['estado'];
            contador++;
        }
    }
    if(contador==0){
        let fila = tbody.insertRow();

        let celdaNombre = fila.insertCell();
        let celdaCorreo = fila.insertCell();
        let celdaEstado = fila.insertCell();
        celdaNombre.innerHTML = '**********';
        celdaCorreo.innerHTML = 'No hay usuarios estado deshabilitado en este momento';
        celdaEstado.innerHTML = '**********';
    }
};


/****************************************************************/
/********** Función para mostrar usuarios habilitados **********/
/**************************************************************/

function mostrarUsersHabilitados() {

    let listaUsuarios = obtenerUsuarios();

    let tbody = document.querySelector('.tbl_reportes tbody');
    tbody.innerHTML = '';
    let contador = 0;

    for (let i = 0; i < listaUsuarios.length; i++) {
            
        let usuarioD = listaUsuarios[i]['estado'];
        if(usuarioD=='Habilitado'){

            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            let celdaEstado = fila.insertCell();
            celdaNombre.innerHTML = listaUsuarios[i]['pnombre'] + ' ' + listaUsuarios[i]['papellido'];
            celdaCorreo.innerHTML = listaUsuarios[i]['correo']
            celdaEstado.innerHTML = listaUsuarios[i]['estado'];
            contador++;
        }
    }
    if(contador==0){
        let fila = tbody.insertRow();

        let celdaNombre = fila.insertCell();
        let celdaCorreo = fila.insertCell();
        let celdaEstado = fila.insertCell();
        celdaNombre.innerHTML = '**********';
        celdaCorreo.innerHTML = 'No hay usuarios estado habilitado en este momento';
        celdaEstado.innerHTML = '**********';
    }
};


/*************************************************************/
/********** Función para mostrar usuarios baneados **********/
/***********************************************************/

function mostrarUsersBaneados() {

    let listaUsuarios = obtenerUsuarios();

    let tbody = document.querySelector('.tbl_reportes tbody');
    tbody.innerHTML = '';
    let contador = 0;

    for (let i = 0; i < listaUsuarios.length; i++) {
            
        let usuarioB = listaUsuarios[i]['baneado'];
        if(usuarioB=='Si'){

            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            let celdaEstado = fila.insertCell();
            celdaNombre.innerHTML = listaUsuarios[i]['pnombre'] + ' ' + listaUsuarios[i]['papellido'];
            celdaCorreo.innerHTML = listaUsuarios[i]['correo']
            celdaEstado.innerHTML = 'Baneado';
            contador++;
        }
    }
    if(contador==0){
        let fila = tbody.insertRow();

        let celdaNombre = fila.insertCell();
        let celdaCorreo = fila.insertCell();
        let celdaEstado = fila.insertCell();
        celdaNombre.innerHTML = '**********';
        celdaCorreo.innerHTML = 'No hay usuarios estado baneado en este momento';
        celdaEstado.innerHTML = '**********';
    }
};