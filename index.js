const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const token = crypto.randomBytes(8).toString('hex');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talker = require('./talker.json'); 

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const person = talker.find((el) => el.id === Number(id));
  if (!person) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(person);
});

app.get('/talker', (req, res) => {
  // console.log(talker.length);
  if (talker.length === 0) return res.status(200).json([]);
  return res.status(200).json(talker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const mailFormat = /[a-z]+@[a-z]+.com/g;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!email.match(mailFormat)) {
 return res.status(400)
  .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
if (password.length < 6) {
 return res.status(400)
.json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}

  return res.status(200).json({ token });
});