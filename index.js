const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs').promises; // importei
// const { promisify } = require('util'); // 
// const rescue = require('express-rescue'); //
const { findId, 
  validateEmail, 
  validateSenha, 
  validateToken, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateDate, 
  validateRate, addToTalkers } = require('./middlewares');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkerFile = async () => JSON.parse(await fs.readFile('./talker.json', 'utf-8'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
/* ==================== */
app.get('/talker', async (req, res) => {
  const talker = await talkerFile();
  if (talker.length > 0) {
    return res.status(200).json(talker);
  }
  if (talker.length === 0) {
    return res.status(200).json([]);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await talkerFile();
  const talkerFind = findId(id, talker);
  if (talkerFind) {
    return res.status(200).json(talkerFind);
  }
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const correctEmail = validateEmail(email);
  const correctPassword = validateSenha(password);
  if (correctEmail !== 'checado') res.status(400).json(correctEmail);
  if (correctPassword !== 'checado') res.status(400).json(correctPassword);

  res.status(200).json({
    token: generateToken(),
  });
});

app.post('/talker', 
validateToken, 
validateName, 
validateAge, 
validateTalk, 
validateDate, 
validateRate,
addToTalkers);

app.listen(PORT, () => {
  console.log('Online');
});
