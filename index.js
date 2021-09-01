const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { isValidToken,
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt, 
  isValidRate,
  createToken,
  } = require('./middleware/validations.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// 2
app.get('/talker/:id', async (req, res, _next) => {
  const dataSpeaker = await fs.readFile('./talker.json', 'utf8');
  const speakerAll = await JSON.parse(dataSpeaker);
  const speaker = speakerAll.find((element) => element.id === Number(req.params.id));
  if (!speaker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
  return res.status(200).json(speaker);
});

// 1
app.get('/talker', async (_req, res, _next) => {
  const DataSpeakers = await fs.readFile('./talker.json', 'utf8');
  const speakers = await JSON.parse(DataSpeakers);
  if (!speakers) return res.status(200).json([]);
  return res.status(200).json(speakers);
});

app.post('/talker',
isValidToken,
isValidName,
isValidAge,
isValidTalk,
isValidWatchedAt,
isValidRate,
(req, _res) => {
  // const objTalker = req.body;
  // const a = fs.writeFile('./talker.json', objTalker);
  // return console.log(a, 'AQUI');
  // res.status(201).json({});

  // const a = fs.writeFile('./talker.json', 'utf8');
});

app.post('/login',
isValidEmail,
isValidPassword,
(_req, res) => {
  res.status(200).json({ token: createToken(16) });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
