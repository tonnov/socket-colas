
var socket = io();

socket.on('connect', function() {

    console.log('Conectado al servidor');

});

socket.on('disconnect', function() {
    
    console.log('La conexion con el servidor se ha perdido');

});

var searchParams = new URLSearchParams ( window.location.search );

//console.log(searchParams.has('escritorio'));

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Escritorio necesario');
}

var escritorio = searchParams.get('escritorio');
//console.log(escritorio);
var label = $('small');

$('h1').text(`Escritorio ${ escritorio }`);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        
        console.log(resp);
        
    });
});
