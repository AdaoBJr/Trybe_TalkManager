const crypto = require('crypto');
const HTTP_OK_STATUS = 200;
const HTTP_400_STATUS = 400;
const REGEX_EMAIL = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
const EMAIL_IS_REQUIRED = { message: 'O campo "email" é obrigatório' };
const INVALID_EMAIL = { message: 'O "email" deve ter o formato "email@email.com"' };
const PASSWORD_IS_REQUIRED = { message: 'O campo "password" é obrigatório' };
const INVALID_PASSWORD = { message: 'O "password" deve ter pelo menos 6 caracteres' };

const login = (_require, response) => {
  const { email } = request.body;
  if (!email) {
    return response.status(HTTP_400_STATUS).json(EMAIL_IS_REQUIRED);
  }
  if (!REGEX_EMAIL.test(email)) {
    return response.status(HTTP_400_STATUS).json(INVALID_EMAIL);
  }
  if (!password) {
    return response.status(HTTP_400_STATUS).json(PASSWORD_IS_REQUIRED);
  }
  if (password.length < 6) {
    return response.status(HTTP_400_STATUS).json(INVALID_PASSWORD);
  }
  const myToken = crypto.randomBytes(8).toString('hex');
  return response.status(HTTP_OK_STATUS).json({ token: myToken });
};

module.exports = login;
