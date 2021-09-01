const fs = require('fs');

const talkers = './talker.json';

// const { generateToken } = require('./randomToken');

// const token = generateToken(16);
// "cd8ef5e062c58a80"

const getTalker = async () => {
    const data = fs.readFileSync(talkers, 'utf8');
    return JSON.parse(data);
};

const getTalkerById = async (id) => {
  const talkerList = await getTalker();
  const talkerId = talkerList.find((t) => t.id === Number(id)); 
  return talkerId;
};

const validateEmail = (email) => {
  const required = { message: 'O campo "email" é obrigatório' };
  const format = { message: 'O "email" deve ter o formato "email@email.com"' };

  if (!email) return required;
  const checFormat = email.includes('@') && email.includes('.com');
  if (!checFormat) return format;
  return 'pass';
};

const validatePassword = (password) => {
  const required = { message: 'O campo "password" é obrigatório' };
  const format = { message: 'O "password" deve ter pelo menos 6 caracteres' };

  if (!password) return required;
  if (password.length <= 6) return format;
  return 'pass';
};

const validateToken = (req, res, next) => {
  const { token } = req.headers;

  if (!token) return res.status(400).json({ message: 'Token não encontrado' });
  if (token.length < 16) return res.status(400).json({ message: 'Token inválido' });
  next();
};

// const validateName = (req, res, next) => {

// };

// const validateAge = (req, res, next) => {

// };

// const validateTalk = (req, res, next) => {

// };

module.exports = {
  getTalker,
  getTalkerById,
  validateEmail,
  validatePassword,
  validateToken,
};
