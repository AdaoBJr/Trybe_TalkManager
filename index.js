const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// requisito 2
app.get('/talker/:id', async (request, response) => {
  const arrayTalker = await fs.readFile('./talker.json', 'utf-8');
  const talker = JSON.parse(arrayTalker);
  const { id } = request.params;
  const newArray = talker.find((req) => req.id === parseInt(id, 10));
  
  if (!newArray) {
    return response.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  
  return response.status(200).json(newArray);
});

// requisito 1
app.get('/talker', async (_request, response) => {
  const arrayTalker = await fs.readFile('./talker.json', 'utf-8');
  const talker = JSON.parse(arrayTalker);
  if (arrayTalker.length === 0) {
    return response.status(200).json([]);
  }
  return response.status(200).json(talker);
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
  (request, response, next) => {
    const { email, password } = request.body;

    if (!(email.includes('@') && email.includes('.com'))) {
      return response.status(400).json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }

    if (password.length < 6) {
      return response.status(400).json({
        message: 'O "password" deve ter pelo menos 6 caracteres',
      });
    }

    next();
  },
  (_request, response) => {
    const token = crypto.randomBytes(16).toString('hex');
    
    return response.status(200).json({ token });
  });

// requisito 4

// app.post('/talker', (request, response, next) => {
//   const token = request.headers;
//   const newTalker = request.body;

// });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
