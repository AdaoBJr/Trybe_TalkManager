const express = require('express');
const bodyParser = require('body-parser');
const talkerRoute = require('./routes/talker');
const loginRoute = require('./routes/login');
const { StatusCodes: { OK } } = require('http-status-codes');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(OK).send();
});

app.use('/login', loginRoute);
app.use('/talker', talkerRoute);

app.listen(PORT, () => console.log('Online'));
