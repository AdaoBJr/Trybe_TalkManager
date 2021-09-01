const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
// const util = require('util');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const talkerCaller = async () => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(data);
};

app.get('/talker/:id', async (req, res) => {
  const data = await talkerCaller();
  const { id } = req.params;
  const result = data.find((c) => c.id === Number(id));
  if (result.length === 0) {
  return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).send(result);
});

app.get('/talker', async (req, res) => {
  const data = await talkerCaller();
  if (data.length === 0) return res.status(HTTP_OK_STATUS).send([]);
  res.status(HTTP_OK_STATUS).send(data);
});

// app.post('/talker/', (req, res) => {
//   const { name, age, talk, watchedAt, rate } = req.body;

// });

app.listen(PORT, () => {
  console.log('Online');
});
