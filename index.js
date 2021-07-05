const express = require('express');
const bodyParser = require('body-parser');

const { error } = require('./utils');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Routes

app.use('/talker', routes.talker);
app.use('/login', routes.login);

// Error Handler

app.use(error.errorHandler);

app.listen(PORT, () => {
  console.log('Online');
});
