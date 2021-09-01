const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const dayFormat = '(0[1-9]|1[0-9]|2[0-9]|3[0-9])';
const monthFormat = '(0[1-9]|1[0-2])';
const yearFormat = '(201[4-9]|202[0-9])';
const numberList = [1, 2, 3, 4, 5];
const dateFormat = new RegExp(`${dayFormat}/${monthFormat}/${yearFormat}`);

const token = crypto.randomBytes(8).toString('hex');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talker = require('./talker.json'); 

const validateUser = (req, res, next) => {
  const { email, password } = req.body;
  const mailFormat = /[a-z]+@[a-z]+.com/g;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!email.match(mailFormat)) {
 return res.status(400)
  .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 

if (password.length < 6) {
 return res.status(400)
.json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}
next();
};

const validateTalker = (req, res, next) => {
  const { name, age } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) { 
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
}
  if (!age) {
 return res.status(400).json({ message: 'O campo "age" é obrigatório',
}); 
}
if (age < 18) {
 return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade',
}); 
}
next();
};

// para fazer a lógica do regex da data eu me baseei nesse link https://www.ti-enxame.com/pt/regex/regex-para-validar-o-formato-de-data-dd-mm-aaaa/1072768822/
const validateTalkerTalk = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  const verifyNumber = numberList.find((el) => el === rate);
  if (!watchedAt && !rate) {
 return res.status(400)
  .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
} 
  if (!watchedAt.match(dateFormat)) {
 return res.status(400)
  .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
}
if (!verifyNumber) {
 return res.status(400)
.json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5',
}); 
} 
next();
};

const validateTalkExists = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400)
   .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
   }
   next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(token);

  if (!authorization) {
 return res.status(401)
  .json({ message: 'Token não encontrado' }); 
}
if (authorization !== token) {
  return res.status(401)
  .json({ message: 'Token inválido' });
}
next();
};

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
  console.log(talker.length);
  if (talker === []) return res.status(200).json([]);
  return res.status(200).json(talker);
});
app.post('/talker', validateToken, validateTalker, 
validateTalkExists, validateTalkerTalk, (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newTalker = {
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  talker.push(newTalker); 
     fs.writeFileSync('./talker.json', JSON.stringify(talker));

  return res.status(201).json(talker);    
});

app.post('/login', validateUser, (req, res) => res.status(200).json({ token }));