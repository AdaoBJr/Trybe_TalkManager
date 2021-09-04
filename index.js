const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto'); // token
const primeiroGet = require('./routers/rota66');
// const loguin = require('./routers/roraLoguin');

const token = randomBytes(8).toString('hex'); // token

const app = express();
app.use(bodyParser.json());

const PORT = '3000';
const HTTP_OK_STATUS = 200;
const HTTP_ERROR_LOGUIN = 400;

const emailRegex = RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);
const MinPassword = 6;

// app.use('/loguin', loguin);

app.post('/loguin', (req, res) => {
 const { email, password } = req.body; 
 if (!email) {
  return res.status(HTTP_ERROR_LOGUIN).send({ message: 'O campo "email" é obrigatório' });
 }
 if (!emailRegex.test(email)) {
  return res.status(HTTP_ERROR_LOGUIN).send({ 
    message: 'O "email" deve ter o formato "email@email.com"', 
  });
 }
 if (!password) {
  return res.status(HTTP_ERROR_LOGUIN).send({ message: 'O campo "password" é obrigatório' });
 }
 if (password.length < MinPassword) {
  return res.status(HTTP_ERROR_LOGUIN).send({ 
    message: 'O "password" deve ter pelo menos 6 caracteres', 
  });
 }
  res.status(HTTP_OK_STATUS).send({ token });
});

app.use('/talker', primeiroGet);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
