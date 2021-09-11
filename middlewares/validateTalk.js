const HTTP_BAD_REQUEST = 400;

const validateTalk = (req, res, next) => {
  if (req.body.talk === undefined) {
    return res.status(HTTP_BAD_REQUEST).json(
      {
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      },
    );
  }

  next();
};

module.exports = validateTalk;
