const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_NOT_FOUND_STATUS = 401;

const tokenNotFound = 'Token não encontrado';
const invalidToken = 'Token inválido';

const nameNotFound = 'O campo "name" é obrigatório'; 
const invalidName = 'O "name" deve ter pelo menos 3 caracteres';

const ageNotFound = 'O campo "age" é obrigatório';
const invalidAge = 'A pessoa palestrante deve ser maior de idade';

const invalidWatchedAt = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

const invalidRate = 'O campo "rate" deve ser um inteiro de 1 à 5';

const invalidTalk = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(HTTP_NOT_FOUND_STATUS).json({ message: tokenNotFound });
  if (typeof token !== 'string'
  || token.length !== 16) return res.status(HTTP_NOT_FOUND_STATUS).json({ message: invalidToken });
  next();
};

const verifyName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: nameNotFound });
  if (name.length < 3) return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: invalidName });
  next();
};

const verifyAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: ageNotFound });
  if (age < 18) return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: invalidAge });
  next();
};

const verifyTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk
    || talk.watchedAt === undefined
    || talk.rate === undefined) {
      return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: invalidTalk });
    }
    next();
};
  
const verifyWatchedAt = (req, res, next) => {
    const talk = req.body.talk.watchedAt;
    const dateRegex = /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/gm;
    if (!talk
  || !(dateRegex.test(talk))) {
    return res
    .status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: invalidWatchedAt });
  }
  next();
};

const verifyRate = (req, res, next) => {
  const talk = req.body.talk.rate;
  if (!talk
    || typeof talk !== 'number'
    || Number(talk) > 5
    || Number(talk) < 1) {
      return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: invalidRate });
    }
    next();
};

module.exports = {
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyWatchedAt,
  verifyRate,
};
