const express = require('express');
const bodyParser = require('body-parser');
const { readFileTalker } = require('./readFileTalker');
const { validateEmail, validatePassword } = require('./validateUser');
const { validateName, validateAge, validateTalk } = require('./validateTalker');
const generateToken = require('./generateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const file = await readFileTalker();
  if (!file) {
    return res.status(404).json({ message: 'talker not found' });
  }
  return res.status(200).json(file);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const file = await readFileTalker();

  const talker = file.find((person) => person.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = generateToken();

  return res.status(200).json({ token });
});

app.post('/talker', validateName, validateAge, validateTalk, (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  const file = readFileTalker();
  file.push({ name, age, talk: { watchedAt, rate } });

  return res.status(201).json({ name, age, talk: { watchedAt, rate } });
});

app.listen(PORT, () => {
  console.log('Online');
});
