'use strict';

const buscaProvincia = document.querySelector('#buscaSelectProvincia');
const buscaCanton = document.querySelector('#buscaSelectCanton');
const buscaDistrito = document.querySelector('#buscaSelectDistrito');

//variables datalist
const bProvincias = document.querySelector('#buscaProvincia');
const bCantones = document.querySelector('#buscaCanton');
const bDistritos = document.querySelector('#buscaDistrito');
//variables para datalist ids
let idBusProvincia = 0;
let idBusCanton = 0;

let dataBusProvincias = obtenerProvincias();
let dataBusCantones = obtenerCantones();
let dataBusDistritos = obtenerDistritos();

function mostrarProvincias() {
    for (let i = 0; i < dataBusProvincias.length; i++) {
        let opcion = new Option(dataBusProvincias[i].nombre);
        opcion.value = dataBusProvincias[i].nombre;
        bProvincias.appendChild(opcion);
    }
};

function mostrarCantones(pidProvincia) {
    bCantones.innerHTML = '';

    for(let i=0; i < dataBusProvincias.length; i++) {
        if(pidProvincia == dataBusProvincias[i].nombre){
            idBusProvincia = dataBusProvincias[i].idProvincia;
        }
    }

    for (let i = 0; i < dataBusCantones.length; i++) {
        if (idBusProvincia == dataBusCantones[i].Provincia_idProvincia) {
            let opcion = new Option(dataBusCantones[i].nombre);
            opcion.value = dataBusCantones[i].nombre;
            bCantones.appendChild(opcion);
        }
    }
};

function mostrarDistritos(pidCanton) {
    bDistritos.innerHTML = '';

    for(let i=0; i < dataBusCantones.length; i++) {
        if(pidCanton == dataBusCantones[i].nombre){
            idBusCanton = dataBusCantones[i].idCanton;
        }
    }

    for (let i = 0; i < dataBusDistritos.length; i++) {
        if (idBusCanton == dataBusDistritos[i].Canton_idCanton){
            let opcion = new Option(dataBusDistritos[i].nombre);
            opcion.value = dataBusDistritos[i].nombre;
            bDistritos.appendChild(opcion);
        }    
    }

};

mostrarProvincias();

buscaProvincia.addEventListener('change', function(){
    mostrarCantones(this.value);
});

buscaCanton.addEventListener('change', function(){
    mostrarDistritos(this.value);
});