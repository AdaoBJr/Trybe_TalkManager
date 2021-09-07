const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

function checkEmail(email) {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]+$/i;
  return emailRegex.test(email);
}

app.post('/', (req, res) => {
  const { body } = req;
  const emailChecked = checkEmail(body.email);

  if (!body.email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!emailChecked) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!body.password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (body.password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = '7mqaVRXJSp886CGr';
  return res.status(200).json({ token });
});

module.exports = app; 
