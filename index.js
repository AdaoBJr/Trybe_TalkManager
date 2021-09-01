const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');
const {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAndRate,
} = require('./validations');

// console.log(crypto.randomBytes(8).toString('hex'))

async function getTalkers() {
  const file = await fs.readFile('./talker.json', 'utf-8');

  const arrFile = JSON.parse(file);

  return arrFile;
}

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerList = await getTalkers();

  const talkerId = talkerList.find((talker) => talker.id === Number(id));
  
  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talkerId);
});

app.get('/talker', async (req, res) => {
  const talkersList = await getTalkers();
  res.status(200).json(talkersList);
});

app.post('/login',
  validateEmail,
  validatePassword,
  (req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    res.status(200).json({ token });
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAndRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkersList = await getTalkers();
    talkersList.push({ id: talkersList.length + 1, name, age, talk });
    fs.writeFile('./talker.json', JSON.stringify(talkersList));    
    return res.status(201).json(talkersList[talkersList.length - 1]);
});

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAndRate,
  async (req, res) => {
    // console.log('caiu aqui?')
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkersList = await getTalkers();
    const talkIndex = talkersList.findIndex((talker) => talker.id === Number(id));
    talkersList[talkIndex] = { id: Number(id), name, age, talk };
    fs.writeFile('./talker.json', JSON.stringify(talkersList));    
    return res.status(200).json(talkersList[talkIndex]);
});

app.delete('/talker/:id',
  validateToken,
  async (req, res) => {
    const { id } = req.params;
    const talkerList = await getTalkers();

    const talkIndex = talkerList.findIndex((talker) => talker.id === Number(id));
    console.log(talkIndex);

    talkerList.splice(talkIndex, 1);
    fs.writeFile('./talker.json', JSON.stringify(talkerList));

    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
