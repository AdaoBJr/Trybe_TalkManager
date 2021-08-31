const { readFile, createToken, checkDate, writeFile } = require('./functions');

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

const validatePassword = (req, res, _next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const newToken = createToken();
  req.token = newToken;
  res.status(200).json({ token: newToken });
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  // const tokenValue = '7mqaVRXJSp886CGr';
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age <= 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
 const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!checkDate(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
     return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const createTalker = async (req, res, _next) => {
  const { name, age, talk } = req.body;
  const talkers = await readFile(TALKER_JSON);
  const id = talkers[talkers.length - 1].id + 1;
  const newTalkers = [...talkers, {
    id,
    name,
    age,
    talk,
  }];
  // const content = { id, name, age, talk };
  await writeFile(TALKER_JSON, newTalkers);
  res.status(201).json(talkers);
};

module.exports = { 
  getAllTalker,
  getTalker,
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  createTalker,
 };
