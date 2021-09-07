const HTTP_ERROR_VALUE = 400;

const nameCheck = (req, res, next) => {
  const { name } = req.body;
  if (!name) { 
    return res.status(HTTP_ERROR_VALUE).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_ERROR_VALUE)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageCheck = (req, res, next) => {
  const { age } = req.body;
  if (!age) { 
    return res.status(HTTP_ERROR_VALUE).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(HTTP_ERROR_VALUE)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkCheck = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(HTTP_ERROR_VALUE)
    .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!talk.watchedAt || !talk.rate) {
    return res.status(HTTP_ERROR_VALUE)   
  .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
    next();
};

const infoTalkCheck = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;
  const dataRegex = RegExp(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/);
  if (!dataRegex.test(watchedAt)) {
    return res.status(HTTP_ERROR_VALUE)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  const rateNumber = [1, 2, 3, 4, 5];
  if (!rateNumber.includes(rate)) {
    return res.status(HTTP_ERROR_VALUE)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  ageCheck,
  nameCheck,
  talkCheck,
  infoTalkCheck,
};