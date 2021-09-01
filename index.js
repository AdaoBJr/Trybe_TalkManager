const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;
const PORT = '3000';

app.get('/talker', async (req, res) => res.status(HTTP_OK_STATUS)
  .send(JSON.parse(await fs.readFile('talker.json', 'utf-8'))));

app.get('/talker/:id', async (req, res) => { 
  const { id } = req.params;
  const DB = JSON.parse(await fs.readFile('talker.json', 'utf-8'));
  const resp = DB.find((item) => item.id === +id);
  console.log(resp);
  if (!resp) {
    return res.status(HTTP_ERROR_STATUS).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).send(DB.find((item) => item.id === +id));
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// const rescue = require('express-rescue');
// const randomBytes = require('crypto');
// const token = randomBytes(8).toString('hex'); 
