const {
  readFileTalker,
  writeFile,
  idGenerator,
  dateFormatValidation } = require('../services/talker');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_NOT_FOUND = 404;

function tokenValidation(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED)
    .json({ message: 'Token não encontrado' });
  }

  if ((String(authorization)).length !== 16) {
    return res.status(HTTP_UNAUTHORIZED)
    .json({ message: 'Token inválido' });
  }
  next();
}

function nameValidation(req, res, next) {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function ageValidation(req, res, next) {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function watchedAtRateValidation(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;

  if (watchedAt && !dateFormatValidation(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
 }

 function talkValidation(req, res, next) {
  const { talk } = req.body;
  
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
 }

 async function addTalker(req, res) {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;

  const talkerList = await readFileTalker();

  const newTalker = {
    id: (await idGenerator()),
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };

  writeFile('./talker.json', [...talkerList, newTalker]);

  return res.status(HTTP_CREATED).json(newTalker);
 }

async function getTalkerById(req, res) {
  const { id } = req.params;
  const talkers = await readFileTalker();
  const talker = talkers.find((el) => el.id === +id);

  if (!talker) {
    return res.status(HTTP_NOT_FOUND).json({
      message: 'Pessoa palestrante não encontrada',
    }); 
  }  
  return res.status(HTTP_OK_STATUS).send(talker);
}

async function getAllTalkers(req, res) {
  const talkers = await readFileTalker();
  if (!talkers) {
    return res.status(HTTP_OK_STATUS).send([]);
  }
  return res.status(HTTP_OK_STATUS).json(talkers);
}

 module.exports = {
   tokenValidation,
   nameValidation,
   ageValidation,
   watchedAtRateValidation,
   talkValidation,
   addTalker,
   getTalkerById,
   getAllTalkers,
 };
