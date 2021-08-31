const express = require('express');
const fs = require('fs');
const { promisify } = require('util');

const { findOne,
  validarSenha,
  validarEmail, 
  // validaToken, 
  editTalker,
  validaNome, validaAge, validaDate, validaRate, validaTalk, addTalker } = require('./meddlewares');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {  
  fs.readFile('./talker.json', 'utf-8', promisify((err, content) => {
    if (err) {
      res.status(400).send({ message: 'Not Found' });
      return;
    }
    res.status(200).send(content);
  }));
});

app.get('/talker/:id', (req, res) => {  
  const { id } = req.params;
  fs.readFile('./talker.json', 'utf-8', promisify((err, content) => {
    const talkerFind = findOne(id, JSON.parse(content));  
    if (talkerFind) {
     return res.status(200).json(talkerFind);      
    }
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }));
});

app.post('/login', (req, res) => {  
  const { email, password } = req.body;
  const checkEmail = validarEmail(email);
  const checkPassword = validarSenha(password);

  if (checkEmail !== 'ok') res.status(400).json(checkEmail);
  if (checkPassword !== 'ok') res.status(400).json(checkPassword);

  res.status(200).json({
    token: '99999999',
  });
});

app.post('/talker', 
  // validaToken,
  validaNome, 
  validaAge, 
  validaTalk, 
  validaDate, 
  validaRate,   
  addTalker);

app.put('/talker/:id', 
  // validaToken,
  validaNome, 
  validaAge, 
  validaTalk, 
  validaDate, 
  validaRate,   
  editTalker);

app.listen(PORT, () => {
  console.log('Online');
});
