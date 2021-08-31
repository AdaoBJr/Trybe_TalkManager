function validateName(res, req, next) {
  const { name } = req.body;
  if (!name || name.lengh === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  
    next();
}

function validateAge(res, req, next) {
  const { age } = req.body;
  if (!age || age.lengh === 0) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function validateTalkDate(res, req) {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/;
  
  if (!watchedAt.test(dateRegex)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
}

function validateTalkeRate(res, req) {
  const { talk: { rate } } = req.body;
  if (Number(rate) >= 1 && Number(rate) <= 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
}

function validateTalk(res, req, next) {
  const { talk } = req.body;
  const { watchedAt, rate } = req.body.talk;

  validateTalkDate();
  validateTalkeRate();

  if (!talk || !watchedAt || !rate) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
}

module.exports = {
  validateName,
  validateAge,
  validateTalk,
};