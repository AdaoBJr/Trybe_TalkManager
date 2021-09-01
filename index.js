const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { 
  isValidToken,
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
const talkerJson = './talker.json';

// 2
app.get('/talker/:id', async (req, res, _next) => {
  const dataSpeaker = await fs.promises.readFile(talkerJson, 'utf8');
  const speakerAll = await JSON.parse(dataSpeaker);
  const speaker = speakerAll.find((element) => element.id === Number(req.params.id));
  if (!speaker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
  return res.status(200).json(speaker);
});

// 1
app.get('/talker', async (_req, res, _next) => {
  const DataSpeakers = await fs.promises.readFile(talkerJson, 'utf8');
  const speakers = await JSON.parse(DataSpeakers);
  if (!speakers) return res.status(200).json([]);
  return res.status(200).json(speakers);
});

// 4
app.post('/talker',
isValidToken,
isValidName,
isValidAge,
isValidTalk,
isValidWatchedAt,
isValidRate,
(req, res) => {
  const { name, age, talk: { rate, watchedAt } } = req.body;
  fs.readFile(talkerJson, 'utf8', (_err, contents) => {
    const dataFile = JSON.parse(contents);
    // fonte para colaboração na realização do post acima <https://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node>
    const lastPosition = dataFile[dataFile.length - 1]; 
    const id = lastPosition.id + 1;
    
    dataFile.push({ age, id, name, talk: { rate, watchedAt } });
    fs.writeFile(talkerJson, JSON.stringify(dataFile), (_error) => 
    res.status(201).json({ id, name, age, talk: { watchedAt, rate } }));
  });
});

app.put('/talker/:id',
isValidToken,
isValidName,
isValidAge,
isValidTalk,
isValidWatchedAt,
isValidRate,
async (req, res) => {
  const paramns = req.params.id;
  const id = Number(paramns);
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const objResponse = { id, name, age, talk: { watchedAt, rate } };

  const dataFile = await fs.promises.readFile(talkerJson, 'utf8');
  const dataArray = await JSON.parse(dataFile);
  const peopleIdex = dataArray.findIndex((e) => e.id === id);

  if (peopleIdex === -1) return res.status(400).json({ message: 'Palestrante não encontrado' });
  dataArray[peopleIdex] = objResponse;
  
  fs.writeFile(talkerJson, JSON.stringify(dataArray), () => 
  res.status(200).json(objResponse));
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
