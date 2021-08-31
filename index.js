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

// #1 endpoint GET /talker
app.get('/talker', async (_req, res) => {
  res.status(HTTP_OK_STATUS).json(JSON.parse(await fs.readFile('./talker.json', 'utf-8')));
});

app.listen(PORT, () => {
  console.log('Online');
});
