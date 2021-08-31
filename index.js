const express = require('express');
const bodyParser = require('body-parser');
const { readFileTalker, setFile } = require('./readFileTalker');
const { validateEmail, validatePassword } = require('./validateUser');
const { 
  validateName, 
  validateAge, 
  validateTalk, 
  validateDateAndRate, 
} = require('./validateTalker');

const generateToken = require('./generateToken');
const validateToken = require('./validateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = generateToken();

  return res.status(200).json({ token });
});

app.get('/talker', async (_req, res) => {
  const file = await readFileTalker();
  if (!file) {
    return res.status(404).json({ message: 'talker not found' });
  }
  return res.status(200).json(file);
});

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await readFileTalker();

 if (!q || q === '') {
    return res.status(200).json(talkers);
  }

  const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));

  if (filteredTalkers) {
    return res.status(200).json(filteredTalkers);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const file = await readFileTalker();

  const talker = file.find((person) => person.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});

app.post('/talker', validateToken, validateName, 
  validateAge, validateTalk, validateDateAndRate, async (req, res) => {
    const dataTalker = req.body;

    const newUser = await setFile(dataTalker);
    
    return res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log('Online');
});
