const fs = require('fs').promises;

const crypto = require('crypto');

const token = crypto.randomBytes(8).toString('hex');

const HTTP_OK_STATUS = 200;
const HTPP_ERROR_STATUS = 404;

// 1
const getAll = async (_req, res) => {
  const file = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));

  res.status(HTTP_OK_STATUS).json(file);
};

// 2
const getFilterId = async (req, res) => {
  const { id } = req.params;
  const file = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
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

module.exports = { getAll, getFilterId, postLogin, emailValid, passwordValid };