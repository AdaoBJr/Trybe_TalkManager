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

const createToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token; 
};

module.exports = {
  validateEmail,
  validatePassword,
  createToken,
};