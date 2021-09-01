const fs = require('fs');

const TALKER_JSON_PATH = 'talker.json';
const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNHAUTHORIZED_STATUS = 401;

function readTalkerFile() {
  const contentFile = fs.readFileSync(TALKER_JSON_PATH, 'utf-8');
  return JSON.parse(contentFile);
}

function writeTalkerFile(newData) {
  fs.writeFileSync(TALKER_JSON_PATH, newData);
}

function validateEmail(req, res, next) {
  const { email } = req.body;
  const blankSpacesRegex = /^\s+$/;
  const emailRegex = /\w+@\w+.com/;

  if (blankSpacesRegex.test(email) || !email) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailRegex.test(email)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  const blankSpacesRegex = /^\s+$/;

  if (blankSpacesRegex.test(password) || !password) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (`${password}`.length < 6) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}

function validateToken(req, res, next) {
  const token = req.headers.authorization;
  const invalidToken = /\w{16}/;

  if (!token) {
    return res.status(HTTP_UNHAUTHORIZED_STATUS)
      .json({ message: 'Token não encontrado' });
  }

  if (!invalidToken.test(token)) {
    return res.status(HTTP_UNHAUTHORIZED_STATUS)
      .json({ message: 'Token inválido' });
  }

  next();
}

function validateName(req, res, next) {
  const { name } = req.body;
  const blankSpacesRegex = /^\s+$/;

  if (!name || blankSpacesRegex.test(name)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;

  if (!age) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "age" é obrigatório' });    
  }

  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function validateDate(date) {
  const dateFormated = date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3');
  const validDate = new Date(dateFormated);
  if (`${validDate}`.includes('Invalid Date')) {
    return false;
  }
  return true;
}

function validateRate(rate) {
  if (rate < 1 || rate > 5) {
    return false;
  }
  return true;
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk || Object.keys(talk).length < 2) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!validateDate(talk.watchedAt)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!validateRate(talk.rate)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

function validateParams(req, res, next) {
  const { q } = req.query;
  
  if (!q) {
    const talkers = readTalkerFile();
    return res.status(HTTP_OK_STATUS).json(talkers);
  }

  next();
}

module.exports = {
  readTalkerFile,
  writeTalkerFile,
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateParams,
};
