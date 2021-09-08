const emailValidation = (req, res, next) => {
  const { email } = req.body;
  
  if (!email || email === '') { 
    return res.status(400).json({ message: 'O campo "email" é obrigatório' }); 
}

  const emailRegex = new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);

  if (!emailRegex.test(email)) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}

  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  
  if (!password || password === '') { 
    return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
}
  
  if (password.length < 6) { 
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}

  next();
};

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization === '') { 
    return res.status(401).json({ message: 'Token não encontrado' }); 
}

  if (authorization.length !== 16) { 
    return res.status(401).json({ message: 'Token inválido' }); 
}

  next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
  return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};
const ageValidation = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' }); 
  }
  if (age < 18) { 
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
  }
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || talk === '') {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
  }
  next();
};  

const watchedAtValidation = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt || watchedAt === '') { 
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
}

  const watchedAtRegex = new RegExp(/\d{2}\/\d{2}\/\d{4}/);
  if (!watchedAtRegex.test(watchedAt)) { 
    return res.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
    }); 
  }
  next();
};
const rateValidation = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
  }
  if (!rate || rate === '') { 
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    }); 
  }
  next();
};

module.exports = { 
  emailValidation, 
  passwordValidation, 
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
 };