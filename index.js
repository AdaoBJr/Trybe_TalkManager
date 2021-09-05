const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const arrayTalker = [
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

// requisito 1
app.get('/talker', (_request, response) => response.status(HTTP_OK_STATUS).json(arrayTalker));

// requisito 2
app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const newArray = arrayTalker.find((req) => req.id === parseInt(id, 10));

  if (!newArray) {
    return response.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return response.status(200).json(newArray);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
