function validateName(req, res, next) {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  
    next();
}

function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age || age.length === 0) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function validateDateAndRate(req, res, next) {
  const { watchedAt, rate } = req.body.talk;
  const dateRegex = /\d\d\/\d\d\/\d\d\d\d/;
  
  if (!watchedAt.match(dateRegex)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (Number(rate) > 5 || Number(rate) < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk || talk.rate === '' || talk.rate === undefined || talk.watchedAt === undefined) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
}

module.exports = {
  validateName,
  validateAge,
  validateDateAndRate,
  validateTalk,
};