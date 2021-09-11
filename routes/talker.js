const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const ageMidd = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  return next();
};

const nameMidd = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

// https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy-with-leap-year-support
const checkDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  return regex.test(date);
};

const dateMidd = (req, res, next) => {
  const { talk } = req.body;
  const isValid = checkDate(talk.watchedAt);

  if (!isValid) {
    return res
      .status(400)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  return next();
};

const talkMidd = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || (talk.watchedAt === undefined || talk.rate === undefined)) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  return next();
};

const tokenMidd = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } 
  if (token !== '7mqaVRXJSp886CGr') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  return next();
}; 

app.get('/search', tokenMidd, (req, res) => { // localhost:3000/talker/search
  const query = req.query.q;
  const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  const search = talkers.filter(({ name }) => name.includes(query));

  if (search) {
    res.status(200).json(search);
  }
  res.status(200).json(talkers);
});

app.get('/', (req, res) => {
  const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
   res.status(200).json(talkers);
});

app.get('/:id', (req, res) => {
  const idParam = req.params.id;
  const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  const talker = talkers.find(({ id }) => id === Number(idParam));
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.use(tokenMidd);

app.delete('/:id', (req, res) => { // localhost:3000/talker/:id
  const idParam = req.params.id;
  const id = Number(idParam);
  const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  const index = id - 1;
  talkers.splice(index, 1);
  fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(talkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.use(nameMidd);
app.use(ageMidd);
app.use(talkMidd);
app.use(dateMidd);

app.post('/', (req, res) => {
  const talker = req.body;
  const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  talker.id = talkers.length + 1;
  talkers.push(talker);
  fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(talkers));
  res.status(201).json(talker);
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  talkers[id - 1] = { id: Number(id), ...req.body };
  fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(talkers));
  res.status(200).json(talkers[id - 1]);
});

module.exports = app;
