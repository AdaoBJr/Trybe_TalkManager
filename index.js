const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const talkerJson = ('./talker.json');

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

// Requisito 1
app.get('/talker', async (req, res) => {
  const talkers = await fs.readFile(talkerJson); 
  const result = JSON.parse(talkers);
  if (!result) {
    return res.status(200).json(Array([]));
  }
return res.status(200).json(result);
});