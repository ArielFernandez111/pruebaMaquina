const qrcode = require('qrcode-terminal'); // Llamada a la libreria de qr

// const { Client } = require('whatsapp-web.js'); // Creamos nuestro cliente de whatsapp
// const client = new Client();

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth() // Para que se guarde la session cuando se cierra el servicio
});


client.on('qr', qr => {
    qrcode.generate(qr, { small: true }); // Genera el codigo Qr
});

client.on('ready', () => {
    console.log('Conexion exitosa!'); // Cuando la conexion sea existosa lo muestra por consola
});

// Procederemos a escuchar todos los mensajes

client.on('message', message => {
    console.log(message.body) // Muestra por consola todos los mensajes que nos lleguen
    if (message.body === 'hola mundo') {
        client.sendMessage(message.from, 'Funciona bot');
    }
});


client.initialize();