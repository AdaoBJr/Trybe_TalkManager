const HTTP_400_STATUS = 400;

const validToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_400_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_400_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_400_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age <= 17) {
    return res.status(HTTP_400_STATUS)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(HTTP_400_STATUS)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

const validWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const regexDate = new RegExp(/^\d{2}\/\d{2}\/\d{4}$/);
  if (!regexDate.test(watchedAt)) { 
    return res.status(HTTP_400_STATUS).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const validRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (rate < 1 || rate > 5) {
    return res.status(HTTP_400_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = { 
  validToken,
  validName,
  validAge,
  validTalk,
  validWatchedAt,
  validRate,
};
