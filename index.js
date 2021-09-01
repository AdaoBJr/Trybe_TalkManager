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
  updatePalestrantesList } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// 1
app.get('/talker', async (req, res) => {
  const getAllTalkerList = await readFileTalker();
  return res.status(200).send(getAllTalkerList);
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

// 3
app.post('/login', checkIfEmailIsValid, checkIfPasswordIsValid, (_req, res) => {
  res.status(200).json({ token: generateRandomToken() });
});

// 4
app.post('/talker', 
  validateToken,
  validateName, 
  validateAge, 
  validateTalker, 
  validateDate, 
  validateRate,   
  addTalker);

const router = express.Router();
// 5
router.put('/:id', 
  validateToken, 
  validateName, validateAge, validateTalker, validateDate, validateRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const palestrantes = await readFileTalker();

  const palestranteIndex = palestrantes.findIndex((palestrante) => 
    palestrante.id === parseInt(id, 10));

  if (palestranteIndex === -1) return res.status(404).json({ message: 'Palestrante not found' });
  palestrantes[palestranteIndex] = { ...palestrantes[palestranteIndex], name, age, talk };
  updatePalestrantesList(palestrantes);
  res.status(200).json(palestrantes[palestranteIndex]);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
