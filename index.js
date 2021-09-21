const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { StatusCodes: { OK, NOT_FOUND } } = require('http-status-codes');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(OK).send();
});

app.listen(PORT, () => console.log('Online'));

app.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talkers);
  res.status(OK).json(result);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talkers);
  const talker = result.find((person) => person.id === parseInt(id, 10));
  if (!talker) return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(OK).json(talker);
});
