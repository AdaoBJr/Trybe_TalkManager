// const { json } = require('body-parser');
const express = require('express');

const router = express.Router();

const fs = require('fs');
// const fsp = require('fs/promises');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const WritePromise = util.promisify(fs.writeFile);

const talkerJson = 'talker.json';

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' }); 
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const checkName = ({ name }, result) => {
  if (!name) return { notOk: true, message: 'O campo "name" é obrigatório' };
  if (name.length < 3) return { notOk: true, message: 'O "name" deve ter pelo menos 3 caracteres' };
  return result;
};

const checkAge = ({ age }, result) => {
  if (result.notOk) return result;
  if (!age) return { notOk: true, message: 'O campo "age" é obrigatório' };
  if (age < 18) return { notOk: true, message: 'A pessoa palestrante deve ser maior de idade' };
  return result;
};

const checkRateWatched = ({ talk }, result) => {
  if (result.notOk) return result;

  const notOk = true;
  if (!talk.watchedAt.includes('/')) {
    return { notOk, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  if (talk.rate < 1 || talk.rate > 5) {
    return { notOk, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  } 
  return result;
};

const checkExistsTalkWatchRate = ({ talk }, result) => {
  if (result.notOk) return result;
  const notOk = true;
  if (!talk) {
    return { 
      notOk, message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
  if (!talk.watchedAt) {
    return { 
      notOk, message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
  if (talk.rate === undefined) {
    return { 
      notOk, message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
  return result;
};

const validateTalker = (req, res, next) => {
  const talker = req.body;
  let result = { notOk: false, message: '' };
  result = checkName(talker, result);
  result = checkAge(talker, result);
  result = checkExistsTalkWatchRate(talker, result);
  result = checkRateWatched(talker, result);
  if (result.notOk) return res.status(400).json({ message: result.message });
  next();
};

router.get('/', async (req, res) => {
  const talkers = await readFilePromise(talkerJson)
  .then((content) => JSON.parse(content))
  .catch((err) => console.log(`erro: ${err.message}`));

  if (!talkers) res.status(200).json([]);

  return res.status(200).json(talkers);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;

  const talkers = await readFilePromise(talkerJson)
  .then((content) => JSON.parse(content))
  .catch((err) => console.log(`erro: ${err.message}`));

  if (!q || q === '') return res.status(200).json(talkers);

  const talker = talkers.filter(({ name }) => name.includes(q));

  return res.status(200).json(talker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await readFilePromise(talkerJson)
  .then((content) => JSON.parse(content))
  .catch((err) => console.log(`erro: ${err.message}`));

  const talker = talkers.find((talk) => talk.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

router.post('/', validateToken, validateTalker, async (req, res) => {
  const talkers = await readFilePromise(talkerJson)
  .then((content) => JSON.parse(content))
  .catch((err) => console.log(`erro: ${err.message}`));

  const { name, age, talk } = req.body;
  talkers.push({ id: talkers.length + 1, name, age, talk });

  const writedfile = await WritePromise(talkerJson, JSON.stringify(talkers))
  .then(() => true)
  .catch(() => false);

  if (!writedfile) return res.status(400).json({ message: 'arquivo não alterado' });
  return res.status(201).json({ id: talkers.length, name, age, talk });
});

router.put('/:id', validateToken, validateTalker, async (req, res) => {
  const { id } = req.params;  
  const talkers = await readFilePromise(talkerJson)
  .then((content) => JSON.parse(content))
  .catch((err) => console.log(`erro: ${err.message}`));

  const EditedTalkerIndex = talkers.findIndex((talker) => talker.id === +id);
  if (EditedTalkerIndex === -1) return res.status(404).json({ message: 'talker not found!' });

  const { name, age, talk } = req.body;
  talkers[EditedTalkerIndex] = { ...talkers[EditedTalkerIndex], name, age, talk };

  const writedfile = await WritePromise(talkerJson, JSON.stringify(talkers))
  .then(() => true)
  .catch(() => false);

  if (!writedfile) return res.status(400).json({ message: 'arquivo não alterado' });
  return res.status(200).json(talkers[EditedTalkerIndex]);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;  
  const talkers = await readFilePromise(talkerJson)
  .then((content) => JSON.parse(content))
  .catch((err) => console.log(`erro: ${err.message}`));

  const toDellIndex = talkers.findIndex((talker) => talker.id === +id);
  if (toDellIndex === -1) return res.status(404).json({ message: 'talker not found!' });

  talkers.splice(toDellIndex, 1);
  const writedfile = await WritePromise(talkerJson, JSON.stringify(talkers))
  .then(() => true)
  .catch(() => false);

  if (!writedfile) return res.status(400).json({ message: 'arquivo não alterado' });
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });  
});

module.exports = router;