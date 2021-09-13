const { randomBytes } = require('crypto');

const PASSWORD_LENGTH_MIN = 6;

const MessagesError = {
  invalidEmail: 'O "email" deve ter o formato "email@email.com"',
  emptyEmail: 'O campo "email" é obrigatório',
  invalidPassword: 'O "password" deve ter pelo menos 6 caracteres',
  emptyPassword: 'O campo "password" é obrigatório',
};

function validatorEmail(email) {
  const { invalidEmail, emptyEmail } = MessagesError;

  const validateRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = validateRegex.test(email);
  
  if (!email || email === '') { return emptyEmail; }
  if (!validEmail) { return invalidEmail; }

  return validEmail;
}

function validatorPassword(password) {
  const { invalidPassword, emptyPassword } = MessagesError;

  const validPassword = password.length >= PASSWORD_LENGTH_MIN;

  if (!password) { return emptyPassword; }
  if (!validPassword) { return invalidPassword; }

  return validPassword;
}

function tokenGenerator() {
  const newtoken = randomBytes(8).toString('hex');

  return newtoken;
}

function SignupInfo(email, password) {
  const newUserToken = tokenGenerator();
  const newUser = { email, password, token: newUserToken };

  return newUser;
}

module.exports = { validatorEmail, validatorPassword, SignupInfo };