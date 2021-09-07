const HTTP_BAD_REQUEST = 400;

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const dateRegex = new RegExp(/\d{2}\/\d{2}\/\d{4}/);

  if (!watchedAt || watchedAt === '') {
    return res.status(HTTP_BAD_REQUEST).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
  }
 
  if (!dateRegex.test(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
};

module.exports = validateWatchedAt;
