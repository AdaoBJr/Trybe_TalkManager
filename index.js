const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const talkers = require('./talker.json');
const { authUser,
  validateToken,
  validateNameAndAgeTalker,
  validateDateAndRateTalker,
  validateTalkTalker,
  addTalker,
  editTalker } = require('./middlewares');
const { getToken } = require('./getToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.status(HTTP_OK_STATUS).send());

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = talkers.find((t) => t.id === Number(id));
  
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker', async (_req, res) => {
  const talker = await fs.readFile('talker.json', 'utf-8');
  return res.status(HTTP_OK_STATUS).send(JSON.parse(talker));
});

app.post('/talker',
  validateToken,
  validateNameAndAgeTalker,
  validateTalkTalker,
  validateDateAndRateTalker,
  addTalker);

app.post('/login',
  authUser,
  (req, res) => res.status(HTTP_OK_STATUS).json({ token: getToken() })); 

app.put('/talker/:id',
  validateToken,
  validateNameAndAgeTalker,
  validateTalkTalker,
  validateDateAndRateTalker,
  editTalker);
