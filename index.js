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

app.listen(PORT, () => {
  console.log('Online');
});

/*
  1 - Crie o endpoint GET /talker:

  - O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200
  - Caso não exista nenhuma pessoa palestrante cadastrada o endpoint deve retornar um array vazio e o status 200.

*/

const talkers = 'talker.json';

app.get('/talker', (_req, res) => {
  const data = JSON.parse(fs.readFileSync(talkers, 'utf-8'));

  if (!data) {
    return res.status(200).json([]);
  }
  res.status(200).json(data);
});
