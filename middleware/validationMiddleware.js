const {
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
} = require('../helper/httpStatus');

const getErrorMessage = (error) => ({
  ageNotAallowed: 'A pessoa palestrante deve ser maior de idade',
  authorizationToken: 'Token não encontrado',
  invalidEmail: 'O "email" deve ter o formato "email@email.com"',
  invalidName: 'O "name" deve ter pelo menos 3 caracteres',
  invalidPassoword: 'O "password" deve ter pelo menos 6 caracteres',
  invalidRate: 'O campo "rate" deve ser um inteiro de 1 à 5',
  invalidToken: 'Token inválido',
  invalidWatchedAt: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  noAge: 'O campo "age" é obrigatório',
  noEmail: 'O campo "email" é obrigatório',
  noName: 'O campo "name" é obrigatório',
  noPassword: 'O campo "password" é obrigatório',
  noTalk: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
})[error];

const validateAge = (request, response, next) => {
  const { age } = request.body;

  if (!age || age === '') {
    return response.status(HTTP_BAD_REQUEST).json({ message: getErrorMessage('noAge') });
  }
  if (age < 18) {
    return response.status(HTTP_BAD_REQUEST).json(
      { message: getErrorMessage('ageNotAallowed') },
    );
  }

  next();
};

const validateEmail = (request, response, next) => {
  const { email } = request.body;
  const checkEmail = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i;

  if (!email || email === '') {
    return response.status(400).json({ message: getErrorMessage('noEmail') });
  }
  
  if (!checkEmail.test(email)) {
    return response.status(400).json({ message: getErrorMessage('invalidEmail') });
  }

  next();
};

const validateName = (request, response, next) => {
  const { name } = request.body;

  if (!name || name === '') {
    return response.status(HTTP_BAD_REQUEST).json({ message: getErrorMessage('noName') });
  }

  if (name.length < 3) {
    return response.status(HTTP_BAD_REQUEST).json(
      { message: getErrorMessage('invalidName') },
    );
  }

  next();
};

const validatePassword = (request, response, next) => {
  const { password } = request.body;
  
  if (!password || password === '') {
    return response.status(HTTP_BAD_REQUEST).json({
      message: getErrorMessage('noPassword'),
    });
  }
  
  const stringPassword = password.toString();

  if (stringPassword.length < 6) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: getErrorMessage('invalidPassoword'),
    });
  }

  next();
};

const validateRate = (request, response, next) => {
  const { talk: { rate } } = request.body;

  if (rate === null || rate === undefined) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: getErrorMessage('noTalk'),
    });
  }

  if (rate < 1 || rate > 5) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: getErrorMessage('invalidRate'),
    });
  }
  next();
};

const validateToken = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(HTTP_UNAUTHORIZED).json({
      message: getErrorMessage('authorizationToken'),
    });
  }

  const authString = authorization.toString();

  if (authString.length !== 16) {
    return response.status(HTTP_UNAUTHORIZED).json({
      message: getErrorMessage('invalidToken'),
    });
  }

  next();
};

const validateTalk = (request, response, next) => {
  const { talk } = request.body;
  const sizeTalk = talk && Object.keys(talk).length;

  if (!talk || sizeTalk === 0) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: getErrorMessage('noTalk'),
    });
  } 

  next();
};

const validateWatchedAt = (request, response, next) => {
  const { talk: { watchedAt } } = request.body;
  const checkWatchedAt = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!watchedAt) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: getErrorMessage('noTalk'),
    });
  }

  if (!checkWatchedAt.test(watchedAt)) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: getErrorMessage('invalidWatchedAt'),
    });
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
};