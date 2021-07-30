'use strict';

// obtener la info del usuario de la sesión
let dataUsuarios = obtenerUsuarios();
let tipoUsuario = sessionStorage.getItem('tipo_usuario');

//--
const inputBuscarPrincipal = document.querySelector('#buscaInfoPrincipal');

//variables para filtrar x fechas
const botonFiltroFechas = document.querySelector('#btnFiltrarFechas');
const inputFechaInicio = document.querySelector('#buscaFechaUno');
const inputFechaFin = document.querySelector('#buscaFechaDos');

//filtrar x palabras

let listaActividades = obtenerActividades();
let listaActividadesHabilitadas = obtenerActividadesHabilitadas();
let listaActividadesEmpresa = obtenerActividadesEmpresa();


// Funciones para administrar que actividades pueden ver los usuarios
let actividadesHabilitadas = [];
let actividadesConReserva = [];

// Para el usuario tipo CLIENTE
function mostrarActividadesHabilitadas() {

  let filtro = inputBuscarPrincipal.value;
  let contenedorActividades = document.querySelector('#lista-actividades');
  contenedorActividades.innerHTML = '';

  //valores de fechas
  let inicio = inputFechaInicio.value;
  let fin = inputFechaFin.value;

  for (let i = 0; i < listaActividadesHabilitadas.length; i++) {

    if (listaActividadesHabilitadas[i]['tituloActividad'].toLowerCase().includes(filtro.toLowerCase()) || listaActividadesHabilitadas[i]['ubicacionActividad'].toLowerCase().includes(filtro.toLowerCase()) || listaActividadesHabilitadas[i]['palabrasActividad'].toLowerCase().includes(filtro.toLowerCase())) {

      //filtrar por fechas
      if (inicio && fin) {
        let fechasActividades = new Date(listaActividadesHabilitadas[i]['fechaActividad']);
        if (fechasActividades >= new Date(inicio) && fechasActividades <= new Date(fin)) {
          /* 
           * Aqui va una copia de lo que esta en el else
           */

          // 1. crear un div contenedor de toda la info de actividad
          const sectionCardActividad = document.createElement('section');
          let uniqueActivityID = listaActividadesHabilitadas[i]['_id'];
          sectionCardActividad.classList.add('actividad', 'grid-listar', uniqueActivityID);

          // 2. Crear contenedor de la imagen
          const divImgContainer = document.createElement('div');
          divImgContainer.classList.add('imgContainer');

          // 3. Crear la imagen
          const imgURLActividad = document.createElement('img');
          let imgActividad = listaActividadesHabilitadas[i]['fotoActividad'];
          let tituloActividad = listaActividadesHabilitadas[i]['tituloActividad'];
          if (imgActividad) {
            imgURLActividad.src = imgActividad;
            imgURLActividad.alt = tituloActividad;
          } else {
            imgURLActividad.src = '../img/placeholder.png';
            imgURLActividad.alt = tituloActividad;
          }

          // 4. Asociar la img con el card y agregarlos a la seccion
          divImgContainer.appendChild(imgURLActividad);
          sectionCardActividad.appendChild(divImgContainer);

          // 5. Quick info 
          const divQuickInfo = document.createElement('div');
          divQuickInfo.classList.add('quick-info');

          // 6. header activiad
          const headerActividad = document.createElement('h3');
          const headerActividadBtn = document.createElement('button');
          headerActividad.innerText = tituloActividad;
          headerActividadBtn.innerText = 'Ver mas';
          headerActividadBtn.type = 'button';
          //id_actividad se crea en la linea de abajo para guardar el _id de la actividad
          headerActividadBtn.dataset.id_actividad = listaActividadesHabilitadas[i]['_id'];
          headerActividadBtn.addEventListener('click', visualizarActividad);
          divQuickInfo.appendChild(headerActividad);
          divQuickInfo.appendChild(headerActividadBtn);

          // 7. Info de quick info linea 1
          const infoContainer1Actividad = document.createElement('ul');
          const infoLugarActividad = document.createElement('li');
          const infoFechaActividad = document.createElement('li');
          const infoRatingActividad = document.createElement('li')
          let lugarActividad = listaActividadesHabilitadas[i]['ubicacionActividad'];
          let fechaActividad = listaActividadesHabilitadas[i]['fechaActividad'];
          let newFechaActividad = new Date(fechaActividad);
          newFechaActividad = newFechaActividad.toLocaleDateString();

          /****Manuel Delgado****/
          // Rating System
          infoRatingActividad.classList.add('ratingActividad');
          const numberRating = document.createElement('b');
          numberRating.classList.add('rating-number');
          let valueNumberRating = listaActividades[i]['ratingActividad'];
          numberRating.innerText = valueNumberRating;
          infoRatingActividad.appendChild(numberRating);
          let divRating = document.createElement('div');
          divRating.classList.add('rating');

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
          // imprimir
          infoRatingActividad.appendChild(divRating);

          // cont #7
          infoLugarActividad.innerText = 'Lugar:' + ' ' + lugarActividad;
          infoFechaActividad.innerText = 'Fecha:' + ' ' + newFechaActividad;

          infoContainer1Actividad.appendChild(infoLugarActividad);
          infoContainer1Actividad.appendChild(infoFechaActividad);
          infoContainer1Actividad.appendChild(infoRatingActividad);
          /****Manuel Delgado****/

          // 8. Info de quick info linea 2
          const infoContainer2Actividad = document.createElement('ul');
          const infoCostoActividad = document.createElement('li');
          const infoCapacidadActividad = document.createElement('li');
          const infoDisponiblesActividad = document.createElement('li');
          const infoHorarioActividad = document.createElement('li');
          let costoActividad = listaActividadesHabilitadas[i]['costoActividad'];
          let capacidadActividad = listaActividadesHabilitadas[i]['capacidadParticipantesActividad'];
          let cupoActividad = listaActividadesHabilitadas[i]['cupoActividad'];
          let monedaActividad = listaActividadesHabilitadas[i]['monedaActividad'];
          let costoActividadColones = costoActividad.toLocaleString('es');
          let costoActividadDolares = costoActividad.toLocaleString('en');
          let horarioActividadInicio = listaActividadesHabilitadas[i]['horaInicioActividad'];
          let horarioActividadFinal = listaActividadesHabilitadas[i]['horaFinActividad'];

          if (monedaActividad == 'Colones') {
            monedaActividad = '₡';
            costoActividad = costoActividadColones;
          } else {
            monedaActividad = '$'
            costoActividad = costoActividadDolares;
          }

          if (costoActividad > 0) {
            infoCostoActividad.innerText = 'Precio:' + ' ' + monedaActividad + ' ' + costoActividad;
          } else {
            infoCostoActividad.innerText = 'Precio: Gratis';
          }
          infoCapacidadActividad.innerText = 'Cupo:' + ' ' + capacidadActividad.toLocaleString('es');
          infoDisponiblesActividad.innerHTML = 'Disponible:' + ' ' + cupoActividad.toLocaleString('es');
          infoHorarioActividad.innerText = 'Horario:' + ' ' + horarioActividadInicio + ' a ' + horarioActividadFinal;

          infoContainer2Actividad.appendChild(infoCostoActividad);
          infoContainer2Actividad.appendChild(infoCapacidadActividad);
          infoContainer2Actividad.appendChild(infoDisponiblesActividad);
          infoContainer2Actividad.appendChild(infoHorarioActividad);


          const infoDescripcionActividad = document.createElement('p');
          const infoRazonDeshabilitar = document.createElement('p');
          let descripcionActividad = listaActividadesHabilitadas[i]['descripcionActividad'];
          infoDescripcionActividad.innerText = descripcionActividad;
          let razonDeshabilitar = listaActividadesHabilitadas[i]['razonDeshabilitar'];
          if (razonDeshabilitar) {
            infoRazonDeshabilitar.innerText = razonDeshabilitar;
          }

          // 9. Info de quick info linea 3
          const infoContainer3Actividad = document.createElement('ul');
          const infoCategoriaActividad = document.createElement('li');
          let categoriaActividad = listaActividadesHabilitadas[i]['categoriaActividad'];

          infoCategoriaActividad.innerText = 'Categoría:' + ' ' + categoriaActividad.split(',').join(', ');
          infoContainer3Actividad.appendChild(infoCategoriaActividad);

          // Opciones
          const divOpciones = document.createElement('div');
          divOpciones.classList.add('Opciones');
          const formOpciones = document.createElement('form');
          formOpciones.classList.add('formOpciones');
          const headerOpciones = document.createElement('h4');
          headerOpciones.innerText = 'Opciones';
          const listaOpciones = document.createElement('ul');
          listaOpciones.classList.add('menuOpciones');


          // Reservar
          let actividadesReservadas = listaActividadesReservadas();
          let idsReservaciones = listaIdsReservaciones();

          const itemOpcionReservar = document.createElement('li');
          const itemOpcionCancelarReserva = document.createElement('li');
          const inputReservar = document.createElement('input');
          const inputCancelarReserva = document.createElement('input');
          const inputReservarLabel = document.createElement('label');
          const labelCancelarReserva = document.createElement('label');


          //_____________ Empieza Logica para determinar que poner en Opciones

          for (let j = 0; j < listaActividadesHabilitadas.length; j++) {
            let actividadesHabilitadasItem = listaActividadesHabilitadas[j]['_id'];
            let actividadesReservadasItem = actividadesReservadas[j];
            actividadesHabilitadas.push(actividadesHabilitadasItem);
            actividadesConReserva.push(actividadesReservadasItem);

          }

          function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }

          // Filtrar los valores unicos
          let actividadesConReservaU = actividadesConReserva.filter(onlyUnique);

          function hayReserva() {
            let hayReservaSi = 0;
            let hayReservaNo = 0;
            let hayReservaResultado = 0;
            for (let j = 0; j < actividadesConReservaU.length; j++) {

              if (actividadesConReservaU[j] === listaActividadesHabilitadas[i]['_id']) {
                hayReservaSi = 1;
              } else {
                hayReservaNo = 0;
              }
              hayReservaResultado = (hayReservaNo + hayReservaSi);
            }
            return hayReservaResultado;
          };

          let hayReservaRespuesta = hayReserva();
          console.log(hayReservaRespuesta);

          if (cupoActividad === 0 && hayReservaRespuesta === 0) {
            // No ya cupos disponibles para reserva
            const itemNoCupos = document.createElement('li');
            itemNoCupos.innerText = 'No hay más cupos disponibles para reservar.';
            itemNoCupos.classList.add('no-cupos');
            listaOpciones.appendChild(itemNoCupos);

          } else if (hayReservaRespuesta === 1 && cupoActividad === 0) {

            // No ya cupos disponibles para reserva
            const itemNoCupos = document.createElement('li');
            itemNoCupos.innerText = 'No hay más cupos disponibles para reservar.';
            itemNoCupos.classList.add('no-cupos');
            listaOpciones.appendChild(itemNoCupos);

            // Cancelar Reserva
            listaOpciones.appendChild(itemOpcionCancelarReserva);
            itemOpcionCancelarReserva.appendChild(inputCancelarReserva);
            itemOpcionCancelarReserva.appendChild(labelCancelarReserva);

            inputCancelarReserva.dataset.id_actividad = uniqueActivityID;
            inputCancelarReserva.name = 'opcionCancelarReserva';
            inputCancelarReserva.value = 'Cancelar_Reserva';
            inputCancelarReserva.checked = 'checked';
            labelCancelarReserva.innerText = 'Cancelar Reserva';
            inputCancelarReserva.addEventListener('click',
              cancelarReserva);

            // inputCancelarReserva.dataset.id_reservacion = idsReservaciones[j];
            itemOpcionCancelarReserva.classList.add('opcionCancelarReserva');
            inputCancelarReserva.type = 'checkbox';

          } else {

            if (hayReservaRespuesta === 0) {

              // Reservar
              listaOpciones.appendChild(itemOpcionReservar);
              itemOpcionReservar.appendChild(inputReservar);
              itemOpcionReservar.appendChild(inputReservarLabel);
              itemOpcionReservar.classList.add('opcionReservar');

              inputReservar.dataset.id_actividad = uniqueActivityID;
              inputReservar.type = 'checkbox';
              inputReservar.name = 'opcionReservar';
              inputReservar.value = 'Reservar';
              inputReservarLabel.innerText = 'Reservar';
              inputReservar.addEventListener('click', reservar);

            } else if (hayReservaRespuesta === 1) {

              // Cancelar Reserva
              listaOpciones.appendChild(itemOpcionCancelarReserva);
              itemOpcionCancelarReserva.appendChild(inputCancelarReserva);
              itemOpcionCancelarReserva.appendChild(labelCancelarReserva);

              inputCancelarReserva.dataset.id_actividad = uniqueActivityID;
              inputCancelarReserva.name = 'opcionCancelarReserva';
              inputCancelarReserva.value = 'Cancelar_Reserva';
              inputCancelarReserva.checked = 'checked';
              labelCancelarReserva.innerText = 'Cancelar Reserva';
              inputCancelarReserva.addEventListener('click', cancelarReserva);

              // inputCancelarReserva.dataset.id_reservacion = idsReservaciones[j];
              itemOpcionCancelarReserva.classList.add('opcionCancelarReserva');
              inputCancelarReserva.type = 'checkbox';
            }
          }
          //_____________ Termina Logica para determinar que poner en Opciones


          //------
          divOpciones.appendChild(formOpciones);
          formOpciones.appendChild(headerOpciones);
          formOpciones.appendChild(listaOpciones);

          // Ultimo paso para que salga el contenido
          sectionCardActividad.appendChild(divQuickInfo);
          divQuickInfo.appendChild(infoContainer1Actividad);
          divQuickInfo.appendChild(infoContainer2Actividad);
          divQuickInfo.appendChild(infoContainer3Actividad);
          divQuickInfo.appendChild(infoDescripcionActividad);
          sectionCardActividad.appendChild(divOpciones);
          contenedorActividades.appendChild(sectionCardActividad);

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
      } else {
        // 1. crear un div contenedor de toda la info de actividad
        const sectionCardActividad = document.createElement('section');
        let uniqueActivityID = listaActividadesHabilitadas[i]['_id'];
        sectionCardActividad.classList.add('actividad', 'grid-listar', uniqueActivityID);

        // 2. Crear contenedor de la imagen
        const divImgContainer = document.createElement('div');
        divImgContainer.classList.add('imgContainer');

        // 3. Crear la imagen
        const imgURLActividad = document.createElement('img');
        let imgActividad = listaActividadesHabilitadas[i]['fotoActividad'];
        let tituloActividad = listaActividadesHabilitadas[i]['tituloActividad'];
        if (imgActividad) {
          imgURLActividad.src = imgActividad;
          imgURLActividad.alt = tituloActividad;
        } else {
          imgURLActividad.src = '../img/placeholder.png';
          imgURLActividad.alt = tituloActividad;
        }

        // 4. Asociar la img con el card y agregarlos a la seccion
        divImgContainer.appendChild(imgURLActividad);
        sectionCardActividad.appendChild(divImgContainer);

        // 5. Quick info 
        const divQuickInfo = document.createElement('div');
        divQuickInfo.classList.add('quick-info');

        // 6. header activiad
        const headerActividad = document.createElement('h3');
        const headerActividadBtn = document.createElement('button');
        headerActividad.innerText = tituloActividad;
        headerActividadBtn.innerText = 'Ver mas';
        headerActividadBtn.type = 'button';
        //id_actividad se crea en la linea de abajo para guardar el _id de la actividad
        headerActividadBtn.dataset.id_actividad = listaActividadesHabilitadas[i]['_id'];
        headerActividadBtn.addEventListener('click', visualizarActividad);
        divQuickInfo.appendChild(headerActividad);
        divQuickInfo.appendChild(headerActividadBtn);

        // 7. Info de quick info linea 1
        const infoContainer1Actividad = document.createElement('ul');
        const infoLugarActividad = document.createElement('li');
        const infoFechaActividad = document.createElement('li');
        const infoRatingActividad = document.createElement('li')
        let lugarActividad = listaActividadesHabilitadas[i]['ubicacionActividad'];
        let fechaActividad = listaActividadesHabilitadas[i]['fechaActividad'];
        let newFechaActividad = new Date(fechaActividad);
        newFechaActividad = newFechaActividad.toLocaleDateString();

        /****Manuel Delgado****/
        // Rating System
        infoRatingActividad.classList.add('ratingActividad');
        const numberRating = document.createElement('b');
        numberRating.classList.add('rating-number');
        let valueNumberRating = listaActividades[i]['ratingActividad'];
        numberRating.innerText = valueNumberRating;
        infoRatingActividad.appendChild(numberRating);
        let divRating = document.createElement('div');
        divRating.classList.add('rating');

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
        // imprimir
        infoRatingActividad.appendChild(divRating);

        // cont #7
        infoLugarActividad.innerText = 'Lugar:' + ' ' + lugarActividad;
        infoFechaActividad.innerText = 'Fecha:' + ' ' + newFechaActividad;

        infoContainer1Actividad.appendChild(infoLugarActividad);
        infoContainer1Actividad.appendChild(infoFechaActividad);
        infoContainer1Actividad.appendChild(infoRatingActividad);
        /****Manuel Delgado****/

        // 8. Info de quick info linea 2
        const infoContainer2Actividad = document.createElement('ul');
        const infoCostoActividad = document.createElement('li');
        const infoCapacidadActividad = document.createElement('li');
        const infoDisponiblesActividad = document.createElement('li');
        const infoHorarioActividad = document.createElement('li');
        let costoActividad = listaActividadesHabilitadas[i]['costoActividad'];
        let capacidadActividad = listaActividadesHabilitadas[i]['capacidadParticipantesActividad'];
        let cupoActividad = listaActividadesHabilitadas[i]['cupoActividad'];
        let monedaActividad = listaActividadesHabilitadas[i]['monedaActividad'];
        let costoActividadColones = costoActividad.toLocaleString('es');
        let costoActividadDolares = costoActividad.toLocaleString('en');
        let horarioActividadInicio = listaActividadesHabilitadas[i]['horaInicioActividad'];
        let horarioActividadFinal = listaActividadesHabilitadas[i]['horaFinActividad'];

        if (monedaActividad == 'Colones') {
          monedaActividad = '₡';
          costoActividad = costoActividadColones;
        } else {
          monedaActividad = '$'
          costoActividad = costoActividadDolares;
        }

        if (costoActividad > 0) {
          infoCostoActividad.innerText = 'Precio:' + ' ' + monedaActividad + ' ' + costoActividad;
        } else {
          infoCostoActividad.innerText = 'Precio: Gratis';
        }
        infoCapacidadActividad.innerText = 'Cupo:' + ' ' + capacidadActividad.toLocaleString('es');
        infoDisponiblesActividad.innerHTML = 'Disponible:' + ' ' + cupoActividad.toLocaleString('es');
        infoHorarioActividad.innerText = 'Horario:' + ' ' + horarioActividadInicio + ' a ' + horarioActividadFinal;

        infoContainer2Actividad.appendChild(infoCostoActividad);
        infoContainer2Actividad.appendChild(infoCapacidadActividad);
        infoContainer2Actividad.appendChild(infoDisponiblesActividad);
        infoContainer2Actividad.appendChild(infoHorarioActividad);


        const infoDescripcionActividad = document.createElement('p');
        const infoRazonDeshabilitar = document.createElement('p');
        let descripcionActividad = listaActividadesHabilitadas[i]['descripcionActividad'];
        infoDescripcionActividad.innerText = descripcionActividad;
        let razonDeshabilitar = listaActividadesHabilitadas[i]['razonDeshabilitar'];
        if (razonDeshabilitar) {
          infoRazonDeshabilitar.innerText = razonDeshabilitar;
        }

        // 9. Info de quick info linea 3
        const infoContainer3Actividad = document.createElement('ul');
        const infoCategoriaActividad = document.createElement('li');
        let categoriaActividad = listaActividadesHabilitadas[i]['categoriaActividad'];

        infoCategoriaActividad.innerText = 'Categoría:' + ' ' + categoriaActividad.split(',').join(', ');
        infoContainer3Actividad.appendChild(infoCategoriaActividad);

        // Opciones
        const divOpciones = document.createElement('div');
        divOpciones.classList.add('Opciones');
        const formOpciones = document.createElement('form');
        formOpciones.classList.add('formOpciones');
        const headerOpciones = document.createElement('h4');
        headerOpciones.innerText = 'Opciones';
        const listaOpciones = document.createElement('ul');
        listaOpciones.classList.add('menuOpciones');


        // Reservar
        let actividadesReservadas = listaActividadesReservadas();
        let idsReservaciones = listaIdsReservaciones();

        const itemOpcionReservar = document.createElement('li');
        const itemOpcionCancelarReserva = document.createElement('li');
        const inputReservar = document.createElement('input');
        const inputCancelarReserva = document.createElement('input');
        const inputReservarLabel = document.createElement('label');
        const labelCancelarReserva = document.createElement('label');


        //_____________ Empieza Logica para determinar que poner en Opciones

        for (let j = 0; j < listaActividadesHabilitadas.length; j++) {
          let actividadesHabilitadasItem = listaActividadesHabilitadas[j]['_id'];
          let actividadesReservadasItem = actividadesReservadas[j];
          actividadesHabilitadas.push(actividadesHabilitadasItem);
          actividadesConReserva.push(actividadesReservadasItem);

        }

        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }

        // Filtrar los valores unicos
        let actividadesConReservaU = actividadesConReserva.filter(onlyUnique);

        function hayReserva() {
          let hayReservaSi = 0;
          let hayReservaNo = 0;
          let hayReservaResultado = 0;
          for (let j = 0; j < actividadesConReservaU.length; j++) {

            if (actividadesConReservaU[j] === listaActividadesHabilitadas[i]['_id']) {
              hayReservaSi = 1;
            } else {
              hayReservaNo = 0;
            }
            hayReservaResultado = (hayReservaNo + hayReservaSi);
          }
          return hayReservaResultado;
        };

        let hayReservaRespuesta = hayReserva();
        console.log(hayReservaRespuesta);

        if (cupoActividad === 0 && hayReservaRespuesta === 0) {
          // No ya cupos disponibles para reserva
          const itemNoCupos = document.createElement('li');
          itemNoCupos.innerText = 'No hay más cupos disponibles para reservar.';
          itemNoCupos.classList.add('no-cupos');
          listaOpciones.appendChild(itemNoCupos);

        } else if (hayReservaRespuesta === 1 && cupoActividad === 0) {

          // No ya cupos disponibles para reserva
          const itemNoCupos = document.createElement('li');
          itemNoCupos.innerText = 'No hay más cupos disponibles para reservar.';
          itemNoCupos.classList.add('no-cupos');
          listaOpciones.appendChild(itemNoCupos);

          // Cancelar Reserva
          listaOpciones.appendChild(itemOpcionCancelarReserva);
          itemOpcionCancelarReserva.appendChild(inputCancelarReserva);
          itemOpcionCancelarReserva.appendChild(labelCancelarReserva);

          inputCancelarReserva.dataset.id_actividad = uniqueActivityID;
          inputCancelarReserva.name = 'opcionCancelarReserva';
          inputCancelarReserva.value = 'Cancelar_Reserva';
          inputCancelarReserva.checked = 'checked';
          labelCancelarReserva.innerText = 'Cancelar Reserva';
          inputCancelarReserva.addEventListener('click',
            cancelarReserva);

          // inputCancelarReserva.dataset.id_reservacion = idsReservaciones[j];
          itemOpcionCancelarReserva.classList.add('opcionCancelarReserva');
          inputCancelarReserva.type = 'checkbox';

        } else {

          if (hayReservaRespuesta === 0) {

            // Reservar
            listaOpciones.appendChild(itemOpcionReservar);
            itemOpcionReservar.appendChild(inputReservar);
            itemOpcionReservar.appendChild(inputReservarLabel);
            itemOpcionReservar.classList.add('opcionReservar');

            inputReservar.dataset.id_actividad = uniqueActivityID;
            inputReservar.type = 'checkbox';
            inputReservar.name = 'opcionReservar';
            inputReservar.value = 'Reservar';
            inputReservarLabel.innerText = 'Reservar';
            inputReservar.addEventListener('click', reservar);

          } else if (hayReservaRespuesta === 1) {

            // Cancelar Reserva
            listaOpciones.appendChild(itemOpcionCancelarReserva);
            itemOpcionCancelarReserva.appendChild(inputCancelarReserva);
            itemOpcionCancelarReserva.appendChild(labelCancelarReserva);

            inputCancelarReserva.dataset.id_actividad = uniqueActivityID;
            inputCancelarReserva.name = 'opcionCancelarReserva';
            inputCancelarReserva.value = 'Cancelar_Reserva';
            inputCancelarReserva.checked = 'checked';
            labelCancelarReserva.innerText = 'Cancelar Reserva';
            inputCancelarReserva.addEventListener('click', cancelarReserva);

            // inputCancelarReserva.dataset.id_reservacion = idsReservaciones[j];
            itemOpcionCancelarReserva.classList.add('opcionCancelarReserva');
            inputCancelarReserva.type = 'checkbox';
          }
        }
        //_____________ Termina Logica para determinar que poner en Opciones


        //------
        divOpciones.appendChild(formOpciones);
        formOpciones.appendChild(headerOpciones);
        formOpciones.appendChild(listaOpciones);

        // Ultimo paso para que salga el contenido
        sectionCardActividad.appendChild(divQuickInfo);
        divQuickInfo.appendChild(infoContainer1Actividad);
        divQuickInfo.appendChild(infoContainer2Actividad);
        divQuickInfo.appendChild(infoContainer3Actividad);
        divQuickInfo.appendChild(infoDescripcionActividad);
        sectionCardActividad.appendChild(divOpciones);
        contenedorActividades.appendChild(sectionCardActividad);

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
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  // Filtrar los valores unicos
  let actividadesHabilitadasU = actividadesHabilitadas.filter(onlyUnique);
  let actividadesConReservaU = actividadesConReserva.filter(onlyUnique);

  // Eliminar los "undefined"
  actividadesHabilitadasU = actividadesHabilitadasU.filter(function (actividadesHabilitadasU) {
    return actividadesHabilitadasU !== undefined;
  });

  actividadesConReservaU = actividadesConReservaU.filter(function (actividadesConReservaU) {
    return actividadesConReservaU !== undefined;
  });

  actividadesHabilitadas = actividadesHabilitadasU;
  actividadesConReserva = actividadesConReservaU;
};

// Para el usuario tipo EMPRESA
function mostrarActividades() {
    let filtro = inputBuscarPrincipal.value;
  let contenedorActividades = document.querySelector('#lista-actividades');
  contenedorActividades.innerHTML = '';

  //valores de fechas
  let inicio = inputFechaInicio.value;
  let fin = inputFechaFin.value;


  for (let i = 0; i < listaActividadesEmpresa.length; i++) {
    if (listaActividadesEmpresa[i]['tituloActividad'].toLowerCase().includes(filtro.toLowerCase()) || listaActividadesEmpresa[i]['ubicacionActividad'].toLowerCase().includes(filtro.toLowerCase()) || listaActividadesEmpresa[i]['palabrasActividad'].toLowerCase().includes(filtro.toLowerCase())) {

      //filtrar por fechas
      if (inicio && fin) {
        let fechasActividades = new Date(listaActividadesEmpresa[i]['fechaActividad']);
        if (fechasActividades >= new Date(inicio) && fechasActividades <= new Date(fin)) {
          /* 
           * Aqui va una copia de lo que esta en el else
           */

          // 1. crear un div contenedor de toda la info de actividad
          const sectionCardActividad = document.createElement('section');
          let uniqueActivityID = listaActividadesEmpresa[i]['_id'];
          sectionCardActividad.classList.add('actividad', 'grid-listar', uniqueActivityID);

          // 2. Crear contenedor de la imagen
          const divImgContainer = document.createElement('div');
          divImgContainer.classList.add('imgContainer');

          // 3. Crear la imagen
          const imgURLActividad = document.createElement('img');
          let imgActividad = listaActividadesEmpresa[i]['fotoActividad'];
          let tituloActividad = listaActividadesEmpresa[i]['tituloActividad'];
          if (imgActividad) {
            imgURLActividad.src = imgActividad;
            imgURLActividad.alt = tituloActividad;
          } else {
            imgURLActividad.src = '../img/placeholder.png';
            imgURLActividad.alt = tituloActividad;
          }

          // 4. Asociar la img con el card y agregarlos a la seccion
          divImgContainer.appendChild(imgURLActividad);
          sectionCardActividad.appendChild(divImgContainer);

          // 5. Quick info 
          const divQuickInfo = document.createElement('div');
          divQuickInfo.classList.add('quick-info');

          // 6. header activiad
          const headerActividad = document.createElement('h3');
          const headerActividadBtn = document.createElement('button');
          headerActividad.innerText = tituloActividad;
          headerActividadBtn.innerText = 'Ver más';
          headerActividadBtn.type = 'button';
          //id_actividad se crea en la linea de abajo para guardar el _id de la actividad
          headerActividadBtn.dataset.id_actividad = listaActividadesEmpresa[i]['_id'];
          headerActividadBtn.addEventListener('click', visualizarActividad);
          divQuickInfo.appendChild(headerActividad);
          divQuickInfo.appendChild(headerActividadBtn);

          // 7. Info de quick info linea 1
          const infoContainer1Actividad = document.createElement('ul');
          const infoLugarActividad = document.createElement('li');
          const infoFechaActividad = document.createElement('li');
          const infoRatingActividad = document.createElement('li')
          let lugarActividad = listaActividadesEmpresa[i]['ubicacionActividad'];
          let fechaActividad = listaActividadesEmpresa[i]['fechaActividad'];
          let newFechaActividad = new Date(fechaActividad);
          newFechaActividad = newFechaActividad.toLocaleDateString();

          /****Manuel Delgado****/
          // Rating System
          infoRatingActividad.classList.add('ratingActividad');
          const numberRating = document.createElement('b');
          numberRating.classList.add('rating-number');
          let valueNumberRating = listaActividades[i]['ratingActividad'];
          numberRating.innerText = valueNumberRating;
          infoRatingActividad.appendChild(numberRating);
          let divRating = document.createElement('div');
          divRating.classList.add('rating');

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
          // imprimir
          infoRatingActividad.appendChild(divRating);

          // cont #7
          infoLugarActividad.innerText = 'Lugar:' + ' ' + lugarActividad;
          infoFechaActividad.innerText = 'Fecha:' + ' ' + newFechaActividad;

          infoContainer1Actividad.appendChild(infoLugarActividad);
          infoContainer1Actividad.appendChild(infoFechaActividad);
          infoContainer1Actividad.appendChild(infoRatingActividad);
          /****Manuel Delgado****/

          // 8. Info de quick info linea 2
          const infoContainer2Actividad = document.createElement('ul');
          // const infoCategoriaActividad = document.createElement('li');
          const infoCostoActividad = document.createElement('li');
          const infoCapacidadActividad = document.createElement('li');
          const infoDisponiblesActividad = document.createElement('li');
          const infoHorarioActividad = document.createElement('li');
          // let categoriaActividad = listaActividadesEmpresa[i]['categoriaActividad'];
          let costoActividad = listaActividadesEmpresa[i]['costoActividad'];
          let capacidadActividad = listaActividadesEmpresa[i]['capacidadParticipantesActividad'];
          let cupoActividad = listaActividadesEmpresa[i]['cupoActividad'];
          let monedaActividad = listaActividadesEmpresa[i]['monedaActividad'];
          let costoActividadColones = costoActividad.toLocaleString('es');
          let costoActividadDolares = costoActividad.toLocaleString('en');
          let horarioActividadInicio = listaActividadesHabilitadas[i]['horaInicioActividad'];
          let horarioActividadFinal = listaActividadesHabilitadas[i]['horaFinActividad'];

          if (monedaActividad == 'Colones') {
            monedaActividad = '₡';
            costoActividad = costoActividadColones;
          } else {
            monedaActividad = '$'
            costoActividad = costoActividadDolares;
          }

          // infoCategoriaActividad.innerText = 'Categoría:' + ' ' + categoriaActividad;
          if (costoActividad > 0) {
            infoCostoActividad.innerText = 'Precio:' + ' ' + monedaActividad + ' ' + costoActividad;
          } else {
            infoCostoActividad.innerText = 'Precio: Gratis';
          }
          infoCapacidadActividad.innerText = 'Cupo:' + ' ' + capacidadActividad.toLocaleString('es');
          infoDisponiblesActividad.innerHTML = 'Disponible:' + ' ' + cupoActividad.toLocaleString('es');
          infoHorarioActividad.innerText = 'Horario:' + ' ' + horarioActividadInicio + ' a ' + horarioActividadFinal;

          // infoContainer2Actividad.appendChild(infoCategoriaActividad);
          infoContainer2Actividad.appendChild(infoCostoActividad);
          infoContainer2Actividad.appendChild(infoCapacidadActividad);
          infoContainer2Actividad.appendChild(infoDisponiblesActividad);
          infoContainer2Actividad.appendChild(infoHorarioActividad);


          const infoDescripcionActividad = document.createElement('p');
          const infoRazonDeshabilitar = document.createElement('p');
          let descripcionActividad = listaActividadesEmpresa[i]['descripcionActividad'];
          infoDescripcionActividad.innerText = descripcionActividad;
          let razonDeshabilitar = listaActividadesEmpresa[i]['razonDeshabilitar'];
          if (razonDeshabilitar) {
            infoRazonDeshabilitar.innerText = razonDeshabilitar;
          }

          // 9. Info de quick info linea 3
          const infoContainer3Actividad = document.createElement('ul');
          const infoCategoriaActividad = document.createElement('li');
          let categoriaActividad = listaActividadesEmpresa[i]['categoriaActividad'];

          infoCategoriaActividad.innerText = 'Categoría:' + ' ' + categoriaActividad.split(',').join(', ');;
          infoContainer3Actividad.appendChild(infoCategoriaActividad);

          // Opciones
          const divOpciones = document.createElement('div');
          divOpciones.classList.add('Opciones');
          const formOpciones = document.createElement('form');
          formOpciones.classList.add('formOpciones');
          const headerOpciones = document.createElement('h4');
          headerOpciones.innerText = 'Opciones';
          const listaOpciones = document.createElement('ul');
          listaOpciones.classList.add('menuOpciones');

          // Habilitar y Deshabilitar
          const itemOpcionEstado = document.createElement('li');
          itemOpcionEstado.classList.add('opcionEstado');
          const inputEstado = document.createElement('input');
          const inputEstadoLabel = document.createElement('label');
          inputEstado.type = 'checkbox';
          if (listaActividadesEmpresa[i]['estado'] == 'habilitada') {
            inputEstado.name = 'opcionDeshabilitar';
            inputEstado.value = 'Deshabilitar';
            inputEstadoLabel.classList.add('habilitada');
            inputEstadoLabel.innerText = 'Habilitada';
            inputEstado.addEventListener('click', deshabilitarActividad);
          } else {
            inputEstado.name = 'opcionHabilitar';
            inputEstado.value = 'Habilitar';
            inputEstadoLabel.classList.add('deshabilitada');
            inputEstado.checked = true;
            inputEstadoLabel.innerText = 'Deshabilitada';
            inputEstado.addEventListener('click', habilitarActividad);
          }
          listaOpciones.appendChild(itemOpcionEstado);
          itemOpcionEstado.appendChild(inputEstado);
          itemOpcionEstado.appendChild(inputEstadoLabel);
          inputEstado.dataset.id_actividad = listaActividadesEmpresa[i]['_id'];

          // Editar
          const itemOpcionEditar = document.createElement('li');
          itemOpcionEditar.classList.add('opcionEditar');
          listaOpciones.appendChild(itemOpcionEditar);
          const opcionesEditar = document.createElement('a');
          itemOpcionEditar.appendChild(opcionesEditar);
          opcionesEditar.href = '#';
          opcionesEditar.classList.add('btn-uno');
          opcionesEditar.innerText = 'Editar';
          opcionesEditar.dataset.id_actividad = listaActividadesEmpresa[i]['_id'];
          opcionesEditar.addEventListener('click', mostarDatosEditarActividad);

          // Borrar
          const itemOpcionBorrar = document.createElement('li');
          itemOpcionBorrar.classList.add('opcionBorrar');
          listaOpciones.appendChild(itemOpcionBorrar);
          const opcionesBorrar = document.createElement('a');
          itemOpcionBorrar.appendChild(opcionesBorrar);
          opcionesBorrar.href = '#';
          opcionesBorrar.classList.add('btn-uno');
          opcionesBorrar.innerText = 'Borrar';
          opcionesBorrar.dataset.id_actividad = listaActividadesEmpresa[i]['_id'];
          opcionesBorrar.addEventListener('click', confirmarBorradoActividad);

          //------
          divOpciones.appendChild(formOpciones);
          formOpciones.appendChild(headerOpciones);
          formOpciones.appendChild(listaOpciones);

          // Ultimo paso para que salga el contenido
          sectionCardActividad.appendChild(divQuickInfo);
          divQuickInfo.appendChild(infoContainer1Actividad);
          divQuickInfo.appendChild(infoContainer2Actividad);
          divQuickInfo.appendChild(infoContainer3Actividad);
          divQuickInfo.appendChild(infoDescripcionActividad);
          sectionCardActividad.appendChild(divOpciones);
          contenedorActividades.appendChild(sectionCardActividad);

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
      } else {
        // 1. crear un div contenedor de toda la info de actividad
        const sectionCardActividad = document.createElement('section');
        let uniqueActivityID = listaActividadesEmpresa[i]['_id'];
        sectionCardActividad.classList.add('actividad', 'grid-listar', uniqueActivityID);

        // 2. Crear contenedor de la imagen
        const divImgContainer = document.createElement('div');
        divImgContainer.classList.add('imgContainer');

        // 3. Crear la imagen
        const imgURLActividad = document.createElement('img');
        let imgActividad = listaActividadesEmpresa[i]['fotoActividad'];
        let tituloActividad = listaActividadesEmpresa[i]['tituloActividad'];
        if (imgActividad) {
          imgURLActividad.src = imgActividad;
          imgURLActividad.alt = tituloActividad;
        } else {
          imgURLActividad.src = '../img/placeholder.png';
          imgURLActividad.alt = tituloActividad;
        }

        // 4. Asociar la img con el card y agregarlos a la seccion
        divImgContainer.appendChild(imgURLActividad);
        sectionCardActividad.appendChild(divImgContainer);

        // 5. Quick info 
        const divQuickInfo = document.createElement('div');
        divQuickInfo.classList.add('quick-info');

        // 6. header activiad
        const headerActividad = document.createElement('h3');
        const headerActividadBtn = document.createElement('button');
        headerActividad.innerText = tituloActividad;
        headerActividadBtn.innerText = 'Ver más';
        headerActividadBtn.type = 'button';
        //id_actividad se crea en la linea de abajo para guardar el _id de la actividad
        headerActividadBtn.dataset.id_actividad = listaActividadesEmpresa[i]['_id'];
        headerActividadBtn.addEventListener('click', visualizarActividad);
        divQuickInfo.appendChild(headerActividad);
        divQuickInfo.appendChild(headerActividadBtn);

        // 7. Info de quick info linea 1
        const infoContainer1Actividad = document.createElement('ul');
        const infoLugarActividad = document.createElement('li');
        const infoFechaActividad = document.createElement('li');
        const infoRatingActividad = document.createElement('li')
        let lugarActividad = listaActividadesEmpresa[i]['ubicacionActividad'];
        let fechaActividad = listaActividadesEmpresa[i]['fechaActividad'];
        let newFechaActividad = new Date(fechaActividad);
        newFechaActividad = newFechaActividad.toLocaleDateString();

        /****Manuel Delgado****/
        // Rating System
        infoRatingActividad.classList.add('ratingActividad');
        const numberRating = document.createElement('b');
        numberRating.classList.add('rating-number');
        let valueNumberRating = listaActividades[i]['ratingActividad'];
        numberRating.innerText = valueNumberRating;
        infoRatingActividad.appendChild(numberRating);
        let divRating = document.createElement('div');
        divRating.classList.add('rating');

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
        // imprimir
        infoRatingActividad.appendChild(divRating);

        // cont #7
        infoLugarActividad.innerText = 'Lugar:' + ' ' + lugarActividad;
        infoFechaActividad.innerText = 'Fecha:' + ' ' + newFechaActividad;

        infoContainer1Actividad.appendChild(infoLugarActividad);
        infoContainer1Actividad.appendChild(infoFechaActividad);
        infoContainer1Actividad.appendChild(infoRatingActividad);
        /****Manuel Delgado****/

        // 8. Info de quick info linea 2
        const infoContainer2Actividad = document.createElement('ul');
        // const infoCategoriaActividad = document.createElement('li');
        const infoCostoActividad = document.createElement('li');
        const infoCapacidadActividad = document.createElement('li');
        const infoDisponiblesActividad = document.createElement('li');
        const infoHorarioActividad = document.createElement('li');
        // let categoriaActividad = listaActividadesEmpresa[i]['categoriaActividad'];
        let costoActividad = listaActividadesEmpresa[i]['costoActividad'];
        let capacidadActividad = listaActividadesEmpresa[i]['capacidadParticipantesActividad'];
        let cupoActividad = listaActividadesEmpresa[i]['cupoActividad'];
        let monedaActividad = listaActividadesEmpresa[i]['monedaActividad'];
        let costoActividadColones = costoActividad.toLocaleString('es');
        let costoActividadDolares = costoActividad.toLocaleString('en');
        let horarioActividadInicio = listaActividadesHabilitadas[i]['horaInicioActividad'];
        let horarioActividadFinal = listaActividadesHabilitadas[i]['horaFinActividad'];

        if (monedaActividad == 'Colones') {
          monedaActividad = '₡';
          costoActividad = costoActividadColones;
        } else {
          monedaActividad = '$'
          costoActividad = costoActividadDolares;
        }

        // infoCategoriaActividad.innerText = 'Categoría:' + ' ' + categoriaActividad;
        if (costoActividad > 0) {
          infoCostoActividad.innerText = 'Precio:' + ' ' + monedaActividad + ' ' + costoActividad;
        } else {
          infoCostoActividad.innerText = 'Precio: Gratis';
        }
        infoCapacidadActividad.innerText = 'Cupo:' + ' ' + capacidadActividad.toLocaleString('es');
        infoDisponiblesActividad.innerHTML = 'Disponible:' + ' ' + cupoActividad.toLocaleString('es');
        infoHorarioActividad.innerText = 'Horario:' + ' ' + horarioActividadInicio + ' a ' + horarioActividadFinal;

        // infoContainer2Actividad.appendChild(infoCategoriaActividad);
        infoContainer2Actividad.appendChild(infoCostoActividad);
        infoContainer2Actividad.appendChild(infoCapacidadActividad);
        infoContainer2Actividad.appendChild(infoDisponiblesActividad);
        infoContainer2Actividad.appendChild(infoHorarioActividad);


        const infoDescripcionActividad = document.createElement('p');
        const infoRazonDeshabilitar = document.createElement('p');
        let descripcionActividad = listaActividadesEmpresa[i]['descripcionActividad'];
        infoDescripcionActividad.innerText = descripcionActividad;
        let razonDeshabilitar = listaActividadesEmpresa[i]['razonDeshabilitar'];
        if (razonDeshabilitar) {
          infoRazonDeshabilitar.innerText = razonDeshabilitar;
        }

        // 9. Info de quick info linea 3
        const infoContainer3Actividad = document.createElement('ul');
        const infoCategoriaActividad = document.createElement('li');
        let categoriaActividad = listaActividadesEmpresa[i]['categoriaActividad'];

        infoCategoriaActividad.innerText = 'Categoría:' + ' ' + categoriaActividad.split(',').join(', ');;
        infoContainer3Actividad.appendChild(infoCategoriaActividad);

        // Opciones
        const divOpciones = document.createElement('div');
        divOpciones.classList.add('Opciones');
        const formOpciones = document.createElement('form');
        formOpciones.classList.add('formOpciones');
        const headerOpciones = document.createElement('h4');
        headerOpciones.innerText = 'Opciones';
        const listaOpciones = document.createElement('ul');
        listaOpciones.classList.add('menuOpciones');

        // Habilitar y Deshabilitar
        const itemOpcionEstado = document.createElement('li');
        itemOpcionEstado.classList.add('opcionEstado');
        const inputEstado = document.createElement('input');
        const inputEstadoLabel = document.createElement('label');
        inputEstado.type = 'checkbox';
        if (listaActividadesEmpresa[i]['estado'] == 'habilitada') {
          inputEstado.name = 'opcionDeshabilitar';
          inputEstado.value = 'Deshabilitar';
          inputEstadoLabel.classList.add('habilitada');
          inputEstadoLabel.innerText = 'Habilitada';
          inputEstado.addEventListener('click', deshabilitarActividad);
        } else {
          inputEstado.name = 'opcionHabilitar';
          inputEstado.value = 'Habilitar';
          inputEstadoLabel.classList.add('deshabilitada');
          inputEstado.checked = true;
          inputEstadoLabel.innerText = 'Deshabilitada';
          inputEstado.addEventListener('click', habilitarActividad);
        }
        listaOpciones.appendChild(itemOpcionEstado);
        itemOpcionEstado.appendChild(inputEstado);
        itemOpcionEstado.appendChild(inputEstadoLabel);
        inputEstado.dataset.id_actividad = listaActividadesEmpresa[i]['_id'];

        // Editar
        const itemOpcionEditar = document.createElement('li');
        itemOpcionEditar.classList.add('opcionEditar');
        listaOpciones.appendChild(itemOpcionEditar);
        const opcionesEditar = document.createElement('a');
        itemOpcionEditar.appendChild(opcionesEditar);
        opcionesEditar.href = '#';
        opcionesEditar.classList.add('btn-uno');
        opcionesEditar.innerText = 'Editar';
        opcionesEditar.dataset.id_actividad = listaActividadesEmpresa[i]['_id'];
        opcionesEditar.addEventListener('click', mostarDatosEditarActividad);

        // Borrar
        const itemOpcionBorrar = document.createElement('li');
        itemOpcionBorrar.classList.add('opcionBorrar');
        listaOpciones.appendChild(itemOpcionBorrar);
        const opcionesBorrar = document.createElement('a');
        itemOpcionBorrar.appendChild(opcionesBorrar);
        opcionesBorrar.href = '#';
        opcionesBorrar.classList.add('btn-uno');
        opcionesBorrar.innerText = 'Borrar';
        opcionesBorrar.dataset.id_actividad = listaActividadesEmpresa[i]['_id'];
        opcionesBorrar.addEventListener('click', confirmarBorradoActividad);

        //------
        divOpciones.appendChild(formOpciones);
        formOpciones.appendChild(headerOpciones);
        formOpciones.appendChild(listaOpciones);

        // Ultimo paso para que salga el contenido
        sectionCardActividad.appendChild(divQuickInfo);
        divQuickInfo.appendChild(infoContainer1Actividad);
        divQuickInfo.appendChild(infoContainer2Actividad);
        divQuickInfo.appendChild(infoContainer3Actividad);
        divQuickInfo.appendChild(infoDescripcionActividad);
        sectionCardActividad.appendChild(divOpciones);
        contenedorActividades.appendChild(sectionCardActividad);

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
  }
};

// Para el usuario tipo ADMINISTRADOR
function mostrarActividadesAdmin() {

  let filtro = inputBuscarPrincipal.value;
  let contenedorActividades = document.querySelector('#lista-actividades');
  contenedorActividades.innerHTML = '';

  //valores de fechas
  let inicio = inputFechaInicio.value;
  let fin = inputFechaFin.value;

  for (let i = 0; i < listaActividades.length; i++) {

    if (listaActividades[i]['tituloActividad'].toLowerCase().includes(filtro.toLowerCase()) || listaActividades[i]['ubicacionActividad'].toLowerCase().includes(filtro.toLowerCase()) || listaActividades[i]['palabrasActividad'].toLowerCase().includes(filtro.toLowerCase())) {

      //filtrar por fechas
      if (inicio && fin) {
        let fechasActividades = new Date(listaActividades[i]['fechaActividad']);
        if (fechasActividades >= new Date(inicio) && fechasActividades <= new Date(fin)) {
          /* 
           * Aqui va una copia de lo que esta en el else
           */
          // 1. crear un div contenedor de toda la info de actividad
          const sectionCardActividad = document.createElement('section');
          let uniqueActivityID = listaActividades[i]['_id'];
          sectionCardActividad.classList.add('actividad', 'grid-listar', uniqueActivityID);

          // 2. Crear contenedor de la imagen
          const divImgContainer = document.createElement('div');
          divImgContainer.classList.add('imgContainer');

          // 3. Crear la imagen
          const imgURLActividad = document.createElement('img');
          let imgActividad = listaActividades[i]['fotoActividad'];
          let tituloActividad = listaActividades[i]['tituloActividad'];
          if (imgActividad) {
            imgURLActividad.src = imgActividad;
            imgURLActividad.alt = tituloActividad;
          } else {
            imgURLActividad.src = '../img/placeholder.png';
            imgURLActividad.alt = tituloActividad;
          }

          // 4. Asociar la img con el card y agregarlos a la seccion
          divImgContainer.appendChild(imgURLActividad);
          sectionCardActividad.appendChild(divImgContainer);

          // 5. Quick info 
          const divQuickInfo = document.createElement('div');
          divQuickInfo.classList.add('quick-info');

          // 6. header activiad
          const headerActividad = document.createElement('h3');
          const headerActividadBtn = document.createElement('button');
          headerActividad.innerText = tituloActividad;
          headerActividadBtn.innerText = 'Ver más';
          headerActividadBtn.type = 'button';
          //id_actividad se crea en la linea de abajo para guardar el _id de la actividad
          headerActividadBtn.dataset.id_actividad = listaActividades[i]['_id'];
          headerActividadBtn.addEventListener('click', visualizarActividad);
          divQuickInfo.appendChild(headerActividad);
          divQuickInfo.appendChild(headerActividadBtn);

          // 7. Info de quick info linea 1
          const infoContainer1Actividad = document.createElement('ul');
          const infoLugarActividad = document.createElement('li');
          const infoFechaActividad = document.createElement('li');
          const infoRatingActividad = document.createElement('li')
          let lugarActividad = listaActividades[i]['ubicacionActividad'];
          let fechaActividad = listaActividades[i]['fechaActividad'];
          let newFechaActividad = new Date(fechaActividad);
          newFechaActividad = newFechaActividad.toLocaleDateString();

          /****Manuel Delgado****/
          // Rating System
          infoRatingActividad.classList.add('ratingActividad');
          const numberRating = document.createElement('b');
          numberRating.classList.add('rating-number');
          let valueNumberRating = listaActividades[i]['ratingActividad'];
          numberRating.innerText = valueNumberRating;
          infoRatingActividad.appendChild(numberRating);
          let divRating = document.createElement('div');
          divRating.classList.add('rating');

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
          // imprimir
          infoRatingActividad.appendChild(divRating);

          // cont #7
          infoLugarActividad.innerText = 'Lugar:' + ' ' + lugarActividad;
          infoFechaActividad.innerText = 'Fecha:' + ' ' + newFechaActividad;

          infoContainer1Actividad.appendChild(infoLugarActividad);
          infoContainer1Actividad.appendChild(infoFechaActividad);
          infoContainer1Actividad.appendChild(infoRatingActividad);
          /****Manuel Delgado****/

          // 8. Info de quick info linea 2
          const infoContainer2Actividad = document.createElement('ul');
          // const infoCategoriaActividad = document.createElement('li');
          const infoCostoActividad = document.createElement('li');
          const infoCapacidadActividad = document.createElement('li');
          const infoDisponiblesActividad = document.createElement('li');
          const infoHorarioActividad = document.createElement('li');
          // let categoriaActividad = listaActividades[i]['categoriaActividad'];
          let costoActividad = listaActividades[i]['costoActividad'];
          let capacidadActividad = listaActividades[i]['capacidadParticipantesActividad'];
          let cupoActividad = listaActividades[i]['cupoActividad'];
          let monedaActividad = listaActividades[i]['monedaActividad'];
          let costoActividadColones = costoActividad.toLocaleString('es');
          let costoActividadDolares = costoActividad.toLocaleString('en');
          let horarioActividadInicio = listaActividadesHabilitadas[i]['horaInicioActividad'];
          let horarioActividadFinal = listaActividadesHabilitadas[i]['horaFinActividad'];

          if (monedaActividad == 'Colones') {
            monedaActividad = '₡';
            costoActividad = costoActividadColones;
          } else {
            monedaActividad = '$'
            costoActividad = costoActividadDolares;
          }

          // infoCategoriaActividad.innerText = 'Categoría:' + ' ' + categoriaActividad;
          if (costoActividad > 0) {
            infoCostoActividad.innerText = 'Precio:' + ' ' + monedaActividad + ' ' + costoActividad;
          } else {
            infoCostoActividad.innerText = 'Precio: Gratis';
          }

          infoCapacidadActividad.innerText = 'Cupo:' + ' ' + capacidadActividad.toLocaleString('es');
          infoDisponiblesActividad.innerHTML = 'Disponible:' + ' ' + cupoActividad.toLocaleString('es');
          infoHorarioActividad.innerText = 'Horario:' + ' ' + horarioActividadInicio + ' a ' + horarioActividadFinal;

          // infoContainer2Actividad.appendChild(infoCategoriaActividad);
          infoContainer2Actividad.appendChild(infoCostoActividad);
          infoContainer2Actividad.appendChild(infoCapacidadActividad);
          infoContainer2Actividad.appendChild(infoDisponiblesActividad);
          infoContainer2Actividad.appendChild(infoHorarioActividad);

          const infoDescripcionActividad = document.createElement('p');
          const infoRazonDeshabilitar = document.createElement('p');
          let descripcionActividad = listaActividades[i]['descripcionActividad'];
          infoDescripcionActividad.innerText = descripcionActividad;
          let razonDeshabilitar = listaActividades[i]['razonDeshabilitar'];
          if (razonDeshabilitar) {
            infoRazonDeshabilitar.innerText = razonDeshabilitar;
          }

          // 9. Info de quick info linea 3
          const infoContainer3Actividad = document.createElement('ul');
          const infoCategoriaActividad = document.createElement('li');
          let categoriaActividad = listaActividades[i]['categoriaActividad'];

          infoCategoriaActividad.innerText = 'Categoría:' + ' ' + categoriaActividad.split(',').join(', ');;
          infoContainer3Actividad.appendChild(infoCategoriaActividad);

          // Opciones
          const divOpciones = document.createElement('div');
          divOpciones.classList.add('Opciones');
          const formOpciones = document.createElement('form');
          formOpciones.classList.add('formOpciones');
          const headerOpciones = document.createElement('h4');
          headerOpciones.innerText = 'Opciones';
          const listaOpciones = document.createElement('ul');
          listaOpciones.classList.add('menuOpciones');

          const itemNoCupos = document.createElement('li');
          itemNoCupos.innerText = 'El administrador no tiene opciones disponibles.';
          listaOpciones.appendChild(itemNoCupos);
          itemNoCupos.classList.add('no-cupos');

          // //------
          divOpciones.appendChild(formOpciones);
          formOpciones.appendChild(headerOpciones);
          formOpciones.appendChild(listaOpciones);

          // // Ultimo paso para que salga el contenido
          sectionCardActividad.appendChild(divQuickInfo);
          divQuickInfo.appendChild(infoContainer1Actividad);
          divQuickInfo.appendChild(infoContainer2Actividad);
          divQuickInfo.appendChild(infoContainer3Actividad);
          divQuickInfo.appendChild(infoDescripcionActividad);
          sectionCardActividad.appendChild(divOpciones);
          contenedorActividades.appendChild(sectionCardActividad);

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
      } else {
        // 1. crear un div contenedor de toda la info de actividad
        const sectionCardActividad = document.createElement('section');
        let uniqueActivityID = listaActividades[i]['_id'];
        sectionCardActividad.classList.add('actividad', 'grid-listar', uniqueActivityID);

        // 2. Crear contenedor de la imagen
        const divImgContainer = document.createElement('div');
        divImgContainer.classList.add('imgContainer');

        // 3. Crear la imagen
        const imgURLActividad = document.createElement('img');
        let imgActividad = listaActividades[i]['fotoActividad'];
        let tituloActividad = listaActividades[i]['tituloActividad'];
        if (imgActividad) {
          imgURLActividad.src = imgActividad;
          imgURLActividad.alt = tituloActividad;
        } else {
          imgURLActividad.src = '../img/placeholder.png';
          imgURLActividad.alt = tituloActividad;
        }

        // 4. Asociar la img con el card y agregarlos a la seccion
        divImgContainer.appendChild(imgURLActividad);
        sectionCardActividad.appendChild(divImgContainer);

        // 5. Quick info 
        const divQuickInfo = document.createElement('div');
        divQuickInfo.classList.add('quick-info');

        // 6. header activiad
        const headerActividad = document.createElement('h3');
        const headerActividadBtn = document.createElement('button');
        headerActividad.innerText = tituloActividad;
        headerActividadBtn.innerText = 'Ver más';
        headerActividadBtn.type = 'button';
        //id_actividad se crea en la linea de abajo para guardar el _id de la actividad
        headerActividadBtn.dataset.id_actividad = listaActividades[i]['_id'];
        headerActividadBtn.addEventListener('click', visualizarActividad);
        divQuickInfo.appendChild(headerActividad);
        divQuickInfo.appendChild(headerActividadBtn);

        // 7. Info de quick info linea 1
        const infoContainer1Actividad = document.createElement('ul');
        const infoLugarActividad = document.createElement('li');
        const infoFechaActividad = document.createElement('li');
        const infoRatingActividad = document.createElement('li')
        let lugarActividad = listaActividades[i]['ubicacionActividad'];
        let fechaActividad = listaActividades[i]['fechaActividad'];
        let newFechaActividad = new Date(fechaActividad);
        newFechaActividad = newFechaActividad.toLocaleDateString();

        /****Manuel Delgado****/
        // Rating System
        infoRatingActividad.classList.add('ratingActividad');
        const numberRating = document.createElement('b');
        numberRating.classList.add('rating-number');
        let valueNumberRating = listaActividades[i]['ratingActividad'];
        numberRating.innerText = valueNumberRating;
        infoRatingActividad.appendChild(numberRating);
        let divRating = document.createElement('div');
        divRating.classList.add('rating');

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
        // imprimir
        infoRatingActividad.appendChild(divRating);

        // cont #7
        infoLugarActividad.innerText = 'Lugar:' + ' ' + lugarActividad;
        infoFechaActividad.innerText = 'Fecha:' + ' ' + newFechaActividad;

        infoContainer1Actividad.appendChild(infoLugarActividad);
        infoContainer1Actividad.appendChild(infoFechaActividad);
        infoContainer1Actividad.appendChild(infoRatingActividad);
        /****Manuel Delgado****/

        // 8. Info de quick info linea 2
        const infoContainer2Actividad = document.createElement('ul');
        // const infoCategoriaActividad = document.createElement('li');
        const infoCostoActividad = document.createElement('li');
        const infoCapacidadActividad = document.createElement('li');
        const infoDisponiblesActividad = document.createElement('li');
        const infoHorarioActividad = document.createElement('li');
        // let categoriaActividad = listaActividades[i]['categoriaActividad'];
        let costoActividad = listaActividades[i]['costoActividad'];
        let capacidadActividad = listaActividades[i]['capacidadParticipantesActividad'];
        let cupoActividad = listaActividades[i]['cupoActividad'];
        let monedaActividad = listaActividades[i]['monedaActividad'];
        let costoActividadColones = costoActividad.toLocaleString('es');
        let costoActividadDolares = costoActividad.toLocaleString('en');
        let horarioActividadInicio = listaActividadesHabilitadas[i]['horaInicioActividad'];
        let horarioActividadFinal = listaActividadesHabilitadas[i]['horaFinActividad'];

        if (monedaActividad == 'Colones') {
          monedaActividad = '₡';
          costoActividad = costoActividadColones;
        } else {
          monedaActividad = '$'
          costoActividad = costoActividadDolares;
        }

        // infoCategoriaActividad.innerText = 'Categoría:' + ' ' + categoriaActividad;
        if (costoActividad > 0) {
          infoCostoActividad.innerText = 'Precio:' + ' ' + monedaActividad + ' ' + costoActividad;
        } else {
          infoCostoActividad.innerText = 'Precio: Gratis';
        }

        infoCapacidadActividad.innerText = 'Cupo:' + ' ' + capacidadActividad.toLocaleString('es');
        infoDisponiblesActividad.innerHTML = 'Disponible:' + ' ' + cupoActividad.toLocaleString('es');
        infoHorarioActividad.innerText = 'Horario:' + ' ' + horarioActividadInicio + ' a ' + horarioActividadFinal;

        // infoContainer2Actividad.appendChild(infoCategoriaActividad);
        infoContainer2Actividad.appendChild(infoCostoActividad);
        infoContainer2Actividad.appendChild(infoCapacidadActividad);
        infoContainer2Actividad.appendChild(infoDisponiblesActividad);
        infoContainer2Actividad.appendChild(infoHorarioActividad);

        const infoDescripcionActividad = document.createElement('p');
        const infoRazonDeshabilitar = document.createElement('p');
        let descripcionActividad = listaActividades[i]['descripcionActividad'];
        infoDescripcionActividad.innerText = descripcionActividad;
        let razonDeshabilitar = listaActividades[i]['razonDeshabilitar'];
        if (razonDeshabilitar) {
          infoRazonDeshabilitar.innerText = razonDeshabilitar;
        }

        // 9. Info de quick info linea 3
        const infoContainer3Actividad = document.createElement('ul');
        const infoCategoriaActividad = document.createElement('li');
        let categoriaActividad = listaActividades[i]['categoriaActividad'];

        infoCategoriaActividad.innerText = 'Categoría:' + ' ' + categoriaActividad.split(',').join(', ');;
        infoContainer3Actividad.appendChild(infoCategoriaActividad);

        // Opciones
        const divOpciones = document.createElement('div');
        divOpciones.classList.add('Opciones');
        const formOpciones = document.createElement('form');
        formOpciones.classList.add('formOpciones');
        const headerOpciones = document.createElement('h4');
        headerOpciones.innerText = 'Opciones';
        const listaOpciones = document.createElement('ul');
        listaOpciones.classList.add('menuOpciones');

        const itemNoCupos = document.createElement('li');
        itemNoCupos.innerText = 'El administrador no tiene opciones disponibles.';
        listaOpciones.appendChild(itemNoCupos);
        itemNoCupos.classList.add('no-cupos');

        // //------
        divOpciones.appendChild(formOpciones);
        formOpciones.appendChild(headerOpciones);
        formOpciones.appendChild(listaOpciones);

        // // Ultimo paso para que salga el contenido
        sectionCardActividad.appendChild(divQuickInfo);
        divQuickInfo.appendChild(infoContainer1Actividad);
        divQuickInfo.appendChild(infoContainer2Actividad);
        divQuickInfo.appendChild(infoContainer3Actividad);
        divQuickInfo.appendChild(infoDescripcionActividad);
        sectionCardActividad.appendChild(divOpciones);
        contenedorActividades.appendChild(sectionCardActividad);

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
  }
};


//Funciones para administrar Reservaciones

function listaIdsReservaciones() {
  let listaReservaciones = [];
  for (let j = 0; j < dataUsuarios.length; j++) {
    if (dataUsuarios[j]['_id'] == id_usuario) {
      listaReservaciones = dataUsuarios[j]['reservacion'];
      let listaIdsActividadesReservadas = [];
      let listaIdsReservaciones = [];
      if (listaReservaciones === null) {
        return listaIdsReservaciones;
      } else {
        for (let i = 0; i < listaReservaciones.length; i++) {
          let idActividadesReservadas = listaReservaciones[i]['idActividadReservada'];
          let id_reservacion = listaReservaciones[i]['_id'];
          listaIdsActividadesReservadas.push(idActividadesReservadas);
          listaIdsReservaciones.push(id_reservacion);
        }
        return listaIdsReservaciones;
      }

    }
  }
};

function listaActividadesReservadas() {
  let listaReservaciones = [];
  for (let j = 0; j < dataUsuarios.length; j++) {
    if (dataUsuarios[j]['_id'] == id_usuario) {
      listaReservaciones = dataUsuarios[j]['reservacion'];
      let listaIdsActividadesReservadas = [];
      if (listaReservaciones === null) {
        return listaIdsActividadesReservadas;
      } else {
        for (let i = 0; i < listaReservaciones.length; i++) {
          let idActividadesReservadas = listaReservaciones[i]['idActividadReservada'];
          let id_reservacion = listaReservaciones[i]['_id'];
          listaIdsActividadesReservadas.push(idActividadesReservadas);
        }
        return listaIdsActividadesReservadas;
      }

    }
  }
};

function reservar() {
  let id_actividad = this.dataset.id_actividad;
  let nombreActividad;
  let cupoActividad;
  for (let i = 0; i < listaActividadesHabilitadas.length; i++) {
    if (listaActividadesHabilitadas[i]['_id'] == id_actividad) {
      nombreActividad = listaActividadesHabilitadas[i]['tituloActividad'];
      cupoActividad = listaActividadesHabilitadas[i]['cupoActividad'];
    }
  }
  cupoActividad = cupoActividad - 1;
  actualizarCupoActividad(id_actividad, cupoActividad);
  activarReservacion(id_actividad, nombreActividad, id_usuario);
  let accion = `Reservó un espacio para la la actividad:  ${nombreActividad} `;
  let bitacora = obtenerDatosBitacora(accion);
  location.reload();
};

function cancelarReserva() {
  let id_actividad = this.dataset.id_actividad;
  let reservationArray = [];
  let id_reservacion;
  for (let j = 0; j < dataUsuarios.length; j++) {
    if (dataUsuarios[j]['_id'] == id_usuario) {
      reservationArray = dataUsuarios[j]['reservacion'];
      for (let k = 0; k < reservationArray.length; k++) {
        if (reservationArray[k].idActividadReservada === id_actividad) {
          id_reservacion = reservationArray[k]._id;
        }
      }
    }
  }
  let nombreActividad;
  let cupoActividad;
  for (let i = 0; i < listaActividadesHabilitadas.length; i++) {
    if (listaActividadesHabilitadas[i]['_id'] == id_actividad) {
      nombreActividad = listaActividadesHabilitadas[i]['tituloActividad'];
      cupoActividad = listaActividadesHabilitadas[i]['cupoActividad'];
    }
  }
  swal({
    title: '¿Está seguro que desea cancelar su reservación a esta actividad?',
    text: 'Si cambia su opinión igual puede volver a reservar siempre y cuando aún existan cupos disponibles',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Si, cancele mi reservación!'
  }).then((result) => {
    if (result.value) {
      cupoActividad = cupoActividad + 1;
      actualizarCupoActividad(id_actividad, cupoActividad);
      cancelar_reservacion(id_usuario, id_reservacion, id_actividad, nombreActividad);
      let accion = `Canceló su reservación para la la actividad:  ${nombreActividad} `;
      let bitacora = obtenerDatosBitacora(accion);
      swal(
        '¡Cancelada!',
        'Su reservación ha sido cancelada con éxisto',
        'success'
      ).then(function () {
        location.reload();
      })
    }
  })
};


// Funciones para administrar Borrar, Habilitar, Editar

function confirmarBorradoActividad() {
  let id_actividad = this.dataset.id_actividad;
  let actividad = buscar_actividad(id_actividad);
  let accion = `Eliminó la actividad:  ${actividad['tituloActividad']} `;
  swal({
    title: '¿Está seguro que desea eliminar la actividad?',
    text: "¡Este proceso no se puede revertir!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Si, borre la actividad!'
  }).then((result) => {
    if (result.value) {
      borrar_actividad(id_actividad);
      let bitacora = obtenerDatosBitacora(accion);
      listaActividades = obtenerActividades();
      mostrarActividades();
      swal(
        '¡Borrada!',
        'La actividad ha sido borrada con éxito.',
        'success'
      ).then(function () {
        location.reload();
      });
    }
  })
};

async function deshabilitarActividad() {
  let id_actividad = this.dataset.id_actividad;
  let actividad = buscar_actividad(id_actividad);
  let accion = `Deshabilitó la actividad:  ${actividad['tituloActividad']} `;
  deshabilitarActividad_svcs(id_actividad);
  let bitacora = obtenerDatosBitacora(accion);
  listaActividades = obtenerActividades();
  location.reload();
};

function habilitarActividad() {
  let id_actividad = this.dataset.id_actividad;
  let actividad = buscar_actividad(id_actividad);
  let accion = `Habilitó la actividad:  ${actividad['tituloActividad']} `;
  habilitarActividad_svcs(id_actividad);
  let bitacora = obtenerDatosBitacora(accion);
  listaActividades = obtenerActividades();
  location.reload();
};

function mostarDatosEditarActividad() {
  let id_actividad = this.dataset.id_actividad;
  localStorage.setItem('actividad', id_actividad);
  window.location.href = 'modificar_actividad.html';
}

// Funcion para filtrar por Actividades de la Empresa del usuario logueado

function obtenerActividadesEmpresa() {
  let actividadesEmpresa = [];
  for (let j = 0; j < listaActividades.length; j++) {
    if (listaActividades[j]['id_usuario'] == id_usuario) {
      actividadesEmpresa.push(listaActividades[j]);
    }
  }
  return actividadesEmpresa;
};



// Funcion para visitar el perfil de la actividad

function visualizarActividad() {
  let id_actividad = this.dataset.id_actividad;
  // al local storage se pasa: llave , valor (la llave va entre comillas y no importa que la llave se llame igual que la variable)
  localStorage.setItem('actividad', id_actividad);
  window.location.href = 'perfil_actividad.html';
};

const tipo_usuario = sessionStorage.tipo_usuario;

switch (tipo_usuario) {
  case 'Administrador':
    mostrarActividadesAdmin();
    inputBuscarPrincipal.addEventListener('keyup', mostrarActividadesAdmin);
    break;

  case 'Empresa':
    mostrarActividades();
    inputBuscarPrincipal.addEventListener('keyup', mostrarActividades);
    break;

  case 'Cliente':
    mostrarActividadesHabilitadas();
    inputBuscarPrincipal.addEventListener('keyup', mostrarActividadesHabilitadas);
    break;

  default:
    break;
};

//boton filtrar x fechas
botonFiltroFechas.addEventListener('click', mostrarActividades);


/******************************************************/
/********** Función para registrar bitácora **********/
/****************************************************/

function obtenerDatosBitacora(paccion) {
  let bitacora = false;
  let accion = paccion;
  let listaUsuarios = obtenerUsuarios();
  let sesionCorreo = sessionStorage.getItem('correo');
  let rol = tipoUsuario;

  for (let i = 0; i < listaUsuarios.length; i++) {
    if (listaUsuarios[i]['correo'] == sesionCorreo) {
      let nombre = listaUsuarios[i]['pnombre'];
      let respuesta = registrar_bitacora(rol, sesionCorreo, nombre, accion);
      if (respuesta.success == true) {
        bitacora = true;
      }
    }
  }
  return bitacora;
};