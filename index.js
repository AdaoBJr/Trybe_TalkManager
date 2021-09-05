const express = require('express');
const bodyParser = require('body-parser');
const allTalkers = require('./middlewares/getAllTalkers');
const getTalkerId = require('./middlewares/getTalkerID');
const token = require('./middlewares/tokenAuthentication');
const validateEmail = require('./authentications/validateEmail');
const validatePassword = require('./authentications/validatePassword');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', getTalkerId);

app.get('/talker', allTalkers);

app.post('/login', validateEmail, validatePassword, token);

app.listen(PORT, () => {
  console.log('Online');
});
