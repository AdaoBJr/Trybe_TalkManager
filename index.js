const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

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

async function readFile(path) {
  try {
    const file = await fs.readFile(path, 'utf-8');
    return file.then((data) => JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
}

app.get('/talker', async (_req, res) => {
  const talkers = await readFile('./talker.json');
  if (!talkers) {
    return res.status(200).send([]);
  }
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile('./talker.json');
  const talker = talkers.find((el) => el.id === parseInt(id, 10));

  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    }); 
  }  
  return res.status(HTTP_OK_STATUS).send(talker);
});

function emailValidation(email) {
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validation.test(String(email).toLowerCase());
}
// reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test

function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValidation(email)) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
   next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.toString().length < 6) {
    return res.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

app.post('/login',
  validateEmail,
  validatePassword,
  (_req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token: `${token}` });
  });
