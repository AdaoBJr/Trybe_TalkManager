const express = require('express');
const bodyParser = require('body-parser');
const genToken = require('./auth/genToken');
const authLogin = require('./auth/authLogin');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkerRouter = require('./Routers/talkerRouter');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.post('/login', authLogin, (_req, res) => res.status(200).json({ token: genToken() }));

app.use('/', talkerRouter);
