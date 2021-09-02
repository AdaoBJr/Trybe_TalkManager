const validateEmail = (request, response, next) => {
  const { email } = request.body;
  const checkEmail = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i;

  if (!email || email === '') {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  
  if (!checkEmail.test(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (request, response, next) => {
  const { password } = request.body;
  if (!password || password === '') {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.toString().length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const validateToken = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.toString().length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (request, response, next) => {
  const { name } = request.body;

  if (!name || name === '') {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (request, response, next) => {
  const { age } = request.body;

  if (!age || age === '') {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateWatchedAt = (request, response, next) => {
  const { talk: { watchedAt } } = request.body;
  const checkWatchedAt = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!watchedAt) {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }); 
  }

  if (!checkWatchedAt.test(watchedAt)) {
    return response.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

const validateRate = (request, response, next) => {
  const { talk: { rate } } = request.body;

  if (rate < 1 || rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validateTalk = (request, response, next) => {
  const { talk } = request.body;

  if (
      (!talk || Object.keys(talk).length === 0)
      || talk.rate === null
      || talk.rate === undefined
    ) {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
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