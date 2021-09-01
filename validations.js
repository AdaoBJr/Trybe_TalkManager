const moment = require('moment');

const validEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({
message: 'O campo "email" é obrigatório',
    });
  }
  
  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (age < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

const lintChatoWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  if (talk.watchedAt !== undefined || talk.watchedAt !== null) {
   const date = moment(talk.watchedAt, 'DD/MM/YYYY', true);

  if (!date.isValid()) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
}

  next();
};

const lintChatoRate = (req, res, next) => {
  const { talk } = req.body;

  if (!Number.isInteger(talk.rate) || !(talk.rate > 0 && talk.rate < 6)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

const validTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || (!('watchedAt' in talk) || !('rate' in talk))) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const validToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
};

module.exports = {
  validEmail,
  validPassword,
  validName,
  validAge,
  validTalk,
  validToken,
  lintChatoWatchedAt,
  lintChatoRate,
};
