const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  try {
    const talkerData = fs.readFileSync('talker.json');
    res.status(200).json(JSON.parse(talkerData));
  } catch (err) {
    res.status(200).json(JSON.parse([]));
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
