const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talker = './talker.json';

// funções
const readFile = async (arquivo) => {
  const resposta = await fs.readFile(arquivo, 'utf8');
  const parseResposta = JSON.parse(resposta);
  return parseResposta;
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const resposta = await readFile(talker);
  const findId = resposta.find((a) => a.id.toString === id);
  return res.status(200).json(findId);
});

app.get('/talker', async (req, res) => {
  const resposta = await readFile(talker);
  return res.status(200).json(resposta);
});
