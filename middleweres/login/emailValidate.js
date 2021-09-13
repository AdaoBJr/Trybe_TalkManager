const emailRegexValidation = require('../../auxiliar_functions/validations/emailRegexValidation');

const { BAD_REQUEST } = require('../../http_status/status');

const EMAIL_VAZIO = 'O campo "email" é obrigatório';
const EMAIL_INVALIDO = 'O "email" deve ter o formato "email@email.com"';

const emailValidate = (req, res, next) => {
  const { email } = req.body;
  const validatedEmail = emailRegexValidation(email);

  if (!email) return res.status(BAD_REQUEST).json({ message: EMAIL_VAZIO });
  if (!validatedEmail) return res.status(BAD_REQUEST).json({ message: EMAIL_INVALIDO });

  next();
};

module.exports = emailValidate;
