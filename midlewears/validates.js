const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

const validateAge = (req, res, next) => {
  const { age } = req.body;
  const DEFAULT_AGE = 18;
  const numberAge = Number(age);
  if (!numberAge) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (typeof numberAge !== 'number' || numberAge < DEFAULT_AGE) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!dateRegex.test(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  const DEFAULT_LENGTH = 3;

  if (!name) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < DEFAULT_LENGTH) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  const numberRate = Number(rate);
  if (typeof numberRate !== 'number' || numberRate > 5 || numberRate < 1) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk, talk: { rate, watchedAt } } = req.body;

  if (!talk || !watchedAt || !rate) {
    return res.status(HTTP_BAD_REQUEST)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const DEFAULT_LENGTH = 16;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED)
      .json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== DEFAULT_LENGTH) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token inválido' }); 
  }

  next();
};

module.exports = {
  validateAge,
  validateDate,
  validateName,
  validateRate,
  validateTalk,
  validateToken,
};
