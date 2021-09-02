const emailValidator = require('email-validator');
const { DateTime } = require('luxon');
const { filterTalker, getTalkers } = require('../functions/handleFile.js');

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailValidator.validate(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization === '') {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (!Number.isInteger(age)) {
    return res
      .status(400)
      .json({ message: 'O campo "age" deve ser um inteiro' });
  }

  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk.watchedAt === '' || talk.rate === '') {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const validateTalkRate = (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate <= 0 || talk.rate > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!talk.rate || talk.rate === '') {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const validateTalkWatchedAt = (req, res, next) => {
  const { talk } = req.body;

  if (!talk.watchedAt || talk.watchedAt === '') {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  const dateWatched = DateTime.fromFormat(talk.watchedAt, 'dd/mm/yyyy').isValid;
  if (!dateWatched) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateSearchParams = async (req, res, next) => {
  const { id } = req.params;
  const talker = await filterTalker(id);
  if (!talker) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  req.talker = talker;
  next();
};

const validateSearchQuery = async (req, res, next) => {
  const { q } = req.query;
  const talkers = await getTalkers();
  let searchResult;

  if (!q || q === '') searchResult = talkers;
  else searchResult = talkers.filter((t) => t.name.includes(q));

  req.searchResult = searchResult;

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkRate,
  validateTalkWatchedAt,
  validateSearchParams,
  validateSearchQuery,
};
