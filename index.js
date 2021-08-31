const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

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

async function datas() {
  const response = await fs.readFile('./talker.json', 'utf8');
  const data = JSON.parse(response);
  return data;
}

async function palestrantes(_req, res) {
  const data = await datas();
  console.log(data);
  if (data.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  return res.status(HTTP_OK_STATUS).json(data);
}

app.get('/talker', palestrantes);
/* 
async function idPalestrante(req) {
  const { params: { id } } = req;

  return
}

app.get('/talker/:id', idPalestrante); */
