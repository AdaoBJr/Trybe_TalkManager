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

app.get('/talker', async (req, res) => {
  const file = await fs.readFile('./talker.json', 'utf-8');
  const arrFile = JSON.parse(file);
  res.status(200).json(arrFile);
});

app.listen(PORT, () => {
  console.log('Online');
});
