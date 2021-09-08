const validateWatchedAt = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!watchedAt || !rate) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  
  if (!watchedAt.match(regexDate)) {
    return res.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }  

  next();
};

module.exports = validateWatchedAt;