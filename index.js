const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const { allTalkers, talker } = require('./talkers.js');
const { emailValidation, passwordValidation } = require('./middleware');

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

app.get('/talker/:id', async (request, response) => {
const { id } = request.params;
const idTalker = await talker(id);
if (!idTalker) return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });

response.status(200).json(idTalker);
});

app.post('/login', emailValidation, passwordValidation, async (request, response) => {
  const token = randomBytes(8).toString('hex');
  response.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
