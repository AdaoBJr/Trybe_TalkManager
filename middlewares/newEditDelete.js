const { StatusCodes } = require('http-status-codes');

const nameValid = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      message: 'O campo "name" é obrigatório', 
    });
  }

  if (name.length < 3) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      message: 'O "name" deve ter pelo menos 3 caracteres', 
    });
  }
  next();
};

const ageValid = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      message: 'O campo "age" é obrigatório', 
    });
  }

  if (age < 18) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      message: 'A pessoa palestrante deve ser maior de idade', 
    });
  }
  next();
};

// Regex feito com a ajuda de Eder Paiva
const watchedAtValid = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dataRegex = RegExp(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/);
  
  if (!watchedAt) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
  }
  if (!dataRegex.test(watchedAt)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
    });
  }
  next();
};

const rateValid = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate < 1 || rate > 5) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      message: 'O campo "rate" deve ser um inteiro de 1 à 5', 
    });
  }
  if (!rate) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
  });
  }
  next();
};

const talkValid = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
  });
  }
  next();
};

module.exports = {
  nameValid,
  ageValid,
  watchedAtValid,
  rateValid,
  talkValid,
};