const fs = require('fs').promises;
const rescue = require('express-rescue');
// const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
// const { json } = require('body-parser');
const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

async function getTalker() {
  const resConvert = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(resConvert);
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('Diretorio Raiz');
});
// está escutando as requisições feitas pelos usuários.

// Requisito 1

app.get('/talker', async (_request, response) => {
  const talker = await getTalker();
  response.status(HTTP_OK_STATUS).send(talker);
});

// Requisito 2

app.get('/talker/:id', rescue(async (_request, response) => {
  const { id } = _request.params;
  const talker = await getTalker();
  const responseForUse = talker.find((AllTalkers) => AllTalkers.id === Number(id));
  if (!responseForUse) {
    return response.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
    return response.status(HTTP_OK_STATUS).send(responseForUse);
}));

// Requisito 3' ==> Agora está com next!!

app.post('/login', 
(req, res, next) => {
  const { email } = req.body;
  if (email === '') {
        return res.status(401).json({ message: 'O campo "email" é obrigatório' });
      } 

  next(); // 1 Email com string vazia
},
(req, res, next) => { 
  const { email } = req.body;
  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (validEmail.test(email) === false) {
        return res.status(401).json({ message: 'O "email" deve ter o formato "email@email.com"' });
      }
  next(); // 2 Email sem validade do regex
},
(req, res, next) => {
  const { password } = req.body;
  if (password === '') {
    return res.status(401).json({ message: 'O campo "password" é obrigatório' });
      } 

  next(); // 3 Password com string vazia
},

(req, res, next) => {
  const SIX = 6;
  const { password } = req.body;
  if (password.length > SIX) {
    return res.status(401).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
      } 

  next(); // 3 Password com string vazia
});

// 

app.listen(PORT, () => {
  console.log('Online');
});

  // app.post('/login', (req, res, next) => {
  //   const { email, password } = req.body;
  //   const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  //   const minOfCaracteres = 6;
  
  //   if (email === '') {
  //     return res.status(401).json({ message: 'O campo "email" é obrigatório' });
  //   }
  
  //   if (validEmail.test(email) === false) {
  //     return res.status(401).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  //   }
  
  //   if (password === '') {
  //     return res.status(401).json({ message: 'O campo "password" é obrigatório' });
  //   }
  
  //   // validação do email e password para status 200
  //   if (validEmail.test(email) && password.length > minOfCaracteres) {
  //     res.status(200).json({ message: 'token here' });
  //   }
  // });