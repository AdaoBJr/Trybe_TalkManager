const express = require('express');
const bodyParser = require('body-parser');
const {
  getTalkers,
  validateEmail, 
  validatePassword,
  token,
  valideTalker,
  valideTalkerName,
  valideTalkerAge,
  valideTalkerWatchedAt,
  valideTalkerRate,
  valideTalkerToken,
  createTalker,
   } = require('./request');

const app = express();
app.use(bodyParser.json());

const NOT_FOUND = 404;
const ERRO_400 = 400;
const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await getTalkers();
  if (talker) {
    return res.status(HTTP_OK_STATUS).json(talker);
  } 
   return res.status(HTTP_OK_STATUS).json([]);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkers();
  const talkerID = talker.find(({ id: idTalker }) => Number(idTalker) === Number(id));
  if (talkerID) {
    return res.status(HTTP_OK_STATUS).json(talkerID);
  } 
    return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const resultEmail = validateEmail(email);
  const resultPass = validatePassword(password);

  if (!resultEmail && !resultPass) {
    const TOKEN = token(email);
    req.headers.authorization = TOKEN;
  return res.status(HTTP_OK_STATUS).json({ token: TOKEN });
  } if (!validateEmail(email)) {
     return res.status(ERRO_400).json(resultPass);
    } 
      res.status(ERRO_400).json(resultEmail);
});

app.post('/talker',
valideTalkerToken,
valideTalkerName,
valideTalkerAge,
valideTalker,
valideTalkerWatchedAt,
valideTalkerRate,
createTalker,
async (req, res) => {
  const { name, age, talk } = req.body;
  res.status(201).json({ id: 5, name, age, talk });
});

// app.put('/talker:id', (req, res) => {
  
// });

app.listen(PORT, () => {
  console.log('Online');
});
