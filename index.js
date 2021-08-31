const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = 3000;

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

app.post(
  '/login',
  validateEmail,
  validatePassword,
  (_req, res) => {
    res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const fileResponse = await fs.readFile('./talker.json', 'utf-8');
  const fileObject = JSON.parse(await fileResponse);
  const choosenTalker = fileObject.find((talker) => Number(id) === talker.id);
  if (!choosenTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(choosenTalker);
});

app.get('/talker', async (_request, response) => {
  const fileResponse = await fs.readFile('./talker.json', 'utf-8');
  response.status(HTTP_OK_STATUS).json(JSON.parse(fileResponse));
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
