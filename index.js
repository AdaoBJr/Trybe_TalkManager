const express = require('express');
const bodyParser = require('body-parser');
const data = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const filterPeople = data.filter((people) => people.id === parseFloat(id));
    if (filterPeople.length > 0) { 
      return res.status(HTTP_OK_STATUS).json(...filterPeople); 
    }
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.get('/talker', (_req, res) => {
  if (data.length > 1) { return res.status(HTTP_OK_STATUS).json(data); }
  return res.status(HTTP_OK_STATUS).json([]);
});

app.listen(PORT, () => {
  console.log('Online');
});
