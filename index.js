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

// https://stackoverflow.com/questions/17604866/difference-between-readfile-and-readfilesync
app.get('/talker', (_req, res) => {
  try {
    const talkers = fs.readFileSync('talker.json');
    res.status(HTTP_OK_STATUS).json(JSON.parse(talkers));
  } catch (error) {
    res.status(HTTP_OK_STATUS).json(JSON.parse([]));
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
