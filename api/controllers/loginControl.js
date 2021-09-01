const { emailValidation } = require('../services/login');
const { tokenGenerator } = require('../services/login');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 400;

const emailRequired = 'O campo "email" é obrigatório';
const invalidEmail = 'O "email" deve ter o formato "email@email.com"';
const passwordRequired = 'O campo "password" é obrigatório';
const invalidPassword = 'O "password" deve ter pelo menos 6 caracteres';

function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json({ message: emailRequired });
  }
  if (!emailValidation(email)) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: invalidEmail });
  }
   next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(HTTP_BAD_REQUEST).json({ message: passwordRequired });
  }

  if (password.toString().length < 6) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: invalidPassword });
  }
  next();
}

function generateToken(_req, res) {
  res.status(HTTP_OK_STATUS).json({ token: `${tokenGenerator()}` }); 
}

module.exports = {
  validateEmail,
  validatePassword,
  generateToken,
};
