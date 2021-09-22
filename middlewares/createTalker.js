const fs = require('fs');
const readFile = require('../utils/readFile');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (parseInt(age, 10) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateObject = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = new RegExp('\\d\\d\\/\\d\\d\\/\\d\\d\\d\\d');

  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const rateRegex = new RegExp('^[1, 5]$');

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const storeTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const readContent = await readFile('./talker.json');
  const newTalker = {
    name,
    age,
    id: readContent.length + 1,
    talk: { ...talk },
  };
  readContent.push(newTalker);
  fs.writeFileSync('talker.json', JSON.stringify(readContent));
  res.status(201).json(newTalker);
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateObject,
  validateWatchedAt,
  validateRate,
  storeTalker,
}; 