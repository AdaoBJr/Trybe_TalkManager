const dataVerifier = require('../helpers/dataVerifier');

const error = (status, message) => ({
    status,
    message,
  });

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
   return next(error(401, 'Token não encontrado'));
  }
  if (authorization.length !== 16) {
    return next(error(401, 'Token inválido'));
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(error(400, 'O campo "name" é obrigatório'));
  }
  if (name.length < 3) {
    return next(error(400, 'O "name" deve ter pelo menos 3 caracteres'));
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return next(error(400, 'O campo "age" é obrigatório'));
  }
  if (age < 18) {
    return next(error(400, 'A pessoa palestrante deve ser maior de idade'));
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!dataVerifier(watchedAt)) {
    return next(error(400, 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'));
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!(Number.isInteger(rate) && rate > 0 && rate < 6)) {
    return next(error(400, 'O campo "rate" deve ser um inteiro de 1 à 5'));
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
 
  if (!talk || talk.rate === undefined || talk.watchedAt === undefined) {
    return next(error(400,
       'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'));
  }
  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
};