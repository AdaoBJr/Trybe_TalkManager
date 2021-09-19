const nameAuth = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  
  next();
};

const ageAuth = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const watchedAtAuth = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  const DATE_REGEX = new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/g);

  if (!DATE_REGEX.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const rateAuth = (req, res, next) => {
  const { talk: { rate } } = req.body;
  
  if (
    !Number.isInteger(rate)
    || (rate <= 0 || rate > 5)
  ) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const talkAuth = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res
      .status(400)
      .json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
  }

  next();
};

module.exports = {
  nameAuth,
  ageAuth,
  watchedAtAuth,
  rateAuth,
  talkAuth,
};