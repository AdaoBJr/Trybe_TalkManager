const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
// Busquei ajuda para utilizar o crypto nesse link:https://qastack.com.br/programming/8855687/secure-random-token-in-node-js;
const crypto = require('crypto');
// const { writeFile } = require('fs');
// const authLoginAndPassword = require('./login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_OK_STATUS = 400;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// REQUISITO 1
// Usei o async/await por se tratar de um funcção assíncrona (readFile);
app.get('/talker', async (_req, res) => {
  const getTalkers = await fs.readFile('./talker.json');
  const talkersJson = await JSON.parse(getTalkers);
  if (talkersJson.length === 0) {
    return res.status(HTTP_OK_STATUS).send([]);
  }
  return res.status(HTTP_OK_STATUS).send(talkersJson);
});

// REQUISITO 2
app.get('/talker/:id', async (req, res) => {
  const getTalkers = await fs.readFile('./talker.json');
  const talkersJson = await JSON.parse(getTalkers);
  const { id } = req.params;
  const getTheTalker = talkersJson.find((talker) => talker.id === +id);
  if (!getTheTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).send(getTheTalker);
});

// REQUISITO 3
const validaEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(HTTP_NOT_OK_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }

  const validateEmail = email.match(/[a-z]+@[a-z]+.com/g);
  if (!validateEmail
      ) {
      return res
          .status(HTTP_NOT_OK_STATUS)
            .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};
const validaSenha = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
      return res.status(HTTP_NOT_OK_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
      return res.status(HTTP_NOT_OK_STATUS)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};
app.post('/login', validaEmail,
validaSenha,
(_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

// REQUISITO 4
function validaToken(req, res, next) {
  const currToken = req.headers.authorization;
    if (!currToken) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (currToken.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  next();
}

function validaName(req, res, next) {
  const { name } = req.body;

  if (name === '' || name === undefined) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

function validaIdade(req, res, next) {
  const { age } = req.body;

  if (Number.isInteger(age) === false || !age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function validaSeTalkExiste(req, res, next) {
  const { talk } = req.body;
  if (!talk || talk === undefined) {
    return res
    .status(400)
    .json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  const { talk: { watchedAt, rate } } = req.body;
  if (!watchedAt || !rate) {
    return res
      .status(400)
        .json({
          message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
  }

  next();
}

function validaTalk(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;
  const arrDate = watchedAt.split('/');
  if (arrDate[0].length > 2) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (Number.isInteger(rate) === false || (rate < 1 || rate > 5)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

app.post('/talker',
  validaToken, validaName, validaIdade, validaSeTalkExiste, validaTalk, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await fs.readFile('talker.json'); 
  const indexTalker = JSON.parse(talkers);
  const newObj = {
    name,
    age,
    id: (indexTalker.length + 1),
    talk: {
      watchedAt,
      rate,
    },
  };
  const newArray = [...indexTalker, newObj];
  await fs.writeFile('talker.json', newArray);
  const newFieldAdded = await fs.readFile('talker.json');
  const newFieldJson = JSON.parse(newFieldAdded);
  const newField = newFieldJson.find((field) => field.name === name);
  return res.status(201).json({ newField });
});

// Middleware de erro
app.use((err, _req, res, _next) => {
  res.status(500).json({ message: `Opa! Deu ruim: ${err.message}` });
});

app.listen(PORT, () => {
  console.log('Online');
});
