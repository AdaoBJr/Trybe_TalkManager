function validateName(res, req, next) {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  
    next();
}

function validateAge(res, req, next) {
  const { age } = req.body;
  if (!age || age.length === 0) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function validateDate(res, req, next) {
  const { watchedAt } = req.body.talk;
  const dateRegex = /\d\d\/\d\d\/\d\d\d\d/;
  
  if (!watchedAt.match(dateRegex)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

function validateTalk(res, req, next) {
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
  validateDate,
  validateTalk,
};