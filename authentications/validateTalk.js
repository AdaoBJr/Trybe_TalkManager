const BAD_REQUEST = 400;

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(BAD_REQUEST)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }

  next();
};

module.exports = validateTalk;
