const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('fs').promises;

const talkerJson = ('./talker.json');
const { randomToken,
  verifyEmail,
  verifyPassword,
  verifyName,
  verifyAge,
  verifyWatchAt,
  verifyToken,
  verifyTalk,
  verifyRate } = require('./middlewares');

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

// Requisito 1
app.get('/talker', async (req, res) => {
  const talkers = await fs.readFile(talkerJson); 
  const result = JSON.parse(talkers);
  if (!result) res.status(200).json(Array([]));

return res.status(200).json(result);
});

// Requisito 2
app.get('/talker/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(talkerJson); 
  const result = JSON.parse(talkers);
  const searchId = result.find((palestrante) => palestrante.id === Number(id));
  if (!searchId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
    return res.status(200).json(searchId);
}));

// Requisito 3
app.post('/login', verifyEmail, verifyPassword, randomToken);

// Requisito 4
app.post('/talker', verifyToken, verifyName, verifyAge, verifyTalk,
  verifyWatchAt, verifyRate, rescue(async (req, res) => {
    const { body } = req;
    const talkers = await fs.readFile(talkerJson); 
    const old = JSON.parse(talkers);
    const id = old.length + 1;
    const y = { ...body, id };
    const x = [...old, y];
    fs.writeFile(talkerJson, JSON.stringify(x));
    res.status(201).json(y);
  }));