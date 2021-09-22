const fs = require('fs').promises;

const HTTP_201_STATUS = 201;
const HTTP_400_STATUS = 400;
const HTTP_401_STATUS = 401;
const REGEX_DATE = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/);
const NOT_FOUND_TOKEN = { message: 'Token não encontrado' };
const INVALID_TOKEN = { message: 'Token inválido' };
const NAME_IS_REQUIRED = { message: 'O campo "name" é obrigatório' };
const INVALID_NAME = { message: 'O "name" deve ter pelo menos 3 caracteres' };
const AGE_IS_REQUIRED = { message: 'O campo "age" é obrigatório' };
const INVALID_AGE = { message: 'A pessoa palestrante deve ser maior de idade' };
const INVALID_TALK = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};
const INVALID_DATE = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
const INVALID_RATE = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };

const isValidToken = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(HTTP_401_STATUS).json(NOT_FOUND_TOKEN);
  }
  if (authorization.length !== 16) {
    return response.status(HTTP_401_STATUS).json(INVALID_TOKEN);
  }
  next();
};

const isValidName = (request, response, next) => {
  const { name } = request.body;
  if (!name) {
    return response.status(HTTP_400_STATUS).json(NAME_IS_REQUIRED);
  }
  if (name.length < 3) {
    return response.status(HTTP_400_STATUS).json(INVALID_NAME);
  }
  next();
};

const isValidAge = (request, response, next) => {
  const { age } = request.body;
  if (!age) {
    return response.status(HTTP_400_STATUS).json(AGE_IS_REQUIRED);
  }
  if (age < 18) {
    return response.status(HTTP_400_STATUS).json(INVALID_AGE);
  }
  next();
};

const isValidTalk = (request, response, next) => {
  const { talk } = request.body;
  const { watchedAt, rate } = talk;
  if (!talk || !watchedAt || (!rate && rate !== 0)) {
    return response.status(HTTP_400_STATUS).json(INVALID_TALK);
  }
  next();
};

const isValidWatchedAt = (request, response, next) => {
  const { talk } = request.body;
  const { watchedAt } = talk;
  if (!REGEX_DATE.test(watchedAt)) {
    return response.status(HTTP_400_STATUS).json(INVALID_DATE);
  }
  next();
};

const isValidRate = (request, response, next) => {
  const { talk } = request.body;
  const { rate } = talk;
  if (rate < 1 || rate > 5) {
    return response.status(HTTP_400_STATUS).json(INVALID_RATE);
  }
  next();
};

const createTalker = async (request, response, _next) => {
  const { name, age, talk } = request.body;
  const talker = JSON.parse(await fs.readFile('talker.json', 'utf-8'));
  const newTalker = {
    name,
    age,
    id: talker.length + 1,
    talk: { ...talk },
  };
  talker.push(newTalker);
  await fs.writeFile('talker.json', JSON.stringify(talker));
  return response.status(HTTP_201_STATUS).json(newTalker);
};

module.exports = {
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
  createTalker,
};
