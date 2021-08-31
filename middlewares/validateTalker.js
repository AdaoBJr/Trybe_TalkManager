const REG = /(\d){2}\/(\d){2}\/(\d){4}/;

const nameIsNull = (name, res) => !name && res.status(400)
    .json({ message: 'O campo "name" é obrigatório' });

const nameLength = (name, res) => name.length <= 3 && res.status(400)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

const ageIsNull = (age, res) => !age && res.status(400)
    .json({ message: 'O campo "age" é obrigatório' });

const legalAge = (age, res) => age < 18 && res.status(400)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });

const formatDate = (watchedAt, res) => !watchedAt.match(REG) && res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });

const rateOneToFive = (rate, res) => (rate < 1 || rate > 5) && res.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

const isDateRateNull = (talk, watchedAt, rate, res) => 
    (!talk, !watchedAt || rate === undefined) && res
.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
});

module.exports = (req, res, next) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk || {};
  nameIsNull(name, res);
  nameLength(name, res);
  ageIsNull(age, res);
  legalAge(age, res);
  isDateRateNull(talk, watchedAt, rate, res);
  rateOneToFive(rate, res);
  formatDate(watchedAt, res);
  next();
};