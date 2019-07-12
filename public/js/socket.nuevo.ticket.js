

// Comando para establecer la conexion

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {

    console.log('Conectado al servidor');

});

socket.on('disconnect', function() {
    
    console.log('La conexion con el servidor se ha perdido');

});


socket.on('estadoActual', function( resp ) {

    console.log(resp);

    label.text(resp.actual);
    
});

$('button').on('click', function(){

    //Enviar informacion

    socket.emit('siguienteTicket', null, function(resp){

        console.log(resp);

        label.text(resp);
        
    });
    
    
})