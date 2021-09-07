const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const { getAllTalkers, getTalker, postTalker } = require('./readFile.js');
const { emailValidation,
        passwordValidation,
        tokenValidation,
        nameValidation,
        ageValidation,
        talkValidation,
        watchedAtValidation,
        rateValidation,
      } = require('./authMiddleware');

// não remova esse endpoint, e para o avaliador funcionar;
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
    const talkers = await getAllTalkers();
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
    const talker = await postTalker(body);
    response.status(201).json(talker);
},
);

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talker = await getTalker(id);
  if (!talker) return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  response.status(200).json(talker);
});

app.post('/login', emailValidation, passwordValidation, async (request, response) => {
  response.status(HTTP_OK_STATUS).json({ token: randomBytes(8).toString('hex') });
});

app.listen(PORT, () => {
  console.log('Online');
});
