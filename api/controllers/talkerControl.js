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

const talkerNotFound = 'Pessoa palestrante não encontrada';
const tokenNotFound = 'Token não encontrado';
const invalidToken = 'Token inválido';
const nameRequired = 'O campo "name" é obrigatório';
const invalidName = 'O "name" deve ter pelo menos 3 caracteres';
const ageRequired = 'O campo "age" é obrigatório'; 
const invalidAge = 'A pessoa palestrante deve ser maior de idade';
const invalidRage = 'O campo "rate" deve ser um inteiro de 1 à 5';
const invalidDateFormat = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const talkRequired = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
const successfullyDeleted = 'Pessoa palestrante deletada com sucesso';

async function getAllTalkers(req, res) {
  const talkers = await readFileTalker();
  if (!talkers) {
    return res.status(HTTP_OK_STATUS).send([]);
  }
  return res.status(HTTP_OK_STATUS).json(talkers);
}

async function getTalkerById(req, res) {
  const { id } = req.params;
  const talkers = await readFileTalker();
  const talker = talkers.find((el) => el.id === +id);

  if (!talker) {
    return res.status(HTTP_NOT_FOUND).json({
      message: talkerNotFound,
    }); 
  }  
  return res.status(HTTP_OK_STATUS).send(talker);
}

function tokenValidation(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED)
    .json({ message: tokenNotFound });
  }

  if ((String(authorization)).length !== 16) {
    return res.status(HTTP_UNAUTHORIZED)
    .json({ message: invalidToken });
  }
  next();
}

function nameValidation(req, res, next) {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: nameRequired });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: invalidName });
  }
  next();
}

function ageValidation(req, res, next) {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: ageRequired });
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: invalidAge });
  }
  next();
}

function rateValidation(req, res, next) {
  const { talk: { rate } } = req.body;

  if (
    typeof rate !== 'number'
    || +rate < 1
    || +rate > 5
    ) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: invalidRage });
  }
  next();
}

function watchedAtValidation(req, res, next) {
  const { talk: { watchedAt } } = req.body;

  if (watchedAt && !dateFormatValidation(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: invalidDateFormat });
  }
  next();
 }

 function talkValidation(req, res, next) {
  const { talk } = req.body;
  
  if (
    !talk
    || talk.watchedAt === undefined
    || talk.rate === undefined
    ) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: talkRequired });
  }
  next();
 }

 async function addTalker(req, res) {
  const { name, age, talk } = req.body;

  const talkerList = await readFileTalker();
  const newTalker = {
    id: (await idGenerator()),
    name,
    age,
    talk,
  };
  writeFile('./talker.json', [...talkerList, newTalker]);

  return res.status(HTTP_CREATED).json(newTalker);
 }

async function editTalker(req, res) {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const currTalkers = await readFileTalker();
  const talkerIndex = currTalkers.findIndex((el) => el.id === +id);
  const editedTalker = { id: +id, name, age, talk };
  
  currTalkers.splice(talkerIndex, 1, editedTalker);
  writeFile('./talker.json', currTalkers);

  res.status(HTTP_OK_STATUS).json(editedTalker); 
}
// reference: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex 

async function deleteTalker(req, res) {
  const { id } = req.params;

  const curr = await readFileTalker();
  const updatedTalkers = curr.filter((el) => el.id !== +id);
  writeFile('./talker.json', updatedTalkers);

  res.status(HTTP_OK_STATUS).send({ message: successfullyDeleted });
}

async function searchTalker(req, res) {
  const { q } = req.query;
  const talkers = await readFileTalker();
  
  if (!q) {
  return res.status(HTTP_OK_STATUS).json(talkers);
  }
  const filteredTalkers = talkers.filter((el) => el.name.includes(q));

  return res.status(HTTP_OK_STATUS).json(filteredTalkers);
}

 module.exports = {
   getAllTalkers,
   getTalkerById,
   tokenValidation,
   nameValidation,
   ageValidation,
   rateValidation,
   watchedAtValidation,
   talkValidation,
   addTalker,
   editTalker,
   deleteTalker,
   searchTalker,
 };
