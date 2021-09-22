const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const { allTalkers, talker, postTalker } = require('./talkers.js');
const { emailValidation,
  passwordValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
} = require('./middleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkers = await allTalkers();
    response.status(HTTP_OK_STATUS).json(talkers);
});

app.post(
  '/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (request, response) => {
    const { body } = request;
    const ptTalker = await postTalker(body);
    response.status(201).json(ptTalker);
},
);

app.get('/talker/:id', async (request, response) => {
const { id } = request.params;
const idTalker = await talker(id);
if (!idTalker) return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });

response.status(200).json(idTalker);
});

app.post('/login', emailValidation, passwordValidation, async (request, response) => {
  response.status(HTTP_OK_STATUS).json({ token: randomBytes(8).toString('hex') });
});

app.listen(PORT, () => {
  console.log('Online');
});
