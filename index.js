const express = require('express');
const bodyParser = require('body-parser');

<<<<<<< HEAD
const { error } = require('./utils');
const routes = require('./routes');

const app = express();

app.disable('x-powered-by');
=======
const app = express();
>>>>>>> 38d5816886aee2fb7b727dd4941fdeaa02d46ca9
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

<<<<<<< HEAD
// Routes

app.use('/talker', routes.talker);
app.use('/login', routes.login);

// Error Handler

app.use(error.errorHandler);

=======
>>>>>>> 38d5816886aee2fb7b727dd4941fdeaa02d46ca9
app.listen(PORT, () => {
  console.log('Online');
});
