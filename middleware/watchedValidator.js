const watchedValidator = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const dataRegEx = RegExp(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/);

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({
       message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
      });
  }

  if (!dataRegEx.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = { watchedValidator };