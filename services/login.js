const { randomBytes } = require('crypto');

const MessagesError = {
  emptyEmail: 'O campo "email" é obrigatório',
  invalidEmail: 'O "email" deve ter o formato "email@email.com"',

  emptyPassword: 'O campo "password" é obrigatório',
  invalidPassword: 'O "password" deve ter pelo menos 6 caracteres',

  emptyToken: 'Token não encontrado',
  invalidToken: 'Token inválido',

  emptyName: 'O campo "name" é obrigatório',
  invalidName: 'O "name" deve ter pelo menos 3 caracteres',

  emptyAge: 'O campo "age" é obrigatório',
  invalidAge: 'A pessoa palestrante deve ser maior de idade',

  emptyTalk: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  invalidTalkWatchedAt: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  invalidTalkRate: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

function validatorEmail(email) {
  const { emptyEmail, invalidEmail } = MessagesError;

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = EMAIL_REGEX.test(email);

  if (!email || email === '') { return emptyEmail; }
  if (!validEmail) { return invalidEmail; }

  return validEmail;
}

function validatorPassword(password) {
  const { emptyPassword, invalidPassword } = MessagesError;

  const MIN_PASSWORD_LENGTH = 6;

  if (!password) { return emptyPassword; }

  const validPassword = password.length >= MIN_PASSWORD_LENGTH;

  if (!validPassword) { return invalidPassword; }

  return validPassword;
}

function tokenGenerator() {
  const newtoken = randomBytes(8).toString('hex');

  return newtoken;
}

function signupInfo(email, password) {
  const newUserToken = tokenGenerator();
  const newUser = { 
    email, 
    password, 
    token: newUserToken };

  return newUser;
}

function verifyToken(targetToken) {
  const { emptyToken, invalidToken } = MessagesError;

  const MIN_TOKEN_LENGTH = 16;

  if (!targetToken) { return emptyToken; }

  const tokenExist = targetToken.length >= MIN_TOKEN_LENGTH;

  if (!tokenExist) { return invalidToken; }

  return tokenExist;
}

function validatorName(targetName) {
  const { emptyName, invalidName } = MessagesError;
  
  const MIN_NAME_LENGTH = 3;

  if (!targetName) { return emptyName; }

  const validatedName = targetName.length >= MIN_NAME_LENGTH;

  if (!validatedName) { return invalidName; }

  return validatedName;
}

function validatorAge(targetAge) {
  const { emptyAge, invalidAge } = MessagesError;

  const MIN_AGE = 18;

  const validatedAge = Number(targetAge) >= MIN_AGE;

  if (!targetAge) { return emptyAge; }

  if (!validatedAge) { return invalidAge; }

  return validatedAge;
}

function verifyPositive(targetNumber) {
  const MIN_VALUE = 1; const MAX_VALUE = 5; const result = true;

  const stringToNumber = parseInt(targetNumber, 10);

  if (stringToNumber < MIN_VALUE || stringToNumber > MAX_VALUE) { return false; }

  return result;
}

function validatorTalkInfo(talkObject) {
  const { emptyTalk, invalidTalkWatchedAt, invalidTalkRate } = MessagesError;

  const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/; 

  const validatedWatchedAt = DATE_REGEX.test(talkObject.watchedAt);
  const validatedRate = verifyPositive(talkObject.rate);

  if (talkObject.watchedAt == null || talkObject.rate == null) { return emptyTalk; }
  if (!validatedWatchedAt) { return invalidTalkWatchedAt; }
  if (!validatedRate) { return invalidTalkRate; }
}

function validatorRegistration(targetName, targetAge, talkObject) {
  const allValidatedStatus = true;

  const checkName = validatorName(targetName);
  const checkAge = validatorAge(targetAge);
  const checkTalkContent = validatorTalkInfo(talkObject);

  if (typeof checkName === 'string') return checkName;
  if (typeof checkAge === 'string') return checkAge;
  if (typeof checkTalkContent === 'string') return checkTalkContent;

  return allValidatedStatus;
}

function generateRegistrationObject(targetName, targetAge, talkObject, id) {
  const newTalker = {
    name: targetName,
    age: Number(targetAge),
    id: Number(id),
    talk: {
      // eslint-disable-next-line radix
      rate: parseInt(talkObject.rate, 10),
      watchedAt: talkObject.watchedAt,
    },
  };

  return newTalker;
}

function registration(targetName, targetAge, talkObject, id) {
  const { emptyTalk } = MessagesError;

  if (!talkObject) { return emptyTalk; }

  const talker = generateRegistrationObject(targetName, targetAge, talkObject, id);
  const validationsResult = validatorRegistration(targetName, targetAge, talkObject);

  if (typeof validationsResult === 'string') { return validationsResult; }

  return talker;
}

module.exports = { 
  validatorEmail, 
  validatorPassword, 
  signupInfo,
  verifyToken,
  registration,
};