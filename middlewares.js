const fs = require('fs').promises;
const crypto = require('crypto');

const readFile = async (_req, res) => {
  const content = await fs.readFile('./talker.json', 'utf-8');
  if (content.length === 0) {
    return res.status(200).json([]);
  }
  const contentInJSON = JSON.parse(content);
  return res.status(200).json(contentInJSON);
};

const readFileId = async (req, res) => {
  const { id } = req.params;
  const content = await fs.readFile('./talker.json', 'utf-8');
  const contentInJSON = JSON.parse(content);
  const foundTalker = contentInJSON.find((eachTalker) => eachTalker.id === Number(id));
  if (!foundTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(foundTalker);
};

const tokenMiddleware = (req, res, next) => {
  const token = crypto.randomBytes(8).toString('hex');
  req.token = token;
  next();
  return res.status(200).json({ token });
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!(emailRegex.test(email))) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res) => {
  const { password } = req.body;
  console.log(password);
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

module.exports = { readFile, readFileId, tokenMiddleware, validateEmail, validatePassword };
