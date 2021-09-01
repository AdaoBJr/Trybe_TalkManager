const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalkers = () => fs.readFile('./talker.json', 'utf-8').then((res) => JSON.parse(res));

app.get('/talker/:id', async (req, res) => {
  const talkerList = await getTalkers();

  const { id } = req.params;
  const talkerFiltered = talkerList.filter((manager) => parseInt(id, 10) === manager.id);
  
  if (talkerFiltered.length === 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  
  return res.status(HTTP_OK_STATUS).json(...talkerFiltered);
});

app.get('/talker', async (req, res) => {
  const talkerList = await getTalkers();

  if (!talkerList === []) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  return (
    res.status(HTTP_OK_STATUS).json(talkerList)
  );
});

const validateEmail = (email) => {
  const emailTester = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
  if (emailTester.test(email)) return true; 
};

const validatePassword = (password) => {
  const PASSWORD_LENGTH = 6;
  if (password.length >= PASSWORD_LENGTH) return true; 
};

// app.use(authMiddleware);

app.post('/login', (req, res) => {
  const { email, password } = req.headers;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!password) return res.status(400).json({ message: 'O campo "passoword" é obrigatório' });

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato email@email.com' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
