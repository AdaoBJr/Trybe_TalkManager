const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const { readContentFile } = require('./helpers/readWriteFile');

const talkers = 'talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const content = (await readContentFile()) || [];
  return res.status(200).send(content);
});

app.get('/talker/id', (req, res) => {
  const id = req.params;
});

app.listen(PORT, () => {
  console.log('Online');
});
