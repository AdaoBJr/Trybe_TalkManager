const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/talker', (_req, res) => {
  try {
    const data = fs.readFileSync('./talker.json', 'utf8');
    res.status(200).send(data);
  } catch (error) {
    res.status(200).send([]);
  }
});

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
