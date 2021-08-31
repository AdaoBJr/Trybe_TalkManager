const fs = require('fs');

const TALKER_JSON_PATH = 'talker.json';
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNHAUTHORIZED_STATUS = 401;

function readTalkerFile() {
  const contentFile = fs.readFileSync(TALKER_JSON_PATH, 'utf-8');
  return JSON.parse(contentFile);
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

module.exports = {
  readTalkerFile,
  validateEmail,
  validatePassword,
  validateToken,
};
