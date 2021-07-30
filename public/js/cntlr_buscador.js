'use strict';

const buscaQueHacer = document.querySelector('#buscaQueHacer');
const inputBuscar = document.querySelector('#buscaPrincipal');
const buscaBoton = document.querySelector('#btnBuscar');

buscaBoton.addEventListener('click', queHacer);

function queHacer(){
    let queHacer = buscaQueHacer.value;

    if (queHacer == 'Actividades'){
        window.location.href = "listar_actividades.html";
    } else if (queHacer == 'Lugares') {
        window.location.href = "lugares.html";
    }

};
