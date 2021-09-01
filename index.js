const fs = require('fs').promises;
const rescue = require('express-rescue');
const crypto = require('crypto');

const express = require('express');
const bodyParser = require('body-parser');
// const { json } = require('body-parser');
const authLogin = require('./middleware/login.js');

const app = express();

app.use(bodyParser.json());
app.use(authLogin);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Função para ler o Json!
 const getTalker = async () => {
  const resConvert = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(resConvert);
};

// Função para criar o Token!

// const getToken = () => {
// const aleatoryToken = crypto.randomBytes(8).toString('hex');
// return aleatoryToken;
// };

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('Diretorio Raiz');
});
// está escutando as requisições feitas pelos usuários.

//  REQUISITO 1

app.get('/talker', async (_request, response) => {
  const talker = await getTalker();
  response.status(HTTP_OK_STATUS).send(talker);
});

// REQUISITO 2

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

// REQUISITO 3

app.post('/login', (_request, response) => {
  const token = crypto.randomBytes(8).toString('hex');
  // const token = '7mqaVRXJSp886CGr'; 

  response.status(HTTP_OK_STATUS).json({
    token,
  });
});

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