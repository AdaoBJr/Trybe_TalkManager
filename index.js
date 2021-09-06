const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const arrayTalker = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// requisito 1
app.get('/talker', (_request, response) => {
  if (arrayTalker.length === 0) {
    return response.status(200).json([]);
  }
  return response.status(200).json(arrayTalker);
});

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

// requisito 3

app.post('/login', 
  (request, response, next) => {
    const { email, password } = request.body;

    if (!email) {
      return response.status(400).json({
        message: 'O campo "email" é obrigatório',
      });
    }

    if (!password) {
      return response.status(400).json({
        message: 'O campo "password" é obrigatório',
      });
    }

    next();
  },
  (request, response) => {
    const { email, password } = request.body;

    if (!(email.includes('@') && email.includes('.com'))) {
      return response.status(400).json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }

    if (password.length !== 6) {
      return response.status(400).json({
        message: 'O "password" deve ter pelo menos 6 caracteres',
      });
    }

    const token = crypto.randomBytes(16).toString('hex');
    
    return response.status(200).json({ token });
  });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
