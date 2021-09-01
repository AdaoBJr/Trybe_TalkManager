const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

const isValidDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  
  if (!watchedAt.match(regexDate)) {
    res.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

module.exports = isValidDate;