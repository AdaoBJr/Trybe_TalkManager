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
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({
        message: 'O campo "email" é obrigatório',
      });
    }

    if (!(email.includes('@') && email.includes('.com'))) {
      return response.status(400).json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }

    next();
  },
  (request, response, next) => {
    const { password } = request.body;

    if (!password) {
      return response.status(400).json({
        message: 'O campo "password" é obrigatório',
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
    const token = crypto.randomBytes(8).toString('hex');
    
    return response.status(200).json({ token });
  });

// requisito 4

app.post('/talker', 
  (request, response, next) => {
    const token = request.headers.authorization;
    
    if (!token) {
      return response.status(401).json({
        message: 'Token não encontrado',
      });
    }

    if (token.length !== 16) {
      return response.status(401).json({
        message: 'Token inválido',
      });
    }

    next();
  },
  (request, response, next) => {
    const { name } = request.body;
    
    if (!name) {
      return response.status(400).json({
        message: 'O campo "name" é obrigatório',
      });
    }

    if (name.length < 3) {
      return response.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
    }

    next();
  },
  (request, response, next) => {
    const { age } = request.body;
    
    if (!age) {
      return response.status(400).json({
        message: 'O campo "age" é obrigatório',
      });
    }

    if (typeof age === 'number' && age < 18) {
      return response.status(400).json({
        message: 'A pessoa palestrante deve ser maior de idade',
      });
    }

    next();
  },
  (request, response, next) => {
    const { talk } = request.body;
    
    if (!(talk.watchedAt && talk.rate)) {
      return response.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
    
    next();
  },
  (request, response, next) => {
    const { talk } = request.body;
    const formartDat = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    
    if (!formartDat.test(talk.watchedAt)) {
      return response.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    }

    if (typeof talk.rate === 'number' && talk.rate < 5 && talk.rate > 1) {
      return response.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
    }
    
    next();
  },
  async (request, response) => {
    const { name, age, talk } = request.body;
    const arrayTalker = await fs.readFile('./talker.json', 'utf-8');
    const talker = JSON.parse(arrayTalker);
    
    const number = talker.length;

    const newTalker = {
      id: number + 1,
      name,
      age,
      talk,
    };

    talker.push(newTalker);

    await fs.writeFile('./talker.json', JSON.stringify(talker));

    response.status(201).json(newTalker);
  });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
