const HTTP_BAD_REQUEST = 400;

const validateAge = (req, res, next) => {
  let { age } = req.body;
  
  age = Number(age);
  if (!age || age === undefined || age === 0) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST).json(
      {
        message: 'A pessoa palestrante deve ser maior de idade',
      },
    );
  }
  next();
};

module.exports = validateAge;
