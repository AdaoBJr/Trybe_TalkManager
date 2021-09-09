function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (authorization) {
    if (authorization.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  } else {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  next();
}

function validateNameAge(req, res, next) {
  const { name, age } = req.body;
  switch (true) {
    case !name:
      return res.status(400)
        .json({ message: 'O campo "name" é obrigatório' });
    case name.length < 4:
      return res.status(400)
        .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    case !age:
      return res.status(400)
        .json({ message: 'O campo "age" é obrigatório' });
    case age < 18:
      return res.status(400)
        .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    default:
      break;
  }
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
}

function validateDateRate(req, res, next) {
  const dateFormat = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const { talk: { watchedAt, rate } } = req.body;
  switch (false) {
    case dateFormat.test(watchedAt):
      return res.status(400)
        .json({
          message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    case Number.isInteger(rate) && rate >= 1 && rate < 6:
      return res.status(400)
        .json({
          message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
    default:
      break;
  }
  next();
}

module.exports = {
  validateToken,
  validateNameAge,
  validateTalk,
  validateDateRate,
};
