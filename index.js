const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

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

const readFile = () => (
  fs.readFile('./talker.json')
  .then((response) => JSON.parse(response))
);

const generateToken = () => {
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z'];
  const token = [];
  for( let index = 1; index <= 15; index += 1) {
    number = Math.ceil(Math.random() * 9);
    token.push(number);
  }
  const letterPosition = Math.round(Math.random() * 25);
  return token.join('').concat(alphabet[letterPosition]);
}

app.get('/talker', async (_req, res) => {
 const content = await readFile();
 if (content.length > 0) {
  return res.status(200).json(content);
 }
 return res.status(200).send([]);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const content = await readFile();
  const targetTalker = content.find((talker) => talker.id === parseInt(id, 10));
  if (targetTalker) {
    return res.status(200).json(targetTalker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email === "") {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' })
  }
  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato email@email.com' })
  }
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório'})
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres'})
  }
  const token = generateToken();
  req.token = token;
  res.status(200).json({ token });
  next();
});