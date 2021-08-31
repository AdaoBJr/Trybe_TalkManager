function validateName(req, res, next) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' }).end();
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }).end();
  }
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' }).end();
  if ((parseInt(age, 10)) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' }).end();
  }
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk || talk.rate === '' || talk.rate === undefined || talk.watchedAt === undefined) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }).end();
  }
  next();
}

function validateTalkData(req, res, next) {
  const { talk } = req.body;
  const dataFormat = /\d\d\/\d\d\/\d\d\d\d/;
  if (!talk.watchedAt.match(dataFormat)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    }).end();
  }
  if (parseInt(talk.rate, 10) > 5 || parseInt(talk.rate, 10) < 1) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    }).end();
  }
  next();
}

// function validateData(req, res, next) {
//   validateName(req, res);
//   validateAge(req, res);
//   validateTalk(req, res);
//   validateTalkData(req, res);
//   next();
// }

module.exports = {
  validateName,
  validateAge,
  validateTalk,
  validateTalkData,
};