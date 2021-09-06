const express = require('express');
const bodyParser = require('body-parser');
// const primeiroGet = require('./routers/rotaTalker');
const login = require('./routers/rotaLogin');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';
const HTTP_OK_STATUS = 200;

app.use('/login', login);

app.use('/talker', primeiroGet);

app.use('/login', login);
// app.use('/talker', primeiroGet);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
