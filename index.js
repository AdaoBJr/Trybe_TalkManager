const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

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
  const token = generateToken(16);
  const { email, password } = req.body;
  validateEmail(email, password, res);
  const emailIsValid = /((\w+)@(\w+)\.(\w+))/;
  if (!email.match(emailIsValid)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token });
});
