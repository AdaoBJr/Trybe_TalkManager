const fs = require('fs').promises;

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) { 
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    if (Number(age) < 19) { 
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
  }
  next();
};

const validateTalkInfo = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !(talk.watchedAt && talk.rate)) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

// Regex Source: https://stackoverflow.com/questions/10194464/javascript-dd-mm-yyyy-date-check

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;

  if (!watchedAt.match(regex)) { 
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
  }
  next();
};

const readAndPushNewTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkersList = JSON.parse(await fs.readFile('./talker.json', 'utf8'));
  talkersList.push({ id: talkersList.length + 1, name, age, talk });
  await fs.writeFile('./talker.json', JSON.stringify(talkersList));
  return res.status(201).json({ id: talkersList.length, name, age, talk });
};

module.exports = { 
  validateName,
  validateAge, 
  validateWatchedAt, 
  validateRate, 
  validateTalkInfo, 
  readAndPushNewTalker, 
  };
