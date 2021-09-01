const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { readData, filterTalkerId } = require('./middleware/index');

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
    response.status(HTTP_OK_STATUS).send();
});

// Rotas
app.get('/talker', readData);
app.get('/talker/:id', filterTalkerId);

app.listen(PORT, () => {
    console.log('Online');
});