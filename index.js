const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talkers = [
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
  const talkerFiltered = talkers.filter((manager) => parseInt(id, 10) === manager.id);
  
  if (!talkerFiltered) {
    return res.status(404).json({ message: 'Manager not found!' });
  }
  
  return res.status(HTTP_OK_STATUS).json({ talkerFiltered });
});

app.get('/talker', (req, res) => res.status(HTTP_OK_STATUS).json({ talkers } || []));

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

  if (!email) return res.status(400).json({ message: 'O campo email é obrigatório' });

  if (!password) return res.status(400).json({ message: 'O campo passoword é obrigatório' });

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'O email deve ter o formato email@email.com' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'O password deve ter pelo menos 6 caracteres' });
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
