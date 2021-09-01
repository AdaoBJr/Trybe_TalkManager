const express = require('express');
const bodyParser = require('body-parser');
const { 
  readFileTalker, 
  getTalkerById,
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  generateRandomToken,
  validateAge,
  validateDate,
  validateName,
  validateRate,
  validateTalker,
  validateToken,
  addTalker,
  deleteTalker } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// 6
app.delete('/talker/:id', [
  validateToken,
  deleteTalker,
]);

// 4
app.post('/talker', 
  validateToken,
  validateName, 
  validateAge, 
  validateTalker, 
  validateDate, 
  validateRate,   
  addTalker);

// 3
app.post('/login', checkIfEmailIsValid, checkIfPasswordIsValid, (_req, res) => {
  res.status(200).json({ token: generateRandomToken() });
});

// 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerId = await getTalkerById(id);

  if (talkerId) {
    return res.status(200).json(talkerId);
  }
  
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

// 1
app.get('/talker', async (req, res) => {
  const getAllTalkerList = await readFileTalker();
  return res.status(200).send(getAllTalkerList);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
