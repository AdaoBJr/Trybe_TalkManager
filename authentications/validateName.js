const BAD_REQUEST = 400;
const NUMBER_MIN_CHARACTERS = 3;

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (name === '' || !name) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < NUMBER_MIN_CHARACTERS) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

module.exports = validateName;