const HTTP_FAIL_STATUS = 400;

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_FAIL_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(HTTP_FAIL_STATUS).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_FAIL_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res
      .status(HTTP_FAIL_STATUS).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk1 = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(HTTP_FAIL_STATUS).json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  const { watchedAt, rate } = req.body.talk;
  if (!watchedAt) {
    return res.status(HTTP_FAIL_STATUS).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!rate && rate !== 0) {
    return res.status(HTTP_FAIL_STATUS).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateTalk2 = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;
  if (watchedAt === '' || rate === '') {
    return res.status(HTTP_FAIL_STATUS).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateTalkDate = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const dateTest = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/g.test(watchedAt);
  if (!dateTest) {
    return res
      .status(HTTP_FAIL_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateTalkRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate < 1 || rate > 5) {
    return res
      .status(HTTP_FAIL_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  validateName,
  validateAge,
  validateTalk1,
  validateTalk2,
  validateTalkDate,
  validateTalkRate,
};
