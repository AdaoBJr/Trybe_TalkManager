const fs = require('fs').promises;

const crypto = require('crypto');

const token = crypto.randomBytes(8).toString('hex');

const fileCall = './talker.json';

const HTTP_OK_STATUS = 200;
const HTPP_ERROR_STATUS = 404;

// 1
const getAll = async (_req, res) => {
  const file = JSON.parse(await fs.readFile(fileCall, 'utf-8'));

  res.status(HTTP_OK_STATUS).json(file);
};

// 2
const getFilterId = async (req, res) => {
  const { id } = req.params;
  const file = JSON.parse(await fs.readFile(fileCall, 'utf-8'));
  const fileFilter = file.find((item) => item.id === Number(id));

  if (!fileFilter) {
    return res.status(HTPP_ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
    res.status(HTTP_OK_STATUS).json(fileFilter);
};

// 3
// https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
const emailValid = (req, res, next) => {
  const { email } = req.body; 
  const regex = /\S+@\S+\.\S+/;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

// 3
const passwordValid = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

// 3
const postLogin = (_req, res) => {
  res.status(200).json({ token });
};

const tokenValid = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenRegex = /^[a-zA-Z0-9]{16}$/;
 
  if (!authorization) {
   return res.status(401).json({ message: 'Token não encontrado' });
  }
 
  if (!tokenRegex.test(authorization)) {
   return res.status(401).json({ message: 'Token inválido' });
  }
  next();
 };

// 4
const nameValid = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

// 4
const ageValid = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

// 4
const watchedAtValid = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dataRegex = RegExp(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/);
  
  if (!watchedAt) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
  }
  if (!dataRegex.test(watchedAt)) {
    return res.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
    });
  }
  next();
};

const rateValid = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
  });
  }

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const postTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const file = JSON.parse(await fs.readFile(fileCall, 'utf-8'));
  const newTalker = {
    id: file.length + 1,
    name,
    age,
    talk,
  };

  file.push(newTalker);
  await fs.writeFile(fileCall, JSON.stringify(file));
  
  return res.status(201).json(newTalker);
};

module.exports = { 
  getAll,
  getFilterId, 
  postLogin, 
  emailValid, 
  passwordValid,
  tokenValid,
  nameValid,
  ageValid,
  watchedAtValid,
  rateValid,
  postTalker, 
};