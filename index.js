const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('fs').promises;
const talkers = require('./talker.json');
// const login = require('./routes/loginRoutes');

const {
  generateToken,
  authAge,
  authEmail,
  authName,
  authPassword,
  authRate,
  authToken,
  authWatchedAt,
  talkerSearch,
  authTalk,
} = require('./middlewares');

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

app.get('/talker/search', authToken, talkerSearch);

app.get('/talker', async (req, res) => {
  const talkersJson = await fs.readFile(talkers);
  const response = JSON.parse(talkersJson);

  if (!response) {
    return res.status(200).json(Array([]));
  } 

 return res.status(200).json(response);
});

app.get('/talker/:id', rescue(async (req, res) => {
    const talkersJson = await fs.readFile(talkers);
    const response = JSON.parse(talkersJson);
    const { id } = req.params;
    const chosenTalker = response.find((talker) => talker.id === Number(id));
  
    if (!chosenTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } 

    return res.status(200).json(chosenTalker);
  }));

app.post('/login', authEmail, authPassword, generateToken);

app.post('/talker',
  authToken,
  authName,
  authAge,
  authTalk,
  authWatchedAt,
  authRate,
  rescue(async (req, res) => {
    const { body } = req;
    const talkersJson = await fs.readFile(talkers);
    const currTalkers = JSON.parse(talkersJson);
    const id = currTalkers.length + 1;
    const currIds = { ...body, id };
    const newTalkers = [...currTalkers, currIds];
    fs.writeFile(talkers, JSON.stringify(newTalkers));
    return res.status(201).json(currIds);
}));
