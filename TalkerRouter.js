const express = require('express');

const router = express.Router();
const { getTalkers, setTalkers, regexDate } = require('./helpers');

const HTTP_OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;
const HTTP_BAD_REQUEST = 400;

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  return res.status(HTTP_OK_STATUS).json(talkers);
});

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST).json({ 
      message: 'O "name" deve ter pelo menos 3 caracteres', 
    });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST).json({ 
      message: 'A pessoa palestrante deve ser maior de idade', 
    });
  }
  next();
};

const validateTalkDateRate = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;
  
  if (rate < Number(1) || rate > Number(5)) {
    return res.status(HTTP_BAD_REQUEST).json({ 
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (!regexDate(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
    });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
  }
  
  next();
};

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await getTalkers();
  const talkerById = talkers.find((talker) => talker.id === Number(id));
  
  if (!talkerById) {
    return res.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(talkerById);
});

router.post('/', validateToken, validateName, validateAge, validateTalk, validateTalkDateRate, 
async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await getTalkers();

  talkers.push({ name,
    id: talkers.length + 1,
    age,
    talk });

  await setTalkers(talkers);

  return res.status(201).json(talkers[talkers.length - 1]);
});

router.put('/:id', validateToken, validateName, validateAge, validateTalk, validateTalkDateRate,
 async (req, res) => {
  const { id } = req.params;
  // const { name, age, talk } = req.body;
  const talkers = await getTalkers();
  const talkerToEdit = talkers.find((t) => t.id === id);

  return res.status(HTTP_OK_STATUS).json(talkerToEdit);
});

module.exports = router;
