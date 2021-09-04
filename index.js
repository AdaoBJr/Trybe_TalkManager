const express = require('express');
const bodyParser = require('body-parser');

const { 
  readTalker,
  getTalkerById,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  validateToken,
  addTalker,
  editTalker,
  deleteTalker,
} = require('./middlewares/talkerMiddleware');

const {
  validateEmail,
  validatePassword,
} = require('./middlewares/loginValidate');

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
  const talkerList = await readTalker();
  const data = await getTalkerById(id, talkerList);
  if (data) return res.status(HTTP_OK_STATUS).send(data);
  return res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
});

app.get('/talker', async (_req, res) => {
  const data = await readTalker();
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

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  addTalker,
);

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  editTalker,
);

app.delete('/talker/:id', validateToken, deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
