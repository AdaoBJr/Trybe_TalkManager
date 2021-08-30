const { readFile, createToken } = require('./functions');

const TALKER_JSON = './talker.json';

const getAllTalker = async (req, res) => {
  const result = await readFile(TALKER_JSON);
    if (!result) return res.status(200).json(Array.from([]));
    return res.status(200).json(result);
};

const getTalker = async (req, res) => {
  const talkers = await readFile(TALKER_JSON);
  const { id } = req.params;
  const result = talkers.find((talker) => Number(talker.id) === Number(id));
  if (!result) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(result);
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  
  res.status(200).json({ token: createToken() });
};

module.exports = { getAllTalker, getTalker, validateEmail, validatePassword };