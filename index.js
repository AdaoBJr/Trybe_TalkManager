const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const { 
  isValidEmail,
  isValidPassword,
  generateToken,
} = require('./middlewares');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const talkerRouter = require('./talkersRouter');

app.use('/talker', talkerRouter);

app.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

app.listen(PORT, () => {
  console.log('Online');
});
