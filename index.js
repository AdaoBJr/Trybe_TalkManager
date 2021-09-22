const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const talkers = './talker.json';
const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 400;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile(talkers, 'utf-8', (err, data) => {
    if (err) {
      res.status(HTTP_OK_STATUS).json([]);
    }
    const content = JSON.parse(data);
    res.status(HTTP_OK_STATUS).json(content);
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
