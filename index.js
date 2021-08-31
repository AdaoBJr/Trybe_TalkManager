const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

fs.readFileSync('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile('./talker.json', (err, content) => {
    if (err) {
      return res.status(200).json([]);
    }
    res.status(200).json(JSON.parse(content.toString('utf8')));
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
