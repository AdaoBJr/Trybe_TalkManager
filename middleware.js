const emailValid = (require, response, next) => {
  const { email } = require.body;

  if (!email || email === '') {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  const emailRegex = new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);

  if (!emailRegex.test(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const passwordValid = (require, response, next) => {
  const { password } = require.body;

  if (!password || password === '') {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const tokenValid = (require, response, next) => {
  const { authorization } = require.headers;
  if (!authorization || authorization === '') { 
    return response.status(401).json({ message: 'Token não encontrado' }); 
}

  if (authorization.length !== 16) { 
    return response.status(401).json({ message: 'Token inválido' }); 
}

  next();
};

const nameValid = (require, response, next) => {
  const { name } = require.body;

  if (!name || name === '') {
  return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValid = (require, response, next) => {
  const { age } = require.body;
  if (!age || age === '') {
      return response.status(400).json({ message: 'O campo "age" é obrigatório' }); 
  }
  if (age < 18) { 
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
  }
  next();
};

const talkValid = (require, response, next) => {
  const { talk } = require.body;
  if (!talk || talk === '') {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
  }
  next();
};  

const watchedAtValid = (require, response, next) => {
  const { talk: { watchedAt } } = require.body;

  if (!watchedAt || watchedAt === '') { 
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
}

  const watchedAtRegex = new RegExp(/\d{2}\/\d{2}\/\d{4}/);
  if (!watchedAtRegex.test(watchedAt)) { 
    return response.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
    }); 
  }
  next();
};
const rateValid = (require, response, next) => {
  const { talk: { rate } } = require.body;
    if (!rate || rate === '') { 
      return response.status(400).json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
      }); 
  }
  if (rate < 1 || rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
}
  next();
};

module.exports = { 
  emailValid, 
  passwordValid, 
  tokenValid,
  nameValid,
  ageValid,
  talkValid,
  watchedAtValid,
  rateValid,
};
