const fs = require('fs').promises;

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  const PASSWORD_LENGTH = 6;
  
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  
  if (password.length < PASSWORD_LENGTH) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  const emailTester = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
  
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  
  if (!emailTester.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validateName = (req, res, next) => {
  const NAME_LENGTH = 3;
  
  const { name } = req.body;
  
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name < NAME_LENGTH) {
    return res.status(400).json({ message: 'O campo "name" deve ter pelo menos 3 caracteres' });
  }
  
  next();
};

const validateAge = (req, res, next) => {
  const AGE_MINIMUM = 18;
  const { age } = req.body;
  
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

  if (age < AGE_MINIMUM) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const RATE_MIN = 1;
  const RATE_MAX = 5;
  const { talk: rate } = req.body;

  const intRate = parseInt(rate, 10);

  if (intRate < RATE_MIN || intRate > RATE_MAX) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro 1 a 5' });
  } 

  next();
};

const validateDate = (req, res, next) => {
  const DATE_FORM = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;
  const { talk: watchedAt } = req.body;

  if (DATE_FORM.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa' });
  }

  next();
};

const readTokenList = () => fs.readFile('./tokens.json', 'utf8')
  .then((res) => JSON.parse(res));

const validateToken = async (req, res, next) => {
  const token = await readTokenList();
  const TOKEN_FORM = /[a-zA-Z0-9]{16}/;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (!TOKEN_FORM.test(token.token)) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = {
  validatePassword,
  validateEmail,
  validateName,
  validateAge,
  validateRate,
  validateDate,
  validateToken,
};
