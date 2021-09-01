const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs').promises;
const { readFile } = require('./helper/ fileHandling');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talker = await readFile();

  if (talker === null) return response.status(200).json([]);

  response.status(200).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
