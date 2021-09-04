const { randomBytes } = require('crypto');

const MIN_PASSWORD_LENGTH = 6;

const errorMessages = {
  emptyEmail: 'O campo "email" é obrigatório',
  invalidEmail: 'O "email" deve ter o formato "email@email.com"',
  emptyPassword: 'O campo "password" é obrigatório',
  invalidPassword: 'O "password" deve ter pelo menos 6 caracteres',
};

function emailValidator(email) {
  const { emptyEmail, invalidEmail } = errorMessages;

  const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || email === '') {
    return emptyEmail;
  }

  const isValidEmail = REGEX.test(email);

  if (!isValidEmail) {
    return invalidEmail;
  }

  return isValidEmail;
}

function passwordValidator(password) {
  const { emptyPassword, invalidPassword } = errorMessages;

  if (!password) {
    return emptyPassword;
  }

  const isValidPassword = password.length >= MIN_PASSWORD_LENGTH;

  if (!isValidPassword) {
    return invalidPassword;
  }

  return isValidPassword;
}

function uniqueTokenGenerator() {
  const newToken = randomBytes(8).toString('hex');

  return newToken;
}

function handleSignupInfo(email, password) {
  const newUserToken = uniqueTokenGenerator();
  const newUser = {
    email,
    password,
    token: newUserToken,
  };

  return newUser;
}

module.exports = { handleSignupInfo, emailValidator, passwordValidator };
