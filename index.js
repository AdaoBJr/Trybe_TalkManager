const express = require('express');
const bodyParser = require('body-parser');
const { writeFile } = require('fs').promises;
const { readTalkerFunc } = require('./Helpers/readTalker');
const { loginFunc } = require('./Helpers/login');
const { validateParams } = require('./Helpers/addTalker');
const { validateToken,
  validateName,
  validateAge,
  validateWatchedAndRate,
  validateTalk } = require('./Helpers/validates');

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

app.get('/talker', async (_request, response) => {
  const data = await readTalkerFunc();
  return response.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await readTalkerFunc();
  const talkerData = data.find((talker) => talker.id === Number(id));
  if (!talkerData) {
 return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  }); 
}
  return res.status(HTTP_OK_STATUS).json(talkerData);
});

app.post('/login', loginFunc);

app.post('/talker', validateToken, validateParams, async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await readTalkerFunc();
  const newTalker = {
    id: data.length + 1,
    name,
    age,
    talk,
  };
  data.push(newTalker);
  await writeFile('./talker.json', JSON.stringify(data));
  return res.status(201).json(newTalker);
});

const validatePut = (req, res) => {
  const { name, age, talk } = req.body;
  if (validateName(name, res)) return 0;
  if (validateAge(age, res)) return 0;
  if (validateWatchedAndRate(talk, res)) return 0;
  if (validateTalk(talk, res)) return 0;
};
app.put('/talker/:id', validateToken, async (req, res) => {
  const { name, age, talk } = req.body;
  if (validatePut(req, res) === 0) return; 
  const { id } = req.params;
  const data = await readTalkerFunc();
  const talkerIndex = data.findIndex((t) => t.id === parseInt(id, 10));
  if (talkerIndex === -1) {
 return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  }); 
}
  data[talkerIndex] = { ...data[talkerIndex], name, age, talk };
  await writeFile('./talker.json', JSON.stringify(data));
  return res.status(200).json(data[talkerIndex]);
});