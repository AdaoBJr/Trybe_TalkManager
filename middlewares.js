const fs = require('fs').promises;
const crypto = require('crypto');

const readTalkerJson = () => fs.readFile('./talker.json', 'utf-8')
  .then((fileContent) => JSON.parse(fileContent));

const updatePalestrantesList = (content) => fs.writeFile('./talker.json', JSON.stringify(content));

const generateToken = () => crypto.randomBytes(8).toString('hex');

const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (!/^[a-zA-Z0-9]{16}$/.test(token)) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
function validateEmail(email) {
 const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
 if (reg.test(email)) {
 return true;
}

 return false;
}

const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (validateEmail(email) === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.toString().length < 5) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  next();
};

const validaData = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const checkData = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  if (!checkData.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  readTalkerJson,
  generateToken,
  isValidEmail,
  isValidPassword,
  isValidToken,
  validName,
  validAge,
  validTalk,
  validaData,
  validRate,
  updatePalestrantesList,
};
