const checkEmail = (email) => {
  const emailRegex = /^\w+[\W_]?\w*@[a-z]+\.[a-z]{2,3}(?:.br)?$/;
  return emailRegex.test(email);
};

const validateToken = (token) => {
  if (!token) return null;
  if (token.length !== 16) return false;
};

const validateName = (name) => {
  if (!name) return null;
  if (name.length < 3) return false;
};

const validateAge = (age) => {
  if (!age) return null;
  if (age < 18) return false;
};

const validateWatchedAt = (watchedAt) => {
  const dateFormatRegex = /^([0-9]{2})+\/+([0-9]{2})+\/+([0-9]{4})$/;
  return dateFormatRegex.test(watchedAt);
};

const validateRate = (talk) => {
  if (talk.rate === undefined) {
    return false;
  }

  if (Number.isInteger(+talk.rate) && (talk.rate < 1 || talk.rate > 5)) {
    return false;
  }

  return true;
};

const validateTalk = (talk) => (talk && talk.rate && talk.watchedAt);

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (validateToken(token) === false) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  if (validateToken(token) === null) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;

  if (validateName(name) === false) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (validateName(name) === null) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;

  if (validateAge(age) === false) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  if (validateAge(age) === null) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!validateTalk(talk)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const checkWatchedAt = (req, res, next) => {
  const { talk } = req.body;

  if (!validateWatchedAt(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

const checkRate = (req, res, next) => {
  const { talk } = req.body;
  if (!validateRate(talk)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = {
  checkAge,
  checkEmail,
  checkName,
  checkRate,
  checkTalk,
  checkToken,
  checkWatchedAt,
};