const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Source: https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js

function genarateRandomToken() {
  return crypto.randomBytes(8).toString('hex');
}

// const validateToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token !== '7mqaVRXJSp886CGr') return res.status(401).json({ message: 'Unauthorized!' });
//   next();
// };

const validateParams = (req, res) => {
  const { email, password } = req.body;
  if (!email) { return res.status(400).json({ message: 'O campo "email" é obrigatório' }); }
  if (!email.match(/\S+@\S+\.\S+/)) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
  if (!password) { return res.status(400).json({ message: 'O campo "password" é obrigatório' }); }
  if (password.length < 6) { 
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}
  return res.status(200).json({ token: genarateRandomToken() });
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile('./talker.json', 'utf8')
    .then((content) => res.status(200).send(JSON.parse(content)))
    .catch((err) => res.status(401)
    .json({ message: `Unable to read file... Error ${err.message}` }));
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile('./talker.json', 'utf-8')
    .then((content) => JSON.parse(content))
    .then((content) => {
      const talkerIndex = content.findIndex((talker) => talker.id === Number(id));
      if (talkerIndex === -1) {
        return res.status(404).json({
          message: 'Pessoa palestrante não encontrada',
        });
      }
      return res.status(200).send(content[talkerIndex]);
  })
    .catch((err) => res.status(401)
    .json({ message: err.message }));
});

app.post('/login', validateParams);

// app.post('/talker', (req, res, next) => {});

// app.put('/talker/:id', (req, res, next) => {});

// app.delete('/talker/:id', (req, res, next) => {});

// app.get('/talker/search?q=searchTerm', (req, res, next) => {});

app.listen(PORT, () => {
  console.log('Online');
});
