
const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    
    console.log('Usuario conectado');

    //var actual = `Ticket ${ ticketControl.getUltimoTicket() }`;

    // Enviar Mensaje al cliente
    client.emit('estadoActual', {
        actual: `Ticket ${ ticketControl.getUltimoTicket() }`,
        ultimos4: ticketControl.getUltimos4()
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

    client.on('atenderTicket', ( data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'Escritorio necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket( data.escritorio );

        callback( atenderTicket );

        // actualizar/notificar cambios el los ultimos 4

    });
    
});