const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('./node_modules/body-parser');

const { getTalker } = require('./getArquivo/getTalker');
const { generateToken } = require('./token/token');
const { validateEmail } = require('./token/email');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const content = (await getTalker());
  res.status(200).send(content);
});

app.get(
  '/talker/:id',
  rescue(async (req, res) => {
    const talker = (await getTalker());
    const falador = talker.find(({ id }) => id === Number(req.params.id));
    if (!falador) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(falador);
  }),
);

app.get('/login', (req, res) => {
  const token = { token: generateToken(16) };
  res.status(200).send(token);
  const { email, password } = req.body;
  if (!email) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  const emailResult = validateEmail(email);
  if (!emailResult) {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com' });
  }
  res.status(200).send(email);
  if (!password) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(200).send(password);
});
