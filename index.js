const fs = require('fs').promises;
// const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
// const { json } = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

async function getTalker() {
  const resConvert = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(resConvert);
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('Diretorio Raiz');
});
// está escutando as requisições feitas pelos usuários.
app.get('/talker', async (_request, response) => {
  const talker = await getTalker();
  response.status(HTTP_OK_STATUS).send(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
