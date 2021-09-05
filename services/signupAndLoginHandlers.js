const { randomBytes } = require('crypto');

const MIN_PASSWORD_LENGTH = 6;

const errorMessages = {
  empty: {
    email: 'O campo "email" é obrigatório',
    password: 'O campo "password" é obrigatório',
    token: 'Token não encontrado',
    name: 'O campo "name" é obrigatório',
    age: 'O campo "age" é obrigatório',
    talk: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  },
  invalid: {
    email: 'O "email" deve ter o formato "email@email.com"',
    password: 'O "password" deve ter pelo menos 6 caracteres',
    token: 'Token inválido',
    name: 'O "name" deve ter pelo menos 3 caracteres',
    age: 'A pessoa palestrante deve ser maior de idade',
    talk: {
      watchedAt: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      rate: 'O campo "rate" deve ser um inteiro de 1 à 5',
    },
  },
};

function emailValidator(targetEmail) {
  const { empty, invalid } = errorMessages;

  const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!targetEmail || targetEmail === '') {
    return empty.email;
  }

  const isValidEmail = REGEX.test(targetEmail);

  if (!isValidEmail) {
    return invalid.email;
  }

  return isValidEmail;
}

function passwordValidator(targetPassword) {
  const { empty, invalid } = errorMessages;

  if (!targetPassword) {
    return empty.password;
  }

  const isValidPassword = targetPassword.length >= MIN_PASSWORD_LENGTH;

  if (!isValidPassword) {
    return invalid.password;
  }

  return isValidPassword;
}

function uniqueTokenGenerator() {
  const newToken = randomBytes(8).toString('hex');

  return newToken;
}

function handleSignupInfo(targetEmail, targetPassword) {
  const newUserToken = uniqueTokenGenerator();

  const newUser = {
    targetEmail,
    targetPassword,
    token: newUserToken,
  };

  return newUser;
}

function handleToken(_database, targetToken) {
  const { empty, invalid } = errorMessages;

  const MIN_TOKEN_LENGTH = 16;

  if (!targetToken) {
    return empty.token;
  }

  // const tokenExists = database.some(({ token }) => token === targetToken);
  const tokenExists = targetToken.length >= MIN_TOKEN_LENGTH;

  if (!tokenExists) {
    return invalid.token;
  }

  return tokenExists;
}

function nameValidator(targetName) {
  const { empty, invalid } = errorMessages;
  const MIN_NAME_LENGTH = 3;

  if (!targetName) {
    return empty.name;
  }

  const validatedName = targetName.length >= MIN_NAME_LENGTH;

  if (!validatedName) {
    return invalid.name;
  }

  return validatedName;
}

function ageValidator(targetAge) {
  const { empty, invalid } = errorMessages;
  const MIN_AGE = 18;

  const validatedAge = Number(targetAge) >= MIN_AGE;

  if (!targetAge) {
    return empty.age;
  }

  if (!validatedAge) {
    return invalid.age;
  }

  return validatedAge;
}

function isPositiveInteger(targetNumber) {
  const MAX_VALUE = 5;
  const MIN_VALUE = 1;
  const result = true;

  const stringToNumber = parseInt(targetNumber, 10);

  if (stringToNumber < MIN_VALUE || stringToNumber > MAX_VALUE) {
    return false;
  }

  return result;
}

function talkInfoValidator(talkObject) {
  const { empty, invalid } = errorMessages;
  const REGEX_DATE = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/; // 'https://stackoverflow.com/questions/7388001/javascript-regex-to-validate-date-format'
  const validatedWatchedAt = REGEX_DATE.test(talkObject.watchedAt);
  const validatedRate = isPositiveInteger(talkObject.rate);

  if (talkObject.watchedAt == null || talkObject.rate == null) {
    return empty.talk;
  }

  if (!validatedWatchedAt) {
    return invalid.talk.watchedAt;
  }

  if (!validatedRate) {
    return invalid.talk.rate;
  }
}

function handleRegistrationValidations(targetName, targetAge, talkObject) {
  const allValidatedStatus = true;

  const checkName = nameValidator(targetName);
  const checkAge = ageValidator(targetAge);
  const checkTalkContent = talkInfoValidator(talkObject);

  if (typeof checkName === 'string') return checkName;
  if (typeof checkAge === 'string') return checkAge;
  if (typeof checkTalkContent === 'string') return checkTalkContent;

  return allValidatedStatus;
}

function registrationFinalObject(targetName, targetAge, talkObject, id) {
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

function handleRegistration(targetName, targetAge, talkObject, id) {
  const { empty } = errorMessages;

  if (!talkObject) return empty.talk;

  const talker = registrationFinalObject(targetName, targetAge, talkObject, id);
  const validationsResult = handleRegistrationValidations(targetName, targetAge, talkObject);

  if (typeof validationsResult === 'string') {
    return validationsResult;
  }

  return talker;
}

module.exports = {
  handleSignupInfo,
  emailValidator,
  passwordValidator,
  handleToken,
  handleRegistration,
};
