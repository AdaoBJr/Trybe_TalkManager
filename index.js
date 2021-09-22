const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const { talkersAll, talker } = require('./data.js');
const { emailValid, passwordValid } = require('./middleware.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkers = await talkersAll();
    response.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (request, response) => {
  const id = await talker(request.params.id);
  if (!id) { 
    return response.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' }); 
  }
  response.status(HTTP_OK_STATUS).json(id);
});

app.post('/login', emailValid, passwordValid, async (request, response) => {
  const token = randomBytes(8).toString('hex');
  response.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
