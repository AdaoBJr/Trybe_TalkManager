const fs = require('fs').promises;

function getAllTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

function criarNovoPalestrante(novoPalestrante) {
  return fs.writeFile('./talker.json', JSON.stringify(novoPalestrante));
}

function tokenGenerate(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const verifyToken = async (req, res, next) => {
  await tokenGenerate();
  const { token } = req.headers.autorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token !== tokenGenerate()) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const verifyemail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.includes('@') || !email.includes('.com')) {
  return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const verifyPassword = (req, res, next) => {
const { password } = req.body;
if (!password) {
  return res.status(400).json({ message: 'O campo "password" é obrigatório' });
}
if (password.length < 5) {
  return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const verifyname = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório"' });
  }
  if (!name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const verifyAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof age !== 'number' || age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const verifyFieldsTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
  return res.status(400)
  .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const verifyDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regexDate = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  if (!watchedAt.test(regexDate)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const verifyRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  getAllTalkers,
  criarNovoPalestrante,
  verifyPassword,
  verifyemail,
  tokenGenerate,
  verifyname,
  verifyToken,
  verifyAge,
  verifyFieldsTalk,
  verifyDate,
  verifyRate,
};
