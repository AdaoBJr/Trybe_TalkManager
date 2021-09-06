const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
// const talkRoutes = require('./talkRoutes');

const { validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateRate,
  validateDate, 
  validateTalk,
} = require('./middleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const getTalkers = () => fs.readFile('./talker.json', 'utf-8')
  .then((res) => JSON.parse(res));

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
  return res.status(HTTP_OK_STATUS).json(talkerList);
});

app.post(
  '/login',
  validateEmail,
  validatePassword,
  async (req, res) => {
    const token = crypto.randomBytes(8).toString('hex'); 
    return res.status(200).json({ token });
  },
);

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateDate,
  async (req, res) => {
  const talkerList = await getTalkers();
  const id = talkerList.length + 1;
  const { name, age, talk } = req.body;
  const newTalker = {
    id,
    name,
    age,
    talk };

  talkerList.push(newTalker);
  const addTalker = (content) => fs.writeFile('./talker.json', JSON.stringify(content));

  addTalker(talkerList);
  return res.status(201).json(newTalker);
  },
);

app.listen(PORT, () => {
  console.log(`Online na porta: ${PORT}`);
});