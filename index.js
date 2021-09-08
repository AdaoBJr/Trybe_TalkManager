const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const randToken = require('rand-token');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

async function writeFile(req, res, next) {
  const { file } = req;
  const newClient = req.body;
  newClient.id = file.length + 1;
  const newFile = [...file, newClient];
  try {
    await fs.writeFile('./talker.json', JSON.stringify(newFile));
    return next();
  } catch (err) {
    return next(err);
  }
}

async function readFile(req, _res, next) {
  try {
    const stringData = await fs.readFile('./talker.json');
    req.file = JSON.parse(stringData);
    return next();
  } catch (err) {
    return next(err);
  }
}

const validRate = (rate) => (!!(rate >= 1 && rate <= 5));

const validToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  return next();
};

const validNameAge = async (req, res, next) => {
  const { name, age } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  return next();
};

const validTalk = async (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  return next();
};

const validWatchedAtRate = async (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  if (validRate(rate) === false) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!watchedAt || !rate) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;
  if (dateRegex.test(watchedAt) === false) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', readFile, (req, res) => {
  const { file } = req;
  return res.status(HTTP_OK_STATUS).json(file); 
});

app.get('/talker/:id', readFile, (req, res) => {
  const { id } = req.params;
  const { file } = req;
  const filterPeople = file.filter((people) => people.id === parseFloat(id));
    if (filterPeople.length > 0) { 
      return res.status(HTTP_OK_STATUS).json(...filterPeople); 
    }
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', (req, res) => {
  const token = randToken.generate(16);
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (password.length <= 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', validToken, validNameAge, validTalk, validWatchedAtRate, readFile, writeFile,
  async (_req, res) => {
  const data = await fs.readFile('./talker.json');
  const file = JSON.parse(data);
  const newData = file[file.length - 1];
  return res.status(201).json(newData);
});

app.use((err, _req, res, _next) => {
  res.status(500).send(err);
});

app.listen(PORT, () => {
  console.log('Online');
});
