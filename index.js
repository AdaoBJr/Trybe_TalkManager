const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// #1 Cria o endpoint GET /talker
app.get('/talker', async (_req, res) => {
  res.status(HTTP_OK_STATUS).json(JSON.parse(await fs.readFile('./talker.json', 'utf-8')));
});
// #2 Cria o endpoint GET /talker/:id
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('talker.json')
    .then((content) => JSON.parse(content))
    .catch((err) => console.log(`erro: ${err.message}`));
  const talk = talkers.find((talkId) => talkId.id === +id);
  // Caso não seja encontrada uma pessoa palestrante com base no id da rota
  if (!talk) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talk);
});
// #3 Cria o endpoint POST /login
app.post('/login', (req, res) => {
  const emailVallid = (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailVallid(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const Rand = () => Math.random(0).toString(36).substr(2);
  const token = (length) => (Rand() + Rand()).substr(0, length);
  return res.status(HTTP_OK_STATUS).json({ token: token(16) });
  });

app.listen(PORT, () => {
  console.log('Online');
});
