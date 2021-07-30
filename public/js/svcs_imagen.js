
$(function() {
    let imagenUrl = '';
    $.cloudinary.config({ cloud_name: 'hoyque', api_key: '149353256681381'});

    // boton que activa el evento
    let uploadButton = $('#btnAgregarImagen');

    uploadButton.on('click', function(e){
        cloudinary.openUploadWidget({ cloud_name: 'hoyque', upload_preset: 'hoyquepreset', tags: ['cgal']},
        function(error, result) {
            if(error) console.log(error);
            // If NO error, log image data to console
            let id = result[0].public_id;
             console.log(id);
            imagenUrl = 'https://res.cloudinary.com/hoyque/image/upload/' + id ;
            document.querySelector('#registrarImagen').src = imagenUrl;
          console.log(imagenUrl);
        });
    });
})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return  $.cloudinary.url(id, options);
}
