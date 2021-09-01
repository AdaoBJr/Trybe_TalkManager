const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token não encontrado' });
  
  if (token.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED)
      .json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (+!age) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  
  if (+age < 18) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

   if (!talk || !talk.watchedAt || talk.rate === undefined) {
     return res.status(HTTP_BAD_REQUEST).json({
       message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
     });
   }

   next();
 };

// RegEx to validate the Date
 const dateValidation = (date) => {
  const validation = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return !!validation.test(date);
};

 const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!dateValidation(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!rate || +rate < 1 || +rate > 5) {
     return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};
