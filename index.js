const express = require('express');
const bodyParser = require('body-parser');
const { readTalkerJson } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (req, res) => {
  try {
    const talkers = await readTalkerJson();
    res.status(200).send(talkers);
  } catch (error) {
    res.status(400).send(error);
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
