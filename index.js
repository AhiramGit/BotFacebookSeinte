const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json());

app.post('/webhook', (req, res) => {
    console.log('post: webhook');

    const body = req.body;

    if(body.object() === 'page') {
        body.entry.forEach(entry => {
            // Se reciben y procesan los mensajes
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);

        });

        res.status(200).send('Evento recibido')
    } else {
        res.sendStatus(404);
    }
});

app.get('/webhook', (req, res) => {
    console.log('get: webhook');

    const verifyToken = 'stringUnicoParaTuAplicacion';
    
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if(mode && token) {
        if (mode === 'suscribe' && token === verifyToken) {
            console.log('WEBHOOK VERIFICADO');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
} );

app.get('/', (req, res) =>{
    res.status(200).send('Hello world! or Hello facebook?')
});

app.listen(8080, () => {
    console.log('Servidor iniciado');
});
