const express = require('express');
const bodyParser = require('body-parser');

const { 
  getTalker,
  getTalkerById,
  validateEmail,
  validatePassword,
} = require('./middleware');

const { generateToken } = require('./randomToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await getTalkerById(id);
  if (data) return res.status(HTTP_OK_STATUS).send(data);
  return res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
});

app.get('/talker', async (_req, res) => {
  const data = await getTalker();
  res.status(HTTP_OK_STATUS).send(data);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const checkEmail = validateEmail(email);
  const checkPassword = validatePassword(password);

  if (checkEmail !== 'pass') return res.status(400).json(checkEmail);
  if (checkPassword !== 'pass') return res.status(400).json(checkPassword);

  const token = generateToken(16);
  res.status(HTTP_OK_STATUS).json({ 
    token,
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
