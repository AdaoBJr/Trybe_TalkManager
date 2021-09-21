const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKERS = JSON.parse(fs.readFileSync('talker.json'));
const HTTP_FAIL_STATUS = 404;
const FAIL_MESSAGE = { message: 'Pessoa palestrante não encontrada' };

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', (_request, response) => {
  response.status(HTTP_OK_STATUS).send(TALKERS);
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const talker = TALKERS.find((talk) => talk.id === parseInt(id, 10));

  if (!talker) {
    return response.status(HTTP_FAIL_STATUS).send(FAIL_MESSAGE);
  }
  response.status(HTTP_OK_STATUS).send(talker);
});
