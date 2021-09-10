const { StatusCodes } = require('http-status-codes');

const crypto = require('crypto');

const token = crypto.randomBytes(8).toString('hex');

// https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
const emailValid = (req, res, next) => {
  const { email } = req.body; 
  const regex = /\S+@\S+\.\S+/;

  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
       message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const passwordValid = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      message: 'O campo "password" é obrigatório', 
    });
  }

  if (password.length < 6) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O "password" deve ter pelo menos 6 caracteres', 
    });
  }
  next();
};

const postLogin = (_req, res) => {
  res.status(200).json({ token });
};

module.exports = {
  emailValid,
  passwordValid,
  postLogin,
};