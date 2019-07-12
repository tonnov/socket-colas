
const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    
    console.log('Usuario conectado');

    var actual = `Ticket ${ ticketControl.getUltimoTicket() }`;

    // Enviar Mensaje al cliente
    client.emit('estadoActual', {
        actual
    } );

    // client.on('disconnect', () => {
        
    //     console.log('Usuario desconectado');
        
    // });

    // Escuchar cliente
    client.on('siguienteTicket', (data, callback) => {

        var nTicket =  `Ticket ${ ticketControl.siguiente() }`;

        console.log( nTicket );
        
        callback( nTicket );

    });
    
});