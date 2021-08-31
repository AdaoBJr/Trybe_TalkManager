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

app.get('/talker', async (_request, response) => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    response.status(HTTP_OK_STATUS).send(data);
  } catch (err) {
    response.status(200).send([]);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
