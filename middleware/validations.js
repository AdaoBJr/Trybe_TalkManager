const crypto = require('crypto');

const validateEmail = (req, res, next) => {
  const { email = '' } = req.body;
  if (!email || email === '') {
    return res.status(400).json(
      {
        message: 'O campo "email" é obrigatório',
      },
      );
    }
  const validEmail = email.match(/[a-z]+@[a-z]+.com/g);
  if (!validEmail) {
    return res.status(400).json(
      {
        message: 'O "email" deve ter o formato "email@email.com"',
      },
    );
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password = '' } = req.body;
  if (password.length < 6 && password.length !== 0) {
    return res.status(400).json(
      {
        message: 'O "password" deve ter pelo menos 6 caracteres',
      },
    );
  }
  if (!password || password === '') {
    return res.status(400).json(
      {
        message: 'O campo "password" é obrigatório',
      },
    );
  }
  next();
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json(
      {
        message: 'Token não encontrado',
      },
    );
  }
  if (token.length !== 16) {
    return res.status(401).json(
      {
        message: 'Token inválido',
      },
    );
  }
  next();
};

const validateName = (req, res, next) => {
  const { name = '' } = req.body;
  if (!name || name === '') {
    return res.status(400).json(
      {
        message: 'O campo "name" é obrigatório',
      },
    );
  }
  if (name.length < 3) {
    return res.status(400).json(
      {
        message: 'O "name" deve ter pelo menos 3 caracteres',
      },
    );
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age = '' } = req.body;
  if (!age) {
    return res.status(400).json(
      {
        message: 'O campo "age" é obrigatório',
      },
    );
  }
  if (age < 18) {
    return res.status(400).json(
      {
        message: 'A pessoa palestrante deve ser maior de idade',
      },
    );
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk = '' } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json(
      {
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      },      
    );
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt = '' } } = req.body;
  const validDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!watchedAt.match(validDate)) {
    return res.status(400).json(
      {
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      },
    );
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate = '' } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json(
      {
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      },
    );
  }
  next(); 
};

const createToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  console.log(token);
  return token; 
};

module.exports = {
  validateEmail,
  validatePassword,
  createToken,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};
