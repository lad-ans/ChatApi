const { connectedUser, disconnectedUser, saveMessage } = require('../controllers/socket');
const { verifyJWT } = require('../helpers/jwt');
const {io} = require('../index');

// sockets messages
io.on('connection', client => {

    const [ valid, uid ] = verifyJWT( client.handshake.headers['x-token'] ); 

    // verifying authentication
    if ( !valid ) { return client.disconnect(); }

    // authenticated client
    connectedUser( uid );

    // send user to a particular room
    // global room, client.id
    client.join( uid );

    // listen from client 'personal-message'

    client.on('personal-message', async ( payload ) => {

        // save message
        await saveMessage( payload );
        
        io.to( payload.to ).emit( 'personal-message', payload );

    });


    client.on('disconnect', () => { 
        disconnectedUser( uid );
    });

});