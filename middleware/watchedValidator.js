const watchedValidator = (req, res, next) => {
  // recebi o auxilio de Jonathan Souza e Lucas Martins para finalização do requisito com RegEx 
  const { talk } = req.body;
  const dataRegEx = RegExp(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/);

  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400).json({
       message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
      });
  }

  if (!dataRegEx.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = { watchedValidator };