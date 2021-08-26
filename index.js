const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const { getTalkerData, addTalkerData, findTalkerById, generateRandomToken } = require('./fs-utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkerData = await getTalkerData();
  if (talkerData.length > 0) {
    res.status(200).json(talkerData);
  }
  if (talkerData.length === 0) {
    res.status(200).json([]);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  const searchResult = await findTalkerById(numberId);
  if (searchResult) {
    res.status(200).json(searchResult);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.post('/login', async (req, res) => {
  
});

app.listen(PORT, () => {
  console.log('Online');
});
