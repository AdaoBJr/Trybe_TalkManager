const fs = require('fs').promises;

const validateName = (req, _res, next) => {
  const { name } = req.body;
  if (!name) return next({ code: 400, message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return next({
      code: 400,
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const validateAge = (req, _res, next) => {
  const { age } = req.body;
  if (!age) return next({ code: 400, message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return next({
      code: 400,
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};

const validateTalk = (req, _res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return next({
      code: 400,
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

const validateWatchedAt = (req, _res, next) => {
  const {
    talk: { watchedAt },
  } = req.body;
  if (!watchedAt) {
    return next({
      code: 400,
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!regex.test(watchedAt)) {
    return next({
      code: 400,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const validateRate = (req, _res, next) => {
  const {
    talk: { rate },
  } = req.body;
  if (rate < 1 || rate > 5) {
    return next({
      code: 400,
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (!rate) {
    return next({
      code: 400,
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await fs
    .readFile('talker.json', 'utf8')
    .then((file) => JSON.parse(file));
  const talker = { name, age, id: data.length + 1, talk };
  await fs.writeFile('./talker.json', JSON.stringify([...data, talker]));
  return res.status(201).json(talker);
};

module.exports = {
  createTalker,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
};
