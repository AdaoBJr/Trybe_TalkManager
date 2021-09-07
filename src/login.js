const emailValidator = require('email-validator');
const sendErrorMessage = require('./sendErrorMessage');
const randomstring = require('randomstring');

module.exports = [
  (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      sendErrorMessage(400, 'O campo "email" é obrigatório', res);
    } else if (!emailValidator.validate(email)) {
      sendErrorMessage(400, 'O "email" deve ter o formato "email@email.com"', res);
    } else next();
  },
  (req, res, next) => {
    const { password } = req.body;
    if (!password) {
      sendErrorMessage(400, 'O campo "password" é obrigatório', res);
    } else if (password.length < 6) {
      sendErrorMessage(400, 'O "password" deve ter pelo menos 6 caracteres', res);
    } else next();
  },
  (req, res, next) => {
    res.json({
      token: randomstring.generate(16),
    })
  }
];
