const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;
const PORT = '3000';

const managers = [
  {
    name: 'Henrique Albuquerque',
    age: 62,
    id: 1,
    talk: { watchedAt: '23/10/2020', rate: 5 },
  },
  {
    name: 'Heloísa Albuquerque',
    age: 67,
    id: 2,
    talk: { watchedAt: '23/10/2020', rate: 5 },
  },
  {
    name: 'Ricardo Xavier Filho',
    age: 33,
    id: 3,
    talk: { watchedAt: '23/10/2020', rate: 5 },
  },
  {
    name: 'Marcos Costa',
    age: 24,
    id: 4,
    talk: { watchedAt: '23/10/2020', rate: 5 },
  },
];

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const managerFiltered = managers.filter((manager) => parseInt(id, 10) === manager.id);

  if (!managerFiltered) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'Manager not found!' });
  }

  return res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
});

app.get('/talker', (req, res) => {
  if (!managers) {
    return res.status(HTTP_OK_STATUS).send('oi');
  }
  return res.status(HTTP_OK_STATUS).json(managers);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
