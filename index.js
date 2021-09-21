const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const talkers = require('./middlewares/index');
const registerValidation = require('./middlewares/registerValidation');

const {
  validateRegisterDate,
  validateTalkerRate,
  validateTalkerName,
  validateTalkerAge,
  validateToken,
  validateDate,
} = registerValidation;

const {
  getTalkerList,
  getTalker,
  loginValidation,
  tokenGen,
  register,
  deleteTalker,
  searchTalker,
} = talkers;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// const getTalkers = 'talker.json';
// app.get('/talker', (_req, res) => {
//   const talkers = fs.readFileSync(getTalkers, 'utf8');
//   if (talkers.length > 0) {
//     return res.status(200).json(JSON.parse(talkers));
//   }
//   return res.status(200).json([]);
// });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const talkerList = getTalkerList();
  return res.status(200).send(talkerList);
});

app.get('/talker/search', validateToken, async (req, res) => {
  const talker = await searchTalker(req.query.q);  
  return res.status(200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const talkerId = req.params.id;
  const talker = await getTalker(talkerId);

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const validation = loginValidation(email, password, res);

 if (validation) {
    const token = tokenGen();
    console.log(token);
    return res.status(200).json({ token });
  }
});

app.post('/talker',
validateToken,
validateTalkerName,
validateTalkerAge,
validateRegisterDate,
validateDate,
validateTalkerRate,
async (req, res) => {
  const talkerRegister = await register(req.body);

  return res.status(201).json(talkerRegister);
});

app.put('/talker/:id',
validateToken,
validateTalkerName,
validateTalkerAge,
validateRegisterDate,
validateTalkerRate,
validateDate,
async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const content = await fs.readFile('./talker.json');
  const talkersList = JSON.parse(content);

  const oldTalkers = talkersList.filter((talker) => talker.id !== +id);

  const updatedTalker = {
    id: +id,
    ...body,
  };

  await fs.writeFile('./talker.json', JSON.stringify([...oldTalkers, updatedTalker]));

  return res.status(200).json(updatedTalker);
});

app.delete('/talker/:id', validateToken,
async (req, res) => {
  const { id } = req.params;
  const delTalker = await deleteTalker(id);

  return res.status(200).json(delTalker);
});

// app.get('/talker/search', validateToken, searchTalker);

app.listen(PORT, () => {
  console.log('Online');
});
