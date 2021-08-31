const express = require('express');
const bodyParser = require('body-parser');

const talkerRouter = require('./talkerRouter');
const generateToken = require('./helpers/generateToken');

const app = express();
app.use(bodyParser.json());
app.use('/talker', talkerRouter);

const HTTP_OK_STATUS = 200;

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emptyEmailMessage = 'O campo "email" é obrigatório';
  const notValidEmailMessage = 'O "email" deve ter o formato "email@email.com"';
  const emailRegex = /[\w]@[a-zA-Z]+.com/gm;
  if (!email) return res.status(400).json({ message: emptyEmailMessage });
  if (!emailRegex.test(email)) return res.status(400).json({ message: notValidEmailMessage });
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const emptyPasswordMessage = 'O campo "password" é obrigatório';
  const passwordNotValidMessage = 'O "password" deve ter pelo menos 6 caracteres';
  if (!password) return res.status(400).json({ message: emptyPasswordMessage });
  if (password.length < 6) return res.status(400).json({ message: passwordNotValidMessage });
  next();
};

app.post('/login',
  validateEmail,
  validatePassword,
  (_req, res) => {
    res.status(HTTP_OK_STATUS).json({ token: generateToken() });
  });
  
  // não remova esse endpoint, e para o avaliador funcionar
  const PORT = 3000;
  app.get('/', (_request, response) => {
    response.status(HTTP_OK_STATUS).send();
  });

app.listen(PORT, () => {
  console.log('Online');
});
