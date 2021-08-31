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

async function req(_req, res) {
  const response = await fs.readFile('./talker.json', 'UTF-8');
  if (!response) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  const data = JSON.parse(response);
  return res.status(HTTP_OK_STATUS).json({ data });
}

app.get('/talker', req);
