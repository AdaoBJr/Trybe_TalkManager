const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
// Busquei ajuda para utilizar o crypto nesse link:https://qastack.com.br/programming/8855687/secure-random-token-in-node-js;
const crypto = require('crypto');
const authLoginAndPassword = require('./login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// REQUISITO 1
// Usei o async/await por se tratar de um funcção assíncrona (readFile);
app.get('/talker', async (_req, res) => {
  const getTalkers = await fs.readFile('./talker.json');
  const talkersJson = await JSON.parse(getTalkers);
  if (talkersJson.length === 0) {
    return res.status(HTTP_OK_STATUS).send([]);
  }
  return res.status(HTTP_OK_STATUS).send(talkersJson);
});

// REQUISITO 2
app.get('/talker/:id', async (req, res) => {
  const getTalkers = await fs.readFile('./talker.json');
  const talkersJson = await JSON.parse(getTalkers);
  const { id } = req.params;
  const getTheTalker = talkersJson.find((talker) => talker.id === +id);
  if (!getTheTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).send(getTheTalker);
});

// REQUISITO 3
app.post('/login', authLoginAndPassword,
  (_req, res) => {
    const tolken = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token: tolken });
  });

app.listen(PORT, () => {
  console.log('Online');
});
