const BAD_REQUEST = 400;
const MINIMUM_AGE = 18;

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (age === '' || !age) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (Number(age) < MINIMUM_AGE) {
    return res.status(BAD_REQUEST)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

module.exports = validateAge;
