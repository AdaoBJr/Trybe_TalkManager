const sendErrorMessage = require('./sendErrorMessage');

module.exports = [
  (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      sendErrorMessage(400, 'O campo "name" é obrigatório', res);
    } else if (name.length < 3) {
      sendErrorMessage(400, 'O "name" deve ter pelo menos 3 caracteres', res);
    } else next();
  },
  (req, res, next) => {
    const { age } = req.body;
    if (!age) {
      sendErrorMessage(400, 'O campo "age" é obrigatório', res);
    } else if (age < 18) {
      sendErrorMessage(400, 'A pessoa palestrante deve ser maior de idade', res);
    } else next();
  },
  (req, res, next) => {
    const { talk } = req.body;
    if (!talk || !talk.watchedAt || talk.rate === undefined) {
      sendErrorMessage(
        400,
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        res,
      );
    } else next();
  },
  (req, res, next) => {
    const { watchedAt, rate } = req.body.talk;
    if (![1, 2, 3, 4, 5].includes(rate)) {
      sendErrorMessage(400, 'O campo "rate" deve ser um inteiro de 1 à 5', res);
    } else if (!watchedAt.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      sendErrorMessage(400, 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', res);
    } else next();
  },
];
