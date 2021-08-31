const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const file = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const getTalker = async () => {
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
};

app.get('/talker', async (_request, response) => {
  const data = await getTalker();
  response.status(HTTP_OK_STATUS).send(data);
});

app.listen(PORT, () => {
  console.log('Online');
});
