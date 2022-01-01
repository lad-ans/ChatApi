const express = require('express');
const path = require('path');
require('dotenv').config();

// DB config
require('./database/config').dbConnection();

// express app
const app = express(); // inicializando

// read and parsing body
app.use( express.json() );

// node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// public path
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// my routes
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/users', require('./routes/users') );
app.use( '/api/messages', require('./routes/messages') );

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);
    console.log('Servidor rodando na porta', process.env.PORT);

});