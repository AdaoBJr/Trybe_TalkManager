const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const msgErro = { message: 'Pessoa palestrante não encontrada' }; 

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

async function dataPalestrantes() {
  const response = await fs.readFile('./talker.json', 'utf8');
  return JSON.parse(response);
}

async function palestrantes(_req, res) {
  const data = await dataPalestrantes();
  if (data.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  return res.status(HTTP_OK_STATUS).json(data);
}

app.get('/talker', palestrantes);

async function idPalestrante(req, res) {
  const { params: { id } } = req;
  const data = await dataPalestrantes();
  const aux = data.find((auxa) => auxa.id === +id);
  if (!aux) {
    return res.status(404).json(msgErro);
  }
  return res.status(HTTP_OK_STATUS).json(aux);
}

app.get('/talker/:id', idPalestrante);
